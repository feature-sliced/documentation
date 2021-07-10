---
sidebar_position: 5
---

# Widgets

`EXPERIMENTAL` `OPTIONAL`

![widgets-themed-bordered](/img/layers/widgets.png)

:::caution

Слой введен как экспериментальный, чтобы решить сложившиеся проблемы при использовании других слоев

Пока что для этого слоя не выработано лучших практик (помимо тех, что действуют для других слоев), поэтому используйте его только при необходимости и на свой страх и риск

*(например, если текущая сложность проекта требует этого)*

:::

## Описание

Здесь обычно располагаются самостоятельные и комплексные виджеты страниц, композирующие нижележащие слои

## Примеры

### Хедер приложения

**Хедер** - довольно обыденная часть веб-приложений

При этом все чаще на практике встречаются примеры, когда у нас не "один единый хедер на все приложение", а отличается от страницы к странице

И если первый вариант прост в реализации, то со вторым все становится не так тривиально:

- Либо переиспользуемый компонент хедера распологают не в том месте структуры, что вызывает кросс-импорты
- Либо же дублируют реализацию хедера на каждой странице (особенно когда в половине страниц используется один хедер, а в другой половине - второй)

**Слой виджетов призван как раз помочь с этим кейсом**

```tsx title=widgets/header/ui.tsx
import { SearchBar } from "features/search-bar";
import { Layout } from "shared/ui";

// Хедер может отличаться от страницы к странице
// При этом где-то должна композироваться эта логика
export const Header = ({ theme, withSearch, withNav ...}: Props) => (
    <Layout.Header theme={theme}>
        {withSearch && <SearchBar ... />}
        {withNav && <Navigation ... />}
        ...
    <Layout.Header>
)
```

```tsx title=pages/some-page/ui.tsx
import { Header } from "widgets/header";
import { Layout } from "shared/ui";

export const SomePage = () => (
    <Layout>
        {/* Хедер#1 на одной странице */}
        <Header sticky={true} />
        <Layout.Content>
            ...
        </Layout.Content>
    </Layout>
)
```

```tsx title=pages/another-page/ui.tsx
import { Header } from "widgets/header";
import { Layout } from "shared/ui";

export const AnotherPage = () => (
    <Layout>
        {/* Хедер#2 на другой странице */}
        <Header extra={...} theme={...} />
        <Layout.Content>
            ...
        </Layout.Content>
    </Layout>
)
```

### Карточка твита

```tsx title=widgets/tweet-item/ui.tsx
import { ShareTweet } from "features/tweets/share";
import { LikeTweet } from "features/tweets/like";
import { TweetCard } from "entities/tweet";
import { UserThumbnail } from "entities/user";

// Компонент использует шаблон для твитов из entities-слоя
// При этом снабжает его определенными фичами-действиями, 
// про который не положено знать entities-слою из-за своей зоны ответствнености
// 
// Также здесь используются другие фичи и сущности (например AuthorThumbnail)

// При этом если обычно такая композиция проводилась на уровне страницы, 
// Теперь, такая логика становится переиспользуемой 
// и забирает часть ответственности со страниц
// 
// Из-за чего страницы содержат лишь самую необходимую логику 
// (и становятся тонкими благодаря такому подходу)
export const TweetItem = ({ data, ...}: Props) => (
    <TweetCard
        before={<UserThumbnail withPopup={true} />}
        data={data}
        ...
        extra={[
            <LikeTweet key="like" tweetId={data.id} ... />
            <ShareTweet key="share" tweetId={data.id} ... />
        ]}
    />
);
```

### Карточка товара

Аналогично карточке твита
