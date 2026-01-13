# Excessive Entities

The `entities` layer in Feature-Sliced Design is one of the lower layers that's primarily for business logic. That makes it widely accessible — all layers except for `shared` can access it. However, its global nature means that changes to `entities` can have a widespread impact, requiring careful design to avoid costly refactors.

Excessive entities can lead to ambiguity (what code belongs to this layer), coupling, and constant import dilemmas (code scattered across sibling entities).

## How to keep `entities` layer clean[​](#how-to-keep-entities-layer-clean "Link trực tiếp đến heading")

### 0. Consider having no `entities` layer[​](#0-consider-having-no-entities-layer "Link trực tiếp đến heading")

You might think that your application won't be Feature-Sliced if you don't include this layer, but it is completely fine for the application to have no `entities` layer. It doesn't break FSD in any way, on the contrary, it simplifies the architecture and keeps the `entities` layer available for future scaling. For example, if your application acts as a thin client, most likely it doesn't need `entities` layer.

What are thick and thin clients?

*Thick* vs. *thin client* distinction refers to how the application processes data:

* *Thin* clients rely on the backend for most data processing. Client-side business logic is minimal and involves only exchanging data with the backend.
* *Thick* clients handle significant client-side business logic, making them suitable candidates for the `entities` layer.

Keep in mind that this classification is not strictly binary, and different parts of the same application may act as a "thick" or a "thin" client.

### 1. Avoid preemptive slicing[​](#1-avoid-preemptive-slicing "Link trực tiếp đến heading")

In contrast to previous versions, FSD 2.1 encourages deferred decomposition of slices instead of preemptive, and this approach also extends to `entities` layer. At first, you can place all your code in the `model` segment of your page (widget, feature), and then consider refactoring it later, when business requirements are stable.

Remember: the later you move code to the `entities` layer, the less dangerous your potential refactors will be — code in Entities may affect functionality of any slice on higher layers.

### 2. Avoid Unnecessary Entities[​](#2-avoid-unnecessary-entities "Link trực tiếp đến heading")

Do not create an entity for every piece of business logic. Instead, leverage types from `shared/api` and place logic in the `model` segment of a current slice. For reusable business logic, use the `model` segment within an entity slice while keeping data definitions in `shared/api`:

```
📂 entities
  📂 order
    📄 index.ts
    📂 model
      📄 apply-discount.ts // Business logic using OrderDto from shared/api
📂 shared
  📂 api
    📄 index.ts
    📂 endpoints
      📄 order.ts
```

### 3. Exclude CRUD Operations from Entities[​](#3-exclude-crud-operations-from-entities "Link trực tiếp đến heading")

CRUD operations, while essential, often involve boilerplate code without significant business logic. Including them in the `entities` layer can clutter it and obscure meaningful code. Instead, place CRUD operations in `shared/api`:

```
📂 shared
  📂 api
    📄 client.ts
    📄 index.ts
    📂 endpoints
      📄 order.ts // Contains all order-related CRUD operations
      📄 products.ts
      📄 cart.ts
```

For complex CRUD operations (e.g., atomic updates, rollbacks, or transactions), evaluate whether the `entities` layer is appropriate, but use it with caution.

### 4. Store Authentication Data in `shared`[​](#4-store-authentication-data-in-shared "Link trực tiếp đến heading")

Prefer `shared` layer to creating a `user` entity for authentication data, such as tokens or user DTOs returned from the backend. These are context-specific and unlikely to be reused outside authentication scope:

* Authentication responses (e.g., tokens or DTOs) often lack fields needed for broader reuse or vary by context (e.g., private vs. public user profiles).
* Using entities for auth data can lead to cross-layer imports (e.g., `entities` into `shared`) or usage of `@x` notation, complicating the architecture.

Instead, store authentication-related data in `shared/auth` or `shared/api`:

```
📂 shared
  📂 auth
    📄 use-auth.ts // authenticated user info or token
    📄 index.ts
  📂 api
    📄 client.ts
    📄 index.ts
    📂 endpoints
      📄 order.ts
```

For more details on implementing authentication, see [the Authentication guide](/documentation/vi/docs/guides/examples/auth.md).

### 5. Minimize Cross-Imports[​](#5-minimize-cross-imports "Link trực tiếp đến heading")

FSD permits cross-imports via `@x` notation, but they can introduce technical issues like circular dependencies. To avoid this, design entities within isolated business contexts to eliminate the need for cross-imports:

Non-Isolated Business Context (Avoid):

```
📂 entities
  📂 order
    📂 @x
    📂 model
  📂 order-item
    📂 @x
    📂 model
  📂 order-customer-info
    📂 @x
    📂 model
```

Isolated Business Context (Preferred):

```
📂 entities
  📂 order-info
    📄 index.ts
    📂 model
      📄 order-info.ts
```

An isolated context encapsulates all related logic (e.g., order items and customer info) within a single module, reducing complexity and preventing external modifications to tightly coupled logic.
