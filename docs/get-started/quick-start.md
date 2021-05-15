[refs-motivation]: /docs/about/motivation.md

[refs-app]: /docs/references/layers/readme.md#app
[refs-pages]: /docs/references/layers/readme.md#pages
[refs-features]: /docs/references/layers/readme.md#features
[refs-entities]: /docs/references/layers/readme.md#entities
[refs-shared]: /docs/references/layers/readme.md#shared

[ext-pluralsight]: https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase
[ext-pluralsight--flat]: https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase#module-theflatstructure

# Quick start.

Рассмотрим применение **feature-Sliced** на примере TodoApp с использованием `React + Effector`

> **Примечание:** Туториал призван **раскрыть практическую идею самой методологии**. Поэтому описанные здесь практики - во многом подойдут *и для других фреймворков и стейт-менеджеров.*

> `WIP:` Позже будет добавлена ссылка на codesandbox с примером

## 1. Инициализируем проект

На данный момент имеется множество способов сгенерировать и запустить шаблон проекта

Не будем акцентироваться сильно на этом шаге, но для быстрой инициализации можно  воспользоваться [CRA (для React)](https://create-react-app.dev/docs/getting-started):

```cmd
$ npx create-react-app todo-app --template typescript
```

## 2. Подготавливаем структуру

Получили следующую заготовку под проект

```sh
└── src/
    ├── App.css
    ├── App.test.tsx
    ├── App.tsx
    ├── index.css
    ├── index.ts
    ├── logo.svg
    ├── react-app-env.d.ts
    ├── reportWebVitals.ts
    ├── setupTests.ts
    └── index.tsx/
```

### Как это обычно происходит

И обычно большинство проектов на данном этапе [превращаются в примерно такое][ext-pluralsight--flat]:

```sh
└── src/
    ├── api/
    ├── components/
    ├── containers/
    ├── helpers/
    ├── pages/
    ├── routes/
    ├── store/
    ├── App.tsx
    └── index.tsx/
```

*Они могут как сразу стать такими, так и по прошествии долгой разработки*

При этом, если мы заглянем внутрь, как правило обнаружим:
- Сильно ветвистые по вложенности директории
- Сильно связные друг с другом компоненты
- Огромное количество разнородных компонентов/контейнеров в соответствующих папках, связанные "абы как"

### Как это можно делать иначе

Каждый, кто хоть сколько давно разрабатывал фронтенд-проекты, примерно понимает преимущества и недостатки данного подхода.

Однако все еще большинство реакт-проектов представляют из себя нечто такое, поскольку **нет проверенной опытом гибкой и расширяемой альтернативы**

Помножим это на вольные адаптации структуры под каждый проект, без запрета со стороны фреймворка - и [получим "уникальные как снежинки проекты"][refs-motivation]

**Цель данного туториала** - показать другой взгляд на привычные практики при проектировании

### Адаптируем структуру к нужному виду

```sh
└── src/
    ├── app/                    # Инициализирующая логика приложения
    |    ├── index.tsx          #    Энтрипоинт для подключения приложения (бывший App.tsx)
    |    └── styles.module.scss #    Глобальные стили приложения
    ├── pages/                  #
    ├── features/               #
    ├── entities/               #
    ├── shared/                 #
    └── index.tsx               # Подключение и рендеринг приложения
```

Возможно, на первый взгляд, такая структура покажется непривычной, но по прошествии некоторого времени вы сами заметите, что **используете привычные вам абстракции, но в консистентном и упорядоченном виде.**

### [`app`][refs-app]

Как можно заметить - мы перенесли всю базовую логику в директорию `app/`

Именно там, согласно методологии, стоит располагать всю подготовительную логику:
- подключение глобальных стилей (`/app/styles/**` + `/app/index.css`)
- провайдеры и HOCs с инициализирующей логикой (`/app/hocs/**`)

Пока что перенесем туда всю существующую логику, а другие директории оставим пустыми, как на схеме выше.

```js
import styles from "./styles.module.scss";

const App = () => {
    return (
        <div className={styles.root}>
            <header className={styles.header}>
                TodoApp
            </header>
        </div>
    );
}

export default App;
```

> Также на этом этапе можно поставить sass препроцессор, либо любой другой, который поддерживает импорты

## Подключим глобальные стили

```scss
// app/styles/vars.scss
:root {
    --color-dark: #242424;
    --color-primary: #108ee9;
    ...
}

// app/styles/normalize.scss
html {
    scroll-behavior: smooth;
}
...

// app/styles.index.scss
@import "./normalize.scss";
@import "./vars.scss";
...

// app/index.scss
@import "./styles/index.scss";
```

```js
// app/index.tsx
import "./index.scss"

const App = () => {...}
```

## Добавим роутинг

### Добавим HOC для инициализации роутера
```tsx
// app/hocs/with-router.ts
import { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () => (
    <BrowserRouter>
        <Suspense fallback="Loading...">
            {component()}
        </Suspense>
    </BrowserRouter>
);
// app/hocs/index.ts
import compose from "compose-function";
import withRouter from "./with-router";

export const withHocs = compose(withRouter);
```

```tsx
// app/index.tsx
import { withHocs } from "./hocs";
...

const App = () => {...}

export default withHocs(App);
```

### Добавим реальные страницы

```tsx
// pages/tasks-list/index.tsx
export const TasksListPage = () => {
    return <div>Tasks List</div>;
};
// pages/task-details/index.tsx
type Props = RouteChildrenProps<{ ... }>;

export const TasksDetailsPage = (props: Props) => {
    const taskId = Number(props.match?.params.taskId);
    return <div>Task#{taskId}</div>;
};
```

```tsx
// pages/index.tsx
import { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const TasksListPage = lazy(() => import("./tasks-list"));
const TaskDetailsPage = lazy(() => import("./task-details"));

const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={TasksListPage} />
            <Route exact path="/:taskId" component={TaskDetailsPage} />
            <Redirect to="/" />
        </Switch>
    );
};

export default Routing;
```

```tsx
// app/index.tsx
import Routing from "pages";

const App = () => (
    <Routing />
)
...
```

## Добавим фич

> `TBD`

## Добавим сущностей

> `TBD`

## Итого

> `TBD`

## См. также
- [(Обзор) How to Organize Your React + Redux Codebase][ext-pluralsight]
    - Разбор нескольких подходов к структуризации React проектов

