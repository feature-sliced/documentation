---
sidebar_position: 1
---

# Обзор

**Layer** - первый уровень разбиения приложения, согласно **скоупу влияния** модуля

![layers-flow-themed](/img/layers_flow.png)

## Структура

```sh
└── src/
    ├── app/                    # Инициализирующая логика приложения
    ├── processes/              # (Опц.) Процессы приложения, протекающие над страницами
    ├── pages/                  # Страницы приложения
    ├── widgets/                # Самостоятельные и полноценные блоки из страниц
    ├── features/               # (Опц.) Обрабатываемые пользовательские сценарии
    ├── entities/               # (Опц.) Бизнес-сущности, которыми оперирует предметная область
    └── shared/                 # Переиспользуемые модули, без привязки к бизнес-логике
```

## Правила

- Каждый слой располагается только на самом верхнем уровне, и не может встречаться еще раз на другом уровне вложенности

    ```diff
    // Плохо
    - pages/../features/..
    - features/../entities/..
    // Хорошо
    + pages/**
    + features/**
    ```

- Каждый слой может использовать (импортировать) только нижележащие слои
- Чем выше расположен слой, тем выше уровень его ответственности и знаний о других слоях (сверху-вниз)
  - `app` > (`processes`) > `pages` > (`widgets`) > `features` > `entities` > `shared`
- Чем ниже расположен слой - тем он больше используется в верхних слоях, а значит и тем больше опасности вносить в него изменения (снизу вверх)
  - `shared` > `entities` > `features` > (`widgets`) > `pages` > (`processes`) > `app`

<!-- use: https://www.tablesgenerator.com/markdown_tables# -->

| Layer     |                              Can use                              |                         Can be used by                         |
|-----------|:-----------------------------------------------------------------:|:--------------------------------------------------------------:|
| app       | `shared`, `entities`, `features`, `widgets`, `pages`, `processes` |                                -                               |
| processes |        `shared`, `entities`, `features`, `widgets`, `pages`       |                              `app`                             |
| pages     |            `shared`, `entities`, `features`, `widgets`            |                       `processes`, `app`                       |
| widgets   |                  `shared`, `entities`, `features`                 |                   `pages`, `processes`, `app`                  |
| features  |                        `shared`, `entities`                       |             `widgets`, `pages`, `processes`, `app`             |
| entities  |                              `shared`                             |       `features`, `widgets`, `pages`, `processes`, `app`       |
| shared    |                                 -                                 | `entities`, `features`, `widgets`, `pages`, `processes`, `app` |

## Представители

<!-- Оставил фразы в комментариях, на случай, если решим их вернуть -->

:::note

Стоит понимать, что не все из приведенных слоев обязательны, а нужны лишь, когда **этого требует сложность проекта и разбухающая ответственность** в существующей структуре

:::

### [`app`][refs-app]

<!-- **Инициализирующая логика приложения** -->

![app-themed-bordered](/img/layers/app.png)

### [`processes`][refs-processes]

<!-- **Бизнес-процессы приложения, управляющие страницами** -->

![processes-themed-bordered](/img/layers/processes.png)

### [`pages`][refs-pages]

![pages-themed-bordered](/img/layers/pages.png)

### [`widgets`][refs-widgets]

![widgets-themed-bordered](/img/layers/widgets.png)

### [`features`][refs-features]

<!-- **Части функциональности приложения** -->

![features-themed-bordered](/img/layers/features.png)

### [`entities`][refs-entities]

<!-- **Бизнес-сущности** -->

![entities-themed-bordered](/img/layers/entities.png)

### [`shared`][refs-shared]

<!-- **Переиспользуемые модули, без привязки к бизнес-логике** -->

![shared-themed-bordered](/img/layers/shared.png)

## См. также

- [Адаптивность нейминга][refs-naming-adaptability]
- [Example: Viewer][refs-example-viewer]
  - *Пример распределения логики по слоям: от `shared` до `app`*
- [Про понимание потребностей пользователей и функциональность приложения][refs-needs]
  - *Для понимания слоя `features`*
- [(Дискуссия) Про переиспользуемые модули][disc-sharing]
  - *Для понимания слоя `shared`*

[refs-naming-adaptability]: /docs/concepts/naming-adaptability
[refs-needs]: /docs/concepts/needs-driven

[refs-low-coupling]: /docs/concepts/low-coupling
[refs-example-viewer]: /docs/guides/examples/auth

[refs-app]: /docs/reference/layers/app
[refs-processes]: /docs/reference/layers/processes
[refs-pages]: /docs/reference/layers/pages
[refs-widgets]: /docs/reference/layers/widgets
[refs-features]: /docs/reference/layers/features
[refs-entities]: /docs/reference/layers/entities
[refs-shared]: /docs/reference/layers/shared

[refs-segments]: /docs/reference/segments
[refs-segments--ui]: /docs/reference/segments#ui
[refs-segments--model]: /docs/reference/segments#model
[refs-segments--lib]: /docs/reference/segments#lib
[refs-segments--api]: /docs/reference/segments#api
[refs-segments--config]: /docs/reference/segments#config

[disc-sharing]: https://github.com/feature-sliced/documentation/discussions/14
