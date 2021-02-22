# Frequently Asked Questions
> Some of them discussed with kof [here](https://github.com/kof/feature-driven-architecture/issues/11) and [here](https://github.com/kof/feature-driven-architecture/issues/) 

## What is feature?
**`Feature`** - self-contained, user-facing, reusable, complex, with specific logic module.

> - *self-contained* - contains everything it needs
> - *user-facing* - we define feature based on user-facing functionality
> - *reusable* - can be used on different pages or screens
> - *complex* - more high-level abstraction than a component
> - *with specific logic* - module, that is responsible for specific part of app business logic

## What is based on?
See in readme or look at [notes from kof's (Oleg Isonen) Berlin React Talk](https://www.notion.so/Summary-Feature-Driven-Architecture-talk-b8609fd4452b41f499703c841e56b8e9)

> TL;DR:
> - **Goals**: `Discoverability`, `Work parallesisation`, `Control shared abstractions`, `Refactoring`, `AB Tests`, `Integration tests`
> - **Principles**: `Decentralization`, `Explicit sharing`, `Co-location`, `Isolation`, `Disposability`

## How to structure?
```sh
 └── src/                            # Source files
     ├── app/                        # Base resources of app (with init logic)
     ├── features/                   # Primary functional of app (splitted by features)
     ├── pages/                      # App's pages (builded by features and shared)
     ├── shared/                     # Common used modules
     ├── index.tsx                   # Entrypoint of App
     └── (models.ts)                 # (Optional) File for accessing to models
```

<details>
  <summary>/app/</summary>
  
  ```sh
  └── app/
    ├── store/                      # Init store
    ├── styles/                     # Init styles
    ├── hocs/                       # Init app (HOC-wrappers)
    ├── {...}                       #
    ├── index.scss                  # Add root styles
    └── index.tsx                   # Entrypoint of app
  ```
</details>

<details>
  <summary>/pages/</summary>
  
  ```sh
  └── pages/
    ├── {page}/                 # Page resources
    |    ├── index.tsx          #   Page UI (with features composition)
    |    ├── index.scss         #   Page styles
    |    └── (effects.ts) /     #   (Optional) Page side-effects 
    |        (middlewares.ts)   #   (for features reactivity)
    └── index.tsx               # Entrypoint with composed routing
  ```
</details>

<details>
  <summary>/features/</summary>
  
  ```sh
  └── features/
      └── feature-name/
              ├── components/            # UI components (`React`, `Canvas`)
              ├── {store/}               # (optional) Store of feature (redux)
              ├── {context/}             # (optional) Store of feature (context)
              ├── {**.gql}               # (optional) Feature request (graphql)
              ├── {**.gen.ts}            # (optional) Feature request (apollo hook generated)
              ├── {...}/                 # (optional) Potentially, you can locate here and other **required** modules (but without fanaticism)
              └── index.ts               # Feature's `entry-point` (with declared public feature's API)
  ```
</details>

<details>
  <summary>/shared/</summary>
  
  ```sh
  └── shared/
     ├── components/             #   **Common used** React components
     ├── helpers/                #   **Common used** Helpers
     ├── hocs/                   #   **Common used** React HOCs
     ├── hooks/                  #   **Common used** React Hooks
     ├── fixtures/               #   **Common used** data helpers / dataSets
     ├── get-env                 #   Module with **env**-vars
     ├── mixins.scss             #   **Common used** SCSS mixins
     └── consts.scss             #   **Common used** SCSS consts (not colors)
  ```
</details>
  
> See also:
> - **Real [example-react-graphql](https://github.com/ani-team/github-client) with [structure description](https://github.com/ani-team/github-client/wiki/Project-Structure)**
> - Here [approximate description](https://github.com/martis-git/learn-frontend/blob/master/about/react_structure.md) (but little bit old)



## Features cross-communication
- features dependenicies
- features reactivity and behavior organizin on page
   - hooks / middlewares
- cluster approach

## FDD vs DDD
Look at discussion with [kof](https://github.com/kof/feature-driven-architecture/issues/13)

> TL;DR: FDD is more specific than DDD, and more for frontend

> See also [my own comparing with DDD (RU)](https://www.notion.so/Frontend-Architecture-2aee8b123a2540958526419267cf7b32)

## Too much complexity of approach
> TODO: Will be filled soon

## How to integrate in project and convince teammates?
> TODO: Will be filled soon

## One-used features
> TODO: Will be filled soon

## Dependent from other feature store
> TODO: Will be filled soon

## Nested features
> TODO: Will be filled soon

## User/Details, User/List or UserDetails, UserList?
> Another words - how to split by feature bound and sense?
> TODO: Will be filled soon

## Could it save my projects?
> TODO: Will be filles soon
> TL;DR: No, its'not silver bullet. But it can help you if your app need some such

## Interpretations
- [kof (our base)](https://github.com/kof/feature-driven-architecture)
- [feature-u](https://feature-u.js.org/)
- [feature-slices + Atomic Design](https://featureslices.dev/)
  > UPD: at January 2021
- [DDD as ancestor](https://medium.com/ssense-tech/domain-driven-design-everything-you-always-wanted-to-know-about-it-but-were-afraid-to-ask-a85e7b74497a)

## Future of approach
- [CLI](https://github.com/feature-driven/cli)
   - generators (features, pages, shared)
   - app initialization with correct structure
- Static analyze ([linting](https://github.com/kof/feature-driven-architecture/issues/12))
   - [eslint-plugin](https://github.com/feature-driven/eslint-plugin)
   - [eslint-config](https://github.com/feature-driven/eslint-config)
- [CRA template](https://github.com/feature-driven/cra-template)
- [Real examples for differend stacks](https://github.com/ani-team/github-client)
   >  `{React, Vue, ...} + {Redux, Effector, Storeon, Graphql, ...}`
