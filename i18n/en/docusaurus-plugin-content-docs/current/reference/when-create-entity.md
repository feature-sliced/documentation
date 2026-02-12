---
title: When to Create an Entity
sidebar_position: 4
---

# When to Create an Entity {#when-create-entity}

An important principle for effective use of the Entities layer: **not everything should be an entity**. Don't create entities "just in case."

This section will help you decide where to place code related to business entities, considering the context of your project and team.

---

## Philosophy of the Approach

FSD follows the **"Local First"** principle — start with local code in `pages/`, and extract to common layers only when there's **real necessity**.

At the same time, **understanding the business domain** helps make more informed architectural decisions. However, understanding the domain **does not mean** immediately creating code structure.

When code starts being reused, there are **three valid approaches** to organizing it:

**Approach 0: Locality** (always recommended as a starting point)
- Code stays in `pages/`
- Used in only one place
- Priority: simplicity, YAGNI

**Approach A: Centralized API** (`shared/api`)
- API and types in one place
- Migration to `entities/` when complexity grows
- Priority: development speed

**Approach B: Domain API** (`entities/*/api/`)
- API tied to business entity
- Ready for growth from day one
- Priority: architectural stability

All three approaches align with **FSD 2.1 philosophy**: avoid premature decomposition and add layers as needed.

---

## Understanding the Business Domain

Before starting development, it's helpful to understand the core concepts of your application's domain. This helps:
- 🎯 Choose the right names for modules
- 🗣️ Speak the same language as the business
- 🔮 Anticipate which objects might become entities
- 📋 Document architectural decisions

### Signs of a Business Entity

An object **may become** an Entity in the future if it has the following characteristics:

**1. Unique Identity**

An object can be distinguished from other instances of the same type by a unique attribute:

```typescript
// Business uniqueness
Order { orderNumber: "ORD-2024-001" }     // unique order number
Product { sku: "LAPTOP-XPS-15" }          // unique SKU
Report { hash: "a7f3k9m2" }               // unique hash (temporary)

// Technical uniqueness
User { id: "uuid-123" }                   // unique id
Payment { id: 456 }                       // incremental id
```

**⚠️ Important:** Having a unique identifier **does not mean** automatic Entity creation. It's just a **sign** that an object might become one.

**2. Business Term**

The object is a term that the business uses to describe the product:

```typescript
// ✅ Business terms (potential entities)
User, Customer, Order, Product, Invoice, Payment, Subscription

// ❌ Technical terms (NOT entities)
Form, Modal, Layout, Component, State, Config
```

**Tip:** Listen to how the business names objects. If they say "create a user", "cancel an order", "pay an invoice" — these are entity candidates.

**3. Lifecycle and Behavior**

The object has states and can transition between them:

```typescript
// Order has a lifecycle
Order {
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
}

// User has a lifecycle
User {
  status: 'registered' | 'active' | 'suspended' | 'deleted'
}

// Subscription has a lifecycle
Subscription {
  status: 'trial' | 'active' | 'past_due' | 'cancelled' | 'expired'
}
```

**4. Relationships with Other Objects**

The object participates in business relationships:

```
Order → belongs to → User
Order → contains → Products
User → has → Subscription
Invoice → belongs to → Order
Payment → pays for → Invoice
```

### Business Glossary (Recommended)

Create a document (not code!) describing your application's business domain:

```markdown
# Project Business Glossary

## User
- **Uniqueness:** email or id
- **Roles:** admin, manager, viewer
- **Lifecycle:** registered → active → blocked
- **Relationships:** has subscription, creates orders

## Order
- **Uniqueness:** order number (orderNumber)
- **Statuses:** pending → confirmed → shipped → delivered
- **Relationships:** belongs to User, contains Products

## Product
- **Uniqueness:** SKU
- **Categories:** electronics, books, clothing
- **Relationships:** belongs to Category, included in Orders

## Report
- **Uniqueness:** temporary hash (lives 30 minutes)
- **Feature:** can be shared between users
- **Relationships:** created by User
```

