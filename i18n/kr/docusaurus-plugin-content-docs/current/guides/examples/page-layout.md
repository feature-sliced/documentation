---
sidebar_position: 3
---

# Page layouts

여러 페이지에서 **동일한 공통 layout(header, sidebar, footer)** 을 사용하고,  
그 안의 **Content 영역**(각 페이지에서 렌더링할 컴포넌트)만 달라질 때 사용하는 _page layout_ 개념을 설명합니다.

:::info

더 궁금한 점이 있나요? 페이지 우측의 피드백 버튼을 눌러 의견을 남겨 주세요. 여러분의 제안은 문서 개선에 큰 도움이 됩니다!

:::

## Simple layout

simple layout은 아래 예시에서 볼 수 있습니다.  
header, 두 개의 sidebar, 외부 링크(GitHub, Twitter)가 있는 footer로 구성되며, 복잡한 비즈니스 로직은 없습니다.  

- **정적 요소**: 고정된 menu, logo, footer 등  
- **동적 요소**: sidebar toggle, header 오른쪽의 theme switch button  

이 Layout 컴포넌트는 `shared/ui` 또는 `app/layouts` 같은 common 폴더에 두고,  
`siblingPages`(SiblingPageSidebar)와 `headings`(HeadingsSidebar) props로 sidebar content를 **주입(의존성 주입)** 받아 사용합니다.

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
        <Outlet /> {/* 여기에 주요 콘텐츠가 들어갑니다 */}
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

사이드바 구현은 생략했습니다.

## layout에 widget 적용하기

간혹 layout 컴포넌트에서 인증 처리나 데이터 로딩 같은 비즈니스 로직을 직접 실행해야 할 수 있습니다.
예를 들어, [React Router][ext-react-router]의 deeply nested routes를 사용할 때, child routes(예: `/users`, `/users/:id`, `/users/:id/settings` 등)의 공통 로직(인증 처리, 데이터 로딩 등)을 layout 레벨에서 한 번에 처리하면 편리합니다.
이 경우 layout 컴포넌트를 `shared`나 `widgets` 폴더에 두면 [layer에 대한 import 규칙][import-rule-on-layers]을 위반합니다.

> Slice의 module은 자신보다 하위 layer에만 있는 Slice를 import할 수 있습니다. 

이 문제가 정말 중요한지 먼저 고려해 봐야 합니다.

- _이 layout이 정말 필요한가요?_
- _꼭 widget으로 구현해야 하나요?_

비즈니스 로직을 사용하는 layout이 2~3개 페이지만 적용된다면, layout 역할이 단순 wrapper인지 확인하고, 아래 대안을 고려하세요.

1. **App layer에서 inline으로 작성하기**  
    Router의 nesting 기능을 이용하면, 공통된 URL 패턴을 가진 여러 경로(예: /users, /users/profile, /users/settings)를 하나의 **route group** 으로 묶을 수 있습니다. 이렇게 만든 route group에 한 번만 layout을 지정하면, 해당 그룹의 모든 페이지에 동일한 layout이 적용됩니다.

2. **코드 복사 & 붙여넣기**  
   레이아웃은 자주 변경되지 않으므로, 필요한 페이지만 복사해 두고 수정할 때만 업데이트하세요.
   이렇게 하면 다른 페이지에 영향을 주지 않으며, 페이지 간 관계를 주석으로 남겨 누락을 방지할 수 있습니다.

위 방식이 적합하지 않다면, layout에 widget을 포함하는 다음 두 가지 해결책을 검토하세요:

1. **Render Props 또는 Slots 사용하기**  
   React에서는 [render props][ext-render-props]를, Vue에서는 [slots][ext-vue-slots]를 사용해 **부모 layout 컴포넌트에 자식 UI를 props/slot 형태로 전달해 특정 위치에 주입(injection)** 하는 방식입니다.

2. **layout을 App layer로 이동하기**  
   `app/layouts` 등에 layout 파일을 두고, 필요한 widget을 조합해 사용하세요.

## 참고 자료

React 및 Remix(React Router와 유사)의 인증 layout 구축에 대한 예시는 [튜토리얼][tutorial]에서 확인하실 수 있습니다.


[tutorial]: /docs/get-started/tutorial
[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-react-router]: https://reactrouter.com/
[ext-render-props]: https://www.patterns.dev/react/render-props-pattern/
[ext-vue-slots]: https://vuejs.org/guide/components/slots

