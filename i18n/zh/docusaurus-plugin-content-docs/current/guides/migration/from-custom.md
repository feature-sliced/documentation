---
sidebar_position: 1
sidebar_label: 从自定义架构迁移
---

# 从自定义架构迁移

本指南描述了一种在从自定义自制架构迁移到 Feature-Sliced Design 时可能有用的方法。

这里是典型自定义架构的文件夹结构。我们将在本指南中将其作为示例使用。  
点击蓝色箭头打开文件夹。

<details className="file-tree">
      <summary>📁 src</summary>
      <ul>
            <li>
                  <details className="file-tree">
                        <summary>📁 actions</summary>
                        <ul>
                              <li>📁 product</li>
                              <li>📁 order</li>
                        </ul>
                  </details>
            </li>
            <li>📁 api</li>
            <li>📁 components</li>
            <li>📁 containers</li>
            <li>📁 constants</li>
            <li>📁 i18n</li>
            <li>📁 modules</li>
            <li>📁 helpers</li>
            <li>
                  <details className="file-tree">
                        <summary>📁 routes</summary>
                        <ul>
                              <li>📁 products.jsx</li>
                              <li>📄 products.[id].jsx</li>
                        </ul>
                  </details>
            </li>
            <li>📁 utils</li>
            <li>📁 reducers</li>
            <li>📁 selectors</li>
            <li>📁 styles</li>
            <li>📄 App.jsx</li>
            <li>📄 index.js</li>
      </ul>
</details>

## 在您开始之前 {#before-you-start}

在考虑切换到Feature-Sliced Design时，向团队提出的最重要问题是——_你真的需要它吗？_我们喜爱Feature-Sliced Design，但即使是我们也认识到一些项目没有它也完全可以。

以下是考虑进行切换的一些原因：

1. 新团队成员抱怨很难达到高效水平
2. 修改代码的一部分**经常**导致另一个不相关的部分出现问题
3. 由于需要考虑的事情太多，添加新功能变得困难

**避免违背队友意愿切换到FSD**，即使你是负责人。  
首先，说服你的队友，让他们相信好处超过了迁移成本和学习新架构而不是既定架构的成本。

还要记住，任何类型的架构更改都不会立即被管理层观察到。在开始之前确保他们支持这种切换，并向他们解释为什么这可能对项目有益。

:::tip

如果你需要帮助说服项目经理FSD是有益的，请考虑以下几点：
1. 迁移到FSD可以增量进行，因此不会停止新功能的开发
2. 良好的架构可以显著减少新开发者需要变得高效的时间
3. FSD是一个有文档的架构，因此团队不必持续花时间维护自己的文档

:::

---

如果你决定开始迁移，那么你想要做的第一件事是为`📁 src`设置一个别名。稍后引用顶级文件夹时会很有帮助。在本指南的其余部分，我们将考虑`@`作为`./src`的别名。

## 步骤1. 按页面划分代码 {#divide-code-by-pages}

大多数自定义架构已经有按页面的划分，无论逻辑大小如何。如果你已经有`📁 pages`，可以跳过此步骤。

如果你只有`📁 routes`，创建`📁 pages`并尝试从`📁 routes`中移动尽可能多的组件代码。理想情况下，你会有一个小的路由和一个较大的页面。在移动代码时，为每个页面创建一个文件夹并添加一个索引文件：

:::note

现在，如果你的页面相互引用是可以的。你可以稍后处理这个问题，但现在，专注于建立突出的按页面划分。

:::

Route file:

```js title="src/routes/products.[id].js"
export { ProductPage as default } from "@/pages/product"
```

Page index file:

```js title="src/pages/product/index.js"
export { ProductPage } from "./ProductPage.jsx"
```

Page component file:

```jsx title="src/pages/product/ProductPage.jsx"
export function ProductPage(props) {
  return <div />;
}
```

## 步骤2. 将其他所有内容与页面分离 {#separate-everything-else-from-pages}

创建一个文件夹`📁 src/shared`，并将所有不从`📁 pages`或`📁 routes`导入的内容移动到那里。创建一个文件夹`📁 src/app`，并将所有导入页面或路由的内容移动到那里，包括路由本身。

