---
sidebar_position: 3
---

# v2.0에서 v2.1로의 마이그레이션

v2.1의 핵심 변화는 페이지 중심(Page-First) 접근 방식을 통한 인터페이스 구조화입니다.

### v2.0 방식
이전 버전에서는:
- Entity와 Feature을 최소 단위로 분해
- 이를 기반으로 Widget과 Page를 구성
- 대부분의 로직이 Entity와 Feature 계층에 집중
- Page는 단순 조합 계층으로 취급

### v2.1 방식
새로운 버전에서는:
- Page를 시작점으로 설정
- UI와 비즈니스 로직을 우선적으로 Page 내에 구현
- Shared 계층은 순수하게 재사용 가능한 기반 코드만 관리
- 여러 페이지에서 공통으로 사용되는 로직만 하위 계층으로 분리

Feature-Sliced Design(v2.1)에서는 Entity 간 Cross Import를 표준화하기 위해 `@x` 표기법이 도입되었습니다.

## 마이그레이션 프로세스 {#how-to-migrate}

v2.1은 하위 호환성을 보장하므로, v2.0 프로젝트는 수정 없이도 정상 동작합니다. 다만, 새로운 아키텍처 모델의 이점을 활용하기 위해 다음과 같은 단계적 개선을 권장합니다.

### 1. 슬라이스(Slice) 병합

[Steiger][steiger] 린터(Linter)를 활용하여 코드베이스를 분석할 수 있습니다:

주요 린트 규칙:
- [`insignificant-slice`][insignificant-slice]: 단일 Page에서만 사용되는 Slice 감지
  - 해당 Slice의 코드를 관련 Page로 이동 권장
- [`excessive-slicing`][excessive-slicing]: 과도한 Slices 분할 감지
  - 유지보수성 향상을 위한 Slices 통합 또는 그룹화 제안

```bash
npx steiger src
```

Steiger를 사용하면 프로젝트에서 한 번만 사용되는 Slice들을 찾아낼 수 있습니다. 이러한 Slice들이 정말 독립적인 Slice로 존재할 필요가 있는지 검토해야 합니다.

:::tip Slice 관리
각 계층은 해당 계층에 속한 모든 Slices의 네임스페이스를 관리합니다. 이는 전역 변수를 관리하는 것과 비슷한 개념입니다:
- 전역 변수는 꼭 필요한 경우에만 사용하듯이
- Slice도 실제로 재사용되는 경우에만 독립적으로 분리하세요
- 한 곳에서만 사용되는 코드는 해당 Page나 Feature 내부로 이동하는 것이 좋습니다
:::

### 2. Cross Import 표준화

새로운 `@x-` 표기법을 사용하여 Entity 간 참조를 표준화합니다:

```ts title="entities/B/some/file.ts"
// 표준화된 Cross Import 방식
import type { EntityA } from "entities/A/@x/B";
```

자세한 내용은 [Cross Import를 위한 Public API][public-api-for-cross-imports] 문서를 참조하세요.

[insignificant-slice]: https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/insignificant-slice
[steiger]: https://github.com/feature-sliced/steiger
[excessive-slicing]: https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/excessive-slicing
[public-api-for-cross-imports]: /docs/reference/public-api#public-api-for-cross-imports




