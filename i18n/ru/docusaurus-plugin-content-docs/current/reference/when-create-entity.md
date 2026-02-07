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

При этом **понимание бизнес-домена** помогает принимать более осознанные архитектурные решения. Однако понимание домена **не означает** немедленное создание структуры кода.

Когда код начинает переиспользоваться, существует **три валидных подхода** к его организации:

**Подход 0: Локальность** (рекомендуется всегда начинать отсюда)
- Код остаётся в `pages/`
- Используется только в одном месте
- Приоритет: простота, YAGNI

**Подход А: Централизованное API** (`shared/api`)
- API и типы в одном месте
- Миграция в `entities/` при усложнении
- Приоритет: скорость разработки

**Подход Б: Доменное API** (`entities/*/api/`)
- API привязано к бизнес-сущности
- Готовность к росту с первого дня
- Приоритет: архитектурная устойчивость

Все три подхода согласуются с **философией FSD 2.1**: избегать преждевременной декомпозиции и добавлять слои по мере необходимости.

---

## Понимание бизнес-домена

Прежде чем приступать к разработке, полезно понимать основные концепции предметной области вашего приложения. Это помогает:
- 🎯 Выбирать правильные имена для модулей
- 🗣️ Говорить на одном языке с бизнесом
- 🔮 Предвидеть, какие объекты могут стать сущностями
- 📋 Документировать архитектурные решения

### Признаки бизнес-сущности

Объект **может стать** Entity в будущем, если он обладает следующими характеристиками:

**1. Уникальная идентичность**

Объект можно отличить от других экземпляров того же типа по уникальному атрибуту:

```typescript
// Бизнес-уникальность
Order { orderNumber: "ORD-2024-001" }     // уникальный номер заказа
Product { sku: "LAPTOP-XPS-15" }          // уникальный артикул
Report { hash: "a7f3k9m2" }               // уникальный хэш (временный)

// Техническая уникальность
User { id: "uuid-123" }                   // уникальный id
Payment { id: 456 }                       // инкрементный id
```

**⚠️ Важно:** Наличие уникального идентификатора **не означает** автоматическое создание Entity. Это лишь **признак**, что объект может ею стать.

**2. Бизнес-термин**

Объект — это термин, который использует бизнес для описания продукта:

```typescript
// ✅ Бизнес-термины (потенциальные сущности)
User, Customer, Order, Product, Invoice, Payment, Subscription

// ❌ Технические термины (НЕ сущности)
Form, Modal, Layout, Component, State, Config
```

**Совет:** Слушайте, как бизнес называет объекты. Если говорят "создать пользователя", "отменить заказ", "оплатить счёт" — это кандидаты в сущности.

**3. Жизненный цикл и поведение**

Объект имеет состояния и может переходить между ними:

```typescript
// Заказ имеет жизненный цикл
Order {
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
}

// Пользователь имеет жизненный цикл
User {
  status: 'registered' | 'active' | 'suspended' | 'deleted'
}

// Подписка имеет жизненный цикл
Subscription {
  status: 'trial' | 'active' | 'past_due' | 'cancelled' | 'expired'
}
```

**4. Связи с другими объектами**

Объект участвует в бизнес-отношениях:

```
Order → belongs to → User
Order → contains → Products
User → has → Subscription
Invoice → belongs to → Order
Payment → pays for → Invoice
```

### Бизнес-глоссарий (рекомендуется)

Создайте документ (не код!), описывающий бизнес-домен вашего приложения:

```markdown
# Бизнес-глоссарий проекта

## Пользователь (User)
- **Уникальность:** email или id
- **Роли:** admin, manager, viewer
- **Жизненный цикл:** registered → active → blocked
- **Связи:** имеет подписку, создаёт заказы

## Заказ (Order)
- **Уникальность:** номер заказа (orderNumber)
- **Статусы:** pending → confirmed → shipped → delivered
- **Связи:** принадлежит User, содержит Products

## Продукт (Product)
- **Уникальность:** артикул (SKU)
- **Категории:** electronics, books, clothing
- **Связи:** принадлежит Category, входит в Orders

## Отчёт (Report)
- **Уникальность:** временный хэш (живёт 30 минут)
- **Особенность:** может быть расшарен между пользователями
- **Связи:** создаётся User
```

**Цель глоссария:**
- ✅ Документировать понимание домена
- ✅ Синхронизировать понимание в команде
- ✅ Помочь принимать решения о названиях модулей
- ❌ НЕ диктовать структуру кода

### Пример анализа бизнес-требований

**Задача:**
> Реализовать добавление пользователя в систему  
> - Обязательное поле: ФИО  
> - Обязательное поле: Адрес (город, улица, дом)  
> - Обязательное поле: год рождения  
> - Роль "менеджер" назначается по умолчанию

**Анализ:**

