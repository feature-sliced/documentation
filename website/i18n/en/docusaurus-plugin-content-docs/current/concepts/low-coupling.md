---
sidebar_position: 5
---

# Low Coupling & High Cohesion

Application modules should be designed as having **high cohesion** (aimed at solving one determined task) and **low coupling** (independent on other modules as possible)

![coupling-cohesion-themed](/img/coupling.png)

Within the framework of the methodology, this is achieved through:

* [Splitting the application][refs-splitting] into layers and slices-modules that implement specific functionality.
* The requirement for each module is to provide a [public access interface][refs-public-api]
* Introduction of special restrictions on [interaction of modules with each other][refs-cross-communication] - each module can depend only on "underlying" modules, but not on modules from the same or higher layer.

## Composition of components (UI level)

The majority of modern UI frameworks and libraries provide a component model in which each component can have its own properties, its own state and child components, as well as, often, slots.

This model allows you to assemble the interface as a **composition of various components that are not directly related to each other** and, thereby, achieve **low coupling** of the interface components

### Example

Let's consider such a composition using the example of a **list with a header:**

#### Laying the extensibility

The list component will not itself determine the type and structure of the header components and list elements, instead it will accept them as parameters

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

#### Using the composition

This allows you to **reuse and independently change** components of different versions of the header and list items. The components of the header and list elements can have both their local state and their binding to any parts of the general state of the application - the list component will not know anything about it, and therefore will not depend on it

```tsx
<List Header={<FancyHeader />} Items={<ToDoItems />} />

<List Items={<CartItems />} />

<List Header={<FancyHeaderV2 color="red" />} Items={<FancyItems />} />

```

## Layer composition (APP level)

The methodology suggests dividing the functionality that is valuable for the user into separate modules - [**features**][refs-features], and the logic related to business entities - [**entities**][refs-entities]. Both features and entities **should be designed as highly connected modules**, i.e. aimed at solving **one specific task** or concentrated around **one specific entity.**

All interactions between such modules, similar to the UI components from the example above, should be organized as a **composition of various modules.**

### Example

Using the example of a chat application with the following features

* you can open the contact list and select a friend
* you can open a conversation with a selected friend

Within the framework of the methodology, it can be represented something like this:

[Entities][refs-entities]

* User (contains the user's state)
* Contact (the state of the contact list, tools for working with an individual contact)
* Correspondence (the state of the current correspondence and working with it)

[Features][refs-features]

* The form of sending a message
* Correspondence selection menu

#### Let's tie it all together

The application, to begin with, will have one page, the interface will be based on a slightly modified component from the first example

```tsx title=page/main/ui.tsx
<List
    Header={<ConversationSwitch />}
    Items={<Messages />}
    Footer={<MessageInput />}
/>
```

#### Data model

The page data model will be organized as a **composition of features and entities**. In this example, the features will be implemented as factories and access the interface of entities through the parameters of these factories.

> However, the implementation in the form of a factory is optional - the feature may depend on the underlying layers and directly

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

## Total

1. Modules must have **high cohesion** (have one responsibility, solve one specific task) and provide [**public interface**][refs-public-api] access
2. **Low coupling** is achieved through the composition of elements-UI components, features and entities
3. Also, to reduce entanglement, modules **should depend on each other only through public interfaces** - this is how the independence of modules from each other's internal implementation is achieved

## See also

* [(Article) About Low Coupling and High Cohesion clearly](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
  * *The scheme at the beginning is inspired by this article*
* [(Article) Low Coupling and High Cohesion. The Law of Demeter](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
* [(Presentation) About design principles (including Low Coupling & High Cohesion)](https://www.slideshare.net/cristalngo/software-design-principles-57388843)

[refs-splitting]: /docs/concepts/app-splitting
[refs-public-api]: /docs/concepts/public-api
[refs-cross-communication]: /docs/concepts/cross-communication
[refs-features]: /docs/reference/layers/features
[refs-entities]: /docs/reference/layers/entities
