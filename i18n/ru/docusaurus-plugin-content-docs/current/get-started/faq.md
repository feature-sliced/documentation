---
sidebar_position: 20
pagination_next: guides/examples/auth
---

# FAQ

:::info

Свой вопрос можно задать в [Telegram-чате][telegram], [Discord-сообществе][discord] и [GitHub Discussions][github-discussions].

:::

### Существует ли тулкит или линтер? {#is-there-a-toolkit-or-a-linter}

Да! У нас есть линтер [Steiger][ext-steiger] для проверки архитектуры вашего проекта и [генераторы папок][ext-tools] через CLI или IDE.

### Где хранить layout/template страниц? {#where-to-store-the-layouttemplate-of-pages}

Если вам нужны простые шаблоны разметки, вы можете хранить их в `shared/ui`. Если вам нужно использовать более высокие слои, есть несколько вариантов:

- Возможно, вам вообще не нужны лейауты? Если макет состоит всего из нескольких строк, разумно будет дублировать код в каждой странице, а не пытаться абстрагировать его.
- Если вам нужны лейауты, вы можете хранить их как отдельные виджеты или страницы, и компоновать их в конфигурации роутера в App. Вложенный роутинг — еще один вариант.

### В чем отличие feature от entity? {#what-is-the-difference-between-feature-and-entity}

_Entity_ — это понятие из реальной жизни, с которым работает ваше приложение.. _Feature_ — это взаимодействие, представляющее реальную ценность для пользователей; что-то, что люди хотят делать с сущностями.

Для получения дополнительной информации, а также примеров, см. страницу [про слайсы][reference-entities] в разделе Reference.

### Могу ли я вкладывать страницы/фичи/сущности друг в друга? {#can-i-embed-pagesfeaturesentities-into-each-other}

Да, но это вложение должно происходить в более высоких слоях. Например, внутри виджета вы можете импортировать обе фичи, а затем вставить одну фичу в другую через пропсы/вложение.

Вы не можете импортировать одну фичу из другой фичи, это запрещено [**правилом импортов для слоёв**][import-rule-layers].

### А что с Atomic Design? {#what-about-atomic-design}

Текущая версия методологии не обязывает, но и не запрещает использовать Atomic Design вместе с Feature-Sliced Design.

При этом Atomic Design [хорошо применяется](https://t.me/feature_sliced/1653) для `ui` сегмента модулей.

### Есть ли какие-нибудь полезные ресурсы/статьи/т.д. по FSD? {#are-there-any-useful-resourcesarticlesetc-about-fsd}

Да! https://github.com/feature-sliced/awesome

### Зачем мне нужен Feature-Sliced Design? {#why-do-i-need-feature-sliced-design}

Он помогает вам и вашей команде быстро ознакомиться с проектом с точки зрения его основных компонентов, приносящих бизнес-ценность. Стандартизированная архитектура помогает ускорить онбординг и разрешать споры о структуре кода. См. страницу [Мотивация][motivation], чтобы узнать больше о том, почему FSD был создан.

### Нужна ли архитектура/методология начинающему разработчику? {#does-a-novice-developer-need-an-architecturemethodology}

Скорее да, чем нет

*Обычно, когда проектируешь разрабатываешь проект в одно лицо - все идет гладко. Но если появляются паузы в разработке, добавляются новые разработчики в команду - тогда-то и наступают проблемы*

### Как мне работать с контекстом авторизации? {#how-do-i-work-with-the-authorization-context}

Ответили [здесь](/docs/guides/examples/auth)

[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-tools]: https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools
[import-rule-layers]: /docs/reference/layers#import-rule-on-layers
[reference-entities]: /docs/reference/layers#entities
[motivation]: /docs/about/motivation
[telegram]: https://t.me/feature_sliced
[discord]: https://discord.gg/S8MzWTUsmp
[github-discussions]: https://github.com/feature-sliced/documentation/discussions
