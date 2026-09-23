# Десегментация

Десегментация (также известная как горизонтальная нарезка или группировка по слоям) — это паттерн организации кода, при котором файлы группируются по их техническим ролям, а не по бизнес-доменам, которым они служат. Это значит, что код с похожим техническим назначением хранится в одном месте, независимо от бизнес-логики, которую он обрабатывает.

Этот подход популярен в метафреймворках вроде Next и Nuxt благодаря своей простоте: на нём легко начать, и он позволяет использовать такие функции, как автоимпорты и файловый роутинг:

- app
  - components
    - DeliveryCard.jsx
    - DeliveryChoice.jsx
    - RegionSelect.jsx
    - UserAvatar.jsx
  - actions
    - delivery.js
    - region.js
    - user.js
  - composables
    - delivery.js
    - region.js
    - user.js
  - constants
    - delivery.js
    - region.js
    - user.js
  - utils
    - delivery.js
    - region.js
    - user.js
  - stores
    - delivery
      - getters.js
      - actions.js
Этот паттерн встречается и в кодовых базах на FSD в виде обобщённых папок:

- features
  - delivery
    - ui
      - components/ ⚠️
- entities
  - recommendations
    - utils/ ⚠️
Источником десегментации могут быть и файлы. Файлы вроде `types.ts` могут объединять в себе несколько доменов, что усложняет навигацию и будущий рефакторинг, особенно в таких слоях, как `pages` или `widgets`:

- pages
  - delivery
    - index.ts
    - ui
      - DeliveryCard.tsx
      - DeliveryChoice.tsx
      - UserAvatar.tsx
    - model
      - types.ts ⚠️
      - utils.ts ⚠️
    - api
      - endpoints.ts ⚠️
```ts title="pages/delivery/model/types.ts"
// ❌ Плохо: смешанные бизнес-домены в обобщённом файле
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
```ts title="pages/delivery/model/utils.ts"
// ❌ Плохо: смешанные бизнес-домены в обобщённом файле
export function formatDeliveryPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function getUserInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}
```
```ts title="pages/delivery/api/endpoints.ts"
// ❌ Плохо: смешанные бизнес-домены в обобщённом файле
export async function fetchDeliveryOptions() { /* ... */ }
export async function fetchUserInfo() { /* ... */ }
```
## Проблема \{#the-problem}

Хотя на этой структуре легко начать, в крупных проектах она может привести к проблемам с масштабируемостью:

- Низкая связность (low cohesion): изменение одной фичи часто требует правок файлов в нескольких больших папках, например `pages`, `components` и `stores`.

- Сильная связанность (tight coupling): компоненты могут иметь неожидаемые зависимости, что приводит к сложным и запутанным цепочкам зависимостей.

- Сложный рефакторинг: чтобы вручную извлечь код, относящийся к конкретному домену, требуются дополнительные усилия.

## Решение \{#solution}

Группируйте весь код, относящийся к конкретному домену, в одном месте.

Избегайте обобщённых имён папок, таких как `types`, `components`, `utils`, а также обобщённых имён файлов вроде `types.ts`, `utils.ts` или `helpers.ts`. Вместо этого используйте имена, которые напрямую отражают домен, который они представляют.

По возможности избегайте обобщённых имён файлов вроде `types.ts`, особенно в слайсах с несколькими доменами:

- pages
  - delivery
    - index.tsx
    - ui
      - DeliveryPage.tsx
      - DeliveryCard.tsx
      - DeliveryChoice.tsx
      - UserInfo.tsx
    - model
      - delivery.ts
      - user.ts
## См. также \{#see-also}

* [(Статья) About Low Coupling and High Cohesion clearly](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
* [(Статья) Low Coupling and High Cohesion. The Law of Demeter](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
