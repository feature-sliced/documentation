---
title: Когда создавать Entity
sidebar_position: 4
---

# Когда создавать Entity

Важный принцип эффективного использования слоя Entities: **не всё должно быть сущностью**. Не создавайте сущности "на всякий случай".

Этот раздел поможет вам принять решение о том, где размещать код, связанный с бизнес-сущностями, учитывая контекст вашего проекта и команды.

---

## Философия подхода

FSD следует принципу **"Local First"** — начинайте с локального кода в `pages/`, и выносите в общие слои только при **реальной необходимости**.

Понимание бизнес-домена помогает принимать более осознанные архитектурные решения. Однако понимание домена **не означает** немедленного создания структуры кода.

Когда код начинает переиспользоваться, существует **три валидных подхода** к его организации:

**Подход 0: Локальность** (рекомендуется всегда начинать отсюда)
- Код остаётся в `pages/`
- Используется только в одном месте

**Подход А: Централизованное API** (`shared/api`)
- API и типы в одном месте
- Миграция в `entities/` при усложнении

**Подход Б: Доменное API** (`entities/*/api/`)
- API привязано к бизнес-сущности
- Полная инкапсуляция с первого дня

Все три подхода согласуются с **философией FSD**: избегать преждевременной декомпозиции и добавлять слои по мере необходимости.

---

## Признаки бизнес-сущности

Прежде чем принимать решение о размещении кода, стоит понять — является ли объект бизнес-сущностью.

**1. Уникальная идентичность**

Объект можно отличить от других экземпляров того же типа по уникальному атрибуту:

```typescript
// Бизнес-уникальность
Order { orderNumber: "ORD-2024-001" }
Product { sku: "LAPTOP-XPS-15" }

// Техническая уникальность
User { id: "uuid-123" }
Payment { id: 456 }
```

Наличие уникального идентификатора **не означает** автоматического создания Entity. Это лишь признак того, что объект может ею стать.

**2. Бизнес-термин**

Объект — это термин, который использует бизнес для описания продукта:

```typescript
// Бизнес-термины (потенциальные сущности)
User, Customer, Order, Product, Invoice, Payment, Subscription

// Технические термины (НЕ сущности)
Form, Modal, Layout, Component, State, Config
```

**3. Поведение с состояниями**

Объект имеет чётко выраженные состояния, между которыми может переходить:

```typescript
Order {
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
}

Subscription {
  status: 'trial' | 'active' | 'past_due' | 'cancelled' | 'expired'
}
```

**4. Связи с другими объектами**

```
Order -> belongs to -> User
Order -> contains -> Products
User -> has -> Subscription
```

### Бизнес-глоссарий (рекомендуется)

Создайте документ (не код!), описывающий бизнес-домен вашего приложения:

```markdown
# Бизнес-глоссарий проекта

## Заказ (Order)
- **Уникальность:** номер заказа (orderNumber)
- **Состояния:** pending -> confirmed -> shipped -> delivered
- **Связи:** принадлежит User, содержит Products
- **Правила:** можно отменить только в состоянии pending/confirmed

## Продукт (Product)
- **Уникальность:** артикул (SKU)
- **Связи:** принадлежит Category, входит в Orders
```

Глоссарий ведёт бизнес. Разработчики обновляют слой entities в соответствии с тем, что глоссарий описывает — а не наоборот.

**Цель глоссария:**
- Документировать понимание домена
- Синхронизировать понимание в команде
- Помочь принимать решения об именах модулей
- Глоссарий НЕ диктует структуру кода

---

## Подход 0: Локальность (Local First)

### Главный принцип

> **Всегда начинайте с локального кода. Выносите в общие слои только при повторном использовании.**

Это **не временное решение** и **не технический долг**. Это правильная архитектура для кода, который используется в одном месте — даже если этот код относится к бизнес-сущности вроде `User` или `Order`.

### Структура

```
pages/
  user-profile/
    api/
      index.ts
      profile.ts        # API-запросы + маппинг DTO
    ui/
      index.ts
      ProfilePage.tsx
      ProfileForm.tsx
```

Избегайте общих имён файлов вроде `types.ts` — они склонны превращаться в "зонтичные" файлы, которые смешивают схемы валидации, типы сущностей и другие вещи. Называйте файлы по тому, что они содержат.

### Пример: бизнес-сущность остаётся локально

