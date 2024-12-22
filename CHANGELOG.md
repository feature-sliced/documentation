# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- ## [Since last release][since-last-release] -->

## [2.1.0] - 2024-10-31

The new revision of Feature-Sliced Design is here! The main difference with FSD 2.0 is the new approach to decomposition — “pages first”.

### What's “pages-first”?

You do “pages first” by keeping more code in pages. For example, large blocks of UI, forms and data logic that are not reused on other pages should now stay in the slice of the page that they are used in. The division by segments (`ui`, `api`, `model`, etc.) still applies to all this code, and we encourage you to further split and organize code into folders inside of segments — don't just pile all the code into a single file.

In the same way, widgets are no longer just a compositional layer, instead they should also store code that isn't currently needed outside of that widget, including its own stores, business logic, and API interactions.

When you have a need to reuse code in several widgets or pages, consider putting it in Shared. If that code involves business logic (i. e. managing specific modal dialogs), consider breaking it up into infrastructural code, like the modal manager, and the business code, like the content of the modals. The infrastructure can then go to Shared, and the content can stay in the pages that use this infrastructure.

### How is it different?

In FSD 2.0 we explained how to identify entities and features in your application, and then combine them in widgets and pages. Over time we started disliking this approach, mostly for the following reasons: 

- Code cohesion is much worse in this approach
    - You need to jump around several folders just to make changes to a single user flow
    - Unused code is harder to delete because it's somewhere else
- Finding entities and features is still an advanced skill that needs to be developed over time
    - It requires understanding of the business context, which not all developers want to bother with
    - On the other hand, splitting by pages is natural and requires little training
    - Different developers have different understandings of these concepts, which leads to everyone having their own idea of FSD, which causes conflict and misunderstanding

### Is it hard to migrate from FSD 2.0?

This is a non-breaking change, so you don’t even necessarily need to migrate your current FSD projects to FSD 2.1, but we still think the new way of thinking will lead to a more cohesive and less opinionated structure. We’ve compiled a few steps you can take in [the migration guide](https://feature-sliced.design/docs/guides/migration/from-v2-0).

### What else happened since the last release?

The cross-import notation (`@x`) that was an experimental proposal for a long time has now been standardized! Its official name is **Public API for cross-imports**. You can use it to create explicit connections between entities. There's [a new section in our documentation all about this new notation](https://feature-sliced.design/docs/reference/public-api#public-api-for-cross-imports).

Another exciting new thing in the FSD ecosystem is our architectural linter, [Steiger](https://github.com/feature-sliced/steiger). It's still in active development, but it is production-ready.

A couple more minor clarifications to the docs were made as well:

1. Application-aware things like the route constants, the API calls, or company logo, are now explicitly allowed in Shared. Business logic is still not allowed, but these things are not considered to be business logic.
2. Imports between segments in App and Shared were always allowed, but it's been made explicit too.

And here's what happened to the documentation website:

#### Added

- Slightly rewritten and expanded overview page to give some details about FSD right away (#685).
- New partial translations: Korean (#739, #736, #735, #742, #732, #730, #715), Japanese (#728).
- The tutorial was rewritten. Technical details were stripped out, more FSD theory has been added (#665).
- Guides on how to deal with common frontend issues like page layouts (#708), types (#701), authentication (#693).
- Guides on how to use FSD with Nuxt (#710, #689, #683, #679), SvelteKit (#698), Next.js (#699, #664, #644), and TanStack Query (#673).
- A new feedback widget, powered by PushFeedback! Go give it a try and let us know what you think of the new pages (#695).
- Comparison of FSD with Atomic Design (#671).

#### Changed

- The migration guide from a custom architecture (formerly known as "from legacy") has been actualized (#725).

#### Removed

- The decomposition cheatsheet is now unlisted for an undefined period of time. It proved to be more harmful than useful, but maybe it can be saved later (#649).

## [2.0.0] - 2023-10-01

> **Note**  
> This release note is retrospective, meaning that prior to this release, the Feature-Sliced Design project did not keep a changelog. Below is a summary of the most prominent recent changes, but there is no FSD v1. Prior to FSD, there has been a project called ["Feature Slices"](https://feature-sliced.github.io/featureslices.dev/v1.0.html), and it is considered to be the v1 of FSD.

### Deprecated

- The **Processes** layer is now deprecated. If you're using this layer, consider moving the code to the **Features** layer, with the help of the **App** layer if you need to access pages.

### Added

- The docs are now available in the Uzbek language! The translation is a work in progress, so feel free to contribute (#597, #603, #605).
- Layers, slices, and segments now have strict definitions to avoid ambiguity (#547).
- We now have a multi-lingual Discord community! Feel free to join and ask questions in English, Spanish, German, Ukrainian, Russian, and Japanese.
- The Telegram community is now making use of forum topics to enable conversations in multiple languages: English, Spanish, Ukrainian, Russian, Japanese, Kazakh, Uzbek, and Serbian.

### Changed

- The documentation is now English-first. Other languages are, of course, still supported (#509).
- A new decomposition cheatsheet has been released (#627).
- The FAQ section has been updated, outdated questions have been removed (#628).
- The visual depiction of layers has been updated to reflect their folder-based nature (#583).
- The README has been refreshed, now it features official badges that you can use in your projects (#569).
- The pages about naming and knowledge types have been rewritten for clarity (#550, #551).
- The documentation has been thoroughly reorganised. The old URLs will redirect to the right places (#471, #531).
- The first page of the docs is now a helpful index with a prominent first step (#525).
- The overview page has been rewritten to be more concise and informative (#512, #515, #516).
- FSD has updated its branding, and there are now guidelines to the brand usage. The standard spelling of the name is now "Feature-Sliced Design" (#496, #499, #500, #465).

[since-last-release]: https://github.com/feature-sliced/documentation/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/feature-sliced/documentation/releases/tag/v2.1.0
[2.0.0]: https://github.com/feature-sliced/documentation/releases/tag/v2.0.0
