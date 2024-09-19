---
sidebar_position: 3
---

# Public API

A public API is a _contract_ between a group of modules, like a slice, and the code that uses it. It also acts as a gate, only allowing access to certain objects, and only through that public API.

In practice, it's usually implemented as an index file with re-exports:

```js title="pages/auth/index.js"
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

## What makes a good public API?

A good public API makes using and integrating into other code a slice convenient and reliable. It can be achieved by setting these three goals:

1. The rest of the application must be protected from structural changes to the slice, like a refactoring
1. Significant changes in the behavior of the slice that break the previous expectations should cause changes in the public API
1. Only the necessary parts of the slice should be exposed

The last goal has some important practical implications. It may be tempting to create wildcard re-exports of everything, especially in early development of the slice, because any new objects you export from your files are also automatically exported from the slice:

```js title="Bad practice, features/comments/index.js"
// ❌ BAD CODE BELOW, DON'T DO THIS
export * from "./ui/Comment";  // 👎 don't try this at home
export * from "./model/comments";  // 💩 this is bad practice
```

This hurts the discoverability of a slice because you can't easily tell what the interface of this slice is. Not knowing the interface means that you have to dig deep into the code of a slice to understand how to integrate it. Another problem is that you might accidentally expose the module internals accidentally, which will make refactoring difficult if someone starts depending on them.

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

Index files like `index.js`, also known as barrel files, are the most common way to define a public API. They are easy to make, but they are known to cause problems with certain bundlers and frameworks.

### Circular imports

Circular import is when two or more files import each other in a circle.

<figure>
    <img src="/img/circular-import-light.svg#light-mode-only" width="50%" alt="Three files importing each other in a circle" />
    <img src="/img/circular-import-dark.svg#dark-mode-only" width="50%" alt="Three files importing each other in a circle" />
    <figcaption>
        Pictured above: three files, `fileA.js`, `fileB.js`, and `fileC.js`, importing each other in a circle.
    </figcaption>
</figure>

These situations are often difficult for bundlers to deal with, and in some cases they might even lead to runtime errors that might be difficult to debug.

Circular imports can occur without index files, but having an index file presents a clear opporutnity to accidentally create a circular import. It often happens when you have two objects exposed in the public API of a slice, for example, `HomePage` and `loadUserStatistics`, and the `HomePage` needs to access `loadUserStatistics`, but it does it like this:

```jsx title="pages/home/ui/HomePage.jsx"
import { loadUserStatistics } from "../"; // importing from pages/home/index.js

export function HomePage() { /* … */ }
```

```js title="pages/home/index.js"
export { HomePage } from "./ui/HomePage";
export { loadUserStatistics } from "./api/loadUserStatistics";
```

This situation creates a circular import, because `index.js` imports `ui/HomePage.jsx`, but `ui/HomePage.jsx` imports `index.js`.

To prevent this issue, consider these two principles. If you have two files, and one imports from the other:
- When they are in the same slice, always use _relative_ imports and write the full import path
- When they are in different slices, always use _absolute_ imports, for example, with an alias

### Something else

- making bundles unnecessarily large by including unused code
- not actually offering protection against side-stepping the public API
- introducing more danger of circular imports
- slowing down development performance of bundlers on large projects

To tackle the issues of side-stepping and circular imports, consider using [Steiger][ext-steiger], an architectural linter with a ruleset for Feature-Sliced Design.

<!-- CONTINUE: suggest splitting the project, suggest using Node packages as public API, mention shared/ui and shared/lib, mention server/client with Next/Remix -->

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-please-stop-using-barrel-files]: https://tkdodo.eu/blog/please-stop-using-barrel-files
