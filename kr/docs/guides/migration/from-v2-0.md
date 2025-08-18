# v2.0 -> v2.1 마이그레이션 가이드

v2.1의 핵심 변화는 Page 중심(Page-First) 접근 방식을 통한 인터페이스 구조화입니다.

## v2.0 접근 방식[​](#v20-접근-방식 "해당 헤딩으로 이동")

v2.0에서는 **Entity** 와 **Feature** 단위를 중심으로 애플리케이션을 분리했습니다.<br /><!-- -->화면을 이루는 최소 단위인 entity 표현이나 상호작용 요소까지 모두 세분화한 뒤,<br />이를 **Widget** 으로 조합하고, 최종적으로 **Page** 를 구성하는 모델이었죠.

이렇게 하면 재사용성과 모듈화 면에서 이점이 있었지만,<br />실제로는 대부분의 비즈니스 로직이 entity·feature layer에 집중되고,<br />Page는 단순 조합 계층에 머물러 자신만의 책임이 희미해지는 문제가 발생했습니다.

## v2.1 접근 방식[​](#v21-접근-방식 "해당 헤딩으로 이동")

v2.1에서는 **Pages-First** 사고방식을 도입합니다.<br /><!-- -->대부분의 개발자가 이미 애플리케이션을 Page 단위로 나누는 데 익숙하고,<br />코드베이스에서 컴포넌트를 찾을 때도 Page가 자연스러운 출발점이기 때문입니다.

* **Page 내부에 주요 UI와 비즈니스 로직**을 두고 **Shared** layer는 순수 재사용 요소만 관리
* 공통 로직이 실제로 여러 Page에서 쓰일 때만 하위 layer(Feature·Entity)로 분리

이 접근의 장점은 다음과 같습니다:

1. **Page가 책임 단위**가 되어, 코드 위치와 역할이 명확해집니다.
2. Shared layer는 **유틸·컴포넌트**처럼 순수 재사용 코드만 담아, 의존 경로가 간결해집니다.
3. 공통 로직을 실제로 재사용할 때만 하위 layer로 이동해, 불필요한 추상화와 의존성 얽힘을 방지합니다.

또한 v2.1에서는 **Entity 간 cross-import**를 `@x` 표기법으로 **표준화**했습니다.<br /><!-- -->이제 다음과 같은 형식으로 명확한 경로를 사용할 수 있습니다:

## 마이그레이션 프로세스[​](#how-to-migrate "해당 헤딩으로 이동")

v2.1은 하위 호환성을 보장하므로, 기존 FSD v2.0 프로젝트는 **수정 없이** 동작합니다.<br /><!-- -->새 모델을 활용하려면 아래 단계를 단계적으로 적용해 보세요.

### 1. Slice 병합[​](#1-slice-병합 "해당 헤딩으로 이동")

FSD v2.1의 Page-First 모델에서는 **실제로 여러 Page에서 재사용되지 않는** slice를 굳이 독립 단위로 유지할 필요가 없습니다.<br /><!-- -->단일 page에서만 사용되는 slice는 해당 page 안으로 병합하면, 코드 탐색과 유지보수가 더 쉬워집니다.

#### Steiger로 자동 탐지하기[​](#steiger로-자동-탐지하기 "해당 헤딩으로 이동")

프로젝트 루트에서 [Steiger](https://github.com/feature-sliced/steiger) linter를 실행하세요.<br />v2.1 mental model에 맞춘 주요 lint 규칙은 다음과 같습니다:

* [`insignificant-slice`](https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/insignificant-slice)
  <br />
  <!-- -->
  단일 Page에서만 참조되는 slice를 찾아냅니다.
  <br />
  <!-- -->
  → **해당 slice를 Page 내부로 병합**하도록 제안합니다.
* [`excessive-slicing`](https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/excessive-slicing)
  <br />
  <!-- -->
  너무 잘게 나뉜 slice를 감지합니다.
  <br />
  <!-- -->
  → **유사한 slice를 통합**하거나 **그룹화**해 탐색성을 높이도록 권장합니다.

```
npx steiger src
```

이 명령으로 `한 번만 쓰이는 slice` 목록이 출력됩니다.<br />이제 각 slice의 재사용 여부를 검토하고, 과하다면 해당 page로 병합하거나 비슷한 역할끼리 묶어 보세요.

Slice 관리

각 계층은 해당 계층에 속한 모든 Slices의 namespace를 관리합니다. 이는 전역 변수를 관리하는 것과 비슷한 개념입니다:

* 전역 변수는 꼭 필요한 경우에만 사용하듯이 Slice도 실제로 재사용되는 경우에만 독립적으로 분리하세요
* 한 곳에서만 사용되는 코드는 해당 Page나 Feature 내부로 이동하는 것이 좋습니다

### 2. Cross Import 표준화[​](#2-cross-import-표준화 "해당 헤딩으로 이동")

새로운 `@x-` 표기법으로 Entity 간 cross-import를 통일합니다:

entities/B/some/file.ts

```
// v2.1 권장 cross-import 방식
import type { EntityA } from "entities/A/@x/B";
```

자세한 내용은 [Public API for cross-imports](/documentation/kr/docs/reference/public-api.md#public-api-for-cross-imports) 문서를 참고하세요.