**Purpose of the glossary:**
- ✅ Document domain understanding
- ✅ Synchronize understanding within the team
- ✅ Help make decisions about module naming
- ❌ NOT dictate code structure

### Example of Business Requirements Analysis

**Task:**
> Implement adding a user to the system  
> - Required field: Full Name  
> - Required field: Address (city, street, house)  
> - Required field: year of birth  
> - Role "manager" is assigned by default

**Analysis:**

1. **Full Name** — not unique (there can be namesakes)
2. **Address** — may be unique, but doesn't guarantee it (no postal code, there can be neighbors)
3. **Year of birth** — not unique
4. **Role** — has a name and set of permissions, likely has `id` → potential entity
5. **User** — has `id` → potential entity

**Conclusion for glossary:**
```markdown
## User
- Potential entity (has id)
- Related to Role

## Role
- Potential entity (has id)
- Related to User (one-to-many)
```

**Conclusion for code:**
```
❌ DON'T create immediately:
   entities/user/
   entities/role/

✅ Start with:
   pages/add-user/
   
✅ Create Entity when:
   - User is needed in 2+ places
   - Logic appears (permissions, validation)
```

---

### Approach 0: Locality (Local First)

#### Main Principle

> **Always start with local code. Extract to common layers only when reused.**

This is **not a temporary solution** and **not technical debt**. This is the correct architecture for code used in one place.

**Even if an object is a business entity** (User, Order, Product), start with local code.

#### When to Use

✅ **Always use as a starting point:**
- Any new functionality
- Experimental features
- Page-specific logic
- One-off forms and components

✅ **Even for business entities:**
- First User implementation — in `pages/registration/`
- First Order implementation — in `pages/checkout/`
- First Product implementation — in `pages/catalog/`

#### Advantages

- 🎯 **Simplicity** — code where it's needed
- ⚡ **Speed** — no overhead creating structure
- 🔍 **Clarity** — easy to find all page logic
- 🛡️ **YAGNI** — don't create abstractions "for the future"
- 🔄 **Flexibility** — easy to change, no dependencies

#### Structure

```
pages/
  user-profile/
    api/
      profile-api.ts      # API requests
    model/
      types.ts            # types
      validation.ts       # local logic
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

#### Example: Business Entity Locally

**From business glossary:**
```markdown
## User
- Uniqueness: id
- Potential entity
```

**In code (day 1):**
```typescript
// ❌ DON'T create entities/user/ immediately

// ✅ Start locally
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

// Local business logic
const displayName = computed(() => {
  if (!profile.value) return ''
  return profile.value.name || 'Anonymous'
})

const isNewUser = computed(() => {
  // Logic specific only to this page
  return profile.value?.joinedDaysAgo < 7
})

onMounted(async () => {
  profile.value = await getUserProfile('123')
})
</script>

<template>
  <div>
    <h1>{{ displayName }}</h1>
    <span v-if="isNewUser" class="badge">Newbie</span>
    <p>{{ profile?.bio }}</p>
  </div>
</template>
```

**Why locally, if User is a business entity?**

1. Only used here so far
2. No business logic (just display)
3. Unknown what other fields will be needed
4. YAGNI — don't create structure "for the future"

#### ⚠️ Triggers for Transitioning to Approach A or B

Move code from the local layer when:

**1. Secondary Usage (main trigger)**

```typescript
// ❌ Duplication in two places
pages/user-profile/api/profile-api.ts     // getUserProfile()
pages/settings/api/profile-api.ts         // getUserProfile() — copy!

// ✅ Time to extract to shared/api or entities/user/api/
```

**2. Used in 3+ Places**
```typescript
// Used in:
pages/user-profile/
pages/user-settings/
features/user-card/
widgets/user-menu/

