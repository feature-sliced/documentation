---
sidebar_position: 2
---

# Layers

**Layers** - первый уровень разбиения приложения, согласно **скоупу влияния** модуля

```sh
└── src/
    ├── app/                    # Инициализирующая логика приложения
    ├── processes/              # (Опц.) Процессы приложения, протекающие над страницами
    ├── pages/                  # Страницы приложения
    ├── features/               # Ключевая функциональность приложения
    ├── entities/               # Бизнес-сущности
    └── shared/                 # Переиспользуемые модули
```

### Общие правила

- Слой располагается только на самом верхнем уровне, и не может встречаться еще раз на другом уровне вложенности
  - ***Плохо:** `pages/../features/..`*
- Каждый слой может импортировать только нижележащие слои (сверху-вниз)
  - `app` > `processes` > `pages` > `features` > `entities` > `shared`
- Чем ниже расположен слой - тем больше опасности вносить в него изменения
  - `shared` > `entities` > `features` > `pages` > `processes` > `app`

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
- логика, которая излишне бы усложняла код страниц и размывалась бы в них

*В процессах не должна располагаться логика отображения (ui), поскольку роль процессов - **управлять поведением страниц и нижележащих слоев, но не отображать что-либо самостоятельно***

## `pages`

> `WIP:` На данный момент ведутся активные обсуждения касаемо этого слоя:
>
> - является ли страница тем же слайсом
> - может ли быть иерархия страниц фрактальной, чтобы повторять структуру роутов
> - и т.д.
>
> Поэтому здесь приведены общие сведения по этому слою

**Страницы приложения**

```sh
└── pages/{slice}
          ├── index.ts
          ├── lib.ts
          ├── model.ts
          └── ui.tsx
```

1. Здесь располагаются страницы приложения
    - соответствующие конкретному роуту
    - при необходимости - сгруппированные общей папкой / родительской страницей

1. Каждая страница должна иметь **максимально простую логику**
    - вся логика отображения, бизнес правил и прочего - должна реализовываться путем композиции нижележащих слоев (`shared`, `entitites`, `features`)
    - при этом взаимодействие между нижележащими слоями - также должно осуществляться чаще всего на странице
        - *Т.е. если `featureA` влияет на `featureB` на определенной странице - эта логика должна быть прописана в модели самой странице и только на ней!*
        - *Без кода в самих фичах и тем более, кросс-импортов!*

### Примеры

#### Страница оформления заказа

*Реализация БЛ заказа очень зависит от вашего проекта, где-то порой это может регулироваться и процессами. Поэтому здесь приведена лишь одна из имплементаций*

```tsx
// pages/**/index.tsx
import { Order } from "features/order";
import { ProductCard } from "entities/product";
import { orderModel } from "entities/order";
import { Layout } from "shared/ui/layout"

export const CartPage = () => {
    const order = orderModel.useOrder();
    
    // Очень условная разметка
    return (
        {/** Используем shared (Layout) */}
        <Layout>
            <Layout.Main>
                ...
                {/** Используем entities (order.items, ProductCard) */}
                {order.items.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </Layout.Main>
            <Layout.Sidebar>
                ...
                {/** Используем features (Order.TotalInfo) */}
                <Order.TotalInfo />
            </Layout.Sidebar>
        </Layout>
    )
}
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

Каждая фича - часть бизнес-логики, при этом обязательно имеющая смысл и ценность для конечного пользователя

- *`ProductList`, `OfficeMap` - вряд ли можно назвать фичами*
- *`WalletAddFunds`, `AddToCart` - уже больше смысла для конечного пользователя*

При этом:

- для построения логики используются нижележащие слои
  - *`shared`, `entities`*
- одна фича **не может** импортировать другую
  - *Если [возникла такая необходимость][refs-low-coupling] - зависимость нужно переносить на слой выше / ниже, либо решать через композицию через children-props*
- фичи не могут быть вложенными, но при этом могут объединяться общей папкой, т.е. структурно
  - *При этом нельзя создавать промежуточные файлы, нужные именно для конкретной группы фич*
  - *Можно использовать только файлы реэкспорты*

### Примеры

#### Авторизация по телефону

```tsx
import { viewerModel } from "entities/viewer";

export const AuthByPhone = () => {
    return (
        // для redux - дополнительно нужен dispatch
        <Form onSuccess={(user) => viewerModel.setUser(user)}>
            <Form.Input 
                type="phone"
                ...
            />
            <Form.Button
                ...
            />
        </Form>
    )
}
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

<!-- FIXME: rename to features -->
- [Layer: Features][refs-feature]
- [Адаптивность нейминга][refs-naming-adaptability]
- [Example: Viewer][refs-example-viewer]
  - *Пример распределения логики по слоям: от `shared` до `app`*
- [Про понимание потребностей пользователей и функциональность приложения][refs-needs]
  - *Для понимания слоя `features`*
- [(Дискуссия) Про переиспользуемые модули][disc-sharing]
  - *Для понимания слоя `shared`*

[refs-naming-adaptability]: /docs/concepts/naming-adaptability
[refs-needs]: /docs/concepts/needs-driven

[refs-low-coupling]: /docs/guides/low-coupling
[refs-example-viewer]: /docs/guides/examples/viewer

[refs-feature]: /docs/reference/feature

[refs-segments]: /docs/reference/segments
[refs-segments--ui]: /docs/reference/segments#ui
[refs-segments--model]: /docs/reference/segments#model
[refs-segments--lib]: /docs/reference/segments#lib
[refs-segments--api]: /docs/reference/segments#api
[refs-segments--config]: /docs/reference/segments#config

[disc-sharing]: https://github.com/feature-sliced/documentation/discussions/14
