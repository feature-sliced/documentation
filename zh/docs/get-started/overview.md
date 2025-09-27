# 概览

**Feature-Sliced Design**（FSD）是一种用于构建前端应用程序的架构方法论。简单来说，它是组织代码的规则和约定的汇编。该方法论的主要目的是在不断变化的业务需求面前，使项目更加易于理解和稳定。

除了一系列约定外，FSD 还是一个工具链。我们有一个 [代码检查器](https://github.com/feature-sliced/steiger) 来检查您项目的架构，通过 CLI 或 IDE 的[文件夹生成器](https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools)，以及丰富的[示例](/documentation/zh/examples.md)库。

## 它适合我吗？[​](#is-it-right-for-me "标题的直接链接")

FSD 可以在任何规模的项目和团队中实施。如果您的项目符合以下条件，那么它就适合您：

* 您正在做**前端**开发（网页、移动端、桌面端等 UI）
* 您正在构建一个**应用程序**，而不是一个库

就是这样！对于您使用的编程语言、UI 框架或状态管理器没有任何限制。您也可以逐步采用 FSD，在 monorepos 中使用它，并通过将应用程序分解为包并在其中单独实施 FSD 来扩展到很大的长度。

如果您已经有了一个架构并正在考虑切换到 FSD，请确保当前的架构在您的团队中**造成了麻烦**。例如，如果您的项目变得过于庞大和相互连接，无法高效地实现新功能，或者如果您期望有很多新成员加入团队。如果当前的架构运作良好，也许不值得更改。但如果您确实决定迁移，请参阅[迁移](/documentation/zh/docs/guides/migration/from-custom.md)部分获取指导。

## 基本示例[​](#basic-example "标题的直接链接")

这里是一个实现了 FSD 的简单项目：

* `📁 app`
* `📁 pages`
* `📁 shared`

这些顶级文件夹被称为\_层\_。让我们更深入地看看：

* `📂 app`

  * `📁 routes`
  * `📁 analytics`

* `📂 pages`

  * `📁 home`

  * `📂 article-reader`

    * `📁 ui`
    * `📁 api`

  * `📁 settings`

* `📂 shared`

  * `📁 ui`
  * `📁 api`

`📂 pages` 内的文件夹被称为\_切片\_。它们按领域分割层（在这种情况下，按页面分割）。

`📂 app`、`📂 shared` 和 `📂 pages/article-reader` 内的文件夹被称为\_段\_，它们按技术目的分割切片（或层），即代码的用途。

## 概念[​](#concepts "标题的直接链接")

Layers、slices 和 segments 形成这样的层次结构：

![Hierarchy of FSD concepts, described below](/documentation/zh/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

上图显示：三个支柱，从左到右分别标记为 "Layers"、"Slices" 和 "Segments"。

"Layers" 支柱包含七个从上到下排列的部分，分别标记为 "app"、"processes"、"pages"、"widgets"、"features"、"entities" 和 "shared"。"processes" 部分被划掉了。"entities" 部分连接到第二个支柱 "Slices"，表示第二个支柱是 "entities" 的内容。

"Slices" 支柱包含三个从上到下排列的部分，分别标记为 "user"、"post" 和 "comment"。"post" 部分以同样的方式连接到第三个支柱 "Segments"，表示它是 "post" 的内容。

"Segments" 支柱包含三个从上到下排列的部分，分别标记为 "ui"、"model" 和 "api"。

### Layers[​](#layers "标题的直接链接")

Layers 在所有 FSD 项目中都是标准化的。您不必使用所有的 layers，但它们的名称很重要。目前有七个（从上到下）：

1. **App** — 使应用程序运行的一切 — 路由、入口点、全局样式、providers。
2. **Processes**（已废弃）— 复杂的跨页面场景。
3. **Pages** — 完整页面或嵌套路由中页面的大部分。
4. **Widgets** — 大型自包含的功能或 UI 块，通常提供整个用例。
5. **Features** — 整个产品功能的\_可重用\_实现，即为用户带来业务价值的操作。
6. **Entities** — 项目处理的业务实体，如 `user` 或 `product`。
7. **Shared** — 可重用功能，特别是当它与项目/业务的具体细节分离时，但不一定如此。

注意

Layers **App** 和 **Shared** 与其他 layers 不同，它们没有 slices，直接分为 segments。

然而，所有其他 layers — **Entities**、**Features**、**Widgets** 和 **Pages**，保持您必须首先创建 slices 的结构，在其中创建 segments。

Layers 的技巧是一个 layer 上的模块只能了解并从严格位于下方的 layers 的模块中导入。

### Slices[​](#slices "标题的直接链接")

接下来是 slices，它们按业务领域分割代码。您可以自由选择它们的名称，并根据需要创建任意数量。Slices 通过将逻辑相关的模块保持在一起，使您的代码库更容易导航。

Slices 不能使用同一 layer 上的其他 slices，这有助于实现高聚合性和低耦合性。

### Segments[​](#segments "标题的直接链接")

Slices 以及 layers App 和 Shared 由 segments 组成，segments 按代码的目的对代码进行分组。Segment 名称不受标准约束，但有几个最常见目的的传统名称：

* `ui` — 与 UI 显示相关的一切：UI 组件、日期格式化程序、样式等。
* `api` — 后端交互：请求函数、数据类型、mappers 等。
* `model` — 数据模型：schemas、interfaces、stores 和业务逻辑。
* `lib` — 此 slice 上其他模块需要的库代码。
* `config` — 配置文件和 feature flags。

通常这些 segments 对于大多数 layers 来说已经足够，您只会在 Shared 或 App 中创建自己的 segments，但这不是一个规则。

## 优势[​](#advantages "标题的直接链接")

* **统一性**<br /><!-- -->由于结构是标准化的，项目变得更加统一，这使得团队新成员的入职更加容易。

* **面对变化和重构的稳定性**<br /><!-- -->一个 layer 上的模块不能使用同一 layer 上的其他模块，或者上层的 layers。<br /><!-- -->这允许您进行独立的修改，而不会对应用程序的其余部分产生不可预见的后果。

* **可控的逻辑重用**<br /><!-- -->根据 layer，您可以使代码非常可重用或非常本地化。<br /><!-- -->这在遵循 **DRY** 原则和实用性之间保持平衡。

* **面向业务和用户需求**<br /><!-- -->应用程序被分割为业务领域，并鼓励在命名中使用业务语言，这样您可以在不完全理解项目的所有其他不相关部分的情况下做有用的产品工作。

## 渐进式采用[​](#incremental-adoption "标题的直接链接")

如果您有一个现有的代码库想要迁移到 FSD，我们建议以下策略。我们在自己的迁移经验中发现它很有用。

1. 首先逐模块地慢慢塑造 App 和 Shared layers 以创建基础。

2. 使用粗略的笔触将所有现有 UI 分布在 Widgets 和 Pages 中，即使它们有违反 FSD 规则的依赖。

3. 开始逐渐解决导入违规，并提取 Entities，甚至可能提取 Features。

建议在重构时避免添加大型新实体，或者只重构项目的某些部分。

## 下一步[​](#next-steps "标题的直接链接")

* \*\*想要好好掌握如何用 FSD 思维？\*\*查看[Tutorial](/documentation/zh/docs/get-started/tutorial.md)。
* \*\*喜欢从示例中学习？\*\*我们在 [Examples](/documentation/zh/examples.md) 部分有很多内容。
* \*\*有问题？\*\*访问我们的 [Telegram 聊天](https://t.me/feature_sliced) 并从社区获得帮助。
