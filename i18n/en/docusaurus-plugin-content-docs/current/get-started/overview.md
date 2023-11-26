---
sidebar_position: 1
---

# Overview

**Feature-Sliced Design** (FSD) is an architectural methodology for scaffolding front-end applications. Simply put, it's a compilation of rules and conventions on organizing code. The main purpose of this methodology is to make the project more understandable and structured in the face of ever-changing business requirements.

## Is it right for me?

FSD can be implemented in projects and teams of any size, but there are a few things to keep in mind:

- This methodology is for front-end projects only. If you're looking for a back-end architecture, consider [Clean Architecture][refs-clean-architecture].
- This methodology is for user-facing applications only, not for libraries or UI kits. If you're looking for an architecture for a UI kit, see [Material UI][ext-material-ui] for inspiration.
- A very simple app of a single page might not need the benefits of FSD and suffer from the overhead. However, FSD promotes a nice way of thinking, so feel free to use it on the tiniest projects if you want.
- A huge app, the size of the Google Cloud admin dashboard, will require a custom architecture. It could still be based on FSD, by the way.

FSD doesn't enforce a particular programming language, UI framework or state manager — bring your own or see some [examples][refs-examples].

If you have an existing project, fear not — FSD can be adopted incrementally. Just make sure that your team is **in&nbsp;pain** from the current architecture, otherwise a switch might not be worth it. For migration guidance, see the [Migration section][refs-migration].

## Basics

In FSD, a project consists of <mark>layers</mark>, each layer is made up of <mark>slices</mark> and each slice is made up of <mark>segments</mark>. 

![themed--scheme](/img/visual_schema.jpg)

The **layers** are standardized across all projects and vertically arranged. Modules on one layer can only interact with modules from the layers strictly below. There are currently seven of them (bottom to top):

1. `shared` — reusable functionality, detached from the specifics of the project/business.
   <small>(e.g. UIKit, libs, API)</small>
2. `entities` — business entities.
   <small>(e.g., User, Product, Order)</small>
3. `features` — user interactions, actions that bring business value to the user.
   <small>(e.g. SendComment, AddToCart, UsersSearch)</small>
4. `widgets` — compositional layer to combine entities and features into meaningful blocks.
   <small>(e.g. IssuesList, UserProfile)</small>
5. `pages` — compositional layer to construct full pages from entities, features and widgets.
6. `processes` (deprecated) — complex inter-page scenarios. 
   <small>(e.g., authentication)</small>
7. `app` — app-wide settings, styles and providers.


Then there are **slices**, which partition the code by business domain. This makes your codebase easy to navigate by keeping logically related modules close together. Slices cannot use other slices on the same layer, and that helps with high cohesion and low coupling.

Each slice, in turn, consists of **segments**. These are tiny modules that are meant to help with separating code within a slice by its technical purpose. The most common segments are `ui`, `model` (store,  actions), `api` and `lib` (utils/hooks), but you can omit some or add more, as you see fit.

:::note

In most cases, [it is recommended][ext-disc-api] to place `api` and `config` only in the shared layer, unless your API client is also your storage (GraphQL, TanStack Query, etc.)

:::

## Example

Let's consider a social network application.

* `app/` contains setup of routing, store and global styles.
* `pages/` contains the route components for each page in the app, mostly composition, hardly any logic.

Within that application, let's consider a post card in a news feed.

* `widgets/` contains the "assembled" post card, with content and interactive buttons that are wired up to the relevant calls on the back-end.
* `features/` contains the interactivity of the card (e.g., like button) and the logic of processing those interactions.
* `entities/` contains the shell of the card with slots for content and the interactive elements. The tile representing the post author is also here, but in a different slice.

## Advantages

- **Uniformity**  
  The code is organized by scope of influence (layers), by domain (slices), and by technical purpose (segments).  
  This creates a standardized architecture that is easy to comprehend for newcomers.

- **Controlled reuse of logic**  
  Each architectural component has its purpose and predictable dependencies.  
  This keeps a balance between following the **DRY** principle and adaptation possibilities. 

- **Stability in face of changes and refactoring**  
  A module on a particular layer cannot use other modules on the same layer, or the layers above.  
  This enables isolated modifications without unforeseen consequences.

- **Orientation to business and users needs**  
  When the app is split into business domains, you can navigate the code to discover and deeper understand all the project features.

## Incremental adoption

The power of FSD lies in _structured_ decomposition. At its finest, it enables to locate any part of code near-deterministically. However, the level of decomposition is a parameter, and each team can tweak it to strike a balance between simple adoption and the amount of benefits.

Here's a proposed strategy to migrate an existing codebase to FSD, based on experience:

1. Start by outlining the `app` and `shared` layers to create a foundation. Usually, these layers are the smallest.

2. Distribute all of the existing UI across `widgets` and `pages`, even if they have dependencies that violate the rules of FSD.

3. Start gradually increasing the precision of decomposition by separating `features` and `entities`, turning pages and widgets from logic-bearing layers into purely compositional layers.

It's advised to refrain from adding new large entities while refactoring or refactoring only certain parts of the project.

[refs-clean-architecture]: https://medium.com/codex/clean-architecture-for-dummies-df6561d42c94
[ext-disc-api]: https://github.com/feature-sliced/documentation/discussions/66
[ext-material-ui]: https://github.com/mui/material-ui
[refs-examples]: /examples
[refs-migration]: /docs/guides/migration
