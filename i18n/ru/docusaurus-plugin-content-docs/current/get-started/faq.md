---
sidebar_position: 20
pagination_next: guides/index
---

# FAQ

:::info

Свой вопрос можно задать в [telegram-чате](https://t.me/feature_sliced) / [github-issues](https://github.com/feature-sliced/documentation/issues) / [github-discussions](https://github.com/feature-sliced/documentation/discussions)

:::

### Структура = Архитектура? {#structure--architecture}

Архитектура - про абстракции и выстраивание связей между ними (shared/features/pages/...)

*Но без надлежащей структуры - хорошей архитектуры не сделать*

### Нужна ли мне методология только для "понимания и ясности" что происходит в проекте? {#do-i-need-a-methodology-only-for-understanding-and-clarity-of-what-is-happening-in-the-project}

Скорее да, чем нет

*Иначе приходится читать огромные директории `components/`...*

### Нужна ли архитектура/методология начинающему разработчику? {#does-a-novice-developer-need-an-architecturemethodology}

Скорее да, чем нет

*Обычно, когда проектируешь разрабатываешь проект в одно лицо - все идет гладко. Но если появляются паузы в разработке, добавляются новые разработчики в команду - тогда-то и наступают проблемы*

### Зачем нужна еще одна методология, когда все строится на принципах? {#why-do-we-need-another-methodology-when-everything-is-based-on-principles}

Ответили [здесь](/docs/about/motivation)

### Где найти примеры применения методологии? {#where-can-i-find-examples-of-applying-the-methodology}

В открытом доступе пока есть только такие, не все до конца адаптированы до последней версии

*В ближайшее время список будет пополняться и будет вынесен в отдельный раздел*

- [Internal Examples](https://github.com/feature-sliced/examples)
- [External Examples](/examples)

*Также можно ознакомиться с [гайдами](/docs/guides) и [туториалами](/docs/get-started)*

### Есть ли какие-нибудь полезные ресурсы/статьи/и т.д. по FSD и связанным вещам? {#are-there-some-useful-resources--articles--etc-about-fsd-and-related-things}

<https://github.com/feature-sliced/awesome>

### Проект написан на feature-slices v1, как обновиться и стоит ли? {#the-project-is-written-on-feature-slices-v1-how-to-update-and-is-it-worth-it}

Ответили [здесь](/docs/guides/migration/from-v1)

### Могу ли я вкладывать страницы/фичи/сущности друг в друга? {#can-i-embed-pagesfeaturesentities-into-each-other}

Ответили [здесь](/docs/reference/units/decomposition#group-slices)

### Как мне работать с контекстом авторизации? {#how-do-i-work-with-the-authorization-context}

Ответили [здесь](/docs/guides/examples/auth)

### А что с Atomic Design? {#what-about-atomic-design}

Текущая версия методологии не обязывает, но и не запрещает использовать Atomic Design вместе с Feature-Sliced Design

При этом Atomic Design [хорошо применяется](https://t.me/feature_sliced/1653) для `ui` сегмента модулей

### В чем отличие feature и entity? {#what-is-the-difference-between-feature-and-entity}

- `Entity` - бизнесовая **сущность**
  - blog-post / user / order / product / ...
- `Feature` - бизнесовая фича, **действие над сущностью**
  - create-blog-post / login-by-oauth / edit-account / publish-video / ...

См. также [справочную информацию по сравнению](/docs/reference/units/layers), [реализация viewer логики по слоям](/docs/guides/examples/auth)

### Где хранить layout/template страниц? {#where-to-store-the-layouttemplate-of-pages}

Общие шаблоны для разметки лучше хранить в `shared/ui`, но бывают [разные случаи](https://github.com/feature-sliced/documentation/discussions/129)

### А будет тулкит / линтеры? {#will-there-be-a-toolkit--linters}

Будет, на данный момент - в разработке =)

> Пока что, для сортировки / запрета импортов можно воспользоваться
>
> - `eslint-plugin-import`
> - `eslint-plugin-simple-import-sort`
> - `eslint-plugin-boundaries`
> - `dependency-cruiser`
>
> См. [базовый пример конфига](https://gist.github.com/azinit/4cb940a1d4a3e05ef47e15aa18a9ecc5)

### Могу ли я хранить фичи используемые на одной странице прямо в директории страницы? {#can-i-store-the-features-used-on-one-page-directly-in-the-page-directory}

Методология крайне не рекомендует так делать, поскольку [каждому модулю есть соответствующее место в структуре](/docs/reference/units/decomposition)

Иначе - есть риск усложнения кодовой базы проекта

> *"Сегодня фича может использоваться только на одной странице. На следующей неделе - на трех. А через месяц - ее может не быть совсем. Мы не можем предсказывать будущее, и нужно каждый раз воздерживаться от преждевременных оптимизаций"*

*См. также пример из [tutorial](/docs/get-started/tutorial#usual-approach)*
