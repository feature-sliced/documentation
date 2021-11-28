import sha1 from "sha1";
import React from "react";
import OriginalDocItem from "@theme-original/DocItem";
import { OpenGraphPreview } from "@site/src/shared/lib/open-graph-preview";

function DocItem(props) {
    const { content } = props;
    const { id, source } = content.metadata;

    const { locale } = source.match(/i18n\/(?<locale>[a-z]+)\//)?.groups;

    const hashFileName = sha1(id + (locale || "en"));

    return (
        <>
            {/* TODO: Add and use domain from env? */}
            <OpenGraphPreview
                imgUrl={`https://feature-sliced.design/assets/og/${hashFileName}.jpg`}
            />
            <OriginalDocItem {...props} />
        </>
    );
}

export default DocItem;
