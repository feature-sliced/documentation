# Public API

Public API 是一组模块（如 slice）与使用它的代码之间的\_契约\_。它也充当网关，只允许访问某些对象，并且只能通过该 public API 访问。

在实践中，它通常作为具有重新导出的 index 文件实现：

pages/auth/index.js

```
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

## 什么构成了好的 public API？[​](#什么构成了好的-public-api "标题的直接链接")

好的 public API 使得使用和集成到其他代码中的 slice 方便可靠。这可以通过设定这三个目标来实现：

1. 应用程序的其余部分必须受到保护，免受 slice 结构变化（如重构）的影响
2. slice 行为的重大变化（破坏了之前的期望）应该导致 public API 的变化
3. 只应该暴露 slice 的必要部分

最后一个目标有一些重要的实际含义。创建所有内容的通配符重新导出可能很诱人，特别是在 slice 的早期开发中，因为您从文件中导出的任何新对象也会自动从 slice 导出：

Bad practice, features/comments/index.js

```
// ❌ BAD CODE BELOW, DON'T DO THIS
export * from "./ui/Comment";  // 👎 don't try this at home
export * from "./model/comments";  // 💩 this is bad practice
```

这会损害 slice 的可发现性，因为您无法轻易地说出这个 slice 的接口是什么。不知道接口意味着您必须深入挖掘 slice 的代码才能理解如何集成它。另一个问题是您可能意外地暴露模块内部，如果有人开始依赖它们，这将使重构变得困难。

## 用于交叉导入的 Public API[​](#public-api-for-cross-imports "标题的直接链接")

交叉导入是指同一 layer 上的一个 slice 从另一个 slice 导入的情况。通常这被 [layers 上的导入规则](/zh/docs/reference/layers.md#import-rule-on-layers) 禁止，但经常有合理的交叉导入理由。例如，业务 entities 在现实世界中经常相互引用，最好在代码中反映这些关系而不是绕过它们。

为此，有一种特殊的 public API，也称为 `@x` 记号法。如果您有 entities A 和 B，并且 entity B 需要从 entity A 导入，那么 entity A 可以为 entity B 声明一个单独的 public API。

* `📂 entities`

  * `📂 A`

    * `📂 @x`
      * `📄 B.ts` — 仅用于 `entities/B/` 内部代码的特殊 public API
    * `📄 index.ts` — 常规 public API

然后 `entities/B/` 内部的代码可以从 `entities/A/@x/B` 导入：

```
import type { EntityA } from "entities/A/@x/B";
```

记号法 `A/@x/B` 旨在读作 "A crossed with B"。

备注

尽量减少交叉导入，并且**仅在 Entities layer 上使用此记号法**，在该 layer 上消除交叉导入通常是不合理的。

## index 文件的问题[​](#index-文件的问题 "标题的直接链接")

像 `index.js` 这样的 index 文件（也称为 barrel 文件）是定义 public API 的最常见方式。它们容易制作，但众所周知会在某些打包器和框架中引起问题。

### 循环导入[​](#循环导入 "标题的直接链接")

循环导入是指两个或多个文件在一个循环中相互导入。

![Three files importing each other in a circle](/zh/img/circular-import-light.svg#light-mode-only)![Three files importing each other in a circle](/zh/img/circular-import-dark.svg#dark-mode-only)

Pictured above: three files, `fileA.js`, `fileB.js`, and `fileC.js`, importing each other in a circle.

这些情况对于打包器来说通常难以处理，在某些情况下，它们甚至可能导致难以调试的运行时错误。

循环导入可以在没有 index 文件的情况下发生，但拥有 index 文件提供了意外创建循环导入的明显机会。当您在 slice 的 public API 中有两个暴露的对象时，这经常发生，例如 `HomePage` 和 `loadUserStatistics`，并且 `HomePage` 需要访问 `loadUserStatistics`，但它像这样做：

pages/home/ui/HomePage.jsx

```
import { loadUserStatistics } from "../"; // importing from pages/home/index.js

