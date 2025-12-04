# Slices and segments

## Slice[​](#slice "해당 헤딩으로 이동")

Slice는 Feature-Sliced Design 조직 구조에서 **두 번째 계층**입니다.<br /><!-- -->역할은 제품, 비즈니스, 또는 애플리케이션 관점에서 **서로 관련 있는 코드를 하나로 묶는 것**입니다.

Slice 이름은 고정된 규칙이 없으며, 애플리케이션의 **비즈니스 도메인**에 맞춰 정합니다.

예를 들어:

* 사진 갤러리: `photo`, `effects`, `gallery-page`
* 소셜 네트워크: `post`, `comments`, `news-feed`

`Shared` Layer와 `App` Layer는 Slice를 가지지 않습니다.

* `Shared` Layer는 비즈니스 로직이 전혀 없으므로, 제품 관점에서 Slice로 나눌 의미가 없습니다.
* `App` Layer는 애플리케이션 전체를 다루기 때문에, 여기서 다시 Slice로 나눌 필요가 없습니다.

### Zero 결합도와 높은 응집도[​](#zero-coupling-high-cohesion "해당 헤딩으로 이동")

Slice는 **다른 Slice와 최대한 독립적**이어야 하고,<br /><!-- -->또한 **자신의 핵심 목적과 직접 관련된 코드 대부분을 내부에 포함**해야 합니다.

아래 그림은 **응집도(cohesion)** 와 **결합도(coupling)** 개념을 시각적으로 보여 줍니다.

![](/documentation/kr/img/coupling-cohesion-light.svg#light-mode-only)![](/documentation/kr/img/coupling-cohesion-dark.svg#dark-mode-only)

Image inspired by <https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/>

Slice 간 독립성은 [Layer Import Rule](/documentation/kr/docs/reference/layers.md#import-rule-on-layers)로 보장됩니다.

> *Slice 내부 모듈(파일)은 자신보다 아래 계층(Layer)에 있는 Slice만 import할 수 있습니다.*

### Slice의 Public API 규칙[​](#slice의-public-api-규칙 "해당 헤딩으로 이동")

Slice 내부 구조는 **팀이 원하는 방식으로 자유롭게** 설계할 수 있습니다.<br /><!-- -->하지만 다른 Slice에서 사용할 수 있도록 **명확한 Public API**를 반드시 제공해야 합니다.<br /><!-- -->이 규칙을 **Slice Public API Rule**이라고 부릅니다.

> *모든 Slice(또는 Slice가 없는 Layer의 Segment)는 Public API를 정의해야 합니다.*<br />*외부 모듈은 Slice/Segment의 내부 구조에 직접 접근하지 않고, Public API를 통해서만 접근해야 합니다.*

Public API의 역할과 작성 방법은 [Public API Reference](/documentation/kr/docs/reference/public-api.md)에서 자세히 설명합니다.

### Slice Group[​](#slice-group "해당 헤딩으로 이동")

서로 연관성이 높은 Slice들은 폴더로 묶어 **그룹처럼** 관리할 수 있습니다.<br /><!-- -->다만, 그룹으로 묶더라도 각 Slice에 대해 기존과 동일한 **격리 규칙**이 적용되며,<br />**그룹 내부라고 해서 코드 공유가 허용되는 것은 아닙니다.**

![Features \&quot;compose\&quot;, \&quot;like\&quot; 그리고 \&quot;delete\&quot;가 \&quot;post\&quot; 폴더에 그룹화되어 있습니다. 해당 폴더에는 허용되지 않음을 나타내기 위해 취소선이 그어진 \&quot;some-shared-code.ts\&quot; 파일도 있습니다.](/documentation/kr/assets/images/graphic-nested-slices-b9c44e6cc55ecdbf3e50bf40a61e5a27.svg)

## Segment[​](#segment "해당 헤딩으로 이동")

Segment는 FSD 구조에서 **세 번째이자 마지막 계층**으로,<br /><!-- -->코드를 **기술적인 역할과 성격**에 따라 나누는 기준입니다.

표준 Segment는 다음과 같습니다.

* `ui` — UI 관련 코드: Component, Date Formatter, Style 등
* `api` — Backend 통신: Request Function, Data Type, Mapper 등
* `model` — Data Model: Schema, Interface, Store, Business Logic 등
* `lib` — Slice 내부에서 사용하는 Library 코드
* `config` — Configuration, Feature Flag 등 설정 관련 코드

각 Layer에서 Segment를 어떻게 사용하는지는 [Layer 페이지](/documentation/kr/docs/reference/layers.md#layer-definitions)에서 자세히 설명합니다.

또한 프로젝트에 맞게 **커스텀 Segment**를 정의할 수도 있습니다.<br /><!-- -->특히 `App` Layer와 `Shared` Layer는 Slice가 없기 때문에,<br /><!-- -->이 두 Layer에서는 커스텀 Segment를 자주 사용하게 됩니다.

Segment 이름을 정할 때는,<br /><!-- -->폴더 안에 **무슨 파일이 들어 있는지**가 아니라 **무엇을 위해 존재하는지(목적)** 가 드러나도록 작성하는 것이 좋습니다.

예를 들어 `components`, `hooks`, `types` 같은 이름은 성격만 나타낼 뿐,<br />**역할이나 목적을 알기 어렵기 때문에** 가능한 한 피하는 편이 좋습니다.
