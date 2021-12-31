import React from "react";
import OriginalDocItem from "@theme-original/DocItem";
import { OGMeta } from "@site/src/shared/lib/og-meta";
import { useOGUrl } from "./lib";

function DocItem(props) {
    const { content } = props;
    const ogUrl = useOGUrl(content.metadata);

    return (
        <>
            process.env.OG_EXP && <OGMeta imgUrl={ogUrl} />
            <OriginalDocItem {...props} />
        </>
    );
}

export default DocItem;
