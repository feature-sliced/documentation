---
sidebar_position: 20
pagination_next: guides/examples/auth
---

# 常见问题

:::info

您可以在我们的 [Telegram 聊天][telegram]、[Discord 社区][discord] 和 [GitHub Discussions][github-discussions] 中提问。

:::

### 有工具包或代码检查器吗？

有！我们有一个名为 [Steiger][ext-steiger] 的代码检查器来检查您项目的架构，以及通过 CLI 或 IDE 的[文件夹生成器][ext-tools]。

### 在哪里存储页面的布局/模板？

如果您需要纯标记布局，您可以将它们保存在 `shared/ui` 中。如果您需要在内部使用更高的 layers，有几个选项：

- 也许您根本不需要布局？如果布局只有几行，在每个页面中复制代码而不是试图抽象它可能是合理的。
- 如果您确实需要布局，您可以将它们作为单独的 widgets 或 pages，并在 App 中的路由配置中组合它们。嵌套路由是另一个选项。

### feature 和 entity 之间有什么区别？

_entity_ 是您的应用程序正在处理的现实生活概念。_feature_ 是为您的应用程序用户提供现实生活价值的交互，是人们想要对您的 entities 做的事情。

有关更多信息和示例，请参阅 [slices][reference-entities] 的参考页面。

### 我可以将 pages/features/entities 嵌入彼此吗？

可以，但这种嵌入应该在更高的 layers 中发生。例如，在 widget 内部，您可以导入两个 features，然后将一个 feature 作为 props/children 插入到另一个 feature 中。

您不能从一个 feature 导入另一个 feature，这被 [**layers 上的导入规则**][import-rule-layers] 禁止。

### Atomic Design 怎么办？

该方法论的当前版本不要求也不禁止将 Atomic Design 与 Feature-Sliced Design 一起使用。

例如，Atomic Design [可以很好地应用](https://t.me/feature_sliced/1653)于模块的 `ui` segment。

### 有关于 FSD 的有用资源/文章等吗？

有！https://github.com/feature-sliced/awesome

### 为什么我需要 Feature-Sliced Design？

它帮助您和您的团队在主要价值组件方面快速概览项目。标准化架构有助于加快入职速度并解决关于代码结构的争议。请参阅[动机][motivation]页面了解更多关于为什么创建 FSD 的信息。

### 新手开发者需要架构/方法论吗？

更倾向于需要

*通常，当您独自设计和开发项目时，一切都很顺利。但如果开发过程中有暂停，团队中添加了新的开发者 - 那么问题就会出现*

### 如何处理授权上下文？

在[这里](/docs/guides/examples/auth)有答案

[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-tools]: https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools
[import-rule-layers]: /docs/reference/layers#import-rule-on-layers
[reference-entities]: /docs/reference/layers#entities
[motivation]: /docs/about/motivation
[telegram]: https://t.me/feature_sliced
[discord]: https://discord.gg/S8MzWTUsmp
[github-discussions]: https://github.com/feature-sliced/documentation/discussions
