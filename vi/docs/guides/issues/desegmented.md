# Desegmented

WIP

Bài viết đang trong quá trình hoàn thiện

Để đẩy nhanh việc phát hành bài viết, bạn có thể:

* 📢 Chia sẻ phản hồi của bạn [tại bài viết (comment/emoji-reaction)](https://github.com/feature-sliced/documentation/issues/148)
* 💬 Thu thập tài liệu liên quan [về chủ đề từ chat](https://t.me/feature_sliced)
* ⚒️ Đóng góp [bằng bất kỳ cách nào khác](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## Tình huống[​](#tình-huống "Link trực tiếp đến heading")

Rất thường xuyên xảy ra tình huống trên các project khi các module liên quan đến một domain cụ thể từ lĩnh vực chủ đề bị phân tách không cần thiết và nằm rải rác khắp project

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

## Vấn đề[​](#vấn-đề "Link trực tiếp đến heading")

Vấn đề thể hiện ít nhất là vi phạm nguyên tắc **High Cohesion** và kéo dài quá mức **trục thay đổi**

## Nếu bỏ qua[​](#nếu-bỏ-qua "Link trực tiếp đến heading")

* Nếu cần chạm vào logic, ví dụ delivery - chúng ta sẽ phải nhớ rằng nó nằm ở nhiều nơi và phải chạm vào nhiều chỗ trong code - điều này kéo dài không cần thiết **Trục thay đổi** của chúng ta
* Nếu cần nghiên cứu logic của user, chúng ta sẽ phải đi khắp project để tìm hiểu chi tiết **actions, epics, constants, entities, components** - thay vì để nó nằm ở một chỗ
* Các liên kết ngầm và sự mất kiểm soát của domain area đang phát triển
* Với cách tiếp cận này, mắt rất dễ bị mờ đi và bạn có thể không nhận ra khi chúng ta "tạo constants vì constants", tạo ra một đống rác trong thư mục tương ứng của project

## Giải pháp[​](#giải-pháp "Link trực tiếp đến heading")

Đặt tất cả các module liên quan đến một domain/use case cụ thể - ngay cạnh nhau

Để khi nghiên cứu một module cụ thể, tất cả các thành phần của nó nằm cạnh nhau, không bị rải rác khắp project

> Điều này cũng tăng khả năng khám phá và sự rõ ràng của code base và mối quan hệ giữa các module

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

## Xem thêm[​](#xem-thêm "Link trực tiếp đến heading")

* [(Article) Về Low Coupling và High Cohesion một cách rõ ràng](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
* [(Article) Low Coupling và High Cohesion. Law of Demeter](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
