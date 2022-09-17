---
sidebar_position: 1
---

# Overview

:::caution

Only basic information on the methodology is presented here

For a more competent application, it is worth getting acquainted with each concept in more detail in the corresponding section of the documentation

:::

## Is it right for me?

FSD can be implemented in projects and teams of any size, but there are a few things to keep in mind:

- This methodology is for front-end projects only. If you're looking for a back-end architecture, consider [Clean Architecture][refs-clean-architecture].
- A very simple app of a single page might not need the benefits of FSD and suffer from the overhead. However, FSD promotes a nice way of thinking, so feel free to use on the tiniest projects if you want.
- A huge app, the size of the Google Cloud admin dashboard, will require a custom architecture. It could still be based on FSD, by the way.

FSD doesn't enforce a particular programming language, UI framework or state manager — bring your own or see some [examples][refs-examples].

If you have an existing project, fear not — FSD can be adopted incrementally. Just make sure that your team is **in&nbsp;pain** from the current architecture, otherwise a switch might not be worth it. <!-- For migration guidance, see the Migration section. TODO: add the migration section and link to it here -->

## Basics

In FSD, a [project consists][refs-splitting] of <mark>layers</mark>, each layer is made up of <mark>slices</mark> and each slice is made up of <mark>segments</mark>. 

![themed--scheme](/img/visual_schema.jpg)

The <mark>layers</mark> are standardized across all projects and vertically arranged. Modules on one layer can only interact with modules from the layers strictly below. There are currently seven of them (bottom to top):

1. `shared` — reusable functionality, detached from the specifics of the project/business.
   <small>(e.g. UIKit, libs, API)</small>
2. `entities` — business entities.
   <small>(e.g., User, Product, Order)</small>
3. `features` — user interactions, actions that bring business value to the user.
   <small>(e.g. SendComment, AddToCart, UsersSearch)</small>
4. `widgets` — compositional layer to combine entities and features into meaningful blocks.
   <small>(e.g. IssuesList, UserProfile)</small>
5. `pages` — compositional layer to construct full pages from entities, features and widgets.
6. `processes` — complex inter-page scenarios. 
   <small>(e.g., authentication)</small>
7. `app` — app-wide settings, styles and providers.


Then there are <mark>slices</mark>, which partition the code by business domain. This makes your codebase easy to navigate by keeping logically related modules close together. Slices cannot use other slices on the same layer, and that helps with high cohesion and low coupling.

Each slice, in turn, consists of <mark>segments</mark>. These are tiny modules that are meant to help with separating code within a slice by its technical purpose. The most common segments are `ui`, `model` (store,  actions), `api` and `lib` (utils/hooks), but you can omit some or add more, as you see fit.

:::note

In most cases, [it is recommended][ext-disc-api] to place `api` and `config` only in the shared layer

:::

**Also, FSD have few core-concepts:**
- [Public API][refs-public-api] - each module must have a *declaration of its public API* at the top level - without access to internal structure of modules with isolation of implementation
- [Isolation][refs-isolation] (Low Coupling & High Cohesion) - the module should not *depend directly* on other modules of the same layer or overlying layers (to prevent implicit connections and side effects during development and refactoring)
- [Domain Driven][refs-needs-driven] - orientation *to the needs of the business and the user* with [app splitting][refs-splitting] by business domains

## Example

Let's consider a social network application.

* `app/` contains setup of routing, store and global styles.
* `processes/` contains the part of authentication that is responsible for reading/writing authentication tokens.
* `pages/` contains the route components for each page in the app, mostly composition, hardly any logic.

Within that application, let's consider a post card in a news feed.

* `widgets/` contains the "assembled" post card, with content and interactive buttons that are wired up to the relevant calls on the back-end.
* `features/` contains the interactivity of the card (e.g., like button) and the logic of processing those interactions.
* `entities/` contains the shell of the card with slots for content and the interactive elements. The tile representing the post author is also here, but in a different slice.


