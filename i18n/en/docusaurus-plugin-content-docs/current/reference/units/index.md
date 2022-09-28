---
sidebar_position: 1
---

# Units

## Module

Structural unit of the project

A module can be represented as specific file or directory *(an abstraction in the context of a structure)*

- *authorization module*
- *page module*
- *the module of the component in the feature*
- *action module in the entity model*
- *etc.*

## [Layer][refs-layers]

Each project top level directory defines the [scope of responsibility of modules][refs-split-layers], as well as the level of sensitivity to internal changes

- **Representatives**: [`app`][refs-layers-app], [`processes`][refs-layers-processes], [`pages`][refs-layers-pages], [`widgets`][refs-layers-widgets], [`features`][refs-layers-features], [`entities`][refs-layers-entities], [`shared`][refs-layers-shared]

```sh
└── src/
    ├── app/                    # Application initialization logic and static assets
    ├── processes/              # (Optional) Page-independent workflows or workflows involving multiple pages
    ├── pages/                  # Complete application views
    ├── widgets/                # Various combinations of abstract and / or business units from lower layers
    ├── features/               # (Optional) User scenarios, which usually operate on business entities
    ├── entities/               # (Optional) Business units in terms of which application business logic works
    └── shared/                 # Reusable non business specific modules
```

## Slice

Each of the elements located at the top level of the layers

This level is [poorly regulated][refs-split-slices] is a methodology, but a lot depends on the specific project, stack and team

- **Representatives (from each layer)** [`process`][refs-layers-processes], [`page`][refs-layers-pages], [`widget`][refs-layers-widgets], [`feature`][refs-layers-features], [`entity`][refs-layers-entities]

```sh
├── app/
|   # Application composition layer
|   # Only contains abstract initialization logic and static assets, and thus mustn't contain any Slices
|
├── processes/
|   # Slices implementing page-independent workflows or workflows involving multiple pages
|   ├── auth
|   ├── payment
|   ├── quick-tour
|   └── ...
|
├── pages/
|   # Slices implementing complete application views
|   ├── feed
|   |
|   ├── profile
|   |   # Due to routing specifics, this layer can contain nested structures
|   |   ├── edit
|   |   └── stats
|   |
|   ├── sign-up
|   └── ...
|
├── widgets/
|   # Slices implementing various combinations of abstract and / or business units from lower layers,
|   # to deliver isolated atomic User Interface fragments
|   ├── chat-window
|   ├── header
|   ├── feed
|   └── ...
|
├── features/
|   # Sliced implementing user scenarios, which usually operate on business entities
|   ├── auth-by-phone
|   ├── create-post
|   ├── write-message
|   └── ...
|
├── entities/
|   # Slices implementing business units in terms of which application business logic works
|   ├── account
|   ├── conversation
|   ├── post
|   ├── wallet
|   └── ...
|
├── shared/
|   # This layer is a set of abstract Segments
|   # It means that it must not contain any business units or business-related logic
```

## [Segment][refs-segments]

Each of the modules located at the top level of each slice

This level determines [the purpose of modules in the code and implementation][refs-split-segments], according to classical design models

- **Representatives**: [`ui`][refs-segments-ui], [`model`][refs-segments-model], [`lib`][refs-segments-lib], [`api`][refs-segments-api], [`config`][refs-segments-config]

```sh
{layer}/
    ├── {slice}/
    |   ├── ui/                     # User Interface components and UI related logic
    |   ├── model/                  # Business logic (store, actions, effects, reducers, etc.)
    |   ├── lib/                    # Infrastructure logic (utils/helpers)
    |   ├── config/                 # Local configuration (constants, enums, meta information)
    |   └── api/                    # Logic of API requests (api instances, requests, etc.)
```

:::note

Since some layers doesn't contain slices (app, shared):

- Segments can be arranged according to their own rules `shared/{api, config}`
- Or not to use segments al all (`app/{providers, styles}`)

:::

## See also

- [Abstraction levels by methodology][refs-split]
- [Layers in the methodology][refs-layers]
- [Segments in the methodology][refs-segments]

[refs-split]: /docs/reference/units/decomposition
[refs-split-layers]: /docs/reference/units/decomposition#group-layers
[refs-split-slices]: /docs/reference/units/decomposition#group-slices
[refs-split-segments]: /docs/reference/units/decomposition#group-segments

[refs-layers]: /docs/reference/units/layers
[refs-layers-app]: /docs/reference/units/layers/app
[refs-layers-processes]: /docs/reference/units/layers/processes
[refs-layers-pages]: /docs/reference/units/layers/pages
[refs-layers-widgets]: /docs/reference/units/layers/widgets
[refs-layers-features]: /docs/reference/units/layers/features
[refs-layers-entities]: /docs/reference/units/layers/entities
[refs-layers-shared]: /docs/reference/units/layers/shared
[refs-segments]: /docs/reference/units/segments
[refs-segments-ui]: /docs/reference/units/segments#ui
[refs-segments-model]: /docs/reference/units/segments#model
[refs-segments-lib]: /docs/reference/units/segments#lib
[refs-segments-api]: /docs/reference/units/segments#api
[refs-segments-config]: /docs/reference/units/segments#config
