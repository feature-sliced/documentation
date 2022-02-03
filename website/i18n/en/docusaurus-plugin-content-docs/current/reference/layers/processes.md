---
sidebar_position: 3
---

# Processes

:::tip When to use?
When there is a lot of over-the-page logic that is difficult to control and expand for "end-to-end" interaction between pages

*Use it only if you are sure that additional separation by processes will help your application, and will not cause too much misunderstanding and skepticism! ⚠️*
:::

![processes-themed-bordered](/img/layers/processes.png)

## Description

*The layer is optional*, but it is usually located here:

- logic that affects several pages at once
  - *For example: `checkout`, `auth`*
- logic that would unnecessarily complicate the code of the pages and would be blurred in them

Processes should not contain display logic (ui), since the role of processes is **to control the behavior of pages and underlying layers, but not to display anything independently**

## Structure

```sh
└── processes/{slice}
          ├── index.ts
          ├── lib.ts
          └── model.ts
```

## Examples

- User authorization
- Making an order
- Onboarding a new user of the service
