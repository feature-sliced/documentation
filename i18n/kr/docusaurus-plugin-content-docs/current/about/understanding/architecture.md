---
sidebar_position: 1
---

# 아키텍처에 대하여

## 문제점들

일반적으로 아키텍처에 대한 논의는 프로젝트에서 특정 문제로 인해 개발이 중단될 때 제기됩니다.

### Bus-factor & 온보딩

제한된 인원만이 프로젝트와 그 아키텍처를 이해합니다.

**예시:**

- *"개발에 새로운 인력을 추가하기가 어렵습니다"*
- *"문제 해결 방식에 대한 명확한 가이드라인이 없어 개발자마다 각기 다른 접근 방식을 사용합니다"*
- *"이 거대한 모놀리스에서 무슨 일이 일어나고 있는지 이해할 수 없습니다"*

### 의도치 않은 부작용과 통제되지 않는 영향

개발/리팩토링 중 많은 의도치 않은 부작용들이 있습니다 *("모든 것이 모든 것에 의존합니다")*

**예시:**

- *"기능 간의 부적절한 의존성이 발생하고 있습니다"*
- *"한 페이지의 상태(store) 변경이 다른 페이지의 기능에 예기치 않은 영향을 미칩니다"*
- *"비즈니스 로직이 애플리케이션 전반에 분산되어 있어 로직의 흐름을 추적하기 어렵습니다"*

### 통제되지 않는 로직의 재사용

기존 로직을 재사용하거나 수정하기 어렵습니다.

동시에, 보통 [두 가지 극단적인 경우](https://github.com/feature-sliced/documentation/discussions/14)가 나타납니다:

- 각 모듈에 대해 로직을 완전히 처음부터 작성하거나 *(기존 코드베이스에서 재사용 가능한 부분까지 포함하여)*
- 또는 모든 구현된 모듈을 `shared` 폴더로 이동하려는 경향이 있어, *대부분 단일 사용 목적의 모듈들이 무분별하게 축적되는 현상이 발생합니다.*

**예시:**

- *"프로젝트 내에 동일한 비즈니스 로직이 **N**번 중복 구현되어 있어 유지보수 비용이 지속적으로 발생합니다"*
- *"동일한 기능의 버튼/팝업 등 UI 컴포넌트가 여러 버전으로 존재합니다"*
- *"유틸리티 함수들이 체계 없이 누적되어 있습니다"*

## 요구사항

이상적인 아키텍처를 위한 *핵심 요구사항*을 다음과 같이 정의할 수 있습니다.

:::note
여기서 "쉽다"라는 표현은 "대다수의 개발자들이 합리적인 시간 내에 이해하고 적용할 수 있다"는 의미입니다. [모든 개발자와 상황에 완벽하게 부합하는 솔루션은 현실적으로 불가능하기 때문입니다.](/docs/about/mission#limitations)
:::

### 명시성

- 팀원들이 프로젝트 구조와 아키텍처를 **직관적으로 이해하고 설명할 수 있어야** 합니다.
- 아키텍처는 프로젝트의 **비즈니스 도메인과 가치를 명확히 반영**해야 합니다.
- 추상화 계층 간의 **의존성과 부작용**이 명확히 파악되어야 합니다.
- **중복 로직을 효과적으로 식별**할 수 있어야 합니다.
- 프로젝트 전반에 걸쳐 **로직이 분산**되지 않도록 해야 합니다.
- **불필요한 추상화와 복잡한 규칙**을 최소화해야 합니다.

### 제어

- 효과적인 아키텍처는 **새로운 기능 개발과 문제 해결의 생산성을 향상**시켜야 합니다.
- 프로젝트의 전반적인 개발 흐름을 효율적으로 관리할 수 있어야 합니다.
- **코드의 확장성, 유지보수성, 제거 용이성**을 보장해야 합니다.
- 기능 단위의 **명확한 경계와 격리**가 보장되어야 합니다.
- 각 컴포넌트는 **높은 교체성과 제거 용이성**을 가져야 합니다.
  - *[변경을 위한 과도한 최적화는 지양합니다][ext-kof-not-modification] - 미래의 변경사항을 정확히 예측하기 어렵기 때문입니다.*
  - *[제거 용이성을 위한 설계가 더 중요합니다][ext-kof-but-removing] - 현재의 컨텍스트를 기반으로 한 의사결정이 더 실용적이기 때문입니다.*

### 적응성

- 효과적인 아키텍처는 **다양한 규모와 유형의 프로젝트**에 적용 가능해야 합니다.
  - *기존 시스템 및 인프라와의 원활한 통합이 가능해야 합니다.*
  - *프로젝트의 모든 개발 단계에서 일관되게 적용될 수 있어야 합니다.*
- 특정 기술 스택이나 플랫폼에 종속되지 않아야 합니다.
- **병렬 개발과 팀 확장**이 용이해야 합니다.
- **비즈니스 요구사항과 기술 환경의 변화**에 유연하게 대응할 수 있어야 합니다.

## See also

- [(React Berlin Talk) Oleg Isonen - Feature Driven Architecture][ext-kof]
- [(React SPB Meetup #1) Sergey Sova - Feature Slices][ext-slices-spb]
- [(Article) 프로젝트 모듈화에 대하여][ext-medium]
- [(Article) 관점 분리와 기능 기반 구조화에 대하여][ext-ryanlanciaux]

[ext-kof-not-modification]: https://youtu.be/BWAeYuWFHhs?t=1631
[ext-kof-but-removing]: https://youtu.be/BWAeYuWFHhs?t=1666

[ext-slices-spb]: https://t.me/feature_slices
[ext-kof]: https://youtu.be/BWAeYuWFHhs
[ext-medium]: https://alexmngn.medium.com/why-react-developers-should-modularize-their-applications-d26d381854c1
[ext-ryanlanciaux]: https://ryanlanciaux.com/blog/2017/08/20/a-feature-based-approach-to-react-development/
