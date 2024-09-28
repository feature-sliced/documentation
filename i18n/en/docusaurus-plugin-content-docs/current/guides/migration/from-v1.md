---
sidebar_position: 4
---

# Migration from v1

## Why v2?

The original concept of **feature-slices** [was announced][ext-tg-spb] in 2018.

Since then, many transformations of the methodology have taken place, but at the same time **[the basic principles were preserved][ext-v1]**:

- Using a *standardized* frontend project structure
- Splitting the application in the first place-according to *business logic*
- Use of *isolated features* to prevent implicit side effects and cyclic dependencies
- Using the *Public API* with a ban on climbing "into the insides" of the module

At the same time, in the previous version of the methodology, there were still **weak points** that

- Sometimes it leads to boilerplate code
- Sometimes it leads to excessive complication of the code base and non-obvious rules between abstractions
- Sometimes it leads to implicit architectural solutions, which prevented the project from being pulled up and new people from onboarding

The new version of the methodology ([v2][ext-v2]) is designed **to eliminate these shortcomings, while preserving the existing advantages** of the approach.

Since 2018, [has also developed][ext-fdd-issues] another similar methodology - [**feature-driven**][ext-fdd], which was first announced by [Oleg Isonen][ext-kof].

After merging of the two approaches, we have **improved and refined existing practices** - towards greater flexibility, clarity and efficiency in application.

> As a result, this has even affected the name of the methodology - *"feature-slice**d**"*

## Why does it make sense to migrate the project to v2?

> `WIP:` The current version of the methodology is under development and some details *may change*

#### 🔍 More transparent and simple architecture

The methodology (v2) offers **more intuitive and more common abstractions and ways of separating logic among developers.**

All this has an extremely positive effect on attracting new people, as well as studying the current state of the project, and distributing the business logic of the application.

#### 📦 More flexible and honest modularity

The methodology (v2) allows **to distribute logic in a more flexible way:**

- With the ability to refactor isolated parts from scratch
- With the ability to rely on the same abstractions, but without unnecessary interweaving of dependencies
- With simpler requirements for the location of the new module *(layer => slice => segment)*

#### 🚀 More specifications, plans, community

At the moment, the `core-team` is actively working on the latest (v2) version of the methodology

So it is for her:

- there will be more described cases / problems
- there will be more guides on the application
- there will be more real examples
- in general, there will be more documentation for onboarding new people and studying the concepts of the methodology
- the toolkit will be developed in the future to comply with the concepts and conventions on architecture

> Of course, there will be user support for the first version as well - but the latest version is still a priority for us
>
> In the future, with the next major updates, you will still have access to the current version (v2) of the methodology, **without risks for your teams and projects**

## Changelog

### `BREAKING` Layers

Now the methodology assumes explicit allocation of layers at the top level

- `/app` > `/processes` > **`/pages`** > **`/features`** > `/entities` > `/shared`
- *That is, not everything is now treated as features/pages*
- This approach allows you to [explicitly set rules for layers][ext-tg-v2-draft]:
- The **higher the layer** of the module is located , the more **context** it has
  
  *(in other words-each module of the layer - can import only the modules of the underlying layers, but not higher)*

- The **lower the layer of the** module is located , the more **danger and responsibility** to make changes to it

  *(because it is usually the underlying layers that are more overused)*

### `BREAKING` Shared

The infrastructure abstractions `/ui`, `/lib`, `/api`, which used to lie in the src root of the project, are now separated by a separate directory `/src/shared`

- `shared/ui` - Still the same general uikit of the application (optional)
  - *At the same time, no one forbids using `Atomic Design` here as before*
- `shared/lib` - A set of auxiliary libraries for implementing logic
  - *Still - without a dump of helpers*
- `shared/api` - A common entry point for accessing the API
  - *Can also be registered locally in each feature / page - but it is not recommended*
- As before - there should be no explicit binding to business logic in `shared`
  - *If necessary, you need to take this relationship to the `entities` level or even higher*

