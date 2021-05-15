[refs-naming-adaptability]: /docs/concepts/naming-adaptability.md
[refs-example-viewer]: /docs/guides/examples/viewer.md

[refs-segments]: ../segments/readme.md
[refs-segments--ui]: ../segments/readme.md#ui
[refs-segments--model]: ../segments/readme.md#model
[refs-segments--lib]: ../segments/readme.md#lib
[refs-segments--api]: ../segments/readme.md#api
[refs-segments--config]: ../segments/readme.md#config

[disc-sharing]: https://github.com/feature-sliced/wiki/discussions/14

# Layers

`Layers` - первый уровень разбиения приложения, согласно **скоупу влияния** модуля

```sh
└── src/
    ├── app/                    # Инициализирующая логика приложения
    ├── processes/              # (Опц.) Процессы приложения, протекающие над страницами
    ├── pages/                  # Страницы приложения
    ├── features/               # Ключевая функциональность приложения
    ├── entities/               # Бизнес-сущности
    └── shared/                 # Переиспользуемые модули
```

## `app`

**Инициализирующая логика приложения**

Здесь обычно происходит:
- инициализация процессов и прочей фоновой логики
- инициализация провайдеров, оберток
- подключение глобальных стилей приложения

*Методология пока никак не регламентирует содержимое этого слоя, поэтому оно зависит от конкретного проекта*

### Примеры

#### Инициализация роутера

```tsx
// app/hocs/withRouter.tsx
export const withRouter = (component: Component) => () => (
    <Router>
        <Suspense fallback={<Spin overlay />}>
            <QueryParamProvider ReactRouterRoute={Route}>
                {component()}
            </QueryParamProvider>
        </Suspense>
    </Router>
);
```

#### Инициализация внешних библиотек

```tsx
// app/hocs/withAntd.tsx
export const withAntd = (component: Component) => () => (
    <ConfigProvider getPopupContainer={...}>
        {component()}
    </ConfigProvider>
);
```

```tsx
// app/hocs/withApollo.tsx
const client = new ApolloClient({ ... });

export const withApollo = (component: Component) => () => (
    <ApolloProvider client={client}>
        {component()}
    </ApolloProvider>
);
```

#### Подключение HOCs
*Здесь показан лишь один из способов, если вы используете HOCs для провайдеров и инициализации логики*

```tsx
// app/hocs/index.ts
import compose from "compose-function";
import { withRouter } from "./with-router";
import { withAntd } from "./with-antd";
...

// 1. Библиотека compose часто экспортится из некоторых уже используемых вами зависимостей
// н-р: `import { compose } from "redux"
// 2. Стоит учитывать порядок подключения HOCs
// н-р: withHOC2 не может быть запущен, пока не будет обертки withHOC1 и т.п.
export const withHocs = compose(withRouter, withAntd, ...);
```

```tsx
// app/index.tsx
import { withHocs } from "./hocs";
...

const App = () => { ... }

export default withHocs(App);
```

## `processes`

**Бизнес-процессы приложения, управляющие страницами**

```sh
└── processes/{slice}
          ├── index.ts
          ├── lib.ts
          └── model.ts
```

*Слой опционален*, но обычно здесь располагается:
- логика, затрагивающая сразу несколько страниц
    - *Например: `checkout`, `auth`*
- логика, которая излишне усложняет код страниц и размывается в них

## `pages`

**Страницы приложения**

```sh
└── pages/{slice}
          ├── index.ts
          ├── lib.ts
          ├── model.ts
          └── ui.tsx
```

## `features`

**Части функциональности приложения**

```sh
└── features/{slice}
          ├── lib/
          ├── model/
          ├── ui/
          └── index.ts
```

## `entities`

**Бизнес-сущности**

```sh
└── entities/{slice}
          ├── lib/
          ├── model/
          ├── ui/
          └── index.ts
```

Здесь обычно находятся:
- бизнес-сущности, для построения бизнес-логики приложения
    > *Например: `user`, `order`, `post`, `journal`, `i18n`, `navigation`, ...*
- компоненты сущностей, для построения UI вышележащих слоев
    > *Например: `UserCard`, `LocalePicker`, ...*

### Примеры

#### Использование модели сущностей

```tsx
// **/**/index.tsx
import { viewerModel } from "entities/viewer";

export const Wallet = () => {
    const viewer = viewerModel.useViewer();
    const { moneyCount } = wallet;
    
    ...
}
```

#### Использование компонентов сущностей

```ts
// entities/book/index.ts
export { BookCard, ... } from "./ui";
export * as bookModel from "./model";
```

```tsx
// pages/**/index.tsx
import { BookCard } from "entities/book";

export const CatalogPage = () => {
    const bookQuery = ...;
    return (
        ...
        {bookQuery.map((book) => (
            <Book key={book.id} data={book} />
        ))}
        ...
    )
}
```

## `shared`

**Переиспользуемые модули, без привязки к бизнес-логике**

```sh
└── shared/
      ├── api/
      ├── config/
      ├── lib/
      └── ui/
```

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

### Примеры

#### Использование UIKit

```tsx
// shared/ui/button/index.tsx
export const Button = () => {...}

// shared/ui/card/index.tsx
export const Card = () => {...}
```

```tsx
// **/**/index.tsx
import { Button } from "shared/ui/button";
import { Card } from "shared/ui/card";
// Или в крайних случаях
// import { Button, Card } from "shared/ui";
```

#### Использование переменных окружения

*Реализация зависит от проекта и команды, здесь приведен лишь один из вариантов*

```ts
// shared/config/index.ts
export const isDevEnv = NODE_ENV === "development";
export const OAUTH_TOKEN = getEnvVar("REACT_APP_OAUTH_TOKEN");
```

```ts
// **/**/index.tsx
import { OAUTH_TOKEN, isDevEnv } from "shared/config";

export const OAuthProvider = () => (
    <OAuth
        debug={isDevEnv}
        token={OAUTH_TOKEN}
        ...
    />
)
```

## См. также

> `WIP:` Со временем будут появляться статьи по каждой абстракции

<!-- FIXME: rename to features.md -->
- [Layer: Features](feature.md)
- [Адаптивность нейминга][refs-naming-adaptability]
- [Example: Viewer][refs-example-viewer]
    - *Пример распределения логики по слоям: от `shared` до `app`*
- [(Дискуссия) Про переиспользуемые модули][disc-sharing]
