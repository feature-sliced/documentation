---
sidebar_position: 6
---

# Naming adaptability

## Problem

Due to the fact that each developer has his own experience and development context - [we are used to calling the same entities differently][disc-src], which can lead to misunderstandings within the team.

- *Components to be displayed - `ui` / `components` / `ui-kit` / `views` / ...*
- *Code reusable in all parts of the application - the `core`/ `shared` / `app` / ...*
- *Code business logic `store` / `model` / `state` / ...*

## Naming in FSD

The methodology uses such terms as

- `app`, `process`, `page`, `feature`, `entity`, `shared` - *[layers][refs-layers]*
- `ui`, `model`, `lib`, `api` - *[segments][refs-segments]*

Within the framework of the methodology, each of these terms has a [clear definition][refs-reference]

When developing a project using the **Feature-Sliced Design** methodology, it is very important [to adhere to the original naming, in order to avoid misunderstandings][disc-src] both among the team members and outside of it.

- If a new developer comes to the project who is familiar with the methodology, **he should see the terms already familiar to him**
- If you ask for help in the community, you will get an answer to your question faster, **if you use the same terminology**

## When can naming interfere?

When developing a project for displaying/building/modeling any processes, or developing an application for the layout of magazine pages, you may face the problem that **the terms used in the methodology overlap with the terms that your business operates**.

- `FSD#process` vs simulated process in your application
- `FSD#page` vs magazine page
- `FSD#model` vs car model

<!-- TODO: think about examples for other terms -->

Such name collisions can negatively affect the development process.

- The developer, seeing the word `process` in the code, will spend extra time understanding which process is being discussed

- When communicating within the development team, saying the word `process`, all participants in the conversation should clearly understand what is being discussed, about the process as a business entity or about the process from **Feature-Sliced Design**.
  
- When communicating with business, developers sometimes use technical terms that the business is not familiar with. So the developer, using the term `process`, referring to the process from **Feature-Sliced Design**, will introduce a misunderstanding into the conversation, which may require additional time for clarification

## See also

- [(Discussion) Naming adaptability][disc-src]
- **Discussions on naming entities**:
  - [Naming survey][disc-naming]
  - [`processes` vs `flows` vs ...][disc-processes]
  - [`model` vs `store` vs ...][disc-model]

[refs-layers]: /docs/reference/layers/overview
[refs-segments]: /docs/reference/segments
[refs-reference]: /docs/reference

[disc-src]: https://github.com/feature-sliced/documentation/discussions/16
[disc-naming]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894
[disc-processes]: https://github.com/feature-sliced/documentation/discussions/20
[disc-model]: https://github.com/feature-sliced/documentation/discussions/68
