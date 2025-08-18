# Routing

WIP

작성 진행 중

행을 앞당기고 싶다면 다음을 도와주세요:

* 📢 의견 공유 [글에 댓글·이모지 달기](https://github.com/feature-sliced/documentation/issues/169)
* 💬 자료 모으기 [채팅방에 관련 자료 남기기](https://t.me/feature_sliced)
* ⚒️ 기여하기 [다른 방식으로 기여](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## 상황[​](#상황 "해당 헤딩으로 이동")

Page의 URL이 하위 Layer에 하드코딩되어 있는 경우가 있습니다.

entities/post/card

```
<Card>
    <Card.Title 
        href={`/post/${data.id}`}
        title={data.name}
    />
    ...
</Card>
```

## 문제점[​](#문제점 "해당 헤딩으로 이동")

URL이 Page Layer에 집중되지 않고, 하위 Layer에 분산되어 관리됩니다.

## 무시했을 때의 결과[​](#무시했을-때의-결과 "해당 헤딩으로 이동")

URL 변경 시 Page Layer 외의 여러 하위 Layer에 있는 URL과 redirect 로직을 모두 고려해야 합니다.

결과적으로 단순한 Product Card 같은 Component도 Page의 책임을 가지게 되어, 프로젝트 구조가 불필요하게 복잡해집니다.

## 해결 방안[​](#해결-방안 "해당 헤딩으로 이동")

URL과 redirect 로직은 Page Layer와 그 상위 Layer에서만 다루도록 합니다.

이를 위해 composition, props 전달, Factory 패턴 등을 활용해 URL 정보를 하위 Layer에 전달합니다.

## 참고 자료[​](#참고-자료 "해당 헤딩으로 이동")

* [(스레드) Entity/Feature/Widget에서 Routing 처리의 영향](https://t.me/feature_sliced/4389)
* [(스레드) Page에서만 Route 로직을 다뤄야 하는 이유](https://t.me/feature_sliced/3756)
