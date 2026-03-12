---
title: When to Create an Entity
sidebar_position: 4
---

# When to Create an Entity

An important principle for effective use of the Entities layer: **not everything should be an entity**. Don't create entities "just in case."

This section will help you decide where to place code related to business entities, considering the context of your project and team.

---

## Philosophy of the Approach

FSD follows the **"Local First"** principle — start with local code in `pages/`, and extract to common layers only when there's **real necessity**.

Understanding the business domain helps make more informed architectural decisions. However, understanding the domain **does not mean** immediately creating code structure.

When code starts being reused, there are **three valid approaches** to organizing it:

**Approach 0: Locality** (always recommended as a starting point)
- Code stays in `pages/`
- Used in only one place

**Approach A: Centralized API** (`shared/api`)
- API and types in one place
- Migration to `entities/` when complexity grows

**Approach B: Domain API** (`entities/*/api/`)
- API tied to business entity
- Full encapsulation from day one

All three approaches align with **FSD philosophy**: avoid premature decomposition and add layers as needed.

---

## Signs of a Business Entity

Before deciding where to place code, it helps to recognize whether an object is a business entity.

**1. Unique Identity**

An object can be distinguished from other instances of the same type by a unique attribute:

```typescript
// Business uniqueness
Order { orderNumber: "ORD-2024-001" }
Product { sku: "LAPTOP-XPS-15" }

// Technical uniqueness
User { id: "uuid-123" }
Payment { id: 456 }
```

Having a unique identifier **does not mean** automatic Entity creation. It's just a sign that an object might become one.

**2. Business Term**

The object is a term the business uses to describe the product:

```typescript
// Business terms (potential entities)
User, Customer, Order, Product, Invoice, Payment, Subscription

// Technical terms (NOT entities)
Form, Modal, Layout, Component, State, Config
```

**3. Stateful Behavior**

The object has distinct states it can transition between:

```typescript
Order {
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
}

Subscription {
  status: 'trial' | 'active' | 'past_due' | 'cancelled' | 'expired'
}
```

**4. Relationships with Other Objects**

```
Order -> belongs to -> User
Order -> contains -> Products
User -> has -> Subscription
```

### Business Glossary (Recommended)

Create a document (not code!) describing your application's business domain:

```markdown
# Project Business Glossary

## Order
- **Uniqueness:** order number (orderNumber)
- **States:** pending -> confirmed -> shipped -> delivered
- **Relationships:** belongs to User, contains Products
- **Rules:** can be cancelled only in pending/confirmed state

## Product
- **Uniqueness:** SKU
- **Relationships:** belongs to Category, included in Orders
```

The glossary is maintained by the business side. Developers update the entities layer to reflect what the glossary describes — not the other way around.

**Purpose of the glossary:**
- Document domain understanding
- Synchronize understanding within the team
- Help make decisions about module naming
- It does NOT dictate code structure

---

## Approach 0: Locality (Local First)

### Main Principle

> **Always start with local code. Extract to common layers only when reused.**

This is **not a temporary solution** and **not technical debt**. This is the correct architecture for code used in one place — even if that code relates to a business entity like `User` or `Order`.

### Structure

```
pages/
  user-profile/
    api/
      index.ts
      profile.ts        # API requests + DTO mapping
    ui/
      index.ts
      ProfilePage.tsx
      ProfileForm.tsx
```

Avoid generic filenames like `types.ts` — they tend to become umbrella files that mix validation schemas, entity types, and other concerns. Name files after what they actually contain.

### Example: Business Entity Kept Local

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

Note that `UserProfile` is constructed from a single endpoint. If other endpoints return a different shape of user data, each should have its own local type — don't create a shared abstraction prematurely.

```tsx title="pages/user-profile/ui/ProfilePage.tsx"
import { useState, useEffect } from 'react'
import { getUserProfile, type UserProfile } from '../api'

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    getUserProfile('123').then(setProfile)
  }, [])

  const displayName = profile?.name || 'Anonymous'
  const isNewUser = (profile?.joinedDaysAgo ?? Infinity) < 7

  return (
    <div>
      <h1>{displayName}</h1>
      {isNewUser && <span className="badge">Newbie</span>}
      <p>{profile?.bio}</p>
    </div>
  )
}
```

