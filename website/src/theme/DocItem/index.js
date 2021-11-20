import sha1 from "sha1";
import React from "react";
import OriginalDocItem from "@theme-original/DocItem";
import { OpenGraphPreview } from "../../shared/lib/open-graph-preview";

function DocItem(props) {
    const { content } = props;
    const { id, source } = content.metadata;

    const lang = source.match(/i18n\/(?<locale>[a-z]+)\//)?.groups?.locale;
    // No any load for static
    const hashFileName = sha1(id + lang);

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
