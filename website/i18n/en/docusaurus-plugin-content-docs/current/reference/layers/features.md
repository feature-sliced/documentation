---
sidebar_position: 6
---

# Features

:::tip When to use?
When it becomes difficult to find the boundaries of specific user scenarios in a project, which worsens the controllability and reuse of logic

*Use it only if you are sure that additional separation by features will help your application, and will not cause too much misunderstanding and skepticism! (instead, you can locate such logic directly in widgets) ⚠️*
:::

![features-themed-bordered](/img/layers/features.png)

## Description

Each feature is a part of the business logic, while it necessarily has meaning and value for the end user

- *`ProductList`, `OfficeMap` - can hardly be called features*
- *`WalletAddFunds`, `AddToCart` - already makes more sense for the end user*

At the same time:

- the underlying layers are used to build the logic
  - *`shared`, `entities`*
- one feature **cannot** import another
  - *If [there is such a need][refs-low-coupling] - the dependency needs to be transferred to the layer above / below, or solved through the composition through children-props*
- features cannot be nested, but they can be combined by a common folder, i.e. structurally
  - *At the same time, you can not create intermediate files that are necessary for a specific group of features*
- *You can only use re-export files*

## Structure

```sh
└── features/{slice}
          ├── lib/
          ├── model/
          ├── ui/
          └── index.ts
```

Thus, the feature stores information about:

1. What data is needed for its operation
1. By what rules do data changes occur
1. What [entities][refs-entity] are needed for the complete construction of the feature
1. How the data is presented to the user

## Rules

### One feature = one functionality

The feature contains code that implements **one** useful functionality for the user.

### Structural grouping of features

Often there is a need to put together a number of somewhat related features *(at the same time, they can and should not import each other directly)*

The methodology recommends avoiding **nested features**, i.e. features that are strongly connected under a common wrapper with an additional one. by logic

Instead, the methodology suggests that, if necessary, **group the necessary features by folders** *(at the same time, you can not link these features directly, folders are only needed for structural grouping by meaning)*

```diff
features/order/            Feature group
   ├── add-to-cart         Full-fledged feature
   ├── total-info          Full-fledged feature
-  ├── model.ts            General logic for the group
-  ├── hooks.ts            General hooks for the group
   ├── index.ts            Public API with re-export of features
```

### Features should not depend on each other

This rule is not always possible to comply with, but it is better to minimize the number of such violations.

Usually, it is precisely because of the neglect of this rule that there is a high coupling between the modules of the system and unpredictable side effects during development.

One of the ways to solve the problem is to use [entity][refs-entity].

## Examples

*From the point of view of the code: not all changes for the user are `features`, but all `features` are changes for the user.*

### Changing the application interface language

- `Feature` for the user and the developer.

> At the same time, the `i18n` logic itself can be used not only in this feature, but even in entities. Therefore, this should rather be placed in `shared/lib` or `shared/config`
>
> *A separate guide will be added later*

### Transfer of funds between accounts

- `Feature` for the user and the developer.

### Filter by tags

- For the user: `feature`.
- For the developer: [entity][refs-entity] `tags` allow you to implement a filter by tags inside `feature`.

### Hints when filling in the form fields

- For the user: `feature`.
- For the developer: part of `form` [entity][refs-entity].

### Authorization by phone

```tsx title=features/auth/by-phone/ui.tsx
import { viewerModel } from "entities/viewer";

export const AuthByPhone = () => {
    return (
        // for redux - dispatch is additionally needed
        <Form onSuccess={(user) => viewerModel.setUser(user)}>
            <Form.Input 
                type="phone"
                ...
            />
            <Form.Button
                ...
            />
        </Form>
    )
}
```

## See also

- ["Guide to getting rid of cross-imports"](/docs/concepts/low-coupling)
- [Understanding user needs and business tasks](/docs/concepts/needs-driven)
  - To understand the `features` layer
- [(Thread) About features and entities clearly](https://github.com/feature-sliced/documentation/discussions/23#discussioncomment-451017)

[refs-entity]: /docs/reference/layers/entities
[refs-low-coupling]: /docs/concepts/low-coupling
