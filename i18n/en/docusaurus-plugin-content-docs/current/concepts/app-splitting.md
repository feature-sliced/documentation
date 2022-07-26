---
sidebar_position: 4
---

# App splitting

## Group: `Layers`

The first level of separation: according to the **scope of responsibility** of the module

:::note Self-check

"Which application layer does the module belong to?"

:::

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

### Layers order

If you look at the order of the layers , you can distinguish two general patterns:

#### By the level of knowledge/responsibility

`app` > `processes` > `pages` > `features` > `entities` > `shared`

The module "knows" only about itself and the underlying modules, but not the ones lying above

*This also affects the allowed imports*

#### By the level of danger of changes

`shared` > `entities` > `features` > `pages` > `processes` > `app`

The lower the module is located , the more dangerous it is to make changes to it

*Because most likely it is used in many overlying layers*

## Group: `Slices`

The second level of separation is by **specific BL functionality**

*The methodology has almost no effect on this level and much depends [on the specific project][disc-usability]*

:::note Self-check

"What scope of BL does the module affect?"

*Before that , it is necessary to determine the scope of responsibility (layer)*

:::

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
|    # Does not have specific slices
|    # is rather a set of commonly used segments, without binding to the BL
```

### Rules

Since a slice is a specific level of abstraction, the methodology is obliged to impose certain rules on it

#### Low Coupling & High Cohesion

Slices of the same layer [cannot use each other directly][ref-low-coupling], and their interaction and composition should be determined on the upper layer, relative to their current one

```js title=features/baz/ui.tsx
// Bad: the feature imports another feature (slices of the same layer)
import { Bar } from "features/bar"

function Baz({ foo, ...barProps}) {
    ...
    <Bar {...barProps} />
}
```

```js title=pages/foo/ui.tsx
// Good: features are compiled on the page (overlying layer)
import { Baz } from "features/baz"
import { Bar } from "features/bar"

function Foo() {
    ...
    <Baz {...fooProps}>
        <Bar {...barProps} />
    </Baz>
}
```

#### Grouping

* In most cases, you should avoid nesting in slices, and use only [structural grouping by folders][ref-grouping], without additional coupling logic

    ```diff
    features/order/           # Feature group
       ├── add-to-cart        # Full-fledged feature
       ├── total-info         # Full-fledged feature
    -  ├── model.ts           # General logic for the group
    -  ├── hooks.ts           # General hooks for the group
       └── index.ts           # Public API with feature re-export
    ```

* At the same time, some layers (e.g., pages) initially require nesting due to the requirements of the project / framework

    ```sh
    pages/
       ├── order/
       |    ├── cart/
       |    ├── checkout/
       |    |    ├── delivery/
       |    |    └── payment/
       |    ├── result/
       |    └── index.tsx
       ├── auth/
       |    ├── sign-in/
       |    └── sign-up/
       ├── home/
       ├── catalog/
    ```

:::caution Important

Nested slices should be avoided as much as possible, but even if you have to use them (for example, for pages), you need to [link them explicitly][ref-low-coupling], to avoid unforeseen consequences

:::

## Group: `Segments`

The third level of separation: by **the purpose of the module in the code and implementation**

:::note Self-check

"What part of the technical implementation of the logic affects the module?"

*Before that, it is necessary to determine the scope of influence (layer) and domain affiliation (slice)*

:::

```sh
{layer}/
    ├── {slice}/
    |   ├── ui/                     # UI-logic (components, ui-widgets,...)
    |   ├── model/                  # Business logic (store, actions, effects, reducers,...)
    |   ├── lib/                    # Infrastructure logic (utils/helpers)
    |   ├── config*/                # Configuration (of the project / slice)
    |   └── api*/                   # Logic of API requests (api instances, requests,...)
```

*At the same time, each segment can be represented **as a file, or as a separate directory** - depending on the complexity and size*

### Limitations

The methodology was developed with the aim of not limiting and not bothering developers with the rules for choosing abstractions *(it's desirable to use **any segment in any layer**)*

However, as a result of [discussions and analysis of extensive experience][disc-list] - it was determined that it is better and more practical **to limit each layer to segments used internally**.

#### General rules

1. The **higher** the layer is located , the more it knows about the BL of the application and vice versa
2. API logic [recommended][disc-api] should be put in `shared` so that the logic is not scattered around the project

* Usually, it is common and presented as single instances
  * *Edge-case "exceptions"*: *GraphQL*, *react-query hooks*

#### Application for layers

<!-- use: https://www.tablesgenerator.com/markdown_tables# -->

| Layer         | Content                                                                                                   | Allowed Segments                                                                                                                                                                                        |
|---------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **app**       | Does not include slices and contains initialization logic                                                 | The existing segments are not quite suitable, and therefore `/providers (/hoc, ...)`, `/styles`, etc. are usually used. It depends very much on the project and is unlikely to be solved by the methodology |
| **processes** | The slices inside include only business logic, without displaying (1)                                     | `ui` `lib` `model` (`api`)                                                                                                                                                                              |
| **pages**     | The slices inside include a ui and model composition of various features for a specific page              | `ui` `lib` `model` (`api`)                                                                                                                                                                              |
| **features**  | The slices inside include the composition of entities and the implementation of BL in the model + display | `ui` `lib` `model` (`api`)                                                                                                                                                                              |
| **entities**  | The slices inside represent a disparate set of submodules for using                                       | `ui` `lib` `model` (`api`)                                                                                                                                                                              |
| **shared**    | Contains only infrastructure logic without BL (1)                                                         | `ui` `lib` `api`                                                                                                                                                                                        |

## See also

* [(Discussion) Methodology abstractions, their goals and naming][disc-src]
* Discussions on naming entities
  * [Naming survey][disc-poll]
* [`processes` vs `flows` vs ...][disc-processes]
  * [`model` vs `store` vs ...][disc-model]
* [Primary description of abstractions][tg-description]
* [(Article) About the organization of the code base *with a complete comparison of several approaches*][ext-pluralsight]
* [(Article) About project modularization][ext-medium]
* [(Reference) Layers][ref-layers]
* [(Reference) Segments][ref-segments]

[ref-layers]: /docs/reference/layers/overview
[ref-segments]: /docs/reference/segments
[ref-low-coupling]: /docs/concepts/low-coupling
[ref-grouping]: /docs/reference/layers/features#structural-grouping-features

[disc-src]: https://github.com/feature-sliced/documentation/discussions/31

[disc-list]: https://github.com/feature-sliced/documentation/discussions/
[disc-poll]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894
[disc-api]: https://github.com/feature-sliced/documentation/discussions/66
[disc-processes]: https://github.com/feature-sliced/documentation/discussions/20
[disc-model]: https://github.com/feature-sliced/documentation/discussions/68
[disc-usability]: https://github.com/feature-sliced/documentation/discussions/65

[tg-description]: https://t.me/atomicdesign/18951

[ext-pluralsight]: https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase
[ext-medium]: https://alexmngn.medium.com/why-react-developers-should-modularize-their-applications-d26d381854c1
