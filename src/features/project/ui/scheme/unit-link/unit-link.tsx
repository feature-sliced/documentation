import React, { ComponentProps, FunctionComponent } from "react";
import clsx from "clsx";

import { UnitName, useProjectStateful } from "../../../model";

import styles from "./unit-link.module.css";

export const UnitLink: FunctionComponent<
    ComponentProps<"div"> & {
        unitName: UnitName;
    }
> = ({ unitName, className, onMouseOver, onMouseOut, onClick, children, ...props }) => {
    const context = useProjectStateful();

    let status: "none" | "related" | "selected" | "highlighted" = "none";
    if (context?.unitSelected?.dependents.includes(unitName)) status = "related";
    if (context?.unitSelected?.dependencies.includes(unitName)) status = "related";
    if (context?.unitSelected?.name === unitName) status = "selected";
    if (context?.unitHighlighted?.name === unitName) status = "highlighted";

    const color: string = {
        none: styles.white,
        selected: styles.blue,
        highlighted: styles.red,
        related: styles.blue,
    }[status];

    const appearance: string = {
        none: styles.filled,
        selected: styles.filled,
        highlighted: styles.filled,
        related: styles.underscored,
    }[status];

    return (
        <div
            className={clsx(styles.unit, color, appearance, className)}
            onMouseOver={(event) => {
                context?.setUnitHighlighted(unitName);
                event.stopPropagation();
                onMouseOver?.(event);
            }}
            onMouseOut={(event) => {
                context?.setUnitHighlighted(null);
                event.stopPropagation();
                onMouseOut?.(event);
            }}
            onClick={(event) => {
                if (context?.unitSelected?.name === unitName) {
                    context.setUnitSelected(null);
                    if (context.unitHighlighted?.name === unitName) {
                        context.setUnitHighlighted(null);
                    }
                } else {
                    context?.setUnitSelected(unitName);
                }
                event.stopPropagation();
                onClick?.(event);
            }}
            {...props}
        >
            {children || unitName}
        </div>
    );
};
