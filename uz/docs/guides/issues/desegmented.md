# Desegemented

WIP

Maqola yozilish jarayonida

Uning yaratilishini tezlashtirish uchun siz:

* 📢 Fikr-mulohaza ulashing [chiptada (sharhlar/reaksiya emoji)](https://github.com/feature-sliced/documentation/issues/148)
* 💬 Mavzu boyicha to'plamlarni chiptaga yig'ish [suhbatdan olingan material](https://t.me/feature_sliced)
* ⚒️ Hissa qo‘shish [har qanday boshqa yo'l bilan](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## Situation[​](#situation "Sarlavhaga to'g'ridan-to'g'ri havola")

Very often, there is a situation on projects when modules related to a specific domain from the subject area are unnecessarily desegmented and scattered around the project

```
├── components/
|    ├── DeliveryCard
|    ├── DeliveryChoice
|    ├── RegionSelect
|    ├── UserAvatar
├── actions/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── epics/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── constants/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── helpers/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── entities/
|    ├── delivery/
|    |      ├── getters.js
|    |      ├── selectors.js
|    ├── region/
|    ├── user/
```

## Problem[​](#problem "Sarlavhaga to'g'ridan-to'g'ri havola")

The problem manifests itself at least in violation of the principle of \* \* High Cohesion\*\* and excessive stretching \* \* of the axis of changes\*\*

## If you ignore it[​](#if-you-ignore-it "Sarlavhaga to'g'ridan-to'g'ri havola")

* If necessary, touch on the logic, for example, delivery - we will have to keep in mind that it lies in several places and touch on several places in the code-which unnecessarily stretches our \* \* Axis of changes\*\*
* If we need to study the logic of the user, we will have to go through the whole project to study in detail \* \* actions, epics, constants, entities, components\*\* - instead of it lying in one place
* Implicit connections and the uncontrollability of a growing subject area
* With this approach, the eye is very often blurred and you may not notice how we "create constants for the sake of constants", creating a dump in the corresponding project directory

## Solution[​](#solution "Sarlavhaga to'g'ridan-to'g'ri havola")

Place all modules related to a specific domain/user case - directly next to each other

So that when studying a particular module, all its components lie side by side, and are not scattered around the project

> It also increases the discoverability and clarity of the code base and the relationships between modules

```
- ├── components/
- |    ├── DeliveryCard
- |    ├── DeliveryChoice
- |    ├── RegionSelect
- |    ├── UserAvatar
- ├── actions/
- |    ├── delivery.js
- |    ├── region.js
- |    ├── user.js
- ├── epics/{...}
- ├── constants/{...}
- ├── helpers/{...}
  ├── entities/
  |    ├── delivery/
+ |    |      ├── ui/ # ~ components/
+ |    |      |   ├── card.js
+ |    |      |   ├── choice.js
+ |    |      ├── model/
+ |    |      |   ├── actions.js
+ |    |      |   ├── constants.js
+ |    |      |   ├── epics.js
+ |    |      |   ├── getters.js
+ |    |      |   ├── selectors.js
+ |    |      ├── lib/ # ~ helpers
  |    ├── region/
  |    ├── user/
```

## See also[​](#see-also "Sarlavhaga to'g'ridan-to'g'ri havola")

* [(Article) About Low Coupling and High Cohesion clearly](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
* [(Article) Low Coupling and High Cohesion. The Law of Demeter](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
