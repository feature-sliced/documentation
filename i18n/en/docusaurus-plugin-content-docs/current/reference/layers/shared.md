---
sidebar_position: 8
---

# Shared

:::tip When to use?
If pages are huge because of increased abstract logic (UIKit/hooks/helpers) with duplicate implementations

*The layer is good to start using the methodology 🚀*
:::

![shared-themed-bordered](/img/layers/shared.png)

## Description

There are usually placed:

- shared **UIKit** of the application (if there is one)
  - *[Segment][refs-segments]: `shared/ui`*
- shared **auxiliary libraries**
  - *[Segment][refs-segments]: `shared/lib`*
- general module for **working with the API**
  - *[Segment][refs-segments]: `shared/api`*
- module **configuration of the application** and its environment
  - *[Segment][refs-segments]: `shared/config`*
  - *env-variables that can be used in the code of the overlying layers*

## Structure

```sh
└── shared/
      ├── api/
      ├── config/
      ├── lib/
      └── ui/
```

## Examples

### Using UIKit

```tsx title=shared/ui/button/index.tsx
export const Button = () => {...}
```

```tsx title=shared/ui/card/index.tsx
export const Card = () => {...}
```

```tsx title=**/**/index.tsx
import { Button } from "shared/ui/button";
import { Card } from "shared/ui/card";
// Or in extreme cases
// import { Button, Card } from "shared/ui";
```

### Using environment variables

*The implementation depends on the project and the team, here is just one of the options*

```ts title=shared/config/index.ts
export const isDevEnv = NODE_ENV === "development";
export const OAUTH_TOKEN = getEnvVar("REACT_APP_OAUTH_TOKEN");
```

```ts title=**/**/index.tsx
import { OAUTH_TOKEN, isDevEnv } from "shared/config";

export const OAuthProvider = () => (
    <OAuth
        debug={isDevEnv}
        token={OAUTH_TOKEN}
        ...
    />
)
```

[refs-segments]: /docs/reference/segments
