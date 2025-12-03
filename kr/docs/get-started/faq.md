# FAQ

info

질문은 언제든 [Telegram](https://t.me/feature_sliced), [Discord](https://discord.gg/S8MzWTUsmp), [GitHub Discussions](https://github.com/feature-sliced/documentation/discussions)에서 남겨 주세요.

### Toolkit이나 Linter가 있나요?[​](#toolkit이나-linter가-있나요 "해당 헤딩으로 이동")

프로젝트 구조가 FSD 규칙에 맞는지 점검하는 **[Steiger Linter](https://github.com/feature-sliced/steiger)** 가 있습니다.<br /><!-- -->또한 CLI나 IDE 확장을 통해 사용할 수 있는 **[FSD 구조 생성 도구](https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools)** 도 제공합니다.

### Page Layout / Template은 어디에 보관해야 하나요?[​](#page-layout--template은-어디에-보관해야-하나요 "해당 헤딩으로 이동")

단순한 마크업이라면 `shared/ui`에 두는 것이 일반적입니다.<br /><!-- -->레이아웃이 간단하다면 **별도 추상화 없이 각 페이지에 직접 작성해도 됩니다.**<br /><!-- -->복잡한 구조라면 별도 **Widget**이나 **Page**로 분리해 App Router(Nested Routing 포함)에서 조합하세요.

### Feature와 Entity의 차이는 무엇인가요?[​](#feature와-entity의-차이는-무엇인가요 "해당 헤딩으로 이동")

| 구분        | 정의                                    | 예시                  |
| ----------- | --------------------------------------- | --------------------- |
| **Entity**  | 애플리케이션이 다루는 **비즈니스 개체** | `user`, `product`     |
| **Feature** | 사용자가 Entity로 수행하는 **상호작용** | 로그인, 장바구니 담기 |

더 자세한 설명과 코드 예시는 [Slices](/documentation/kr/docs/reference/layers.md#entities) 문서에서 확인할 수 있습니다.

### Pages, Features, Entities를 서로 포함할 수 있나요?[​](#pages-features-entities를-서로-포함할-수-있나요 "해당 헤딩으로 이동")

가능합니다. 다만 **상위 Layer**에서만 조합해야 합니다.<br /><!-- -->예를 들어, Widget 내부에서는 여러 Feature를 **props**나 **children** 형태로 조합할 수 있습니다.<br /><!-- -->하지만 한 Feature가 다른 Feature를 직접 import 하는 것은 [**Layer Import 규칙**](/documentation/kr/docs/reference/layers.md#import-rule-on-layers)에 따라 금지됩니다.

### Atomic Design을 함께 사용할 수 있나요?[​](#atomic-design을-함께-사용할-수-있나요 "해당 헤딩으로 이동")

궁금하다면 [예시](https://t.me/feature_sliced/1653)를 참고하세요.<br /><!-- -->FSD는 Atomic Design 사용을 **제한하지 않습니다.**<br /><!-- -->필요하다면 `ui` Segment 안에서 Atomic 분류를 적용할 수 있습니다.

### FSD 관련 참고 자료가 더 있나요?[​](#fsd-관련-참고-자료가-더-있나요 "해당 헤딩으로 이동")

더 다양한 예제와 자료는 [feature-sliced/awesome](https://github.com/feature-sliced/awesome)에서 확인할 수 있습니다.

### Feature-Sliced Design이 필요한 이유는 무엇인가요?[​](#feature-sliced-design이-필요한-이유는-무엇인가요 "해당 헤딩으로 이동")

FSD는 프로젝트를 **핵심 기능 단위로 명확하게 구조화**할 수 있도록 돕습니다.<br /><!-- -->표준화된 구조는 온보딩 속도를 높이고, 폴더 구조에 대한 불필요한 논쟁을 줄여 줍니다.<br /><!-- -->자세한 배경은 [Motivation](/documentation/kr/docs/about/motivation.md) 페이지를 참고하세요.

### 주니어 개발자도 아키텍처 방법론이 필요할까요?[​](#주니어-개발자도-아키텍처-방법론이-필요할까요 "해당 헤딩으로 이동")

필요합니다. 혼자 개발할 때는 구조의 중요성이 잘 느껴지지 않지만,<br /><!-- -->새로운 팀원이 합류하거나 개발이 일시적으로 중단되더라도, **명확한 구조 덕분에 프로젝트를 쉽게 이어갈 수 있습니다.**

### 인증(Auth) Context는 어떻게 다루나요?[​](#인증auth-context는-어떻게-다루나요 "해당 헤딩으로 이동")

관련 예시는 [Auth 예제 가이드](/documentation/kr/docs/guides/examples/auth.md)에서 확인할 수 있습니다.
