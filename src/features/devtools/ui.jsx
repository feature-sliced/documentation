import React from "react";
import clsx from "clsx";
import { BgColorsOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

export const DevTools = ({ color }) => {
    return (
        <div className={styles.root}>
            <SwitchColor {...color} />
        </div>
    );
};

const SwitchColor = ({ onToggle }) => {
    return (
        <button className={clsx("button button--primary", styles.switch)} onClick={onToggle}>
            <BgColorsOutlined className={styles.icon} />
        </button>
    );
};
