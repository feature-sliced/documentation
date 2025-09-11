# Đặt tên

Các developer khác nhau có kinh nghiệm và ngữ cảnh khác nhau, có thể dẫn đến hiểu lầm trong team khi cùng một entity được gọi khác nhau. Ví dụ:

* Component để hiển thị có thể được gọi là "ui", "component", "ui-kit", "view", …
* Code được tái sử dụng trong toàn bộ ứng dụng có thể được gọi là "core", "shared", "app", …
* Code logic kinh doanh có thể được gọi là "store", "model", "state", …

## Đặt tên trong Feature-Sliced Design[​](#naming-in-fsd "Link trực tiếp đến heading")

Methodology sử dụng các thuật ngữ cụ thể như:

* "app", "process", "page", "feature", "entity", "shared" như tên layer,
* "ui", "model", "lib", "api", "config" như tên segment.

Rất quan trọng là phải tuân thủ những thuật ngữ này để tránh nhầm lẫn giữa các thành viên trong team và developer mới tham gia dự án. Việc sử dụng tên chuẩn cũng giúp khi xin trợ giúp từ cộng đồng.

## Xung đột đặt tên[​](#when-can-naming-interfere "Link trực tiếp đến heading")

Xung đột đặt tên có thể xảy ra khi các thuật ngữ được sử dụng trong methodology FSD trùng lặp với các thuật ngữ được sử dụng trong kinh doanh:

* `FSD#process` vs quy trình mô phỏng trong ứng dụng,
* `FSD#page` vs trang log,
* `FSD#model` vs model xe hơi.

Ví dụ, một developer nhìn thấy từ "process" trong code sẽ tốn thêm thời gian để tìm hiểu quy trình nào đang được đề cập. Những **xung đột như vậy có thể làm gián đoạn quá trình phát triển**.

Khi từ vựng của dự án chứa thuật ngữ đặc thù của FSD, điều quan trọng là phải cẩn thận khi thảo luận các thuật ngữ này với team và các bên liên quan không quan tâm đến kỹ thuật.

Để giao tiếp hiệu quả với team, được khuyến nghị sử dụng từ viết tắt "FSD" làm tiền tố cho các thuật ngữ methodology. Ví dụ, khi nói về một process, bạn có thể nói, "Chúng ta có thể đặt process này trên layer feature của FSD."

Ngược lại, khi giao tiếp với các bên liên quan không thuộc kỹ thuật, tốt hơn là hạn chế sử dụng thuật ngữ FSD và tránh đề cập đến cấu trúc bên trong của codebase.

## Xem thêm[​](#see-also "Link trực tiếp đến heading")

* [(Thảo luận) Khả năng thích ứng của việc đặt tên](https://github.com/feature-sliced/documentation/discussions/16)
* [(Thảo luận) Khảo sát đặt tên Entity](https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894)
* [(Thảo luận) "process" vs "flow" vs ...](https://github.com/feature-sliced/documentation/discussions/20)
* [(Thảo luận) "model" vs "store" vs ...](https://github.com/feature-sliced/documentation/discussions/68)
