import React, { ComponentProps, FunctionComponent } from "react";
import clsx from "clsx";

import { useProjectStateful } from "../../../model";
import { UnitLink } from "../unit-link";

import styles from "./description.module.css";

export const Description: FunctionComponent<
    ComponentProps<"div"> & {
        children?: never;
    }
> = ({ className, ...props }) => {
    const context = useProjectStateful();

    return (
        <div className={clsx(styles.container, className)} {...props}>
            <div className={styles.title}>
                {context?.unitSelected ? (
                    <>
                        {context.unitSelected.kind}:&nbsp;
                        <UnitLink
                            unitName={context.unitSelected.name}
                            className={styles.unitPatch}
                        />
                    </>
                ) : (
                    "Pick unit on scheme"
                )}
            </div>

            {context?.unitSelected && (
                <div className={styles.description}>{context.unitSelected.description}</div>
            )}

            {context?.unitSelected && context.unitSelected.dependents.length > 0 && (
                <div>
                    <div>Dependents:</div>
                    <div className={styles.list}>
                        {context.unitSelected.dependents.map((element) => (
                            <UnitLink
                                key={element}
                                unitName={element}
                                className={styles.unitPatch}
                            />
                        ))}
                    </div>
                </div>
            )}

            {context?.unitSelected && context.unitSelected.dependencies.length > 0 && (
                <div>
                    <div>Dependencies:</div>
                    <div className={styles.list}>
                        {context.unitSelected.dependencies.map((element) => (
                            <UnitLink
                                key={element}
                                unitName={element}
                                className={styles.unitPatch}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
