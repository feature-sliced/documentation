---
sidebar_position: 1
---

# Low Coupling & High Cohesion

Application modules should be designed according to **high cohesion** (should solve one specific task) and **low coupling** (independent of other modules) principles.

<figure>
    <img src="/img/coupling-cohesion-light.svg#light-mode-only" alt="" />
    <img src="/img/coupling-cohesion-dark.svg#dark-mode-only" alt="" />
    <figcaption>
        Image inspired by https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/
    </figcaption>
</figure>

Within the methodology, this is achieved through:

* Splitting the application into layers and slices that implement specific functionality
* Providing a [public access interface][refs-public-api] for each module
* Setting up restrictions for [modules interactions][refs-isolation] - each module can depend only on the modules below it, but not on modules from the same or higher layer

## Components composition (UI level)

The majority of modern UI frameworks and libraries provide a component model in which each component can have its own properties, state, child components, and even slots.

This model allows you to design an interface as a **composition of various components that are not directly related to each other** and, thereby, achieve **low coupling** of the interface components.

### Example

Let's consider such a composition using the example of a **list with a header:**

#### Laying the extensibility

List component will not itself define the look and structure of the header components and list elements, instead it will accept them as parameters

```tsx
interface ListProps {
    Header: React.ReactNode;
    Items: React.ReactNode;
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

This allows you to **reuse and independently change** components with different Header and list Items. Header and Items components can have both their own local state and their binding to the general state of the application - the List component will not know anything about it, and therefore will not depend on it

```tsx
<List Header={<FancyHeader />} Items={<ToDoItems />} />

<List Items={<CartItems />} />

<List Header={<FancyHeaderV2 color="red" />} Items={<FancyItems />} />

```

## Layer composition (APP level)

The methodology suggests putting the functionality that is valuable for the user into **features slice**, and the logic related to business entities - into **entities**. Both features and entities **should be designed as modules with high cohesion**, i.e. aimed at solving **one specific task** or related to **one specific entity.**

All interactions between such modules, similar to the UI components from the example above, should be coordinated via a **modules composition**.

### Example

Let's use an example of a chat application with the following features:

* user can open a contact list and select a friend
* user can open a conversation with a selected friend

According to methodology principles, it can be represented as:

Entities

* User (contains user's state)
* Contact (state of the contact list, utilities for working with an individual contact)
* Chat (the state of the current chat and utilies for it)

Features

* Form for sending a message
* Chat selection menu

#### Let's tie it all together

The application, to begin with, will have one page, and the interface will be slightly modified from the first example

```tsx title="page/main/ui.tsx"
<List
    Header={<ConversationSwitch />}
    Items={<Messages />}
    Footer={<MessageInput />}
/>
```

#### Data model

The page data model will be organized as a **composition of features and entities**. In this example, the features will be implemented as factories and they will access the interface of entities through the parameters of these factories.

> However, the implementation using factory is optional - the feature may directly depend on the lower layers.

```ts title="pages/main/model.ts"
import { userModel } from "entitites/user"
import { conversationModel } from "entities/conversation"
import { contactModel } from "entities/contact"

import { createMessageInput } from "features/message-input"
import { createConversationSwitch } from "features/conversation-switch"

import { beautifiy } from "shared/lib/beautify-text"

export const { allConversations, setConversation } = createConversationSwitch({
    contacts: contactModel.allContacts,
    setConversation: conversationModel.setConversation,
    currentConversation: conversationModel.conversation,
    currentUser: userModel.currentUser
})

export const { sendMessage, attachFile } = createMessageInput({
    author: userModel.currentUser
    send: conversationModel.sendMessage,
    formatMessage: beautify
})
```

## Summary

1. Modules must have **high cohesion** (have one responsibility, solve one specific task) and provide a [**public interface**][refs-public-api] access
2. **Low coupling** is achieved through the composition of elements - UI components, features and entities
3. To reduce entanglement, modules **should interact with each other only through a public interfaces** - this makes modules independent of each other's internal implementation

## See also

* [(Article) Low Coupling and High Cohesion in details](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
  * *The diagram at the beginning is inspired by this article*
* [(Article) Low Coupling and High Cohesion. The Law of Demeter](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
* [(Presentation) On design principles (including Low Coupling & High Cohesion)](https://www.slideshare.net/cristalngo/software-design-principles-57388843)

[refs-public-api]: /docs/reference/public-api
[refs-isolation]: /docs/reference/isolation