```typescript title="pages/user-profile/api/profile.ts"
interface UserProfileDTO {
  user_id: number
  full_name: string
  email: string
  joined_days_ago: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  joinedDaysAgo: number
}

function mapProfile(dto: UserProfileDTO): UserProfile {
  return {
    id: String(dto.user_id),
    name: dto.full_name,
    email: dto.email,
    joinedDaysAgo: dto.joined_days_ago,
  }
}

export async function getUserProfile(id: string): Promise<UserProfile> {
  const response = await fetch(`/api/users/${id}/profile`)
  const dto: UserProfileDTO = await response.json()
  return mapProfile(dto)
}
```

Обратите внимание: `UserProfile` строится из одного эндпоинта. Если другие эндпоинты возвращают иную форму данных о пользователе, у каждого должен быть свой локальный тип — не стоит создавать общую абстракцию преждевременно.

```tsx title="pages/user-profile/ui/ProfilePage.tsx"
import { useState, useEffect } from 'react'
import { getUserProfile, type UserProfile } from '../api'

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    getUserProfile('123').then(setProfile)
  }, [])

  const displayName = profile?.name || 'Аноним'
  const isNewUser = (profile?.joinedDaysAgo ?? Infinity) < 7

  return (
    <div>
      <h1>{displayName}</h1>
      {isNewUser && <span className="badge">Новичок</span>}
      <p>{profile?.bio}</p>
    </div>
  )
}
```

**Почему локально, если User — это бизнес-сущность?**

- Пока используется только здесь
- Нет общей бизнес-логики — только отображение
- Неизвестно, какие поля понадобятся в других местах
- YAGNI — не создаём структуру "на будущее"

### Триггеры для перехода к Подходу А или Б

**1. Второе использование (главный триггер)**

```
pages/user-profile/api/profile.ts     // getUserProfile()
pages/settings/api/profile.ts         // getUserProfile() — дубликат!
```

**2. Другие разработчики копируют ваш код**

Если коллеги копируют ваш код — это сигнал к выделению общего модуля.

**3. Бизнес ссылается на объект как на центральную концепцию**

Если объект становится ключевым понятием в нескольких фичах — пора создавать Entity.

---

## Подход А: Централизованное API (`shared/api`)

В этом подходе API-функции и доменные типы живут в `shared/api/`, сгруппированные по сущностям. Хорошо подходит, когда сущности ещё в процессе изменений или проект небольшой.

