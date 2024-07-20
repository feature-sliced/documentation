import React from "react";
import DocItemFooter from "@theme-original/DocItem/Footer";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FeedbackWidget } from "@site/src/features/feedback/doc";
import type DocItemFooterType from "@theme/DocItem/Footer";
// eslint-disable-next-line import/no-unresolved
import type { WrapperProps } from "@docusaurus/types";

type Props = WrapperProps<typeof DocItemFooterType>;

export default function FooterWrapper(props: Props) {
    const {
        siteConfig: { url, customFields },
    } = useDocusaurusContext();

    return (
        <>
            <DocItemFooter {...props} />
            {typeof customFields.pushFeedbackProjectId === "string" &&
                window.location.hostname === new URL(url).hostname && (
                    <FeedbackWidget
                        projectId={customFields.pushFeedbackProjectId}
                    />
                )}
        </>
    );
}
