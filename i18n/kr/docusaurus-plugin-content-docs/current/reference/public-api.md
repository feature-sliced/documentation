---
sidebar_position: 3
---

# Public API

Public API는 slice와 같은 모듈 그룹과 이를 사용하는 코드 사이에서 계약 역할을 합니다. 또한, 게이트의 기능을 하여 특정 객체에 접근할 수 있는 유일한 경로로 public API를 제공합니다.

실제로 Public API는 보통 재내보내기(re-exports)가 포함된 인덱스 파일(index file)로 구현됩니다.

```js title="pages/auth/index.js"
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

## 좋은 public API의 조건은 무엇일까요?

좋은 public API는 slice를 다른 코드와 통합하거나 사용할 때 편리함과 안정성을 제공합니다. 이를 위해 다음 세 가지 목표를 설정할 수 있습니다:

1. 나머지 애플리케이션은 slice 내부 구조가 리팩토링(구조 변경)되더라도 영향을 받지 않아야 합니다.
2. slice의 동작에 큰 변화가 생기면, 이는 public API의 변경으로 이어져야 합니다.
3. slice의 필요한 부분만 외부에 노출되어야 합니다.

마지막 목표는 몇 가지 중요한 실천적 고려사항을 포함합니다. 특히, slice의 초기 개발 단계에서는 파일에서 새롭게 내보내는 모든 객체를 slice에서도 자동으로 내보내고 싶다고 느낄 수 있습니다. 이 때문에 '와일드카드(*) 재내보내기(wildcard re-exports)'를 사용하려는 경향이 생길 수 있습니다.

```js title="Bad practice, features/comments/index.js"
// ❌ 아래는 나쁜 코드입니다. 이렇게 하지 마세요.
export * from "./ui/Comment";  // 👎 절대 이렇게 하지 마세요.
export * from "./model/comments";  // 💩 이것은 나쁜 관행입니다.
```

이는 slice의 인터페이스가 무엇인지 명확하게 드러나지 않게 만들어, slice를 발견하고 이해하기 어렵게 만듭니다. 인터페이스를 명확히 알 수 없다는 것은, slice를 애플리케이션과 통합하는 방법을 이해하려면 코드를 깊이 분석해야 한다는 뜻입니다.

또 다른 문제는 모듈 내부의 세부 사항이 의도치 않게 외부로 노출될 수 있다는 점입니다. 이렇게 되면, 외부 코드가 이 세부 사항에 의존하게 될 가능성이 생기고, 이는 리팩토링을 복잡하게 만들어 개발의 유연성을 제한할 수 있습니다.

## Cross-Imports를 위한 Public API {#public-api-for-cross-imports}

Cross-imports란 같은 계층에 있는 한 slice가 다른 slice를 import하는 상황을 말합니다. 일반적으로 [layers import 규칙][import-rule-on-layers]에 의해 cross-import는 금지되지만, 정당한 이유로 이를 허용해야 하는 경우도 종종 있습니다.

예를 들어, 비즈니스 Entities는 실제 세계에서 서로 참조하는 일이 많습니다. 이러한 관계를 억지로 우회하기보다는, 코드에 자연스럽게 반영하는 것이 더 적절한 경우도 있습니다.

이를 해결하기 위해 특별한 유형의 public API를 사용할 수 있는데, 이를 `@x-`표기법으로 부르기도 합니다. 예를 들어, Entities A와 B가 있고, entity B가 entity A의 일부를 import해야 한다면, entity A는 entity B만을 위한 별도의 public API를 선언할 수 있습니다. 이렇게 하면 cross-import를 안전하게 관리할 수 있습니다.

- `📂 entities`
    - `📂 A`
        - `📂 @x`
            - `📄 B.ts` — `entities/B/` 내부 코드를 위한 특별한 public API
        - `📄 index.ts` — 일반적인 public API

이렇게 설정하면 `entities/B/` 내부의 코드는 `entities/A/@x/B` 에서 필요한 부분을 import할 수 있습니다.

```ts
import type { EntityA } from "entities/A/@x/B";
```

`A/@x/B` 표기법은 'A와 B의 교차'로 해석됩니다.

:::note

cross-Imports는 최소한으로 사용해야 하며, **이 표기법은 반드시 Entities 계층에서만 사용**하세요. cross-import를 완전히 제거하는 것이 비효율적이거나 비현실적인 경우도 있기 때문입니다.

:::

## Index 파일의 문제점

`index.js`와 같은 인덱스 파일(배럴 파일이라고도 불림)은 public API를 정의하는 데 가장 일반적으로 사용되는 방법입니다. 이 방식은 작성하기는 쉬운 반면, 특정 번들러나 프레임워크에서 예상치 못한 문제를 발생시킬 수 있는 단점도 있습니다.

### 순환(Circular) imports

순환(Circular) imports란 두 개 이상의 파일이 서로를 참조하며 원형으로 import하는 경우를 말합니다.

<!-- TODO: add backgrounds to the images below, check on mobile -->

<figure>
    <img src="/img/circular-import-light.svg#light-mode-only" width="60%" alt="세 파일이 서로 원형으로 import하는 모습" />
    <img src="/img/circular-import-dark.svg#dark-mode-only" width="60%" alt="세 파일이 서로를 원형으로 import하고 있는 예시입니다." />
    <figcaption>
        위 그림: `fileA.js`, `fileB.js`, `fileC.js` 세 파일이 서로를 원형으로 import하고 있습니다.
    </figcaption>
</figure>

이러한 상황은 번들러가 처리하기 어려운 경우가 많으며, 때로는 디버깅하기 어려운 런타임 오류로 이어질 수 있습니다.

순환(Circular) import는 인덱스 파일 없이도 발생할 수 있지만, 인덱스 파일을 사용할 경우 실수로 순환(Circular) imports를 유발할 가능성이 더 높아집니다. 특히, slice의 public API에서 두 개 이상의 객체가 노출된 상황에서 이런 문제가 자주 발생합니다. 

예를 들어, `HomePage`와 `loadUserStatistics`가 public API로 노출되어 있고, `HomePage`가 `loadUserStatistics`에 접근해야 하는 경우를 생각해 봅시다. 아래와 같이 접근하면 문제가 생길 수 있습니다:"

```jsx title="pages/home/ui/HomePage.jsx"
import { loadUserStatistics } from "../"; // pages/home/index.js에서 import

