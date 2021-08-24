---
sidebar_position: 1
---

# Overview

The methodology is designed to **simplify and standardize the decomposition of logic for large and long-lived projects.**

To do this, it introduces a number of [concepts][refs-concepts] and [abstractions][refs-splitting], on which the architecture *can be based* from project to project - from here we get *a number of advantages*

:::info

[Module][refs-module] - the structural unit of the project (file / directory)

:::

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

Each module has its own limitations and recommendations for reuse according to [its layer][refs-splitting--layers]

Thanks to this, *a balance is maintained between compliance with the `DRY` principle and the ability to customize the module logic without overhead overrides*

## See also

- [Reasons for creating the methodology][refs-motivation]
- [(Guide) How to bring modules to low connectivity][refs-low-coupling]
- [Examples of the methodology application][refs-examples]
- [(Guide) Migration from feature-slices (v1)][refs-migration-v1]
  - *Also contains a comparison of the two versions and the reasons for creating v2*

[refs-motivation]: /docs/get-started/motivation

[refs-splitting]: /docs/concepts/app-splitting
[refs-splitting--layers]: /docs/concepts/app-splitting#group-layers
<!-- FIXME: Refer to the root later, not to the first element -->
[refs-concepts]: /docs/concepts/architecture

[refs-module]: /docs/reference/glossary#module

[refs-low-coupling]: /docs/guides/low-coupling
[refs-migration-v1]: /docs/guides/migration-from-v1
<!-- FIXME: Refer to the root later, not to the first element -->
[refs-examples]: /docs/guides/examples/viewer
