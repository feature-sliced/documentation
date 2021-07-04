---
sidebar_position: 4
---

# Quick start

> `WIP:` Статья будет дополняться

Рассмотрим применение **feature-sliced** на примере TodoApp

**Стек**: React, Effector, TypeScript, Sass

:::note

Туториал призван **раскрыть практическую идею самой методологии**. Поэтому описанные здесь практики - во многом подойдут и для других технологических стеков фронтенд-проектов

:::

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

Каждый, кто хоть сколько давно разрабатывал фронтенд-проекты, примерно понимает преимущества и недостатки такого подхода.

Однако все еще большинство фронтенд-проектов представляют из себя нечто такое, поскольку **нет проверенной опытом гибкой и расширяемой альтернативы**

*Помножим это на вольные адаптации структуры под каждый проект, без запрета со стороны фреймворка - и [получим "уникальные как снежинки проекты"][refs-motivation]*

**Цель данного туториала** - показать другой взгляд на привычные практики при проектировании

### Адаптируем структуру к нужному виду

```sh
└── src/
    ├── app/                    # Инициализирующая логика приложения
    |    ├── index.tsx          #    Энтрипоинт для подключения приложения (бывший App.tsx)
    |    └── index.scss         #    Глобальные стили приложения
    ├── pages/                  #
    ├── features/               #
    ├── entities/               #
    ├── shared/                 #
    └── index.tsx               # Подключение и рендеринг приложения
```

Возможно, на первый взгляд, такая структура покажется непривычной, но со временем вы сами заметите, что **используете знакомые вам абстракции, но в консистентном и упорядоченном виде.**

### Layers: app

Как можно заметить - мы перенесли всю базовую логику в директорию [`app/`][refs-app]

Именно там, согласно методологии, стоит располагать всю подготовительную логику:

- подключение глобальных стилей (`/app/styles/**` + `/app/index.css`)
- провайдеры и HOCs с инициализирующей логикой (`/app/providers/**`)

Пока что перенесем туда всю существующую логику, а другие директории оставим пустыми, как на схеме выше.

```tsx title=app/index.tsx
import "./index.scss";

const App = () => {
    return (
        <div>
            <header>
                TodoApp
            </header>
        </div>
    );
}
```

## 3. Подключим глобальные стили

### Установим зависимости

В туториале устанавливаем sass, но можно взять и любой другой препроцессор, поддерживающий импорты

```cmd
$ npm i dart-sass
```

### Заводим файлы для стилей

#### Для css-переменных

```scss title=app/styles/vars.scss
:root {
    --color-dark: #242424;
    --color-primary: #108ee9;
    ...
}
```

#### Для нормализации стилей

```scss title=app/styles/normalize.scss
html {
    scroll-behavior: smooth;
}
...
```

#### Подключаем все стили

```scss title=app/styles/index.scss
@import "./normalize.scss";
@import "./vars.scss";
...
```

```scss title=app/index.scss
@import "./styles/index.scss";
...
```

```tsx title=app/index.tsx
import "./index.scss"

const App = () => {...}
```

## 4. Добавим роутинг

### Установим зависимости

```cmd
$ npm i react-router react-router-dom
$ npm i -D @types/react-router @types/react-router-dom
```

### Добавим HOC для инициализации роутера

```tsx title=app/providers/with-router.tsx
import { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () => (
    <BrowserRouter>
        <Suspense fallback="Loading...">
            {component()}
        </Suspense>
    </BrowserRouter>
);
```

```ts title=app/providers/index.ts
import compose from "compose-function";
import withRouter from "./with-router";

export const withProviders = compose(withRouter);
```

```tsx title=app/index.tsx
import { withProviders } from "./providers";
...

const App = () => {...}

export default withProviders(App);
```

### Добавим реальные страницы

:::note

Это лишь одна из реализаций роутинга

- Можно объявлять его декларативно либо через список роутов (+ react-router-config)
- Можно объявлять его на уровне pages либо app

