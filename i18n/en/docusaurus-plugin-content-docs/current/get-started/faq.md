---
sidebar_position: 20
pagination_next: guides/index
---

# FAQ

:::info

You can ask your question in [telegram chat](https://t.me/feature_sliced) / [github-issues](https://github.com/feature-sliced/documentation/issues) / [github-discussions](https://github.com/feature-sliced/documentation/discussions)

:::

### Structure = Architecture?

Architecture defines abstractions and relations between them (shared/features/pages/...)

*But without a proper structure, it's difficult to design a good architecture*

### Do I need a methodology only for "understanding and clarity" of what is happening in the project?

Rather yes than no

*Otherwise, you have to read huge directories `components/`...*

### Does a novice developer need an architecture/methodology?

Rather yes than no

*Usually, when you design and develop a project in one person, everything goes smoothly. But if there are pauses in development, new developers are added to the team - then problems come*

### Why do we need another methodology when everything is based on principles?

Answered [here](/docs/about/motivation)

### Where can I find examples of applying the methodology?

There are only such ones in the public domain so far, not all of them have been fully adapted to the latest version

*In the near future, the list will be updated and will be placed in a separate section*

- [Internal Examples](https://github.com/feature-sliced/examples)
- [External Examples](/examples)

*Also, you can get acquainted with our [guides](/docs/guides) and [tutorials](/docs/get-started)*

### Are there some useful resources / articles / etc about FSD and related things?

<https://github.com/feature-sliced/awesome>

### The project is written on feature-slices v1, how to update and is it worth it?

Answered [here](/docs/guides/migration/from-v1)

### Can I embed pages/features/entities into each other?

Answered [here](/docs/concepts/app-splitting#group-slices)

### How do I work with the authorization context?

Answered [here](/docs/guides/examples/auth)

### What about Atomic Design?

The current version of the methodology does not oblige, but also does not prohibit the use of Atomic Design together with Feature-Sliced Design

At the same time, Atomic Design [is well applied](https://t.me/feature_sliced/1653) for the `ui` segment of modules

### What is the difference between feature and entity?

- `Entity` - business **entity**
  - blog-post / user / order / product / ...
- `Feature` - business feature, **action on an entity**
  - create-blog-post / login-by-oauth / edit-account / publish-video / ...

See also [comparison reference](/docs/reference/layers/overview), [viewer implementation of logic by layers](/docs/guides/examples/auth)

### Where to store the layout/template of pages?

It is better to store general templates for markup in `shared/ui`, but there are [different cases](https://github.com/feature-sliced/documentation/discussions/129)

### Will there be a toolkit / linters?

It will be, at the moment - in development =)

> For now, to sort / prohibit imports, you can use
>
> - `eslint-plugin-import`
> - `eslint-plugin-simple-import-sort`
> - `eslint-plugin-boundaries`
> - `dependency-cruiser`
>
> See [basic config example](https://gist.github.com/azinit/4cb940a1d4a3e05ef47e15aa18a9ecc5)

### Can I store the features used on one page directly in the page directory?

The methodology strongly recommends against doing this, since [each module has a corresponding place in the structure](/docs/concepts/app-splitting)

Otherwise , there is a risk of complicating the project's code base

> *"Today, the feature can only be used on one page. Next week - on three. And in a month - it may be removed at all. We cannot predict the future, and we need to refrain from premature optimizations every time"*

*See also the example from [tutorial](/docs/get-started/tutorial#normal-approach)*
