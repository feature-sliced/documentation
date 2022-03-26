import React from "react";
import clsx from "clsx";
import { BgColorsOutlined } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";
import styles from "./styles.module.scss";

export const DevTools = ({ switcher }) => {
    return (
        <div className={styles.root}>
            <button
                className={clsx("button button--primary", styles.switch)}
                onClick={switcher.onToggle}
            >
                <BgColorsOutlined className={styles.icon} />
            </button>
        </div>
    );
};
