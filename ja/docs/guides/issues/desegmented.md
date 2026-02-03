# Desegmentation

Desegmentation (also known as horizontal slicing or packaging by layer) is a code organization pattern where files are grouped by their technical roles rather than by the business domains they serve. This means code with similar technical functions is stored in the same place, regardless of the business logic it handles.

This approach is popular in meta-frameworks like Next and Nuxt due to its simplicity, as it's easy to get started and enables features like auto-imports and file-based routing:

* 📂 app

  <!-- -->

  * 📂 components

    <!-- -->

    * 📄 DeliveryCard.jsx
    * 📄 DeliveryChoice.jsx
    * 📄 RegionSelect.jsx
    * 📄 UserAvatar.jsx

  * 📂 actions

    <!-- -->

    * 📄 delivery.js
    * 📄 region.js
    * 📄 user.js

  * 📂 composables

    <!-- -->

    * 📄 delivery.js
    * 📄 region.js
    * 📄 user.js

  * 📂 constants

    <!-- -->

    * 📄 delivery.js
    * 📄 region.js
    * 📄 user.js

  * 📂 utils

    <!-- -->

    * 📄 delivery.js
    * 📄 region.js
    * 📄 user.js

  * 📂 stores

    <!-- -->

    * 📂 delivery

      <!-- -->

      * 📄 getters.js
      * 📄 actions.js

This pattern also occurs in FSD codebases, in the form of generic folders:

* 📂 features
  <!-- -->
  * 📂 delivery
    <!-- -->
    * 📂 ui
      <!-- -->
      * 📂 components ⚠️
* 📂 entities
  <!-- -->
  * 📂 recommendations
    <!-- -->
    * 📂 utils ⚠️

Files can also be a source of desegmentation. Files like `types.ts` can aggregate multiple domains, complicating navigation and future refactoring, especially in layers like `pages` or `widgets`:

* 📂 pages

  <!-- -->

  * 📂 delivery

    <!-- -->

    * 📄 index.ts

    * 📂 ui

      <!-- -->

      * 📄 DeliveryCard.tsx
      * 📄 DeliveryChoice.tsx
      * 📄 UserAvatar.tsx

    * 📂 model

      <!-- -->

      * 📄 types.ts ⚠️
      * 📄 utils.ts ⚠️

    * 📂 api
      <!-- -->
      * 📄 endpoints.ts ⚠️

- types.ts
- utils.ts
- endpoints.ts

pages/delivery/model/types.ts

```
// ❌ Bad: Mixed business domains in generic file
export interface DeliveryOption {
  id: string;
  name: string;
  price: number;
}

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
}
```

pages/delivery/model/utils.ts

```
// ❌ Bad: Mixed business domains in generic file
export function formatDeliveryPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function getUserInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}
```

pages/delivery/api/endpoints.ts

```
// ❌ Bad: Mixed business domains in generic file
export async function fetchDeliveryOptions() { /* ... */ }
export async function fetchUserInfo() { /* ... */ }
```

## The Problem[​](#the-problem "この見出しへの直接リンク")

While this structure is easy to start with, it can lead to scalability issues in larger projects:

* Low Cohesion: Modifying a single feature often requires editing files in multiple large folders, such as `pages`, `components`, and `stores`.

* Tight Coupling: Components can have unexpected dependencies, leading to complex and tangled dependency chains.

* Difficult Refactoring: It requires additional effort to manually extract code related to a specific domain.

## Solution[​](#solution "この見出しへの直接リンク")

Group all code that relates to a specific domain in one place.

Avoid generic folder names such as `types`, `components`, `utils`, as well as generic file names like `types.ts`, `utils.ts`, or `helpers.ts`. Instead, use names that directly reflect the domain they represent.

Avoid generic file names like `types.ts` if possible, especially in slices with multiple domains:

* 📂 pages

  <!-- -->

  * 📂 delivery

    <!-- -->

    * 📄 index.tsx

    * 📂 ui

      <!-- -->

      * 📄 DeliveryPage.tsx
      * 📄 DeliveryCard.tsx
      * 📄 DeliveryChoice.tsx
      * 📄 UserInfo.tsx

    * 📂 model

      <!-- -->

      * 📄 delivery.ts
      * 📄 user.ts

## See Also[​](#see-also "この見出しへの直接リンク")

* [(Article) About Low Coupling and High Cohesion clearly](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
* [(Article) Low Coupling and High Cohesion. The Law of Demeter](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