// ✅ Definitely time to extract
```

**3. Other Developers Copy Your Code**

If you see colleagues copying your code — it's a signal to extract a common module.

**4. Business Asks: "Where's Our User?"**

If the business starts referring to an object as a central concept — time to create an Entity.

---

### Approach A: Centralized API (shared/api)

#### When to Use

✅ **Recommended for:**
- Small and medium projects
- Teams starting to work with FSD
- Startups with rapid iterations
- Projects with unstable business models

#### Advantages

- ⚡ **Quick transition from local code** — just move files
- 🎯 **All API in one place** — easy to find
- 🔄 **Easy to refactor** — to `entities/` when needed
- 📦 **Less nesting** — simpler for beginners

#### Disadvantages

- ⚠️ **Can grow large** — requires discipline
- 🔗 **API separated from domain** — less expressive structure
- 🔀 **Possible refactoring** — as project grows

#### Structure

```
shared/
  api/
    client.ts           # axios instance
    types.ts            # common types (ApiResponse, Pagination)
    
    user.ts             # API for User + DTO mapping
    product.ts          # API for Product + DTO mapping
    order.ts            # API for Order + DTO mapping
    
    index.ts            # re-exports
```

#### Code Example

```typescript
// shared/api/client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Common error handling
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

#### Usage in Pages

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
    <h1>Users</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.email }} ({{ user.role }})
      </li>
    </ul>
  </div>
</template>
```

#### Migration from Local Code

**Was:**
```
pages/user-profile/api/profile-api.ts
```

**Became:**
```
shared/api/user.ts
```

**Import changes:**
```typescript
// Was
import { getUserProfile } from '../api/profile-api'

// Became
import { getUserById } from 'shared/api'
```

#### ⚠️ Triggers for Migration to entities/

Move from `shared/api` to `entities/` when:

**1. Business Logic Appears**

```typescript
// ❌ Starting to smell in shared/api
export function isAdmin(user: User): boolean {
  return user.role === 'admin'
}

export function canEditPost(user: User, post: Post): boolean {
  return user.role === 'admin' || user.id === post.authorId
}

export function getUserPermissions(user: User): string[] {
  // 20 lines of logic
}

// ✅ Time for entities/user/model/
```

**2. Aggregation Needed**

```typescript
// ❌ Getting complex in shared/api
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

// ✅ This is entities/user/model/use-user-with-team.ts
```

**3. File Grew to 300+ Lines**

When a single file `shared/api/user.ts` has more than 10 functions and 300 lines — time to think about `entities/user/`.

**4. Types Used in 5+ Places with Additional Logic**

```typescript
// ❌ shared/api/user.ts imported everywhere with logic:
import { User } from 'shared/api'

// In 15 different files:
const isAdmin = user.role === 'admin'
const canEdit = user.role === 'admin' || user.role === 'moderator'
// ... logic duplication

// ✅ Better to extract to entities/user/model/use-user.ts
```

#### Migration Example

**Was (shared/api):**
```
shared/
  api/
    user.ts           # 400 lines, 15 functions, permissions logic
```

**Became (entities):**
```
shared/
  api/
    client.ts         # infrastructure only
    types.ts

entities/
  user/
    api/
      user-api.ts     # API + mapping (100 lines)
    model/
      types.ts
      use-user-permissions.ts    # business logic (150 lines)
    index.ts
```

---

### Approach B: Domain API (entities/*/api/)

#### When to Use

✅ **Recommended for:**
- Medium and large projects
- Teams experienced with FSD or DDD
- Projects with clear domain model
- Enterprise applications

✅ **Especially useful if:**
- You have a **business glossary** and clear understanding of entities
- Project will live long and scale
- **Protection from backend API changes** is important

#### Advantages

- 🏗️ **Domain structure** — API tied to entity from business glossary
- 📦 **Complete encapsulation** — everything about `User` in `entities/user/`
- 🔒 **Protection from backend changes** — DTO mapping is isolated
- 🗣️ **Common language** — code structure reflects business terms
- 🚀 **Ready for growth** — easy to add `model/` and `ui/`

#### Disadvantages

- 📁 **More nesting** — may seem excessive
- 🤔 **Requires domain understanding** — need to define entity boundaries

#### Protection from Backend Changes

One of the main advantages of Approach B — **isolation from external changes**.

**Problem example:**

```typescript
// Backend changed the contract:
// Was: { user_id: number, user_email: string }
// Became: { id: string, email: string, metadata: {...} }
```

**Approach A (shared/api):**
```typescript
// shared/api/user.ts
// ❌ Changes affect all imports

