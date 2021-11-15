import React from "react";
import clsx from "clsx";
import { FlagOutlined } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";
import styles from "./styles.module.scss";

export const FeedbackBadge = () => {
    return (
        <div className={styles.root}>
            <a
                className={clsx("button button--primary", styles.button)}
                href={translate({ id: "features.feedback-badge.url" })}
                target="_blank"
                rel="noreferrer noopener"
                title={translate({ id: "features.feedback-badge.label" })}
            >
                <FlagOutlined className={styles.icon} />
            </a>
        </div>
    );
};
