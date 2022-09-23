---
sidebar_position: 7
---

# Entities

:::tip When to use?
When a lot of deunified logic appears in the project, often tied to specific entities
:::

![entities-themed-bordered](/img/layers/entities.png)

## Description

There are usually placed:

- business entities, for building the business logic of the application
    > *For example: `user`, `order`, `post`, `journal`, `navigation`, ...*
- components with the representation of entities, for building the UI of the overlying layers
    > *For example: `UserCard`, `TweetCard`, ...*

## Structure

```sh
└── entities/{slice}
          ├── lib/
          ├── model/
          ├── ui/
          └── index.ts
```

## Examples

### Using the Entity Model

```tsx title=**/**/index.tsx
import { viewerModel } from "entities/viewer";

export const Wallet = () => {
    const viewer = viewerModel.useViewer();
    const { moneyCount } = viewer;
    
    ...
}
```

### Using Entity components

```ts title=entities/book/index.ts
export { BookCard, ... } from "./ui";
export * as bookModel from "./model";
```

```tsx title=pages/**/index.tsx
import { BookCard } from "entities/book";

export const CatalogPage = () => {
    const bookQuery = ...;
    return (
        ...
        {bookQuery.map((book) => (
            <BookCard key={book.id} data={book} />
        ))}
        ...
    )
}
```
