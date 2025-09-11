# Routing

WIP

Bài viết đang trong quá trình hoàn thiện

Để đẩy nhanh việc phát hành bài viết, bạn có thể:

* 📢 Chia sẻ phản hồi của bạn [tại bài viết (comment/emoji-reaction)](https://github.com/feature-sliced/documentation/issues/169)
* 💬 Thu thập tài liệu liên quan [về chủ đề từ chat](https://t.me/feature_sliced)
* ⚒️ Đóng góp [bằng bất kỳ cách nào khác](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## Tình huống[​](#tình-huống "Link trực tiếp đến heading")

URL đến các trang được hardcode trong các layer bên dưới pages

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

## Vấn đề[​](#vấn-đề "Link trực tiếp đến heading")

URL không được tập trung trong layer pages, nơi chúng thuộc về theo phạm vi trách nhiệm

## Nếu bỏ qua[​](#nếu-bỏ-qua "Link trực tiếp đến heading")

Khi thay đổi URL, bạn sẽ phải nhớ rằng các URL này (và logic của URL/redirect) có thể nằm ở tất cả các layer trừ pages

Và điều đó cũng có nghĩa là giờ đây ngay cả một product card đơn giản cũng đảm nhận một phần trách nhiệm từ pages, làm mờ logic của project

## Giải pháp[​](#giải-pháp "Link trực tiếp đến heading")

Xác định cách làm việc với URL/redirect từ cấp độ page trở lên

Chuyển xuống các layer bên dưới thông qua composition/props/factories

## Xem thêm[​](#xem-thêm "Link trực tiếp đến heading")

* [(Thread) Điều gì xảy ra nếu tôi "may" routing trong entities/features/widgets](https://t.me/feature_sliced/4389)
* [(Thread) Tại sao nó làm mờ logic của routes chỉ trong pages](https://t.me/feature_sliced/3756)
