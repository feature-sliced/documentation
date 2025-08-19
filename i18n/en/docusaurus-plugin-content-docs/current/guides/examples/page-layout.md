---
sidebar_position: 3
---

# Page layouts

This guide examines the abstraction of a _page layout_ — when several pages share the same overall structure, and differ only in the main content.

:::info

Is your question not covered by this guide? Post your question by leaving feedback on this article (blue button on the right) and we will consider expanding this guide!

:::

## Simple layout

The simplest layout can be seen on this page. It has a header with site navigation, two sidebars, and a footer with external links. There is no complicated business logic, and the only dynamic parts are sidebars and the switchers on the right side of the header. Such a layout can be placed entirely in `shared/ui` or in `app/layouts`, with props filling in the content for the sidebars:

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
        <Outlet /> {/* This is where the main content goes */}
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

The code of sidebars is left as an exercise for the reader 😉.

## Using widgets in the layout

Sometimes you want to include certain business logic in the layout, especially if you're using deeply nested routes with a router like [React Router][ext-react-router]. Then you can't store the layout in Shared or in Widgets due to [the import rule on layers][import-rule-on-layers]:

> A module in a slice can only import other slices when they are located on layers strictly below.

Before we discuss solutions, we need to discuss if it's even a problem in the first place. Do you _really need_ that layout, and if so, does it _really need_ to be a Widget? If the block of business logic in question is reused on 2-3 pages, and the layout is simply a small wrapper for that widget, consider one of these two options:

1. **Write the layout inline on the App layer, where you configure the routing**  
   This is great for routers that support nesting, because you can group certain routes and apply the layout only to them.

2. **Just copy-paste it**  
   The urge to abstract code is often very overrated. It is especially the case for layouts, which rarely change. At some point, if one of these pages will need to change, you can simply do the change without needlessly affecting other pages. If you're worried that someone might forget to update the other pages, you can always leave a comment that describes the relationship between the pages.

If none of the above are applicable, there are two solutions to include a widget in the layout:

1. **Use render props or slots**  
   Most frameworks allow you to pass a piece of UI externally. In React, it's called [render props][ext-render-props], in Vue it's called [slots][ext-vue-slots].
2. **Move the layout to the App layer**  
   You can also store your layout on the App layer, for example, in `app/layouts`, and compose any widgets you want.

## Further reading

- There's an example of how to build a layout with authentication with React and Remix (equivalent to React Router) in the [tutorial][tutorial].

[tutorial]: /docs/get-started/tutorial
[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-react-router]: https://reactrouter.com/
[ext-render-props]: https://www.patterns.dev/react/render-props-pattern/
[ext-vue-slots]: https://vuejs.org/guide/components/slots
