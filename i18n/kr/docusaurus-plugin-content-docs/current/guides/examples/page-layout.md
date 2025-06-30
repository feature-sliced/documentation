---
sidebar_position: 3
---

# 페이지 레이아웃

이 가이드는 여러 page가 같은 기본 구조를 공유하고, 주요 내용만 다른 경우 사용할 수 있는 _page layout_ 에 대해 설명합니다.

:::info

이 가이드에서 다루지 않는 질문이 있으신가요? 오른쪽 파란색 버튼을 눌러 피드백을 남겨주세요. 여러분의 의견을 반영해 가이드를 확장해 나가겠습니다!

:::

## 간단한 레이아웃

간단한 layout 예시로 설명 해 보겠습니다. 이 page는 사이트 내비게이션이 포함된 헤더, 두 개의 사이드바, 외부 링크가 포함된 푸터로 구성되어 있습니다. 복잡한 비즈니스 로직은 없으며, 동적인 부분은 사이드바와 헤더 오른쪽에 있는 테마 전환 버튼뿐입니다. 이러한 layout은 shared/ui 또는 app/layouts에 포함시킬 수 있으며, props를 통해 전달받은 사이드바 콘텐츠를 표시합니다.

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

사이드바의 구체적인 코드는 여러분 상상에 맡기겠습니다 😉.

## layout에 widget 사용하기

상황에 따라 layout에 특정 비즈니스 로직을 추가하고 싶을 때가 있습니다. 특히 [React Router][ext-react-router]와 같은 라우터를 사용해 깊이 중첩된 경로를 다룰 때 이러한 요구가 발생합니다. 이러한 경우 layout을 shared나 widgets 폴더에 두는 것이 어려울 수 있습니다. 이는 [layer에 대한 import 규칙][import-rule-on-layers] 때문입니다:

> slice의 module은 자신보다 하위 layer에 위치한 다른 slice만 import할 수 있습니다.

이 문제가 정말 중요한지 먼저 고려해 봐야 합니다. layout이 _정말로 필요한가요?_ 그리고 그 layout이 _정말로 widget이어야 할까요?_ 만약 해당 비즈니스 로직이 2-3개의 page에서만 사용되고, layout이 그 widget을 감싸는 역할이라면, 다음 두 가지 방법을 고려해 보세요:

1. **App layer에서 인라인으로 layout 작성하기**  
   App layer에서 직접 layout을 정의하는 것이 좋습니다. 이렇게 하면 중첩된 라우터를 사용할 때 특정 경로 그룹에만 해당 layout을 적용할 수 있어 유연하게 사용할 수 있습니다.

2. **복사하여 붙여넣기**  
   코드 추상화는 항상 좋은 선택은 아닙니다. 특히 layout은 자주 변경되지 않기 때문에, 필요한 경우 해당 page만 수정하는 것이 더 효율적일 수 있습니다. 이렇게 하면 다른 page에 영향을 주지 않고 수정할 수 있습니다. 팀원들이 다른 page를 수정하는 걸 잊을까 봐 걱정된다면, page 간의 관계를 주석으로 남겨보세요. 큰 프로젝트에서도 협업이 더 편해질 거예요.

위의 내용이 적절하지 않은 경우, layout에 widget을 포함하는 두 가지 해결책이 있습니다:

1. **render props나 slots 사용하기**  
   대부분의 프레임워크에서는 컴포넌트 내부에 표시될 UI 요소를 외부에서 전달할 수 있는 기능을 제공합니다. React에서는 [render props][ext-render-props]라고 하며, Vue에서는 [slots][ext-vue-slots]이라고 부릅니다.
2. **layout을 App layer로 이동하기**  
   layout을 `app/layouts` 등 App layer에 저장하고 원하는 widget을 구성할 수도 있습니다.

## 추가 자료

React 및 Remix(React Router와 유사)의 인증 layout 구축에 대한 예시는 [튜토리얼][tutorial]에서 확인하실 수 있습니다.


[tutorial]: /docs/get-started/tutorial
[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-react-router]: https://reactrouter.com/
[ext-render-props]: https://www.patterns.dev/react/render-props-pattern/
[ext-vue-slots]: https://vuejs.org/guide/components/slots

