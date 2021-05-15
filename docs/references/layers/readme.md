[refs-naming-adaptability]: /docs/concepts/naming-adaptability.md
[refs-example-viewer]: /docs/guides/examples/viewer.md

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
// /app/hocs/withRouter.tsx
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
// /app/hocs/withAntd.tsx
export const withAntd = (component: Component) => () => (
    <ConfigProvider getPopupContainer={({ parentElement }) => parentElement || document.body}>
        {component()}
    </ConfigProvider>
);
```

```tsx
// /app/hocs/withApollo.tsx
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
// /app/hocs/index.ts
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
// /app/index.tsx
import { withHocs } from "./hocs";
...

const App = () => { ... }

export default withHocs(App);
```

## `processes`

(Опц.) Процессы приложения, протекающие над страницами

## `pages`

Страницы приложения

## `features`

Ключевой функционал приложения

## `entities`

Бизнес-сущности

## `shared`

Переиспользуемые модули

## См. также

> `WIP:` Со временем будут появляться статьи по каждой абстракции

<!-- FIXME: rename to features.md -->
- [Layer: Features](feature.md)
- [Адаптивность нейминга][refs-naming-adaptability]
- [Example: Viewer][refs-example-viewer]
    - *Пример распределения логики по слоям: от `shared` до `app`*