1. **ФИО** — не уникально (могут быть тёзки)
2. **Адрес** — может быть уникальным, но не гарантирует (нет индекса, могут быть соседи)
3. **Год рождения** — не уникально
4. **Роль** — имеет название и набор доступов, вероятно имеет `id` → потенциальная сущность
5. **Пользователь** — имеет `id` → потенциальная сущность

**Вывод для глоссария:**
```markdown
## Пользователь (User)
- Потенциальная сущность (имеет id)
- Связан с Role

## Роль (Role)
- Потенциальная сущность (имеет id)
- Связана с User (один-ко-многим)
```

**Вывод для кода:**
```
❌ НЕ создавайте сразу:
   entities/user/
   entities/role/

✅ Начните с:
   pages/add-user/
   
✅ Создайте Entity когда:
   - User нужен в 2+ местах
   - Появится логика (permissions, validation)
```

---

### Подход 0: Локальность (Local First)

#### Главный принцип

> **Всегда начинайте с локального кода. Выносите в общие слои только при повторном использовании.**

Это **не временное решение** и **не технический долг**. Это правильная архитектура для кода, который используется в одном месте.

**Даже если объект является бизнес-сущностью** (User, Order, Product), начинайте с локального кода.

#### Когда использовать

✅ **Используйте всегда как стартовую точку:**
- Любая новая функциональность
- Экспериментальные фичи
- Специфичная логика одной страницы
- Одноразовые формы и компоненты

✅ **Даже для бизнес-сущностей:**
- Первая реализация User — в `pages/registration/`
- Первая реализация Order — в `pages/checkout/`
- Первая реализация Product — в `pages/catalog/`

#### Преимущества

- 🎯 **Простота** — код там, где он нужен
- ⚡ **Скорость** — нет overhead с созданием структуры
- 🔍 **Понятность** — легко найти всю логику страницы
- 🛡️ **YAGNI** — не создаём абстракции "на будущее"
- 🔄 **Гибкость** — легко менять, нет зависимостей

#### Структура

```
pages/
  user-profile/
    api/
      profile-api.ts      # API запросы
    model/
      types.ts            # типы
      validation.ts       # локальная логика
    ui/
      ProfilePage.vue
      ProfileForm.vue

features/
  edit-profile/
    api/
      update-profile.ts
    model/
      validation.ts
    ui/
      EditProfileForm.vue
```

#### Пример: Бизнес-сущность локально

**Из бизнес-глоссария:**
```markdown
## Пользователь (User)
- Уникальность: id
- Потенциальная сущность
```

**В коде (день 1):**
```typescript
// ❌ НЕ создаём сразу entities/user/

// ✅ Начинаем локально
// pages/user-profile/api/profile-api.ts
interface UserDTO {
  user_id: number
  full_name: string
  email: string
}

interface UserProfile {
  id: string
  name: string
  email: string
}

function mapProfile(dto: UserDTO): UserProfile {
  return {
    id: String(dto.user_id),
    name: dto.full_name,
    email: dto.email,
  }
}

export async function getUserProfile(id: string): Promise<UserProfile> {
  const response = await fetch(`/api/users/${id}/profile`)
  const dto = await response.json()
  return mapProfile(dto)
}
```

```vue
<!-- pages/user-profile/ui/ProfilePage.vue -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getUserProfile } from '../api/profile-api'

const profile = ref<UserProfile | null>(null)

// Локальная бизнес-логика
const displayName = computed(() => {
  if (!profile.value) return ''
  return profile.value.name || 'Аноним'
})

const isNewUser = computed(() => {
  // Логика, специфичная только для этой страницы
  return profile.value?.joinedDaysAgo < 7
})

onMounted(async () => {
  profile.value = await getUserProfile('123')
})
</script>

<template>
  <div>
    <h1>{{ displayName }}</h1>
    <span v-if="isNewUser" class="badge">Новичок</span>
    <p>{{ profile?.bio }}</p>
  </div>
</template>
```

**Почему локально, если User — это бизнес-сущность?**

1. Пока используется только здесь
2. Нет бизнес-логики (только отображение)
3. Неизвестно, какие ещё поля понадобятся
4. YAGNI — не создаём структуру "на будущее"

#### ⚠️ Триггеры для перехода к Подходу А или Б

Переносите код из локального слоя, когда:

**1. Вторичное использование (главный триггер)**

```typescript
// ❌ Дублирование в двух местах
pages/user-profile/api/profile-api.ts     // getUserProfile()
pages/settings/api/profile-api.ts         // getUserProfile() — копия!

// ✅ Пора выносить в shared/api или entities/user/api/
```

**2. Используется в 3+ местах**
```typescript
// Используется в:
pages/user-profile/
pages/user-settings/
features/user-card/
widgets/user-menu/

// ✅ Точно пора выносить
```

**3. Другие разработчики копируют ваш код**

