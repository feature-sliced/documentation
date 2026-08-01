import { getCollection, type CollectionEntry } from "astro:content";

import { isLandingPage } from "@/shared/lib";

/** Route that serves the generated preview images, see `src/pages/og/[...path].ts`. */
const PREVIEW_ROUTE = "/og";

/** Hand-made brand preview, used for landing pages and any route without a generated image. */
const FALLBACK_PREVIEW_IMAGE = "/img/preview.png";

export const PREVIEW_IMAGE_SIZE = { width: 1200, height: 630 };

type PreviewPage = {
    id: string;
    data: CollectionEntry<"docs">["data"];
};

/** `title` is set only when a generated preview is used, never for the fallback. */
type PreviewImage = {
    path: string;
    title?: string;
};

/**
 * Documents with a generated preview, one per translation, so a Korean page
 * carries its Korean title rather than the English one.
 *
 * Landing pages keep the hand-made {@link FALLBACK_PREVIEW_IMAGE}, which
 * already includes the logo and the tagline. Drafts are left out to match
 * Starlight, which drops them from production builds.
 */
export async function getPreviewPages(): Promise<PreviewPage[]> {
    const docs = await getCollection("docs");

    return docs
        .filter(({ id, data }) => !isLandingPage(id) && !data.draft)
        .map(({ id, data }) => ({ id, data }));
}

let titlesByPreviewId: Map<string, string> | undefined;

async function getPreviewTitles(): Promise<Map<string, string>> {
    titlesByPreviewId ??= new Map(
        (await getPreviewPages()).map(({ id, data }) => [id, data.title]),
    );

    return titlesByPreviewId;
}

/**
 * Preview image for a document. On an untranslated page Starlight renders the
 * document of the default locale and passes its id here, so the preview matches
 * the text on the page. Documents without a generated image fall back to the
 * brand preview, so the tag never points at a missing file.
 */
export async function getPreviewImage(id: string): Promise<PreviewImage> {
    const title = (await getPreviewTitles()).get(id);

    return title === undefined
        ? { path: FALLBACK_PREVIEW_IMAGE }
        : { path: `${PREVIEW_ROUTE}/${id}.png`, title };
}
