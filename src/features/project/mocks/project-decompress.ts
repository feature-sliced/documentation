import { LayerData, Project, SliceData, UnitName } from "../model";

type ProjectCompressed = Record<
    UnitName,
    {
        description?: string;
        dependencies?: Array<UnitName>;
        slices?: Record<
            UnitName,
            {
                description?: string;
                dependencies?: Array<UnitName>;
            }
        >;
    }
>;

export const projectDecompress = (projectCompressed: ProjectCompressed): Project => {
    // map of units

    const map = {} as Record<UnitName, LayerData | SliceData>;

    Object.entries(projectCompressed).forEach(([layerName, layerData]) => {
        map[layerName] = {
            name: layerName,
            kind: "layer",
            description: layerData.description ?? null,
            dependents: [],
            dependencies: layerData.dependencies ?? [],
            children: layerData.slices ? Object.keys(layerData.slices) : [],
        };

        if (layerData.slices) {
            Object.entries(layerData.slices).forEach(([sliceName, sliceData]) => {
                map[sliceName] = {
                    name: sliceName,
                    kind: "slice",
                    description: sliceData.description ?? null,
                    dependents: [],
                    dependencies: sliceData.dependencies ?? [],
                    parent: layerName,
                };
            });
        }
    });

    // back-linking relations

    Object.entries(map).forEach(([unitName, unitData]) => {
        unitData.dependencies.forEach((dependencyName) => {
            map[dependencyName].dependents.push(unitName);
        });
    });

    // list of units

    const list = Object.entries(map).map(([unitName, unitData]) => unitData);

    // result

    return {
        unitsList: list,
        unitsMap: map,
    };
};