Если видите, что коллеги копируют ваш код — это сигнал к выделению общего модуля.

**4. Бизнес спрашивает: "А где у нас User?"**

Если бизнес начинает ссылаться на объект как на центральную концепцию — пора создавать Entity.

---

### Подход А: Централизованное API (shared/api)

#### Когда использовать

✅ **Рекомендуется для:**
- Небольших и средних проектов
- Команд, начинающих работать с FSD
- Стартапов с быстрыми итерациями
- Проектов с нестабильной бизнес-моделью

#### Преимущества

- ⚡ **Быстрый переход от локального кода** — просто переносим файлы
- 🎯 **Всё API в одном месте** — легко найти
- 🔄 **Легко рефакторить** — в `entities/` при необходимости
- 📦 **Меньше вложенности** — проще для новичков

#### Недостатки

- ⚠️ **Может разрастись** — требует дисциплины
- 🔗 **API отделено от домена** — менее выразительная структура
- 🔀 **Возможен рефакторинг** — при росте проекта

#### Структура

```
shared/
  api/
    client.ts           # axios instance
    types.ts            # общие типы (ApiResponse, Pagination)
    
    user.ts             # API для User + маппинг DTO
    product.ts          # API для Product + маппинг DTO
    order.ts            # API для Order + маппинг DTO
    
    index.ts            # re-exports
```

#### Пример кода

```typescript
// shared/api/client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Общая обработка ошибок
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)
```

```typescript
// shared/api/types.ts
export interface ApiResponse<T> {
  data: T
  meta?: {
    page: number
    total: number
  }
}

export interface PaginationParams {
  page: number
  limit: number
}
```

```typescript
// shared/api/user.ts
import { apiClient } from './client'

interface UserDTO {
  user_id: number
  user_email: string
  user_role: string
}

export interface User {
  id: string
  email: string
  role: string
}

function mapUserFromDTO(dto: UserDTO): User {
  return {
    id: String(dto.user_id),
    email: dto.user_email,
    role: dto.user_role,
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

export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  const { data } = await apiClient.post<UserDTO>('/users', {
    user_email: userData.email,
    user_role: userData.role,
  })
  return mapUserFromDTO(data)
}
```

```typescript
// shared/api/index.ts
export { getUserById, getUsers, createUser, type User } from './user'
export { getProducts, type Product } from './product'
export { getOrders, type Order } from './order'
export { apiClient } from './client'
export type { ApiResponse, PaginationParams } from './types'
```

#### Использование в pages

```vue
<!-- pages/users/ui/UsersPage.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers, type User } from 'shared/api'

const users = ref<User[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    users.value = await getUsers()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Пользователи</h1>
    <div v-if="loading">Загрузка...</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.email }} ({{ user.role }})
      </li>
    </ul>
  </div>
</template>
```

#### Миграция из локального кода

**Было:**
```
pages/user-profile/api/profile-api.ts
```

**Стало:**
```
shared/api/user.ts
```

**Изменения в импортах:**
```typescript
// Было
import { getUserProfile } from '../api/profile-api'

// Стало
import { getUserById } from 'shared/api'
```

#### ⚠️ Триггеры для миграции в entities/

Переносите из `shared/api` в `entities/`, когда:

**1. Появилась бизнес-логика**

```typescript
// ❌ Начинает плохо пахнуть в shared/api
export function isAdmin(user: User): boolean {
  return user.role === 'admin'
}

export function canEditPost(user: User, post: Post): boolean {
  return user.role === 'admin' || user.id === post.authorId
}

export function getUserPermissions(user: User): string[] {
  // 20 строк логики
}

// ✅ Пора в entities/user/model/
```

**2. Нужна агрегация**

```typescript
// ❌ Усложняется в shared/api
export async function getUserWithTeam(userId: string) {
  const user = await getUserById(userId)
  const team = await getTeamById(user.teamId)
  return { ...user, team }
}

export async function getUserWithOrders(userId: string) {
  const user = await getUserById(userId)
  const orders = await getOrdersByUserId(userId)
  return { ...user, orders }
}

// ✅ Это entities/user/model/use-user-with-team.ts
```

**3. Файл разросся до 300+ строк**

Когда в одном файле `shared/api/user.ts` больше 10 функций и 300 строк — пора задуматься о `entities/user/`.

**4. Типы используются в 5+ местах с дополнительной логикой**

```typescript
// ❌ shared/api/user.ts импортируется везде с логикой:
import { User } from 'shared/api'

// В 15 разных файлах:
const isAdmin = user.role === 'admin'
const canEdit = user.role === 'admin' || user.role === 'moderator'
// ... дублирование логики

// ✅ Лучше вынести в entities/user/model/use-user.ts
```

#### Пример миграции

**Было (shared/api):**
```
shared/
  api/
    user.ts           # 400 строк, 15 функций, логика permissions
```

