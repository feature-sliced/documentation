---
sidebar_position: 4
---

# 네이밍 (Naming)

개발자들은 같은 대상을 각자의 경험과 관점에 따라 다르게 부르곤 합니다. 예를 들어:

- UI 컴포넌트를 "ui", "components", "ui-kit", "views" 등으로 표현
- 공통 코드를 "core", "shared", "app" 등으로 지칭
- 비즈니스 로직을 "store", "model", "state" 등으로 명명

## Feature-Sliced Design의 표준 네이밍 {#naming-in-fsd}

FSD는 다음과 같이 명확한 네이밍 규칙을 제시합니다:

### Layers (계층)
- `app`
- `processes`
- `pages`
- `features`
- `entities`
- `shared`

### Segments (세그먼트)
- `ui`
- `model`
- `lib`
- `api`
- `config`

이러한 표준 용어를 사용하면:
- 팀 내 의사소통이 명확해집니다
- 새로운 팀원의 적응이 쉬워집니다
- 커뮤니티와의 지식 공유가 용이해집니다

## 네이밍 충돌 해결 {#when-can-naming-interfere}

FSD 용어가 프로젝트의 비즈니스 용어와 중복될 수 있습니다. 예시:

- `FSD#process` vs 애플리케이션의 시뮬레이션 프로세스,
- `FSD#page` vs 로그 페이지,
- `FSD#model` vs 자동차 모델.

### 용어 사용 가이드

1. 기술적 커뮤니케이션
   - FSD 용어 사용 시 "FSD" 접두어 사용을 권장합니다
   - 예: "이 기능을 FSD features 계층으로 이동하는 것이 좋겠습니다"

2. 비기술적 커뮤니케이션
   - FSD 관련 용어 사용을 피하고 일반적인 비즈니스 용어 사용
   - 예: 코드 구조 대신 기능이나 목적 중심으로 설명

## 참고 {#see-also}

- [(토론) Naming의 적응성][disc-src]
- [(토론) Entities Naming 설문조사][disc-naming]
- [(토론) "processes" vs "flows" vs ...][disc-processes]
- [(토론) "model" vs "store" vs ...][disc-model]

[disc-model]: https://github.com/feature-sliced/documentation/discussions/68
[disc-naming]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894
[disc-processes]: https://github.com/feature-sliced/documentation/discussions/20
[disc-src]: https://github.com/feature-sliced/documentation/discussions/16
