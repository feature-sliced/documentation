---
sidebar_position: 3
---

# v2.0에서 v2.1로의 마이그레이션

v2.1에서 가장 큰 변화는 pages first 접근 방식을 통해 인터페이스를 분해하는 새로운 사고방식을 도입한 점입니다.

v2.0에서는 FSD가 인터페이스의 엔티티와 기능을 식별하고, 엔티티 표현과 상호작용을 가장 작은 단위로 분해하도록 권장했습니다. 이후, 이러한 엔티티와 기능을 바탕으로 위젯과 페이지를 구축했습니다. 이 분해 모델에서는 대부분의 로직이 엔티티와 기능에 집중되어 있었고, 페이지는 자체적으로 큰 의미를 가지지 않는 단순한 구성 계층으로 여겨졌습니다.

v2.1에서는 페이지를 출발점으로 삼고, 가능하면 거기서 멈출 것을 권장합니다. 대부분의 사용자는 이미 앱을 개별 페이지로 나누는 방법을 알고 있으며, 코드베이스 내 컴포넌트를 찾을 때도 페이지가 일반적인 시작점으로 사용됩니다. 이 새로운 분해 모델에서는 각 페이지에 대부분의 UI와 로직을 유지하며, Shared에서는 재사용 가능한 기반만 관리합니다. 여러 페이지에서 비즈니스 로직을 재사용해야 할 필요가 생길 경우에만 하위 계층으로 이동합니다.

Feature-Sliced Design(v2.1)에서는 엔티티 간 교차 가져오기를 표준화하기 위해 `@x` 표기법이 도입되었습니다.

## 마이그레이션 방법 {#how-to-migrate}

v2.1은 하위 호환성을 유지하므로, FSD v2.0으로 작성된 프로젝트는 FSD v2.1에서도 유효합니다. 따라서 v2.1로의 전환은 기존 프로젝트의 기능에 영향을 미치지 않습니다. 다만, 새로운 Mental Model이 팀 전반, 특히 새로운 개발자의 온보딩에 더 유익하다고 판단되므로, 분해 방식에 약간의 조정을 권장합니다.

### 슬라이스 병합

시작하는 간단한 방법은 우리의 linter [Steiger][steiger]를 프로젝트에서 실행하는 것입니다. Steiger는 새로운 멘탈 모델로 구축되었으며, 가장 유용한 규칙은 다음과 같습니다:

- [`insignificant-slice`][insignificant-slice] — 특정 엔티티나 기능이 단 하나의 페이지에서만 사용될 경우, 이를 해당 페이지에 완전히 병합하도록 권장합니다.
- [`excessive-slicing`][excessive-slicing] — 계층에 지나치게 많은 슬라이스가 포함된 경우, 이는 과도한 세분화의 신호일 수 있습니다. 이 규칙은 프로젝트 탐색을 용이하게 하기 위해 일부 슬라이스를 병합하거나 그룹화하도록 제안합니다.

```bash
npx steiger src
```

이를 통해 한 번만 사용되는 슬라이스를 식별하고, 해당 슬라이스가 정말 필요한지 다시 검토할 수 있습니다. 이때, 계층이 그 안에 포함된 모든 슬라이스에 대해 일종의 전역 네임스페이스 역할을 한다는 점을 기억해야 합니다. 한 번만 사용되는 변수가 전역 네임스페이스를 오염시키지 않도록 주의하듯, 계층 내 네임스페이스의 위치도 귀중한 자원으로 간주하고 신중하게 활용해야 합니다.

### 교차 가져오기 표준화

기존 프로젝트에서 교차 가져오기를 사용한 적이 있더라도 걱정하지 마세요. 이제 Feature-Sliced Design의 새로운 표준 교차 가져오기 방식인 `@x-` 표기법을 도입할 수 있습니다. 이 표기법은 다음과 같은 형태로 활용됩니다:

```ts title="entities/B/some/file.ts"
import type { EntityA } from "entities/A/@x/B";
```

더 자세한 내용은 참고 문서의 [교차 가져오기용 Public API][public-api-for-cross-imports] 섹션을 확인하세요.

[insignificant-slice]: https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/insignificant-slice
[steiger]: https://github.com/feature-sliced/steiger
[excessive-slicing]: https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/excessive-slicing
[public-api-for-cross-imports]: /docs/reference/public-api#public-api-for-cross-imports