### `NEW` Entities, Processes

In v2 **, other new abstractions** have been added to eliminate the problems of logic complexity and high coupling.

- `/entities` - layer **business entities** containing slices that are related directly to the business models or synthetic entities required only on frontend
  - *Examples: `user`, `i18n`, `order`, `blog`*
- `/processes` - layer **business processes**, penetrating app
  - **The layer is optional**, it is usually recommended to use it when *the logic grows and begins to blur in several pages*
  - *Examples: `payment`, `auth`, `quick-tour`*

### `BREAKING` Abstractions & Naming

Now specific abstractions and [clear recommendations for naming them][refs-adaptability]are defined

[disc-process]: https://github.com/feature-sliced/documentation/discussions/20
[disc-features]: https://github.com/feature-sliced/documentation/discussions/23
[disc-entities]: https://github.com/feature-sliced/documentation/discussions/18#discussioncomment-422649
[disc-shared]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453020

[disc-ui]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453132
[disc-model]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-472645
[disc-api]: https://github.com/feature-sliced/documentation/discussions/66

#### Layers

- `/app` — **application initialization layer**
  - *Previous versions: `app`, `core`,`init`, `src/index` (and this happens)*
- `/processes` — [**business process layer**][disc-process]
  - *Previous versions: `processes`, `flows`, `workflows`*
- `/pages` — **application page layer**
  - *Previous versions: `pages`, `screens`, `views`, `layouts`, `components`, `containers`*
- `/features` — [**functionality parts layer**][disc-features]
  - *Previous versions: `features`, `components`, `containers`*
- `/entities` — [**business entity layer**][disc-entities]
  - *Previous versions: `entities`, `models`, `shared`*
- `/shared` — [**layer of reused infrastructure code**][disc-shared] 🔥
  - *Previous versions: `shared`, `common`, `lib`*

#### Segments

- `/ui` — [**UI segment**][disc-ui] 🔥
  - *Previous versions: `ui`, `components`, `view`*
- `/model` — [**BL-segment**][disc-model] 🔥
  - *Previous versions: `model`, `store`, `state`, `services`, `controller`*
- `/lib` — segment **of auxiliary code**
  - *Previous versions: `lib`, `libs`, `utils`, `helpers`*
- `/api` — [**API segment**][disc-api]
  - *Previous versions: `api`, `service`, `requests`, `queries`*
- `/config` — **application configuration segment**
  - *Previous versions: `config`, `env`, `get-env`*

### `REFINED` Low coupling

Now it is much easier to [observe the principle of low coupling][refs-low-coupling] between modules, thanks to the new layers.

*At the same time, it is still recommended to avoid as much as possible cases where it is extremely difficult to "uncouple" modules*

## See also

- [Notes from the report "React SPB Meetup #1"][ext-tg-spb]
- [React Berlin Talk - Oleg Isonen "Feature Driven Architecture"][ext-kof-fdd]
- [Comparison with v1 (community-chat)](https://t.me/feature_sliced/493)
- [New ideas v2 with explanations (atomicdesign-chat)][ext-tg-v2-draft]
- [Discussion of abstractions and naming for the new version of the methodology (v2)](https://github.com/feature-sliced/documentation/discussions/31)

[refs-low-coupling]: /docs/reference/isolation/coupling-cohesion
[refs-adaptability]: /docs/about/understanding/naming

[ext-v1]: https://feature-sliced.github.io/featureslices.dev/v1.0.html
[ext-tg-spb]: https://t.me/feature_slices
[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-fdd-issues]: https://github.com/kof/feature-driven-architecture/issues
[ext-v2]: https://github.com/feature-sliced/documentation
[ext-kof]: https://github.com/kof
[ext-kof-fdd]: https://www.youtube.com/watch?v=BWAeYuWFHhs
[ext-tg-v2-draft]: https://t.me/atomicdesign/18708
