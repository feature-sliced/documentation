---
sidebar_position: 4
---

# v1 -> v2 마이그레이션 가이드

## v2 도입 배경

**feature-slices** 개념은 2018년 [첫 발표][ext-tg-spb]된 이후, 다양한 프로젝트 경험과 커뮤니티 피드백을 거치며 발전해 왔습니다.  
동시에 **[기본 원칙][ext-v1]**(표준화된 프로젝트 구조, 비즈니스 로직 우선 분리, isolated features, Public API)은 그대로 유지되었습니다.

하지만 v1에는 다음과 같은 한계가 있었습니다:

- 과도한 **boilerplate** 발생  
- 추상화 규칙이 모호해 **코드베이스 복잡도** 상승  
- 암묵적 설계로 **확장·온보딩 어려움**

이러한 한계를 해결하기 위해 ([`v2`][ext-v2])는 기존 장점을 유지하면서도 위 과제들을 보완하도록 설계되었습니다.  
또한 [Oleg Isonen][ext-kof]이 발표한 [**feature-driven**][ext-fdd] 등 유사 방법론과 아이디어를 융합해 애플리케이션 구조를 한층 더 **유연**, **명확**, **효율적**으로 다듬었습니다.

> 이 과정에서 방법론의 공식 명칭은 *feature-slice*에서 **feature-sliced**로 정식화되었습니다.


## v2 마이그레이션 이유

> `WIP:` 작업이 진행 중이며, 일부 세부 사항이 변경될 수 있습니다.

### 직관적 구조 제공

v2는 **layer → slice → segment** 3단계만 알면 대부분 구조 결정을 내릴 수 있습니다.<br/>
덕분에 새로운 팀원이 **어디에 무엇을 둬야 하나** 부터 고민하지 않아 온보딩 속도가 빨라집니다.

### 유연한 모듈화

- **독립 영역**은 slice 단위로, **전역 흐름**은 Processes layer로 분리해 확장성을 확보합니다.
- 새 module을 추가할 때 *(layer → slice → segment)* 규칙만 따르면 폴더 재배치와 리팩터링 작업 부담이 크게 줄어듭니다.

#### 커뮤니티·도구 지원 확대

v2 개발은 **코어 팀**과 커뮤니티 기여자들이 함께 이끌고 있습니다. 

다음 리소스를 활용해 보세요:

- **실제 사례 공유**: 다양한 프로젝트 환경에서의 적용 사례  
- **단계별 가이드**: 설정·구성·운영 전 과정을 담은 튜토리얼
- **코드 템플릿 & 예제**: 시작부터 배포까지 참고할 수 있는 실전 코드  
- **온보딩 문서**: 신규 개발자를 위한 개념 요약 및 학습 자료  
- **검증 툴킷**: steiger CLI 등 정책 준수·lint를 지원하는 유틸리티  

> v1 지원은 계속 유지되지만, 새로운 기능·개선 사항은 **v2**에 우선 반영됩니다.  
> 주요 업데이트 시에도 **안정적 마이그레이션 경로**를 보장합니다.

## 주요 변경 사항

### Layer 구조 명확화

v2에서는 layer를 최상위부터 최하위까지 명시적으로 구분합니다:

- `/app` > `/processes` > **`/pages`** > **`/features`** > `/entities` > `/shared`

- 모든 모듈이 `pages`/`features` layer에만 속하지 않습니다.  
- 이 구조를 통해 [layer별 의존 규칙][ext-tg-v2-draft]을 명시적으로 설정할 수 있습니다.  
- **상위 layer**는 더 넓은 **Context**를 제공합니다.  
  - 상위 layer 모듈은 **하위 layer** 모듈만 import할 수 있습니다.  
- **하위 layer**는 **변경 리스크(Risk)와 책임(Responsibility)** 이 더 큽니다.  
  - 재사용 빈도가 높아, 수정 시 영향 범위가 넓습니다.  


### Shared 통합

프로젝트 `src` 루트에 흩어져 있던 UI, lib, API 인프라 추상화를 `/src/shared` 폴더로 통합했습니다.

- `shared/ui` - 공통 UI components(선택 사항)
  - *기존 `Atomic Design` 사용도 가능합니다.*
- `shared/lib` - 재사용 가능한 helper libraries 
  - *무분별한 helper dump 지양*
- `shared/api` - API entry points 
  - *각 feature/page 내 local 정의 가능하지만, 전역 entry point 집중을 권장*
