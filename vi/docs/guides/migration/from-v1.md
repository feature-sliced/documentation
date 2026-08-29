# Migration từ v1 sang v2

## Tại sao v2?

Khái niệm gốc của **feature-slices** [đã được công bố][ext-tg-spb] vào năm 2018.

Kể từ đó, nhiều sự biến đổi của phương pháp luận đã diễn ra, nhưng đồng thời **[các nguyên tắc cơ bản đã được bảo tồn][ext-v1]**:

- Sử dụng cấu trúc dự án frontend *được tiêu chuẩn hóa*
- Chia nhỏ ứng dụng ngay từ đầu - theo *logic nghiệp vụ*
- Sử dụng các *feature độc lập* để ngăn chặn side effects ngầm định và phụ thuộc vòng tròn
- Sử dụng *Public API* với việc cấm "leo vào bên trong" của module

Đồng thời, trong phiên bản trước của phương pháp luận, vẫn còn những **điểm yếu** mà:

- Đôi khi dẫn đến boilerplate code
- Đôi khi dẫn đến sự phức tạp quá mức của code base và các quy tắc không rõ ràng giữa các abstraction
- Đôi khi dẫn đến các giải pháp kiến trúc ngầm định, ngăn cản việc kéo dự án lên và onboarding người mới

Phiên bản mới của phương pháp luận ([v2][ext-v2]) được thiết kế **để loại bỏ những thiếu sót này, đồng thời bảo tồn các ưu điểm hiện có** của cách tiếp cận này.

Kể từ năm 2018, [cũng đã phát triển][ext-fdd-issues] một phương pháp luận tương tự khác - [**feature-driven**][ext-fdd], được công bố lần đầu bởi [Oleg Isonen][ext-kof].

Sau khi hợp nhất hai cách tiếp cận, chúng tôi đã **cải thiện và tinh chỉnh các thực tiễn hiện có** - hướng tới sự linh hoạt, rõ ràng và hiệu quả hơn trong ứng dụng.

> Kết quả là, điều này thậm chí đã ảnh hưởng đến tên của phương pháp luận - *"feature-slice**d**"*

## Tại sao việc migration dự án sang v2 có ý nghĩa?

> `WIP:` Phiên bản hiện tại của phương pháp luận đang được phát triển và một số chi tiết *có thể thay đổi*

#### 🔍 Kiến trúc minh bạch và đơn giản hơn

Phương pháp luận (v2) cung cấp **các abstraction trực quan hơn và phổ biến hơn cũng như các cách phân tách logic giữa các developer.**

Tất cả điều này có tác động cực kỳ tích cực đến việc thu hút người mới, cũng như nghiên cứu trạng thái hiện tại của dự án, và phân phối logic nghiệp vụ của ứng dụng.

#### 📦 Tính modular linh hoạt và trung thực hơn

Phương pháp luận (v2) cho phép **phân phối logic theo cách linh hoạt hơn:**

- Với khả năng refactor các phần riêng biệt từ đầu
- Với khả năng dựa vào cùng các abstraction, nhưng không có sự đan xen phụ thuộc không cần thiết
- Với các yêu cầu đơn giản hơn cho vị trí của module mới *(layer => slice => segment)*

#### 🚀 Nhiều đặc tả, kế hoạch, cộng đồng hơn

Hiện tại, `core-team` đang tích cực làm việc trên phiên bản mới nhất (v2) của phương pháp luận

Vì vậy đối với nó:

- sẽ có nhiều case / vấn đề được mô tả hơn
- sẽ có nhiều hướng dẫn về ứng dụng hơn
- sẽ có nhiều ví dụ thực tế hơn
- nói chung, sẽ có nhiều tài liệu hơn để onboarding người mới và nghiên cứu các khái niệm của phương pháp luận
- toolkit sẽ được phát triển trong tương lai để tuân thủ các khái niệm và quy ước về kiến trúc

> Tất nhiên, cũng sẽ có hỗ trợ người dùng cho phiên bản đầu tiên - nhưng phiên bản mới nhất vẫn là ưu tiên của chúng tôi
>
> Trong tương lai, với các bản cập nhật major tiếp theo, bạn vẫn sẽ có quyền truy cập vào phiên bản hiện tại (v2) của phương pháp luận, **không có rủi ro cho team và dự án của bạn**

## Changelog

### `BREAKING` Layers

Bây giờ phương pháp luận giả định việc phân bổ rõ ràng các layer ở tầng cao nhất

- `/app` > `/processes` > **`/pages`** > **`/features`** > `/entities` > `/shared`
- *Tức là, không phải mọi thứ bây giờ đều được coi là features/pages*
- Cách tiếp cận này cho phép bạn [đặt quy tắc rõ ràng cho các layer][ext-tg-v2-draft]:
- **Càng cao layer** của module được đặt, càng nhiều **context** nó có
  
  *(nói cách khác - mỗi module của layer - chỉ có thể import các module của các layer bên dưới, nhưng không phải cao hơn)*

- **Càng thấp layer** của module được đặt, càng nhiều **nguy hiểm và trách nhiệm** khi thực hiện thay đổi

  *(vì thường là các layer bên dưới được sử dụng nhiều hơn)*

### `BREAKING` Shared

Các infrastructure abstraction `/ui`, `/lib`, `/api`, trước đây nằm trong src root của dự án, bây giờ được tách biệt bởi thư mục riêng biệt `/src/shared`

