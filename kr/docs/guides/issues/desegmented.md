# Desegmentation

WIP

작성 진행 중

행을 앞당기고 싶다면 다음을 도와주세요:

* 📢 의견 공유 [글에 댓글·이모지 달기](https://github.com/feature-sliced/documentation/issues/148)
* 💬 자료 모으기 [채팅방에 관련 자료 남기기](https://t.me/feature_sliced)
* ⚒️ 기여하기 [다른 방식으로 기여](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## 상황[​](#상황 "해당 헤딩으로 이동")

프로젝트에서 동일한 도메인의 모듈들이 서로 연관되어 있음에도 불구하고, 프로젝트 전체에 불필요하게 분산되어 있는 경우가 많습니다.

```
├── components/
|    ├── DeliveryCard
|    ├── DeliveryChoice
|    ├── RegionSelect
|    ├── UserAvatar
├── actions/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── epics/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── constants/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── helpers/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── entities/
|    ├── delivery/
|    |      ├── getters.js
|    |      ├── selectors.js
|    ├── region/
|    ├── user/
```

## 문제점[​](#문제점 "해당 헤딩으로 이동")

이는 높은 응집도 원칙을 위반하며, **Changes Axis의 과도한 확장**을 초래합니다.

## 무시했을 때의 결과[​](#무시했을-때의-결과 "해당 헤딩으로 이동")

* delivery 관련 로직 수정 시 여러 위치의 코드를 찾아 수정해야 하며, 이는 **Changes Axis를 불필요하게 확장**합니다
* user 관련 로직을 이해하려면 프로젝트 전반의 **actions, epics, constants, entities, components**를 모두 찾아봐야 합니다
* 암묵적 연결로 인해 도메인 영역이 비대해지고 관리가 어려워집니다
* 불필요한 파일들이 쌓여 문제 인식이 어려워집니다

## 해결 방안[​](#해결-방안 "해당 헤딩으로 이동")

도메인이나 use case와 관련된 모듈들을 한 곳에 모아 배치합니다.

이를 통해 모듈 학습이나 수정 시 필요한 모든 요소를 쉽게 찾을 수 있습니다.

> 이 접근은 코드베이스의 탐색성과 가독성을 높이고, 모듈 간 관계를 더 명확하게 보여줍니다.

```
- ├── components/
- |    ├── DeliveryCard
- |    ├── DeliveryChoice
- |    ├── RegionSelect
- |    ├── UserAvatar
- ├── actions/
- |    ├── delivery.js
- |    ├── region.js
- |    ├── user.js
- ├── epics/{...}
- ├── constants/{...}
- ├── helpers/{...}
  ├── entities/
  |    ├── delivery/
+ |    |      ├── ui/ # ~ components/
+ |    |      |   ├── card.js
+ |    |      |   ├── choice.js
+ |    |      ├── model/
+ |    |      |   ├── actions.js
+ |    |      |   ├── constants.js
+ |    |      |   ├── epics.js
+ |    |      |   ├── getters.js
+ |    |      |   ├── selectors.js
+ |    |      ├── lib/ # ~ helpers
  |    ├── region/
  |    ├── user/
```

## 참고 자료[​](#참고-자료 "해당 헤딩으로 이동")

* [(아티클) Coupling과 Cohesion의 명확한 이해](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
* [(아티클) Coupling, Cohesion과 Law of Demeter](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
