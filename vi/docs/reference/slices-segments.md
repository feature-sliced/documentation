# Slice và segment

## Slice[​](#slice "Link trực tiếp đến heading")

Slice là cấp độ thứ hai trong hệ thống phân cấp tổ chức của Feature-Sliced Design. Mục đích chính của chúng là nhóm code theo ý nghĩa của nó đối với sản phẩm, business, hoặc chỉ đơn giản là application.

Tên của các slice không được chuẩn hóa vì chúng được xác định trực tiếp bởi business domain của ứng dụng của bạn. Ví dụ, một photo gallery có thể có các slice `photo`, `effects`, `gallery-page`. Một mạng xã hội sẽ yêu cầu các slice khác nhau, ví dụ `post`, `comments`, `news-feed`.

Các layer Shared và App không chứa slice. Đó là vì Shared không nên chứa business logic nào cả, do đó không có ý nghĩa gì đối với sản phẩm, và App chỉ nên chứa code liên quan đến toàn bộ ứng dụng, vì vậy không cần phải chia tách.

### Zero coupling và high cohesion[​](#zero-coupling-high-cohesion "Link trực tiếp đến heading")

Slice được thiết kế để là các nhóm file code độc lập và có tính gắn kết cao. Hình minh họa dưới đây có thể giúp hình dung các khái niệm khó hiểu về *cohesion* và *coupling*:

![](/documentation/vi/img/coupling-cohesion-light.svg#light-mode-only)![](/documentation/vi/img/coupling-cohesion-dark.svg#dark-mode-only)

Image inspired by <https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/>

Một slice lý tưởng là độc lập với các slice khác trên layer của nó (zero coupling) và chứa hầu hết code liên quan đến mục tiêu chính của nó (high cohesion).

Tính độc lập của các slice được thực thi bởi [import rule trên layer](/documentation/vi/docs/reference/layers.md#import-rule-on-layers):

> *Một module (file) trong slice chỉ có thể import các slice khác khi chúng được đặt trên các layer thấp hơn một cách nghiêm ngặt.*

### Public API rule trên slice[​](#public-api-rule-trên-slice "Link trực tiếp đến heading")

Bên trong slice, code có thể được tổ chức theo bất kỳ cách nào mà bạn muốn. Điều đó không gây ra vấn đề gì miễn là slice cung cấp public API tốt cho các slice khác sử dụng nó. Điều này được thực thi với **public API rule trên slice**:

> *Mỗi slice (và segment trên các layer không có slice) phải chứa một định nghĩa public API.*
>
> *Các module bên ngoài slice/segment này chỉ có thể tham chiếu public API, không phải cấu trúc file nội bộ của slice/segment.*

Đọc thêm về lý lẽ của public API và best practice để tạo một cái trong [Public API reference](/documentation/vi/docs/reference/public-api.md).

### Nhóm slice[​](#nhóm-slice "Link trực tiếp đến heading")

Các slice liên quan chặt chẽ có thể được nhóm về mặt cấu trúc trong một folder, nhưng chúng nên thực hiện các quy tắc cô lập giống như các slice khác — không nên có **code sharing** trong folder đó.

![Features \&quot;compose\&quot;, \&quot;like\&quot; and \&quot;delete\&quot; grouped in a folder \&quot;post\&quot;. In that folder there is also a file \&quot;some-shared-code.ts\&quot; that is crossed out to imply that it\&#39;s not allowed.](/documentation/vi/assets/images/graphic-nested-slices-b9c44e6cc55ecdbf3e50bf40a61e5a27.svg)

## Segment[​](#segment "Link trực tiếp đến heading")

Segment là cấp độ thứ ba và cuối cùng trong hệ thống phân cấp tổ chức, và mục đích của chúng là nhóm code theo bản chất kỹ thuật của nó.

Có một số tên segment được chuẩn hóa:

* `ui` — mọi thứ liên quan đến hiển thị UI: UI component, date formatter, style, v.v.
* `api` — tương tác backend: request function, data type, mapper, v.v.
* `model` — data model: schema, interface, store, và business logic.
* `lib` — library code mà các module khác trên slice này cần.
* `config` — configuration file và feature flag.

Xem [trang Layer](/documentation/vi/docs/reference/layers.md#layer-definitions) để biết ví dụ về cách sử dụng từng segment này trên các layer khác nhau.

Bạn cũng có thể tạo custom segment. Những nơi phổ biến nhất cho custom segment là layer App và layer Shared, nơi mà slice không có ý nghĩa.

Hãy đảm bảo rằng tên của những segment này mô tả mục đích của nội dung, không phải bản chất của nó. Ví dụ, `components`, `hooks`, và `types` là những tên segment tệ vì chúng không hữu ích khi bạn đang tìm kiếm code.
