# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## i18n

- [Russian docs version](i18n/ru)
- [English docs version](i18n/en)

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm start       # for default locale
pnpm start:ru    # for RU locale
pnpm start:en    # for EN locale
```

> About [docusaurus/i18n commands](https://docusaurus.io/docs/i18n/git#translate-the-files)

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
