---
sidebar_position: 3
---

# Migration từ v2.0 sang v2.1

Thay đổi chính trong v2.1 là mental model mới để phân tách interface — pages first.

Trong v2.0, FSD khuyến nghị xác định entities và features trong interface của bạn, cân nhắc thậm chí những bit nhỏ nhất của entity representation và tính tương tác để phân tách. Sau đó bạn sẽ xây dựng widgets và pages từ entities và features. Trong model phân tách này, phần lớn logic nằm trong entities và features, và pages chỉ là các compositional layer không có nhiều ý nghĩa riêng biệt.

Trong v2.1, chúng tôi khuyến nghị bắt đầu với pages, và có thể thậm chí dừng lại ở đó. Hầu hết mọi người đã biết cách tách app thành các page riêng biệt, và pages cũng là điểm khởi đầu phổ biến khi cố gắng tìm một component trong codebase. Trong model phân tách mới này, bạn giữ phần lớn UI và logic trong mỗi page riêng biệt, duy trì một foundation có thể tái sử dụng trong Shared. Nếu phát sinh nhu cầu tái sử dụng business logic trên nhiều page, bạn có thể di chuyển nó xuống layer bên dưới.

Một bổ sung khác cho Feature-Sliced Design là việc tiêu chuẩn hóa cross-imports giữa các entity với ký hiệu `@x`.

## Cách migration {#how-to-migrate}

Không có breaking changes trong v2.1, điều này có nghĩa là một dự án được viết với FSD v2.0 cũng là một dự án hợp lệ trong FSD v2.1. Tuy nhiên, chúng tôi tin rằng mental model mới có lợi hơn cho các team và đặc biệt là onboarding các developer mới, vì vậy chúng tôi khuyến nghị thực hiện các điều chỉnh nhỏ đối với việc phân tách của bạn.

### Merge slices

Một cách đơn giản để bắt đầu là chạy linter của chúng tôi, [Steiger][steiger], trên dự án. Steiger được xây dựng với mental model mới, và các rule hữu ích nhất sẽ là:

- [`insignificant-slice`][insignificant-slice] — nếu một entity hoặc feature chỉ được sử dụng trong một page, rule này sẽ đề xuất merge entity hoặc feature đó hoàn toàn vào page.
- [`excessive-slicing`][excessive-slicing] — nếu một layer có quá nhiều slices, thường là dấu hiệu cho thấy việc phân tách quá chi tiết. Rule này sẽ đề xuất merge hoặc nhóm một số slices để hỗ trợ navigation dự án.

```bash
npx steiger src
```

Điều này sẽ giúp bạn xác định những slice chỉ được sử dụng một lần, để bạn có thể cân nhắc lại xem chúng có thực sự cần thiết không. Trong những cân nhắc như vậy, hãy nhớ rằng một layer tạo thành một loại global namespace cho tất cả các slice bên trong nó. Giống như bản sẽ không làm ô nhiễm global namespace với các biến chỉ được sử dụng một lần, bạn nên coi một vị trí trong namespace của layer là có giá trị, được sử dụng một cách tiết kiệm.

### Tiêu chuẩn hóa cross-imports

Nếu trước đây bạn đã có cross-imports giữa trong dự án của mình (chúng tôi không phán xét!), bây giờ bạn có thể tận dụng một ký hiệu mới cho cross-importing trong Feature-Sliced Design — ký hiệu `@x`. Nó trông như thế này:

```ts title="entities/B/some/file.ts"
import type { EntityA } from "entities/A/@x/B";
```

Để biết thêm chi tiết, hãy xem phần [Public API for cross-imports][public-api-for-cross-imports] trong reference.

[insignificant-slice]: https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/insignificant-slice
[steiger]: https://github.com/feature-sliced/steiger
[excessive-slicing]: https://github.com/feature-sliced/steiger/tree/master/packages/steiger-plugin-fsd/src/excessive-slicing
[public-api-for-cross-imports]: /docs/reference/public-api#public-api-for-cross-imports
