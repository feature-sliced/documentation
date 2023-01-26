---
sidebar_position: 2
---

# Туториал

Рассмотрим применение **Feature-Sliced Design** на примере TodoApp

- Сначала разберем *подготовительные аспекты создания приложения*
- А затем - как концепции методологии помогают *гибко и эффективно проектировать бизнес-логику* без лишних затрат

> В конце статьи есть [codesandbox-вставка с финальным решением][ext-sandbox], которое может помочь для уточнения деталей реализации

**Стек**: React, Effector, TypeScript, Sass, AntDesign

:::note

Туториал призван **раскрыть практическую идею самой методологии**. Поэтому описанные здесь практики - во многом подойдут и для других технологических стеков фронтенд-проектов

:::

## 1. Подготовительные моменты {#1-preparation}

### 1.1 Инициализируем проект {#11-initializing-the-project}

На данный момент имеется множество способов сгенерировать и запустить шаблон проекта

Не будем акцентироваться сильно на этом шаге, но для быстрой инициализации можно  воспользоваться [CRA (для React)](https://create-react-app.dev/docs/getting-started):

```cmd
$ npx create-react-app todo-app --template typescript
```

### 1.2 Подготавливаем структуру {#12-preparing-the-structure}

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

#### Как это обычно происходит {#how-it-usually-happens}

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

#### Как это можно делать иначе {#how-can-it-be-done-otherwise}

Каждый, кто хоть сколько давно разрабатывал фронтенд-проекты, примерно понимает преимущества и недостатки такого подхода.

Однако все еще большинство фронтенд-проектов представляют из себя нечто такое, поскольку **нет проверенной опытом гибкой и расширяемой альтернативы**

*Помножим это на вольные адаптации структуры под каждый проект, без запрета со стороны фреймворка - и [получим "уникальные как снежинки проекты"][refs-motivation]*

**Цель данного туториала** - показать другой взгляд на привычные практики при проектировании

#### Адаптируем структуру к нужному виду {#adapting-the-structure-to-the-desired-view}

```sh
└── src/
    ├── app/                    # Инициализирующая логика приложения
    |    ├── index.tsx          #    Энтрипоинт для подключения приложения (бывший App.tsx)
    |    └── index.css         #    Глобальные стили приложения
    ├── pages/                  #
    ├── widgets/                #
    ├── features/               #
    ├── entities/               #
    ├── shared/                 #
    └── index.tsx               # Подключение и рендеринг приложения
```

Возможно, на первый взгляд, такая структура покажется непривычной, но со временем вы сами заметите, что **используете знакомые вам абстракции, но в консистентном и упорядоченном виде.**

**Также, подключаем поддержку абсолютных импортов для удобства**

```ts title=tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    // Либо же альясы, если так удобнее
```

Вот, как это поможет нам в будущем

```diff
- import App from "../app"
- import Button from "../../shared/ui/button";
+ import App from "app"
+ import Button from "shared/ui/button";
```

#### Layers: app {#layers-app}

Как можно заметить - мы перенесли всю базовую логику в директорию [`app/`][refs-app]

Именно там, согласно методологии, стоит располагать всю подготовительную логику:

- подключение глобальных стилей (`/app/styles/**` + `/app/index.css`)
- провайдеры и HOCs с инициализирующей логикой (`/app/providers/**`)

Пока что перенесем туда всю существующую логику, а другие директории оставим пустыми, как на схеме выше.

```tsx title=app/index.tsx
import "./index.css";

const App = () => {...}
```

### 1.3 Подключим глобальные стили {#13-enabling-global-styles}

#### Установим зависимости {#install-dependencies}

В туториале устанавливаем sass, но можно взять и любой другой препроцессор, поддерживающий импорты

```cmd
$ npm i sass
```

#### Заводим файлы для стилей {#creating-files-for-styles}

##### Для css-переменных {#for-css-variables}

```scss title=app/styles/vars.scss
:root {
    --color-dark: #242424;
    --color-primary: #108ee9;
    ...
}
```

##### Для нормализации стилей {#to-normalize-styles}

```scss title=app/styles/normalize.scss
html {
    scroll-behavior: smooth;
}
...
```

##### Подключаем все стили {#connecting-all-styles}

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

### 1.4 Добавим роутинг {#14-adding-routing}

#### Установим зависимости {#install-dependencies-1}

```cmd
$ npm i react-router react-router-dom compose-function
$ npm i -D @types/react-router @types/react-router-dom @types/compose-function
```

#### Добавим HOC для инициализации роутера {#add-hoc-to-initialize-the-router}

```tsx title=app/providers/with-router.tsx
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

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
import { withRouter } from "./with-router";

export const withProviders = compose(withRouter);
```

```tsx title=app/index.tsx
import { withProviders } from "./providers";
...

const App = () => {...}

export default withProviders(App);
```

#### Добавим реальные страницы {#lets-add-real-pages}

:::note

Это лишь одна из реализаций роутинга

- Можно объявлять его декларативно либо через список роутов (+ react-router-config)
- Можно объявлять его на уровне pages либо app

Методология пока никак не регламентирует реализацию этой логики

:::

##### Временная страница, только для проверки роутинга {#temporary-page-only-for-checking-the-routing}

Ее можно удалить позднее

```tsx title=pages/test/index.tsx
const TestPage = () => {
    return <div>Test Page</div>;
};

export default TestPage;
```

##### Сформируем роуты {#lets-form-the-routes}

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

##### Подключаем роутинг к приложению {#connecting-the-routing-to-the-application}

```tsx title=app/index.tsx
import { Routing } from "pages";

const App = () => (
    // Потенциально сюда можно вставить 
    // Единый на все приложение хедер
    // Либо же делать это на отдельных страницах
    <Routing />
)
...
```

#### Layers: app, pages {#layers-app-pages}

Здесь мы использовали сразу несколько слоев:

- [`app`][refs-app] - для инициализации роутера *(HOC: withRouter)*
- [`pages`][refs-pages] - для хранения модулей страниц

### 1.5 Подключим UIKit {#15-lets-connect-uikit}

Для упрощения туториала, воспользуемся готовым UIKit от [AntDesign](https://ant.design/components/overview/)

```cmd
$ npm i antd @ant-design/icons
```

```ts title=app/styles/index.scss
@import 'antd/dist/antd.css';
```

:::tip

Но вы можете использовать **любой другой UIKit** или же **создать собственный**, расположив компоненты в `shared/ui` - именно там рекомендуется хранить UIKit приложения:

```ts
import { Checkbox } from "antd"; // ~ "shared/ui/checkbox"
import { Card } from "antd"; // ~ "shared/ui/card"
```

:::

## 2. Реализация бизнес-логики {#2-implementing-business-logic}

:::note

Постараемся сконцентрироваться не на реализации каждого модуля, а на их последовательной композиции

:::

### 2.1 Проанализируем функциональность {#21-lets-analyze-the-functionality}

Прежде чем приступать к коду, надо определиться - [какую ценность мы хотим донести конечному пользователю][refs-needs]

Для этого, декомпозируем нашу функциональность *по зонам ответственности [(слоям)][refs-layers]*

![layers-flow-themed](/img/layers_flow.png)

> **Примечание:** на схеме представлен *экспериментальный слой "Виджетов"*, который излишен в рамках туториала и спецификация которого скоро добавится

#### [Pages][refs-pages]

Набросаем базово необходимые страницы, и пользовательские ожидания от них:

1. `TasksListPage` - страница "Список задач"
    - Смотреть список задач
    - Переходить к странице конкретной задачи
    - *Помечать выполненной/невыполненной конкретную задачу*
    - Задавать фильтрацию по выполненным/невыполненным задачам

2. `TaskDetailsPage` - страница "Карточка задачи"
    - Смотреть информацию по задаче
    - *Помечать выполненной/невыполненной конкретную задачу*
    - Возвращаться к списку задач

Каждая из описанных возможностей - представляет из себя часть функциональности

##### Обычный подход {#usual-approach}

И есть большой соблазн

- либо всю логику реализовать в директории каждой конкретной страницы.
- либо все "возможно переиспользуемые" модули вынести в общую папку `src/components` или подобную

Но если для маленького и недолгоживущего проекта такое решение подошло бы, то в реальной корпоративной разработке, оно **может поставить крест** на дальнейшем развитии проекта, превратив его в **"еще одно дремучее легаси"**

Обусловлено это обычными условиями развития проекта:

- требования меняются достаточно часто
- появляются новые обстоятельства
- техдолг копится с каждым днем и все сложнее добавлять новые фичи
- нужно масштабировать как сам проект, так и его команду

##### Альтернативный подход {#alternative-approach}

Даже при базовом разбиении мы видим, что:

- между страницами есть общие [сущности][refs-entities] и их отображение *(Task)*
- между страницами есть общие [фичи][refs-features] *(Помечать задачу выполненной / невыполненной)*

Соответственно, кажется логичным продолжать декомпозировать задачу, но уже исходя из перечисленных выше возможностей для пользователя.

#### [Features][refs-features]

Части функциональности, несущие ценность пользователю

- `<ToggleTask />` - (компонент) Пометить задачу выполненной / невыполненной
- `<TasksFilters/>` - (компонент) Задать фильтрацию для списка задач

#### [Entities][refs-entities]

Бизнес-сущности, на которых будет строится более высокоуровневая логика

- `<TaskCard />` - (компонент) Карточка задачи, с отображением информации
- `getTasksListFx({ filters })` - (effect) Подгрузка списка задач с параметрами
- `getTaskByIdFx(taskId: number)`- (effect) Подгрузка задачи по ID

#### [Shared][refs-shared]

Переиспользуемые общие модули, без привязки к предметной области

- `<Card />` - (компонент) UIKit компонент
  - *При этом можно как реализовывать собственный UIKit под проект, так воспользоваться готовым*
- `getTasksList({ filters })` - (api) Подгрузка списка задач с параметрами
- `getTaskById(taskId: number)`- (api) Подгрузка задачи по ID

#### В чем профит? {#what-is-the-profit}

Теперь все модули можно проектировать со [слабой связностью][refs-low-coupling] и [со своей зоной ответственности][refs-layers], а также распределить по команде без конфликтов при разработке

*А самое главное - теперь каждый модуль служит для построения конкретной бизнес-ценности, что снижает риски для создания ["фич ради фич"][refs-needs]*

### 2.2 Про что еще стоит помнить {#22-what-else-is-worth-remembering}

#### Слои и ответственность {#layers-and-responsibilities}

Как было описано выше, благодаря слоистой структуре мы можем **предсказуемо распределять сложность приложения** согласно [зонам ответственности, т.е. слоям][refs-layers].

При этом более высокоуровневая логика строится на основание нижележащих слоев:

```tsx
// (shared)         => (entities)  + (features)     => (pages)
<Card> + <Checkbox> => <TaskCard/> + <ToggleTask/>  => <TaskPage/>
```

#### Подготовка модулей к использованию {#preparing-modules-for-use}

Каждый реализуемый модуль должен предоставлять к использованию свой [публичный интерфейс][refs-public-api]:

```ts title={layer}/foo/index.ts
export { Card as FooCard, Thumbnail as FooThumbnail, ... } from "./ui";
export * as fooModel from "./model"; 
```

:::info

Если вам нужны именованные экспорты неймспейсов для декларации Public API, можно посмотреть в сторону [@babel/plugin-proposal-export-namespace-from](https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from)

Либо же, как альтернатива, использовать более развернутую конструкцию

```ts title={layer}/foo/index.ts
import { Card as FooCard, Thumbnail as FooThumbnail, ... } from "./ui";
import * as fooModel from "./model"; 

export { FooCard, FooThumbnail, fooModel };
```

:::

### 2.3 Отобразим базово список задач {#23-lets-display-the-basic-task-list}

#### (entities) Карточка задачи {#entities-task-card}

```tsx title=entities/task/ui/task-row/index.tsx
import { Link } from "react-router-dom";
import cn from "classnames"; // Можно смело использовать аналоги
import { Row } from "antd"; // ~ "shared/ui/row"

export const TaskRow = ({ data, titleHref }: TaskRowProps) => {
    return (
        <Row className={cn(styles.root, { [styles.completed]: data.completed })}>
            {titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title}
        </Row>
    )
}
```

#### (entities) Подгрузка списка задач {#entities-loading-the-task-list}

Можно разбивать по типу сущности, либо хранить все в duck-modular-стиле

> Более подробно с реализацией API по туториалу можно ознакомиться [здесь][ext-source-api]

```ts title=entities/task/model/index.ts
import { createStore, combine, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import { typicodeApi } from "shared/api";
import type { Task } from "shared/api";

// В каждом эффекте так же может быть своя доп. обработка
const getTasksListFx = createEffect((params?: typicodeApi.tasks.GetTasksListParams) => {
  // Здесь также может быть доп. обработка эффекта
  return typicodeApi.tasks.getTasksList(params);
});

// Можно хранить и в нормализованном виде
export const $tasks = createStore<Task[]>([])
  .on(getTasksListFx.doneData, (_, payload) => ...)

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));
// Можно промаппить и другие вещи вроде `isEmpty`, `isLoading`, ...
```

#### (pages) Соединим всю логику на странице {#pages-lets-connect-all-the-logic-on-the-page}

```tsx title=pages/tasks-list/index.tsx
import { useEffect } from "react";
// Если чувствуете себя уверенно с @effector/reflect - можете сразу использовать его
// В рамках туториала некритично
import { useStore } from "effector";
import { Layout, Row, Col, Typography, Spin, Empty } from "antd"; // ~ "shared/ui/{...}"

import { TaskRow, taskModel } from "entities/task";
import styles from "./styles.module.scss";

const TasksListPage = () => {
  const tasks = useStore(taskModel.$tasksList);
  const isLoading = useStore(taskModel.$tasksListLoading);
  const isEmpty = useStore(taskModel.$tasksListEmpty);

  /**
   * Запрашиваем данные при загрузке страницы
   * @remark Является плохой практикой в мире effector и представлено здесь - лишь для наглядной демонстрации
   * Лучше фетчить через event.pageMounted или reflect
   */
  useEffect(() => taskModel.getTasksListFx(), []);

  return (
    <Layout className={styles.root}>
      <Layout.Toolbar className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        {/* TODO: TasksFilters */}
      </Layout.Toolbar>
      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          {isLoading && <Spin size="large" />}
          {!isLoading && tasks.map((task) => (
            <Col key={task.id} span={24}>
              <TaskRow
                data={task}
                titleHref={`/${task.id}`}
                // TODO: ToggleTaskCheckbox
              />
            </Col>
          ))}
          {!isLoading && isEmpty && <Empty description="No tasks found" />}
        </Row>
      </Layout.Content>
    </Layout>
  );
};
```

### 2.4 Добавим переключение статуса задач {#24-adding-task-status-switching}

#### (entities) Переключение статуса задачи {#entities-switching-the-task-status}

```ts title=entities/task/model/index.ts
export const toggleTask = createEvent<number>();

export const $tasks = createStore<Task[]>(...)
  ...
  .on(toggleTask, (state, taskId) => produce(state, draft => {
    const task = draft[taskId];
    task.completed = !task.completed;
    console.log(1, { taskId, state, draft: draft[taskId].completed });
  }))


// Делаем хуком, чтобы завязаться на обновления react
// @see В случае эффектора, использование хука - это крайняя мера, т.к. более предпочтительны computed-сторы
export const useTask = (taskId: number): import("shared/api").Task | undefined => {
  return useStoreMap({
    store: $tasks,
    keys: [taskId],
    fn: (tasks, [id]) => tasks[id] ?? null
  });
};
```

#### (features) Чекбокс для задачи {#features-checkbox-for-the-task}

```tsx title=features/toggle-task/ui.tsx
import { Checkbox } from "antd"; // ~ "shared/ui/checkbox"
import { taskModel } from "entities/task";

// resolve / unresolve
export const ToggleTask = ({ taskId }: ToggleTaskProps) => {
    const task = taskModel.useTask(taskId);
    if (!task) return null;

    return (
        <Checkbox 
            onClick={() => taskModel.toggleTask(taskId)} 
            checked={task.completed}
        />
    )
}
```

#### (pages) Внедряем чекбокс в страницу {#pages-embedding-the-checkbox-in-the-page}

Что примечательно - карточка задачи совсем не знает ни про страницу где используется, ни про то, какие кнопки-действия в нее могут вставляться (то же самое можно сказать и про саму фичу)

Такой подход позволяет одновременно **грамотно разделять ответственность** и **гибко переиспользовать логику при реализации**

```tsx title=pages/tasks-list/index.tsx
import { ToggleTask } from "features/toggle-task";
import { TaskRow, taskModel } from "entities/task";
...
<Col key={task.id} span={24}>
      <TaskRow
        ...
        before={<ToggleTask taskId={task.id} withStatus={false} />}
      />
</Col>
```

### 2.5 Добавим фильтрацию задач {#25-adding-task-filtering}

#### (entities) Фильтрация на уровне данных {#entities-filtering-at-the-data-level}

```ts title=entities/task/model/index.ts
import { combine, createEvent, createStore } from "effector";

export type QueryConfig = { completed?: boolean };

const setQueryConfig = createEvent<QueryConfig>();

// Можно вынести в отдельную директорию (для хранения нескольких моделей)
export const $queryConfig = createStore<QueryConfig>({})
  .on(setQueryConfig, (_, payload) => payload);

/**
 * Отфильтрованные таски
 * @remark Можно разруливать на уровне эффектов - но тогда нужно подключать дополнительную логику в стор
 * > Например скрывать/показывать таск при `toggleTask` событии
 */
export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasksList, config) => {
    return tasksList.filter(task => (
      config.completed === undefined ||
      task.completed === config.completed
  ))},
);
```

#### (features) UI-контролы для фильтров {#features-ui-controls-for-filters}

```tsx title=features/tasks-filters/ui.tsx
// Если чувствуете себя уверенно с @effector/reflect - можете сразу использовать его
// В рамках туториала некритично
import { useStore } from "effector";
import { Radio } from "antd"; // ~ "shared/ui/radio"

import { taskModel } from "entities/task";
import { filtersList, getFilterById, DEFAULT_FILTER } from "./config";

export const const TasksFilters = () => {
  const isLoading = useStore($tasksListLoading);

  return (
    <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
      {filtersList.map(({ title, id }) => (
        <Radio.Button
          key={id}
          onClick={() => taskModel.setQueryConfig(getFilterById(id).config)}
          value={id}
          disabled={isLoading}
        >
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
```

#### (pages) Внедряем фильтрацию в страницу {#pages-implementing-filtering-in-the-page}

И мы снова реализовали логику, особо не задаваясь вопросами:

- А куда положить логику фильтрации?
- А могут ли эти фильтры переиспользоваться в будущем?
- А могут ли фильтры знать про контекст страницы?

Мы просто разделили логику согласно зонам ответственности (слоям)

```tsx title=pages/tasks-list/index.tsx
import { TasksFilters } from "features/tasks-filters";
...
<Layout.Toolbar className={styles.toolbar}>
    ...
    <Row justify="center">
        <TasksFilters />
    </Row>
</Layout.Toolbar>
```

:::note

**К текущему этапу, такое разбиение может показаться излишним - "Почему бы не положить все сразу на уровне страницы / фичи"?**

Но тогда попробуем задать себе вопросы:

- А где гарантии, что сложность страницы не увеличится в будущем настолько, что все аспекты логики сильно будут переплетены? Как при этом без лишних затрат добавлять новую функциональность?
- А где гарантии, что новый человек, пришедший в команду (или даже вы, если на полгода отойдете от проекта) - поймет, что здесь происходит?
- А как построить логику, чтобы не нарушить поток данных / реактивность с другими фичами?
- А что, если эта логика фильтрации настолько сильно прикрепится к контексту страницы, что ее будет невозможно использовать на других страницах?

Именно по этому мы и **разбиваем ответственность**, чтобы каждый слой занимался только одной задачей, и чтобы это понимал каждый из разработчиков

:::

### 2.6 Страница задачи {#26-task-page}

Аналогичным образом реализуем страницу задачи:

- Выделяем shared логику
- Выделяем entities логику
- Выделяем features логику
- Выделяем pages логику

#### (pages) Страница "Карточка задачи" {#pages-thetask-card-page}

```tsx title=pages/task-details/index.tsx
import { ToggleTask } from "features/toggle-task";
import { TaskCard, taskModel } from "entities/task";
import { Layout, Button } from "antd"; // ~ "shared/ui/{...}"
import styles from "./styles.module.scss";

const TaskDetailsPage = (props: Props) => {
    const taskId = Number(props.match?.params.taskId);
    const task = taskModel.useTask(taskId);
    const isLoading = useStore(taskModel.$taskDetailsLoading);

  /**
   * Запрашиваем данные по задаче
   * @remark Является плохой практикой в мире effector и представлено здесь - лишь для наглядной демонстрации
   * Лучше фетчить через event.pageMounted или reflect
   */
    useEffect(() => taskModel.getTaskByIdFx({ taskId }), [taskId]);

    // Можно часть логики перенести в entity/task/card (как контейнер)
    if (!task && !isLoading) {
        return ...
    }

    return (
        <Layout className={styles.root}>
            <Layout.Content className={styles.content}>
                <TaskCard
                    data={task}
                    size="default"
                    loading={isLoading}
                    className={styles.card}
                    bodyStyle={{ height: 400 }}
                    extra={<Link to="/">Back to TasksList</Link>}
                    actions={[
                        <ToggleTask key="toggle" taskId={taskId} />
                    ]}
                />
            </Layout.Content>
        </Layout>
    )
};
```

### 2.7 Что дальше? {#27-whats-next}

А дальше поступают новые задачи, выявляются новые требования

При этом старая кодовая база не требует значительных переработок

#### Появилась функциональность, завязанная на пользователе? {#has-the-functionality-tied-to-the-user-appeared}

=> Добавляем `entities/user`

#### Понадобилось поменять логику фильтрации? {#did-you-need-to-change-the-filtering-logic}

=> Меняем обработку на `entities` или `pages` уровне, в зависимости от масштабности

#### Нужно добавить больше фичей в карточку задачи, но при этом, чтобы ее можно было использовать по-старому? {#do-you-need-to-add-more-features-to-the-task-card-but-at-the-same-time-so-that-it-can-be-used-in-the-old-way}

=> Добавляем фичи и вставляем их в карточку только на нужной **странице**

#### Какой-то модуль стал слишком сложным для поддержки? {#has-a-module-become-too-complex-to-support}

 => Благодаря заложенной архитектуре, мы можем изолированно отрефакторить только этот модуль - без неявных сайд-эффектов для других [(и даже переписать с нуля)](https://youtu.be/BWAeYuWFHhs?t=1625)

## Итого {#summary}

### Мы научились применять методологию для базовых случаев {#we-have-learned-how-to-apply-the-methodology-for-basic-cases}

Понятно, что мир гораздо сложнее, но уже здесь мы зацепились за некоторые спорные моменты и разрешили их таким образом, чтобы проект оставался поддерживаемым и расширяемым.

### Мы получили масштабируемую и гибкую кодовую базу {#we-got-a-scalable-and-flexible-codebase}

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

### Пример {#example}

Ниже в [Codesandbox][ext-sandbox] представлен пример получившегося TodoApp, где можно подробно изучить финальную структуру приложения

<iframe class="codesandbox" src="https://codesandbox.io/embed/github/feature-sliced/examples/tree/master/todo-app?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&codemirror=1" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

## См. также {#see-also}

- [(Обзор) How to Organize Your React + Redux Codebase][ext-pluralsight]
  - Разбор нескольких подходов к структуризации React проектов
- [Гайды и примеры применения методологии (+ Миграция с v1)][refs-guides]
- [Про разбиение приложения][refs-splitting]
- [Справочный материал по методологии][refs-reference]

[refs-motivation]: /docs/about/motivation

[refs-needs]: /docs/about/understanding/needs-driven
[refs-public-api]: /docs/reference/public-api
[refs-splitting]: /docs/reference/units/decomposition

[refs-low-coupling]: /docs/reference/isolation/coupling-cohesion
[refs-guides]: /docs/guides
[refs-reference]: /docs/reference
[refs-layers]: /docs/reference/units/layers
[refs-app]: /docs/reference/units/layers/app
[refs-pages]: /docs/reference/units/layers/pages
[refs-features]: /docs/reference/units/layers/features
[refs-entities]: /docs/reference/units/layers/entities
[refs-shared]: /docs/reference/units/layers/shared

[ext-pluralsight]: https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase
[ext-pluralsight--flat]: https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase#module-theflatstructure
[ext-sandbox]: https://codesandbox.io/s/github/feature-sliced/examples/tree/master/todo-app
[ext-source-api]: https://github.com/feature-sliced/examples/tree/master/todo-app/src/shared/api