Методология пока никак не регламентирует реализацию этой логики

:::

#### Временная страница, только для проверки роутинга

Ее можно удалить позднее

```tsx title=pages/test/index.tsx
export const TestPage = () => {
    return <div>Test Page</div>;
};
```

#### Сформируем роуты

```tsx title=pages/index.tsx
// Либо использовать @loadable/component, в рамках туториала - некритично
import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const TestPage = lazy(() => import("./test"));

export const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={TestPage} />
            <Redirect to="/" />
        </Switch>
    );
};
```

#### Подключаем роутинг к приложению

```tsx title=app/index.tsx
import { Routing } from "pages";

const App = () => (
    <Routing />
)
...
```

### Layers: app, pages

Здесь мы использовали сразу несколько слоев:

- [`app`][refs-app] - для инициализации роутера *(HOC: withRouter)*
- [`pages`][refs-pages] - для хранения модулей страниц

## 5. Проанализируем функциональность

Теперь, после подготовки инфраструктуры, надо определиться - [какую ценность мы хотим донести конечному пользователю][refs-needs]

Для этого, декомпозируем нашу систему *(по слоям)*:

### [Pages][refs-pages]

Набросаем базово необходимые страницы, и ожидания от них:

1. `TasksListPage` - страница "Список задач"
    - Смотреть список задач
    - Переходить к странице конкретной задачи
    - *Помечать выполненной/невыполненной конкретную задачу*
    - Задавать фильтрацию по выполненным/невыполненным задачам

2. `TaskDetailsPage` - страница "Карточка задачи"
    - Смотреть информацию по задаче
    - *Помечать выполненной/невыполненной конкретную задачу*
    - Возвращаться к списку задач

Каждая из описанных возможностей - представляет из себя часть функциональности, т.е. [фичу][refs-features].

#### Обычный подход

И есть большой соблазн

- либо всю логику реализовать в директории каждой конкретной страницы.
- либо все "возможно переиспользуемые" модули вынести в общую папку `src/components` или подобную

Но если для маленького и недолгоживущего проекта такое решение подошло бы, то в реальной корпоративной разработке, оно **может поставить крест** на дальнейшем развитии проекта, превратив его в **"еще одно дремучее легаси"**

Обусловлено это обычными условиями развития проекта:

- требования меняются достаточно часто
- появляются новые обстоятельства
- техдолг копится с каждым днем и все сложнее добавлять новые фичи
- нужно масштабировать как сам проект, так и его команду

#### Альтернативный подход

Даже при базовом разбиении мы видим, что:

- между страницами есть общие [сущности][refs-entities] и их отображение *(Task)*
- между страницами есть общие [фичи][refs-features] *(Помечать задачу выполненной / невыполненной)*

Соответственно, кажется логичным продолжать декомпозировать задачу, но уже исходя из перечисленных выше возможностей для пользователя.

### [Features][refs-features]

Части функциональности, несущие ценность пользователю

- `<ToggleTask />` - (компонент) Пометить задачу выполненной / невыполненной
- `<TasksFilters/>` - (компонент) Задать фильтрацию для списка задач

### [Entities][refs-entities]

Бизнес-сущности, на которых будет строится более высокоуровневая логика

- `<TaskCard />` - (компонент) Карточка задачи, с отображением информации
- `getTasksListFx({ filters })` - (effect) Подгрузка списка задач с параметрами
- `getTaskByIdFx(taskId: number)`- (effect) Подгрузка задачи по ID

### [Shared][refs-shared]

Переиспользуемый инфраструктурный код

- `<Card />` - (компонент) UIKit компонент
  - *При этом можно как реализовывать собственный UIKit под проект, так воспользоваться готовым*
- `getTasksList({ filters })` - (api) Подгрузка списка задач с параметрами
- `getTaskById(taskId: number)`- (api) Подгрузка задачи по ID

### В чем профит?

Теперь все модули можно проектировать со [слабой связностью][refs-low-coupling], распределить по команде без конфликтов при влитии изменений и разработке

