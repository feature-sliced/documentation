---
sidebar_position: 4
---

# API requests

Start by placing your requests in the `api` segment of the page slice `pages/<page-name>/api`. This could be enough for some cases like:
- CRUD operations
- Data from the backend that requires little to no processing

When you need to reuse queries, extract them to a lower layer like `widgets`, `features`, or `shared`.

:::note

Do not move API calls to the entities layer preemptively, as you might end in the situation when you have no abstraction layer for frontend-specific entities. Backend responses can vary between requests and be inappropriate for the frontend.

:::

If the backend provides OpenAPI specifications, you can use a tool like orval to generate types and requests for you in shared/api folder.

When using libraries like TanStack Query or pinia-colada in the `pages`, `widgets`, or `features` layers, you might need to reuse types or cache keys across slices, which is prohibited by Feature-Sliced Design. In such cases, you can:
- Move the type or cache key to a lower layer.
- Extract the entire hook or composable to a lower layer.
- Use @x cross-imports (for the entities layer).
