---
sidebar_position: 3
---

# Public API

Public API는 Slice와 같은 모듈 그룹과 이를 사용하는 코드 사이의 Contract 역할을 합니다. 또한 Gate 역할을 하여 특정 Object에 접근할 수 있는 유일한 경로를 제공합니다.

일반적으로 Public API는 Re-export가 포함된 Index File로 구현됩니다:

```js title="pages/auth/index.js"
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

## 좋은 Public API의 조건

좋은 Public API는 Slice 사용과 통합을 용이하게 합니다. 세 가지 주요 목표:

1. Application은 Slice 내부 구조의 Refactoring에 영향받지 않아야 함
2. Slice 동작의 중요한 변경은 Public API 변경으로 이어져야 함
3. Slice의 필요한 부분만 외부에 노출되어야 함

마지막 목표는 실용적 고려사항을 포함합니다. 초기 개발 시 모든 Export를 자동으로 노출하고 싶은 유혹이 있어 Wildcard(*) Re-export를 사용하려 할 수 있습니다:

```js title="Bad practice, features/comments/index.js"
// ❌ 잘못된 예시
export * from "./ui/Comment";  // 👎 사용하지 마세요
export * from "./model/comments";  // 💩 나쁜 관행
```

이는 Slice Interface를 모호하게 만들어 발견성과 이해도를 낮춥니다. Interface가 불명확하면 Application 통합을 위해 코드를 깊이 분석해야 합니다.

또한 모듈 내부 구현이 의도치 않게 노출될 수 있어, 외부 코드가 이에 의존하게 되면 Refactoring이 어려워집니다.

## Cross-Import를 위한 Public API {#public-api-for-cross-imports}

Cross-import는 같은 Layer의 한 Slice가 다른 Slice를 Import하는 것입니다. [Layer Import Rule][import-rule-on-layers]으로 금지되지만, 때로는 필요한 경우가 있습니다.

예를 들어, Business Entity들은 실제로 서로 참조하는 경우가 많습니다. 이런 관계를 우회하기보다 코드에 자연스럽게 반영하는 것이 더 적절할 수 있습니다.

이를 위해 `@x-` 표기법의 특별한 Public API를 사용할 수 있습니다. Entity A와 B가 있고 B가 A의 일부를 Import해야 한다면, A는 B를 위한 전용 Public API를 선언할 수 있습니다:

- `📂 entities`
    - `📂 A`
        - `📂 @x`
            - `📄 B.ts` — `entities/B/` 전용 Public API
        - `📄 index.ts` — 일반 Public API

이제 `entities/B/` 코드는 `entities/A/@x/B`에서 필요한 부분을 Import할 수 있습니다:

```ts
import type { EntityA } from "entities/A/@x/B";
```

`A/@x/B`는 'A와 B의 교차'를 의미합니다.

:::note

Cross-import는 최소화해야 하며, **이 표기법은 Entity Layer에서만 사용**하세요. Cross-import 제거가 비효율적이거나 비현실적일 수 있기 때문입니다.

:::

## Index File의 문제점

Index File(Barrel File)은 Public API 정의의 일반적 방법이지만, 특정 Bundler나 Framework에서 문제를 일으킬 수 있습니다.

### Circular Import

Circular Import는 파일들이 서로를 순환적으로 Import하는 경우입니다.

<!-- TODO: add backgrounds to the images below, check on mobile -->

<figure>
    <img src="/img/circular-import-light.svg#light-mode-only" width="60%" alt="세 파일이 서로 원형으로 import하는 모습" />
    <img src="/img/circular-import-dark.svg#dark-mode-only" width="60%" alt="세 파일이 서로를 원형으로 import하고 있는 예시입니다." />
    <figcaption>
        위 그림: `fileA.js`, `fileB.js`, `fileC.js` 파일의 Circular Import 예시
    </figcaption>
</figure>

이는 Bundler가 처리하기 어렵고 Runtime Error의 원인이 될 수 있습니다.

Index File 사용 시 Circular Import가 발생하기 쉽습니다. 특히 Slice의 Public API에서 여러 Object를 노출할 때 자주 발생합니다.

예시) `HomePage`와 `loadUserStatistics`가 Public API로 노출되고 `HomePage`가 `loadUserStatistics`에 접근해야 할 때:

```jsx title="pages/home/ui/HomePage.jsx"
import { loadUserStatistics } from "../"; // pages/home/index.js에서 import

