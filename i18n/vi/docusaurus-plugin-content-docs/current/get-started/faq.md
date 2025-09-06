---
sidebar_position: 20
pagination_next: guides/examples/auth
---

# FAQ

:::info

Bạn có thể đặt câu hỏi trong [Telegram chat][telegram], [Discord community][discord], và [GitHub Discussions][github-discussions] của chúng tôi.

:::

### Có toolkit hay linter nào không?

Có! Chúng tôi có linter tên là [Steiger][ext-steiger] để kiểm tra kiến trúc project của bạn và có [folder generator][ext-tools] thông qua CLI hoặc IDE.

### Đặt layout/template của trang ở đâu?

Nếu bạn cần layout markup thuần túy, bạn có thể giữ chúng trong `shared/ui`. Nếu bạn cần sử dụng các layer cao hơn bên trong, có một vài lựa chọn:

- Có lẽ bạn không cần layout chút nào? Nếu layout chỉ có vài dòng, có thể hợp lý hơn là duplicate code trong mỗi trang thay vì cố gắng trừu tượng hóa nó.
- Nếu bạn thực sự cần layout, bạn có thể có chúng như các widget hoặc trang riêng biệt, và compose chúng trong cấu hình router ở App. Nested routing là một lựa chọn khác.

### Sự khác biệt giữa feature và entity là gì?

_Entity_ là khái niệm thực tế mà app của bạn đang làm việc với. _Feature_ là tương tác cung cấp giá trị thực tế cho người dùng app của bạn, điều mà mọi người muốn làm với các entity của bạn.

Để biết thêm thông tin cùng với ví dụ, xem trang Reference về [slice][reference-entities].

### Tôi có thể embed page/feature/entity vào nhau không?

Có, nhưng việc embedding này nên xảy ra ở các layer cao hơn. Ví dụ, bên trong widget, bạn có thể import cả feature rồi insert feature này vào feature khác như props/children.

Bạn không thể import feature này từ feature khác, điều này bị cấm bởi [**import rule on layers**][import-rule-layers].

### Còn Atomic Design thì sao?

Phiên bản hiện tại của phương pháp luận không yêu cầu cũng không cấm việc sử dụng Atomic Design cùng với Feature-Sliced Design.

Ví dụ, Atomic Design [có thể được áp dụng tốt](https://t.me/feature_sliced/1653) cho segment `ui` của các module.

### Có tài nguyên/bài viết/v.v. hữu ích nào về FSD không?

Có! https://github.com/feature-sliced/awesome

### Tại sao tôi cần Feature-Sliced Design?

Nó giúp bạn và team của bạn nhanh chóng tổng quan project theo các component mang lại giá trị chính. Kiến trúc được tiêu chuẩn hóa giúp tăng tốc onboarding và giải quyết các tranh luận về cấu trúc code. Xem trang [motivation][motivation] để tìm hiểu thêm về lý do FSD được tạo ra.

### Developer mới có cần architecture/methodology không?

Có thì tốt hơn là không

*Thường thì khi bạn thiết kế và phát triển project một mình, mọi thứ diễn ra suôn sẻ. Nhưng nếu có tạm dừng trong quá trình phát triển, có thêm developer mới vào team - thì vấn đề sẽ xuất hiện*

### Làm thế nào để làm việc với authorization context?

Trả lời [ở đây](/docs/guides/examples/auth)

[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-tools]: https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools
[import-rule-layers]: /docs/reference/layers#import-rule-on-layers
[reference-entities]: /docs/reference/layers#entities
[motivation]: /docs/about/motivation
[telegram]: https://t.me/feature_sliced
[discord]: https://discord.gg/S8MzWTUsmp
[github-discussions]: https://github.com/feature-sliced/documentation/discussions