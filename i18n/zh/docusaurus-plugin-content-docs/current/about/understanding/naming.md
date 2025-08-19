---
sidebar_position: 4
---

# 命名

不同的开发者有不同的经验和上下文，当相同的实体被不同地命名时，这可能导致团队中的误解。例如：

- 用于显示的组件可以被称为 "ui"、"components"、"ui-kit"、"views"…
- 在整个应用程序中重用的代码可以被称为 "core"、"shared"、"app"…
- 业务逻辑代码可以被称为 "store"、"model"、"state"…

## Feature-Sliced Design 中的命名 {#naming-in-fsd}

该方法论使用特定的术语，例如：

- "app"、"process"、"page"、"feature"、"entity"、"shared" 作为 layer 名称，
- "ui"、"model"、"lib"、"api"、"config" 作为 segment 名称。

坚持使用这些术语非常重要，以防止团队成员和加入项目的新开发者之间的混淆。使用标准名称也有助于向社区寻求帮助。

## 命名冲突 {#when-can-naming-interfere}

当 FSD 方法论中使用的术语与业务中使用的术语重叠时，可能发生命名冲突：

- `FSD#process` vs 应用程序中的模拟进程，
- `FSD#page` vs 日志页面，
- `FSD#model` vs 汽车型号。

例如，开发者在代码中看到 "process" 这个词时，会花费额外的时间试图弄清楚指的是哪个进程。这样的**冲突可能会破坏开发过程**。

当项目术语表包含 FSD 特有的术语时，在与团队和技术不相关的各方讨论这些术语时要格外小心。

为了与团队有效沟通，建议使用缩写 "FSD" 作为方法论术语的前缀。例如，在谈论进程时，您可能会说："我们可以将这个进程放在 FSD features layer 上。"

相反，在与非技术利益相关者沟通时，最好限制使用 FSD 术语，并避免提及代码库的内部结构。

## 参见 {#see-also}

- [(讨论) 命名的适应性][disc-src]
- [(讨论) Entity 命名调查][disc-naming]
- [(讨论) "processes" vs "flows" vs ...][disc-processes]
- [(讨论) "model" vs "store" vs ...][disc-model]

[disc-model]: https://github.com/feature-sliced/documentation/discussions/68
[disc-naming]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894
[disc-processes]: https://github.com/feature-sliced/documentation/discussions/20
[disc-src]: https://github.com/feature-sliced/documentation/discussions/16