export function HomePage() { /* … */ }
```

pages/home/index.js

```
export { HomePage } from "./ui/HomePage";
export { loadUserStatistics } from "./api/loadUserStatistics";
```

这种情况创建了循环导入，因为 `index.js` 导入 `ui/HomePage.jsx`，但 `ui/HomePage.jsx` 导入 `index.js`。

为了防止这个问题，考虑这两个原则。如果您有两个文件，其中一个从另一个导入：

* 当它们在同一个 slice 中时，始终使用\_相对\_导入并编写完整的导入路径
* 当它们在不同的 slices 中时，始终使用\_绝对\_导入，例如使用别名

### Shared 中的大型包和损坏的 tree-shaking[​](#large-bundles "标题的直接链接")

当您有一个重新导出所有内容的 index 文件时，某些打包器可能在 tree-shaking（移除未导入的代码）方面遇到困难。

通常这对于 public APIs 来说不是问题，因为模块的内容通常关系非常密切，所以您很少需要导入一个东西并 tree-shake 掉另一个。然而，当 FSD 中的正常 public API 规则可能导致问题时，有两个非常常见的情况 — `shared/ui` 和 `shared/lib`。

这两个文件夹都是不相关事物的集合，通常不是在一个地方都需要的。例如，`shared/ui` 可能为 UI 库中的每个组件都有模块：

* `📂 shared/ui/`

  * `📁 button`
  * `📁 text-field`
  * `📁 carousel`
  * `📁 accordion`

当其中一个模块有重度依赖时，这个问题会变得更加严重，比如语法突出显示器或拖放库。您不希望将这些引入到使用 `shared/ui` 中某些内容的每个页面中，例如按钮。

如果您的包由于 `shared/ui` 或 `shared/lib` 中的单个 public API 而不必要地增长，建议改为为每个组件或库单独有一个 index 文件：

* `📂 shared/ui/`

  * `📂 button`
    * `📄 index.js`
  * `📂 text-field`
    * `📄 index.js`

然后这些组件的使用者可以像这样直接导入它们：

pages/sign-in/ui/SignInPage.jsx

```
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/text-field';
```

### 对绝过 public API 没有真正的保护[​](#对绝过-public-api-没有真正的保护 "标题的直接链接")

当您为 slice 创建 index 文件时，您实际上并没有禁止任何人不使用它而直接导入。这对于自动导入来说尤其是一个问题，因为有几个位置可以导入对象，所以 IDE 必须为您做决定。有时它可能选择直接导入，破坏 slices 上的 public API 规则。

为了自动捕获这些问题，我们建议使用 [Steiger](https://github.com/feature-sliced/steiger)，一个具有 Feature-Sliced Design 规则集的架构 linter。

### 大型项目中打包器的较差性能[​](#大型项目中打包器的较差性能 "标题的直接链接")

在项目中具有大量 index 文件可能会减慢开发服务器，正如 TkDodo 在[他的文章“请停止使用 Barrel 文件”](https://tkdodo.eu/blog/please-stop-using-barrel-files)中所指出的。

您可以做几件事来解决这个问题：

1. 与[“Shared 中的大型包和损坏的 tree-shaking”问题](#large-bundles)相同的建议 — 在 `shared/ui` 和 `shared/lib` 中为每个组件/库单独有 index 文件，而不是一个大的

2. 避免在有 slices 的 layers 上的 segments 中有 index 文件。<br /><!-- -->例如，如果您有一个用于 feature “comments” 的 index，`📄 features/comments/index.js`，则没有理由为该 feature 的 `ui` segment 有另一个 index，`📄 features/comments/ui/index.js`。

3. 如果您有一个非常大的项目，很可能您的应用程序可以分割成几个大块。<br /><!-- -->例如，Google Docs 在文档编辑器和文件浏览器方面有非常不同的责任。您可以创建一个 monorepo 设置，其中每个包都是一个单独的 FSD 根，具有自己的 layers 集。某些包可能只有 Shared 和 Entities layers，其他包可能只有 Pages 和 App，还有一些包可能包含它们自己的小 Shared，但仍然使用另一个包中的大 Shared。
