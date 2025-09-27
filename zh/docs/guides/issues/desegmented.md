# 去分段化

WIP

文章正在编写中

为了使文章更快发布，您可以：

* 📢 分享您的反馈[在文章中（评论/表情反应）](https://github.com/feature-sliced/documentation/issues/148)
* 💬 收集相关的[来自聊天的主题相关资料](https://t.me/feature_sliced)
* ⚒️ 贡献[以任何其他方式](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## 情况[​](#情况 "标题的直接链接")

在项目中经常出现这样的情况：与主题领域中特定域相关的模块被不必要地去分段化并分散在项目周围

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

## 问题[​](#问题 "标题的直接链接")

该问题至少表现为违反了**高内聚**原则和过度拉伸**变更轴**

## 如果您忽略它[​](#如果您忽略它 "标题的直接链接")

* 如果需要涉及逻辑，例如交付 - 我们必须记住它位于多个地方，并涉及代码中的多个地方 - 这不必要地拉伸了我们的**变更轴**
* 如果我们需要研究用户的逻辑，我们将不得不遍历整个项目来详细研究**actions、epics、constants、entities、components** - 而不是将其放在一个地方
* 隐式连接和不断增长的主题领域的不可控性
* 使用这种方法，眼睛经常会模糊，您可能不会注意到我们如何"为了常量而创建常量"，在相应的项目目录中创建垃圾场

## 解决方案[​](#解决方案 "标题的直接链接")

将与特定域/用户案例相关的所有模块 - 直接彼此相邻放置

这样，在研究特定模块时，其所有组件都并排放置，而不是分散在项目周围

> 它还增加了代码库的可发现性和清晰度以及模块之间的关系

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

## See also[​](#see-also "标题的直接链接")

* [(Article) About Low Coupling and High Cohesion clearly](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
* [(Article) Low Coupling and High Cohesion. The Law of Demeter](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