- `shared/ui` - Vẫn là uikit tổng quát giống như cũ của ứng dụng (tùy chọn)
  - *Đồng thời, không ai cấm sử dụng `Atomic Design` ở đây như trước*
- `shared/lib` - Tập hợp các thư viện phụ trợ để triển khai logic
  - *Vẫn - không có dump của helpers*
- `shared/api` - Điểm vào chung để truy cập API
  - *Cũng có thể đăng ký cục bộ trong mỗi feature / page - nhưng không được khuyến khích*
- Như trước - không nên có ràng buộc rõ ràng với business logic trong `shared`
  - *Nếu cần thiết, bạn cần đưa mối quan hệ này lên tầng `entities` hoặc thậm chí cao hơn*

### `NEW` Entities, Processes

Trong v2 **, các abstraction mới khác** đã được thêm vào để loại bỏ các vấn đề về độ phức tạp logic và coupling cao.

- `/entities` - layer **business entities** chứa các slice có liên quan trực tiếp đến các business model hoặc synthetic entities chỉ cần thiết trên frontend
  - *Ví dụ: `user`, `i18n`, `order`, `blog`*
- `/processes` - layer **business processes**, xuyên suốt app
  - **Layer này là tùy chọn**, thường được khuyến khích sử dụng khi *logic phát triển và bắt đầu mờ nhạt trong nhiều page*
  - *Ví dụ: `payment`, `auth`, `quick-tour`*

### `BREAKING` Abstractions & Naming

Bây giờ các abstraction cụ thể và [khuyến nghị rõ ràng cho việc đặt tên chúng][refs-adaptability] đã được định nghĩa

[disc-process]: https://github.com/feature-sliced/documentation/discussions/20
[disc-features]: https://github.com/feature-sliced/documentation/discussions/23
[disc-entities]: https://github.com/feature-sliced/documentation/discussions/18#discussioncomment-422649
[disc-shared]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453020

[disc-ui]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-453132
[disc-model]: https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-472645
[disc-api]: https://github.com/feature-sliced/documentation/discussions/66

#### Layers

- `/app` — **layer khởi tạo ứng dụng**
  - *Các phiên bản trước: `app`, `core`,`init`, `src/index` (và điều này cũng xảy ra)*
- `/processes` — [**layer business process**][disc-process]
  - *Các phiên bản trước: `processes`, `flows`, `workflows`*
- `/pages` — **layer page ứng dụng**
  - *Các phiên bản trước: `pages`, `screens`, `views`, `layouts`, `components`, `containers`*
- `/features` — [**layer các phần functionality**][disc-features]
  - *Các phiên bản trước: `features`, `components`, `containers`*
- `/entities` — [**layer business entity**][disc-entities]
  - *Các phiên bản trước: `entities`, `models`, `shared`*
- `/shared` — [**layer của infrastructure code tái sử dụng**][disc-shared] 🔥
  - *Các phiên bản trước: `shared`, `common`, `lib`*

#### Segments

- `/ui` — [**UI segment**][disc-ui] 🔥
  - *Các phiên bản trước: `ui`, `components`, `view`*
- `/model` — [**BL-segment**][disc-model] 🔥
  - *Các phiên bản trước: `model`, `store`, `state`, `services`, `controller`*
- `/lib` — segment **của auxiliary code**
  - *Các phiên bản trước: `lib`, `libs`, `utils`, `helpers`*
- `/api` — [**API segment**][disc-api]
  - *Các phiên bản trước: `api`, `service`, `requests`, `queries`*
- `/config` — **segment cấu hình ứng dụng**
  - *Các phiên bản trước: `config`, `env`, `get-env`*

### `REFINED` Low coupling

Bây giờ việc [tuân thủ nguyên tắc low coupling][refs-low-coupling] giữa các module dễ dàng hơn nhiều, nhờ vào các layer mới.

*Đồng thời, vẫn được khuyến khích tránh càng nhiều càng tốt các trường hợp khi cực kỳ khó để "uncouple" các module*

## Xem thêm

- [Ghi chú từ báo cáo "React SPB Meetup #1"][ext-tg-spb]
- [React Berlin Talk - Oleg Isonen "Feature Driven Architecture"][ext-kof-fdd]
- [So sánh với v1 (community-chat)](https://t.me/feature_sliced/493)
- [Ý tưởng mới v2 với giải thích (atomicdesign-chat)][ext-tg-v2-draft]
- [Thảo luận về các abstraction và naming cho phiên bản mới của phương pháp luận (v2)](https://github.com/feature-sliced/documentation/discussions/31)

[refs-low-coupling]: /vi/docs/reference/slices-segments#zero-coupling-high-cohesion
[refs-adaptability]: /vi/docs/about/understanding/naming

[ext-v1]: https://feature-sliced.github.io/featureslices.dev/v1.0.html
[ext-tg-spb]: https://t.me/feature_slices
[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-fdd-issues]: https://github.com/kof/feature-driven-architecture/issues
[ext-v2]: https://github.com/feature-sliced/documentation
[ext-kof]: https://github.com/kof
[ext-kof-fdd]: https://www.youtube.com/watch?v=BWAeYuWFHhs
[ext-tg-v2-draft]: https://t.me/atomicdesign/18708
