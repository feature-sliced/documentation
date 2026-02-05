# Overview

**Feature-Sliced Design** (FSD) is an architectural methodology for scaffolding front-end applications. Simply put, it's a compilation of rules and conventions on organizing code. The main purpose of this methodology is to make the project more understandable and stable in the face of ever-changing business requirements.

Apart from a set of conventions, FSD is also a toolchain. We have a [linter](https://github.com/feature-sliced/steiger) to check your project's architecture, [folder generators](https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools) through a CLI or IDEs, as well as a rich library of [examples](/examples.md).

## Is it right for me?[​](#is-it-right-for-me "Direct link to heading")

FSD can be implemented in projects and teams of any size. It is right for your project if:

* You're doing **frontend** (UI on web, mobile, desktop, etc.)
* You're building an **application**, not a library

And that's it! There are no restrictions on what programming language, UI framework, or state manager you use. You can also adopt FSD incrementally, use it in monorepos, and scale to great lengths by breaking your app into packages and implementing FSD individually within them.

If you already have an architecture and you're considering a switch to FSD, make sure that the current architecture is **causing trouble** in your team. For example, if your project has grown too large and inter-connected to efficiently implement new features, or if you're expecting a lot of new members to join the team. If the current architecture works, maybe it's not worth changing. But if you do decide to migrate, see the [Migration](/docs/guides/migration/from-custom.md) section for guidance.

## Basic example[​](#basic-example "Direct link to heading")

Here is a simple project that implements FSD:

* `📁 app`
* `📁 pages`
* `📁 shared`

These top-level folders are called *layers*. Let's look deeper:

* `📂 app`

  * `📁 routes`
  * `📁 analytics`

* `📂 pages`

  * `📁 home`

  * `📂 article-reader`

    * `📁 ui`
    * `📁 api`

  * `📁 settings`

* `📂 shared`

  * `📁 ui`
  * `📁 api`

Folders inside `📂 pages` are called *slices*. They divide the layer by domain (in this case, by pages).

Folders inside `📂 app`, `📂 shared`, and `📂 pages/article-reader` are called *segments*, and they divide slices (or layers) by technical purpose, i.e. what the code is for.

## Concepts[​](#concepts "Direct link to heading")

Layers, slices, and segments form a hierarchy like this:

![Hierarchy of FSD concepts, described below](/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

Pictured above: three pillars, labeled left to right as "Layers", "Slices", and "Segments" respectively.

The "Layers" pillar contains seven divisions arranged top to bottom and labeled "app", "processes", "pages", "widgets", "features", "entities", and "shared". The "processes" division is crossed out. The "entities" division is connected to the second pillar "Slices" in a way that conveys that the second pillar is the content of "entities".

The "Slices" pillar contains three divisions arranged top to bottom and labeled "user", "post", and "comment". The "post" division is connected to the third pillar "Segments" in the same way such that it's the content of "post".

The "Segments" pillar contains three divisions, arranged top to bottom and labeled "ui", "model", and "api".

### Layers[​](#layers "Direct link to heading")

Layers are standardized across all FSD projects. You don't have to use all of the layers, but their names are important. There are currently seven of them (from top to bottom):

1. **App** — everything that makes the app run — routing, entrypoints, global styles, providers.
2. **Processes** (deprecated) — complex inter-page scenarios.
3. **Pages** — full pages or large parts of a page in nested routing.
4. **Widgets** — large self-contained chunks of functionality or UI, usually delivering an entire use case.
5. **Features** — *reused* implementations of entire product features, i.e. actions that bring business value to the user.
6. **Entities** — business entities that the project works with, like `user` or `product`.
7. **Shared** — reusable functionality, especially when it's detached from the specifics of the project/business, though not necessarily.

warning

Layers **App** and **Shared**, unlike other layers, do not have slices and are divided into segments directly.

However, all other layers — **Entities**, **Features**, **Widgets**, and **Pages**, retain the structure in which you must first create slices, inside which you create the segments.

The trick with layers is that modules on one layer can only know about and import from modules from the layers strictly below.

### Slices[​](#slices "Direct link to heading")

Next up are slices, which partition the code by business domain. You're free to choose any names for them, and create as many as you wish. Slices make your codebase easier to navigate by keeping logically related modules close together.

Slices cannot use other slices on the same layer, and that helps with high cohesion and low coupling.

### Segments[​](#segments "Direct link to heading")

Slices, as well as layers App and Shared, consist of segments, and segments group your code by its purpose. Segment names are not constrained by the standard, but there are several conventional names for the most common purposes:

* `ui` — everything related to UI display: UI components, date formatters, styles, etc.
* `api` — backend interactions: request functions, data types, mappers, etc.
* `model` — the data model: schemas, interfaces, stores, and business logic.
* `lib` — library code that other modules on this slice need.
* `config` — configuration files and feature flags.

Usually these segments are enough for most layers, you would only create your own segments in Shared or App, but this is not a rule.

## Advantages[​](#advantages "Direct link to heading")

* **Uniformity**<br /><!-- -->Since the structure is standardized, projects become more uniform, which makes onboarding new members easier for the team.

* **Stability in face of changes and refactoring**<br /><!-- -->A module on one layer cannot use other modules on the same layer, or the layers above.<br /><!-- -->This allows you to make isolated modifications without unforeseen consequences to the rest of the app.

* **Controlled reuse of logic**<br /><!-- -->Depending on the layer, you can make code very reusable or very local.<br /><!-- -->This keeps a balance between following the **DRY** principle and practicality.

* **Orientation to business and users needs**<br /><!-- -->The app is split into business domains and usage of the business language is encouraged in naming, so that you can do useful product work without fully understanding all other unrelated parts of the project.

## Incremental adoption[​](#incremental-adoption "Direct link to heading")

If you have an existing codebase that you want to migrate to FSD, we suggest the following strategy. We found it useful in our own migration experience.

1. Start by slowly shaping up the App and Shared layers module-by-module to create a foundation.

2. Distribute all of the existing UI across Widgets and Pages using broad strokes, even if they have dependencies that violate the rules of FSD.

3. Start gradually resolving import violations and also extracting Entities and possibly even Features.

It's advised to refrain from adding new large entities while refactoring or refactoring only certain parts of the project.

## Next steps[​](#next-steps "Direct link to heading")

* **Want to get a good grasp of how to think in FSD?** Check out the [Tutorial](/docs/get-started/tutorial.md).
* **Prefer to learn from examples?** We have a lot in the [Examples](/examples.md) section.
* **Have questions?** Drop by our [Telegram chat](https://t.me/feature_sliced) and get help from the community.
