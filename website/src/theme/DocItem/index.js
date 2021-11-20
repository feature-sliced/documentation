import sha1 from "sha1";
import React from "react";
import OriginalDocItem from "@theme-original/DocItem";
import { OpenGraphPreview } from "../../shared/lib/open-graph-preview";

function DocItem(props) {
    const { content } = props;
    const { id, source } = content.metadata;
    const lang = source.match(/i18n\/(?<locale>[a-z]+)\//)?.locale;
    const hashFileName = sha1(id + lang);

    return (
        <>
            <OpenGraphPreview imgUrl={hashFileName} />
            <OriginalDocItem {...props} />
        </>
    );
}

export default DocItem;
