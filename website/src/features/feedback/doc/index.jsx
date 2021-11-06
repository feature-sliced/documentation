import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";

import { ga } from "@site/src/shared/lib/ga";
import styles from "./styles.module.css";

/**
 * Send feedback to Google Analytics
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 */
const sendFeedback = (value) => {
    // For a while - send feedback in both format
    // Later will keep and maintain only one
    ga.sendEvent({
        category: ga.CATEGORIES.full,
        action: "Docs:Helpful",
        label: window.location.href,
        value,
    });
    ga.sendEvent({
        category: ga.CATEGORIES.mixed,
        action: "Docs:Helpful",
        label: value,
        value,
    });
    ga.sendEvent({
        category: ga.CATEGORIES.short,
        label: window.location.href,
        value,
    });
};

/**
 * DocItem feedback widget
 * @see https://docusaurus.io/feature-requests/p/feedback-widget
 * @ticket FEEDBACK-309
 * @terminateTicket FEEDBACK-325
 * TODO: Add emojiis (Bad, OK, Good)
 * TODO: Add comment input
 */
export const DocFeedback = ({ className }) => {
    const [feedbackSent, setFeedbackSent] = useState(false);

    const handleFeedback = useCallback(
        (value) => () => {
            setFeedbackSent(true);
            sendFeedback(value);
        },
        [],
    );

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
                    onClick={handleFeedback(10)}
                />
                <DislikeFilled
                    className={clsx(styles.action, styles.actionDislike)}
                    onClick={handleFeedback(0)}
                />
            </div>
            <div className={styles.subtitle}>
                <span>{translate({ id: "features.feedback-doc.subtitle" })}</span>
            </div>
        </div>
    );
};
