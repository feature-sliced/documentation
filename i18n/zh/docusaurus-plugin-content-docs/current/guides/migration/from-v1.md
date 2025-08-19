---
sidebar_position: 2
---

# 从 v1 到 v2 的迁移

## 为什么是 v2？

**feature-slices** 的原始概念于 2018 年[被宣布][ext-tg-spb]。

从那时起，该方法论发生了许多变化，但同时**[基本原则得到了保留][ext-v1]**：

- 使用*标准化*的前端项目结构
- 首先按照*业务逻辑*分割应用程序
- 使用*隔离的 features* 来防止隐式副作用和循环依赖
- 使用 *Public API* 并禁止深入模块的"内部"

同时，在方法论的上一个版本中，仍然存在**薄弱环节**：

- 有时会导致样板代码
- 有时会导致代码库的过度复杂化和抽象之间不明显的规则
- 有时会导致隐式的架构解决方案，这阻止了项目的提升和新人的入职

方法论的新版本（[v2][ext-v2]）旨在**消除这些缺点，同时保留该方法的现有优势**。

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

[refs-low-coupling]: /docs/reference/slices-segments#zero-coupling-high-cohesion
[refs-adaptability]: /docs/about/understanding/naming

[ext-v1]: https://feature-sliced.github.io/featureslices.dev/v1.0.html
[ext-tg-spb]: https://t.me/feature_slices
[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-fdd-issues]: https://github.com/kof/feature-driven-architecture/issues
[ext-v2]: https://github.com/feature-sliced/documentation
[ext-kof]: https://github.com/kof
[ext-kof-fdd]: https://www.youtube.com/watch?v=BWAeYuWFHhs
[ext-tg-v2-draft]: https://t.me/atomicdesign/18708
