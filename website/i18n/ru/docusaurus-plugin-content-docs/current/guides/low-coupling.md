---
sidebar_position: 5
---

# Low Coupling & High Cohesion

Модули приложения должны проектироваться как обладающие **сильной связностью** (направленные на решение одной четкой задачи) и **слабой зацепленностью** (как можно менее зависимые от других модулей)

![coupling-cohesion-themed](/img/coupling.png)

В рамках методологии это достигается через:

* [Разбиение приложения][refs-splitting] на слои и слайсы - модули, реализующие конкретную функциональность.
* Требование к каждому модулю - предоставлять [публичный интерфейс доступа][refs-public-api]
* Введение специальных ограничений на [взаимодействие модулей между собой][refs-cross-communication] - каждый модуль может зависеть только от "нижележащих" модулей, но не от модулей с того же или более высокого слоя.

## Композиция компонентов (UI level)

Абсолютное большинство современных UI-фреймоворков и библиотек предоставляют компонентную модель, в которой каждый компонент может иметь собственные свойства, собственное состояние и дочерние компоненты, а также, зачастую, слоты.

Такая модель позволяет собирать интерфейс как **композицию различных, напрямую не связанных между собой компонентов** и, тем самым, достигать **слабой зацепленности** компонентов интерфейса

### Пример

Рассмотрим такую композицию на примере **списка с хедером:**

#### Закладываем расширяемость

Компонент списка не будет сам определять вид и структуру компонентов хедера и элементов списка, вместо этого будет принимать их в качестве параметров

```tsx
interface ListProps {
    Header: Component;
    Items: Component;
}

const List: Component<ListProps> = ({ Header, Items }) => (
    <div class="wrapper">
        {Header}
        <ul class="...">
            {Items}
        </ul>
    </div>
)

```

#### Используем композицию

Это позволяет **переиспользовать и независимо изменять** компоненты различных версий хедера и элементов списка. Компоненты хедера и элементов списка могут иметь как свое локальное состояние, так и свою привязку к любым частям общего состояния приложения - компонент списка не будет ничего про это знать, а следовательно, не будет от этого зависеть

```tsx
<List Header={<FancyHeader />} Items={<ToDoItems />} />

<List Items={<CartItems />} />

<List Header={<FancyHeaderV2 color="red" />} Items={<FancyItems />} />

```

## Композиция слоев (APP level)

Методология предлагает разделять ценную для пользователя функциональность на отдельные модули - [**фичи (features)**][refs-features], а логику, относящуюся к бизнес сущностям - в [**сущности (entities)**][refs-entities]. И фичи, и сущности **должны проектироваться как высоко-связные модули**, т.е. направленные на решение **одной конкретной задачи** или сконцентрированные вокруг **одной конкретной сущности.**

Все взаимодействия между такими модулями, аналогично UI-компонентам из примера выше, должны быть организованы как **композиция различных модулей.**

### Пример

На примере приложения-чата с такими возможностями

* можно открыть список контактов и выбрать друга
* можно открыть переписку с выбранным другом

В рамках методологии, это может быть представлено примерно так:

[Entities][refs-entities]

* Пользователь (содержит состояние пользователя)
* Контакт (состояние списка контактов, инструменты для работы с отдельным контактом)
* Переписка (состояние текущей переписки и работа с ней)

[Features][refs-features]

* Форма отправки сообщения
* Меню выбора переписки

#### Свяжем все это вместе

В приложении, для начала, будет одна страница, интерфейс будет основан на слегка модифицированном компоненте из первого примера

```tsx title=page/main/ui.tsx
<List
    Header={<ConversationSwitch />}
    Items={<Messages />}
    Footer={<MessageInput />}
/>
```

#### Модель данных

Модель данных страницы будет организована как **композиция фич и сущностей**. В рамках этого примера фичи будут реализованы как фабрики и получать доступ к интерфейсу сущностей через параметры этих фабрик.

> Однако, реализация в виде фабрики необязательна - фича может зависеть от нижележащих слоев и напрямую

```ts title=pages/main/model.ts
import { userStore } from "entitites/user"
import { conversationStore } from "entities/conversation"
import { contactStore } from "entities/contact"

import { createMessageInput } from "features/message-input"
import { createConversationSwitch } from "features/conversation-switch"

import { beautifiy } from "shared/lib/beautify-text"

export const { allConversations, setConversation } = createConversationSwitch({
    contacts: contactStore.allContacts,
    setConversation: conversationStore.setConversation,
    currentConversation: conversationStore.conversation,
    currentUser: userStore.currentUser
})

export const { sendMessage, attachFile } = createMessageInput({
    author: userStore.currentUser
    send: conversationStore.sendMessage,
    formatMessage: beautify
})
```

## Итого

1. Модули должны обладать **сильной связностью** (иметь одну ответственность, решать одну конкретную задачу) и предоставлять [**публичный интерфейс**][refs-public-api] доступа
2. **Слабая зацепленность** достигается через композицию элементов - компонентов UI, фич и сущностей
3. Также, для снижения зацепленности, модули **должны зависеть друг от друга только через публичные интерфейсы** - так достигается независимость модулей от внутренней реализации друг друга

## См. также

* [(Статья) Про Low Coupling и High Cohesion наглядно](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
  * *Схема в начале вдохновлена именно этой статьей*
* [(Статья) Low Coupling и High Cohesion. Закон Деметры](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
* [(Презентация) Про принципы проектирования (включая Low Coupling & High Cohesion)](https://www.slideshare.net/cristalngo/software-design-principles-57388843)

[refs-splitting]: /docs/concepts/app-splitting
[refs-public-api]: /docs/concepts/public-api
[refs-cross-communication]: /docs/concepts/cross-communication
[refs-features]: /docs/reference/layers/features
[refs-entities]: /docs/reference/layers/entities
