/** Segment that separates the locale prefix from the document path in a collection id. */
const DOCS_SEGMENT = "docs";

export function getIdSegments(id: string): string[] {
    return id.split("/").filter(Boolean);
}

/** Position of the document path within a collection id, past any locale prefix. */
export function getDocsSegmentIndex(id: string): number {
    return getIdSegments(id).indexOf(DOCS_SEGMENT);
}

/**
 * Landing pages are the only documents outside the `docs` directory, so their
 * ids are either empty (`src/content/docs/index.mdx`) or a bare locale
 * (`src/content/docs/ru/index.mdx`). Routes injected by plugins carry no `docs`
 * segment either, so they land here too.
 */
export function isLandingPage(id: string): boolean {
    return getDocsSegmentIndex(id) === -1;
}

/**
 * Drops the locale prefix from a collection id, which maps a translation onto
 * the document it was translated from.
 *
 * @example
 * getSourceId("kr/docs/reference/layers"); // "docs/reference/layers"
 * getSourceId("docs/reference/layers");    // "docs/reference/layers"
 */
export function getSourceId(id: string): string {
    return getIdSegments(id).slice(getDocsSegmentIndex(id)).join("/");
}
