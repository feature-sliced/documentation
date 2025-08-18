# Routing

WIP

The article is in the process of writing

To bring the release of the article closer, you can:

* 📢 Share your feedback [at article (comment/emoji-reaction)](https://github.com/feature-sliced/documentation/issues/169)
* 💬 Collect the relevant [material on the topic from chat](https://t.me/feature_sliced)
* ⚒️ Contribute [in any other way](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## Situation[​](#situation "Direct link to heading")

Urls to pages are hardcoded in the layers below pages

entities/post/card

```

<Card>
    <Card.Title 
        href={`/post/${data.id}`}
        title={data.name}
    />
    ...
</Card>
```

## Problem[​](#problem "Direct link to heading")

Urls are not concentrated in the page layer, where they belong according to the scope of responsibility

## If you ignore it[​](#if-you-ignore-it "Direct link to heading")

Then, when changing urls, you will have to keep in mind that these urls (and the logic of urls/redirects) can be in all layers except pages

And it also means that now even a simple product card takes part of the responsibility from the pages, which smears the logic of the project

## Solution[​](#solution "Direct link to heading")

Determine how to work with urls/redirects from the page level and above

Transfer to the layers below via composition/props/factories

## See also[​](#see-also "Direct link to heading")

* [(Thread) What if I "sew up" routing in entities/features/widgets](https://t.me/feature_sliced/4389)
* [(Thread) Why does it smear the logic of routes only in pages](https://t.me/feature_sliced/3756)
