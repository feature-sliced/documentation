---
sidebar_position: 4
---

# Pages

:::caution

**Working with pages and routing is very specific for different projects**

- is the page the same slice
- can the page hierarchy be fractal in order to repeat the structure of routes
- etc.

Therefore, here is an overview of this layer (adapt to your framework if needed)

:::

![pages-themed-bordered](/img/layers/pages.png)

## Description

1. Here are the application pages
    - corresponding to a specific route
    - if necessary - grouped by a shared folder / parent page

1. Each page should have **as simple logic as possible**
    - all the logic of display, business rules and other things-should be implemented by composing the underlying layers (`shared`, `entitites`, `features`)
    - while the interaction between the underlying layers - should also be carried out most often on the page
        - *That is, if `featureA` affects `featureB` on a certain page - this logic should be written in the model of the page itself and only on it!*
        - *Without the code in the features themselves, and even more so, cross-imports!*

## Structure

```sh
└── pages/{slice}
          ├── index.ts
          ├── lib.ts
          ├── model.ts
          └── ui.tsx
```

## Examples

### Checkout page

*The implementation of the BL order depends very much on your project, sometimes it can be regulated by processes. Therefore, only one of the implementations is given here*

```tsx title=pages/**/index.tsx
import { Order } from "features/order";
import { ProductCard } from "entities/product";
import { orderModel } from "entities/order";
import { Layout } from "shared/ui/layout"

export const CartPage = () => {
    const order = orderModel.useOrder();
    
    // Very conditional markup
    return (
        {/** Using shared (Layout) */}
        <Layout>
            <Layout.Main>
                ...
                {/** Using entities (order.items, ProductCard)*/}
                {order.items.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </Layout.Main>
            <Layout.Sidebar>
                ...
                {/** Using features (Order. TotalInfo)*/}
                <Order.TotalInfo />
            </Layout.Sidebar>
        </Layout>
    )
}
```
