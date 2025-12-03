# 개요

**Feature-Sliced Design (FSD)** 는 프론트엔드 애플리케이션의 코드를 구조화하기 위한 아키텍처 방법론입니다.<br /><!-- -->이 방법론의 목적은 **요구사항이 바뀌어도 코드 구조가 무너지지 않고, 새 기능을 쉽게 추가할 수 있는 프로젝트를 만드는 것**입니다.<br /><!-- -->FSD는 코드를 **얼마나 많은 책임을 가지는지**와 **다른 모듈에 얼마나 의존하는지**에 따라 계층화합니다.

FSD는 단순한 폴더 규칙이 아닙니다.<br /><!-- -->실제 개발 환경에서 구조를 설계하고 유지하기 위한 도구도 함께 제공합니다.

* [Steiger](https://github.com/feature-sliced/steiger) — 프로젝트 구조가 FSD 기준에 맞는지 검사합니다.
* [Awesome](https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools) — FSD 예제와 도구를 모아둔 참고 리스트입니다.
* [예제 모음](/documentation/kr/examples.md) — 다양한 프로젝트에서 사용된 폴더 구조 예시를 볼 수 있습니다.

## 내 프로젝트에 적합할까요?[​](#is-it-right-for-me "해당 헤딩으로 이동")

FSD는 웹, 모바일, 데스크톱 등 **프론트엔드 애플리케이션을 만드는 프로젝트에 잘 어울립니다.**<br /><!-- -->단순한 라이브러리보다는 **애플리케이션**에 더 적합합니다.

그리고 특정 언어나 프레임워크에 제한이 없고, Monorepo 환경에서도 단계적으로 적용할 수 있습니다.

> 지금 구조에 특별한 문제가 없다면 굳이 바꿀 필요는 없습니다.<br /><!-- -->하지만 다음과 같은 상황이라면 FSD가 도움이 될 수 있습니다:
>
> * 프로젝트가 커지면서 구조가 얽히고, 유지보수 속도가 느려졌을 때
> * 새로 합류한 팀원이 폴더 구조를 이해하기 힘들어할 때

다만 모든 프로젝트가 FSD에 꼭 맞는 것은 아닙니다.<br /><!-- -->예시로 각 페이지가 독립적인 특성을 가진 프로젝트에서는 오히려 구조가 복잡해질 수 있습니다.<br /><!-- -->따라서 도입 전에는 **파일럿 프로젝트로 먼저 검증해보는 것**을 적극 추천합니다.

구조를 전환하기로 했다면 [Migration 가이드](/documentation/kr/docs/guides/migration/from-custom.md)를 참고하세요.

## 구조 예시[​](#basic-example "해당 헤딩으로 이동")

간단한 FSD 구조는 다음과 같습니다:

```
- 📁 app
- 📁 pages
- 📁 shared
```

이 상위 폴더들이 **Layer**입니다.<br /><!-- -->Layer는 표준화된 이름을 가지며, 각각 명확한 역할을 담당합니다.

```
- 📂 app
   - 📁 routes
   - 📁 analytics
- 📂 pages
   - 📁 home
   - 📂 article-reader
      - 📁 ui
      - 📁 api
   - 📁 settings
- 📂 shared
   - 📁 ui
   - 📁 api
```

📂 pages 내부의 *home*, *article-reader*, *settings*는 **Slice**입니다.<br /><!-- -->Slice는 비즈니스 도메인(이 예시에서는 각 페이지) 단위로 코드를 구분합니다.

각 Slice 안에는 ui, api, model 등의 **Segment**가 있습니다.<br /><!-- -->Segment는 코드의 역할이나 기능에 따라 분류됩니다.

* **ui** - UI Components
* **api** - REST/GraphQL Client, Fetchers
* **model** - State, Types, Selectors

예를 들어 UI 구성 요소, 서버 연동 등이 이에 해당합니다.<br /><!-- -->동일한 구조는 app과 shared Layer에도 적용할 수 있습니다.

## 개념[​](#concepts "해당 헤딩으로 이동")

FSD는 다음과 같은 3단계 계층 구조를 따릅니다:

![아래에 설명된 FSD 개념의 계층 구조](/documentation/kr/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

위 다이어그램은 FSD의 계층 구조를 시각적으로 보여줍니다.<br />세 개의 수직 블록 그룹은 각각 **Layer**, **Slice**, **Segment**를 나타냅니다.

왼쪽의 Layer 블록에는 `app`, `processes`, `pages`, `widgets`, `features`, `entities`, `shared`가 포함됩니다.

예를 들어, `entities` Layer 안에는 여러 개의 Slice가 존재하며, 예시로는 `user`, `post`, `comment` 등이 있습니다.

Slice는 비즈니스 도메인별(user, post, comment)로 나뉘며, 각 Slice 안의 Segment들은 코드의 역할(예: UI, 데이터, 상태) 에 따라 구성됩니다.<br />예시로 `post` Slice에는 `ui`, `model`, `api` Segment가 포함됩니다.

### Layer[​](#layers "해당 헤딩으로 이동")

Layer는 모든 FSD 프로젝트의 표준 최상위 폴더입니다.

1. **App** - Routing, Entrypoint, Global Styles, Provider 등 앱을 실행하는 모든 요소
2. **Processes** - 더 이상 사용되지 않음
3. **Pages** - Route 기준으로 구성된 주요 화면 단위
4. **Widgets** - 크고 독립적으로 동작하는 UI 구성 단위, 일반적으로 하나의 완결된 화면 기능(use case)을 제공합니다.
5. **Features** - 사용자에게 비즈니스 가치를 제공하는 액션을 구현한 재사용 가능한 제품 기능 단위
6. **Entities** - 프로젝트가 다루는 비즈니스 Entity
7. **Shared** - 모든 Layer에서 재사용되는 코드(라이브러리, 유틸리티 등)

**App/Shared** Layer는 Slice 없이 Segment로 구성됩니다.<br /><!-- -->상위 Layer는 자신보다 하위 Layer를 참조 할 수 있지만, 하위 Layer가 상위 Layer를 참조하는 것은 허용되지 않습니다.<br /><!-- -->예를 들어 pages는 features나 entities의 모듈을 참조할 수 있지만, features가 pages를 참조하는 것은 금지됩니다.

### Slice[​](#slices "해당 헤딩으로 이동")

Slice는 Layer 내부를 비즈니스 도메인별로 나눕니다.<br /><!-- -->이름/개수에 제한이 없으며, 같은 Layer 내 다른 Slice를 참조할 수 없습니다.<br /><!-- -->이 규칙이 높은 응집도와 낮은 결합도를 보장합니다.

### Segment[​](#segments "해당 헤딩으로 이동")

Slice와 App/Shared Layer는 Segment로 세분화되어, 코드의 역할(예: UI, 데이터 처리, 상태 관리 등)에 따라 코드를 그룹화합니다.<br /><!-- -->일반적으로 다음과 같은 Segment를 사용합니다

* `ui` - UI components, date formatter, styles 등 UI 표현과 직접 관련된 코드
* `api` - request functions, data types, mappers 등 백엔드 통신 및 데이터 로직
* `model` - schema, interfaces, store, business logic 등 애플리케이션 도메인 모델
* `lib` - 해당 Slice에서 여러 모듈이 함께 사용하는 공통 library code
* `config` - configuration files, feature flags 등 환경/기능 설정

대부분의 Layer에서는 위 다섯 Segment로 충분합니다.<br /><!-- -->필요하다면 App 또는 Shared Layer에서만 추가 Segment를 정의하세요.

## 장점[​](#advantages "해당 헤딩으로 이동")

FSD 구조를 사용하면 다음과 같은 장점을 얻을 수 있습니다:

**일관성**<br /><!-- -->구조가 표준화되어 팀 간 협업과 신규 멤버 온보딩이 쉬워집니다.

**격리성**<br /><!-- -->Layer와 Slice 간 의존성을 제한하여, 특정 모듈만 안전하게 수정할 수 있습니다.

**재사용 범위 제어**<br /><!-- -->재사용 가능한 코드를 필요한 범위에서만 활용할 수 있어, **DRY** 원칙과 실용성을 균형 있게 유지합니다.

**도메인 중심 구조**<br /><!-- -->비즈니스 용어 기반의 구조로 되어 있어, 전체 코드를 몰라도 특정 기능을 독립적으로 구현할 수 있습니다.

## 점진적 도입[​](#incremental-adoption "해당 헤딩으로 이동")

기존 프로젝트에 FSD를 도입하는 방법:

1. `app`, `shared` Layer를 먼저 정리하며 기반을 다집니다.
2. 기존 UI를 `widgets`, `pages` Layer로 분배합니다. 이 과정에서 FSD 규칙을 위반해도 괜찮습니다.
3. Import 위반을 하나씩 해결하면서, 코드에서 로직을 분리해 `entities`와 `features`로 옮깁니다.

> 도입 단계에서는 새로운 대규모 Entity나 복잡한 기능을 추가하지 않는 것이 좋습니다.<br /><!-- -->구조를 안정적으로 정리하는 데 집중하는 것이 우선입니다.<br /><!-- -->자세한 절차는 [Migration 가이드](/documentation/kr/docs/guides/migration/from-custom.md)를 참고하세요.

## 다음 단계[​](#next-steps "해당 헤딩으로 이동")

* [Tutorial](/documentation/kr/docs/get-started/tutorial.md)을 통해 FSD 방식의 사고를 익혀보세요.
* 다양한 [예제](/documentation/kr/examples.md)를 통해 실제 프로젝트 구조를 살펴보세요.
* 궁금한 점은 [Telegram 커뮤니티](https://t.me/feature_sliced)에서 질문해보세요.
