# Migration from v1 to v2

## v2 도입 배경

**feature-slices** 개념은 2018년 [첫 발표][ext-tg-spb]된 이후 다양한 프로젝트 경험과 커뮤니티 피드백을 통해 지속적으로 발전해 왔습니다.  
그 과정에서도 **[기본 원칙][ext-v1]**-표준화된 프로젝트 구조, 비즈니스 로직 기반 분리, isolated features, Public API—는 그대로 유지되었습니다.

그러나 v1에는 다음과 같은 한계가 존재했습니다:

- 과도한 **boilerplate** 발생
- 추상화 규칙이 모호해 **코드베이스 복잡도** 상승
- 암묵적 설계로 **확장/온보딩 어려움**

이를 해결하기 위해 등장한 것이 **[v2][ext-v2]** 입니다.  
v2는 기존 장점을 유지하는 동시에 이러한 문제들을 보완하도록 설계되었습니다.  
또한 [Oleg Isonen][ext-kof]이 발표한 [feature-driven][ext-fdd] 등 유사 방법론의 장점을 반영해 더 **유연하고**, **명확하며**, **효율적인** 구조로 발전했습니다.

> 이 과정에서 방법론의 공식 명칭은 feature-slice에서 **feature-sliced**로 정식화되었습니다.

## v2 마이그레이션 이유

> `WIP:` 문서는 계속 업데이트 중이며, 일부 내용은 변경될 수 있습니다.

### 직관적 구조 제공

v2는 **layer → slice → segment** 라는 세 가지 개념만 이해하면 구조적 결정을 쉽게 내릴 수 있습니다.  
덕분에 신규 팀원이 **어디에 어디에 둘지** 고민할 필요가 줄어들어 온보딩 속도가 크게 향상됩니다.

### 유연한 모듈화

- **독립 영역**은 slice 단위로, **전역 흐름**은 Processes layer로 분리해 확장성을 확보합니다.
- 새로운 module을 추가할 때 _(layer → slice → segment)_ 규칙만 따르면 폴더 재배치나 리팩터링 부담이 크게 줄어듭니다.

#### 커뮤니티/도구 지원 확대

v2는 **코어 팀** 과 커뮤니티가 함께 발전시키고 있으며, 다음과 같은 리소스도 제공됩니다.  
다음 리소스를 활용해 보세요:

- **실제 사례 공유**: 다양한 프로젝트 환경에서의 적용 사례
- **단계별 가이드**: 설정·구성·운영 전 과정을 담은 튜토리얼
- **코드 템플릿 & 예제**: 시작부터 배포까지 참고할 수 있는 실전 코드
- **온보딩 문서**: 신규 개발자를 위한 개념 요약 및 학습 자료
- **검증 툴킷**: steiger CLI 등 정책 준수/lint를 지원하는 유틸리티

> v1도 계속 지원되지만, 새로운 기능과 개선은 **v2**에 우선 적용됩니다.  
> 주요 업데이트 시 **안정적인 마이그레이션 경로**도 함께 제공합니다.

## 주요 변경 사항

### Layer 구조 명확화

v2는 layer를 다음과 같이 명확히 구분합니다:

`/app` > `/processes` > **`/pages`** > **`/features`** > `/entities` > `/shared`

모든 모듈이 `pages, features`에만 속하지 않습니다.  
이 구조는 [layer 의존 규칙][ext-tg-v2-draft]을 명확히 설정할 수 있도록 돕습니다.  
**상위 layer**는 더 넓은 **context**를 제공하며, **하위 layer**는 더 낮은 **변경 리스크와 높은 재사용성**을 갖습니다.

### Shared 통합

`src` 루트에 흩어져 있던 UI, lib, API 인프라 추상화를 `/src/shared`로 통합했습니다.

- `shared/ui` - 공통 UI components(선택 사항)
    - _기존 `Atomic Design` 사용도 가능합니다._
- `shared/lib` - 재사용 가능한 helper libraries
    - _무분별한 helper dump 지양_
- `shared/api` - API entry points
    - _각 feature/page 내 local 정의 가능하지만, 전역 entry point 집중을 권장_
- `shared` 폴더에는 **business logic** 의존을 두지 않습니다
    - _불가피할 경우 `entities` layer 이상으로 로직을 옮기세요._

### Entities / Processes Layer 추가

v2에서는 로직 복잡성과 높은 결합을 줄이기 위한 **새로운 추상화**가 추가되었습니다.

