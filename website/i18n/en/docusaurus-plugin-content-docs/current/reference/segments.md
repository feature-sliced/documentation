---
sidebar_position: 3
---

# Segment

**Segment** - the third level of application partitioning, according to the **purpose of the module in the code and implementation**

```sh
{layer}/
    ├── {slice}/
    |   ├── ui/                     # UI-logic (components, ui-widgets, ...)
    |   ├── model/                  # Business logic (store, actions, effects, reducers, ...)
    |   ├── lib/                    # Infrastructure logic (utils/helpers)
    |   ├── config/                 # Application configuration (env-vars, ...)
    |   └── api/                    # Logic of API requests (api instances, requests, ...)
```

## General rules

Each of the above segments represents the levels of abstractions that are familiar to us when developing software.

Each of the segments is responsible for its own scope, but all together - **they form a single image of this slice and its logic**, specifically:

- its visual display (ui)
- its business logic (model)
- its auxiliary modules (lib)

Also, in rare cases, affecting:

- its configuration (config)
- its logic for working with API requests (api)

:::tip

**Each segment can be either a file or a directory** - it depends on the complexity of the slice being implemented

That is, such options are also quite acceptable:

```sh
features/wallet/add-funds
    ├── ui.tsx
    ├── model.ts
    └── index.ts
```

```sh
pages/home/
    ├── index.tsx
    └── style.module.scss
```

:::

## `ui`

**UI representation of the module**

It can contain inside:

- Components of your UI framework (React, Vue, Angular, ...)
- Canvas-Widgets
- *(any other ui view modules)*

### Examples

#### Complex UI for the layer

```sh
{layer}/{slice}/
    ├── ui/
    |   ├── toolbar/
    |   |     ├── title/
    |   |     └── actions/
    |   ├── content/
    |   |     ├── sort/
    |   |     └── table/
    |   └── index.tsx/
```

```tsx title={layer}/{slice}/ui/index.tsx
import Toolbar from "./toolbar";
import Content from "./content";
import styles from "./styles.module.scss";

export const SomeForm = () => (
    <Layout className={styles.root}>
      <Toolbar className={styles.toolbar} />  
      <Content className={styles.content} />
    </Layout>
)
```

## `model`

**Business logic of the module**

May contain:

- The logic of creating and updating a mini-store for this slice
  - *In the effector world: `createStore` + `createDomain`*
  - *In the redux world: `createSlice`*
- A list of events processed by the parent slice model and updating its state
  - *In the effector world: `events`*
  - *In the redux world: `actions` + `dispatch`*
- List of asynchronous side effects, for loading data and other asynchronous operations
  - *In the effector world: `effects`*
  - *In the redux world: `thunks` / `sagas` / `epics`*
- List of selectors/contracts/hooks for using the slice state
  - *In the effector world: `useStore`, ...*
  - *In the redux world: `useSelector`, `selectors`*

## `lib`

**Auxiliary libraries**

It usually contains a set of utilities that help writing logic and are distributed in groups, i.e. separate libraries.

## `api`

**Logic of interaction with the API**

Usually contains

- instances for working with different external APIs
- methods / factories for calling specific endpoints

*In rare cases (react-query / graphql), the queries themselves may lie near the place of use*

- *But most often [recommended][disc-api] place the API segment in the 'shared' layer to reduce the number of logic entanglements*

At the same time, this segment can be written manually or generated using the API scheme

- *For example, using `openapi-generator`, `swagger-codegen`*

### Examples

```ts title=**/**/api/user.ts
export class UserApi {
    constructor(config) {...}
    getList(params: GetListParams): Promise<User[]> {...}
    ...
}
```

```ts title=**/**/model/thunks.ts
import { userApi } from "shared/api"

// API instances can be created
// both at the place of use and in the API segment itself
//
// const userApi = new UserApi();

export const getUserListThunk = createAsyncThunk("...", (params) => {
    return userApi.getList(params);
});
```

## `config`

**Application configuration module and its environment**

It usually contains the application configuration and methods for working with it

### Examples

#### Using environment variables

*The implementation depends on the project and the team, here is just one of the options*

```ts title=shared/config/index.ts
export const isDevEnv = NODE_ENV === "development";
export const OAUTH_TOKEN = getEnvVar("REACT_APP_OAUTH_TOKEN");
```

```tsx title=**/**/index.tsx
import { OAUTH_TOKEN, isDevEnv } from "shared/config";

export const OAuthProvider = () => (
    <OAuth
        debug={isDevEnv}
        token={OAUTH_TOKEN}
        ...
    />
)
```

## See also

> `WIP:` Over time, articles on each abstraction will appear

- [Naming adaptability][refs-naming-adaptability]
- [(Discussion) Where the API should be located][disc-api]

[refs-naming-adaptability]: /docs/concepts/naming-adaptability

[disc-api]: https://github.com/feature-sliced/documentation/discussions/66
