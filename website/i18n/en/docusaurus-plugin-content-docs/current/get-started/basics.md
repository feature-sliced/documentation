---
sidebar_position: 1
---

# Basics

:::caution

Only basic information on the methodology is presented here

For a more competent application, it is worth getting acquainted with each concept in more detail in the corresponding section of the documentation

:::

## Concepts

### [`Public API`][refs-public-api]

Each module must have a **declaration of its public API** at the top level

- To connect to other modules, without the need to refer to the internal structure of this module
- To isolate the implementation details from the consumer modules
- Also, the Public API should protect the module interface after refactoring - in order to avoid unforeseen consequences

### [`Isolation`][refs-isolation]

The module should not **depend directly** on other modules of the same layer or overlying layers

- The concept is also known as [Low Coupling & High Cohesion][refs-low-coupling] - to prevent implicit connections / side effects during development and refactoring

### [`Needs driven`][refs-needs-driven]

Orientation **to the needs of the business and the user**

- Also includes splitting the structure by business domains *(["layers"][refs-splitting-layers] and ["slices"][refs-splitting-slices])*

## Abstractions

For [architecture design][refs-splitting] the methodology suggests operating with [familiar abstractions][refs-adaptability], but in a more consistent and consistent order.

### [`Layers`][refs-splitting-layers]

The first level of abstraction is **according to the scope of influence**

- `app` - initializing the application *(init, styles, providers,...)*
- `processes` - the business processes of the application control pages *(payment, auth, ...)*
- `pages` application page *(user-page, ...)*
- `features` - part of application functionality *(auth-by-oauth, ...)*
- `entities` - the business entity *(viewer, order, ...)*
- `shared` - reusable infrastructure code *(UIKit, libs, API, ...)*

### [`Slices`][refs-splitting-slices]

The second level of abstraction is **according to the business domain**

The rules by which the code is divided into slices *depend on the specific project and its business rules* and are not determined by the methodology

### [`Segments`][refs-splitting-segments]

The third level of abstraction is **according to the purpose in the implementation**

- `ui` - UI-representation of the module *(components, widgets, canvas,...)*
- `model` - business logic of the module *(store, effects/actions, hooks/contracts,...)*
- `lib` - auxiliary libraries
- `api` - the logic of interaction with the API
- `config` - the configuration module of the application and its environment

:::note

In most cases, [it is recommended][ext-disc-api] to place `api` and `config` only in the shared layer

:::

## Structure

```sh
└── src/
    ├── app/                    # Layer: Application
    |                           #
    ├── processes/              # Layer: Processes (optional)
    |   ├── {some-process}/     #     Slice: (e.g. CartPayment process)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
    |   |   └── model/          #         Segment: Business Logic
    |   ...                     #
    |                           #
    ├── pages/                  # Layer: Pages
    |   ├── {some-page}/        #     Slice: (e.g. ProfilePage page)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    |                           #
    ├── widgets/                # Layer: Widgets
    ├── {some-widget}/          #     Slice: (e.g. Header widget)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    ├── features/               # Layer: Features
    |   ├── {some-feature}/     #     Slice: (e.g. AuthByPhone feature)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    |                           #
    ├── entities/               # Layer: Business Entities
    |   ├── {some-entity}/      #     Slice: (e.g. entity User)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    |                           #
    ├── shared/                 # Layer: Reused resources
    |   ├── api/                #         Segment: Logic of API requests
    |   ├── config/             #         Segment: Application configuration
    |   ├── lib/                #         Segment: Infrastructure-application logic
    |   └── ui/                 #         Segment: UIKit of the application
    |   ...                     #
    |                           #
    └── index.tsx/              #
```

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
