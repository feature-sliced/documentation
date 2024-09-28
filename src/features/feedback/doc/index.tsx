import React, { useEffect } from "react";
import { translate } from "@docusaurus/Translate";
import { FeedbackButton } from "pushfeedback-react";
import { defineCustomElements } from "pushfeedback/loader";

import "pushfeedback/dist/pushfeedback/pushfeedback.css";

export function FeedbackWidget({ projectId }: { projectId: string }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            defineCustomElements(window);
        }
    }, []);

    return (
        <div className="feedback-widget">
            <FeedbackButton
                project={projectId}
                email-placeholder={translate({
                    id: "features.feedback-doc.email-placeholder",
                })}
                error-message={translate({
                    id: "features.feedback-doc.error-message",
                })}
                modal-title-error-4-0-3={translate({
                    id: "features.feedback-doc.modal-title-error-4-0-3",
                })}
                modal-title-error-4-0-4={translate({
                    id: "features.feedback-doc.modal-title-error-4-0-4",
                })}
                message-placeholder={translate({
                    id: "features.feedback-doc.message-placeholder",
                })}
                modal-title={translate({
                    id: "features.feedback-doc.modal-title",
                })}
                modal-title-error={translate({
                    id: "features.feedback-doc.modal-title-error",
                })}
                modal-title-success={translate({
                    id: "features.feedback-doc.modal-title-success",
                })}
                screenshot-button-text={translate({
                    id: "features.feedback-doc.screenshot-button-text",
                })}
                screenshot-topbar-text={translate({
                    id: "features.feedback-doc.screenshot-topbar-text",
                })}
                send-button-text={translate({
                    id: "features.feedback-doc.send-button-text",
                })}
                rating-placeholder={translate({
                    id: "features.feedback-doc.rating-placeholder",
                })}
                rating-stars-placeholder={translate({
                    id: "features.feedback-doc.rating-stars-placeholder",
                })}
                button-position="bottom-right"
                button-style="dark"
                modal-position="bottom-right"
                custom-font="true"
            >
                {translate({ id: "features.feedback-doc.button-text" })}
            </FeedbackButton>
        </div>
    );
}
