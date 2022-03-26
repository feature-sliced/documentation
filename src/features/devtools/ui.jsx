import React from "react";
import clsx from "clsx";
import {
    BgColorsOutlined,
    CopyrightOutlined,
    CaretRightOutlined,
    CaretLeftOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";

export const DevTools = ({ logo, color }) => {
    return (
        <div className={styles.root}>
            <div className={styles.rootContainer}>
                {logo && <SwitchLogo {...logo} />}
                {color && <SwitchColor {...color} />}
            </div>
        </div>
    );
};

const useCursor = (idx, total) => {
    const current = String(idx + 1).padStart(2, "0");
    return `[${current}/${total}]`;
};

export const SwitchColor = ({ onToggle }) => {
    return (
        <div>
            <button
                className={clsx("button button--primary", styles.switchColor)}
                onClick={onToggle}
            >
                <BgColorsOutlined className={styles.icon} />
            </button>
        </div>
    );
};

export const SwitchLogo = ({ logo, onPrev, onNext, idx, total }) => {
    const cursor = useCursor(idx, total);

    return (
        <div className={styles.switchLogo}>
            {/* <button className={clsx("button", styles.switchLogo)} onClick={onToggle}>
                <CopyrightOutlined className={styles.icon} />
            </button> */}
            <CaretLeftOutlined onClick={onPrev} />
            <CaretRightOutlined onClick={onNext} />
            <span className={styles.switchLogoTitle}>
                {cursor} {logo}
            </span>
        </div>
    );
};
