---
sidebar_position: 4
---

# Naming

Different developers have different experiences and contexts, which can lead to misunderstandings on the team when the same entities are called differently. For example:

- Components for display can be called "ui", "components", "ui-kit", "views", ...
- The code that is reused throughout the application can be called "core", "shared", "app", ...
- Business logic code can be called "store", "model", "state", ...

## Naming in Feature-Sliced Design {#naming-in-fsd}

The methodology uses specific terms such as:

- [Layers][refs-layers] — "app", "process", "page", "feature", "entity", "shared"
- [Slices][refs-slices]
- [Segments][refs-segments] — "ui', "model", "lib", "api", "config"

These terms are [clearly defined][refs-reference] in the methodology.

When working on a project based on the **Feature-Sliced Design** methodology, it is important to use [original naming][disc-src] to avoid confusion among team members and others. This is especially important when a new developer who is familiar with the methodology joins the project, or when he asks for help from the community.

## Naming Conflicts {#when-can-naming-interfere}

Naming conflicts can occur when terms used in the **Feature-Sliced Design** methodology overlap with terms used in the business:

- `FSD#process` vs simulated process in an application,
- `FSD#page` vs log page,
- `FSD#model` vs car model.

For example, a developer seeing the word process in the code will spend unnecessary time trying to understand which process they are talking about.

When communicating within the development team, when saying the word process, everyone involved should clearly understand what we're talking about, the process as a business entity or the process from Feature-Sliced Design.

When communicating with the business, developers sometimes use technical terms that the business isn't familiar with. So a developer using the term process to refer to a process from Feature-Sliced Design will introduce a misunderstanding into the conversation which may require additional time to clarify.

<!-- TODO: think of examples for other terms -->

These conflicts can disrupt the development process because developers may spend extra time trying to figure out exactly what the conversation is about.

In addition, when communicating with the business, it is important to be aware of any technical terms that may be unfamiliar to non-technical stakeholders. Using such terms can lead to misunderstandings that may take additional time to clarify.

:::note
It is important that all team members clearly understand the meaning of terms such as "process, model, ..." when communicating within the team.
:::

## See also {#see-also}

- [(Discussion) Adaptability of naming][disc-src]
- [(Discussion) Entity Naming Survey][disc-naming]:
- [(Discussion) "processes" vs "flows" vs ...][disc-processes]:
- [(Discussion) "model" vs "store" vs ...][disc-model]:

[disc-model]: https://github.com/feature-sliced/documentation/discussions/68
[disc-naming]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894
[disc-processes]: https://github.com/feature-sliced/documentation/discussions/20
[disc-src]: https://github.com/feature-sliced/documentation/discussions/16
[refs-layers]: /docs/reference/units/layers
[refs-reference]: /docs/reference/units
[refs-segments]: /docs/reference/units/segments
[refs-slices]: /docs/reference/units#slice