*А самое главное - теперь каждый модуль служит для построения конкретной бизнес-ценности, что снижает риски для создания "фич ради фич"*

## 6. Соберем все вместе

Постараемся сконцентрироваться не на реализации каждого модуля, а на последовательной композиции логики

### Подготовка модулей к использованию

Каждый модуль должен предоставлять к использованию свой [публичный интерфейс][refs-public-api]:

```ts title={layer}/foo/index.ts
export { FooCard, FooThumbnail, ... } from "./ui";
export * as fooModel from "./model"; 
```

:::info

Если вам нужны именованные экспорты неймспейсов для декларации Public API, можно посмотреть в сторону [@babel/plugin-proposal-export-namespace-from](https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from)

Либо же, как альтернатива, использовать более развернутую конструкцию

```ts title={layer}/foo/index.ts
import { FooCard, FooThumbnail, ... } from "./ui";
import * as fooModel from "./model"; 

export { FooCard, FooThumbnail, fooModel };
```

:::

### Композиция: `entities` ❮ `shared`

#### Карточка задачи

```tsx title=entities/task/ui.tsx
import { Card } from "shared/ui/card";

export const TaskCard = ({ data, children, ...cardProps }: Props) => (
    <Card 
        title={data.name} 
        description={data.description}
        {...cardProps}
    >
        {children}
    </Card>
)
```

#### Эффекты для взаимодействия с API задач

```ts title=entities/task/model/effects.ts
import { taskApi } from "shared/api";

const getTasksListFx = createEffect((params) => {
    // Здесь также может быть доп. обработка эффекта
    return taskApi.getTasksList(params);
});

const getTaskByIdFx = createEffect((taskId: number) => {
    // Здесь также может быть доп. обработка эффекта
    return taskApi.getTaskById(taskId);
});
```

### Композиция: `features` ❮ `entities` `shared`

#### Чекбокс для переключения статуса задачи

```tsx title=features/toggle-task/ui.tsx
import { taskModel } from "entities/task";
import { Checkbox } from "shared/ui/checkbox";

export const ToggleTask = ({ taskId }: Props) => {
    const { status, checked } = taskModel.selectors.useTask(taskId);
    // resolve / unresolve
    return (
        <Checkbox 
            onClick={() => taskModel.events.toggleTask(taskId)} 
            checked={checked}
        >
            {status}
        </Checkbox>
    )
}
```

#### Фильтры для списка задач

```tsx title=features/tasks-filters/ui.tsx
import { taskModel } from "entities/task";
import { Button } from "shared/ui/button";
import { Row } from "shared/ui/row";
// Либо можно сразу обращаться к shared/ui
// Если не так критичен размер бандла
// import { Row, Button } from "shared/ui";

type Filter = {
    id: number;
    title: string;
}

// Описываем здесь датасет фильтров "Закрытые" / "Открытые" и т.п.
const filters: Filter[] = [...];

export const TasksFilters = () => {
    const { activeFilters } = taskModel.selectors.useFilters();
    return (
        <Row display="flex">
            {filters.map(({ title, id }) => (
                <Button 
                    key={id} 
                    onClick={() => taskModel.events.toggleFilter(id)}
                    toggled={activeFilters.includes(id)}
                >
                    {title}
                </Button>
            ))}
        </Row>
    )
}
```

### Композиция: `pages` ❮ `features` `entities` `shared`

#### Страница "Список задач"

```tsx title=pages/tasks-list/index.tsx
import { TasksFilters } from "features/tasks-filters";
import { ToggleTask } from "features/toggle-task";
import { TaskCard, taskModel } from "entities/task";
import { Layout } from "shared/ui/layout";

export const TasksListPage = () => {
    const tasks = taskModel.selectors.useTasks();

    return (
        <Layout>
            <Layout.Toolbar>
                <TasksFilters />
            </Layout.Toolbar>
            <Layout.Content>
                {tasks.map((task) => (
                    <TaskCard 
                        data={task}
                        titleHref={`/${task.id}`}
                        direction="horizontal"
                        size="small"
                        hoverable
                    >
                        <ToggleTask taskId={task.id} />
                    </TaskCard>
                ))}
            </Layout.Content>
        </Layout>
    )
}
```

