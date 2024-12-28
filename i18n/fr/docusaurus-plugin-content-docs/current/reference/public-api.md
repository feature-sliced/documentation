---
sidebar_position: 3
pagination_next: about/index
---

# Public API

Each entity of the methodology is designed as a **user-friendly and integrable module.**

## Goals

The convenience of using and integrating the module is achieved through the fulfillment of *a number of goals*:

1. The application must be **protected from changes** to the internal structure of individual modules
1. The processing of the internal structure of the module **should not affect** other modules
1. Significant changes in the behavior of the module should be **easily detectable**
    > **Significant changes in the behavior of the module** - changes that break the expectations of the user entities of the module.

These goals can be achieved by introducing a public interface (Public API), which is a single access point to the module's capabilities and defines the "contract" of the module's interaction with the outside world.

:::info Important

The entity structure must have a single entry point that provides a public interface

:::

```sh
└── features/               # 
       ├── auth-form /      # Internal structure of the feature
       |     ├── ui/        #
       |     ├── model/     #
       |     ├── {...}/     #
       ├── index.ts         # Entrypoint features with its public API
```

```ts title="**/**/index.ts"
export { Form as AuthForm } from "./ui"
export * as authFormModel from "./model"
```

## Requirements for the public API

Meeting these requirements allows you to reduce interaction with the module to **the implementation of a public interface-contract** and, thereby, achieve reliability and ease of use of the module.

### 1. Access Control

The public API must **control access** to the contents of the module

- Other parts of the application can use **only those module entities that are presented in the public interface**
- The internal part of the module outside the public interface **is accessible only to the module itself**.

#### Examples

##### Suspension from private imports

- **Bad**: There is a direct access to the internal parts of the module, bypassing the public access interface - it is dangerous, especially when refactoring the module

    ```diff
    - import { Form } from "features/auth-form/components/view/form"
    ```

- **Good:** The API exports only what is necessary and allowed in advance, the module developer now needs to think only about not breaking the Public API when refactoring

    ```diff
    + import { AuthForm } from "features/auth-form"
    ```

### 2. Sustainability for changes

The public API should be sustainable for changes inside the module

- Breaking changes in the behavior of the module are reflected in the change of the Public API

#### Examples

##### Abstracting from the implementation

Changing the internal structure should not lead to a change in the Public API

- **Bad:** moving or renaming this component inside the feature will lead to the need to refactor imports in all places where the component is used.

    ```diff
    - import { Form } from "features/auth-form/ui/form"
    ```

- **Good:** the interface of the feature does not display its internal structure, external "users" of the feature will not suffer from moving or renaming the component inside the feature

    ```diff
    + import { AuthForm } from "features/auth-form"
    ```

### 3. Integrability

The public API should facilitate **easy and flexible integration**

- Should be convenient for use by the rest of the application, in particular, to solve the problem of name collisions

#### Examples

##### Name collision

- **Bad:** there will be a name collision

    ```ts title="features/auth-form/index.ts"
    export { Form } from "./ui"
    export * as model from "./model"
    ```

    ```ts title="features/post-form/index.ts"
    export { Form } from "./ui"
    export * as model from "./model"
    ```

    ```diff
    - import { Form, model } from "features/auth-form"
    - import { Form, model } from "features/post-form"
    ```

- **Good:** the collision is solved at the interface level

    ```ts title="features/auth-form/index.ts"
    export { Form as AuthForm } from "./ui"
    export * as authFormModel from "./model"
    ```

    ```ts title="features/post-form/index.ts"
    export { Form as PostForm } from "./ui"
    export * as postFormModel from "./model"
    ```

    ```diff
    + import { AuthForm, authFormModel } from "features/auth-form"
    + import { PostForm, postFormModel } from "features/post-form"
    ```

##### Flexible use

- **Bad:** it is inconvenient to write, it is inconvenient to read, the" user " of the feature suffers

    ```diff
    - import { storeActionUpdateUserDetails } from "features/auth-form"
    - dispatch(storeActionUpdateUserDetails(...))
    ```

- **Good:** the "user" of the feature gets access to the necessary things iteratively and flexibly

    ```diff
    + import { authFormModel } from "features/auth-form"
    + dispatch(authFormModel.effects.updateUserDetails(...)) // redux
    + authFormModel.updateUserDetailsFx(...) // effector
    ```

##### Resolution of collisions

Name collisions should be resolved at the level of the public interface, not the implementation

- **Bad:** name collisions are resolved at the implementation level

    ```ts title="features/auth-form/index.ts"
    export { AuthForm } from "./ui"
    export { authFormActions, authFormReducer } from "model"
    ```

    ```ts title="features/post-form/index.ts"
    export { PostForm } from "./ui"
    export { postFormActions, postFormReducer } from "model"
    ```

- **Good:** name collisions are resolved at the interface level

    ```ts title="features/auth-form/model.ts"
    export { actions, reducer }
    ```

    ```ts title="features/auth-form/index.ts"
    export { Form as AuthForm } from "./ui"
    export * as authFormModel from "./model"
    ```

     ```ts title="features/post-form/model.ts"
    export { actions, reducer }
    ```

    ```ts title="features/post-form/index.ts"
    export { Form as PostForm } from "./ui"
    export * as postFormModel from "./model"
    ```

## About re-exports

In JavaScript, the public interface of a module is created by re-exporting entities from inside the module in an `index` file:

```ts title="**/**/index.ts"
export { Form as AuthForm } from "./ui"
export * as authModel from "./model"
```

### Disadvantages

- In most popular bundlers, due to re-exports, **the code-splitting works worse**, because [tree-shaking](https://webpack.js.org/guides/tree-shaking/) with this approach, it is safe to discard only the entire module, but not part of it.
   > For example, importing `authModel` into the page model will cause the `AuthForm` component to get into the chunk of this page, even if this component is not used there.

- As a result, initialization of the chunk becomes more expensive, because the browser must process all the modules in it, including those that got into the bundle "for the company"

### Possible solutions

- `webpack` allows you to mark re-export files as [**side effects free**](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) - this allows `webpack` to use more aggressive optimizations when working with such a file

## See also

- [(Discussion) Public Abstraction API][disc-src]
- [Principles **SOLID**][ext-solid]
- [Patterns **GRASP**][ext-grasp]

[disc-src]: https://github.com/feature-sliced/documentation/discussions/41
[ext-solid]: https://ru.wikipedia.org/wiki/SOLID
[ext-grasp]: https://ru.wikipedia.org/wiki/GRASP
