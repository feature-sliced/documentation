---
sidebar_position: 3
---

# Migration from v2.0 to v2.1

The main change in v2.1 is the new mental model for decomposing an interface — pages first.

In v2.0, FSD would recommend identifying entities and features in your interface, considering even the smallest bits of entity representation and interactivity for decomposition. Then you would build widgets and pages from entities and features. In this model of decomposition, most of the logic was in entities and features, and pages were just compositional layers that didn't have much significance on their own.

In v2.1, we recommend starting with pages, and possibly even stopping there. Most people already know how to separate the app into individual pages, and pages are also a common starting point when trying to locate a component in the codebase. In this new model of decomposition, you keep most of the UI and logic in each individual page, maintaining a reusable foundation in Shared. If a need arises to reuse business logic across several pages, you can move it to a layer below.

Another addition to Feature-Sliced Design is the standardization of cross-imports between entities with the `@x`-notation.

## How to migrate {#how-to-migrate}

There are no breaking changes in v2.1, which means that a project written with FSD v2.0 is also a valid project in FSD v2.1. However, we believe that the new mental model is more beneficial for teams and especially onboarding new developers, so we recommend making minor adjustments to your decomposition.

### Merge slices

A simple way to start is by running our linter, [Steiger][steiger], on the project. Steiger is built with the new mental model, and the most helpful rules will be:

- [`insignificant-slice`][insignificant-slice] — if an entity or feature is only used in one page, this rule will suggest merging that entity or feature into the page entirely.
- [`excessive-slicing`][excessive-slicing] — if a layer has too many slices, it's usually a sign that the decomposition is too fine-grained. This rule will suggest merging or grouping some slices to help project navigation.

```bash
npx steiger src
```

This will help you identify which slices are only used once, so that you could reconsider if they are really necessary. In such considerations, keep in mind that a layer forms some kind of global namespace for all the slices inside of it. Just as you wouldn't pollute the global namespace with variables that are only used once, you should treat a place in the namespace of a layer as valuable, to be used sparingly.

### Standardize cross-imports

If you had cross-imports between in your project before (we don't judge!), you may now take advantage of a new notation for cross-importing in Feature-Sliced Design — the `@x`-notation. It looks like this:

```ts title="entities/B/some/file.ts"
import type { EntityA } from "entities/A/@x/B";
```

For more details, check out the [Public API for cross-imports][public-api-for-cross-imports] section in the reference.

[insignificant-slice]: https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/insignificant-slice
[steiger]: https://github.com/feature-sliced/steiger
[excessive-slicing]: https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/excessive-slicing
[public-api-for-cross-imports]: /docs/reference/public-api#public-api-for-cross-imports
