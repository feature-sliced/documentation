---
sidebar_position: 1
---

# Overview

**Layer** - первый уровень разбиения приложения, согласно **скоупу влияния** модуля

![layers-flow-themed](/img/layers_flow.png)

## Структура

```sh
└── src/
    ├── app/                    # Инициализирующая логика приложения
    ├── processes/              # (Опц.) Процессы приложения, протекающие над страницами
    ├── pages/                  # Страницы приложения
    ├── features/               # Ключевая функциональность приложения
    ├── entities/               # Бизнес-сущности
    └── shared/                 # Переиспользуемые модули
```

## Ограничения

- Каждый слой располагается только на самом верхнем уровне, и не может встречаться еще раз на другом уровне вложенности
  - **Плохо:** `pages/../features/..`
- Каждый слой может использовать (импортировать) только нижележащие слои (сверху-вниз)
  - `app` > `processes` > `pages` > `features` > `entities` > `shared`
- Чем ниже расположен слой - тем больше опасности вносить в него изменения (снизу вверх)
  - `shared` > `entities` > `features` > `pages` > `processes` > `app`

| Layer     |                         Can use                        |                    Can be used by                   |
|-----------|:------------------------------------------------------:|:---------------------------------------------------:|
| app       | `shared`, `entities`, `features`, `pages`, `processes` |                          -                          |
| processes |        `shared`, `entities`, `features`, `pages`       |                        `app`                        |
| pages     |            `shared`, `entities`, `features`            |                  `processes`, `app`                 |
| features  |                  `shared`, `entities`                  |             `pages`, `processes`, `app`             |
| entities  |                        `shared`                        |       `features`, `pages`, `processes`, `app`       |
| shared    |                            -                           | `entities`, `features`, `pages`, `processes`, `app` |

## Представители

### `app`

<!-- **Инициализирующая логика приложения** -->

![app-themed-bordered](/img/layers/app.png)

### `processes`

<!-- **Бизнес-процессы приложения, управляющие страницами** -->

![processes-themed-bordered](/img/layers/processes.png)

### `pages`

![pages-themed-bordered](/img/layers/pages.png)

### `widgets`

![widgets-themed-bordered](/img/layers/widgets.png)

### `features`

<!-- **Части функциональности приложения** -->

![features-themed-bordered](/img/layers/features.png)

### `entities`

<!-- **Бизнес-сущности** -->

![entities-themed-bordered](/img/layers/entities.png)

### `shared`

<!-- **Переиспользуемые модули, без привязки к бизнес-логике** -->

![shared-themed-bordered](/img/layers/shared.png)

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
