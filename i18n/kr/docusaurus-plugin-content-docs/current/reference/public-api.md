---
sidebar_position: 3
---

import useBaseUrl from "@docusaurus/useBaseUrl";

# Public API

Public API는 **Slice 기능을 외부에서 사용할 수 있는 공식 경로**입니다.  
외부 코드는 반드시 이 경로를 통해서만 Slice 내부의 특정 객체에 접근할 수 있습니다.  
즉, **Slice와 외부 코드 간의 계약(Contract)** 이자 **접근 게이트(Gate)** 역할을 합니다.

일반적으로 Public API는 **Re-export를 모아둔 index 파일**로 만듭니다.

```js title="pages/auth/index.js"
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

## 좋은 Public API의 조건

좋은 Public API는 Slice를 **다른 코드와 통합하기 쉽고, 안정적으로 유지보수**할 수 있게 해줍니다.  
이를 위해 다음 세 가지 목표를 충족하는 것이 이상적입니다.

1. **내부 구조 변경에 영향 없음** — Slice 내부 폴더 구조를 바꿔도 외부 코드는 그대로 동작해야 합니다.
2. **주요 동작 변경 = API 변경** — Slice의 동작이 크게 바뀌어 기존 기대를 깨면, Public API도 변경되어야 합니다.
3. **필요한 부분만 노출** — Slice 전체가 아니라 꼭 필요한 기능만 외부에 공개합니다.

### 안 좋은 예: 무분별한 Wildcard Re-export

개발 초기에는 편의상 모든 `export *`를 한 번에 노출하고 싶을 때가 있습니다.  
이 경우 `export *` 같은 와일드카드 Re-export를 쓰기 쉽지만, 이는 Slice의 인터페이스를 불명확하게 만듭니다.

```js title="Bad practice, features/comments/index.js"
// ❌ 이렇게 하지 마세요
export * from "./ui/Comment";       // 👎 무분별한 UI export
export * from "./model/comments";   // 💩 내부 모델 노출
```

문제가 되는 이유:

- **발견 가능성 저하** — Public API에서 어떤 기능을 제공하는지 한눈에 알기 어렵습니다.
- **내부 구현 노출** — 의도치 않게 Slice 내부 코드를 외부에서 사용하게 되고, 그 코드에 의존하면 리팩터링이 매우 어려워집니다.

## Cross-Import를 위한 Public API {#public-api-for-cross-imports}

**Cross-import**는 같은 Layer 안에서 한 Slice가 다른 Slice를 import하는 것을 말합니다.  
[Layer Import Rule][import-rule-on-layers]에 따라 원칙적으로 금지되지만, **Entity 간 참조**처럼 불가피한 경우가 있습니다.

예를 들어, 비즈니스 도메인에서 `Artist`와 `Song`이 서로 연결되는 관계가 있다면, 우회하기보다 코드에 그대로 반영하는 것이 좋습니다.

이때는 `@x` 표기를 사용해 **전용 Public API**를 명시적으로 만듭니다.

- `📂 entities`
    - `📂 A`
        - `📂 @x`
            - `📄 B.ts` — `entities/B/` 전용 Public API
        - `📄 index.ts` — 일반 Public API

`entities/song`에서는 이렇게 import합니다.

```ts
import type { Artist } from "entities/artist/@x/song";
```

`artist/@x/song`은 **Artist와 Song의 교차 지점** 을 의미합니다.

:::note

Cross-import는 최소화해야 하며, **Entity Layer**에서만 사용하세요.  
다른 Layer에서는 의존 관계를 제거하는 것이 좋습니다.

:::

## Index File 사용 시 주의사항

### Circular Import (순환 참조)

Circular Import는 두 개 이상의 파일이 서로를 참조하는 구조를 말합니다.  
이 구조는 Bundler가 처리하기 어렵고, 디버그하기 힘든 런타임 오류를 유발할 수 있습니다.

순환 참조는 Index 파일 없이도 발생할 수 있지만, Index 파일은 특히 이런 실수를 만들기 쉽습니다.  
예를 들어, Slice의 Public API에서 `HomePage`와 `loadUserStatistics`를 export하고,
`HomePage`가 다시 Public API를 통해 `loadUserStatistics`를 가져오면 다음과 같이 순환이 생깁니다.

<!-- TODO: add backgrounds to the images below, check on mobile -->

<figure>
    <img src={useBaseUrl("/img/circular-import-light.svg#light-mode-only")} width="60%" alt="세 파일이 서로 원형으로 import하는 모습" />
    <img src={useBaseUrl("/img/circular-import-dark.svg#dark-mode-only")} width="60%" alt="세 파일이 서로를 원형으로 import하고 있는 예시입니다." />
    <figcaption>
        위 그림: `fileA.js`, `fileB.js`, `fileC.js` 파일의 Circular Import 예시
    </figcaption>
</figure>


```jsx title="pages/home/ui/HomePage.jsx"
import { loadUserStatistics } from "../"; // pages/home/index.js에서 import