export function HomePage() { /* … */ }
```

```js title="pages/home/index.js"
export { HomePage } from "./ui/HomePage";
export { loadUserStatistics } from "./api/loadUserStatistics";
```

이 상황은 순환(Circular) imports를 발생시킵니다. 이는`index.js`가 `ui/HomePage.jsx`를 import 하고, `ui/HomePage.jsx`가 다시 `index.js`를 import 하기 때문입니다.

이 문제를 방지하기 위해 다음 두 가지 원칙을 고려하세요. 두 파일이 있고 하나가 다른 하나에서 import 해야 하는 경우:
- 같은 slice 내에서는 항상 상대 경로 import를 사용하고, 전체 경로를 명시적으로 작성하세요.
- 다른 slices 에서 import할 때는 항상 별칭(alias) 등의 absolute imports를 사용하세요.

### Shared에서 발생하는 큰 번들과 깨진 tree-shaking  {#large-bundles}

일부 번들러는 모든 것을 재내보내는 인덱스 파일이 있을 경우, 트리 쉐이킹(사용되지 않는 코드를 제거하는 과정)을 제대로 수행하지 못할 때가 있습니다.

일반적으로 public API에서는 큰 문제가 되지 않습니다. 이는 모듈의 내용들이 서로 밀접하게 연관되어 있어, 한 가지를 import 하면 다른 것들을 제거할 필요가 없는 경우가 많기 때문입니다. 하지만 FSD에서 일반적으로 사용하는 public API 규칙은 두 가지 경우에 문제가 발생할 가능성이 있습니다 - `shared/ui`와 `shared/lib`입니다.

이 두 폴더는 주로 한 곳에서 모두 필요하지 않은, 연관성이 적은 것들의 모음입니다. 예를 들어, `shared/ui`는 UI 라이브러리의 모든 컴포넌트를 포함하는 모듈을 가질 수 있습니다.


- `📂 shared/ui/`
    - `📁 button`
    - `📁 text-field`
    - `📁 carousel`
    - `📁 accordion`

이 문제는 구문 강조기(syntax highlighter)나 드래그 앤 드롭 라이브러리처럼 무거운 의존성을 가진 모듈이 포함될 때 더욱 심각해질 수 있습니다. 예를 들어, `shared/ui`에서 버튼(Button)과 같은 간단한 컴포넌트를 사용하는 모든 페이지에 이런 무거운 의존성이 포함되는 상황은 피하고 싶을 것입니다.

만약 `shared/ui`나 `shared/lib`의 단일 public API로 인해 번들의 크기가 불필요하게 커진다면, 각 컴포넌트나 라이브러리에 대해 별도의 index 파일을 만드는 것이 더 좋은 방법일 수 있습니다.

- `📂 shared/ui/`
    - `📂 button`
        - `📄 index.js`
    - `📂 text-field`
        - `📄 index.js`

이렇게 하면, 해당 컴포넌트를 사용하면 다음과 같이 직접 import 할 수 있습니다:

```js title="pages/sign-in/ui/SignInPage.jsx"
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/text-field';
```

### public API를 우회하는 것에 대한 실질적인 보호가 없음

slice 에 index 파일을 추가하더라도, 누군가가 해당 파일을 사용하지 않고 특정 객체를 직접 import 하는 것을 막을 방법은 없습니다. 이는 특히 IDE의 자동 import 기능에서 문제가 될 수 있습니다. 객체를 import 할 수 있는 여러 경로가 있다면, IDE가 어느 경로를 선택할지 결정해야 하며, 때로는 직접 import 를 선택해 slice 의 public API 규칙을 위반할 가능성이 생깁니다.

이런 문제를 자동으로 감지하고 방지하려면, Feature-Sliced Design을 위한 규칙 세트를 제공하는 아키텍처 linter [Steiger][ext-steiger]를 사용하는 것을 추천합니다.

### 큰 프로젝트에서의 번들러 성능 저하

TkDodo가 그의 글 ["Please Stop Using Barrel Files"][ext-please-stop-using-barrel-files]에서 언급했듯이, 프로젝트에 많은 index 파일이 포함될 경우 개발 서버의 속도가 느려질 수 있습니다.

이 문제를 해결하기 위해 다음과 같은 방법들을 고려할 수 있습니다:
1. ["Shared에서의 큰 번들과 깨진 트리 쉐이킹" 문제](#large-bundles)에서 언급한 조언을 따르세요. `shared/ui`와 `shared/lib`에 하나의 커다란 index 파일을 두는 대신, 각 컴포넌트나 라이브러리에 대해 별도의 index 파일을 작성하세요.
2. slices 계층의 세그먼트에서 인덱스 파일 생성을 피하세요.
   예를 들어, "comments" 기능에 대한 인덱스 파일 `📄 features/comments/index.js`가 이미 있다면, 해당 기능의 `ui` 세그먼트에 대해 추가로 `📄 features/comments/ui/index.js` 같은 index 파일을 생성할 필요는 없습니다.

3. 프로젝트가 매우 클 경우, 애플리케이션을 여러 개의 큰 chunk 로 나누는 것도 고려할 수 있습니다.
   예를 들어, Google Docs처럼 문서 편집기와 파일 브라우저 같은 서로 다른 책임을 가진 기능은 별도로 나눌 수 있습니다. 이를 위해 모노레포(monorepo) 설정을 활용해 각 패키지가 독립적인 계층 구조를 갖는 FSD 루트가 되도록 구성할 수 있습니다.
   - 일부 패키지는 Shared와 Entities 계층만 포함할 수 있습니다.
   - 다른 패키지는 Pages와 App 계층만 포함할 수 있습니다.
   - 또 다른 패키지는 자체 작은 Shared를 포함하면서도 다른 패키지에서 제공하는 큰 Shared를 활용할 수도 있습니다.

<!-- TODO: add a link to a page that explains this in more detail (when one will exist) -->

<!-- TODO: discuss issues with mixing server/client code in Next/Remix -->

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-please-stop-using-barrel-files]: https://tkdodo.eu/blog/please-stop-using-barrel-files
