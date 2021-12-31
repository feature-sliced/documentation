import sha1 from "sha1";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export function useDocOGUrl(metadata, buildOGPath = "assets/og/") {
    const { siteConfig, i18n } = useDocusaurusContext();
    const hashFileName = sha1(metadata.id + i18n.currentLocale);

    /* OG Preview images build with locale prefix (.../en/assets/...) for not default locales */
    return `${siteConfig.url}${
        i18n.currentLocale !== i18n.defaultLocale ? `/${i18n.currentLocale}` : ""
    }/${buildOGPath}${hashFileName}.jpg`;
}
