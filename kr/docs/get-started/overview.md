# 개요

**Feature-Sliced Design (FSD)** 는 프론트엔드 애플리케이션 구조를 위한 아키텍처 방법론입니다. 코드를 어떻게 분리하고 구성할지를 명확히 정의하여, 변화하는 비즈니스 요구 속에서도 프로젝트를 이해하기 쉽고 안정적으로 유지할 수 있도록 돕습니다.

FSD는 단순한 규칙 집합이 아니라 실무를 위한 도구 체계도 함께 제공합니다.

* 프로젝트 아키텍처를 검사하는 [Linter](https://github.com/feature-sliced/steiger)
* CLI 및 IDE 기반의 [폴더 생성기](https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools)
* 다양한 구조를 참고할 수 있는 [예제 모음](/documentation/kr/examples.md)

## 내 프로젝트에 적합할까요?[​](#is-it-right-for-me "해당 헤딩으로 이동")

FSD는 다음 조건에 해당하면 도입할 수 있습니다:

* **프론트엔드**(웹, 모바일, 데스크톱 등)를 개발하고 있고
* **라이브러리**가 아닌 **애플리케이션**을 개발하고 있다면

언어, UI 프레임워크, 상태 관리 도구에 대한 제약은 없습니다.<br /><!-- -->Monorepo 환경에서도 사용 가능하며, 프로젝트 구조를 나눠 **점진적으로 적용**할 수 있습니다.

> 현재 구조가 문제가 없다면 반드시 바꿀 필요는 없습니다.<br /><!-- -->다만 아래와 같은 상황이라면 도입을 고려해보세요:
>
> * 프로젝트가 커지면서 구조가 얽히고, 기능 개발 속도가 느려졌을 때
> * 새로운 팀원이 구조를 이해하기 어려운 상황일 때

구조 전환을 결정했다면 [Migration 가이드](/documentation/kr/docs/guides/migration/from-custom.md)를 참고하세요.

## 구조 예시[​](#basic-example "해당 헤딩으로 이동")

간단한 FSD 구조는 다음과 같습니다:

* `📁 app`
* `📁 pages`
* `📁 shared`

이 상위 폴더들은 각각 **Layer**에 해당합니다.

* `📂 app`

  * `📁 routes`
  * `📁 analytics`

* `📂 pages`

  * `📁 home`

  * `📂 article-reader`

    * `📁 ui`
    * `📁 api`

  * `📁 settings`

* `📂 shared`

  * `📁 ui`
  * `📁 api`

* 📂 pages 내부 폴더들은 **Slice**입니다. 일반적으로 도메인(이 예시에서는 페이지) 기준으로 구분됩니다.

* `📂 app`, `📂 shared`, `📂 pages/article-reader` 내의 하위 폴더들은 **Segment**입니다. Segment는 해당 코드의 **기능 목적**(UI, API 통신 등)에 따라 분류합니다.

## 개념[​](#concepts "해당 헤딩으로 이동")

FSD는 다음과 같은 3단계 계층 구조를 따릅니다:

![아래에 설명된 FSD 개념의 계층 구조](/documentation/kr/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

위 다이어그램은 FSD의 계층 구조를 시각적으로 보여줍니다. 세 개의 수직 블록 그룹은 각각 **Layer**, **Slice**, **Segment**를 나타냅니다.

왼쪽의 Layer 블록에는 `app`, `processes`, `pages`, `widgets`, `features`, `entities`, `shared`가 포함됩니다.

예를 들어, `entities` Layer 안에는 여러 개의 Slice가 존재하며, 예시로는 `user`, `post`, `comment` 등이 있습니다.

각 Slice는 다시 기능 목적에 따라 나뉘는 Segment로 구성됩니다. 예시로 `post` Slice에는 `ui`, `model`, `api` Segment가 포함됩니다.

### Layer[​](#layers "해당 헤딩으로 이동")

Layer는 모든 FSD 프로젝트의 표준 최상위 폴더입니다.

1. **App\*** - Routing, Entrypoint, Global Styles, Provider 등 앱을 실행하는 모든 요소
2. **Processes**(더 이상 사용되지 않음) - 페이지 간 복합 시나리오
3. **Pages** - 전체 page 또는 중첩 Routing의 핵심 영역
4. **Widgets** - 독립적으로 동작하는 대형 UI·기능 블록
5. **Features** - 제품 전반에서 재사용되는 비즈니스 기능
6. **Entities** - user, product 같은 핵심 도메인 Entity
7. **Shared**\* - 프로젝트 전반에서 재사용되는 일반 유틸리티

*\* - **App·Shared** Layer는 Slice 없이 곧바로 Segment로 구성됩니다.*

상위 Layer의 모듈은 자신보다 하위 Layer만 참조할 수 있습니다.

### Slice[​](#slices "해당 헤딩으로 이동")

Slice는 Layer 내부를 비즈니스 도메인별로 나눕니다. 이름·개수에 제한이 없으며, 같은 Layer 내 다른 Slice를 참조할 수 없습니다. 이 규칙이 높은 응집도와 낮은 결합도를 보장합니다.

### Segment[​](#segments "해당 헤딩으로 이동")

Slice와 App·Shared Layer는 Segment로 세분화되어, 기술적 목적에 따라 코드를 그룹화합니다. 일반적으로 다음과 같은 Segment를 사용합니다

* `ui` - UI components, date formatter, styles 등 UI 표현과 직접 관련된 코드
* `api` - request functions, data types, mappers 등 백엔드 통신 및 데이터 로직
* `model` - schema, interfaces, store, business logic 등 애플리케이션 도메인 모델
* `lib` - 해당 Slice에서 여러 모듈이 함께 사용하는 공통 library code
* `config` - configuration files, feature flags 등 환경·기능 설정

대부분의 Layer에서는 위 다섯 Segment로 충분합니다. 필요하다면 App 또는 Shared Layer에서만 추가 Segment를 정의하세요. (필수 규칙은 아닙니다.)

## 장점[​](#advantages "해당 헤딩으로 이동")

FSD 구조를 사용하면 다음과 같은 장점을 얻을 수 있습니다:

* **일관성**<br /><!-- -->구조가 표준화되어 팀 간 협업과 신규 멤버 온보딩이 쉬워집니다.

* **격리성**<br /><!-- -->Layer와 Slice 간 의존성을 제한하여, 특정 모듈만 안전하게 수정할 수 있습니다.

* **재사용 범위 제어**<br /><!-- -->재사용 가능한 코드를 필요한 범위에서만 활용할 수 있어, **DRY** 원칙과 실용성을 균형 있게 유지합니다.

* **도메인 중심 구조**<br /><!-- -->비즈니스 용어 기반의 구조로 되어 있어, 전체 코드를 몰라도 특정 기능을 독립적으로 구현할 수 있습니다.

## 점진적 도입[​](#incremental-adoption "해당 헤딩으로 이동")

기존 프로젝트에 FSD를 도입하는 방법:

1. `app`, `shared` Layer를 먼저 정리하며 기반을 다집니다.
2. 기존 UI를 `widgets`, `pages` Layer로 대략 분배합니다.
   <br />
   <!-- -->
   이 과정에서 FSD 규칙을 위반해도 괜찮습니다.
3. Import 위반을 하나씩 해결하면서, `entities`, `features`를 추출합니다.

> 리팩토링 중에는 새로운 대규모 Entity 추가를 피하는 것이 좋습니다.

## 다음 단계[​](#next-steps "해당 헤딩으로 이동")

* [Tutorial](/documentation/kr/docs/get-started/tutorial.md)을 통해 FSD 방식의 사고를 익혀보세요.
* 다양한 [예제](/documentation/kr/examples.md)를 통해 실제 프로젝트 구조를 살펴보세요.
* 궁금한 점은 [Telegram 커뮤니티](https://t.me/feature_sliced)에서 질문해보세요.
