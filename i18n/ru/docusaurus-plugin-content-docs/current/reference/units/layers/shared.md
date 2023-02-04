---
sidebar_position: 8
---

# Shared

:::tip Когда использовать?
Когда на страницах появляется много абстрактной логики (UIKit / hooks / helpers), из-за чего они начинают разбухать и дублировать реализации

*Слой хорошо подходит для начала применения методологии 🚀*
:::

![shared-themed-bordered](/img/layers/shared.png)

## Описание {#description}

Здесь обычно находятся:

- общий **UIKit** приложения (если такой есть)
  - *Segment: `shared/ui`*
- общие **вспомогательные библиотеки**
  - *Segment: `shared/lib`*
- общий модуль по **работе с API**
  - *Segment: `shared/api`*
- модуль **конфигурации приложения** и его окружения
  - *Segment: `shared/config`*
  - *env-переменные, которые могут использоваться в коде вышележащих слоев*

## Структура {#structure}

```sh
└── shared/
      ├── api/
      ├── config/
      ├── lib/
      └── ui/
```

## Примеры {#examples}

### Использование UIKit {#using-uikit}

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

### Использование переменных окружения {#using-environment-variables}

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
