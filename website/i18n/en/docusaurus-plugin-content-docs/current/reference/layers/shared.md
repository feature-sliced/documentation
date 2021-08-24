---
sidebar_position: 8
---

# Shared

![shared-themed-bordered](/img/layers/shared.png)

## Описание

Здесь обычно находятся:

- общий **UIKit** приложения (если такой есть)
  - *[Segment][refs-segments]: `shared/ui`*
- общие **вспомогательные библиотеки**
  - *[Segment][refs-segments]: `shared/lib`*
- общий модуль по **работе с API**
  - *[Segment][refs-segments]: `shared/api`*
- модуль **конфигурации приложения** и его окружения
  - *[Segment][refs-segments]: `shared/config`*
  - *env-переменные, которые могут использоваться в коде вышележащих слоев*

## Структура

```sh
└── shared/
      ├── api/
      ├── config/
      ├── lib/
      └── ui/
```

## Примеры

### Использование UIKit

```tsx title=shared/ui/button/index.tsx
export const Button = () => {...}
```

```tsx title=shared/ui/card/index.tsx
export const Card = () => {...}
```

```tsx title=**/**/index.tsx
import { Button } from "shared/ui/button";
import { Card } from "shared/ui/card";
// Или в крайних случаях
// import { Button, Card } from "shared/ui";
```

### Использование переменных окружения

*Реализация зависит от проекта и команды, здесь приведен лишь один из вариантов*

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
