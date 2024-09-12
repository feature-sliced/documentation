---
sidebar_position: 3
---

# Public API

A public API is a _contract_ between a group of modules, like a slice, and the code that uses it. It also acts as a gate, only allowing access to certain objects, and only through that public API.

In practice, it's usually implemented as an index file with re-exports:

```ts title="pages/auth/index.ts"
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

## What makes a good public API?

A good public API makes using and integrating into other code a slice convenient and reliable. It can be achieved by setting these two goals:

1. The rest of the application must be protected from changes to the internal structure of this slice, like a refactoring
1. Significant changes in the behavior of the slice that break the previous expectations should be easily detectable

## Public API for cross-imports

Cross-imports are a situation when one slice imports from another slice on the same layer. Usually that is prohibited by the [import rule on layers][import-rule-on-layers], but often there are legitimate reasons to cross-import. For example, business entities often reference each other in the real world, and it's best to reflect these relationships in the code instead of working around them.

For this purpose, there's a special kind of public API, also known as the `@x`-notation. If you have entities A and B, and entity B needs to import from entity A, then entity A can declare a separate public API just for entity B.

- `📂 entities`
    - `📂 A`
        - `📂 @x`
            - `📄 B.ts` — a special public API just for code inside `entities/B/`
        - `📄 index.ts` — the regular public API

Then the code inside `entities/B/` can import from `entities/A/@x/B`:

```ts
import type { EntityA } from "entities/A/@x/B";
```

The notation `A/@x/B` is meant to be read as "A crossed with B".

:::note

Try to keep cross-imports to a minimum, and **only use this notation on the Entities layer**, where eliminating cross-imports is often unreasonable.

:::

## Issues with index files

Index files, also known as barrel files, are the most common way to define a public API. They are easy to make, but they are known to cause problems like these:

- making bundles unnecessarily large by including unused code
- not actually offering protection against side-stepping the public API
- introducing more danger of circular imports
- slowing down development performance of bundlers on large projects

To tackle the issues of side-stepping and circular imports, consider using [Steiger][ext-steiger], an architectural linter with a ruleset for Feature-Sliced Design.

<!-- CONTINUE: suggest splitting the project, suggest using Node packages as public API, mention shared/ui and shared/lib -->

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-please-stop-using-barrel-files]: https://tkdodo.eu/blog/please-stop-using-barrel-files
