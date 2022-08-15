import React, { ComponentProps, FunctionComponent } from "react";
import clsx from "clsx";
import { Icon } from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";
import { mdiCheck, mdiClose } from "@mdi/js";

import { useMaybeControlledState } from "@site/src/shared/lib/use-maybe-controlled-state";

import styles from "./button.module.css";

export const Button: FunctionComponent<
    ComponentProps<"button"> & {
        isEnabled?: boolean;

        isActiveDefault?: boolean;
        isActive?: boolean;
        onActivate?: (value: boolean) => void;

        iconOff?: IconProps["path"];
        iconOn?: IconProps["path"];
        size?: IconProps["size"];
    }
> = ({
    isEnabled = true,

    isActiveDefault = false,
    isActive,
    onActivate,

    iconOff = mdiClose,
    iconOn = mdiCheck,
    size = "32px",

    onClick,
    className,
    style,
    ...props
}) => {
    const [isActiveInner, setActiveInner] = useMaybeControlledState<boolean>(
        isActiveDefault,
        isActive,
        onActivate,
    );

    return (
        <button
            className={clsx(
                styles.button,
                isEnabled && styles.enabled,
                isActiveInner && styles.active,
                className,
            )}
            style={{
                width: size || "32px",
                height: size || "32px",
                ...style,
            }}
            onClick={(event) => {
                if (isEnabled) setActiveInner(!isActiveInner);
                onClick?.(event);
                event.stopPropagation();
            }}
            {...props}
        >
            <Icon path={iconOff} size={size} className={clsx(styles.icon, styles.iconOff)} />
            <Icon path={iconOn} size={size} className={clsx(styles.icon, styles.iconOn)} />
        </button>
    );
};