**Стало (entities):**
```
shared/
  api/
    client.ts         # только инфраструктура
    types.ts

entities/
  user/
    api/
      user-api.ts     # API + маппинг (100 строк)
    model/
      types.ts
      use-user-permissions.ts    # бизнес-логика (150 строк)
    index.ts
```

---

### Подход Б: Доменное API (entities/*/api/)

#### Когда использовать

✅ **Рекомендуется для:**
- Средних и крупных проектов
- Команд с опытом работы с FSD или DDD
- Проектов с чёткой доменной моделью
- Enterprise-приложений

✅ **Особенно полезно, если:**
- У вас есть **бизнес-глоссарий** и чёткое понимание сущностей
- Проект будет жить долго и масштабироваться
- Важна **защита от изменений backend API**

#### Преимущества

- 🏗️ **Доменная структура** — API привязано к сущности из бизнес-глоссария
- 📦 **Полная инкапсуляция** — всё о `User` в `entities/user/`
- 🔒 **Защита от изменений backend** — DTO маппинг изолирован
- 🗣️ **Общий язык** — структура кода отражает бизнес-термины
- 🚀 **Готовность к росту** — легко добавить `model/` и `ui/`

#### Недостатки

- 📁 **Больше вложенности** — может показаться избыточным
- 🤔 **Требует понимания доменов** — нужно определять границы сущностей

#### Защита от изменений backend

Один из главных плюсов Подхода Б — **изоляция от внешних изменений**.

**Пример проблемы:**

```typescript
// Backend изменил контракт:
// Было: { user_id: number, user_email: string }
// Стало: { id: string, email: string, metadata: {...} }
```

**Подход А (shared/api):**
```typescript
// shared/api/user.ts
// ❌ Изменения влияют на все импорты

export interface User {
  id: number  // → нужно менять на string
  email: string
}

// ❌ Сломались все места использования:
pages/profile/ui/ProfilePage.vue
pages/settings/ui/SettingsPage.vue
features/user-menu/ui/UserMenu.vue
// ... 15 файлов
```

**Подход Б (entities/user/api/):**
```typescript
// entities/user/api/user-api.ts
// ✅ Изменения локализованы в маппере

interface UserDTO {
  id: string        // изменилось
  email: string
  metadata: object  // добавилось
}

export interface User {
  id: string        // изменилось ТУТ
  email: string
  // metadata НЕ пробрасываем — не нужна в домене
}

function mapUser(dto: UserDTO): User {
  return {
    id: dto.id,  // изменился маппинг
    email: dto.email,
  }
}
```

```typescript
// entities/user/model/types.ts
// ✅ Доменная модель стабильна
export interface User {
  id: string
  email: string
}

// ✅ Все импорты работают без изменений:
pages/profile/   // импортирует User
pages/settings/  // импортирует User
features/menu/   // импортирует User
```

**Radius of change:**
- Подход А: ~15 файлов
- Подход Б: 1 файл (маппер)

#### Структура

```
shared/
  api/
    client.ts           # ТОЛЬКО инфраструктура
    types.ts            # ТОЛЬКО общие типы

entities/
  user/
    api/
      user-api.ts       # API + маппинг
    model/
      types.ts          # User (доменная модель)
    index.ts

  product/
    api/
      product-api.ts
    model/
      types.ts
    index.ts

  order/
    api/
      order-api.ts
    model/
      types.ts
    index.ts
```

#### Пример кода

```typescript
// shared/api/client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)
```

```typescript
// shared/api/types.ts
export interface ApiResponse<T> {
  data: T
  meta?: {
    page: number
    total: number
  }
}

export interface PaginationParams {
  page: number
  limit: number
}
```

```typescript
// entities/user/api/user-api.ts
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
    role: dto.user_role,
    createdAt: new Date(dto.created_at),
  }
}

function mapUserToDTO(user: Partial<User>): Partial<UserDTO> {
  return {
    user_email: user.email,
    user_role: user.role,
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

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const { data } = await apiClient.post<UserDTO>('/users', mapUserToDTO(userData))
  return mapUserFromDTO(data)
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  const { data } = await apiClient.patch<UserDTO>(`/users/${id}`, mapUserToDTO(userData))
  return mapUserFromDTO(data)
}
```

```typescript
// entities/user/model/types.ts
export interface User {
  id: string
  email: string
  role: string
  createdAt: Date
}
```

```typescript
// entities/user/index.ts
export { getUserById, getUsers, createUser, updateUser } from './api/user-api'
export type { User } from './model/types'
```

#### Использование в pages

```vue
<!-- pages/users/ui/UsersPage.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers, type User } from 'entities/user'

const users = ref<User[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    users.value = await getUsers()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Пользователи</h1>
    <div v-if="loading">Загрузка...</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.email }} ({{ user.role }})
      </li>
    </ul>
  </div>
</template>
```

