---
sidebar_position: 4
---

# Naming

Different developers have different experiences and contexts, which can lead to misunderstandings on the team when the same entities are called differently. For example:

- Components for display can be called "ui", "components", "ui-kit", "views", …
- The code that is reused throughout the application can be called "core", "shared", "app", …
- Business logic code can be called "store", "model", "state", …

## Naming in Feature-Sliced Design {#naming-in-fsd}

The methodology uses specific terms such as:

- "app", "process", "page", "feature", "entity", "shared" as layer names,
- "ui', "model", "lib", "api", "config" as segment names.

Original naming is crucial to prevent confusion among team members and new developers joining the project. Using unique names also helps when seeking help from the community.

## Naming Conflicts {#when-can-naming-interfere}

Naming conflicts can occur when terms used in the FSD methodology overlap with terms used in the business:

- `FSD#process` vs simulated process in an application,
- `FSD#page` vs log page,
- `FSD#model` vs car model.

For example, a developer seeing the word "process" in the code will spend unnecessary time trying to understand which process they are talking about.

These **collisions can disrupt the development process**, as developers may spend extra time trying to figure out exactly what they are talking about.

When the project glossary contains terminology specific to FSD, it is critical to exercise caution when discussing these terms with the team and non-technical stakeholders.

To communicate effectively with the team, it is recommended that the abbreviation "FSD" be used to prefix the methodology terms. For example, when talking about a process, you might say, "We can put this process at the FSD level."

Conversely, when communicating with non-technical stakeholders, it is best to limit the use of FSD terminology and refrain from mentioning the internal structure.

## See also {#see-also}

- [(Discussion) Adaptability of naming][disc-src]
- [(Discussion) Entity Naming Survey][disc-naming]:
- [(Discussion) "processes" vs "flows" vs ...][disc-processes]:
- [(Discussion) "model" vs "store" vs ...][disc-model]:

[disc-model]: https://github.com/feature-sliced/documentation/discussions/68
[disc-naming]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894
[disc-processes]: https://github.com/feature-sliced/documentation/discussions/20
[disc-src]: https://github.com/feature-sliced/documentation/discussions/16