```sh
└── src/
    ├── app/                    # Layer: Application
    |                           #
    ├── processes/              # Layer: Processes (optional)
    |   ├── {some-process}/     #     Slice: (e.g. CartPayment process)
    |   |   ├── lib/            #         Segment: Utility logic (utils/hooks)
    |   |   └── model/          #         Segment: Business Logic
    |   ...                     #
    ├── pages/                  # Layer: Pages
    |   ├── {some-page}/        #     Slice: (e.g. ProfilePage page)
    |   |   ├── lib/            #         Segment: Utility logic (utils/hooks)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    ├── widgets/                # Layer: Widgets
    |   ├── {some-widget}/      #     Slice: (e.g. Header widget)
    |   |   ├── lib/            #         Segment: Utility logic (utils/hooks)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    ├── features/               # Layer: Features
    |   ├── {some-feature}/     #     Slice: (e.g. AuthByPhone feature)
    |   |   ├── lib/            #         Segment: Utility logic (utils/hooks)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    ├── entities/               # Layer: Business Entities
    |   ├── {some-entity}/      #     Slice: (e.g. entity User)
    |   |   ├── lib/            #         Segment: Utility logic (utils/hooks)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    ├── shared/                 # Layer: Reused resources
    |   ├── api/                #         Segment: Logic of API requests
    |   ├── config/             #         Segment: Application configuration
    |   ├── lib/                #         Segment: General utility logic
    |   └── ui/                 #         Segment: UIKit of the application
    |   ...                     #
    └── index.tsx/              #
```

## Advantages

- **Uniformity**  
  The code is organized by scope of influence (layers), by domain (slices), and by technical purpose (segments).  
  This creates a standardized architecture that is easier to comprehend for newcomers.

- **Controlled reuse of logic**  
  Each architectural component has its purpose and predictable dependencies.  
  This keeps a balance between following the **DRY** principle and adaptation possibilities. 

- **Stability in face of changes and refactoring**  
  A module on a particular layer cannot use other modules on the same layer, or the layers above.  
  This enables isolated modifications without unforeseen consequences.


## Incremental adoption

The power of FSD lies in _structured_ decomposition. At its finest, it enables to locate any part of code near-deterministically. However, the level of decomposition is a parameter, and each team can tweak it to strike a balance between simple adoption and the amount of benefits.

Here's a proposed strategy to migrate an existing codebase to FSD, based on experience:

1. Start by outlining the `app` and `shared` layers to create a foundation. Usually, these layers are the smallest.

2. Distribute all of the existing UI across `widgets` and `pages`, even if they have dependencies that violate the rules of FSD.

3. Start gradually increasing the precision of decomposition by separating `features` and `entities`, turning pages and widgets from logic-bearing layers into purely compositional layers.

It's advised to refrain from adding new large entities while refactoring or refactoring only certain parts of the project.

## See also

- [(Section) Fundamental concepts of the methodology][refs-concepts]
- [(Section) Guides and examples on the application of the methodology][refs-guides]
- [(Article) About splitting the logic in the application. Modularization][refs-splitting]

[ext-disc-api]: https://github.com/feature-sliced/documentation/discussions/66

[refs-concepts]: /docs/concepts
[refs-public-api]: /docs/concepts/public-api
[refs-isolation]: /docs/concepts/cross-communication
[refs-needs-driven]: /docs/concepts/needs-driven
[refs-adaptability]: /docs/concepts/naming-adaptability

[refs-splitting]: /docs/concepts/app-splitting
[refs-splitting-layers]: /docs/concepts/app-splitting#group-layers
[refs-splitting-slices]: /docs/concepts/app-splitting#group-slices
[refs-splitting-segments]: /docs/concepts/app-splitting#group-segments

[refs-guides]: /docs/guides
[refs-low-coupling]: /docs/concepts/low-coupling
[refs-examples]: /examples
[refs-clean-architecture]: https://medium.com/codex/clean-architecture-for-dummies-df6561d42c94
