# Viewer

> Работа с авторизованным пользователем согласно методологии

---

Во всех приложениях так или иначе есть бизнес-логика, завязанная на текущем залогиненном пользователе.

> Обычно такая сущность называется `Viewer` / `Principle` / `Session` - но в рамках статьи, остановимся именно на `viewer`, но все зависит от вашего проекта

При этом это один из показательных примеров, когда бизнес-сущность порождает за собой определенные бизнес-фичи, затем страницы, и даже бизнес-процессы

Рассмотрим их подробнее ниже с примерами

> **Примечание:** Названия директория внутри сегментов (ui, model) могут отличаться от проекта к проекту
> 
> *Методология пока не распространяет правила на этот уровень вложенности*

## Entities

**Бизнес-сущность пользователя**
- Представляет собой наиболее атомарную абстракцию для проектирования
- Здесь образуется контекст авторизации, на который потом обычно полагается все вышележащие слои приложения

```sh
├── entities/viewer              # Layer: Бизнес-сущности
|         |                      #     Slice: Текущий пользователь
|         ├── ui/                #         Segment: UI-логика (компоненты)
|         ├── lib/               #         Segment: Инфраструктурная-логика (хелперы)
|         └── model/             #         Segment: Бизнес-логика
|   ...           
```

> Стоит понимать, что нередко в приложении есть публичный "внешний" пользователь (т.е. `user`), а есть авторизованный "внутренний" пользователь (т.е. `viewer`)
>
> *Не забывайте учитывать эту разницу при проектировании архитектуры и логики*

### Примеры
- `entities/viewer` - сущность текущего пользователя *(Session / Principle)*
- `entities/user` - сущность публичного пользователя *(не обязательно связанное с текущим)*

### `index.ts`

Обычный Public API модуля

```ts
// ui.ts
export { ViewerCard } from "./card";
export { ViewerThumb } from "./thumb";
...
```

```ts
// model.ts
export * from "./hooks";
export * as events from "./events";
export * as stores from "./stores";
```

```ts
// index.ts
export * from "./ui"
export * as viewerModel from "./model";
```
### `ui`

Здесь могут содержаться компоненты, относящиеся не к конкретной странице/фиче, а напрямую к сущности пользователя

> Например, у вас здесь может быть описан компонент `<UserCard/>`, который использует под собой `<Card/>` из *shared/ui*

### `model`

На этом уровне обычно инициализируется сущность текущего пользователя, с реэкспортом хуков/контрактов/селектора для доступа вышележащим слоям

```ts
// effector
export const $user = createStore(...);
// redux (+ toolkit)
export const userSlice = createSlice(...)
```

```ts
// effector
export const useViewer = () => {
    return useStore($user)
}
// redux (+ toolkit)
export const useViewer = () => {
    return useSelector((store) => store.entities.userSlice);
}
```

Также тут может быть реализована и прочая логика
- `updateUserDetails` 
- `logoutUser` 
- ...

## Features

**Фичи, завязанные на текущем пользователе**
- Использует в реализации бизнес-сущности (зачастую - `entities/viewer`) и shared ресурсы
- Фичи могут не быть напрямую связаны с вьювером, но при этом могут использовать его контекст при реализации логики

```sh
├── features/auth                # Layer: Бизнес-фичи
|        |                       #    Slice Group: Структурная группа "Авторизация пользователя"
|        ├── by-phone            #        Slice: Фича "Авторизация по телефону"
|        |     ├── ui/           #            Segment: UI-логика (компоненты)
|        |     ├── lib/          #            Segment: Инфраструктурная-логика (хелперы)
|        |     └── model/        #            Segment: Бизнес-логика
|        |
|        ├── by-oauth            #        Slice: Фича "Авторизация по внешнему ресурсу"
|   ...           
```

### Примеры
- `features/auth/{by-phone, by-oauth, logout ...}` - **структурная** группа фич авторизации *(по телефону, по внешнему ресурсу, выход из системы, ...)*
- `features/wallet/{add-funds, ...}` - **структурная** группа фич по работе со внутренним счетом пользователя *(пополнение счета, ...)*
### `ui`

- Авторизация по внешнему ресурсу
```tsx
import { viewerModel } from "entities/viewer";

export const AuthByOAuth = () => {
    return (
        <OAuth
            domain={...}
            scope={...}
            ...
            // для redux - дополнительно нужен dispatch
            onSuccess=((user) => viewerModel.setUser(user))
        />
    )
}
```

- Использование контекста пользователя в фичах
```tsx
import { viewerModel } from "entities/viewer";

export const Wallet = () => {
    const viewer = viewerModel.useViewer();
    const { moneyCount } = wallet;
    
    ...
}
```

- Использование компонентов вьювера
```tsx
import { ViewerThumb } from "entities/viewer";
...
export const Header = () => {
    ...
    return (
        <Layout.Header>
            ...
            <ViewerThumb
                onClick={...}
                onLogout={...}
                ...
            />
        </Layout.Header>
    )
}
```

## Pages

**Страницы, так или иначе связанные с текущим пользователем**
- Могут как напрямую затрагивать функциональность вьювера
- Так и использовать его косвенно (в том числе - и его контекст / фичи)

### Примеры
- `pages/viewer/profile` - страница ЛК пользователя
- `pages/viewer/settings` - страница настроек аккаунта пользователя
- `pages/user` - страница пользователя (не обязательно текущего)
- `pages/auth/{sign-in, sign-up, reset}` - **структурная** группа страниц авторизации *(вход в систему / регистрация / восстановление пароля)*

### `ui`

- Использование компонентов вьювера и вьювер-фич на страницах
```tsx
import { Wallet } from "features/wallet";
import { ViewerCard } from "entities/viewer";
...
export const UserPage = () => {
    ...
    return (
        <Layout>
            <Header
                extra={<Wallet.AddFunds />}
            />
            ...
            <ViewerCard />
        </Layout>
    )
}
```

- Использование контекста вьювера
```tsx
import { viewerModel } from "entities/viewer";
...
export const SomePage = () => {
    ...
    return (
        <Layout>
            ...
            <Settings onSave={(payload) => viewerModel.events.saveChanges(payload)} />
        </Layout>
    )
}
```

## Processes

**Бизнес-процессы, затрагивающие текущего пользователя**
- Затрагивает юзкейсы, пронизывающие страницы системы
- В силу специфики слоя, используется не всегда - лишь только когда логика размывается в страницах и нужно отдельное управление логикой на сразу нескольких страницах

### Примеры
- `processes/auth` - бизнес-процесс авторизации пользователя
- `processes/quick-tour` - бизнес-процесс для ознакомления пользователя с системой *(~ UserOnboard)*

## См. также
- [Дискуссия "Применимость feature-sliced в бою"](https://github.com/feature-sliced/wiki/discussions/65) (*внутри также есть примеры с viewer*)