[refs-naming-adaptability]: /docs/concepts/naming-adaptability.md

# Segments

`Segments` - третий уровень разбиения приложения, согласно **назначению модуля в коде и реализации**

```sh
{layer}/
    ├── {slice}/
    |   ├── ui/                     # UI-логика (components, ui-widgets, ...)
    |   ├── model/                  # Бизнес-логика (store, actions, effects, reducers, ...)
    |   ├── lib/                    # Инфраструктурная логика (utils/helpers)
    |   ├── config/                 # Конфигурация приложения(utils/helpers)
    |   └── api/                    # Логика запросов к API (api instances, requests, ...)
```

## `ui`

UI-представление модуля *(components, widgets, canvas, ...)*

## `model`

Бизнес-логика модуля *(store, effects/actions, hooks/contracts, ...)*

## `lib`

Вспомогательные библиотеки

## `api`

Логика взаимодействия с API

## `config`

Модуль конфигурации приложения и его окружения

## `shared`

Переиспользуемые модули

## См. также

> `WIP:` Со временем будут появляться статьи по каждой абстракции

- [Адаптивность нейминга][refs-naming-adaptability]