export function HomePage() { /* … */ }
```

```js title="pages/home/index.js"
export { HomePage } from "./ui/HomePage";
export { loadUserStatistics } from "./api/loadUserStatistics";
```

이는 Circular Import를 생성합니다: `index.js`가 `ui/HomePage.jsx`를 Import하고, `ui/HomePage.jsx`가 다시 `index.js`를 Import합니다.

해결을 위한 두 가지 원칙:
- 같은 Slice 내: 항상 Relative Path Import 사용, 전체 경로 명시
- 다른 Slice Import: 항상 Alias 등의 Absolute Import 사용

### Shared의 Large Bundle과 Tree-shaking 문제 {#large-bundles}

일부 Bundler는 모든 것을 Re-export하는 Index File이 있을 때 Tree-shaking(미사용 코드 제거)을 제대로 수행하지 못할 수 있습니다.

일반적으로 Public API에서는 큰 문제가 되지 않습니다. Module 내용이 밀접하게 연관되어 있어 하나를 Import하면 다른 것들도 필요한 경우가 많기 때문입니다. 하지만 FSD의 Public API Rule은 `shared/ui`와 `shared/lib`에서 문제가 될 수 있습니다.

이 두 폴더는 보통 연관성이 적은 Component들의 집합입니다. 예를 들어, `shared/ui`는 UI Library의 모든 Component를 포함할 수 있습니다:


- `📂 shared/ui/`
    - `📁 button`
    - `📁 text-field`
    - `📁 carousel`
    - `📁 accordion`

Syntax Highlighter나 Drag-and-Drop Library 같은 Heavy Dependency가 있을 때 문제가 더 심각해집니다. `shared/ui`에서 Button 같은 간단한 Component를 사용하는 모든 Page에 이런 Heavy Dependency가 포함되는 것은 피해야 합니다.

`shared/ui`나 `shared/lib`의 단일 Public API로 인해 Bundle Size가 커진다면, 각 Component나 Library에 대해 별도의 Index File을 만드는 것이 좋습니다:

- `📂 shared/ui/`
    - `📂 button`
        - `📄 index.js`
    - `📂 text-field`
        - `📄 index.js`

이렇게 하면 다음과 같이 직접 Import가 가능합니다:

```js title="pages/sign-in/ui/SignInPage.jsx"
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/text-field';
```

### Public API 우회 방지의 한계

Slice에 Index File을 추가해도 직접 Import를 막을 수는 없습니다. 특히 IDE의 Auto Import 기능에서 문제가 됩니다. Import 가능한 여러 경로 중 IDE가 직접 Import를 선택하여 Slice의 Public API Rule을 위반할 수 있습니다.

이 문제를 자동으로 감지하고 방지하려면 FSD용 Architecture Linter인 [Steiger][ext-steiger]를 사용하세요.

### Large Project에서의 Bundler 성능 문제

TkDodo의 ["Please Stop Using Barrel Files"][ext-please-stop-using-barrel-files] 글처럼, 많은 Index File은 Development Server 속도를 저하시킬 수 있습니다.

해결 방안:
1. ["Shared의 Large Bundle 문제"](#large-bundles) 조언을 따르세요. `shared/ui`와 `shared/lib`에 하나의 큰 Index File 대신 각 Component/Library별 Index File을 사용하세요.
2. Slice Layer의 Segment에서 Index File 생성을 피하세요.
   예) "comments" Feature의 `📄 features/comments/index.js`가 있다면, `📄 features/comments/ui/index.js` 같은 추가 Index File은 불필요

3. 대규모 프로젝트는 여러 큰 Chunk로 분할을 고려하세요.
   예) Google Docs처럼 Document Editor와 File Browser를 분리. Monorepo로 각 Package가 독립적 Layer 구조를 가진 FSD Root가 되도록 구성:
   - 일부 Package는 Shared와 Entity Layer만 포함
   - 다른 Package는 Page와 App Layer만 포함
   - 또 다른 Package는 자체 작은 Shared와 다른 Package의 큰 Shared 활용 가능

<!-- TODO: add a link to a page that explains this in more detail (when one will exist) -->

<!-- TODO: discuss issues with mixing server/client code in Next/Remix -->

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-please-stop-using-barrel-files]: https://tkdodo.eu/blog/please-stop-using-barrel-files