**Why keep it local, even though User is a business entity?**

- Used only here so far
- No shared business logic — just display
- Unknown what other fields will be needed elsewhere
- YAGNI — don't create structure "for the future"

### Triggers for Moving to Approach A or B

**1. Used in a second place (main trigger)**

```
pages/user-profile/api/profile.ts     // getUserProfile()
pages/settings/api/profile.ts         // getUserProfile() — duplicate!
```

**2. Other developers start copying your code**

If colleagues are copying your code — that's a signal to extract a shared module.

**3. Business refers to it as a central concept**

If the business starts treating an object as a core concept across multiple features — time to create an Entity.

---

## Approach A: Centralized API (`shared/api`)

In this approach, API functions and domain types live in `shared/api/`, grouped by entity. This is a good fit when entities are in active flux or the project is small.

For a detailed guide with code examples, see [API Requests](https://fsd.how/docs/guides/examples/api-requests).

### When to Use

- Teams starting to work with FSD
- Small projects (fewer than ~10 screens)
- Projects with frequently changing business logic
- When it's unclear which entities have stabilized

### Structure

```
shared/
  api/
    client.ts       # HTTP client setup
    contracts.ts    # ApiResponse, PaginationParams
    user.ts         # API for User + DTO mapping
    order.ts        # API for Order + DTO mapping
    index.ts        # re-exports
```

The key difference from Approach B: domain types (`User`, `Order`) live in `shared/api/` alongside the API functions, rather than in `entities/*/model/`.

### Triggers for Migrating to `entities/`

**Business logic starts accumulating**

```typescript
// shared/api/user.ts is growing beyond pure API:
export function isAdmin(user: User): boolean { ... }
export function canEditPost(user: User, post: Post): boolean { ... }
export function getUserPermissions(user: User): string[] { ... }

// Time for entities/user/model/
```

**Aggregation across entities is needed**

```typescript
// Fetching a user and enriching with related data
// belongs in entities/user/model/, not shared/api/
export async function getUserWithOrders(userId: string) {
  const user = await getUserById(userId)
  const orders = await getOrdersByUserId(userId)
  return { ...user, orders }
}
```

**The same logic is duplicated in many places**

```typescript
// 10+ files all doing:
const isAdmin = user.role === 'admin'
// Time to centralize in entities/user/model/
```

---

## Approach B: Domain API (`entities/*/api/`)

In this approach, each entity lives fully inside its own slice — including the API, DTO mapping, domain types, and business logic.

### When to Use

- Medium and large projects
- Teams experienced with FSD
- Projects where backend API stability matters
- Long-lived enterprise applications

### Why the Mapping Layer Matters

When the backend changes its contract, the impact is localized:

```
// Backend changed: { user_id: number } -> { id: string }

// Approach A: ~15 files need updates
// Approach B: 1 file (the mapper in entities/user/api/)
```

### Structure

```
shared/
  api/
    index.ts
    client.ts           # HTTP client only
    contracts.ts        # infrastructure types only

entities/
  user/
    api/
      index.ts
      user-api.ts       # API functions + DTO mapping
    model/
      index.ts
      user.ts           # User domain type
      permissions.ts    # business rules
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

Domain types (`User`, `Order`) belong in `model/`, named after the entity — `user.ts`, `order.ts`. Not in the `api/` segment.

### Code Example

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

### Evolution as the Project Grows

Entities grow incrementally — don't build the full structure upfront.

**Step 1: API + types only**
```
entities/user/
  api/user-api.ts
  model/user.ts
  index.ts
```

**Step 2: Business logic appears**
```
entities/user/
  api/user-api.ts
  model/
    user.ts
    permissions.ts     # added
  index.ts
```

**Step 3: Reusable UI needed**
```
entities/user/
  api/user-api.ts
  model/
    user.ts
    permissions.ts
  ui/
    UserAvatar.tsx     # added
  index.ts
```

**Step 4: Entity becomes complex — split by responsibility**

For large or long-lived entities, consider splitting within the slice:

```
entities/user/
  api/
    queries/           # read operations
    mutations/         # write operations
  model/
    user.ts
    permissions/
    profile/
  ui/
    UserAvatar.tsx
  index.ts
```

Or, if contexts diverge significantly, split into separate slices:

```
entities/
  user-profile/
  user-permissions/
```

---

## Comparison Table

| Criteria | Locality | Centralized API | Domain API |
|----------|----------|-----------------|------------|
| When to use | One place | 2–5 places | 3+ places or clear domain |
| Startup speed | Fast | Medium | Slower |
| Scalability | Low | Medium | High |
| Protection from backend changes | None | Medium | High |
| Entry barrier | Low | Medium | Medium–high |
| Suitable for MVP | Yes | Yes | May be excessive |
| Suitable for enterprise | No | Requires refactoring | Yes |

---

## When NOT to Create an Entity

### Used in One Place Only

```typescript title="pages/admin-dashboard/ui/DashboardPage.tsx"
// Keep this local — no need for entities/dashboard-stats/
interface DashboardStats {
  todayRevenue: number
  activeUsers: number
  conversionRate: number
}
```

### Utility Functions

```typescript title="shared/lib/formatters.ts"
// These are utilities, not business logic
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US').format(date)
```

### Pure Data Loading Without Logic

```typescript
// A query library already handles state and caching.
// An API function is sufficient — no entity model needed.
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
})
```

### A Single Computed Value

```typescript
// pages/profile/ui/ProfilePage.tsx
// One derivation doesn't justify creating entities/user/model/
const isAdmin = user.role === 'admin'
```

### UI-Specific Models

```typescript
// These are UI concerns, not business entities
interface FormState {
  email: string
  password: string
  rememberMe: boolean
}
```

---

## When to CREATE `model/` in an Entity

Create `entities/*/model/` — regardless of whether the API lives in `shared/api` or `entities/*/api/` — when any of the following appear:

### 1. Data Aggregation

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

### 2. Business Rules and Invariants

```typescript title="entities/order/model/validation.ts"
import type { Order } from './order.ts'

