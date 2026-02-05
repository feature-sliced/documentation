# Layer

Layer là cấp độ đầu tiên của hệ thống phân cấp tổ chức trong Feature-Sliced Design. Mục đích của chúng là phân tách code dựa trên mức độ trách nhiệm cần thiết và số lượng module khác trong app mà nó phụ thuộc vào. Mỗi layer mang ý nghĩa ngữ nghĩa đặc biệt để giúp bạn xác định mức độ trách nhiệm mà bạn nên phân bổ cho code của mình.

Có tổng cộng **7 layer**, được sắp xếp từ nhiều trách nhiệm và dependency nhất đến ít nhất:

![A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets, features, entities, shared. The processes folder is slightly faded out.](/vi/img/layers/folders-graphic-light.svg#light-mode-only) ![A file system tree, with a single root folder called src and then seven subfolders: app, processes, pages, widgets, features, entities, shared. The processes folder is slightly faded out.](/vi/img/layers/folders-graphic-dark.svg#dark-mode-only)

1. App
2. Processes (deprecated)
3. Pages
4. Widgets
5. Features
6. Entities
7. Shared

Bạn không cần phải sử dụng mọi layer trong dự án của mình — chỉ thêm chúng nếu bạn nghĩ nó mang lại giá trị cho dự án của bạn. Thông thường, hầu hết các dự án frontend sẽ có ít nhất các layer Shared, Pages và App.

Trong thực tế, layer là các folder với tên viết thường (ví dụ: `📁 shared`, `📁 pages`, `📁 app`). Việc thêm layer mới *không được khuyến nghị* vì ngữ nghĩa của chúng đã được chuẩn hóa.

## Import rule trên layer[​](#import-rule-trên-layer "Link trực tiếp đến heading")

Layer được tạo thành từ các *slice* — các nhóm module có tính gắn kết cao. Dependency giữa các slice được điều chỉnh bởi **import rule trên layer**:

> *Một module (file) trong slice chỉ có thể import các slice khác khi chúng nằm trên các layer thấp hơn một cách nghiêm ngặt.*

Ví dụ, folder `📁 ~/features/aaa` là một slice với tên "aaa". Một file bên trong nó, `~/features/aaa/api/request.ts`, không thể import code từ bất kỳ file nào trong `📁 ~/features/bbb`, nhưng có thể import code từ `📁 ~/entities` và `📁 ~/shared`, cũng như bất kỳ code anh em nào từ `📁 ~/features/aaa`, ví dụ `~/features/aaa/lib/cache.ts`.

Layer App và Shared là **ngoại lệ** của quy tắc này — chúng vừa là layer vừa là slice cùng một lúc. Slice phân chia code theo business domain, và hai layer này là ngoại lệ vì Shared không có business domain, và App kết hợp tất cả business domain.

Trong thực tế, điều này có nghĩa là layer App và Shared được tạo thành từ các segment, và các segment có thể import lẫn nhau một cách tự do.

## Định nghĩa layer[​](#định-nghĩa-layer "Link trực tiếp đến heading")

Phần này mô tả ý nghĩa ngữ nghĩa của từng layer để tạo ra trực giác về loại code nào thuộc về đó.

### Shared[​](#shared "Link trực tiếp đến heading")

Layer này tạo thành nền tảng cho phần còn lại của app. Đây là nơi tạo kết nối với thế giới bên ngoài, ví dụ: backend, third-party library, environment. Đây cũng là nơi định nghĩa các library có tính chứa đựng cao của riêng bạn.

Layer này, giống như layer App, *không chứa slice*. Slice được dùng để chia layer thành các business domain, nhưng business domain không tồn tại trong Shared. Điều này có nghĩa là tất cả file trong Shared có thể tham chiếu và import lẫn nhau.

Dưới đây là các segment mà bạn thường có thể tìm thấy trong layer này:

* `📁 api` — API client và có thể cả các function để thực hiện request đến các endpoint backend cụ thể.
* `📁 ui` — bộ UI kit của ứng dụng.
  <br />
  <!-- -->
  Các component trên layer này không nên chứa business logic, nhưng có thể có chủ đề business. Ví dụ, bạn có thể đặt logo công ty và layout trang ở đây. Các component có UI logic cũng được cho phép (ví dụ: autocomplete hoặc search bar).
* `📁 lib` — tập hợp các internal library.
  <br />
  <!-- -->
  Folder này không nên được coi như helper hoặc utility ([đọc ở đây tại sao những folder này thường trở thành bãi rác](https://dev.to/sergeysova/why-utils-helpers-is-a-dump-45fo)). Thay vào đó, mỗi library trong folder này nên có một lĩnh vực tập trung, ví dụ: date, color, text manipulation, v.v. Lĩnh vực tập trung đó nên được ghi lại trong file README. Các developer trong team của bạn nên biết có thể thêm gì và không thể thêm gì vào những library này.
* `📁 config` — environment variable, global feature flag và các cấu hình global khác cho app của bạn.
* `📁 routes` — route constant hoặc pattern để matching route.
* `📁 i18n` — setup code cho translation, global translation string.

Bạn được tự do thêm nhiều segment hơn, nhưng hãy đảm bảo rằng tên của những segment này mô tả mục đích của nội dung, không phải bản chất của nó. Ví dụ, `components`, `hooks`, và `types` là những tên segment tệ vì chúng không hữu ích khi bạn đang tìm kiếm code.

### Entities[​](#entities "Link trực tiếp đến heading")

Các slice trên layer này đại diện cho các khái niệm từ thế giới thực mà dự án đang làm việc. Thông thường, chúng là các thuật ngữ mà business sử dụng để mô tả sản phẩm. Ví dụ, một mạng xã hội có thể làm việc với các business entity như User, Post và Group.

Một entity slice có thể chứa data storage (`📁 model`), data validation schema (`📁 model`), các function API request liên quan đến entity (`📁 api`), cũng như visual representation của entity này trong interface (`📁 ui`). Visual representation không cần phải tạo ra một UI block hoàn chỉnh — nó chủ yếu nhằm tái sử dụng cùng một appearance trên nhiều page trong app, và các business logic khác nhau có thể được gắn vào nó thông qua props hoặc slot.

#### Mối quan hệ entity[​](#mối-quan-hệ-entity "Link trực tiếp đến heading")

Entity trong FSD là các slice, và mặc định, các slice không thể biết về nhau. Tuy nhiên, trong đời thực, các entity thường tương tác với nhau, và đôi khi một entity sở hữu hoặc chứa các entity khác. Vì vậy, business logic của những tương tác này tốt nhất nên được giữ ở các layer cao hơn, như Features hoặc Pages.

Khi data object của một entity chứa các data object khác, thường là ý tưởng tốt để làm cho kết nối giữa các entity trở nên rõ ràng và bỏ qua slice isolation bằng cách tạo cross-reference API với ký hiệu `@x`. Lý do là các entity được kết nối cần được refactor cùng nhau, vì vậy tốt nhất là làm cho kết nối không thể bỏ sót.

For example:

entities/artist/model/artist.ts

```
import type { Song } from "entities/song/@x/artist";

export interface Artist {
  name: string;
  songs: Array<Song>;
}
```

entities/song/@x/artist.ts

```
export type { Song } from "../model/song.ts";
```

Tìm hiểu thêm về ký hiệu `@x` trong phần [Public API cho cross-import](/vi/docs/reference/public-api.md#public-api-for-cross-imports).

### Features[​](#features "Link trực tiếp đến heading")

Layer này dành cho các tương tác chính trong app của bạn, những thứ mà người dùng quan tâm để làm. Các tương tác này thường liên quan đến các business entity, vì đó là nội dung của app.

Một nguyên tắc quan trọng để sử dụng layer Features hiệu quả là: **không phải mọi thứ đều cần là feature**. Một chỉ báo tốt để biết thứ gì cần là feature là nó được tái sử dụng trên nhiều page.

Ví dụ, nếu app có nhiều editor, và tất cả chúng đều có comment, thì comment là một feature được tái sử dụng. Hãy nhớ rằng slice là cơ chế để tìm code nhanh chóng, và nếu có quá nhiều feature, những cái quan trọng sẽ bị chìm nghỉm.

Lý tưởng, khi bạn đến một dự án mới, bạn sẽ khám phá tính năng của nó bằng cách xem qua các page và feature. Khi quyết định thứ gì nên là feature, hãy tối ưu hóa cho trải nghiệm của người mới vào dự án để nhanh chóng khám phá các khu vực code lớn quan trọng.

Một feature slice có thể chứa UI để thực hiện tương tác như form (`📁 ui`), các API call cần thiết để thực hiện action (`📁 api`), validation và internal state (`📁 model`), feature flag (`📁 config`).

### Widgets[​](#widgets "Link trực tiếp đến heading")

Layer Widgets được thiết kế cho các UI block lớn tự đủ. Widget hữu ích nhất khi chúng được tái sử dụng trên nhiều page, hoặc khi page mà chúng thuộc về có nhiều block độc lập lớn, và đây là một trong số chúng.

Nếu một UI block tạo nên phần lớn nội dung thú vị trên page, và không bao giờ được tái sử dụng, nó **không nên là widget**, và thay vào đó nên được đặt trực tiếp bên trong page đó.

mẹo

Nếu bạn đang sử dụng nested routing system (như router của [Remix](https://remix.run)), có thể hữu ích khi sử dụng layer Widgets giống như cách mà flat routing system sẽ sử dụng layer Pages — để tạo các router block đầy đủ, hoàn chỉnh với data fetching liên quan, loading state, và error boundary.

Tương tự, bạn có thể lưu page layout trên layer này.

### Pages[​](#pages "Link trực tiếp đến heading")

Page là thứ tạo nên các website và application (cũng được biết đến là screen hoặc activity). Một page thường tương ứng với một slice, tuy nhiên, nếu có nhiều page rất giống nhau, chúng có thể được nhóm vào một slice, ví dụ registration và login form.

Không có giới hạn về lượng code bạn có thể đặt trong page slice miễn là team của bạn vẫn thấy dễ navigate. Nếu một UI block trên page không được tái sử dụng, hoàn toàn ổn khi giữ nó bên trong page slice.

Trong page slice bạn thường có thể tìm thấy UI của page cũng như loading state và error boundary (`📁 ui`) và các data fetching và mutating request (`📁 api`). Không phổ biến đề page có data model riêng biệt, và các bit state nhỏ có thể được giữ trong chính các component.

### Processes[​](#processes "Link trực tiếp đến heading")

cẩn thận

Layer này đã bị deprecated. Phiên bản hiện tại của spec khuyên tránh nó và chuyển nội dung của nó sang `features` và `app` thay vào đó.

Process là escape hatch cho các tương tác nhiều page.

Layer này cố tình được để không định nghĩa. Hầu hết các ứng dụng không nên sử dụng layer này, và giữ logic cấp router và cấp server trên layer App. Chỉ cân nhắc sử dụng layer này khi layer App phát triển đủ lớn để trở nên không thể bảo trì và cần giảm tải.

### App[​](#app "Link trực tiếp đến heading")

Mọi loại vấn đề app-wide, cả trong nghĩa kỹ thuật (ví dụ: context provider) và trong nghĩa business (ví dụ: analytics).

Layer này thường không chứa slice, cũng giống như Shared, thay vào đó có các segment trực tiếp.

Dưới đây là các segment mà bạn thường có thể tìm thấy trong layer này:

* `📁 routes` — router configuration
* `📁 store` — global store configuration
* `📁 styles` — global style
* `📁 entrypoint` — entrypoint đến application code, framework-specific
