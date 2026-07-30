import {
    getDocsSegmentIndex,
    getIdSegments,
    isLandingPage,
} from "./document-id";

/** Separator between breadcrumb sections (U+203A, single right-pointing angle quotation mark). */
const SEPARATOR = " › ";

function toTitleCase(segment: string): string {
    return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

/**
 * Builds a label out of the sections a document belongs to, based on its collection id.
 *
 * @example
 * getBreadcrumbs("docs/guides/examples/handling-assets"); // "Guides › Examples"
 * getBreadcrumbs("kr/docs/reference/layers");             // "Reference"
 * getBreadcrumbs("docs/get-started/overview");            // "Get Started"
 * getBreadcrumbs("docs/branding");                        // ""
 */
export function getBreadcrumbs(id: string): string {
    if (isLandingPage(id)) return "";

    const sections = getIdSegments(id).slice(getDocsSegmentIndex(id) + 1, -1);

    return sections.map(toTitleCase).join(SEPARATOR);
}
