---
sidebar_position: 20
pagination_next: guides/examples/auth
---

# FAQ

:::info
질문은 언제든 [Telegram][telegram], [Discord][discord], [GitHub Discussions][github-discussions]에서 남겨 주세요.
:::

### Toolkit이나 Linter가 있나요?

프로젝트 아키텍처를 FSD 규칙에 맞게 검사 [Steiger][ext-steiger] Linter가 있으며, CLI · IDE 확장을 통해 사용할 수 있는 [폴더 생성기][ext-tools]도 함께 제공됩니다.

### Page Layout / Template은 어디에 보관해야 하나요?

- **단순 마크업**이라면 `shared/ui`에 두는 것이 일반적입니다.  
- 코드가 몇 줄뿐이라면 굳이 추상화하지 말고 각 페이지에 직접 작성해도 무방합니다.  
- 복잡한 Layout이 필요하다면 별도 **Widget** 또는 **Page**로 분리하고 App Router(또는 Nested Routing)에서 조합하세요.

### Feature와 Entity의 차이는 무엇인가요?

| 구분 | 정의 | 예시 |
| --- | --- | --- |
| **Entity** | 애플리케이션이 다루는 **비즈니스 개체** | `user`, `product` |
| **Feature** | 사용자가 Entity로 수행하는 **실제 상호작용** | 로그인, 장바구니 담기 |

더 자세한 내용과 예시는 [Slices][reference-entities]에서 확인할 수 있습니다.

### Pages, Features, Entities를 서로 포함할 수 있나요?

가능합니다. 다만 **상위 Layer**에서만 조합해야 합니다.  
예: Widget 내부에서 여러 Feature를 props / children 형태로 결합할 수 있지만, 한 Feature가 다른 Feature를 직접 import 하는 것은 [**Layer Import 규칙**][import-rule-layers]에 의해 금지됩니다.

### Atomic Design을 함께 사용할 수 있나요?

네. FSD는 Atomic Design 사용을 **요구하지도, 금지하지도** 않습니다.  
필요하다면 `ui` Segment 내부에서 Atomic 분류를 적용할 수 있습니다. [예시](https://t.me/feature_sliced/1653)

### FSD 관련 참고 자료가 더 있나요?

커뮤니티가 정리한 자료 모음은 [feature‑sliced/awesome](https://github.com/feature-sliced/awesome)에서 확인할 수 있습니다.

### Feature‑Sliced Design이 필요한 이유는 무엇인가요?

표준화된 아키텍처는 프로젝트를 빠르게 파악하게 해 줍니다.  
온보딩 속도를 높이고 “폴더 구조 논쟁”을 줄여 주는 것이 FSD의 핵심 가치입니다. 자세한 배경은 [Motivation][motivation] 페이지를 참고하세요.

### 주니어 개발자도 아키텍처 방법론이 필요할까요?

필요합니다.  
*혼자 개발할 때는 문제가 없어 보여도, 개발 공백이 생기거나 새로운 팀원이 합류하면 구조의 중요성이 드러납니다*


### 인증(Auth) Context는 어떻게 다루나요?

[예제 가이드](/docs/guides/examples/auth)에서 자세히 설명했습니다.

[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-tools]: https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools
[import-rule-layers]: /docs/reference/layers#import-rule-on-layers
[reference-entities]: /docs/reference/layers#entities
[motivation]: /docs/about/motivation
[telegram]: https://t.me/feature_sliced
[discord]: https://discord.gg/S8MzWTUsmp
[github-discussions]: https://github.com/feature-sliced/documentation/discussions
