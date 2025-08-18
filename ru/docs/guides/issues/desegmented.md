# Десегментация

WIP

Статья находится в процессе написания

Чтобы ускорить ее появление, можно:

* 📢 Поделиться обратной связью [в тикете (комментарии/эмодзи-реакция)](https://github.com/feature-sliced/documentation/issues/148)
* 💬 Собрать в тикет накопленный по теме [материал из чата](https://t.me/feature_sliced)
* ⚒️ Посодействовать [любым другим способом](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## Ситуация[​](#situation "Прямая ссылка на этот заголовок")

Очень часто на проектах встречается ситуация, когда модули, относящиеся к конкретному домену из предметной области, излишне десегментированы и раскиданы по проекту

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

## Проблема[​](#problem "Прямая ссылка на этот заголовок")

Проблема проявляется как минимум в нарушении принципа **High Cohesion** и излишнего растягивания **оси изменений**

## Если проигнорировать[​](#if-you-ignore-it "Прямая ссылка на этот заголовок")

* При необходимости затронуть логику, например, доставки - нам придется держать в голове, что она лежит в нескольких местах и затронуть в коде именно несколько мест - что излишне растягивает нашу **Ось изменений**
* Если нам надо изучить логику по пользователю, нам придется пройтись по всему-всему проекту, чтобы изучить в деталях **actions, epics, constants, entities, components** - вместо того, чтобы это лежало в одном месте
* Неявные связи и неконтролируемость растущей предметной области
  <!-- -->
  * При таком подходе очень часто замыливается глаз и можно не заметить, как мы "создаем константы ради констант", создавая свалку в соответствующей директории проекта

## Решение[​](#solution "Прямая ссылка на этот заголовок")

Располагать все модули, относящиеся к конкретному домену/юзкейсу - непосредственно рядом

Чтобы при изучении конкретного модуля - все его составляющие лежали рядом, а не были раскиданы по проекту

> Это также повышает discoverability и явность кодовой базы и связей между модулями

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

## См. также[​](#see-also "Прямая ссылка на этот заголовок")

* [(Статья) Про Low Coupling и High Cohesion наглядно](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
* [(Статья) Low Coupling и High Cohesion. Закон Деметры](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
