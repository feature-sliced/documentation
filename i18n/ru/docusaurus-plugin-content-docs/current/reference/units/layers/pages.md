---
sidebar_position: 4
---

# Pages

:::caution Предупреждение

**Работа со страницами и роутингом очень специфична от проекта к проекту**

Поэтому здесь приведены общие сведения по этому слою, адаптируйте под свой фреймворк по необходимости

:::

![pages-themed-bordered](/img/layers/pages.png)

## Описание {#description}

1. Здесь располагаются страницы приложения
    - соответствующие конкретному роуту
    - при необходимости - сгруппированные общей папкой / родительской страницей

1. Каждая страница должна иметь **максимально простую логику**
    - вся логика отображения, бизнес правил и прочего - должна реализовываться путем композиции нижележащих слоев (`shared`, `entitites`, `features`)
    - при этом взаимодействие между нижележащими слоями - также должно осуществляться чаще всего на странице
        - *Т.е. если `featureA` влияет на `featureB` на определенной странице - эта логика должна быть прописана в модели самой странице и только на ней!*
        - *Без кода в самих фичах и тем более, кросс-импортов!*

## Структура {#structure}

```sh
└── pages/{slice}
          ├── index.ts
          ├── lib.ts
          ├── model.ts
          └── ui.tsx
```

## Примеры {#examples}

### Страница оформления заказа {#checkout-page}

*Реализация бизнес-логики заказа очень зависит от вашего проекта, где-то порой это может регулироваться и процессами. Поэтому здесь приведена лишь одна из имплементаций*

```tsx title=pages/**/index.tsx
import { Order } from "features/order";
import { ProductCard } from "entities/product";
import { orderModel } from "entities/order";
import { Layout } from "shared/ui/layout"

export const CartPage = () => {
    const order = orderModel.useOrder();
    
    // Очень условная разметка
    return (
        {/** Используем shared (Layout) */}
        <Layout>
            <Layout.Main>
                ...
                {/** Используем entities (order.items, ProductCard) */}
                {order.items.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </Layout.Main>
            <Layout.Sidebar>
                ...
                {/** Используем features (Order.TotalInfo) */}
                <Order.TotalInfo />
            </Layout.Sidebar>
        </Layout>
    )
}
```
