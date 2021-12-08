import sha1 from "sha1";
import React from "react";
import OriginalDocItem from "@theme-original/DocItem";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { OpenGraphPreview } from "@site/src/shared/lib/open-graph-preview";

function DocItem(props) {
    const { content } = props;
    const { id } = content.metadata;
    const { siteConfig, i18n } = useDocusaurusContext();

    const hashFileName = sha1(id + i18n.currentLocale);

    return (
        <>
            <OpenGraphPreview
                imgUrl={`${siteConfig.url}${
                    /* OG Preview images build with locale prefix (.../en/assets/...) for not default locales */
                    i18n.currentLocale !== i18n.defaultLocale ? `/${i18n.currentLocale}` : ""
                }/assets/og/${hashFileName}.jpg`}
            />
            <OriginalDocItem {...props} />
        </>
    );
}

export default DocItem;