Подробное руководство с примерами кода — в разделе [API Requests](https://fsd.how/docs/guides/examples/api-requests).

### Когда использовать

- Команды, начинающие работать с FSD
- Небольшие проекты (менее ~10 экранов)
- Проекты с часто меняющейся бизнес-логикой
- Когда неясно, какие сущности уже устоялись

### Структура

```
shared/
  api/
    client.ts       # настройка HTTP-клиента
    contracts.ts    # ApiResponse, PaginationParams
    user.ts         # API для User + маппинг DTO
    order.ts        # API для Order + маппинг DTO
    index.ts        # re-exports
```

Ключевое отличие от Подхода Б: доменные типы (`User`, `Order`) живут в `shared/api/` рядом с API-функциями, а не в `entities/*/model/`.

### Триггеры для миграции в `entities/`

**Начинает накапливаться бизнес-логика**

```typescript
// shared/api/user.ts выходит за рамки чистого API:
export function isAdmin(user: User): boolean { ... }
export function canEditPost(user: User, post: Post): boolean { ... }
export function getUserPermissions(user: User): string[] { ... }

// Пора в entities/user/model/
```

**Нужна агрегация данных из нескольких сущностей**

```typescript
// Получение пользователя с обогащением связанными данными
// должно жить в entities/user/model/, а не в shared/api/
export async function getUserWithOrders(userId: string) {
  const user = await getUserById(userId)
  const orders = await getOrdersByUserId(userId)
  return { ...user, orders }
}
```

**Одна и та же логика дублируется в разных местах**

```typescript
// В 10+ файлах:
const isAdmin = user.role === 'admin'
// Пора централизовать в entities/user/model/
```

---

## Подход Б: Доменное API (`entities/*/api/`)

В этом подходе каждая сущность полностью живёт в своём слайсе — включая API, маппинг DTO, доменные типы и бизнес-логику.

### Когда использовать

- Средние и крупные проекты
- Команды с опытом работы с FSD
- Проекты, где важна защита от изменений backend API
- Долгоживущие enterprise-приложения

### Почему важен слой маппинга

При изменении контракта backend, последствия локализованы:

```
// Backend изменил: { user_id: number } -> { id: string }

// Подход А: ~15 файлов требуют обновления
// Подход Б: 1 файл (маппер в entities/user/api/)
```

### Структура

```
shared/
  api/
    index.ts
    client.ts           # только HTTP-клиент
    contracts.ts        # только инфраструктурные типы

entities/
  user/
    api/
      index.ts
      user-api.ts       # API-функции + маппинг DTO
    model/
      index.ts
      user.ts           # доменный тип User
      permissions.ts    # бизнес-правила
    index.ts

  order/
    api/
      index.ts
      order-api.ts
    model/
      index.ts
      order.ts
      validation.ts
    index.ts
```

Доменные типы (`User`, `Order`) принадлежат `model/`, называются по сущности — `user.ts`, `order.ts`. Не в сегменте `api/`.

### Пример кода

```typescript title="entities/user/model/user.ts"
export interface User {
  id: string
  email: string
  role: 'admin' | 'moderator' | 'viewer'
  createdAt: Date
}
```

```typescript title="entities/user/api/user-api.ts"
import { apiClient } from 'shared/api/client'
import type { User } from '../model/types'

interface UserDTO {
  user_id: number
  user_email: string
  user_role: string
  created_at: string
}

function mapUserFromDTO(dto: UserDTO): User {
  return {
    id: String(dto.user_id),
    email: dto.user_email,
    role: dto.user_role as User['role'],
    createdAt: new Date(dto.created_at),
  }
}

export async function getUserById(id: string): Promise<User> {
  const { data } = await apiClient.get<UserDTO>(`/users/${id}`)
  return mapUserFromDTO(data)
}

export async function getUsers(): Promise<User[]> {
  const { data } = await apiClient.get<UserDTO[]>('/users')
  return data.map(mapUserFromDTO)
}
```

```typescript title="entities/user/index.ts"
export { getUserById, getUsers } from './api'
export type { User } from './model'
```

### Эволюция при росте проекта

Сущности растут постепенно — не стройте полную структуру заранее.

**Шаг 1: только API + типы**
```
entities/user/
  api/user-api.ts
  model/user.ts
  index.ts
```

**Шаг 2: появляется бизнес-логика**
```
entities/user/
  api/user-api.ts
  model/
    user.ts
    permissions.ts     # добавлено
  index.ts
```

**Шаг 3: нужен переиспользуемый UI**
```
entities/user/
  api/user-api.ts
  model/
    user.ts
    permissions.ts
  ui/
    UserAvatar.tsx     # добавлено
  index.ts
```

**Шаг 4: сущность стала сложной — разбивка по ответственности**

Для больших или долгоживущих сущностей стоит разбить слайс:

```
entities/user/
  api/
    queries/           # операции чтения
    mutations/         # операции записи
  model/
    user.ts
    permissions/
    profile/
  ui/
    UserAvatar.tsx
  index.ts
```

Или, если контексты сильно расходятся, разбить на отдельные слайсы:

```
entities/
  user-profile/
  user-permissions/
```

---

## Сравнительная таблица

| Критерий | Локальность | Централизованное API | Доменное API |
|----------|-------------|----------------------|--------------|
| Когда использовать | Одно место | 2–5 мест | 3+ мест или чёткий домен |
| Скорость старта | Высокая | Средняя | Ниже |
| Масштабируемость | Низкая | Средняя | Высокая |
| Защита от изменений backend | Нет | Средняя | Высокая |
| Порог входа | Низкий | Средний | Средне-высокий |
| Подходит для MVP | Да | Да | Может быть избыточно |
| Подходит для enterprise | Нет | Потребует рефакторинга | Да |

---

## Когда НЕ создавать Entity

### Используется только в одном месте

```typescript title="pages/admin-dashboard/ui/DashboardPage.tsx"
// Держите локально — entities/dashboard-stats/ не нужна
interface DashboardStats {
  todayRevenue: number
  activeUsers: number
  conversionRate: number
}
```

### Утилитарные функции

```typescript title="shared/lib/formatters.ts"
// Это утилиты, не бизнес-логика
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU').format(date)
```

### Просто загрузка данных без логики

```typescript
// Библиотека запросов уже управляет состоянием и кешированием.
// API-функции достаточно — model/ в entities не нужна.
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
})
```

### Одиночное вычисляемое значение

```typescript
// pages/profile/ui/ProfilePage.tsx
// Одно вычисление не оправдывает создание entities/user/model/
const isAdmin = user.role === 'admin'
```

### UI-специфичные модели

```typescript
// Это UI-логика, не бизнес-сущности
interface FormState {
  email: string
  password: string
  rememberMe: boolean
}
```

---

## Когда СОЗДАВАТЬ `model/` в Entity

Создавайте `entities/*/model/` — независимо от того, где лежит API (`shared/api` или `entities/*/api/`) — когда появляется любое из следующего:

### 1. Агрегация данных

```typescript title="entities/user/model/user-with-team.ts"
import { getUserById } from '../api'
import { getTeamById } from 'entities/team/@x/user'

export async function getUserWithTeam(userId: string) {
  const user = await getUserById(userId)
  const team = await getTeamById(user.teamId)

  return {
    ...user,
    team,
    isTeamLead: team.leaderId === user.id,
  }
}
```

### 2. Бизнес-правила и инварианты

```typescript title="entities/order/model/validation.ts"
import type { Order } from './order.ts'

// Бизнес-правило из глоссария:
// Заказ можно отменить только в состоянии pending или confirmed
export function canBeCancelled(order: Order): boolean {
  return order.status === 'pending' || order.status === 'confirmed'
}

// Бизнес-правило: возврат возможен в течение 14 дней после доставки
export function canBeRefunded(order: Order): boolean {
  if (order.status !== 'delivered' || !order.deliveredAt) return false
  const daysSinceDelivery =
    (Date.now() - order.deliveredAt.getTime()) / (1000 * 60 * 60 * 24)
  return daysSinceDelivery <= 14
}
```

### 3. Множественные взаимосвязанные бизнес-правила

```typescript title="entities/user/model/permissions.ts"
import type { User } from './user.ts'

export function getPermissions(user: User) {
  const isAdmin = user.role === 'admin'
  const isModerator = user.role === 'moderator'

  const canAccessAdminPanel =
    isAdmin || (isModerator && user.yearsOfService > 2)

  const maxUploadBytes =
    user.subscription === 'premium' ? 100_000_000
    : user.subscription === 'basic' ? 10_000_000
    : 1_000_000

  return {
    isAdmin,
    isModerator,
    canAccessAdminPanel,
    canEditPosts: canAccessAdminPanel || user.permissions.includes('edit_posts'),
    canDeletePosts: isAdmin || (isModerator && user.department === 'content'),
    canUploadFile: (fileSize: number) => fileSize <= maxUploadBytes,
  }
}
```

Обратите внимание: это чистый TypeScript без фреймворковой реактивности. Такой код легко тестировать и переиспользовать в любом фреймворке.

### 4. Правила переходов между состояниями

```typescript title="entities/subscription/model/transitions.ts"
import type { Subscription } from './subscription.ts'

const ALLOWED_TRANSITIONS: Record<Subscription['status'], Subscription['status'][]> = {
  trial: ['active', 'cancelled'],
  active: ['past_due', 'cancelled'],
  past_due: ['active', 'cancelled'],
  cancelled: [],
}

export function canTransitionTo(
  subscription: Subscription,
  nextStatus: Subscription['status']
): boolean {
  return ALLOWED_TRANSITIONS[subscription.status].includes(nextStatus)
}

export function isInGracePeriod(subscription: Subscription): boolean {
  if (subscription.status !== 'past_due') return false
  const daysPastDue =
    (Date.now() - subscription.dueDate.getTime()) / (1000 * 60 * 60 * 24)
  return daysPastDue <= 7
}
```

---

## Золотое правило

```
1. Изучите бизнес-домен
   -> Создайте бизнес-глоссарий (документ, не код)

2. Начните с локального кода
   -> pages/ или features/

3. При переиспользовании
   -> shared/api ИЛИ entities/*/api/ (выбор команды)

4. При появлении бизнес-логики
   -> entities/*/model/ (агрегация или бизнес-правила)
```

Ключевые принципы:
- Понимайте бизнес — ведите глоссарий
- Начинайте локально — это не технический долг
- Выносите прагматично — только при реальной необходимости
- Используйте бизнес-термины в именах модулей
- Не создавайте структуру заранее — глоссарий не равно папки
- Держите бизнес-логику в чистых функциях — проще тестировать и переиспользовать

---

## Практический чеклист

**1. Это бизнес-термин или технический термин?**

Если технический (Form, Modal, Config) — не сущность.

**2. Используется в одном месте?**

Держите локально. Если в 2+ местах — переходите к п.3.

**3. Какой подход API подходит проекту?**

- Важна защита от изменений backend? -> Подход Б
- Важна скорость итераций? -> Подход А

**4. Нужен ли `model/`?**

- Агрегация данных? -> Да
- Бизнес-правила или переходы состояний? -> Да
- Только типы и CRUD? -> достаточно `api/`

**5. Задокументировали решение?**

- Обновили бизнес-глоссарий?
- Отметили, почему создали (или не создали) сущность?