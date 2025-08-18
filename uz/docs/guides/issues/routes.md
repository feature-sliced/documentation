# Routing

WIP

Maqola yozilish jarayonida

Uning yaratilishini tezlashtirish uchun siz:

* 📢 Fikr-mulohaza ulashing [chiptada (sharhlar/reaksiya emoji)](https://github.com/feature-sliced/documentation/issues/169)
* 💬 Mavzu boyicha to'plamlarni chiptaga yig'ish [suhbatdan olingan material](https://t.me/feature_sliced)
* ⚒️ Hissa qo‘shish [har qanday boshqa yo'l bilan](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## Situation[​](#situation "Sarlavhaga to'g'ridan-to'g'ri havola")

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

## Problem[​](#problem "Sarlavhaga to'g'ridan-to'g'ri havola")

Urls are not concentrated in the page layer, where they belong according to the scope of responsibility

## If you ignore it[​](#if-you-ignore-it "Sarlavhaga to'g'ridan-to'g'ri havola")

Then, when changing urls, you will have to keep in mind that these urls (and the logic of urls/redirects) can be in all layers except pages

And it also means that now even a simple product card takes part of the responsibility from the pages, which smears the logic of the project

## Solution[​](#solution "Sarlavhaga to'g'ridan-to'g'ri havola")

Determine how to work with urls/redirects from the page level and above

Transfer to the layers below via composition/props/factories

## See also[​](#see-also "Sarlavhaga to'g'ridan-to'g'ri havola")

* [(Thread) What if I "sew up" routing in entities/features/widgets](https://t.me/feature_sliced/4389)
* [(Thread) Why does it smear the logic of routes only in pages](https://t.me/feature_sliced/3756)
