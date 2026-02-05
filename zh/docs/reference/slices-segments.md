# Slices 和 segments

## Slices[​](#slices "标题的直接链接")

Slices 是 Feature-Sliced Design 组织层次结构中的第二级。它们的主要目的是按其对产品、业务或应用程序的意义对代码进行分组。

Slices 的名称没有标准化，因为它们直接由您应用程序的业务领域决定。例如，照片库可能有 slices `photo`、`effects`、`gallery-page`。社交网络将需要不同的 slices，例如 `post`、`comments`、`news-feed`。

Layers Shared 和 App 不包含 slices。这是因为 Shared 应该不包含任何业务逻辑，因此对产品没有意义，而 App 应该只包含涉及整个应用程序的代码，所以不需要分割。

### 零耦合和高聚合[​](#zero-coupling-high-cohesion "标题的直接链接")

Slices 旨在成为独立且高度聚合的代码文件组。下面的图形可能有助于可视化\_聚合性\_和\_耦合性\_这些复杂的概念：

![](/zh/img/coupling-cohesion-light.svg#light-mode-only)![](/zh/img/coupling-cohesion-dark.svg#dark-mode-only)

Image inspired by <https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/>

理想的 slice 独立于其 layer 上的其他 slices（零耦合）并包含与其主要目标相关的大部分代码（高聚合）。

切片的独立性由[层级导入规则](/zh/docs/reference/layers.md#import-rule-on-layers)强制执行：

> *切片中的模块（文件）只能在其他切片位于严格较低的层级时导入它们。*

### 切片的公共API规则[​](#切片的公共api规则 "标题的直接链接")

在切片内部，代码可以按你想要的任何方式组织。只要切片为其他切片提供良好的公共API来使用它，这就不会造成任何问题。这通过**切片的公共API规则**来强制执行：

> *每个切片（以及没有切片的层级上的段）都必须包含公共API定义。*
>
> *此切片/段之外的模块只能引用公共API，而不能引用切片/段的内部文件结构。*

在[公共API参考](/zh/docs/reference/public-api.md)中阅读更多关于公共API的基本原理和创建最佳实践的信息。

### 切片组[​](#切片组 "标题的直接链接")

密切相关的切片可以在文件夹中进行结构化分组，但它们应该遵循与其他切片相同的隔离规则 — 该文件夹中应该**没有代码共享**。

![Features \&quot;compose\&quot;, \&quot;like\&quot; and \&quot;delete\&quot; grouped in a folder \&quot;post\&quot;. In that folder there is also a file \&quot;some-shared-code.ts\&quot; that is crossed out to imply that it\&#39;s not allowed.](/zh/assets/images/graphic-nested-slices-b9c44e6cc55ecdbf3e50bf40a61e5a27.svg)

## Segments[​](#segments "标题的直接链接")

段是组织层次结构中的第三级也是最后一级，其目的是按技术性质对代码进行分组。

有几个标准化的段名称：

* `ui` — 与UI显示相关的一切：UI组件、日期格式化器、样式等。
* `api` — 后端交互：请求函数、数据类型、映射器等。
* `model` — 数据模型：模式、接口、存储和业务逻辑。
* `lib` — 此切片上其他模块需要的库代码。
* `config` — 配置文件和功能标志。

查看[层级页面](/zh/docs/reference/layers.md#layer-definitions)了解这些段在不同层级上可能用于什么的示例。

你也可以创建自定义段。自定义段最常见的地方是App层和Shared层，在这些层中切片没有意义。

确保这些段的名称描述内容的目的，而不是其本质。例如，`components`、`hooks`和`types`是不好的段名称，因为它们在你寻找代码时没有太大帮助。
