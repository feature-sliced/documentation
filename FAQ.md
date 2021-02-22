# Frequently Asked Questions
> Some of them discussed with kof [here](https://github.com/kof/feature-driven-architecture/issues/11) and [here](https://github.com/kof/feature-driven-architecture/issues/) 

## What is feature?

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