#### Миграция из локального кода

**Было:**
```
pages/user-profile/api/profile-api.ts
pages/user-profile/model/types.ts
```

**Стало:**
```
entities/user/api/user-api.ts
entities/user/model/types.ts
```

**Изменения в импортах:**
```typescript
// Было
import { getUserProfile, type UserProfile } from '../api/profile-api'

// Стало
import { getUserById, type User } from 'entities/user'
```

#### Эволюция при росте проекта

**Шаг 1: Только API**
```
entities/user/
  api/user-api.ts
  model/types.ts
  index.ts
```

**Шаг 2: Появилась простая логика**
```
entities/user/
  api/user-api.ts
  model/
    types.ts
    use-user.ts        # + вычисляемые свойства
  index.ts
```

**Шаг 3: Агрегация**
```
entities/user/
  api/user-api.ts
  model/
    types.ts
    use-user.ts
    use-user-with-team.ts   # + агрегация
  index.ts
```

**Шаг 4: UI-компоненты**
```
entities/user/
  api/user-api.ts
  model/
    types.ts
    use-user.ts
    use-user-with-team.ts
  ui/
    UserAvatar.vue          # + переиспользуемый UI
  index.ts
```

---

### Сравнительная таблица подходов

| Критерий | Локальность | Централизованное API | Доменное API |
|----------|-------------|----------------------|--------------|
| **Когда использовать** | Одно место | 2-5 мест | 3+ мест или чёткий домен |
| **Скорость старта** | ⚡⚡⚡ | ⚡⚡ | ⚡ |
| **Простота** | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| **Масштабируемость** | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Архитектурная чистота** | N/A | ⭐⭐ | ⭐⭐⭐ |
| **Защита от изменений backend** | N/A | ⭐⭐ | ⭐⭐⭐ |
| **Легкость поиска кода** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Порог входа** | ✅ Низкий | ✅ Средний | ⚠️ Средне-высокий |
| **Подходит для MVP** | ✅ Да | ✅ Да | ⚠️ Может быть избыточно |
| **Подходит для энтерпрайза** | ❌ Нет | ⚠️ Потребует рефакторинга | ✅ Да |

---

### Рекомендации по выбору подхода

#### Выбирайте Подход 0 (Локальность), если:

- 🆕 Новая функциональность
- 🧪 Экспериментальная фича
- 📍 Код используется только в одном месте
- ❓ Непонятно, будет ли переиспользование

**Пример:** Страница статистики для админов, которая больше нигде не нужна.

#### Выбирайте Подход А (shared/api), если:

- 👶 Команда только начинает работать с FSD
- 🚀 Нужно быстро запустить MVP
- 📊 Проект маленький (< 10 экранов)
- 🔄 Бизнес-логика часто меняется
- 💡 Ещё не понятно, какие сущности устоялись

**Пример:** Стартап делает прототип нового продукта, бизнес-модель может измениться.

#### Выбирайте Подход Б (entities/*/api/), если:

- 🏢 Зрелая команда с опытом
- 🏗️ Средний/крупный проект
- 📋 Бизнес-домен уже понятен (есть глоссарий)
- 🔒 Важна стабильность и изолированность от backend
- 📚 Проект будет жить долго и расти

**Пример:** Enterprise-приложение с устоявшимися бизнес-процессами.

---

### Гибридный подход (прагматичный)

Можно комбинировать оба подхода в одном проекте:

```
shared/
  api/
    client.ts
    analytics.ts        # Не сущность — остаётся в shared

entities/
  user/                 # Устоялась — вынесли
    api/
    model/
  
  product/              # Устоялась — вынесли
    api/
    model/

pages/
  admin-dashboard/
    api/
      stats-api.ts      # Используется только здесь — локально
```

**Правило:** Устоявшиеся сущности → `entities/`, экспериментальное → локально или `shared/api`.

---

### ❌ Когда НЕ создавать Entity

Независимо от выбранного подхода, НЕ создавайте Entity в следующих случаях:

#### 1. Используется только в одном месте

```vue
<!-- ❌ НЕ НУЖНА Entity -->
<!-- pages/admin-dashboard/ui/DashboardPage.vue -->
<script setup lang="ts">
interface DashboardStats {
  todayRevenue: number
  activeUsers: number
  conversionRate: number
}

const stats = ref<DashboardStats | null>(null)

onMounted(async () => {
  const response = await fetch('/api/dashboard/stats')
  stats.value = await response.json()
})
</script>
```

**Держите локально в pages/.**

#### 2. Простые утилитарные функции

```typescript
// ❌ НЕ НУЖНА Entity
// shared/lib/formatters.ts
export const formatUserName = (firstName: string, lastName: string) => 
  `${firstName} ${lastName}`

export const formatDate = (date: Date) => 
  new Intl.DateTimeFormat('ru-RU').format(date)
```

