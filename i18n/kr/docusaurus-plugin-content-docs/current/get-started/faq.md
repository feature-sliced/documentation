---
sidebar_position: 20
pagination_next: guides/index
---

# FAQ

:::info

여러분은 [Telegram chat][telegram], [Discord community][discord] 그리고 [GitHub Discussions][github-discussions]에서 질문을 할 수 있습니다.

:::

### toolkit이나 linter가 있나요?

공식 ESLint 설정인 [@feature-sliced/eslint-config][eslint-config-official]와 커뮤니티 멤버인 Aleksandr Belous가 만든 ESLint 플러그인 [@conarti/eslint-plugin-feature-sliced][eslint-plugin-conarti]가 있습니다. 이 프로젝트들에 기여하거나 여러분만의 프로젝트를 시작해보세요!

### Where to store the layout/template of pages?

순수한 마크업 레이아웃이 필요하다면 `shared/ui`에 보관할 수 있습니다. 상위 계층을 사용해야 한다면 몇 가지 옵션이 있습니다.

- 레이아웃이 필요 없을 수도 있습니다. 레이아웃이 몇 줄밖에 안 된다면, 추상화하려고 하기보다는 각 페이지에서 코드를 중복하는 것이 합리적일 수 있습니다.
- 레이아웃이 필요하다면, 별도의 위젯이나 페이지로 만들고 App의 라우터 설정에서 조합할 수 있습니다. 중첩 라우팅도 다른 옵션입니다.

### feature와 entity의 차이점이 무엇인가요?

*entity*는 앱이 다루는 실제 개념입니다. *feature*는 앱 사용자에게 실제 가치를 제공하는 상호작용, 즉 사람들이 entity로 하고 싶어하는 것입니다.

더 자세한 정보와 예시는 [slices][reference-entities] 참조 페이지를 확인하세요.

### pages/features/entities를 서로 포함시킬 수 있나요?

네, 하지만 이런 포함은 상위 계층에서 이루어져야 합니다. 예를 들어, 위젯 내부에서 여러 기능을 가져와서 하나의 기능을 다른 기능의 props/children으로 삽입할 수 있습니다.

한 기능을 다른 기능에서 가져올 수는 없습니다. 이는 [**계층에 대한 가져오기 규칙**][import-rule-layers]에 의해 금지됩니다.

### 아토믹 디자인은 어떤가요?

현재 버전의 방법론은 Feature-Sliced Design과 함께 아토믹 디자인을 사용하는 것을 요구하지도, 금지하지도 않습니다.

예를 들어, 아토믹 디자인은 모듈의 `ui` 세그먼트에 [잘 적용될 수 있습니다](https://t.me/feature_sliced/1653).

### FSD에 대한 유용한 리소스/기사 등이 있나요?

네! https://github.com/feature-sliced/awesome 를 참조하세요.

### Feature-Sliced Design이 왜 필요한가요?

프로젝트를 주요 가치 창출 구성 요소 측면에서 빠르게 개요를 파악하는 데 도움이 됩니다. 표준화된 아키텍처는 온보딩 속도를 높이고 코드 구조에 대한 논쟁을 해결합니다. FSD가 만들어진 이유에 대해 더 자세히 알아보려면 [동기][motivation] 페이지를 참조하세요.

### 초보 개발자에게 아키텍처/방법론이 필요한가요?

그렇다고 볼 수 있습니다.

*보통 한 사람이 프로젝트를 설계하고 개발할 때는 모든 것이 순조롭게 진행됩니다. 하지만 개발에 중단이 있거나 새로운 개발자가 팀에 합류하면 문제가 발생합니다*


### 인증 컨텍스트는 어떻게 다루나요?

[여기](/docs/guides/examples/auth)에서 답변했습니다.

[import-rule-layers]: /docs/reference/layers#import-rule-on-layers
[reference-entities]: /docs/reference/layers#entities
[eslint-config-official]: https://github.com/feature-sliced/eslint-config
[eslint-plugin-conarti]: https://github.com/conarti/eslint-plugin-feature-sliced
[motivation]: /docs/about/motivation
[telegram]: https://t.me/feature_sliced
[discord]: https://discord.gg/S8MzWTUsmp
[github-discussions]: https://github.com/feature-sliced/documentation/discussions
