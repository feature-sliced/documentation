import React, { useState } from "react";
import clsx from "clsx";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";

import styles from "./styles.module.css";

const sendFeedback = (value) => {
    const { analytics, ga, gtag } = window || {};
    console.log(`[DEBIG] Feedback sent: ${value}`, { analytics, ga, gtag });
    // analytics.track("feedback", {
    //     type: "pageHelpful",
    //     value,
    //     section: "endOfPage",
    // });
};

/**
 * DocItem feedback widget
 * @see https://docusaurus.io/feature-requests/p/feedback-widget
 * TODO: Add emojiis (Bad, OK, Good)
 * TODO: Add comment input
 */
export const DocFeedback = ({ className }) => {
    const [feedbackSent, setFeedbackSent] = useState(false);

    const handleFeedback = (value) => {
        setFeedbackSent(true);
        sendFeedback(value);
    };

    if (feedbackSent) {
        return (
            <div className={clsx(styles.root, styles.rootThanks, className)}>
                <span>{translate({ id: "features.feedback-doc.thanks" })}</span>
            </div>
        );
    }
    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.title}>
                <span className={styles.titleLabel}>
                    {translate({ id: "features.feedback-doc.title" })}
                </span>
                <LikeFilled
                    className={clsx(styles.action, styles.actionLike)}
                    onClick={() => handleFeedback(10)}
                />
                <DislikeFilled
                    className={clsx(styles.action, styles.actionDislike)}
                    onClick={() => handleFeedback(0)}
                />
            </div>
            <div className={styles.subtitle}>
                <span>{translate({ id: "features.feedback-doc.subtitle" })}</span>
            </div>
        </div>
    );
};