**Это утилиты, не бизнес-логика.**

#### 3. Просто загрузка данных без логики

```vue
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getUsers } from 'shared/api'

// ❌ НЕ НУЖНА Entity с model/
const { data: users, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers
})
</script>
```

**TanStack Query уже управляет состоянием, кешированием. Достаточно API-функции.**

#### 4. Одиночное вычисляемое свойство

```typescript
// ❌ НЕ НУЖНА Entity
// pages/profile/ui/ProfilePage.vue
const user = ref<User>(/* ... */)

const isAdmin = computed(() => user.value.role === 'admin')
```

**Одно вычисление держите локально.**

#### 5. UI-специфичные модели

```typescript
// ❌ НЕ Entity
interface FormState {
  email: string
  password: string
  rememberMe: boolean
}

interface ModalConfig {
  isOpen: boolean
  title: string
}
```

**Это UI-логика, не бизнес-сущности.**

---

### ✅ Когда СОЗДАВАТЬ model/ в Entity

Независимо от того, где у вас лежит API (`shared/api` или `entities/*/api/`), создавайте `entities/*/model/`, когда появляется:

#### 1. Агрегация данных

**Признак из бизнес-глоссария:**
```markdown
## Пользователь (User)
- Связи: принадлежит к Команде (Team)
```

**Код:**
```typescript
// ✅ entities/user/model/use-user-with-team.ts
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getUserById } from '../api/user-api'
import { getTeamById } from 'entities/team/api/team-api'

export function useUserWithTeam(userId: string) {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId)
  })
  
  // Агрегация связанной сущности
  const { data: team } = useQuery({
    queryKey: ['team', user.value?.teamId],
    queryFn: () => getTeamById(user.value!.teamId),
    enabled: computed(() => !!user.value?.teamId)
  })
  
  const enrichedUser = computed(() => {
    if (!user.value) return null
    
    return {
      ...user.value,
      team: team.value,  // обогащение
      isTeamLead: team.value?.leaderId === user.value.id
    }
  })
  
  return {
    user: enrichedUser,
    isLoading: computed(() => !user.value || !team.value)
  }
}
```

**Почему Entity:** Объединяем данные пользователя и команды, создаём обогащённую модель.

#### 2. Бизнес-правила и инварианты

**Признак из бизнес-глоссария:**
```markdown
## Заказ (Order)
- Статусы: pending → confirmed → shipped → delivered
- Правило: можно отменить только в статусе pending/confirmed
- Правило: можно вернуть в течение 14 дней после delivered
```

**Код:**
```typescript
// ✅ entities/order/model/use-order-validation.ts
import { computed } from 'vue'
import type { Order } from './types'

export function useOrderValidation(order: Order) {
  // Бизнес-правило из глоссария
  const canBeCancelled = computed(() => {
    const cancellableStatuses = ['pending', 'confirmed']
    return cancellableStatuses.includes(order.status)
  })
  
  const canBeRefunded = computed(() => {
    if (order.status !== 'delivered') return false
    
    // Бизнес-правило: 14 дней
    const daysSinceDelivery = 
      (Date.now() - new Date(order.deliveredAt!).getTime()) / (1000 * 60 * 60 * 24)
    
    return daysSinceDelivery <= 14
  })
  
  const canBeEdited = computed(() => {
    return order.status === 'pending' && !order.isPaid
  })
  
  return {
    canBeCancelled,
    canBeRefunded,
    canBeEdited
  }
}
```

**Почему Entity:** Сложные бизнес-инварианты, определяющие допустимые операции.

#### 3. Множественные вычисляемые свойства с бизнес-правилами

**Признак из бизнес-глоссария:**
```markdown
## Пользователь (User)
- Роли: admin, moderator, viewer
- Подписки: free, basic, premium
- Правила доступа зависят от комбинации роли и подписки
```

**Код:**
```typescript
// ✅ entities/user/model/use-user-permissions.ts
import { computed } from 'vue'
import type { User } from './types'

export function useUserPermissions(user: User) {
  const isAdmin = computed(() => user.role === 'admin')
  
  const isModerator = computed(() => user.role === 'moderator')
  
  // Бизнес-правило из глоссария
  const canAccessAdminPanel = computed(() => {
    return isAdmin.value || 
           (isModerator.value && user.yearsOfService > 2)
  })
  
  // Бизнес-правило: зависит от подписки
  const maxUploadSize = computed(() => {
    if (user.subscription === 'premium') return 100_000_000 // 100 MB
    if (user.subscription === 'basic') return 10_000_000    // 10 MB
    return 1_000_000                                         // 1 MB
  })
  
  const canEditPosts = computed(() => {
    return canAccessAdminPanel.value || 
           user.permissions.includes('edit_posts')
  })
  
  const canDeletePosts = computed(() => {
    return isAdmin.value || 
           (isModerator.value && user.department === 'content')
  })
  
  const canUploadFile = (fileSize: number) => {
    return fileSize <= maxUploadSize.value
  }
  
  return {
    isAdmin,
    isModerator,
    canAccessAdminPanel,
    canEditPosts,
    canDeletePosts,
    maxUploadSize,
    canUploadFile,
  }
}
```

