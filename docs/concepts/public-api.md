# Публичное API модуля приложения

Каждая сущность методологии проектируется как **удобный в использовании и интеграции** модуль.

## Проектирование взаимодействия модуля с остальным приложением
Удобство использования и интеграции модуля достигается через выполнение ряда целей:

1. Приложение должно быть защищено от изменений внутренней структуры отдельных модулей
2. Переработка внутренней структуры модуля не должна затрагивать другие модули
3. Существенные изменения поведения модуля должны быть легко определяемы
> Существенные изменения поведения модуля - изменения, ломающие ожидания сущностей-пользователей модуля.

Достичь этих целей позволяет введение публичного интерфейса (Public API), представляющего собой единую точку доступа к возможностям модуля и определяющего "контракт" взаимодействия модуля с внешним миром.

   <details>

   > Структура сущности должна иметь единую точку входа, предоставляющую публичный интерфейс


   ```sh
   └── features/                        # 
     └── feature-name/                  # Внутренняя структура фичи
             ├── ui/                    #
             ├── model/                 #
             ├── {...}/                 #
             └── index.ts               # Энтрипоинт фичи с ее публичным API
   ```

   ```js
   // index.ts
   export { Form as AuthForm } from "./ui"
   export * as authFormStore from "./model"
   ```
   </details>


## Требования к публичному API

1. Public API должен осуществлять **контроль доступа** к содержимому модуля
   - Другие части приложения могут использовать **только те сущности модуля, которые представлены в публичном интерфейсе**
   - Внутренности модуля за пределами публичного интерфейса доступны только самому модулю.

    <details>

    > **Плохо**: Идет обращение напрямую к внутренним частям модуля, минуя публичный интерфейс доступа - опасно, особенно при рефакторинге модуля
    ```diff
    - import { Form } from "features/auth-form/components/view/form"
    - <Form ... />
    ```

    > **Хорошо:** API заранее экспортирует только нужное и разрешенное, разработчику модуля теперь нужно думать только о том, чтобы не ломать Public API при рефакторинге
    ```diff
    + import { AuthForm } from "features/auth-form"
    + <AuthForm ... />
    ```

    </details>

2. Public API должен быть **анти-хрупким** - устойчивым к изменениям внутри модуля
   - Ломающие изменения поведения модуля отражаются в изменении Public API
   > Например, изменение внутренней структуры не должно приводить к изменению Public API

   <details>

      > **Плохо:** перемещение или переименование этого компонента внутри фичи приведет к необходимости рефакторить импорты во всех местах использования компонента.
      ```diff
      - import { Form } from "features/auth-form/ui/form"
      ```
      > **Хорошо:** интерфейс фичи не отображает её внутреннуюю структуру, внешние "пользователи" фичи не пострадают от перемещения или переименования компонента внутри фичи
      ```diff
      + import { AuthForm } from "features/auth-form"
      ```

   </details>

3. Public API должен способствовать **легкой и гибкой интеграции**
   - Должен быть удобен для использования остальными частями приложения, в частности, решать проблему коллизии имен
    <details>

   > **Плохо:** будет коллизия имен
   ```js
   // features/auth-form/index.ts
   export { Form } from "./ui"
   export * as store from "./model"
   
   // features/post-form/index.ts
   export { Form } from "./ui"
   export * as store from "./model"
   ```
   ```diff
   - import { Form, store } from "features/auth-form"
   - import { Form, store } from "features/post-form"
   ```

   > **Хорошо:** коллизия решена на уровне интерфейса

   ```js
   // features/auth-form/index.ts
   export { Form as AuthForm } from "./ui"
   export * as authFormStore from "./model"
   
   // features/post-form/index.ts
   export { Form as PostForm } from "./ui"
   export * as postFormStore from "./model"
   ```
   ```diff
   + import { AuthForm, authFormStore } from "features/auth-form"
   + import { PostForm, postFormStore } from "features/post-form"
   ```
   ---
   > **Плохо:** неудобно писать, неудобно читать, "пользователь" фичи страдает
   ```diff
   - import { storeActionUpdateUserDetails } from "features/auth-form"
   - dispatch(storeActionUpdateUserDetails(...))
   ```

   > **Хорошо:** "пользователь" фичи получает доступ к нужным вещам итеративно и гибко
   ```diff
   + import { authFormStore } from "features/auth-form"
   + dispatch(authFormStore.actions.updateUserDetails(...))
   ```
   </details>

   - Коллизия имен должна решаться на уровне публичного интерфейса, а не реализации
   <details>

      > **Плохо:** коллизия имен решается на уровне реализации

      ```js
      // features/auth-form/index.ts
      export { AuthForm } from "./ui"
      export { authFormActions, authFormReducer } from "model"

      // features/post-form/index.ts
      export { PostForm } from "./ui"
      export { postFormActions, postFormReducer } from "model"
      ```

     > **Хорошо:** коллизия имен решается на уровне интерфейса

      ```js
      // features/auth-form/model.ts
      export { actions, reducer }
      // features/auth-form/index.ts
      export { Form as AuthForm } from "./ui"
      export * as authFormStore from "./model"
      
      // features/post-form/model.ts
      export { actions, reducer }
      // features/post-form/index.ts
      export { Form as PostForm } from "./ui"
      export * as postFormStore from "./model"
      ```
   </details>
  
Выполнение этих требований позволяет свести взаимодействие с модулем к **выполнению публичного интерфейса-контракта** и, тем самым, достичь надежности и удобства в использовании модуля.

## О реэкспортах
В JavaScript публичный интерфейс модуля создается с помощью реэкспорта сущностей изнутри модуля в `index.js` файле:

   ```js
   // index.ts
   export { Form as AuthForm } from "./ui"
   export * as authStore from "./model"
   ```

Файлы-реэкспорты имеют ряд недостатков:

1. В большинстве популярных бандлеров из-за реэкспортов код-сплиттинг работает хуже, т.к. [tree-shaking](https://webpack.js.org/guides/tree-shaking/) при таком подходе может безопасно отбросить только модуль целиком, но не его часть. 
   > Например, импорт `authStore` в модели страницы приведет к попаданию компонента `AuthForm` в чанк этой страницы, даже если этот компонент там не используется.

2. Как следствие, инициализация чанка становится дороже, т.к. браузер должен обработать все модули в нем, в том числе и те, что попали в бандл "за компанию"

**Возможные пути решения**
- `webpack` позволяет отметить файлы-реэкспорты как [**side effects free**](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) - это разрешает `webpack` использовать более агрессивные оптимизации при работе с таким файлом

## См. также
- [*Обсуждение* "Public API абстракции"](https://github.com/feature-sliced/wiki/discussions/41)
- [Принципы **SOLID**](https://ru.wikipedia.org/wiki/SOLID)
- [Паттерны **GRASP**](https://ru.wikipedia.org/wiki/GRASP)
