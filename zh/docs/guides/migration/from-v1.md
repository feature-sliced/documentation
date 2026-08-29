# 从 v1 到 v2 的迁移

## 为什么是 v2？

**feature-slices** 的原始概念于 2018 年[被宣布][ext-tg-spb]。

从那时起，该方法论发生了许多变化，但同时**[基本原则得到了保留][ext-v1]**：

- 使用*标准化*的前端项目结构
- 首先按照*业务逻辑*分割应用程序
- 使用*隔离的 features* 来防止隐式副作用和循环依赖
- 使用 *Public API* 并禁止深入模块的"内部"

同时，在方法论的上一个版本中，仍然存在**薄弱环节**：

- 有时会导致样板代码
- 有时会导致代码库的过度复杂化和抽象之间不明显的规则
- 有时会导致隐式的架构解决方案，这阻止了项目的提升和新人的入职

方法论的新版本（[v2][ext-v2]）旨在**消除这些缺点，同时保留该方法的现有优势**。

自 2018 年以来，[还开发了][ext-fdd-issues]另一种类似的方法论 - [**feature-driven**][ext-fdd]，最初由 [Oleg Isonen][ext-kof] 宣布。

在合并两种方法后，我们**改进和完善了现有实践** - 朝着更大的灵活性、清晰度和应用效率的方向发展。

> 因此，这甚至影响了方法论的名称 - *"feature-slice**d**"*

## 为什么将项目迁移到v2是有意义的？

> `WIP:` 当前版本的方法论正在开发中，一些细节*可能会发生变化*

#### 🔍 更透明和简单的架构

方法论（v2）提供了**更直观和更常见的抽象以及在开发者之间分离逻辑的方式。**

所有这些对吸引新人、研究项目当前状态以及分配应用程序业务逻辑都有极其积极的影响。

#### 📦 更灵活和诚实的模块化

方法论（v2）允许**以更灵活的方式分配逻辑：**

- 能够从头开始重构隔离的部分
- 能够依赖相同的抽象，但没有不必要的依赖交织
- 对新模块位置的更简单要求 *（层级 => 切片 => 段）*

#### 🚀 更多规范、计划、社区

目前，`核心团队`正在积极开发方法论的最新（v2）版本

因此对于它：

- 将有更多描述的案例/问题
- 将有更多应用指南
- 将有更多真实示例
- 总的来说，将有更多文档用于新人入职和学习方法论概念
- 工具包将在未来开发以符合架构概念和约定

> 当然，第一个版本也会有用户支持 - 但最新版本仍然是我们的优先级
>
> 在未来，随着下一次重大更新，你仍然可以访问方法论的当前版本（v2），**对你的团队和项目没有风险**

## Changelog

### `BREAKING` 层级

现在方法论假设在顶层明确分配层级

- `/app` > `/processes` > **`/pages`** > **`/features`** > `/entities` > `/shared`
- *也就是说，现在不是所有东西都被视为功能/页面*
- 这种方法允许你[明确设置层级规则][ext-tg-v2-draft]：
- 模块所在的**层级越高**，它拥有的**上下文**就越多
  
  *（换句话说 - 层级的每个模块 - 只能导入底层的模块，而不能导入更高层的）*

- 模块所在的**层级越低**，对其进行更改的**危险性和责任**就越大

  *（因为通常是底层被过度使用）*

### `BREAKING` Shared

基础设施抽象 `/ui`、`/lib`、`/api`，以前位于项目的src根目录中，现在由单独的目录 `/src/shared` 分离

- `shared/ui` - 仍然是应用程序的相同通用UI工具包（可选）
  - *同时，没有人禁止像以前一样在这里使用`原子设计`*
- `shared/lib` - 用于实现逻辑的辅助库集合
  - *仍然 - 没有助手的转储*
- `shared/api` - 访问API的通用入口点
  - *也可以在每个功能/页面中本地注册 - 但不推荐*
