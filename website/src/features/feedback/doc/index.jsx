import React, { useState } from "react";
import clsx from "clsx";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { translate } from "@docusaurus/Translate";

import styles from "./styles.module.css";

/**
 * Send feedback to Google Analytics
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 */
const sendFeedback = (value) => {
    if (typeof window === undefined) {
        console.debug("[EXP_ONLY] Failure feedback sending: window not defined");
        return;
    }
    if (!window.ga) {
        console.debug("[EXP_ONLY] Failure feedback sending: window.ga not defined");
        return;
    }

    window.ga("send", {
        hitType: "event",
        eventCategory: "Feedback",
        eventAction: "EXP::Docs:Helpful",
        eventLabel: window.location.href,
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
