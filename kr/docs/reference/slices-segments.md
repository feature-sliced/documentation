# Slices and segments

## Slice[​](#slice "해당 헤딩으로 이동")

Slice는 Feature-Sliced Design 조직 구조의 **두 번째 계층**입니다.<br /><!-- -->주 목적은 제품, 비즈니스, 또는 단순히 애플리케이션 관점에서 **관련 있는 코드를 하나로 묶는 것**입니다.

Slice의 이름은 표준화되어 있지 않고, 애플리케이션의 비즈니스 도메인에 따라 결정됩니다. 예를 들어:

* 사진 갤러리: `photo`, `effects`, `gallery-page`
* 소셜 네트워크: `post`, `comments`, `news-feed`

`Shared`와 `App` Layer는 Slice를 포함하지 않습니다.<br /><!-- -->Shared는 비즈니스 로직이 전혀 없어 제품 관점에서 의미가 없고, App은 애플리케이션 전체를 다루기 때문에 별도로 나눌 필요가 없습니다.

### Zero 결합도와 높은 응집도[​](#zero-coupling-high-cohesion "해당 헤딩으로 이동")

Slice는 **다른 Slice와 독립적**이며, **자신의 핵심 목적과 관련된 대부분의 코드**를 포함해야 합니다.<br /><!-- -->아래 그림은 **응집도(cohesion)** 와 **결합도(coupling)** 개념을 시각적으로 설명합니다.

![](/documentation/kr/img/coupling-cohesion-light.svg#light-mode-only)![](/documentation/kr/img/coupling-cohesion-dark.svg#dark-mode-only)

Image inspired by <https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/>

Slice의 독립성은 [Layer Import Rule](/documentation/kr/docs/reference/layers.md#import-rule-on-layers)로 보장됩니다.

> *Slice 내부의 모듈(파일)은 자신보다 아래 계층(Layer)에 있는 Slice만 import할 수 있습니다.*

### Slice의 Public API 규칙[​](#slice의-public-api-규칙 "해당 헤딩으로 이동")

Slice 내부 구조는 **팀이 원하는 방식대로 자유롭게** 구성할 수 있습니다.<br /><!-- -->단, 다른 Slice가 사용할 수 있도록 **명확한 Public API**를 반드시 제공해야 합니다.<br /><!-- -->이 규칙은 **Slice Public API Rule**로 강제됩니다.

> *모든 Slice(또는 Slice가 없는 Layer의 Segment)는 Public API를 정의해야 합니다.*<br />*외부 모듈은 Slice/Segment의 내부 구조가 아니라 Public API를 통해서만 접근할 수 있습니다.*

Public API의 목적과 작성 방법은 [Public API Reference](/documentation/kr/docs/reference/public-api.md)에서 자세히 설명합니다.

### Slice Group[​](#slice-group "해당 헤딩으로 이동")

연관성이 높은 Slice는 폴더로 묶어서 관리할 수 있습니다.<br /><!-- -->단, 다른 Slice와 동일하게 **격리 규칙**을 적용해야 하며, 그룹 내부에서도 **코드 공유는 불가능**합니다.

![Features \&quot;compose\&quot;, \&quot;like\&quot; 그리고 \&quot;delete\&quot;가 \&quot;post\&quot; 폴더에 그룹화되어 있습니다. 해당 폴더에는 허용되지 않음을 나타내기 위해 취소선이 그어진 \&quot;some-shared-code.ts\&quot; 파일도 있습니다.](/documentation/kr/assets/images/graphic-nested-slices-b9c44e6cc55ecdbf3e50bf40a61e5a27.svg)

## Segment[​](#segment "해당 헤딩으로 이동")

Segment는 FSD 구조에서 **세 번째이자 마지막 계층**이며,<br /><!-- -->코드를 **기술적 성격**에 따라 그룹화합니다.

표준 Segment:

* `ui` — UI 관련: Component, Date Formatter, Style 등
* `api` — Backend 통신: Request Function, Data Type, Mapper 등
* `model` — Data Model: Schema, Interface, Store, Business Logic
* `lib` — Slice 내부 Library 코드
* `config` — Configuration과 Feature Flag

각 Layer에서 Segment를 어떻게 활용하는지는 [Layer 페이지](/documentation/kr/docs/reference/layers.md#layer-definitions)를 참고하세요.

또한 **커스텀 Segment**를 만들 수 있습니다.<br /><!-- -->특히 `App` Layer와 `Shared` Layer는 Slice가 없기 때문에, 커스텀 Segment가 자주 사용됩니다.

Segment 이름은 **내용의 본질(components/hooks/types)** 이 아니라 **목적**을 설명해야 합니다.<br /><!-- -->예를 들어 `components`, `hooks`, `types` 같은 이름은 찾을 때 도움이 되지 않으므로 피하세요.