export function HomePage() { /* … */ }
```

```js title="pages/home/index.js"
export { HomePage } from "./ui/HomePage";
export { loadUserStatistics } from "./api/loadUserStatistics";
```

위 구조에서는 `index.js`가 `HomePage`를 가져오고,
`HomePage.jsx`는 다시 `index.js`를 통해 `loadUserStatistics`를 가져오면서 순환이 발생합니다.


여기서는 `index.js` → `HomePage.jsx`→ `index.js` 순환이 발생합니다.


#### 예방 원칙

- 같은 Slice 내부: 상대 경로(`../api/loadUserStatistics`)로 import하고, 경로를 명확히 작성
- 다른 Slice: 절대 경로(예: `@/features/...`)나 Alias를 사용 Index에서 export한 모듈이 다시 Index를 참조하지 않도록 주의


### Large Bundle & Tree-shaking 문제 {#large-bundles}

일부 Bundler는 Index 파일에서 모든 모듈을 export할 때 **미사용 코드**를 제대로 제거(Tree-shaking)하지 못할 수 있습니다.

대부분의 Public API에서는 모듈 간 연관성이 높아 문제가 되지 않지만,
`shared/ui`와 `shared/lib`처럼 **서로 관련 없는 모듈 집합**에서는 문제가 심각해집니다.

- `📂 shared/ui/`
    - `📁 button`
    - `📁 text-field`
    - `📁 carousel`
    - `📁 accordion`

여기서 `Button` 하나만 사용해도 `carousel`이나 `accordion` 같은 무거운 의존성이 번들에 포함될 수 있습니다.  
특히 Syntax Highlighter, Drag-and-Drop 라이브러리처럼 용량이 큰 의존성은 영향을 크게 줍니다.

### 해결 방법

- 각 컴포넌트/라이브러리별로 별도 Index 파일 생성

- `📂 shared/ui/`
    - `📂 button`
        - `📄 index.js`
    - `📂 text-field`
        - `📄 index.js`

- 직접 import

```js title="pages/sign-in/ui/SignInPage.jsx"
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/text-field';
```

이렇게 하면 필요한 코드만 번들에 포함되어 Tree-shaking이 잘 동작합니다.


### Public API 우회 방지의 한계

Slice에 Index 파일을 만들어도 직접 경로 import를 완전히 막을 수 없습니다.  
특히 IDE의 Auto Import 기능이 잘못된 경로를 선택해 Public API 규칙을 어길 수 있습니다.

#### 해결 방법

- [Steiger][ext-steiger]와 같은 FSD 전용 아키텍처 린터로 import 경로를 검사·강제

### 대규모 프로젝트에서의 Bundler 성능 문제

[TkDodo 글][ext-please-stop-using-barrel-files]에서도 지적했듯,  
Index 파일이 많아지면 개발 서버(HMR) 속도가 느려질 수 있습니다.

#### 최적화 방법

1. [Large Bundle & Tree-shaking 문제](#large-bundles) 방식 적용 — `shared/ui`와 `shared/lib`에 대형 Index 대신 컴포넌트별 Index 사용
2. Segment 단위의 불필요한 Index 파일 생성 방지  
   예: `📄 features/comments/index.js`가 있다면, `📄 features/comments/ui/index.js` 같은 중첩 Index는 불필요
3. 큰 프로젝트는 기능 단위로 여러 Chunk(또는 패키지)로 나누기  
   - Google Docs처럼 Document Editor와 File Browser를 분리  
   - Monorepo에서 각 패키지를 독립 FSD Root로 구성  
     - 일부 패키지는 Shared·Entity Layer만 포함  
     - 다른 패키지는 Page·App Layer만 포함  
     - 필요한 경우 작은 Shared를 갖고 다른 패키지의 큰 Shared를 참조

<!-- TODO: add a link to a page that explains this in more detail (when one will exist) -->

<!-- TODO: discuss issues with mixing server/client code in Next/Remix -->

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-please-stop-using-barrel-files]: https://tkdodo.eu/blog/please-stop-using-barrel-files
