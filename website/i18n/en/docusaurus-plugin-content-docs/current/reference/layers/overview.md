---
sidebar_position: 1
---

# Overview

**Layer** - the first level of application partitioning, according to the **scope of influence** of the module

![layers-flow-themed](/img/layers_flow.png)

## Structure

```sh
└── src/
    ├── app/                    # Initializing application logic
    ├── processes/              # (Optional) Application processes running over pages
    ├── pages/                  # Application pages
    ├── widgets/                # Independent and self-contained blocks for pages
    ├── features/               # (Optional) Processing of user scenarios
    ├── entities/               # (Optional) Business entities that domain logic operates with
    └── shared/                 # Reused modules, non business specific
```

## Rules

- Each layer is located only at the topmost level, and cannot occur again at another nesting level

    ```diff
    // Bad
    - pages/../features/..
    - features/../entities/..
    // Good
    + pages/**
    + features/**
    ```

<!-- use: https://www.tablesgenerator.com/markdown_tables# -->

- Each layer can use (import) only the underlying layers
- The higher the layer is located, the higher the level of its responsibility and knowledge about other layers (from top to bottom)
  - `app` > (`processes`) > `pages` > (`widgets`) > `features` > `entities` > `shared`
- The lower the layer is located , the more it is used in the upper layers, and therefore the more dangerous it is to make changes to it (from bottom to top)
  - `shared` > `entities` > `features` > (`widgets`) > `pages` > (`processes`) > `app`

| Layer     |                              Can use                              |                         Can be used by                         |
|-----------|:-----------------------------------------------------------------:|:--------------------------------------------------------------:|
| app       | `shared`, `entities`, `features`, `widgets`, `pages`, `processes` |                                -                               |
| processes |        `shared`, `entities`, `features`, `widgets`, `pages`       |                              `app`                             |
| pages     |            `shared`, `entities`, `features`, `widgets`            |                       `processes`, `app`                       |
| widgets   |                  `shared`, `entities`, `features`                 |                   `pages`, `processes`, `app`                  |
| features  |                        `shared`, `entities`                       |             `widgets`, `pages`, `processes`, `app`             |
| entities  |                              `shared`                             |       `features`, `widgets`, `pages`, `processes`, `app`       |
| shared    |                                 -                                 | `entities`, `features`, `widgets`, `pages`, `processes`, `app` |

## How to use?

1. **First, decompose by main layers relevant to almost any application:**
    - `app` - for initializing application logic
    - `pages` - for application screens
    - `shared` - for abstract commonly used logic (UIKIT / helpers / API)

2. **Then, add the remaining layers as needed:**
    - `widgets` - if the logic on the pages starts to grow and duplicate
    - `entities` - if the amount of deunified logic is growing in the project
    - `features` - if it becomes difficult to find the boundaries of specific user scenarios in the project, and control them
    - `processes` - if a lot of "end-to-end logic" grows over the page

## Layers

<!-- I left the phrases in the comments, in case we decide to return them -->

:::note

It should be understood that not all of the above layers are mandatory, but are needed only when **the complexity of the project and the swelling responsibility** in the existing structure require it

:::

### [`app`][refs-app]

<!-- **Initializing logic of the application** -->

![app-themed-bordered](/img/layers/app.png)

### [`processes`][refs-processes]

<!-- **Application business processes that manage pages** -->

![processes-themed-bordered](/img/layers/processes.png)

### [`pages`][refs-pages]

![pages-themed-bordered](/img/layers/pages.png)

### [`widgets`][refs-widgets]

![widgets-themed-bordered](/img/layers/widgets.png)

### [`features`][refs-features]

<!-- **Parts of the application functionality** -->

![features-themed-bordered](/img/layers/features.png)

### [`entities`][refs-entities]

<!-- **Business Entities** -->

![entities-themed-bordered](/img/layers/entities.png)

### [`shared`][refs-shared]

<!-- **Reused modules, without binding to business logic** -->

![shared-themed-bordered](/img/layers/shared.png)

## See also

- [Naming adaptability][refs-naming-adaptability]
- [Example: Viewer][refs-example-viewer]
  - *Example of logic distribution by layers: from `shared` to `app`*
- [About understanding the needs of users and the functionality of the application][refs-needs]
  - *To understand the `features` layer*
- [(Discussion) About reused modules][disc-sharing]
  - *To understand the `shared` layer*

[refs-naming-adaptability]: /docs/concepts/naming-adaptability
[refs-needs]: /docs/concepts/needs-driven

[refs-low-coupling]: /docs/concepts/low-coupling
[refs-example-viewer]: /docs/guides/examples/auth

[refs-app]: /docs/reference/layers/app
[refs-processes]: /docs/reference/layers/processes
[refs-pages]: /docs/reference/layers/pages
[refs-widgets]: /docs/reference/layers/widgets
[refs-features]: /docs/reference/layers/features
[refs-entities]: /docs/reference/layers/entities
[refs-shared]: /docs/reference/layers/shared

[refs-segments]: /docs/reference/segments
[refs-segments--ui]: /docs/reference/segments#ui
[refs-segments--model]: /docs/reference/segments#model
[refs-segments--lib]: /docs/reference/segments#lib
[refs-segments--api]: /docs/reference/segments#api
[refs-segments--config]: /docs/reference/segments#config

[disc-sharing]: https://github.com/feature-sliced/documentation/discussions/14
