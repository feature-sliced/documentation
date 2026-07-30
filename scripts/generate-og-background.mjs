/**
 * Generates the background of the social preview (OG) images.
 *
 * The result is committed, so run this only when the brand background changes:
 *
 *     pnpm og:background
 *
 * The colors are sampled from the hand-made `static/img/preview.png` so that
 * generated previews match the existing brand assets.
 */
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

/** Brand gradient, running from the bottom-left corner to the top-right one. */
const GRADIENT_FROM = "#197184";
const GRADIENT_TO = "#2f4b8e";

/** FSD logo watermark, placed as in `static/img/preview_upper.png`. */
const WATERMARK_WIDTH = 600;
const WATERMARK_OPACITY = 0.28;
const WATERMARK_MARGIN = { right: 56, bottom: 24 };

const logoPath = fileURLToPath(
    new URL("../static/img/brand/logo-primary.png", import.meta.url),
);
const outputPath = fileURLToPath(
    new URL("../src/pages/og/_images/background.png", import.meta.url),
);

const gradient = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
        <defs>
            <linearGradient id="brand" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stop-color="${GRADIENT_FROM}" />
                <stop offset="1" stop-color="${GRADIENT_TO}" />
            </linearGradient>
        </defs>
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#brand)" />
    </svg>`,
);

const logo = await sharp(logoPath)
    .resize({ width: WATERMARK_WIDTH })
    .ensureAlpha()
    .png()
    .toBuffer();
const { width: logoWidth, height: logoHeight } = await sharp(logo).metadata();

/* `dest-in` multiplies the logo's alpha channel, fading it into the background. */
const watermark = await sharp(logo)
    .composite([
        {
            input: Buffer.from(
                `<svg xmlns="http://www.w3.org/2000/svg" width="${logoWidth}" height="${logoHeight}">
                    <rect width="100%" height="100%" fill="#000" fill-opacity="${WATERMARK_OPACITY}" />
                </svg>`,
            ),
            blend: "dest-in",
        },
    ])
    .png()
    .toBuffer();

await sharp(gradient)
    .composite([
        {
            input: watermark,
            left: WIDTH - logoWidth - WATERMARK_MARGIN.right,
            top: HEIGHT - logoHeight - WATERMARK_MARGIN.bottom,
        },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

console.log(`Generated ${outputPath}`);
