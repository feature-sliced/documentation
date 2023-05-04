import React from "react";
import clsx from "clsx";
import { BgColorsOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

// !!! FIXME: [FSDCUR] Remove after release

type Props = {
    onColorToggle: () => void;
};

export const DevTools: React.FC<Props> = ({ onColorToggle }) => {
    return (
        <div className={styles.root}>
            <div className={styles.rootContainer}>
                <div>
                    <button
                        className={clsx("button button--primary", styles.switchColor)}
                        onClick={onColorToggle}
                    >
                        <BgColorsOutlined className={styles.icon} />
                    </button>
                </div>
            </div>
        </div>
    );
};
