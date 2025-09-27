# 从v2.0到v2.1的迁移

v2.1的主要变化是分解界面的新思维模型——页面优先。

在v2.0中，FSD会建议识别界面中的实体和功能，甚至考虑实体表示和交互性的最小部分进行分解。然后你会从实体和功能构建小部件和页面。在这种分解模型中，大部分逻辑都在实体和功能中，页面只是组合层，本身没有太多意义。

在v2.1中，我们建议从页面开始，甚至可能就停在那里。大多数人已经知道如何将应用程序分离为单独的页面，页面也是在代码库中尝试定位组件时的常见起点。在这种新的分解模型中，你将大部分UI和逻辑保留在每个单独的页面中，在Shared中维护可重用的基础。如果需要在多个页面之间重用业务逻辑，你可以将其移动到下面的层级。

Feature-Sliced Design的另一个新增功能是使用`@x`标记法标准化实体之间的交叉导入。

## 如何迁移[​](#how-to-migrate "标题的直接链接")

v2.1中没有破坏性更改，这意味着使用FSD v2.0编写的项目在FSD v2.1中也是有效的项目。但是，我们相信新的思维模型对团队更有益，特别是对新开发者的入职，所以我们建议对你的分解进行小的调整。

### 合并切片[​](#合并切片 "标题的直接链接")

一个简单的开始方式是在项目上运行我们的linter，[Steiger](https://github.com/feature-sliced/steiger)。Steiger是基于新的思维模型构建的，最有用的规则将是：

* [`insignificant-slice`](https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/insignificant-slice) — 如果一个实体或功能只在一个页面中使用，此规则将建议将该实体或功能完全合并到页面中。
* [`excessive-slicing`](https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/excessive-slicing) — 如果一个层级有太多切片，这通常是分解过于细粒度的标志。此规则将建议合并或分组一些切片以帮助项目导航。

```
npx steiger src
```

这将帮助你识别哪些切片只使用一次，以便你可以重新考虑它们是否真的必要。在这种考虑中，请记住层级为其内部的所有切片形成某种全局命名空间。就像你不会用只使用一次的变量污染全局命名空间一样，你应该将层级命名空间中的位置视为有价值的，要谨慎使用。

### 标准化交叉导入[​](#标准化交叉导入 "标题的直接链接")

如果你的项目之前有交叉导入（我们不评判！），你现在可以利用Feature-Sliced Design中交叉导入的新标记法——`@x`标记法。它看起来像这样：

entities/B/some/file.ts

```
import type { EntityA } from "entities/A/@x/B";
```

更多详情，请查看参考中的[交叉导入的公共API](/documentation/zh/docs/reference/public-api.md#public-api-for-cross-imports)部分。
