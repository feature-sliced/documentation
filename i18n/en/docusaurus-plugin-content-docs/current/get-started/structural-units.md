---
sidebar_position: 6
---

# Structural units

## Module

Structural unit of the project

A module usually means a specific file or directory *(an abstraction in the context of a structure)*

- *authorization module*
- *page module*
- *the module of the component in the feature*
- *action module in the entity model*
- *etc.*

## [Layer][refs-layers]

Each of the directories located at the topmost level of the application.

This level defines the [scope of responsibility of modules][refs-split-layers], as well as the level of danger of changes

- **Representatives**: [`app`][refs-layers-app], [`processes`][refs-layers-processes], [`pages`][refs-layers-pages], [`widgets`][refs-layers-widgets], [`features`][refs-layers-features], [`entities`][refs-layers-entities], [`shared`][refs-layers-shared]

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

## Slice

Each of the elements located at the top level of the layers

This level is [poorly regulated][refs-split-slices] is a methodology, but a lot depends on the specific project, stack and team

- **Representatives (from each layer)** [`process`][refs-layers-processes], [`page`][refs-layers-pages], [`widget`][refs-layers-widgets], [`feature`][refs-layers-features], [`entity`][refs-layers-entities]

```sh
├── app/
|   # Does not have specific slices, 
|   # Because it contains meta-logic on the project and its initialization
├── processes/
|   # Slices implementing processes on pages
|   ├── payment
|   ├── auth
|   ├── quick-tour
|   └── ...
├── pages/
|   # Slices implementing application pages
|   # At the same time, due to the specifics of routing, they can be invested in each other
|   ├── profile
|   ├── sign-up
|   ├── feed
|   └── ...
├── widgets/
|   # Slices implementing independent page blocks
|   ├── header
|   ├── feed
|   └── ...
├── features/
|   # Slices implementing user scenarios on pages
|   ├── auth-by-phone
|   ├── inline-post
|   └── ...
├── entities/
|   # Slices of business entities for implementing a more complex BL
|   ├── viewer
|   ├── posts
|   ├── i18n
|   └── ...
├── shared/
|   # Does not have specific slices
|   # is rather a set of commonly used segments, without binding to the BL
```

## [Segment][refs-segments]

Each of the modules located at the top level of each slice

This level determines [the purpose of modules in the code and implementation][refs-split-segments], according to classical design models

- **Representatives**: [`ui`][refs-segments-ui], [`model`][refs-segments-model], [`lib`][refs-segments-lib], [`api`][refs-segments-api], [`config`][refs-segments-config]

```sh
{layer}/
    ├── {slice}/
    |   ├── ui/                     # UI-logic (components, ui-widgets, ...)
    |   ├── model/                  # Business logic (store, actions, effects, reducers, ...)
    |   ├── lib/                    # Infrastructure logic (utils/helpers)
    |   ├── config/                 # Application configuration (env-vars, ...)
    |   └── api/                    # Logic of API requests (api instances, requests, ...)
```

:::note

Since not every layer explicitly uses slices (app, shared)

- Segments can be arranged according to their own rules `shared/{api, config}`
- Or not to use `app/{providers, styles}` at all

:::

## See also

- [Abstraction levels by methodology][refs-split]
- [Layers in the methodology][refs-layers]
- [Segments in the methodology][refs-segments]

[refs-split]: /docs/concepts/decomposition
[refs-split-layers]: /docs/concepts/decomposition#group-layers
[refs-split-slices]: /docs/concepts/decomposition#group-slices
[refs-split-segments]: /docs/concepts/decomposition#group-segments

[refs-layers]: /docs/concepts/decomposition/layers
[refs-layers-app]: /docs/concepts/decomposition/referenceapp
[refs-layers-processes]: /docs/concepts/decomposition/referenceprocesses
[refs-layers-pages]: /docs/concepts/decomposition/referencepages
[refs-layers-widgets]: /docs/concepts/decomposition/referencewidgets
[refs-layers-features]: /docs/concepts/decomposition/referencefeatures
[refs-layers-entities]: /docs/concepts/decomposition/referenceentities
[refs-layers-shared]: /docs/concepts/decomposition/referenceshared
[refs-segments]: /docs/concepts/decomposition/segments
[refs-segments-ui]: /docs/concepts/decomposition/segments#ui
[refs-segments-model]: /docs/concepts/decomposition/segments#model
[refs-segments-lib]: /docs/concepts/decomposition/segments#lib
[refs-segments-api]: /docs/concepts/decomposition/segments#api
[refs-segments-config]: /docs/concepts/decomposition/segments#config