export interface User {
  id: number  // → need to change to string
  email: string
}

// ❌ All usage places broke:
pages/profile/ui/ProfilePage.vue
pages/settings/ui/SettingsPage.vue
features/user-menu/ui/UserMenu.vue
// ... 15 files
```

**Approach B (entities/user/api/):**
```typescript
// entities/user/api/user-api.ts
// ✅ Changes localized in mapper

interface UserDTO {
  id: string        // changed
  email: string
  metadata: object  // added
}

export interface User {
  id: string        // changed HERE
  email: string
  // metadata NOT passed — not needed in domain
}

function mapUser(dto: UserDTO): User {
  return {
    id: dto.id,  // mapping changed
    email: dto.email,
  }
}
```

```typescript
// entities/user/model/types.ts
// ✅ Domain model stable
export interface User {
  id: string
  email: string
}

// ✅ All imports work without changes:
pages/profile/   // imports User
pages/settings/  // imports User
features/menu/   // imports User
```

**Radius of change:**
- Approach A: ~15 files
- Approach B: 1 file (mapper)

#### Structure

```
shared/
  api/
    client.ts           # infrastructure ONLY
    types.ts            # common types ONLY

entities/
  user/
    api/
      user-api.ts       # API + mapping
    model/
      types.ts          # User (domain model)
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

#### Code Example

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

#### Usage in Pages

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
    <h1>Users</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.email }} ({{ user.role }})
      </li>
    </ul>
  </div>
</template>
```

#### Migration from Local Code

**Was:**
```
pages/user-profile/api/profile-api.ts
pages/user-profile/model/types.ts
```

**Became:**
```
entities/user/api/user-api.ts
entities/user/model/types.ts
```

**Import changes:**
```typescript
// Was
import { getUserProfile, type UserProfile } from '../api/profile-api'

// Became
import { getUserById, type User } from 'entities/user'
```

#### Evolution as Project Grows

**Step 1: API Only**
```
entities/user/
  api/user-api.ts
  model/types.ts
  index.ts
```

**Step 2: Simple Logic Appears**
```
entities/user/
  api/user-api.ts
  model/
    types.ts
    use-user.ts        # + computed properties
  index.ts
```

**Step 3: Aggregation**
```
entities/user/
  api/user-api.ts
  model/
    types.ts
    use-user.ts
    use-user-with-team.ts   # + aggregation
  index.ts
```

**Step 4: UI Components**
```
entities/user/
  api/user-api.ts
  model/
    types.ts
    use-user.ts
    use-user-with-team.ts
  ui/
    UserAvatar.vue          # + reusable UI
  index.ts
