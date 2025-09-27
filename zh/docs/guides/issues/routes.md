# 路由

WIP

文章正在编写中

为了使文章更快发布，您可以：

* 📢 分享您的反馈[在文章中（评论/表情反应）](https://github.com/feature-sliced/documentation/issues/169)
* 💬 收集相关的[来自聊天的主题相关资料](https://t.me/feature_sliced)
* ⚒️ 贡献[以任何其他方式](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## 情况[​](#情况 "标题的直接链接")

页面的 URL 在页面下方的层中硬编码

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

## 问题[​](#问题 "标题的直接链接")

URL 没有集中在页面层中，根据责任范围，它们应该属于页面层

## 如果您忽略它[​](#如果您忽略它 "标题的直接链接")

那么，在更改 URL 时，您必须记住这些 URL（以及 URL/重定向的逻辑）可以在除页面之外的所有层中

这也意味着现在即使是一个简单的产品卡片也承担了页面的部分责任，这模糊了项目的逻辑

## 解决方案[​](#解决方案 "标题的直接链接")

确定如何从页面级别及以上处理 URL/重定向

通过组合/props/工厂传递到下面的层

## 另请参阅[​](#另请参阅 "标题的直接链接")

* [(Thread) 如果我在 entities/features/widgets 中"缝合"路由会怎样](https://t.me/feature_sliced/4389)
* [(Thread) 为什么只在页面中模糊路由逻辑](https://t.me/feature_sliced/3756)
