---
sidebar_position: 2
---

# App

![app-themed-bordered](/img/layers/app.png)

## Описание

Здесь обычно происходит:

- инициализация процессов и прочей фоновой логики
- инициализация провайдеров, оберток
- подключение глобальных стилей приложения

*Методология пока никак не регламентирует содержимое этого слоя, поэтому оно зависит от конкретного проекта*

## Примеры

### Инициализация роутера

```tsx title=app/providers/withRouter.tsx
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

### Инициализация внешних библиотек

```tsx title=app/providers/withAntd.tsx
export const withAntd = (component: Component) => () => (
    <ConfigProvider getPopupContainer={...}>
        {component()}
    </ConfigProvider>
);
```

```tsx title=app/providers/withApollo.tsx
const client = new ApolloClient({ ... });

export const withApollo = (component: Component) => () => (
    <ApolloProvider client={client}>
        {component()}
    </ApolloProvider>
);
```

### Подключение инициализации

*Здесь показан лишь один из способов, если вы используете HOC для провайдеров и инициализации логики*

```tsx title=app/providers/index.ts
import compose from "compose-function";
import { withRouter } from "./with-router";
import { withAntd } from "./with-antd";
...

// 1. Библиотека compose часто экспортится из некоторых уже используемых вами зависимостей
// н-р: `import { compose } from "redux"
// 2. Стоит учитывать порядок подключения HOCs
// н-р: withHOC2 не может быть запущен, пока не будет обертки withHOC1 и т.п.
export const withProviders = compose(withRouter, withAntd, ...);
```

```tsx title=app/index.tsx
import { withProviders } from "./providers";
...

const App = () => { ... }

export default withProviders(App);
```
