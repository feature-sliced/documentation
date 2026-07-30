import { OGImageRoute } from "astro-og-canvas";

import { getPreviewPages } from "@/shared/api";
import { getBreadcrumbs } from "@/shared/lib";

const FONTS_DIR = "./src/pages/og/_fonts";

/**
 * Previews only ever contain English text, which `Roboto Mono` covers on its
 * own. CanvasKit draws with the font data it is given and has no system font to
 * fall back on, so a glyph outside this family is dropped from the image.
 */
const FONTS = [
    `${FONTS_DIR}/roboto-mono/RobotoMono-Regular.ttf`,
    `${FONTS_DIR}/roboto-mono/RobotoMono-Bold.ttf`,
];

const FONT_FAMILIES = ["Roboto Mono"];

type RGBColor = [red: number, green: number, blue: number];

/** Space between the image edge and the text. */
const PADDING = 80;

/**
 * Monospace glyphs are wide, so the title sits below the library default. Even
 * the longest title wraps to two lines at this size and stays above the logo
 * watermark in the background.
 */
const TITLE_FONT_SIZE = 72;

const TITLE_COLOR: RGBColor = [255, 255, 255];

const BREADCRUMB_FONT_SIZE = 40;

/**
 * Light slate, 4.5:1 against the background. The site's muted grey
 * (`--sl-color-gray-3`, `#94a3b8`) only reaches 2.6:1 on this blue, too faint
 * to read in a feed.
 */
const BREADCRUMB_COLOR: RGBColor = [203, 213, 225];

/** `SKIP_OG=true pnpm build` skips image generation, which speeds up local builds. */
const pages = process.env.SKIP_OG ? [] : await getPreviewPages();

export const { getStaticPaths, GET } = await OGImageRoute({
    pages: Object.fromEntries(pages.map((page) => [page.id, page])),

    getSlug: (id) => `${id}.png`,

    getImageOptions: (id, { data }) => ({
        title: data.title,
        description: getBreadcrumbs(id),
        bgImage: { path: "./src/pages/og/_images/background.png" },
        padding: PADDING,
        font: {
            title: {
                size: TITLE_FONT_SIZE,
                lineHeight: 1.2,
                weight: "Bold",
                color: TITLE_COLOR,
                families: FONT_FAMILIES,
            },
            description: {
                size: BREADCRUMB_FONT_SIZE,
                lineHeight: 1.3,
                weight: "Normal",
                color: BREADCRUMB_COLOR,
                families: FONT_FAMILIES,
            },
        },
        fonts: FONTS,
    }),
});
