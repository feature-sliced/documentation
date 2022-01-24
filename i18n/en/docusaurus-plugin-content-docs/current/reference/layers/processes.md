---
sidebar_position: 3
---

# Processes

:::note OPTIONAL
The layer is optional, and is needed only if the complexity of the project requires it
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