**Почему Entity:** Сложная бизнес-логика с множеством взаимосвязанных правил, не просто "одно вычисляемое свойство".

#### 4. Управление коллекцией с бизнес-логикой

**Признак из бизнес-глоссария:**
```markdown
## Пользователь (User)
- Может быть сгруппирован по отделам
- Статистика по активным пользователям важна для бизнеса
```

**Код:**
```typescript
// ✅ entities/user/model/use-users-list.ts
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getUsers } from '../api/user-api'
import { getTeams } from 'entities/team/api/team-api'

export function useUsersList() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
  
  const { data: teams } = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams
  })
  
  // Агрегация: обогащаем пользователей данными команд
  const usersWithTeams = computed(() => {
    if (!users.value || !teams.value) return []
    
    const teamsMap = Object.fromEntries(
      teams.value.map(team => [team.id, team])
    )
    
    return users.value.map(user => ({
      ...user,
      team: teamsMap[user.teamId],
      isTeamLead: teamsMap[user.teamId]?.leaderId === user.id
    }))
  })
  
  // Бизнес-логика фильтрации
  const activeUsers = computed(() => 
    usersWithTeams.value.filter(user => user.status === 'active')
  )
  
  // Бизнес-логика группировки
  const usersByDepartment = computed(() => {
    const groups: Record<string, typeof usersWithTeams.value> = {}
    
    usersWithTeams.value.forEach(user => {
      const dept = user.team?.department || 'unassigned'
      if (!groups[dept]) groups[dept] = []
      groups[dept].push(user)
    })
    
    return groups
  })
  
  // Статистика
  const stats = computed(() => ({
    total: users.value?.length || 0,
    active: activeUsers.value.length,
    admins: activeUsers.value.filter(u => u.role === 'admin').length,
    departments: Object.keys(usersByDepartment.value).length
  }))
  
  return {
    users: usersWithTeams,
    activeUsers,
    usersByDepartment,
    stats
  }
}
```

**Почему Entity:** Агрегация данных, бизнес-логика фильтрации и группировки, вычисление статистики.

#### 5. Жизненный цикл и переходы состояний

**Признак из бизнес-глоссария:**
```markdown
## Подписка (Subscription)
- Статусы: trial → active → past_due → cancelled
- Правило: из trial можно перейти в active или cancelled
- Правило: из past_due можно перейти в active (оплата) или cancelled
```

**Код:**
```typescript
// ✅ entities/subscription/model/use-subscription-lifecycle.ts
import { computed } from 'vue'
import type { Subscription } from './types'

export function useSubscriptionLifecycle(subscription: Subscription) {
  const canActivate = computed(() => {
    // Можно активировать из trial или past_due
    return ['trial', 'past_due'].includes(subscription.status)
  })
  
  const canCancel = computed(() => {
    // Из любого статуса кроме уже cancelled
    return subscription.status !== 'cancelled'
  })
  
  const isInGracePeriod = computed(() => {
    if (subscription.status !== 'past_due') return false
    
    const daysPastDue = 
      (Date.now() - new Date(subscription.dueDate).getTime()) / (1000 * 60 * 60 * 24)
    
    return daysPastDue <= 7  // 7 дней grace period
  })
  
  const nextPossibleStatuses = computed(() => {
    const transitions: Record<string, string[]> = {
      trial: ['active', 'cancelled'],
      active: ['past_due', 'cancelled'],
      past_due: ['active', 'cancelled'],
      cancelled: []
    }
    
    return transitions[subscription.status] || []
  })
  
  return {
    canActivate,
    canCancel,
    isInGracePeriod,
    nextPossibleStatuses
  }
}
```

**Почему Entity:** Управление жизненным циклом с бизнес-правилами переходов между состояниями.

---

### Синтез: от бизнес-анализа к коду

#### Полный пример: User

**Шаг 1: Бизнес-анализ**

```markdown
# Бизнес-глоссарий

## Пользователь (User)
- **Уникальность:** email, id
- **Роли:** admin, manager, viewer
- **Подписки:** free, premium
- **Связи:** принадлежит Team, создаёт Orders
- **Правила:**
  - Админ может всё
  - Менеджер может редактировать, если > 2 лет опыта
  - Premium-пользователь имеет больший лимит загрузок
```

**Шаг 2: Первая реализация (локально)**

```
// День 1: Страница регистрации
pages/registration/
  api/
    registration-api.ts   # создание пользователя
  model/
    types.ts              # локальные типы
    validation.ts         # валидация формы
  ui/
    RegistrationForm.vue
```

