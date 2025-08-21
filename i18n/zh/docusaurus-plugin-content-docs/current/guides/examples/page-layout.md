---
sidebar_position: 3
---

# 页面布局

本指南探讨了_页面布局_的抽象 — 当多个页面共享相同的整体结构，仅在主要内容上有所不同时。

:::info

本指南没有涵盖您的问题？请通过在本文上留下反馈（右侧的蓝色按钮）来发布您的问题，我们将考虑扩展本指南！

:::

## 简单布局

最简单的布局可以在此页面上看到。它有一个带有站点导航的头部、两个侧边栏和一个带有外部链接的页脚。没有复杂的业务逻辑，唯一的动态部分是侧边栏和头部右侧的切换器。这样的布局可以完全放置在 `shared/ui` 或 `app/layouts` 中，通过 props 填充侧边栏的内容：

```tsx title="shared/ui/layout/Layout.tsx"
import { Link, Outlet } from "react-router-dom";
import { useThemeSwitcher } from "./useThemeSwitcher";

export function Layout({ siblingPages, headings }) {
  const [theme, toggleTheme] = useThemeSwitcher();

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/docs">Docs</Link> </li>
            <li> <Link to="/blog">Blog</Link> </li>
          </ul>
        </nav>
        <button onClick={toggleTheme}>{theme}</button>
      </header>
      <main>
        <SiblingPageSidebar siblingPages={siblingPages} />
        <Outlet /> {/* 这里是主要内容的位置 */}
        <HeadingsSidebar headings={headings} />
      </main>
      <footer>
        <ul>
          <li>GitHub</li>
          <li>Twitter</li>
        </ul>
      </footer>
    </div>
  );
}
```

```ts title="shared/ui/layout/useThemeSwitcher.ts"
export function useThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, toggleTheme] as const;
}
```

侧边栏的代码留给读者作为练习 😉。

## 在布局中使用 widgets

有时您希望在布局中包含某些业务逻辑，特别是如果您使用像 [React Router][ext-react-router] 这样的路由器的深度嵌套路由。然后由于[层上的导入规则][import-rule-on-layers]，您无法将布局存储在 Shared 或 Widgets 中：

> slice 中的模块只能在其他 slices 位于严格较低的层时导入它们。

在我们讨论解决方案之前，我们需要讨论这是否首先是一个问题。您_真的需要_那个布局吗？如果需要，它_真的需要_成为一个 Widget 吗？如果所讨论的业务逻辑块在 2-3 个页面上重用，而布局只是该 widget 的一个小包装器，请考虑以下两个选项之一：

1. **在 App 层内联编写布局，在那里配置路由**  
   这对于支持嵌套的路由器来说很棒，因为您可以将某些路由分组并仅对它们应用布局。

2. **直接复制粘贴**  
   抽象代码的冲动往往被过度高估。对于很少更改的布局来说尤其如此。在某个时候，如果其中一个页面需要更改，您可以简单地进行更改，而不会不必要地影响其他页面。如果您担心有人可能忘记更新其他页面，您总是可以留下描述页面之间关系的注释。

如果上述都不适用，有两种解决方案可以在布局中包含 widget：

1. **使用 render props 或 slots**  
   大多数框架允许您从外部传递一段 UI。在 React 中，这被称为 [render props][ext-render-props]，在 Vue 中被称为 [slots][ext-vue-slots]。
2. **将布局移动到 App 层**  
   您也可以将布局存储在 App 层，例如在 `app/layouts` 中，并组合您想要的任何 widgets。

## 延伸阅读

- 在[教程][tutorial]中有一个如何使用 React 和 Remix（相当于 React Router）构建带有身份验证的布局的示例。

[tutorial]: /docs/get-started/tutorial
[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-react-router]: https://reactrouter.com/
[ext-render-props]: https://www.patterns.dev/react/render-props-pattern/
[ext-vue-slots]: https://vuejs.org/guide/components/slots
