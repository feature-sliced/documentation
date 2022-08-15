/* eslint-disable react/jsx-no-bind,react-hooks/rules-of-hooks */
import React, { ComponentProps, FunctionComponent, useEffect, useMemo } from "react";
import clsx from "clsx";
import { mdiMinus, mdiPlus } from "@mdi/js";
import { useSet } from "react-use";

import { MaterialBooleanButton } from "@site/src/shared/ui/material-boolean-button";

import { useProjectStateful, LayerData, SliceData, UnitName } from "../../../model";

import { UnitLink } from "../unit-link";

import styles from "./diagram.module.css";

export const Diagram: FunctionComponent<ComponentProps<"div">> = ({ className, ...props }) => {
    const context = useProjectStateful();

    if (!context) {
        return <div>'Context not found'</div>;
    }

    const layersOpenedForcibly = useMemo(
        () =>
            new Set(
                context.unitSelected
                    ? [
                          context.unitSelected.name,
                          ...context.unitSelected.dependencies,
                          ...context.unitSelected.dependents,
                      ]
                          .map((unitName) => context.unitsMap[unitName])
                          .filter((unit) => Boolean(unit))
                          .filter((unit) => unit.kind === "slice")
                          .map((unit) => (unit as SliceData).parent)
                    : [],
            ),
        [context.unitSelected?.name],
    );

    const [layersOpened, layersOpenedApi] = useSet<UnitName>(new Set());

    useEffect(() => {
        layersOpenedForcibly.forEach((layer) => layersOpenedApi.add(layer));
    }, [layersOpenedForcibly]);

    return (
        <div className={clsx(styles.container, className)} {...props}>
            {(context.unitsList.filter((unit) => unit.kind === "layer") as Array<LayerData>).map(
                (layer) => (
                    <UnitLink
                        key={layer.name}
                        unitName={layer.name}
                        className={clsx(
                            styles.unitPatch,
                            styles.layer,
                            layersOpened.has(layer.name) && styles.expanded,
                        )}
                    >
                        <>
                            <div className={styles.top}>
                                {layer.name}
                                {layer.children.length > 0 && (
                                    <MaterialBooleanButton
                                        iconOn={mdiMinus}
                                        iconOff={mdiPlus}
                                        isEnabled={!layersOpenedForcibly.has(layer.name)}
                                        isActive={layersOpened.has(layer.name)}
                                        onActivate={() => {
                                            layersOpenedApi.toggle(layer.name);
                                        }}
                                        className={styles.buttonPatch}
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                )}
                            </div>
                            <div className={styles.bottom}>
                                {layer.children.map((sliceName) => (
                                    <UnitLink
                                        key={sliceName}
                                        unitName={sliceName}
                                        className={clsx(styles.unitPatch, styles.slice)}
                                    />
                                ))}
                            </div>
                        </>
                    </UnitLink>
                ),
            )}
        </div>
    );
};
