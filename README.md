# feature-sliced
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-35-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> `WIP:` The current version of the methodology is under development and some details *can be changed*

<!-- 🏅 Add badges -->

<!--
[npm]: https://www.npmjs.com/package/NPM_PACKAGE

[![npm](https://img.shields.io/npm/v/NPM_PACKAGE?style=flat-square)][npm]
[![npm](https://img.shields.io/npm/dw/NPM_PACKAGE?style=flat-square)][npm]
[![npm bundle size](https://img.shields.io/bundlephobia/min/NPM_PACKAGE?style=flat-square)][npm]
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FOWNER%2FREPO&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true)](https://hits.seeyoufarm.com)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/OWNER/REPO/WORKFLOW?label=tests&style=flat-square)](https://github.com/OWNER/REPO/actions)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/OWNER/REPO?style=flat-square)](https://github.com/OWNER/REPO/commits)
-->

![feature-sliced-banner](/website/static/img/banner.jpg)

<!-- ⚡ Add primary information & features about your repository -->
FeatureSliced is an architectural design methodology for *frontend applications*. It aims to [**divide an application according to business logic and scopes of responsibility**][refs-splitting]

- Provides [**explicitness, controllability and adaptability**][refs-arch-req] of architecture
- Based on [**time-tested**][refs-motivation-why] design practices and concepts
    > `SOLID`, `GRASP`, `DDD`, `Separation of Concerns`, `Vertical Slices`, `Public API`, `Isolation`
- Suggests dividing the project according to [**business units**][ext-ubiq-lang]

> **Note:** The methodology is not tied to a specific tech stack and is applicable *to any frontend projects* in general.
>
> But the current version is based on and provides examples for `JavaScript` + `React` stack.

## Motivation

Usually, approaches to building the frontend architecture from project to project are [re-invented from scratch][refs-motivation], thereby adding ["project knowledge"][refs-knowledge]

> Despite the fact that the specifics of frontend projects do not differ so much

At the same time, incorrectly made decisions often lead [to problems of scalability of the project and the team][refs-arch-problems].

And therefore, instead of inventing and documenting it every time, it is better to **summarize the experience and form a working, battle-tested and documented methodology** for designing the frontend architecture.

*Yes, there are many practices and patterns (`SOLID`, `GRASP`, `DDD`, ...)*

*But for the frontend [it is highly difficult to find][refs-motivation] well-established and specific approaches*

## Overview

The methodology is designed to **simplify and standardize the decomposition of logic for large and long-lived projects.**

To do this, it introduces a number of [concepts][refs-concepts] and [abstractions][refs-splitting], on which the architecture *can be based* from project to project - from here we get *a number of advantages*

> **Note:** [Module][refs-module] - the structural unit of the project (file / directory)

### Explicit business logic

Modules are distributed according to [scope of influence, business responsibility and technical purpose][refs-splitting]

Thanks to this, *the architecture is standardized and becomes easier to read*

### Adaptation to new conditions

Each component of the architecture has its own purpose and does not affect the others

Thanks to this *it is possible to independently modify the functionality of the application to meet new requirements without unforeseen consequences*

### Technical debt and refactoring

Each module is independent and self-sufficient

Thanks to this *you can rewrite it from scratch without unexpected side effects*

### Scaling the project and the team

The increase in functionality leads to significantly less complexity of the project, since all the logic is distributed deterministically and in isolation

Thanks to this *it is easy to add and onboard new people to the team, as well as expand the functionality of the project*

### Controlled reuse of logic

Each module has its own limitations and recommendations for reuse according to [its layer][refs-splitting-layers]

Thanks to this, *a balance is maintained between compliance with the `DRY` principle and the ability to customize the module logic without overhead overrides*

## Concepts

### [`Public API`][refs-public-api]

Each module must have a **declaration of its public API** at the top level

- To connect to other modules, without the need to refer to the internal structure of this module
- To isolate the implementation details from the consumer modules
- Also, the Public API should protect the module interface after refactoring - in order to avoid unforeseen consequences

### [`Isolation`][refs-isolation]

The module should not **depend directly** on other modules of the same layer or overlying layers

- The concept is also known as `Low Coupling & High Cohesion` - to prevent implicit connections / side effects during development and refactoring

### [`Needs driven`][refs-needs-driven]

Orientation **to the needs of the business and the user**

- Also includes splitting the structure by business domains *(so-called ["slices"][refs-splitting-slices])*

## Abstractions

For [architecture design][refs-splitting] the methodology suggests operating with [familiar abstractions][refs-adaptability], but in a more consistent and consistent order.

<details>
<summary>Visual diagram</summary>

> `WIP:` The scheme-represents only an **approximate** division of the project into modules and will be determined definitively closer to the release

![visual_schema](website/static/img/visual_schema.jpg)

</details>

### [`Layers`][refs-splitting-layers]

The first level of abstraction is **according to the scope of influence**

- `app` - application initialization *(init, styles, providers, ...)*
- `processes` - application business processes that manage pages *(payment, auth, ...)*
- `pages` - application pages *(user-page, ...)*
- `features` - parts of the application functionality *(auth-by-oauth, ...)*
- `entities` - business entities *(viewer, order, ...)*
- `shared` - reused infrastructure code *(UIKit, libs, API, ...)*

### [`Slices`][refs-splitting-slices]

The second level of abstraction is **according to the business domain**

The rules by which the code is divided into slices *depend on the specific project and its business rules* and are not determined by the methodology

### [`Segments`][refs-splitting-segments]

The third level of abstraction is **according to the purpose in the implementation**

- `ui` - UI-representation of the module *(components, widgets, canvas, ...)*
- `model` - business logic of the module *(store, effects/actions, hooks/contracts, ...)*
- `lib` - auxiliary libraries
- `api` - the logic of interaction with the API
- `config` - the configuration module of the application and its environment

> **Note:** In most cases, [it is recommended][ext-disc-api] to place `api` and `config` only in the shared layer

## Structure

```sh
└── src/
    ├── app/                    # Layer: Application
    |                           #
    ├── processes/              # Layer: Processes (optional)
    |   ├── {some-process}/     #     Slice: (e.g. CartPayment process)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers)
    |   |   └── model/          #         Segment: Business Logic
    |   ...                     #
    |                           #
    ├── pages/                  # Layer: Pages
    |   ├── {some-page}/        #     Slice: (e.g. ProfilePage page)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    |                           #
    ├── features/               # Layer: Features
    |   ├── {some-feature}/     #     Slice: (e.g. AuthByPhone feature)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    |                           #
    ├── entities/               # Layer: Business entities
    |   ├── {some-entity}/      #     Slice: (e.g. entity User)
    |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers)
    |   |   ├── model/          #         Segment: Business Logic
    |   |   └── ui/             #         Segment: UI logic
    |   ...                     #
    |                           #
    ├── shared/                 # Layer: Reused resources
    |   ├── api/                #         Segment: Logic of API requests
    |   ├── config/             #         Segment: Конфигурация приложения
    |   ├── lib/                #         Segment: Infrastructure-application logic
    |   └── ui/                 #         Segment: UIKit of the application
    |   ...                     #
    |                           #
    └── index.tsx/              #
```

## Further reading

- **[Methodology documentation][refs-docs]**
    > *Get-Started, Concepts, Guides, Reference, About*
- **[Migration from feature-slices@v1][refs-migration-v1]**
- **Other materials**
  - Another versions of the methodology: *[feature-slices](https://featureslices.dev/v1.0.html)*, *[feature-driven][ext-fdd]*
  - [React SPB Meetup Report #1 - Feature Slices](https://t.me/feature_slices)
  - [Feature Driven Architecture - Oleg Isonen](https://www.youtube.com/watch?v=BWAeYuWFHhs)
  - [A feature based approach to React development](https://ryanlanciaux.com/blog/2017/08/20/a-feature-based-approach-to-react-development/)
  - [Why React developers should modularize their applications?](https://alexmngn.medium.com/why-react-developers-should-modularize-their-applications-d26d381854c1)
  - [How to Organize Your React + Redux Codebase](https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase)
  - [The Humanizing Work Guide to Splitting User Stories *(aka "Vetical Slices")*](https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories/)
<!-- divider -->
- **[Discussions on the methodology][ext-discussions]**
  - **Real application examples, questions, problems, ideas of the methodology are discussed and analyzed here**
  - All this together affects the specification, the toolkit and, in general, the further vision and development of the methodology
  - *That is, everything that is not yet in the specification/toolkit is somehow discussed in github-discussions*
- **[How can I help?][refs-contributing]**
  - ⭐ Rate us on GitHub
  - 💫 **Any assistance is important** - from *feedback* to *participation in the development of the methodology!*

<!-- 
FIXME: It was not possible to properly justify-content:space-around to apply in md
If there are variations, how best to place indents-welcome:)
-->

<div align="center">

[![tg](website/static/img/social/tg.png)](https://t.me/feature_sliced "Телеграм-чат")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![twitter](website/static/img/social/twitter.png)](https://twitter.com/feature_sliced)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![open-collective](website/static/img/social/opencollective.png)](https://opencollective.com/feature-sliced "OpenCollective профиль")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![youtube](website/static/img/social/youtube.png)](https://www.youtube.com/channel/UCkng_PHLatpDKPOIKfI731A)
</div>

[refs-contributing]: CONTRIBUTING.md

[refs-docs]: https://feature-sliced.design/docs/intro

[refs-motivation]: https://feature-sliced.design/docs/get-started/motivation
[refs-motivation-why]: https://feature-sliced.design/docs/get-started/motivation#-почему-не-хватает-существующих-решений

[refs-concepts]: https://feature-sliced.design/docs/concepts/architecture
[refs-arch-req]: https://feature-sliced.design/docs/concepts/architecture#требования
[refs-arch-problems]: https://feature-sliced.design/docs/concepts/architecture#проблемы
[refs-public-api]: https://feature-sliced.design/docs/concepts/public-api
[refs-adaptability]: https://feature-sliced.design/docs/concepts/naming-adaptability
[refs-isolation]: https://feature-sliced.design/docs/concepts/cross-communication
[refs-needs-driven]: https://feature-sliced.design/docs/concepts/needs-driven

[refs-module]: https://feature-sliced.design/docs/reference/glossary#module
[refs-knowledge]: https://feature-sliced.design/docs/reference/knowledge-types
[refs-splitting]: https://feature-sliced.design/docs/concepts/app-splitting
[refs-splitting-layers]: https://feature-sliced.design/docs/concepts/app-splitting#group-layers
[refs-splitting-slices]: https://feature-sliced.design/docs/concepts/app-splitting#group-slices
[refs-splitting-segments]: https://feature-sliced.design/docs/concepts/app-splitting#group-segments

[refs-migration-v1]: https://feature-sliced.design/docs/guides/migration/from-v1

[ext-ubiq-lang]: https://thedomaindrivendesign.io/developing-the-ubiquitous-language
[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-discussions]: https://github.com/feature-sliced/documentation/discussions
[ext-disc-api]: https://github.com/feature-sliced/documentation/discussions/66

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://sova.dev/"><img src="https://avatars.githubusercontent.com/u/5620073?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sergey Sova</b></sub></a><br /><a href="#blog-sergeysova" title="Blogposts">📝</a> <a href="https://github.com/feature-sliced/documentation/commits?author=sergeysova" title="Documentation">📖</a> <a href="#example-sergeysova" title="Examples">💡</a> <a href="#ideas-sergeysova" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-sergeysova" title="Project Management">📆</a> <a href="#question-sergeysova" title="Answering Questions">💬</a> <a href="#infra-sergeysova" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#research-sergeysova" title="Research">🔬</a> <a href="#eventOrganizing-sergeysova" title="Event Organizing">📋</a> <a href="#tutorial-sergeysova" title="Tutorials">✅</a> <a href="#talk-sergeysova" title="Talks">📢</a> <a href="#maintenance-sergeysova" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://t.me/ilya_azin"><img src="https://avatars.githubusercontent.com/u/42924400?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ilya Azin</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=azinit" title="Documentation">📖</a> <a href="#example-azinit" title="Examples">💡</a> <a href="#ideas-azinit" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-azinit" title="Project Management">📆</a> <a href="#question-azinit" title="Answering Questions">💬</a> <a href="https://github.com/feature-sliced/documentation/pulls?q=is%3Apr+reviewed-by%3Aazinit" title="Reviewed Pull Requests">👀</a> <a href="#infra-azinit" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#userTesting-azinit" title="User Testing">📓</a> <a href="#design-azinit" title="Design">🎨</a> <a href="#tutorial-azinit" title="Tutorials">✅</a> <a href="#talk-azinit" title="Talks">📢</a> <a href="#maintenance-azinit" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/KaraMokusee"><img src="https://avatars.githubusercontent.com/u/8805308?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kara Mokusee</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=KaraMokusee" title="Documentation">📖</a> <a href="#content-KaraMokusee" title="Content">🖋</a> <a href="#ideas-KaraMokusee" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-KaraMokusee" title="Answering Questions">💬</a> <a href="#translation-KaraMokusee" title="Translation">🌍</a> <a href="#talk-KaraMokusee" title="Talks">📢</a> <a href="#maintenance-KaraMokusee" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/AlexandrHoroshih"><img src="https://avatars.githubusercontent.com/u/32790736?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexander Khoroshikh</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=AlexandrHoroshih" title="Documentation">📖</a> <a href="#ideas-AlexandrHoroshih" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-AlexandrHoroshih" title="Answering Questions">💬</a> <a href="https://github.com/feature-sliced/documentation/pulls?q=is%3Apr+reviewed-by%3AAlexandrHoroshih" title="Reviewed Pull Requests">👀</a> <a href="#tool-AlexandrHoroshih" title="Tools">🔧</a> <a href="#security-AlexandrHoroshih" title="Security">🛡️</a> <a href="#talk-AlexandrHoroshih" title="Talks">📢</a> <a href="#tutorial-AlexandrHoroshih" title="Tutorials">✅</a> <a href="#maintenance-AlexandrHoroshih" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/unordinarity"><img src="https://avatars.githubusercontent.com/u/23265008?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bear Raytracer</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=unordinarity" title="Documentation">📖</a> <a href="#example-unordinarity" title="Examples">💡</a> <a href="#ideas-unordinarity" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-unordinarity" title="Answering Questions">💬</a> <a href="https://github.com/feature-sliced/documentation/pulls?q=is%3Apr+reviewed-by%3Aunordinarity" title="Reviewed Pull Requests">👀</a> <a href="#translation-unordinarity" title="Translation">🌍</a> <a href="#design-unordinarity" title="Design">🎨</a> <a href="#infra-unordinarity" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-unordinarity" title="Maintenance">🚧</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/spotsccc"><img src="https://avatars.githubusercontent.com/u/80784519?v=4?s=100" width="100px;" alt=""/><br /><sub><b>spotsccc</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=spotsccc" title="Documentation">📖</a> <a href="#example-spotsccc" title="Examples">💡</a> <a href="#ideas-spotsccc" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-spotsccc" title="Answering Questions">💬</a> <a href="https://github.com/feature-sliced/documentation/pulls?q=is%3Apr+reviewed-by%3Aspotsccc" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-spotsccc" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/ilyaagarkov"><img src="https://avatars.githubusercontent.com/u/10822601?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ilya</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=ilyaagarkov" title="Documentation">📖</a> <a href="#ideas-ilyaagarkov" title="Ideas, Planning, & Feedback">🤔</a> <a href="#talk-ilyaagarkov" title="Talks">📢</a> <a href="#maintenance-ilyaagarkov" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://start.reactwarriors.com/join"><img src="https://avatars.githubusercontent.com/u/15031623?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Evgeniy Podgaetskiy</b></sub></a><br /><a href="#ideas-epodgaetskiy" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-epodgaetskiy" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://binjo.ru/"><img src="https://avatars.githubusercontent.com/u/8722478?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viktor Pasynok</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=binjospookie" title="Documentation">📖</a> <a href="#ideas-binjospookie" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-binjospookie" title="Project Management">📆</a> <a href="#talk-binjospookie" title="Talks">📢</a></td>
    <td align="center"><a href="https://github.com/OlegBrony"><img src="https://avatars.githubusercontent.com/u/19880334?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oleh</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=OlegBrony" title="Documentation">📖</a> <a href="#ideas-OlegBrony" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tutorial-OlegBrony" title="Tutorials">✅</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/niyazm524"><img src="https://avatars.githubusercontent.com/u/32315145?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Niyaz</b></sub></a><br /><a href="#example-niyazm524" title="Examples">💡</a> <a href="#userTesting-niyazm524" title="User Testing">📓</a></td>
    <td align="center"><a href="https://github.com/Postamentovich"><img src="https://avatars.githubusercontent.com/u/22918007?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viacheslav Zinovev</b></sub></a><br /><a href="#design-Postamentovich" title="Design">🎨</a> <a href="#userTesting-Postamentovich" title="User Testing">📓</a> <a href="https://github.com/feature-sliced/documentation/pulls?q=is%3Apr+reviewed-by%3APostamentovich" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://vk.com/id29842440"><img src="https://avatars.githubusercontent.com/u/25086934?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexandr</b></sub></a><br /><a href="#ideas-GhostMayor" title="Ideas, Planning, & Feedback">🤔</a> <a href="#userTesting-GhostMayor" title="User Testing">📓</a> <a href="https://github.com/feature-sliced/documentation/pulls?q=is%3Apr+reviewed-by%3AGhostMayor" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://medium.com/@oleg008"><img src="https://avatars.githubusercontent.com/u/52824?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oleg Isonen</b></sub></a><br /><a href="#ideas-kof" title="Ideas, Planning, & Feedback">🤔</a> <a href="#research-kof" title="Research">🔬</a> <a href="#userTesting-kof" title="User Testing">📓</a></td>
    <td align="center"><a href="https://github.com/julieobolenskaya"><img src="https://avatars.githubusercontent.com/u/80626513?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Julie Obolenskaya</b></sub></a><br /><a href="#translation-julieobolenskaya" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Imperyall"><img src="https://avatars.githubusercontent.com/u/24413052?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roman Tikhiy</b></sub></a><br /><a href="#userTesting-Imperyall" title="User Testing">📓</a> <a href="https://github.com/feature-sliced/documentation/commits?author=Imperyall" title="Documentation">📖</a></td>
    <td align="center"><a href="https://kamyshev.me/"><img src="https://avatars.githubusercontent.com/u/26767722?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Igor Kamyshev</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/issues?q=author%3Aigorkamyshev" title="Bug reports">🐛</a> <a href="https://github.com/feature-sliced/documentation/commits?author=igorkamyshev" title="Documentation">📖</a></td>
    <td align="center"><a href="https://gtech1256.github.io/PersonalPage/"><img src="https://avatars.githubusercontent.com/u/18086485?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roman</b></sub></a><br /><a href="#userTesting-GTech1256" title="User Testing">📓</a> <a href="https://github.com/feature-sliced/documentation/commits?author=GTech1256" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/websega"><img src="https://avatars.githubusercontent.com/u/56861782?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sergey Vakhramov</b></sub></a><br /><a href="#design-websega" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/mark-omarov"><img src="https://avatars.githubusercontent.com/u/15357910?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mark Omarov</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=mark-omarov" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://dskr.dev/"><img src="https://avatars.githubusercontent.com/u/9007486?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Дмитрий</b></sub></a><br /><a href="#business-skrylnikov" title="Business development">💼</a> <a href="#userTesting-skrylnikov" title="User Testing">📓</a></td>
    <td align="center"><a href="https://www.leetcode.com/Mihir64"><img src="https://avatars.githubusercontent.com/u/58292449?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mihir Shah</b></sub></a><br /><a href="#design-Mihir50" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/sarmong"><img src="https://avatars.githubusercontent.com/u/42828375?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sarmong</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=sarmong" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tednaaa"><img src="https://avatars.githubusercontent.com/u/79831859?v=4?s=100" width="100px;" alt=""/><br /><sub><b>And</b></sub></a><br /><a href="#infra-tednaaa" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/feature-sliced/documentation/commits?author=tednaaa" title="Documentation">📖</a> <a href="https://github.com/feature-sliced/documentation/commits?author=tednaaa" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GlebHihoho"><img src="https://avatars.githubusercontent.com/u/17951143?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gleb</b></sub></a><br /><a href="https://github.com/feature-sliced/documentation/commits?author=GlebHihoho" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/yesnoruly"><img src="https://avatars.githubusercontent.com/u/64963734?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roma Karvacky</b></sub></a><br /><a href="#example-yesnoruly" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/oas89"><img src="https://avatars.githubusercontent.com/u/5285065?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aleksandr Osipov</b></sub></a><br /><a href="#userTesting-oas89" title="User Testing">📓</a></td>
    <td align="center"><a href="https://t.me/mg901"><img src="https://avatars.githubusercontent.com/u/7874664?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maxim</b></sub></a><br /><a href="#userTesting-mg901" title="User Testing">📓</a></td>
    <td align="center"><a href="https://github.com/Kelin2025"><img src="https://avatars.githubusercontent.com/u/4208480?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anton Kosykh</b></sub></a><br /><a href="#userTesting-Kelin2025" title="User Testing">📓</a></td>
    <td align="center"><a href="https://github.com/samelm"><img src="https://avatars.githubusercontent.com/u/9926019?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vladislav Samatov</b></sub></a><br /><a href="#userTesting-samelm" title="User Testing">📓</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/olegKusov"><img src="https://avatars.githubusercontent.com/u/28058268?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oleg Kusov</b></sub></a><br /><a href="#blog-olegKusov" title="Blogposts">📝</a> <a href="#userTesting-olegKusov" title="User Testing">📓</a></td>
    <td align="center"><a href="https://andreysavelev.com/"><img src="https://avatars.githubusercontent.com/u/11439304?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrey Savelev</b></sub></a><br /><a href="#userTesting-sandrig" title="User Testing">📓</a></td>
    <td align="center"><a href="http://twitter/tavriaforever"><img src="https://avatars.githubusercontent.com/u/975906?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nickolay Ilchenko</b></sub></a><br /><a href="#userTesting-tavriaforever" title="User Testing">📓</a></td>
    <td align="center"><a href="https://github.com/ledeneveugene"><img src="https://avatars.githubusercontent.com/u/51231845?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eugene Ledenev</b></sub></a><br /><a href="#data-ledeneveugene" title="Data">🔣</a></td>
    <td align="center"><a href="https://github.com/vladislavromanov"><img src="https://avatars.githubusercontent.com/u/63917524?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vladislav Romanov</b></sub></a><br /><a href="#data-vladislavromanov" title="Data">🔣</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