- **`/entities`**  
  프론트엔드에서 사용되는 **business entities**(예: `user`, `order`, `i18n`, `blog`)를 담당하는 layer입니다.
- **`/processes`**  
  애플리케이션 전반에 걸친 **비즈니스 process**(예: `payment`, `auth`, `quick-tour`)를 캡슐화하는 선택적 layer입니다.  
  process _로직이 여러 페이지에 분산될 때_ 도입을 권장합니다.

### 추상화/네이밍 가이드

아래는 v2 권장 네이밍과 이전 명칭 간의 대응 관계입니다.  
아래에서는 v2 권장 layer·segment 명칭을 이전 명칭과 대응하여 정리했습니다.  
추상화/네이밍 관련 상세 가이드는 [명확한 네이밍 권장사항][refs-adaptability]을 참고하세요.

[disc-process]: https://github.com/feature-sliced/documentation/discussions/20
[disc-features]: https://github.com/feature-sliced/documentation/discussions/23
[disc-entities]: https://github.com/feature-sliced/documentation/discussions/18#discussioncomment-422649
[disc-shared]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453020
[disc-ui]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453132
[disc-model]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-472645
[disc-api]: https://github.com/feature-sliced/documentation/discussions/66

#### Layer

- `/app` — **Application init**
    - _이전 명칭: `app`, `core`,`init`, `src/index` (가끔 사용됨)_
- `/processes` — [**Business process**][disc-process]
    - _이전 명칭: `processes`, `flows`, `workflows`_
- `/pages` — **Application page**
    - _이전 명칭: `pages`, `screens`, `views`, `layouts`, `components`, `containers`_
- `/features` — [**Feature module**][disc-features]
    - _이전 명칭: `features`, `components`, `containers`_
- `/entities` — [**Business entity**][disc-entities]
    - _이전 명칭: `entities`, `models`, `shared`_
- `/shared` — [**Infrastructure**][disc-shared] 🔥
    - _이전 명칭: `shared`, `common`, `lib`_

#### Segment

- `/ui` — [**UI segment**][disc-ui] 🔥
    - _이전 명칭: `ui`, `components`, `view`_
- `/model` — [**비즈니스 로직 segment**][disc-model] 🔥
    - _이전 명칭: `model`, `store`, `state`, `services`, `controller`_
- `/lib` — **보조 코드 segment**
    - _이전 명칭: `lib`, `libs`, `utils`, `helpers`_
- `/api` — [**API segment**][disc-api]
    - _이전 명칭: `api`, `service`, `requests`, `queries`_
- `/config` — **애플리케이션 설정 segment**
    - _이전 명칭: `config`, `env`, `get-env`_

## 낮은 결합 원칙 강화

Layer 구조가 명확해지면서 [Zero-Coupling, High-Cohesion 원칙][refs-low-coupling]을 보다 쉽게 지킬 수 있게 되었습니다.  
완전한 분리가 어렵다면 Public API 등 명확하게 드러나는 인터페이스를 두어 경계를 명확히 하고,   
가능한 한 하위 layer에서 의존성이 내려가도록 구조화할 것을 권장합니다.

## 참고 자료

- [React SPB Meetup #1 발표 노트][ext-tg-spb]
- [React Berlin Talk - Oleg Isonen Feature Driven Architecture][ext-kof-fdd]
- [v1↔v2 구조 비교(텔레그램)](https://t.me/feature_sliced/493)
- [v2에 대한 새로운 아이디어와 설명 (atomicdesign 채팅)][ext-tg-v2-draft]
- [v2 추상화·네이밍 공식 논의](https://github.com/feature-sliced/documentation/discussions/31)

[refs-low-coupling]: /kr/docs/reference/slices-segments#zero-coupling-high-cohesion
[refs-adaptability]: /kr/docs/about/understanding/naming
[ext-v1]: https://feature-sliced.github.io/featureslices.dev/v1.0.html
[ext-tg-spb]: https://t.me/feature_slices
[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-fdd-issues]: https://github.com/kof/feature-driven-architecture/issues
[ext-v2]: https://github.com/feature-sliced/documentation
[ext-kof]: https://github.com/kof
[ext-kof-fdd]: https://www.youtube.com/watch?v=BWAeYuWFHhs
[ext-tg-v2-draft]: https://t.me/atomicdesign/18708
