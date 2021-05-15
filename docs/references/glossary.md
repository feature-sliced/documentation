[refs-splitting]: /docs/references/abstractions.md
[refs-layers]: layers/readme.md
[refs-segments]: segments/readme.md

# Glossary

## `Module`

Структурная единица проекта

Под модулем обычно подразумевается определенный файл или директория *(абстракция в контексте структуры)*
- *модуль авторизации*
- *модуль страниц*
- *модуль компонента в фиче*
- *модуль экшенов в модели сущности*
- *и т.д.*

## [`Layer`][refs-layers]

Каждая из директорий, находящихся на самом верхнем уровне приложения.

- **Представители**: `app`, `processes`, `pages`, `features`, `entities`, `shared`

```sh
└── src/
    ├── app/                    # Инициализирующая логика приложения
    ├── processes/              # (Опц.) Процессы приложения, протекающие над страницами
    ├── pages/                  # Страницы приложения
    ├── features/               # Ключевой функционал приложения (разбитый по фичам)
    ├── entities/               # Бизнес-сущности
    └── shared/                 # Переиспользуемые модули
```

## `Slice`

Каждый из элементов, находящихся на верхнем уровне слоёв 

*Наиболее применимо для `processes`, `features`, `entities`*

```sh
{layer}/{slice}/
    |   ├── ui/                     # UI-логика (components, ui-widgets, ...)
    |   ├── model/                  # Бизнес-логика (store, actions, effects, reducers, ...)
    |   ├── lib/                    # Инфраструктурная логика (utils/helpers)
    |   └── api/                    # Логика запросов к API (api instances, requests, ...)
```

## [`Segments`][refs-segments]

Каждый из модулей, находящийся на верхнем уровне каждого слайса

- **Представители**: `ui`, `model`, `lib`, `api`, `confg`

```sh
{layer}/
    ├── {slice}/
    |   ├── ui/                     # UI-логика (components, ui-widgets, ...)
    |   ├── model/                  # Бизнес-логика (store, actions, effects, reducers, ...)
    |   ├── lib/                    # Инфраструктурная логика (utils/helpers)
    |   ├── config/                 # Конфигурация приложения (env-vars, ...)
    |   └── api/                    # Логика запросов к API (api instances, requests, ...)
```

> **Примечание:** Поскольку не каждый из слоев в явном виде использует слайсы (app, pages, shared)
> - Сегменты могут располагаться по своим правилам *(shared/ui, shared/api)*
> - Или не использоваться совсем *(app/hocs, app/styles)*

## См. также
- [Уровни абстракций по методологии][refs-splitting]