- `shared` 폴더에는 **business logic** 의존을 두지 않습니다 
  - *불가피할 경우 `entities` layer 이상으로 로직을 옮기세요.*

### Entities / Processes Layer 추가

v2에서는 로직 복잡성과 높은 결합을 줄이기 위한 **새로운 추상화**가 추가되었습니다.

- **`/entities`**  
  프론트엔드에서 사용되는 **business entities**(예: `user`, `order`, `i18n`, `blog`)를 담당하는 layer입니다.  
- **`/processes`**  
  애플리케이션 전반에 걸친 **비즈니스 process**(예: `payment`, `auth`, `quick-tour`)를 캡슐화하는 선택적 layer입니다.  
  process *로직이 여러 페이지에 분산될 때* 도입을 권장합니다.


### 추상화·네이밍 가이드

아래에서는 v2 권장 layer·segment 명칭을 이전 명칭과 대응하여 정리했습니다.<br/>
추상화·네이밍 관련 상세 가이드는 [명확한 네이밍 권장사항][refs-adaptability]을 참고하세요.

[disc-process]: https://github.com/feature-sliced/documentation/discussions/20
[disc-features]: https://github.com/feature-sliced/documentation/discussions/23
[disc-entities]: https://github.com/feature-sliced/documentation/discussions/18#discussioncomment-422649
[disc-shared]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453020

[disc-ui]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453132
[disc-model]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-472645
[disc-api]: https://github.com/feature-sliced/documentation/discussions/66

#### Layer

- `/app` — **Application init**
  - *이전 명칭: `app`, `core`,`init`, `src/index` (가끔 사용됨)*
- `/processes` — [**Business process**][disc-process]
  - *이전 명칭: `processes`, `flows`, `workflows`*
- `/pages` — **Application page**
  - *이전 명칭: `pages`, `screens`, `views`, `layouts`, `components`, `containers`*
- `/features` — [**Feature module**][disc-features]
  - *이전 명칭: `features`, `components`, `containers`*
- `/entities` — [**Business entity**][disc-entities]
  - *이전 명칭: `entities`, `models`, `shared`*
- `/shared` — [**Infrastructure**][disc-shared] 🔥
  - *이전 명칭: `shared`, `common`, `lib`*

#### Segment

- `/ui` — [**UI segment**][disc-ui] 🔥
  - *이전 명칭: `ui`, `components`, `view`*
- `/model` — [**비즈니스 로직 segment**][disc-model] 🔥
  - *이전 명칭: `model`, `store`, `state`, `services`, `controller`*
- `/lib` — **보조 코드 segment**
  - *이전 명칭: `lib`, `libs`, `utils`, `helpers`*
- `/api` — [**API segment**][disc-api]
  - *이전 명칭: `api`, `service`, `requests`, `queries`*
- `/config` — **애플리케이션 설정 segment**
  - *이전 명칭: `config`, `env`, `get-env`*

## 낮은 결합 원칙 강화

새 layer 규칙 덕분에 [Zero-Coupling, High-Cohesion 원칙][refs-low-coupling]을 지키기 쉬워졌습니다.  

*단, 모듈을 완전히 분리할 수 없는 경우에는 Public API 등 명확한 인터페이스 경계를 정의하고, 해당 의존 코드는 가능한 한 하위 layer에 위치시키는 것을 권장합니다.*

## 참고 자료

- [React SPB Meetup #1 발표 노트][ext-tg-spb]
- [React Berlin Talk - Oleg Isonen Feature Driven Architecture][ext-kof-fdd]
- [v1↔v2 구조 비교(텔레그램)](https://t.me/feature_sliced/493)
- [v2에 대한 새로운 아이디어와 설명 (atomicdesign 채팅)][ext-tg-v2-draft]
- [v2 추상화·네이밍 공식 논의](https://github.com/feature-sliced/documentation/discussions/31)

[refs-low-coupling]: /docs/reference/slices-segments#zero-coupling-high-cohesion
[refs-adaptability]: /docs/about/understanding/naming

[ext-v1]: https://feature-sliced.github.io/featureslices.dev/v1.0.html
[ext-tg-spb]: https://t.me/feature_slices
[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-fdd-issues]: https://github.com/kof/feature-driven-architecture/issues
[ext-v2]: https://github.com/feature-sliced/documentation
[ext-kof]: https://github.com/kof
[ext-kof-fdd]: https://www.youtube.com/watch?v=BWAeYuWFHhs
[ext-tg-v2-draft]: https://t.me/atomicdesign/18708
