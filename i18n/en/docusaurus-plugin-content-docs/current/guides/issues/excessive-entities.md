# Excessive Entities

The `entities` layer in Feature-Sliced Design is one of the lower layers that's primarily for business logic. That makes it widely accessible — all layers except for `shared` can access it. However, its global nature means that changes to `entities` can have a widespread impact, requiring careful design to avoid costly refactors.

Excessive entities can lead to ambiguity (what code belongs to this layer), coupling, and constant import dilemmas (code scattered across sibling entities).

## How to keep `entities` layer clean

To keep a maintainable `entities` layer, consider the following principles based on the application's data processing needs. Keep in mind that this classification is not strictly binary, as different parts of the same application may have “thin” or “thick” parts:

- Thin Clients: These applications rely on the backend for most data processing. They often do not require an `entities` layer, as client-side business logic is minimal and involves only data retrieval.
- Thick Clients: These handle significant client-side business logic, making them suitable candidates for the `entities` layer.

It is acceptable for an application to lack an `entities` layer if it functions as a thin client. This simplifies the architecture and keeps the `entities` layer available for future scaling if needed.

### Avoid Unnecessary Entities

Do not create an entity for every piece of business logic. Instead, leverage types from `shared/api` and place logic in the `model` segment of a current slice. For reusable business logic, use the `model` segment within an entity slice while keeping data definitions in `shared/api`:

```plaintext
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

### Exclude CRUD Operations from Entities

CRUD operations, while essential, often involve boilerplate code without significant business logic. Including them in the `entities` layer can clutter it and obscure meaningful code. Instead, place CRUD operations in `shared/api`:

```plaintext
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

### Store Authentication Data in `shared`

Avoid creating a `user` entity for authentication data, such as tokens or user DTOs returned from the backend. These are context-specific and unlikely to be reused outside authentication:

- Authentication responses (e.g., tokens or DTOs) often lack fields needed for broader reuse or vary by context (e.g., private vs. public user profiles).
- Using entities for auth data can lead to cross-layer imports (e.g., `entities` into `shared`) or usage of `@x` notation, complicating the architecture.

Instead, store authentication-related data in `shared/auth` or `shared/api`:

```plaintext
📂 shared
  📂 auth
    📄 use-auth.ts // Hook returning authenticated user info or token
    📄 index.ts
  📂 api
    📄 client.ts
    📄 index.ts
    📂 endpoints
      📄 order.ts
```

### Minimize Cross-Imports

FSD permits cross-imports via `@x` notation, but they can introduce technical issues like circular dependencies. To avoid this, design entities within isolated business contexts to eliminate the need for cross-imports:

Non-Isolated Business Context (Avoid):

```plaintext
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

```plaintext
📂 entities
  📂 order-info
    📄 index.ts
    📂 model
      📄 order-info.ts
```

An isolated context encapsulates all related logic (e.g., order items and customer info) within a single module, reducing complexity and preventing external modifications to tightly coupled logic.
