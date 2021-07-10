---
sidebar_position: 7
---

# Entities

![entities-themed-bordered](/img/layers/entities.png)

## Описание

Здесь обычно находятся:

- бизнес-сущности, для построения бизнес-логики приложения
    > *Например: `user`, `order`, `post`, `journal`, `i18n`, `navigation`, ...*
- компоненты сущностей, для построения UI вышележащих слоев
    > *Например: `UserCard`, `LocalePicker`, ...*

## Структура

```sh
└── entities/{slice}
          ├── lib/
          ├── model/
          ├── ui/
          └── index.ts
```

## Примеры

### Использование модели сущностей

```tsx title=**/**/index.tsx
import { viewerModel } from "entities/viewer";

export const Wallet = () => {
    const viewer = viewerModel.useViewer();
    const { moneyCount } = viewer;
    
    ...
}
```

### Использование компонентов сущностей

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
            <Book key={book.id} data={book} />
        ))}
        ...
    )
}
```