记住Shared层没有切片，所以段之间相互导入是可以的。

You should end up with a file structure like this:

<details className="file-tree" open>
      <summary>📁 src</summary>
      <ul>
            <li>
                  <details className="file-tree">
                        <summary>📁 app</summary>
                        <ul>
                              <li>
                                    <details className="file-tree">
                                          <summary>📁 routes</summary>
                                          <ul>
                                                <li>📄 products.jsx</li>
                                                <li>📄 products.[id].jsx</li>
                                          </ul>
                                    </details>
                              </li>
                              <li>📄 App.jsx</li>
                              <li>📄 index.js</li>
                        </ul>
                  </details>
            </li>
            <li>
                  <details className="file-tree">
                        <summary>📁 pages</summary>
                        <ul>
                              <li>
                                    <details className="file-tree">
                                          <summary>📁 product</summary>
                                          <ul>
                                                <li>
                                                      <details className="file-tree">
                                                            <summary>📁 ui</summary>
                                                            <ul>
                                                                  <li>📄 ProductPage.jsx</li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li>📄 index.js</li>
                                          </ul>
                                    </details>
                              </li>
                              <li>📁 catalog</li>
                        </ul>
                  </details>
            </li>
            <li>
                  <details className="file-tree">
                        <summary>📁 shared</summary>
                        <ul>
                              <li>📁 actions</li>
                              <li>📁 api</li>
                              <li>📁 components</li>
                              <li>📁 containers</li>
                              <li>📁 constants</li>
                              <li>📁 i18n</li>
                              <li>📁 modules</li>
                              <li>📁 helpers</li>
                              <li>📁 utils</li>
                              <li>📁 reducers</li>
                              <li>📁 selectors</li>
                              <li>📁 styles</li>
                        </ul>
                  </details>
            </li>
      </ul>
</details>

## 步骤3. 处理页面间的交叉导入 {#tackle-cross-imports-between-pages}

<!-- A good way to approach this is by setting up [Steiger][ext-steiger], the linter for FSD.  -->
<!-- TODO: add instructions once the new config format is standardized -->

找到一个页面从另一个页面导入的所有实例，并执行以下两件事之一：

1. 将导入的代码复制粘贴到依赖页面中以移除依赖关系
2. 将代码移动到Shared中的适当段： 
      - 如果它是UI工具包的一部分，将其移动到`📁 shared/ui`； 
      - 如果它是配置常量，将其移动到`📁 shared/config`； 
      - 如果它是后端交互，将其移动到`📁 shared/api`。

:::note

**复制粘贴在架构上并不错误**，实际上，有时复制可能比抽象为新的可重用模块更正确。原因是有时页面的共享部分开始分离，在这些情况下你不希望依赖关系阻碍你。

但是，DRY（"不要重复自己"）原则仍然有意义，所以确保你不是在复制粘贴业务逻辑。否则你需要记住同时在多个地方修复错误。

:::

## 步骤4. 拆解Shared层 {#unpack-shared-layer}

在这一步你可能在Shared层中有很多东西，你通常想要避免这种情况。原因是Shared层可能是代码库中任何其他层的依赖项，因此对该代码进行更改自动更容易产生意外后果。

找到所有只在一个页面上使用的对象，并将其移动到该页面的切片中。是的，_这也适用于actions、reducers和selectors_。将所有actions组合在一起没有好处，但将相关actions放置在接近其使用位置是有好处的。

You should end up with a file structure like this:

