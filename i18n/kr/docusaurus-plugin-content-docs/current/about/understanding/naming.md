---
sidebar_position: 4
---

# 네이밍

개발자는 각자의 경험과 관점에 따라 동일한 개체를 다르게 부르는 경우가 많아 팀 내에서 오해가 발생할 수 있습니다. 예를 들어:

- 화면에 보이는 컴포넌트를 "ui", "components", "ui-kit", "views" 등으로 부를 수 있습니다.
- 애플리케이션 전반에서 재사용되는 코드를 "core", "shared", "app" 등으로 표현할 수 있습니다.
- 비즈니스 로직 코드를 "store", "model", "state" 등으로 지칭할 수 있습니다.

## Feature-Sliced Design에서의 네이밍 {#naming-in-fsd}

방법론에서는 네이밍을 다음과 같이 체계적으로 정의합니다:

- 레이어 이름: "app", "process", "page", "feature", "entity", "shared"
- 세그먼트 이름: "ui", "model", "lib", "api", "config"

이 표준 용어를 따르는 것은 팀 내에서, 특히 새로 합류한 개발자와의 협업에서 혼란을 줄이는 데 필수적입니다. 또한, 커뮤니티에 도움을 요청하거나 자료를 공유할 때도 표준화된 네이밍은 큰 장점이 됩니다.

## 네이밍 충돌 {#when-can-naming-interfere}

FSD에서 사용하는 용어가 비즈니스 용어와 겹치는 경우, 네이밍 충돌이 발생할 수 있습니다. 예를 들어:

- `FSD#process` vs 애플리케이션의 시뮬레이션 프로세스,
- `FSD#page` vs 로그 페이지,
- `FSD#model` vs 자동차 모델.

예를 들어, 개발자가 코드에서 "process"라는 단어를 봤을 때, 그것이 정확히 어떤 프로세스를 의미하는지 파악하는 데 시간이 더 걸릴 수 있습니다.  이러한 **용어 충돌은 개발 과정을 방해할 수 있습니다.**

만약 프로젝트 용어집에 FSD에서 사용하는 고유 용어가 포함되어 있다면, 팀원들 간의 커뮤니케이션뿐만 아니라, 비기술적 이해관계자와의 소통에서도 용어 사용에 세심한 주의가 필요합니다.

효율적인 의사소통을 위해, FSD 방법론에서는 사용되는 용어 앞에 "FSD"라는 접두사를 붙이는 방식을 권장합니다. 예를 들어, 특정 프로세스를 논의할 때 "우리가 이 프로세스를 FSD features 레이어에 배치할 수 있습니다."라고 말하면 더 명확하게 전달할 수 있습니다.

하지만, 비기술적 이해관계자와 대화할 때는 FSD 고유 용어를 사용하지 않는 것이 좋습니다. 이 경우, 코드베이스의 내부 구조를 언급하기보다는 더 쉽게 이해할 수 있는 일반적인 용어로 설명하는 것이 바람직합니다.

## 참고 {#see-also}

- [(토론) 네이밍의 적응성][disc-src]
- [(토론) 엔티티 네이밍 설문조사][disc-naming]
- [(토론) "processes" vs "flows" vs ...][disc-processes]
- [(토론) "model" vs "store" vs ...][disc-model]

[disc-model]: https://github.com/feature-sliced/documentation/discussions/68
[disc-naming]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894
[disc-processes]: https://github.com/feature-sliced/documentation/discussions/20
[disc-src]: https://github.com/feature-sliced/documentation/discussions/16