```

---

### Comparison Table of Approaches

| Criteria | Locality | Centralized API | Domain API |
|----------|----------|-----------------|------------|
| **When to use** | One place | 2-5 places | 3+ places or clear domain |
| **Startup speed** | ⚡⚡⚡ | ⚡⚡ | ⚡ |
| **Simplicity** | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| **Scalability** | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Architectural purity** | N/A | ⭐⭐ | ⭐⭐⭐ |
| **Protection from backend changes** | N/A | ⭐⭐ | ⭐⭐⭐ |
| **Code discoverability** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Entry barrier** | ✅ Low | ✅ Medium | ⚠️ Medium-high |
| **Suitable for MVP** | ✅ Yes | ✅ Yes | ⚠️ May be excessive |
| **Suitable for enterprise** | ❌ No | ⚠️ Will require refactoring | ✅ Yes |

---

### Recommendations for Choosing an Approach

#### Choose Approach 0 (Locality) if:

- 🆕 New functionality
- 🧪 Experimental feature
- 📍 Code used in one place only
- ❓ Unclear if there will be reuse

**Example:** Admin statistics page that's not needed anywhere else.

#### Choose Approach A (shared/api) if:

- 👶 Team just starting with FSD
- 🚀 Need to launch MVP quickly
- 📊 Small project (< 10 screens)
- 🔄 Business logic changes frequently
- 💡 Unclear which entities are settled

**Example:** Startup building a product prototype, business model may change.

#### Choose Approach B (entities/*/api/) if:

- 🏢 Mature team with experience
- 🏗️ Medium/large project
- 📋 Business domain is clear (has glossary)
- 🔒 Stability and isolation from backend is important
- 📚 Project will live long and grow

**Example:** Enterprise application with established business processes.

---

### Hybrid Approach (Pragmatic)

You can combine both approaches in one project:

```
shared/
  api/
    client.ts
    analytics.ts        # Not an entity — stays in shared

entities/
  user/                 # Settled — extracted
    api/
    model/
  
  product/              # Settled — extracted
    api/
    model/

pages/
  admin-dashboard/
    api/
      stats-api.ts      # Used only here — local
```

**Rule:** Settled entities → `entities/`, experimental → local or `shared/api`.

---

### ❌ When NOT to Create an Entity

Regardless of the chosen approach, DON'T create an Entity in the following cases:

#### 1. Used in One Place Only

```vue
<!-- ❌ Entity NOT NEEDED -->
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

**Keep locally in pages/.**

#### 2. Simple Utility Functions

```typescript
// ❌ Entity NOT NEEDED
// shared/lib/formatters.ts
export const formatUserName = (firstName: string, lastName: string) => 
  `${firstName} ${lastName}`

export const formatDate = (date: Date) => 
  new Intl.DateTimeFormat('en-US').format(date)
```

**These are utilities, not business logic.**

#### 3. Just Data Loading Without Logic

```vue
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getUsers } from 'shared/api'

// ❌ Entity with model/ NOT NEEDED
const { data: users, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers
})
</script>
```

**TanStack Query already manages state and caching. API function is enough.**

#### 4. Single Computed Property

```typescript
// ❌ Entity NOT NEEDED
// pages/profile/ui/ProfilePage.vue
const user = ref<User>(/* ... */)

const isAdmin = computed(() => user.value.role === 'admin')
```

**Keep one calculation locally.**

#### 5. UI-Specific Models

```typescript
// ❌ NOT an Entity
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

**This is UI logic, not business entities.**

---

### ✅ When to CREATE model/ in Entity

Regardless of where your API is (`shared/api` or `entities/*/api/`), create `entities/*/model/` when:

#### 1. Data Aggregation

**Sign from business glossary:**
```markdown
## User
- Relationships: belongs to Team
```

**Code:**
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
  
  // Aggregation of related entity
  const { data: team } = useQuery({
    queryKey: ['team', user.value?.teamId],
    queryFn: () => getTeamById(user.value!.teamId),
    enabled: computed(() => !!user.value?.teamId)
  })
  
  const enrichedUser = computed(() => {
    if (!user.value) return null
    
    return {
      ...user.value,
      team: team.value,  // enrichment
      isTeamLead: team.value?.leaderId === user.value.id
    }
  })
  
  return {
    user: enrichedUser,
    isLoading: computed(() => !user.value || !team.value)
  }
}
```

**Why Entity:** Combining user and team data, creating enriched model.

#### 2. Business Rules and Invariants

**Sign from business glossary:**
```markdown
## Order
- Statuses: pending → confirmed → shipped → delivered
- Rule: can be cancelled only in pending/confirmed status
- Rule: can be refunded within 14 days after delivered
```

