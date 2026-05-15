# Website

This website is built using [Astro](https://astro.build/) with the [Starlight](https://starlight.astro.build/) documentation theme.

## i18n

Localization is managed via Starlight's built-in locale support. Locale content lives under `src/content/<locale>/docs/`.

Supported locales: English (root), Russian, Uzbek, Korean, Japanese, Vietnamese, Chinese.

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Preview

```bash
pnpm preview
```

Serves the built site locally for review before deployment.