// Business rule from glossary:
// Orders can be cancelled only in pending or confirmed state
export function canBeCancelled(order: Order): boolean {
  return order.status === 'pending' || order.status === 'confirmed'
}

// Business rule: refunds allowed within 14 days of delivery
export function canBeRefunded(order: Order): boolean {
  if (order.status !== 'delivered' || !order.deliveredAt) return false
  const daysSinceDelivery =
    (Date.now() - order.deliveredAt.getTime()) / (1000 * 60 * 60 * 24)
  return daysSinceDelivery <= 14
}
```

### 3. Multiple Interconnected Business Rules

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

Notice this is pure TypeScript — no framework reactivity. This makes the logic portable and easy to test across any framework.

### 4. State Transition Rules

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

## Golden Rule

```
1. Study the business domain
   -> Create a business glossary (a document, not code)

2. Start with local code
   -> pages/ or features/

3. On reuse
   -> shared/api OR entities/*/api/ (team's choice)

4. When business logic appears
   -> entities/*/model/ (aggregation or business rules)
```

Key principles:
- Understand the business domain — maintain a glossary
- Start locally — it's not technical debt
- Extract pragmatically — when there's real necessity
- Use business terms in module names
- Don't create structure upfront — glossary != folder structure
- Keep business logic in pure functions — easier to test and reuse across frameworks

---

## Practical Checklist

**1. Is this a business term or a technical term?**

If it's a technical term (Form, Modal, Config) — not an entity.

**2. Is it used in one place?**

Keep it local. If used in 2+ places, proceed to step 3.

**3. Which API approach fits your project?**

- Need backend isolation? -> Approach B
- Fast iteration more important? -> Approach A

**4. Do you need `model/`?**

- Data aggregation? -> Yes
- Business rules or state transitions? -> Yes
- Just types and CRUD? -> `api/` is sufficient

**5. Did you document the decision?**

- Updated business glossary?
- Noted why you created (or didn't create) the entity?