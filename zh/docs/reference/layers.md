# 层

层是 Feature-Sliced Design 中组织层次结构的第一级。它们的目的是根据代码需要的责任程度以及它依赖应用程序中其他模块的程度来分离代码。每一层都承载着特殊的语义意义，帮助您确定应该为您的代码分配多少责任。

总共有 **7 个 layers**，按从最高责任和 依赖到最低排列：

![A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets, features, entities, shared. The processes folder is slightly faded out.](/documentation/zh/img/layers/folders-graphic-light.svg#light-mode-only) ![A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets, features, entities, shared. The processes folder is slightly faded out.](/documentation/zh/img/layers/folders-graphic-dark.svg#dark-mode-only)

1. App
2. Processes (deprecated)
3. Pages
4. Widgets
5. Features
6. Entities
7. Shared

您不必在项目中使用每一层 — 只有当您认为它们为您的项目带来价值时才添加它们。通常，大多数前端项目至少会有 Shared、Pages 和 App 层。

在实践中，层是具有小写名称的文件夹（例如，`📁 shared`、`📁 pages`、`📁 app`）。\_不建议\_添加新层，因为它们的语义是标准化的。

## 层上的导入规则[​](#层上的导入规则 "标题的直接链接")

层由 *slices* 组成 — 高度内聚的模块组。slices 之间的依赖关系由**层上的导入规则**调节：

> *slice 中的模块（文件）只能在其他 slices 位于严格较低的层时导入它们。*

例如，文件夹 `📁 ~/features/aaa` 是一个名为"aaa"的 slice。其中的文件 `~/features/aaa/api/request.ts` 不能从 `📁 ~/features/bbb` 中的任何文件导入代码，但可以从 `📁 ~/entities` 和 `📁 ~/shared` 导入代码，以及从 `📁 ~/features/aaa` 导入任何同级代码，例如 `~/features/aaa/lib/cache.ts`。

App 和 Shared 层是此规则的**例外** — 它们既是层又是 slice。Slices 按业务域划分代码，这两层是例外，因为 Shared 没有业务域，而 App 结合了所有业务域。

在实践中，这意味着 App 和 Shared 层由 segments 组成，segments 可以自由地相互导入。

## 层定义[​](#层定义 "标题的直接链接")

本节描述每一层的语义含义，以便直观地了解什么样的代码属于那里。

### Shared[​](#shared "标题的直接链接")

这一层为应用程序的其余部分奠定了基础。这是与外部世界建立连接的地方，例如后端、第三方库、环境。这也是定义您自己的高度封装库的地方。

这一层，像 App 层一样，*不包含 slices*。Slices 旨在将层划分为业务域，但业务域在 Shared 中不存在。这意味着 Shared 中的所有文件都可以相互引用和导入。

Here are the segments that you can typically find in this layer:

* `📁 api` — the API client and potentially also functions to make requests to specific backend endpoints.
* `📁 ui` — the application's UI kit.
  <br />
  <!-- -->
  Components on this layer should not contain business logic, but it's okay for them to be business-themed. For example, you can put the company logo and page layout here. Components with UI logic are also allowed (for example, autocomplete or a search bar).
* `📁 lib` — a collection of internal libraries.
  <br />
  <!-- -->
  This folder should not be treated as helpers or utilities ([read here why these folders often turn into a dump](https://dev.to/sergeysova/why-utils-helpers-is-a-dump-45fo)). Instead, every library in this folder should have one area of focus, for example, dates, colors, text manipulation, etc. That area of focus should be documented in a README file. The developers in your team should know what can and cannot be added to these libraries.
* `📁 config` — environment variables, global feature flags and other global configuration for your app.
* `📁 routes` — route constants or patterns for matching routes.
* `📁 i18n` — setup code for translations, global translation strings.

你可以自由添加更多段，但要确保这些段的名称描述内容的目的，而不是其本质。例如，`components`、`hooks`和`types`是不好的段名称，因为它们在你寻找代码时没有太大帮助。

### Entities[​](#entities "标题的直接链接")

这一层的切片代表项目正在处理的现实世界概念。通常，它们是业务用来描述产品的术语。例如，社交网络可能会处理用户（User）、帖子（Post）和群组（Group）等业务实体。

实体切片可能包含数据存储（`📁 model`）、数据验证模式（`📁 model`）、与实体相关的API请求函数（`📁 api`），以及该实体在界面中的视觉表示（`📁 ui`）。视觉表示不必产生完整的UI块 — 它主要是为了在应用程序的多个页面中重用相同的外观，不同的业务逻辑可以通过props或slots附加到它上面。

#### 实体关系[​](#实体关系 "标题的直接链接")

FSD中的实体是切片，默认情况下，切片不能相互了解。然而，在现实生活中，实体经常相互交互，有时一个实体拥有或包含其他实体。因此，这些交互的业务逻辑最好保存在更高的层级中，如功能（Features）或页面（Pages）。

当一个实体的数据对象包含其他数据对象时，通常最好明确实体之间的连接，并通过使用`@x`标记法创建交叉引用API来绕过切片隔离。原因是连接的实体需要一起重构，所以最好让连接不可能被忽略。

For example:

entities/artist/model/artist.ts

```
import type { Song } from "entities/song/@x/artist";

export interface Artist {
  name: string;
  songs: Array<Song>;
}
```

entities/song/@x/artist.ts

```
export type { Song } from "../model/song.ts";
```

在[交叉导入的公共API](/documentation/zh/docs/reference/public-api.md#public-api-for-cross-imports)部分了解更多关于`@x`标记法的信息。

### Features[​](#features "标题的直接链接")

这一层用于应用程序中的主要交互，即用户关心要做的事情。这些交互通常涉及业务实体，因为这就是应用程序的核心内容。

有效使用功能层的一个关键原则是：**不是所有东西都需要成为功能**。某个东西需要成为功能的一个好指标是它在多个页面上被重用。

例如，如果应用程序有多个编辑器，并且所有编辑器都有评论功能，那么评论就是一个可重用的功能。记住，切片是快速查找代码的机制，如果功能太多，重要的功能就会被淹没。

理想情况下，当你进入一个新项目时，你会通过查看页面和功能来发现其功能性。在决定什么应该成为功能时，要为项目新人的体验进行优化，让他们能够快速发现重要的大型代码区域。

功能切片可能包含执行交互的UI（如表单）（`📁 ui`）、执行操作所需的API调用（`📁 api`）、验证和内部状态（`📁 model`）、功能标志（`📁 config`）。

### Widgets[​](#widgets "标题的直接链接")

小部件层用于大型自给自足的UI块。小部件在跨多个页面重用时最有用，或者当它们所属的页面有多个大型独立块，而这是其中之一时。

如果一个UI块构成了页面上大部分有趣的内容，并且从不被重用，它**不应该是小部件**，而应该直接放在该页面内。

提示

如果你使用嵌套路由系统（如[Remix](https://remix.run)的路由器），使用小部件层的方式可能与扁平路由系统使用页面层的方式相同 — 创建完整的路由块，包括相关的数据获取、加载状态和错误边界。

同样，你可以在这一层存储页面布局。

### Pages[​](#pages "标题的直接链接")

页面是构成网站和应用程序的内容（也称为屏幕或活动）。一个页面通常对应一个切片，但是，如果有几个非常相似的页面，它们可以组合成一个切片，例如注册和登录表单。

只要你的团队仍然觉得容易导航，你可以在页面切片中放置任意数量的代码。如果页面上的UI块不被重用，将其保留在页面切片内是完全可以的。

在页面切片中，你通常可以找到页面的UI以及加载状态和错误边界（`📁 ui`）和数据获取和变更请求（`📁 api`）。页面拥有专用数据模型并不常见，少量状态可以保存在组件本身中。

### Processes[​](#processes "标题的直接链接")

警告

这一层已被弃用。当前版本的规范建议避免使用它，并将其内容移至`features`和`app`。

流程是多页面交互的逃生舱。

这一层故意保持未定义。大多数应用程序不应该使用这一层，应该将路由级和服务器级逻辑保留在App层。只有当App层变得足够大以至于无法维护并需要卸载时，才考虑使用这一层。

### App[​](#app "标题的直接链接")

各种应用程序范围的事务，包括技术意义上的（例如，上下文提供者）和业务意义上的（例如，分析）。

这一层通常不包含切片，与Shared层一样，而是直接包含段。

以下是你通常可以在这一层找到的段：

* `📁 routes` — 路由器配置
* `📁 store` — 全局存储配置
* `📁 styles` — 全局样式
* `📁 entrypoint` — 应用程序代码的入口点，特定于框架