#### Страница "Карточка задачи"

```tsx title=pages/task-details/index.tsx
import { Link } from "react-router-dom";

import { ToggleTask } from "features/toggle-task";
import { TaskCard, taskModel } from "entities/task";
import { Layout } from "shared/ui/layout";
import { Error } from "shared/ui/error";

type Props = RouteChildrenProps<{ ... }>;

export const TaskDetailsPage = (props: Props) => {
    const taskId = Number(props.match?.params.taskId);
    const task = taskModel.selectors.useTask(taskId);

    if (!task) {
        return <Error type="404" message="Задача не найдена" />
    }

    return (
        <Layout>
            <Layout.Toolbar>
                <Link to="/">К списку задач</Link>
            </Layout.Toolbar>
            <Layout.Content>
                <TaskCard data={task} size="large">
                    <ToggleTask taskId={task.id} />
                </TaskCard>
            </Layout.Content>
        </Layout>
    )
}
```

## Итого

### Мы научились применять методологию для базовых случаев

Понятно, что мир гораздо сложнее, но уже здесь мы зацепились за некоторые спорные моменты и разрешили их таким образом, чтобы проект оставался поддерживаемым и расширяемым.

### Мы получили масштабируемую и гибкую кодобазу

1. Переиспользуемые и расширяемые модули

    - *shared, features, entities*

1. Равномерное и предсказуемое распределение логики

    - *Поскольку композиция у нас идет в одном направлении (вышележащие слои используют нижележащие) - мы можем предсказуемо ее отслеживать и модифицировать, не боясь непредвиденных последствий*

1. Структуру приложения, которая рассказывает о бизнес логике сама за себя

    - Какие есть страницы?
        - `TasksList`, `TaskDetails`
    - Какие есть фичи? Что может пользователь?
        - `ToggleTask` `TasksFilters`
    - Какие есть бизнес-сущности? С чем ведется работа?
        - `Task (TaskCard, ...)`
    - Что можно переиспользовать из вспомогательного?
        - `UIKit (Card, ...)` `API (tasksApi)`

### Пример

Ниже в [Codesandbox](https://codesandbox.io/s/github/feature-sliced/examples/tree/master/todo-app) представлен пример получившегося TodoApp, где можно подробно изучить финальную структуру приложения

<iframe class="codesandbox" src="https://codesandbox.io/embed/github/feature-sliced/examples/tree/master/todo-app?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&codemirror=1" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

## См. также

- [(Обзор) How to Organize Your React + Redux Codebase][ext-pluralsight]
  - Разбор нескольких подходов к структуризации React проектов
- [Гайды и примеры применения методологии (+ Миграция с v1)][refs-guides]
- [Про разбиение приложения][refs-splitting]
- [Справочный материал по методологии][refs-reference]

[refs-motivation]: /docs/get-started/motivation

[refs-needs]: /docs/concepts/needs-driven
[refs-public-api]: /docs/concepts/public-api
[refs-splitting]: /docs/concepts/app-splitting

[refs-low-coupling]: /docs/guides/low-coupling
<!-- FIXME: Ссылаться на рут позднее, а не на первый элемент -->
[refs-guides]: /docs/guides/migration-from-v1
<!-- FIXME: Ссылаться на рут позднее, а не на первый элемент -->
[refs-reference]: /docs/reference/glossary
[refs-app]: /docs/reference/layers#app
[refs-pages]: /docs/reference/layers#pages
[refs-features]: /docs/reference/layers#features
[refs-entities]: /docs/reference/layers#entities
[refs-shared]: /docs/reference/layers#shared

[ext-pluralsight]: https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase
[ext-pluralsight--flat]: https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase#module-theflatstructure