**Code:**
```typescript
// ✅ entities/order/model/use-order-validation.ts
import { computed } from 'vue'
import type { Order } from './types'

export function useOrderValidation(order: Order) {
  // Business rule from glossary
  const canBeCancelled = computed(() => {
    const cancellableStatuses = ['pending', 'confirmed']
    return cancellableStatuses.includes(order.status)
  })
  
  const canBeRefunded = computed(() => {
    if (order.status !== 'delivered') return false
    
    // Business rule: 14 days
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

**Why Entity:** Complex business invariants defining allowed operations.

#### 3. Multiple Computed Properties with Business Rules

**Sign from business glossary:**
```markdown
## User
- Roles: admin, moderator, viewer
- Subscriptions: free, basic, premium
- Access rules depend on combination of role and subscription
```

**Code:**
```typescript
// ✅ entities/user/model/use-user-permissions.ts
import { computed } from 'vue'
import type { User } from './types'

export function useUserPermissions(user: User) {
  const isAdmin = computed(() => user.role === 'admin')
  
  const isModerator = computed(() => user.role === 'moderator')
  
  // Business rule from glossary
  const canAccessAdminPanel = computed(() => {
    return isAdmin.value || 
           (isModerator.value && user.yearsOfService > 2)
  })
  
  // Business rule: depends on subscription
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

**Why Entity:** Complex business logic with multiple interconnected rules, not just "one computed property".

#### 4. Collection Management with Business Logic

**Sign from business glossary:**
```markdown
## User
- Can be grouped by departments
- Statistics on active users is important for business
```

**Code:**
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
  
  // Aggregation: enrich users with team data
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
  
  // Business filtering logic
  const activeUsers = computed(() => 
    usersWithTeams.value.filter(user => user.status === 'active')
  )
  
  // Business grouping logic
  const usersByDepartment = computed(() => {
    const groups: Record<string, typeof usersWithTeams.value> = {}
    
    usersWithTeams.value.forEach(user => {
      const dept = user.team?.department || 'unassigned'
      if (!groups[dept]) groups[dept] = []
      groups[dept].push(user)
    })
    
    return groups
  })
  
  // Statistics
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

**Why Entity:** Data aggregation, business filtering and grouping logic, statistics calculation.

#### 5. Lifecycle and State Transitions

**Sign from business glossary:**
```markdown
## Subscription
- Statuses: trial → active → past_due → cancelled
- Rule: from trial can transition to active or cancelled
- Rule: from past_due can transition to active (payment) or cancelled
```

**Code:**
```typescript
// ✅ entities/subscription/model/use-subscription-lifecycle.ts
import { computed } from 'vue'
import type { Subscription } from './types'

export function useSubscriptionLifecycle(subscription: Subscription) {
  const canActivate = computed(() => {
    // Can activate from trial or past_due
    return ['trial', 'past_due'].includes(subscription.status)
  })
  
  const canCancel = computed(() => {
    // From any status except already cancelled
    return subscription.status !== 'cancelled'
  })
  
  const isInGracePeriod = computed(() => {
    if (subscription.status !== 'past_due') return false
    
    const daysPastDue = 
      (Date.now() - new Date(subscription.dueDate).getTime()) / (1000 * 60 * 60 * 24)
    
    return daysPastDue <= 7  // 7 days grace period
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

**Why Entity:** Managing lifecycle with business rules for state transitions.

---

### Synthesis: From Business Analysis to Code

#### Complete Example: User

**Step 1: Business Analysis**

```markdown
# Business Glossary

## User
- **Uniqueness:** email, id
- **Roles:** admin, manager, viewer
- **Subscriptions:** free, premium
- **Relationships:** belongs to Team, creates Orders
- **Rules:**
  - Admin can do everything
  - Manager can edit if > 2 years of experience
  - Premium user has higher upload limit
```

**Step 2: First Implementation (local)**

```
// Day 1: Registration page
pages/registration/
  api/
    registration-api.ts   # user creation
  model/
    types.ts              # local types
    validation.ts         # form validation
  ui/
    RegistrationForm.vue
```

**Step 3: Secondary Usage → Extract API**

```
// Day 7: User needed in pages/profile/

// Approach A: shared/api
shared/api/user.ts

// OR

// Approach B: entities/user/api/
entities/user/
  api/user-api.ts
  model/types.ts
  index.ts
```

**Step 4: Business Logic Appears → Create model/**

```
// Day 30: Need permissions, aggregation with Team

entities/user/
  api/
    user-api.ts
  model/
    types.ts
    use-user-permissions.ts    # business rules from glossary
    use-user-with-team.ts      # aggregation
  index.ts
```

**Step 5: Reusable UI → Add ui/**

```
// Day 60: UserAvatar needed in 5 places

entities/user/
  api/
    user-api.ts
  model/
    types.ts
    use-user-permissions.ts
    use-user-with-team.ts
  ui/
    UserAvatar.vue            # reusable component
    UserBadge.vue
  index.ts
```

---

### Communicating with Business

**Recommendations:**

1. **Create a business glossary** at project start
2. **Update it** when requirements change
3. **Synchronize with business** — use their terms
4. **But don't create code prematurely** — glossary ≠ folder structure

**Good process:**

```
1. New requirement from business
   ↓
2. Update business glossary
   (document new entity or rule)
   ↓
3. Start with local code (pages/)
   ↓
4. On reuse — extract API
   ↓
5. When logic appears — create model/
```

**Communication example:**

```
Business: "We need ability to cancel orders"

Developer:
1. Records in glossary:
   ## Order
   - Rule: can be cancelled in pending/confirmed status
   
2. Asks:
   - In which statuses can it be cancelled?
   - Are there time restrictions?
   - What happens with payment on cancellation?
   
3. Updates glossary with answers

4. Starts with pages/order-details/
   (doesn't create entities/order/ immediately)

5. When needed creates
   entities/order/model/use-order-cancellation.ts
```

**Anti-pattern:**

```
❌ Business: "Need order cancellation"
❌ Developer: Immediately creates entities/order/ with full structure
❌ Result: Excessive architecture, code used in one place
```

**Correct:**

```
✅ Business: "Need order cancellation"
✅ Developer: 
   1. Updates glossary
   2. Starts with pages/order-details/
   3. Extracts to entities/ on reuse
✅ Result: Minimal but sufficient architecture
```

---

### Golden Rule

```
1. Study business domain
   → Create business glossary (document)
   
2. Start with local code
   → pages/ or features/ (code)
   
3. On reuse
   → shared/api OR entities/*/api/ (team choice)
   
4. When logic appears
   → entities/*/model/ (aggregation or business rules)
   
5. Synchronize code with business
   → Update glossary on changes
```

**Key principles:**
- ✅ **Understand business** — create glossary
- ✅ **Start locally** — not technical debt
- ✅ **Extract pragmatically** — when really needed
- ✅ **Use business terms** — in module names
- ❌ **Don't create structure upfront** — glossary ≠ code
- ✅ **Communicate with business** — update domain understanding
- ✅ **Document decisions** — why created/didn't create Entity

---

### Practical Checklist

When working with any object, ask yourself these questions:

**1. Business Understanding**
- ❓ Is this a business term or technical term?
- ❓ Is it in the business glossary?
- ❓ How does business name this object?

**2. Current Usage**
- ❓ Used in one place? → Keep locally
- ❓ Used in 2+ places? → Go to step 3

**3. API Approach Choice**
- ❓ What's the team's approach? (A or B)
- ❓ Need protection from backend changes? → Approach B
- ❓ Development speed important? → Approach A

**4. model/ Necessity**
- ❓ Is there data aggregation? → Create model/
- ❓ Are there business rules/invariants? → Create model/
- ❓ Just types and CRUD? → api/ is enough

**5. Documentation**
- ❓ Updated business glossary?
- ❓ Documented architectural decision?