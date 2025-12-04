# Layer

Layer는 Feature-Sliced Design에서 코드를 나눌 때 사용하는 **가장 큰 구분 단위**입니다.<br /><!-- -->코드를 나눌 때는 각 부분이 **어떤 역할을 맡는지**, 그리고 **다른 코드에 얼마나 의존하는지**를 기준으로 합니다.<br /><!-- -->각 Layer는 **이 Layer에는 어떤 코드가 와야 하는지**에 대해 **공통된 의미와 책임**이 정해져 있습니다.

총 **7개의 Layer**가 있으며, 아래로 내려갈수록 **담당하는 기능과 의존성이 줄어드는 순서**입니다.

![A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets, features, entities, shared. The processes folder is slightly faded out.](/documentation/kr/img/layers/folders-graphic-light.svg#light-mode-only) ![A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets, features, entities, shared. The processes folder is slightly faded out.](/documentation/kr/img/layers/folders-graphic-dark.svg#dark-mode-only)

1. App
2. Processes (deprecated)
3. Pages
4. Widgets
5. Features
6. Entities
7. Shared

> 모든 Layer를 반드시 사용해야 하는 것은 아닙니다.<br />**필요한 경우에만** Layer를 추가하세요.<br /><!-- -->대부분의 프론트엔드 프로젝트는 보통 최소한 `shared`, `page`, `app` 정도는 사용합니다.

실무에서는 폴더명을 보통 소문자로 작성합니다. (예: `📁 shared`, `📁 page`, `📁 app`)<br /><!-- -->또한, **새로운 Layer를 직접 정의해서 사용하는 것은 권장하지 않습니다.**<br /><!-- -->(각 Layer의 역할이 이미 표준으로 충분히 정리되어 있기 때문입니다.)

## Import 규칙[​](#import-규칙 "해당 헤딩으로 이동")

각 Layer는 여러 개의 **Slice(서로 밀접하게 연관된 모듈 묶음)** 로 구성됩니다.<br /><!-- -->Slice들 사이의 연결은 **Layer Import 규칙**을 통해 제한합니다.

> **규칙:**<br /><!-- -->하나의 Slice 안에서 작성된 코드는<br />**자신이 속한 Layer보다 아래 Layer**에 있는 *다른 Slice*만 import할 수 있습니다.

예를 들어, `📁 ~/features/aaa/api/request.ts` 파일은 다음과 같습니다.

* 같은 Layer의 `📁 ~/features/bbb` → **import 불가능**
* 더 아래 Layer(`📁 ~/entities`, `📁 ~/shared`) → **import 가능**
* 같은 Slice(`📁 ~/features/aaa/lib/cache.ts`) → **import 가능**

`app`과 `shared`는 조금 특이한 Layer입니다.<br /><!-- -->두 Layer는 **Layer이면서 동시에 하나의 큰 Slice처럼 동작**하고 내부 구조는 **Segment**로 나뉩니다.

이 경우에는 Layer 내부에서 Segment끼리는 자유롭게 import할 수 있습니다.<br /><!-- -->(`shared`는 비즈니스 도메인이 없고, `app`은 모든 도메인을 묶는 상위 조정자 역할을 합니다.)

## Layer별 역할[​](#layer별-역할 "해당 헤딩으로 이동")

이제 각 Layer가 어떤 의미를 가지는지,<br /><!-- -->그리고 보통 어떤 종류의 코드가 해당 Layer에 들어오는지 정리해 보겠습니다.

### Shared[​](#shared "해당 헤딩으로 이동")

Shared Layer는 앱의 **기본 구성 요소와 기반 도구들을 모아두는 곳**입니다.<br /><!-- -->백엔드, 서드파티 라이브러리, 실행 환경과의 연결,<br /><!-- -->그리고 여러 곳에서 사용하는 **응집도 높은 내부 라이브러리**가 여기에 위치합니다.

`app`과 마찬가지로 **Slice 없이 Segment로만 구성**합니다.<br /><!-- -->비즈니스 도메인이 없기 때문에, **Shared 내부의 파일들은 서로 자유롭게 import**할 수 있습니다.

Segment 예시:

* `📁 api` — API 클라이언트와 공통 백엔드 요청 함수

* `📁 ui` — 공통 UI 컴포넌트

  <!-- -->

  * **비즈니스 로직은 포함하지 않지만**, **브랜드 테마는 적용 가능**
  * 로고, 레이아웃, 자동완성/검색창 등 **UI 자체 로직**을 포함하는 컴포넌트는 허용

* `📁 lib` — 내부 라이브러리

  <!-- -->

  * 단순히 `utils/helpers`를 모아두는 폴더가 아닙니다. ([이 글 참고](https://dev.to/sergeysova/why-utils-helpers-is-a-dump-45fo))
  * 날짜, 색상, 텍스트 등 **하나의 주제에 집중**해야 합니다.
  * README를 통해 역할과 범위를 문서화하는 것을 권장합니다.

* `📁 config` — 환경변수, 전역 Feature Flag

* `📁 routes` — 라우트 상수/패턴

* `📁 i18n` — 번역 설정, 전역 문자열

> Segment 이름은 **이 폴더가 무엇을 하는지**를 명확하게 드러내야 합니다.<br />`components`, `hooks`, `types`처럼 역할이 모호한 이름은 가급적 피하세요.

### Entities[​](#entities "해당 헤딩으로 이동")

Entities Layer는 프로젝트에서 다루는 **핵심 비즈니스 개념**을 표현합니다.<br /><!-- -->대부분의 경우, 실제 도메인 용어(예: `User`, `Post`, `Product`)와 일치합니다.

각 Entity Slice에는 다음과 같은 것들을 포함할 수 있습니다.

구성:

* `📁 model` — 데이터 상태, 도메인 로직, 검증 스키마

* `📁 api` — 해당 Entity와 관련된 API 요청

* `📁 ui` — Entity의 시각적 표현

  <!-- -->

  * 완성된 큰 UI 블록이 아니어도 됩니다.
  * 여러 페이지에서 재사용 가능한 형태로 설계합니다.
  * 비즈니스 로직은 가능하면 props/slot으로 외부에서 주입하는 방식을 권장합니다.

#### Entity 간 관계[​](#entity-간-관계 "해당 헤딩으로 이동")

원칙적으로는 Entity Slice끼리는 서로 **서로를 모르는 상태**가 이상적입니다.<br /><!-- -->하지만 실제 애플리케이션에서는 한 Entity가 다른 Entity를 **포함하거나**<br /><!-- -->여러 Entity가 서로 **상호작용**하는 일이 자주 발생합니다.

이런 경우, 두 Entity 간의 구체적인 상호작용 로직은<br />**상위 Layer(Feature 또는 Page)** 로 올려서 처리하는 것이 좋습니다.

만약 한 Entity의 데이터 안에 다른 Entity가 포함되어야 한다면,<br />`@x` 표기법을 사용해 **교차 Public API**를 통해 연결되었음을 명시해 주세요.

entities/artist/model/artist.ts

```
import type { Song } from "entities/song/@x/artist";

export interface Artist {
    name: string;
    songs: Array<Song>;
}
```

자세한 내용은 [Cross-Import를 위한 Public API](/documentation/kr/docs/reference/public-api.md#public-api-for-cross-imports) 문서를 참고하세요.

### Feature[​](#feature "해당 헤딩으로 이동")

Features Layer에는 **사용자가 애플리케이션에서 수행하는 주요 기능**이 들어갑니다.<br /><!-- -->보통 하나 이상의 Entity와 연관되어 동작합니다.

* 모든 동작을 무조건 Feature로 만들 필요는 없습니다.
* **여러 페이지에서 재사용되는 기능**일 때 Feature로 추출하는 것을 고려하세요.
* 예: 여러 종류의 에디터에서 동일한 댓글 기능을 사용한다면, `comments`를 Feature로 만들 수 있습니다.
* Feature가 너무 많아지면, 중요한 기능이 어디 있는지 찾기 어려워질 수 있습니다.

구성:

* `📁 ui` — 상호작용 UI (예: 폼, 검색 바 등)
* `📁 api` — 해당 기능과 직접 관련된 API 요청
* `📁 model` — 검증 로직, 내부 상태 관리
* `📁 config` — Feature Flag 등 기능별 설정

> 새로운 팀원이 프로젝트에 합류했을 때,<br /><!-- -->Page와 Feature만 훑어봐도 **이 앱이 어떤 기능을 제공하는지**를 대략 이해할 수 있도록 구성하는 것이 목표입니다.

### Widget[​](#widget "해당 헤딩으로 이동")

Widgets Layer는 **독립적으로 동작하는 비교적 큰 UI 블록**을 두는 곳입니다.<br /><!-- -->여러 페이지에서 재사용되거나, 한 페이지에서 **큰 섹션 단위로 나누어지는 UI 블록**이 있을 때 유용합니다.

tip

재사용되지 않고 특정 페이지의 핵심 콘텐츠에만 쓰인다면, 굳이 Widget으로 분리하지 말고 Page 내부에 두는 것이 좋습니다.<br /><!-- -->Nested Routing(예: [Remix](https://remix.run)) 환경에서는 Widget이 **Page와 비슷한 역할**을 할 수 있습니다.<br /><!-- -->예를 들어 데이터 로딩, 로딩 상태 표시, 에러 처리 등을 모두 포함하는 **하나의 라우터 단위 UI 블록**으로 동작할 수 있습니다.

### Page[​](#page "해당 헤딩으로 이동")

Pages Layer는 웹/앱에서 보이는 **화면(screen) 또는 액티비티(activity)** 에 해당합니다.<br /><!-- -->일반적으로 “페이지 1개 = Slice 1개” 구조를 많이 사용하지만,<br /><!-- -->구조가 유사한 페이지들은 하나의 Slice로 묶는 것도 가능합니다.

코드를 찾기만 쉽다면, Page Slice의 크기에 특별한 제한은 없습니다.<br /><!-- -->재사용되지 않는 UI는 그대로 Page 내부에 두면 됩니다.<br /><!-- -->Page Layer에는 보통 전용 model이 없으며, 필요한 경우 간단한 상태만 컴포넌트 내부에서 관리합니다.

구성 예:

* `📁 ui` — 페이지 UI, 로딩 상태, 에러 상태 처리
* `📁 api` — 페이지에서 사용하는 데이터 패칭/변경 요청

### Process[​](#process "해당 헤딩으로 이동")

caution

**Deprecated** — 기존에 사용하던 코드는 가능하면 Feature나 App Layer로 이동하세요.

과거에는 여러 페이지를 넘나드는 복잡한 기능을 처리하기 위한 **탈출구 같은 Layer**로 사용되었습니다.<br /><!-- -->하지만 역할이 모호하고, 대부분의 애플리케이션에서는 굳이 사용하지 않아도 충분히 설계가 가능합니다.

라우터, 서버 연동 같은 전역적인 로직은 보통 App Layer에 둡니다.<br /><!-- -->App Layer가 너무 복잡해질 때 정말 필요한 경우에만 제한적으로 고려할 수 있습니다.

### App[​](#app "해당 헤딩으로 이동")

App Layer는 앱 전역에서 동작하는 **환경 설정**과 **공용 로직**을 관리하는 곳입니다.<br /><!-- -->예를 들어 라우터 설정, 전역 상태 관리(Store 설정), 글로벌 스타일 앱 진입점(Entry Point) 설정 등과 같이<br />**앱 전체에 영향을 주는 코드**가 위치합니다.<br />`shared`와 마찬가지로 Slice 없이 **Segment만으로 구성**합니다.

대표적인 Segment 예:

* `📁 routes` — Router 설정
* `📁 store` — Global State Store 설정
* `📁 styles` — Global Style
* `📁 entrypoint` — Application Entry Point와 Framework 설정
