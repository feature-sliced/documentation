import React from "react";
import OriginalDocItem from "@theme-original/DocItem";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { OGMeta } from "@site/src/shared/lib/og";
import { useDocOGUrl } from "./lib";

function DocItem(props) {
    const { content } = props;
    const { isOGExperimental } = useDocusaurusContext().siteConfig.customFields;
    const ogUrl = useDocOGUrl(content.metadata);

    return (
        <>
            {isOGExperimental && <OGMeta imgUrl={ogUrl} />}
            <OriginalDocItem {...props} />
        </>
    );
}

export default DocItem;
