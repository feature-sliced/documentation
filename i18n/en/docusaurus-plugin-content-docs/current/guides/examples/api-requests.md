---
sidebar_position: 4
---

# API requests

Start by placing your requests in the `shared/api`, this will remove unnecessary architectural boundaries and let you prototype faster and reuse requests easier. This might be enough for the majority of projects.

API requests that clearly won't be reused in the future should be placed in the `api` segment of the same slice in order to prevent global import namespace pollution.

:::note

Do not move API calls to the entities layer preemptively, as you might end up in the situation when you have no abstraction layer for frontend-specific entities. Backend responses can vary between requests, and they might be inappropriate for the frontend.

:::

If the backend provides OpenAPI specifications, you can use a tool like orval to generate types and requests for you in `shared/api` folder.

When using libraries like TanStack Query or pinia-colada in the `pages`, `widgets`, or `features` layers, you might need to reuse types or cache keys across slices, which is prohibited by Feature-Sliced Design. In such cases, you can share types, cache keys, and options via `shared` layer.
