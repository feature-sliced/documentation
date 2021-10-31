import React, { useState } from "react";
import clsx from "clsx";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";

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
                <span>Thank you for letting us know!</span>
            </div>
        );
    }
    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.title}>
                <span className={styles.titleLabel}>Was this page helpful?</span>
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
                <span>Your feedback helps us improve the docs</span>
            </div>
        </div>
    );
};
