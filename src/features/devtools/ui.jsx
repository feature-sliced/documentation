import React from "react";
import clsx from "clsx";
import { BgColorsOutlined, CopyrightOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

export const DevTools = ({ logo, color }) => {
    return (
        <div className={styles.root}>
            <div className={styles.rootContainer}>
                <SwitchLogo {...logo} />
                <SwitchColor {...color} />
            </div>
        </div>
    );
};

const SwitchColor = ({ onToggle }) => {
    return (
        <button className={clsx("button button--primary", styles.switchColor)} onClick={onToggle}>
            <BgColorsOutlined className={styles.icon} />
        </button>
    );
};

const SwitchLogo = ({ onToggle, idx }) => {
    return (
        <button className={clsx("button", styles.switchLogo)} onClick={onToggle}>
            {/* <CopyrightOutlined className={styles.icon} /> */}
            <div>L{idx}</div>
        </button>
    );
};
