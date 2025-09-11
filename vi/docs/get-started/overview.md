# Tổng quan

**Feature-Sliced Design** (FSD) là một phương pháp thiết kế kiến trúc để xây dựng các ứng dụng frontend. Nói đơn giản, đây là tập hợp các quy tắc và quy ước để tổ chức code. Mục đích chính của phương pháp này là làm cho dự án trở nên dễ hiểu và ổn định hơn khi đối mặt với những yêu cầu kinh doanh liên tục thay đổi.

Ngoài tập hợp các quy ước, FSD còn là một bộ công cụ. Chúng tôi có [linter](https://github.com/feature-sliced/steiger) để kiểm tra kiến trúc dự án của bạn, [trình tạo thư mục](https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools) thông qua CLI hoặc IDE, cũng như thư viện phong phú các [ví dụ](/documentation/vi/examples.md).

## Có phù hợp với tôi không?[​](#is-it-right-for-me "Link trực tiếp đến heading")

FSD có thể được triển khai trong các dự án và nhóm với bất kỳ quy mô nào. Nó phù hợp với dự án của bạn nếu:

* Bạn đang làm **frontend** (UI trên web, mobile, desktop, v.v.)
* Bạn đang xây dựng một **ứng dụng**, không phải thư viện

Vâng, chỉ đơn giản thế thôi! Không có ràng buộc nào về ngôn ngữ lập trình, UI framework, hoặc state manager bạn sử dụng. Bạn cũng có thể áp dụng FSD từng bước một, sử dụng nó trong monorepo, và mở rộng quy mô lớn bằng cách chia ứng dụng thành các package và triển khai FSD riêng lẻ trong từng package.

Nếu bạn đã có một kiến trúc và đang cân nhắc chuyển sang FSD, hãy đảm bảo rằng kiến trúc hiện tại đang **gây ra vấn đề** trong nhóm của bạn. Ví dụ, nếu dự án của bạn đã trở nên quá lớn và liên kết chặt chẽ với nhau khiến việc triển khai tính năng mới trở nên kém hiệu quả, hoặc nếu bạn dự kiến có nhiều thành viên mới tham gia nhóm. Nếu kiến trúc hiện tại hoạt động tốt, có lẽ không đáng để thay đổi. Nhưng nếu bạn quyết định migrate, hãy xem phần [Migration](/documentation/vi/docs/guides/migration/from-custom.md) để được hướng dẫn.

## Ví dụ cơ bản[​](#basic-example "Link trực tiếp đến heading")

Đây là một dự án đơn giản triển khai FSD:

* `📁 app`
* `📁 pages`
* `📁 shared`

Những thư mục cấp cao này được gọi là *layer*. Hãy xem sâu hơn:

* `📂 app`

  * `📁 routes`
  * `📁 analytics`

* `📂 pages`

  * `📁 home`

  * `📂 article-reader`

    * `📁 ui`
    * `📁 api`

  * `📁 settings`

* `📂 shared`

  * `📁 ui`
  * `📁 api`

Các thư mục bên trong `📂 pages` được gọi là *slice*. Chúng chia layer theo domain (trong trường hợp này, theo trang).

Các thư mục bên trong `📂 app`, `📂 shared`, và `📂 pages/article-reader` được gọi là *segment*, và chúng chia các slice (hoặc layer) theo mục đích kỹ thuật, tức là code đó dùng để làm gì.

## Các khái niệm[​](#concepts "Link trực tiếp đến heading")

Layer, slice, và segment tạo thành một hệ thống phân cấp như sau:

![Hierarchy of FSD concepts, described below](/documentation/vi/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

Hình minh họa: ba cột, được gắn nhãn từ trái sang phải lần lượt là "Layers", "Slices", và "Segments".

Cột "Layers" chứa bảy phân chia được sắp xếp từ trên xuống dưới và được gắn nhãn "app", "processes", "pages", "widgets", "features", "entities", và "shared". Phân chia "processes" bị gạch ngang. Phân chia "entities" được kết nối với cột thứ hai "Slices" theo cách truyền đạt rằng cột thứ hai là nội dung của "entities".

Cột "Slices" chứa ba phân chia được sắp xếp từ trên xuống dưới và được gắn nhãn "user", "post", và "comment". Phân chia "post" được kết nối với cột thứ ba "Segments" theo cùng cách như vậy để nó là nội dung của "post".

Cột "Segments" chứa ba phân chia, được sắp xếp từ trên xuống dưới và được gắn nhãn "ui", "model", và "api".

### Layer[​](#layers "Link trực tiếp đến heading")

Các layer được tiêu chuẩn hóa trên tất cả các dự án FSD. Bạn không cần phải sử dụng tất cả các layer, nhưng tên của chúng rất quan trọng. Hiện tại có bảy layer (từ trên xuống dưới):

1. **App** — mọi thứ khiến ứng dụng chạy được — routing, entrypoint, global style, provider.
2. **Processes** (deprecated) — các kịch bản phức tạp liên quan đến nhiều trang.
3. **Pages** — các trang đầy đủ hoặc các phần lớn của trang trong nested routing.
4. **Widget** — các khối chức năng hoặc UI lớn, tự chứa, thường cung cấp toàn bộ một use case.
5. **Feature** — các triển khai *tái sử dụng* của toàn bộ tính năng sản phẩm, tức là các hành động mang lại giá trị kinh doanh cho người dùng.
6. **Entity** — các thực thể kinh doanh mà dự án làm việc với, như `user` hoặc `product`.
7. **Shared** — chức năng tái sử dụng, đặc biệt khi nó tách rời khỏi đặc điểm cụ thể của dự án/kinh doanh, mặc dù không nhất thiết.

cảnh báo

Các layer **App** và **Shared**, không giống như các layer khác, không có slice và được chia trực tiếp thành các segment.

Tuy nhiên, tất cả các layer khác — **Entity**, **Feature**, **Widget**, và **Page**, giữ nguyên cấu trúc trong đó bạn phải tạo slice trước, bên trong đó bạn tạo các segment.

Điều thú vị với các layer là các module ở một layer chỉ có thể biết về và import từ các module từ các layer ở phía dưới một cách nghiêm ngặt.

### Slice[​](#slices "Link trực tiếp đến heading")

Tiếp theo là các slice, chúng phân chia code theo domain business. Bạn có thể tự do chọn bất kỳ tên nào cho chúng và tạo nhiều như bạn muốn. Các slice làm cho codebase của bạn dễ điều hướng hơn bằng cách giữ các module có liên quan logic gần nhau.

Các slice không thể sử dụng slice khác trên cùng layer, và điều đó giúp với tính liên kết cao và khớp nối thấp.

### Segment[​](#segments "Link trực tiếp đến heading")

Các slice, cũng như các layer App và Shared, bao gồm các segment, và các segment nhóm code của bản theo mục đích của nó. Tên segment không bị ràng buộc bởi tiêu chuẩn, nhưng có một số tên quy ước cho các mục đích phổ biến nhất:

* `ui` — mọi thứ liên quan đến hiển thị UI: UI component, date formatter, style, v.v.
* `api` — tương tác backend: request function, data type, mapper, v.v.
* `model` — model dữ liệu: schema, interface, store, và business logic.
* `lib` — library code mà các module khác trên slice này cần.
* `config` — file cấu hình và feature flag.

Thường thì những segment này đủ cho hầu hết các layer, bạn chỉ tạo segment riêng của mình trong Shared hoặc App, nhưng đây không phải là quy tắc bắt buộc.

## Ưu điểm[​](#advantages "Link trực tiếp đến heading")

* **Tính thống nhất**<br /><!-- -->Vì cấu trúc được tiêu chuẩn hóa, các dự án trở nên thống nhất hơn, điều này làm cho việc onboard thành viên mới dễ dàng hơn cho nhóm.

* **Ổn định trước các thay đổi và refactoring**<br /><!-- -->Một module trên một layer không thể sử dụng các module khác trên cùng layer, hoặc các layer ở trên.<br /><!-- -->Điều này cho phép bạn thực hiện các sửa đổi độc lập mà không có hậu quả không lường trước đối với phần còn lại của ứng dụng.

* **Kiểm soát việc tái sử dụng logic**<br /><!-- -->Tùy thuộc vào layer, bạn có thể làm cho code rất có thể tái sử dụng hoặc rất cục bộ.<br /><!-- -->Điều này giữ sự cân bằng giữa việc tuân theo nguyên tắc **DRY** và tính thực tế.

* **Định hướng vào nhu cầu kinh doanh và người dùng**<br /><!-- -->Ứng dụng được chia theo các domain kinh doanh và việc sử dụng ngôn ngữ kinh doanh được khuyến khích trong việc đặt tên, để bạn có thể thực hiện công việc sản phẩm hữu ích mà không cần hiểu đầy đủ tất cả các phần không liên quan khác của dự án.

## Áp dụng từng bước[​](#incremental-adoption "Link trực tiếp đến heading")

Nếu bạn có một codebase hiện có mà bạn muốn migrate sang FSD, chúng tôi đề xuất chiến lược sau. Chúng tôi thấy nó hữu ích trong kinh nghiệm migrate của chính mình.

1. Bắt đầu bằng cách từ từ định hình các layer App và Shared từng module một để tạo nền tảng.

2. Phân phối tất cả UI hiện có trên Widget và Page bằng cách sơ bộ, ngay cả khi chúng có dependency vi phạm các quy tắc của FSD.

3. Bắt đầu từ từ giải quyết các vi phạm import và cũng trích xuất Entity và có thể cả Feature.

Nên tránh thêm các entity lớn mới trong khi refactor hoặc chỉ refactor một số phần nhất định của dự án.

## Bước tiếp theo[​](#next-steps "Link trực tiếp đến heading")

* **Muốn nắm bắt tốt cách tư duy trong FSD?** Xem [Tutorial](/documentation/vi/docs/get-started/tutorial.md).
* **Bạn thích học từ ví dụ?** Chúng tôi có rất nhiều trong phần [Examples](/documentation/vi/examples.md).
* **Bạn có câu hỏi?** Ghé thăm [Telegram chat](https://t.me/feature_sliced) của chúng tôi và nhận trợ giúp từ cộng đồng.
