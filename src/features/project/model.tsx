/* eslint-disable react-hooks/rules-of-hooks */

import React, { createContext, FunctionComponent, ReactNode, useContext } from "react";
import { useStore } from "effector-react";
import { createEvent, createStore, sample, Store } from "effector";

export type UnitName = string;

export interface UnitData {
    name: UnitName;
    kind: "layer" | "slice";
    description: string | null;
    dependents: Array<UnitName>;
    dependencies: Array<UnitName>;
}

export interface LayerData extends UnitData {
    kind: "layer";
    children: Array<UnitName>;
}

export interface SliceData extends UnitData {
    kind: "slice";
    parent: UnitName;
}

export interface Project {
    unitsList: Array<LayerData | SliceData>;
    unitsMap: Record<UnitName, LayerData | SliceData>;
}

// controller

export interface ProjectStatefulController {
    unitsList: Store<Project["unitsList"]>;
    unitsMap: Store<Project["unitsMap"]>;
    unitSelected: Store<LayerData | SliceData | null>;
    unitHighlighted: Store<LayerData | SliceData | null>;
    setUnitSelected: (unit: UnitName | null) => void;
    setUnitHighlighted: (unit: UnitName | null) => void;
}

export const createProjectController = (project: Project): ProjectStatefulController => {
    const unitsList = createStore(project.unitsList);
    const unitsMap = createStore(project.unitsMap);

    const unitSelected = createStore<LayerData | SliceData | null>(null);
    const setUnitSelected = createEvent<UnitName | null>();
    sample({
        clock: setUnitSelected,
        source: { unitsMap, unitSelected },
        fn: ({ unitsMap, unitSelected }, payload) =>
            payload ? unitsMap[payload] ?? unitSelected : null,
        target: unitSelected,
    });

    const unitHighlighted = createStore<LayerData | SliceData | null>(null);
    const setUnitHighlighted = createEvent<UnitName | null>();
    sample({
        clock: setUnitHighlighted,
        source: { unitsMap, unitHighlighted },
        fn: ({ unitsMap, unitHighlighted }, payload) =>
            payload ? unitsMap[payload] ?? unitHighlighted : null,
        target: unitHighlighted,
    });

    return {
        unitsList,
        unitsMap,
        unitSelected,
        setUnitSelected,
        unitHighlighted,
        setUnitHighlighted,
    };
};

// context

export interface ProjectStateful {
    unitsList: Project["unitsList"];
    unitsMap: Project["unitsMap"];
    unitSelected: LayerData | SliceData | null;
    setUnitSelected: (unit: UnitName | null) => void;
    unitHighlighted: LayerData | SliceData | null;
    setUnitHighlighted: (unit: UnitName | null) => void;
}

const projectStatefulContext = createContext<ProjectStateful | null>(null);

export const ProjectStatefulProvider: FunctionComponent<{
    projectController?: ProjectStatefulController;
    children?: ReactNode;
}> = ({ projectController, children }) => {
    return (
        <projectStatefulContext.Provider
            value={
                projectController
                    ? {
                          unitsList: useStore(projectController.unitsList),
                          unitsMap: useStore(projectController.unitsMap),
                          unitSelected: useStore(projectController.unitSelected),
                          unitHighlighted: useStore(projectController.unitHighlighted),
                          setUnitSelected: projectController.setUnitSelected,
                          setUnitHighlighted: projectController.setUnitHighlighted,
                      }
                    : null
            }
        >
            {children}
        </projectStatefulContext.Provider>
    );
};

export const useProjectStateful = () => useContext(projectStatefulContext);