**Шаг 3: Второе использование → вынос API**

```
// День 7: User нужен в pages/profile/

// Подход А: shared/api
shared/api/user.ts

// ИЛИ

// Подход Б: entities/user/api/
entities/user/
  api/user-api.ts
  model/types.ts
  index.ts
```

**Шаг 4: Появление бизнес-логики → создание model/**

```
// День 30: Нужны permissions, агрегация с Team

entities/user/
  api/
    user-api.ts
  model/
    types.ts
    use-user-permissions.ts    # бизнес-правила из глоссария
    use-user-with-team.ts      # агрегация
  index.ts
```

**Шаг 5: Переиспользуемый UI → добавление ui/**

```
// День 60: UserAvatar нужен в 5 местах

entities/user/
  api/
    user-api.ts
  model/
    types.ts
    use-user-permissions.ts
    use-user-with-team.ts
  ui/
    UserAvatar.vue            # переиспользуемый компонент
    UserBadge.vue
  index.ts
```

---

### Общение с бизнесом

**Рекомендации:**

1. **Создайте бизнес-глоссарий** в начале проекта
2. **Обновляйте его** при изменении требований
3. **Синхронизируйтесь с бизнесом** — используйте их термины
4. **Но не создавайте код преждевременно** — глоссарий ≠ структура папок

**Хороший процесс:**

```
1. Новое требование от бизнеса
   ↓
2. Обновите бизнес-глоссарий
   (документируйте новую сущность или правило)
   ↓
3. Начните с локального кода (pages/)
   ↓
4. При переиспользовании — вынесите API
   ↓
5. При появлении логики — создайте model/
```

**Пример коммуникации:**

```
Бизнес: "Нам нужна возможность отменять заказы"

Разработчик:
1. Записывает в глоссарий:
   ## Заказ (Order)
   - Правило: может быть отменён в статусе pending/confirmed
   
2. Спрашивает:
   - В каких статусах можно отменить?
   - Есть ли ограничения по времени?
   - Что происходит с оплатой при отмене?
   
3. Обновляет глоссарий с ответами

4. Начинает с pages/order-details/
   (не создаёт entities/order/ сразу)

5. При необходимости создаёт
   entities/order/model/use-order-cancellation.ts
```

**Антипаттерн:**

```
❌ Бизнес: "Нужна отмена заказов"
❌ Разработчик: Сразу создаёт entities/order/ со всей структурой
❌ Результат: Избыточная архитектура, код используется в одном месте
```

**Правильно:**

```
✅ Бизнес: "Нужна отмена заказов"
✅ Разработчик: 
   1. Обновляет глоссарий
   2. Начинает с pages/order-details/
   3. Выносит в entities/ при переиспользовании
✅ Результат: Минимальная, но достаточная архитектура
```

---

### Золотое правило

```
1. Изучите бизнес-домен
   → Создайте бизнес-глоссарий (документ)
   
2. Начните с локального кода
   → pages/ или features/ (код)
   
3. При переиспользовании
   → shared/api ИЛИ entities/*/api/ (выбор команды)
   
4. При появлении логики
   → entities/*/model/ (агрегация или бизнес-правила)
   
5. Синхронизируйте код с бизнесом
   → Обновляйте глоссарий при изменениях
```

**Ключевые принципы:**
- ✅ **Понимайте бизнес** — создавайте глоссарий
- ✅ **Начинайте локально** — это не технический долг
- ✅ **Выносите прагматично** — при реальной необходимости
- ✅ **Используйте бизнес-термины** — в названиях модулей
- ❌ **Не создавайте структуру заранее** — глоссарий ≠ код
- ✅ **Общайтесь с бизнесом** — обновляйте понимание домена
- ✅ **Документируйте решения** — почему создали/не создали Entity

---

### Практический чеклист

При работе с любым объектом задайте себе эти вопросы:

**1. Понимание бизнеса**
- ❓ Это бизнес-термин или технический термин?
- ❓ Есть ли в бизнес-глоссарии?
- ❓ Как бизнес называет этот объект?

**2. Текущее использование**
- ❓ Используется в одном месте? → Держите локально
- ❓ Используется в 2+ местах? → Переходите к п.3

**3. Выбор подхода для API**
- ❓ Какой подход у команды? (А или Б)
- ❓ Нужна ли защита от изменений backend? → Подход Б
- ❓ Важна скорость разработки? → Подход А

**4. Необходимость model/**
- ❓ Есть агрегация данных? → Создавайте model/
- ❓ Есть бизнес-правила/инварианты? → Создавайте model/
- ❓ Только типы и CRUD? → Достаточно api/

**5. Документирование**
- ❓ Обновили бизнес-глоссарий?
- ❓ Задокументировали архитектурное решение?