- 和以前一样 - 在`shared`中不应该有对业务逻辑的显式绑定
  - *如有必要，你需要将这种关系提升到`entities`级别或更高*

### `NEW` 实体、流程

在v2中**，添加了其他新的抽象**来消除逻辑复杂性和高耦合的问题。

- `/entities` - **业务实体**层，包含直接与业务模型相关的切片或仅在前端需要的合成实体
  - *示例：`user`、`i18n`、`order`、`blog`*
- `/processes` - **业务流程**层，贯穿应用程序
  - **该层是可选的**，通常建议在*逻辑增长并开始在多个页面中模糊*时使用
  - *示例：`payment`、`auth`、`quick-tour`*

### `BREAKING` 抽象和命名

现在定义了具体的抽象和[明确的命名建议][refs-adaptability]

[disc-process]: https://github.com/feature-sliced/documentation/discussions/20
[disc-features]: https://github.com/feature-sliced/documentation/discussions/23
[disc-entities]: https://github.com/feature-sliced/documentation/discussions/18#discussioncomment-422649
[disc-shared]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453020

[disc-ui]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453132
[disc-model]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-472645
[disc-api]: https://github.com/feature-sliced/documentation/discussions/66

#### 层级

- `/app` — **应用程序初始化层**
  - *以前的版本：`app`、`core`、`init`、`src/index`（这种情况也会发生）*
- `/processes` — [**业务流程层**][disc-process]
  - *以前的版本：`processes`、`flows`、`workflows`*
- `/pages` — **应用程序页面层**
  - *以前的版本：`pages`、`screens`、`views`、`layouts`、`components`、`containers`*
- `/features` — [**功能部分层**][disc-features]
  - *以前的版本：`features`、`components`、`containers`*
- `/entities` — [**业务实体层**][disc-entities]
  - *以前的版本：`entities`、`models`、`shared`*
- `/shared` — [**可重用基础设施代码层**][disc-shared] 🔥
  - *以前的版本：`shared`、`common`、`lib`*

#### 段

- `/ui` — [**UI段**][disc-ui] 🔥
  - *以前的版本：`ui`、`components`、`view`*
- `/model` — [**业务逻辑段**][disc-model] 🔥
  - *以前的版本：`model`、`store`、`state`、`services`、`controller`*
- `/lib` — **辅助代码段**
  - *以前的版本：`lib`、`libs`、`utils`、`helpers`*
- `/api` — [**API段**][disc-api]
  - *以前的版本：`api`、`service`、`requests`、`queries`*
- `/config` — **应用程序配置段**
  - *以前的版本：`config`、`env`、`get-env`*

### `REFINED` 低耦合

现在由于新的层级，[遵循模块间低耦合原则][refs-low-coupling]变得更加容易。

*同时，仍然建议尽可能避免极难"解耦"模块的情况*

## See also

- [Notes from the report "React SPB Meetup #1"][ext-tg-spb]
- [React Berlin Talk - Oleg Isonen "Feature Driven Architecture"][ext-kof-fdd]
- [Comparison with v1 (community-chat)](https://t.me/feature_sliced/493)
- [New ideas v2 with explanations (atomicdesign-chat)][ext-tg-v2-draft]
- [Discussion of abstractions and naming for the new version of the methodology (v2)](https://github.com/feature-sliced/documentation/discussions/31)

[refs-low-coupling]: /zh/docs/reference/slices-segments#zero-coupling-high-cohesion
[refs-adaptability]: /zh/docs/about/understanding/naming

[ext-v1]: https://feature-sliced.github.io/featureslices.dev/v1.0.html
[ext-tg-spb]: https://t.me/feature_slices
[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-fdd-issues]: https://github.com/kof/feature-driven-architecture/issues
[ext-v2]: https://github.com/feature-sliced/documentation
[ext-kof]: https://github.com/kof
[ext-kof-fdd]: https://www.youtube.com/watch?v=BWAeYuWFHhs
[ext-tg-v2-draft]: https://t.me/atomicdesign/18708
