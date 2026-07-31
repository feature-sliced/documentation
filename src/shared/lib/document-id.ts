import { pathHasLocale } from "astro:i18n";

/**
 * Starlight normalizes the id of a locale's index document to an empty string,
 * while the content collection keeps the file name. Both spellings reach this
 * module and collapse to the same id.
 */
const ROOT_DOCUMENT_ID = "index";

/**
 * Drops the locale prefix from a collection id, which maps a translation onto
 * the document it was translated from.
 *
 * Starlight derives Astro's i18n configuration from its own `locales` option,
 * so the segments `pathHasLocale` matches are the locales configured for the
 * site. Only the leading segment is checked, because it matches any segment of
 * a path and a document further down the tree may be named after a locale.
 *
 * @example
 * getSourceId("kr/docs/reference/layers"); // "docs/reference/layers"
 * getSourceId("docs/reference/layers");    // "docs/reference/layers"
 * getSourceId("ru/index");                 // ""
 */
export function getSourceId(id: string): string {
    const [maybeLocale, ...rest] = id.split("/");
    const sourceId = pathHasLocale(maybeLocale) ? rest.join("/") : id;

    return sourceId === ROOT_DOCUMENT_ID ? "" : sourceId;
}

/**
 * Landing pages are the only documents that live at the root of a locale:
 * `src/content/docs/index.mdx` and `src/content/docs/<locale>/index.mdx`.
 */
export function isLandingPage(id: string): boolean {
    return getSourceId(id) === "";
}
