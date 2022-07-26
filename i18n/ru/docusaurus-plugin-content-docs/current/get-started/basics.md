---
sidebar_position: 1
---

# Основы {#basics}

:::caution Предупреждение

Здесь представлена лишь основная информация по методологии

Для более грамотного применения, стоит ознакомится детальней с каждым понятием в соответствующем разделе документации

:::

## Концепции {#concepts}

### [`Public API`][refs-public-api]

Каждый модуль должен иметь на верхнем уровне **декларацию своего публичного API**

- Для подключения в другие модули, без нужды обращаться к внутренней структуре данного модуля
- Для изоляции деталей реализации от модулей-потребителей
- Также Public API должен защищать интерфейс модуля после рефакторинга - во избежание непредвиденных последствий

### [`Isolation`][refs-isolation]

Модуль не должен **зависеть напрямую** от других модулей того же слоя или вышележаших слоев

- Концепция известна также как [Low Coupling & High Cohesion][refs-low-coupling] - для предотвращения неявных связей / сайд-эффектов при разработке и рефакторинге

### [`Needs driven`][refs-needs-driven]

Ориентирование **на потребности бизнеса и пользователя**

- Включает в себя также разбиение структуры по бизнес-доменам *(["слоям"][refs-splitting-layers] и ["слайсам"][refs-splitting-slices])*

## Абстракции {#abstractions}

Для [проектирования архитектуры][refs-splitting] методология предлагает оперировать [привычными абстракциями][refs-adaptability], но в более консистентном и последовательном порядке.

### [`Layers`][refs-splitting-layers]

Первый уровень абстрагирования - **согласно скоупу влияния**

- `app` - инициализация приложения *(init, styles, providers, ...)*
- `processes` - бизнес-процессы приложения управляющие страницами *(payment, auth, ...)*
- `pages` - страницы приложения *(user-page, ...)*
- `features` - части функциональности приложения  *(auth-by-oauth, ...)*
- `entities` - бизнес-сущности *(viewer, order, ...)*
- `shared` - переиспользуемый инфраструктурный код *(UIKit, libs, API, ...)*

### [`Slices`][refs-splitting-slices]

Второй уровень абстрагирования - **согласно бизнес-домену**

Правила, по которым код разделяется на слайсы, *зависят от конкретного проекта и его бизнес-правил* и не определяются методологией

### [`Segments`][refs-splitting-segments]

Третий уровень абстрагирования - **согласно назначению в реализации**

- `ui` - UI-представление модуля *(components, widgets, canvas, ...)*
- `model` - бизнес-логика модуля *(store, effects/actions, hooks/contracts, ...)*
- `lib` - вспомогательные библиотеки
- `api` - логика взаимодействия с API
- `config` - модуль конфигурации приложения и его окружения

:::note

В большинстве случаев [рекомендуется][ext-disc-api] располагать `api` и `config` только в shared-слое

:::

## Структура {#structure}

```sh
└── src/
    ├── app/                    # Layer: Приложение
    |                           #
    ├── processes/              # Layer: Процессы (опционально)
    |   ├── {some-process}/     #     Slice: (н-р процесс CartPayment)
    |   |   ├── lib/            #         Segment: Инфраструктурная-логика (helpers/utils)
    |   |   └── model/          #         Segment: Бизнес-логика
    |   ...                     #
    |                           #
    ├── pages/                  # Layer: Страницы
    |   ├── {some-page}/        #     Slice: (н-р страница ProfilePage)
    |   |   ├── lib/            #         Segment: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Segment: Бизнес-логика
    |   |   └── ui/             #         Segment: UI-логика
    |   ...                     #
    |                           #
    ├── widgets/                # Layer: Виджеты
    |   ├── {some-feature}/     #     Slice: (н-р виджет Header)
    |   |   ├── lib/            #         Segment: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Segment: Бизнес-логика
    |   |   └── ui/             #         Segment: UI-логика
    |   ...                     #
    |                           #
    ├── features/               # Layer: Фичи
    |   ├── {some-feature}/     #     Slice: (н-р фича AuthByPhone)
    |   |   ├── lib/            #         Segment: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Segment: Бизнес-логика
    |   |   └── ui/             #         Segment: UI-логика
    |   ...                     #
    |                           #
    ├── entities/               # Layer: Бизнес-сущности
    |   ├── {some-entity}/      #     Slice: (н-р сущность User)
    |   |   ├── lib/            #         Segment: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Segment: Бизнес-логика
    |   |   └── ui/             #         Segment: UI-логика
    |   ...                     #
    |                           #
    ├── shared/                 # Layer: Переиспользуемые ресурсы
    |   ├── api/                #         Segment: Логика запросов к API
    |   ├── config/             #         Segment: Конфигурация приложения
    |   ├── lib/                #         Segment: Инфраструктурная-логика приложения
    |   └── ui/                 #         Segment: UIKit приложения
    |   ...                     #
    |                           #
    └── index.tsx/              #
```

## См. также {#see-also}

- [(Раздел) Фундаментальные концепции методологии][refs-concepts]
- [(Раздел) Гайды и примеры по применению методологии][refs-guides]
- [(Статья) Про разбиение логики в приложении. Модуляризация][refs-splitting]

[ext-disc-api]: https://github.com/feature-sliced/documentation/discussions/66

[refs-concepts]: /docs/concepts
[refs-public-api]: /docs/concepts/public-api
[refs-isolation]: /docs/concepts/cross-communication
[refs-needs-driven]: /docs/concepts/needs-driven
[refs-adaptability]: /docs/concepts/naming-adaptability

[refs-splitting]: /docs/concepts/app-splitting
[refs-splitting-layers]: /docs/concepts/app-splitting#group-layers
[refs-splitting-slices]: /docs/concepts/app-splitting#group-slices
[refs-splitting-segments]: /docs/concepts/app-splitting#group-segments

[refs-guides]: /docs/guides
[refs-low-coupling]: /docs/concepts/low-coupling