<details className="file-tree" open>
      <summary>📁 src</summary>
      <ul>
            <li>📁 app (unchanged)</li>
            <li>
                  <details className="file-tree" open>
                        <summary>📁 pages</summary>
                        <ul>
                              <li>
                                    <details className="file-tree" open>
                                          <summary>📁 product</summary>
                                          <ul>
                                                <li>📁 actions</li>
                                                <li>📁 reducers</li>
                                                <li>📁 selectors</li>
                                                <li>
                                                      <details className="file-tree">
                                                            <summary>📁 ui</summary>
                                                            <ul>
                                                                  <li>📄 Component.jsx</li>
                                                                  <li>📄 Container.jsx</li>
                                                                  <li>📄 ProductPage.jsx</li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li>📄 index.js</li>
                                          </ul>
                                    </details>
                              </li>
                              <li>📁 catalog</li>
                        </ul>
                  </details>
            </li>
            <li>
                  <details className="file-tree">
                        <summary>📁 shared (only objects that are reused)</summary>
                        <ul>
                              <li>📁 actions</li>
                              <li>📁 api</li>
                              <li>📁 components</li>
                              <li>📁 containers</li>
                              <li>📁 constants</li>
                              <li>📁 i18n</li>
                              <li>📁 modules</li>
                              <li>📁 helpers</li>
                              <li>📁 utils</li>
                              <li>📁 reducers</li>
                              <li>📁 selectors</li>
                              <li>📁 styles</li>
                        </ul>
                  </details>
            </li>
      </ul>
</details>

## 步骤5. 按技术目的组织代码 {#organize-by-technical-purpose}

在FSD中，按技术目的划分是通过_段_来完成的。有几个常见的段：

- `ui` — 与UI显示相关的一切：UI组件、日期格式化器、样式等。
- `api` — 后端交互：请求函数、数据类型、映射器等。
- `model` — 数据模型：模式、接口、存储和业务逻辑。
- `lib` — 此切片上其他模块需要的库代码。
- `config` — 配置文件和功能标志。

如果需要，你也可以创建自己的段。确保不要创建按代码是什么分组的段，如`components`、`actions`、`types`、`utils`。相反，按代码的用途分组。

重新组织你的页面以按段分离代码。你应该已经有一个`ui`段，现在是时候创建其他段了，如用于actions、reducers和selectors的`model`，或用于thunks和mutations的`api`。

还要重新组织Shared层以移除这些文件夹：
- `📁 components`、`📁 containers` — 其中大部分应该成为`📁 shared/ui`；
- `📁 helpers`、`📁 utils` — 如果还有一些重用的helpers，按功能将它们组合在一起，如日期或类型转换，并将这些组移动到`📁 shared/lib`；
- `📁 constants` — 再次，按功能分组并移动到`📁 shared/config`。

## 可选步骤 {#optional-steps}

### 步骤6. 从在多个页面使用的Redux切片形成实体/功能 {#form-entities-features-from-redux}

通常，这些重用的Redux切片将描述与业务相关的内容，例如产品或用户，因此这些可以移动到Entities层，每个文件夹一个实体。如果Redux切片与用户想要在你的应用中执行的操作相关，如评论，那么你可以将其移动到Features层。

实体和功能意味着彼此独立。如果你的业务域包含实体之间的固有连接，请参考[业务实体指南][business-entities-cross-relations]以获取如何组织这些连接的建议。

与这些切片相关的API函数可以保留在`📁 shared/api`中。

### 步骤7. 重构你的模块 {#refactor-your-modules}

`📁 modules`文件夹通常用于业务逻辑，因此它在本质上已经与FSD的Features层非常相似。一些模块也可能描述UI的大块，如应用头部。在这种情况下，你应该将它们迁移到Widgets层。

### 步骤8. 在`shared/ui`中形成干净的UI基础 {#form-clean-ui-foundation}

`📁 shared/ui`理想情况下应该包含一组没有编码任何业务逻辑的UI元素。它们也应该是高度可重用的。

重构曾经在`📁 components`和`📁 containers`中的UI组件以分离业务逻辑。将该业务逻辑移动到更高的层级。如果它没有在太多地方使用，你甚至可以考虑复制粘贴。

## 另请参阅 {#see-also}

- [(Talk in Russian) Ilya Klimov — Крысиные бега бесконечного рефакторинга: как не дать техническому долгу убить мотивацию и продукт](https://youtu.be/aOiJ3k2UvO4)

[ext-steiger]: https://github.com/feature-sliced/steiger
[business-entities-cross-relations]: /docs/guides/examples/types#business-entities-and-their-cross-references
