---
sidebar_position: 1
---

# 미션

이 문서에서는 방법론을 개발할 때 우리가 추구하는 목표와 적용 가능성의 한계를 설명합니다.

- 방법론 개발의 목표는 이념과 단순성 간의 균형을 맞추는 것입니다.
- 모든 사람에게 완벽하게 맞는 만능 해결책을 만들 수는 없습니다.

**그럼에도, 방법론은 다양한 개발자들에게 접근하기 쉽고 실용적이어야 합니다.**

## 목표

### 다양한 개발자에게 직관적이고 명확하게

방법론은 프로젝트에 참여하는 대부분의 팀원들이 쉽게 접근하고 이해할 수 있도록 설계되어야 합니다.<br/>

*향후 어떤 도구가 추가되더라도, 시니어나 리더 개발자들만 이해할 수 있는 방법론이라면 충분하지 않습니다.*

### 일상적인 문제 해결

방법론은 개발 프로젝트에서 일상적으로 발생하는 문제에 대해 명확한 이유와 해결책을 제시해야 합니다.

**이를 위해 CLI와 린터(linter) 같은 도구들도 함께 제공해야 합니다.**

이를 통해 개발자들은 아키텍처와 개발상의 오랜 문제를 우회할 수 있는 검증된 접근 방식을 활용할 수 있습니다.

> *@sergeysova: 방법론을 기반으로 코드를 작성하는 개발자는 이미 많은 문제에 대한 해결책이 마련되어 있기 때문에, 문제 발생 빈도가 10배 정도 줄어들 것이라고 상상해보세요.*

## 한계

우리는 *특정 관점을 강요하고* 싶지 않으며, 개발자로서의 *여러 습관이 문제 해결을 방해할 수 있다는 점도 이해합니다.*

모든 개발자의 시스템을 설계하거나 개발하는 데 경험 수준이 다르기 떄문에, **다음 사항을 이해하는 것이 중요합니다:**

- **모두에게 동일하게 적용되지 않을 수 있음:**: 너무 간단하거나 명확한 접근법이 모든 상황에서 항상 효과적이지는 않습니다.
    > *@sergeysova: 어떤 개념들은 문제를 직접 겪고, 오랜 시간을 들여 해결하는 과정을 통해서만 직관적으로 이해할 수 있는 경우가 많습니다.
    >
    > - *수학: 그래프 이론.*
    > - *물리학: 양자 역학.*
    > - *프로그래밍: 애플리케이션 아키텍처.*

- **가능하고 바람직한 방향**: 단순함과 확장 가능성의 조화

## 참고 자료

- [아키텍쳐 문제들][refs-architecture--problems]

[refs-architecture--problems]: /docs/about/understanding/architecture#problems
