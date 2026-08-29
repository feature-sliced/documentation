# Migration từ custom architecture

Hướng dẫn này mô tả cách tiếp cận có thể hữu ích khi migration từ custom self-made architecture sang Feature-Sliced Design.

Đây là cấu trúc folder của một custom architecture điển hình. Chúng tôi sẽ sử dụng nó làm ví dụ trong hướng dẫn này.  
Nhấp vào mũi tên xanh để mở folder.

- src/
  - actions/
    - product/
    - order/
  - api/
  - components/
  - containers/
  - constants/
  - i18n/
  - modules/
  - helpers/
  - routes/
    - products.jsx
    - products.[id].jsx
  - utils/
  - reducers/
  - selectors/
  - styles/
  - App.jsx
  - index.jsx
## Trước khi bạn bắt đầu \{#before-you-start}

Câu hỏi quan trọng nhất để hỏi team của bạn khi cân nhắc chuyển sang Feature-Sliced Design là — _bạn có thực sự cần nó không?_ Chúng tôi yêu Feature-Sliced Design, nhưng thậm chí chúng tôi cũng nhận ra rằng một số dự án hoàn toàn ổn mà không cần nó.

Đây là một số lý do để cân nhắc thực hiện sự chuyển đổi:

1. Thành viên mới trong team phàn nàn rằng khó đạt đến mức độ hiệu quả
2. Thực hiện modifications ở một phần của code **thường** gây ra phần khác không liên quan bị hỏng
3. Thêm functionality mới khó khăn do số lượng lớn các thứ bạn cần suy nghĩ

**Tránh chuyển sang FSD trái với ý muốn của các đồng đội**, ngay cả khi bạn là lead.  
Trước tiên, hãy thuyết phục các đồng đội rằng lợi ích vượt trội so với chi phí migration và chi phí học một architecture mới thay vì architecture đã được thiết lập.

Cũng cần nhớ rằng bất kỳ loại thay đổi kiến trúc nào cũng không ngay lập tức có thể quan sát được đối với quản lý. Hãy đảm bảo họ đồng ý với việc chuyển đổi trước khi bắt đầu và giải thích cho họ tại sao điều này có thể có lợi cho dự án.

**Tip:** Nếu bạn cần giúp để thuyết phục project manager rằng FSD có lợi, hãy cân nhắc một số điểm này:
1. Migration sang FSD có thể diễn ra dần dần, vì vậy nó sẽ không dừng việc phát triển các tính năng mới
2. Một architecture tốt có thể giảm đáng kể thời gian mà một developer mới cần để trở nên hiệu quả
3. FSD là một architecture được tài liệu hóa, vì vậy team không phải liên tục dành thời gian để duy trì documentation riêng của họ

---

Nếu bạn đã quyết định bắt đầu migration, thì điều đầu tiên bạn muốn làm là thiết lập một alias cho `📁 src`. Điều này sẽ hữu ích sau này khi tham chiếu đến các folder tầng cao. Chúng tôi sẽ coi `@` là alias cho `./src` trong phần còn lại của hướng dẫn này.

## Bước 1. Chia code theo pages \{#divide-code-by-pages}

Hầu hết custom architectures đã có sự phân chia theo pages, dù logic nhỏ hay lớn. Nếu bạn đã có `📁 pages`, bạn có thể bỏ qua bước này.

Nếu bạn chỉ có `📁 routes`, hãy tạo `📁 pages` và cố gắng di chuyển càng nhiều component code từ `📁 routes` càng tốt. Lý tưởng là bạn sẽ có một route nhỏ và một page lớn hơn. Khi đang di chuyển code, hãy tạo một folder cho mỗi page và thêm một index file:

**Note:** Hiện tại, không sao nếu các page của bạn tham chiếu lẫn nhau. Bạn có thể giải quyết điều đó sau, nhưng hiện tại, hãy tập trung vào việc thiết lập một sự phân chia rõ ràng theo pages.

Route file:

```js title="src/routes/products.[id].js"
export { ProductPage as default } from "@/pages/product"
```

Page index file:

```js title="src/pages/product/index.js"
export { ProductPage } from "./ProductPage.jsx"
```

Page component file:

```jsx title="src/pages/product/ProductPage.jsx"
export function ProductPage(props) {
  return <div />;
}
```

## Bước 2. Tách mọi thứ khác ra khỏi pages \{#separate-everything-else-from-pages}

Tầo folder `📁 src/shared` và di chuyển mọi thứ không import từ `📁 pages` hoặc `📁 routes` vào đó. Tạo folder `📁 src/app` và di chuyển mọi thứ có import pages hoặc routes vào đó, bao gồm cả chính các routes.

Hãy nhớ rằng Shared layer không có slices, vì vậy không sao nếu các segment import lẫn nhau.

Cuối cùng bạn sẽ có được cấu trúc tệp như thế này:

- src/
  - app/
    - routes/
      - products.jsx
      - products.[id].jsx
    - App.jsx
    - index.js
  - pages/
    - product/
      - index.js
      - ui/
        - ProductPage.jsx
    - catalog/
  - shared/
    - actions/
    - api/
    - components/
    - containers/
    - constants/
    - i18n/
    - modules/
    - helpers/
    - utils/
    - reducers/
    - selectors/
    - styles/
## Bước 3. Giải quyết cross-imports giữa các pages \{#tackle-cross-imports-between-pages}

Tìm tất cả các trường hợp mà một page đang import từ page khác và làm một trong hai điều sau:

1. Copy-paste code được import vào page phụ thuộc để loại bỏ dependency
2. Di chuyển code vào một segment thích hợp trong Shared: 
      - nếu nó là một phần của UI kit, di chuyển vào `📁 shared/ui`; 
      - nếu nó là một configuration constant, di chuyển vào `📁 shared/config`; 
      - nếu nó là một backend interaction, di chuyển vào `📁 shared/api`.

**Note:** **Copy-pasting không sai về mặt kiến trúc**, thực tế, đôi khi duplicate có thể chính xác hơn là abstract thành một reusable module mới. Lý do là đôi khi các phần shared của pages bắt đầu tách rời, và bạn không muốn các dependency cản trở bạn trong những trường hợp này.

Tuy nhiên, vẫn còn ý nghĩa trong nguyên tắc DRY ("don't repeat yourself"), vì vậy hãy đảm bảo bạn không copy-paste business logic. Nếu không bạn sẽ cần phải nhớ sửa bug ở nhiều nơi cùng lúc.

## Bước 4. Giải nén Shared layer \{#unpack-shared-layer}

Bạn có thể có rất nhiều thứ trong Shared layer ở bước này, và nói chung bạn muốn tránh điều đó. Lý do là Shared layer có thể là dependency cho bất kỳ layer nào khác trong codebase của bạn, vì vậy việc thay đổi code đó tự động dễ gây ra các hậu quả ngoài ý muốn hơn.

Tìm tất cả các object chỉ được sử dụng trên một page và di chuyển nó vào slice của page đó. Và đúng rồi, _điều đó cũng áp dụng cho actions, reducers, và selectors_. Không có lợi ích gì khi nhóm tất cả actions lại với nhau, nhưng có lợi ích khi đặt các relevant actions gần với nơi sử dụng chúng.

Cuối cùng bạn sẽ có được cấu trúc tệp như thế này:

- src/
  - app/
    - ...
  - pages/
    - product/
      - actions/
      - reducers/
      - selectors/
      - ui/
        - Component.jsx
        - Container.jsx
        - ProductPage.jsx
      - index.js
    - catalog/
  - shared/ only objects that are reused
    - actions/
    - api/
    - components/
    - containers/
    - constants/
    - i18n/
    - modules/
    - helpers/
    - utils/
    - reducers/
    - selectors/
    - styles/
## Bước 5. Tổ chức code theo mục đích kỹ thuật \{#organize-by-technical-purpose}

Trong FSD, việc phân chia theo mục đích kỹ thuật được thực hiện với _segments_. Có một số loại phổ biến:

- `ui` — mọi thứ liên quan đến hiển thị UI: UI components, date formatters, styles, v.v.
- `api` — các tương tác backend: request functions, data types, mappers, v.v.
- `model` — data model: schemas, interfaces, stores, và business logic.
- `lib` — library code mà các module khác trên slice này cần.
- `config` — các file cấu hình và feature flags.

Bạn cũng có thể tạo các segment riêng của mình nếu cần. Hãy đảm bảo không tạo các segment nhóm code theo những gì nó là, như `components`, `actions`, `types`, `utils`. Thay vào đó, hãy nhóm code theo những gì nó dành cho.

Tổ chức lại các pages của bạn để tách biệt code theo segments. Bạn nên đã có một `ui` segment, bây giờ là lúc tạo các segment khác, như `model` cho actions, reducers, và selectors của bạn, hoặc `api` cho thunks và mutations của bạn.

Cũng tổ chức lại Shared layer để loại bỏ các folder này:
- `📁 components`, `📁 containers` — phần lớn nó nên trở thành `📁 shared/ui`;
- `📁 helpers`, `📁 utils` — nếu còn một số helpers được tái sử dụng, hãy nhóm chúng lại theo function, như dates hoặc type conversions, và di chuyển các nhóm này vào `📁 shared/lib`;
- `📁 constants` — lại, nhóm theo function và di chuyển vào `📁 shared/config`.

## Các bước tùy chọn \{#optional-steps}

### Bước 6. Tạo entities/features từ các Redux slice được sử dụng trên nhiều pages \{#form-entities-features-from-redux}

Thường thì các Redux slice được tái sử dụng này sẽ mô tả điều gì đó liên quan đến nghiệp vụ, ví dụ như products hoặc users, vì vậy chúng có thể được di chuyển vào Entities layer, một entity một folder. Nếu Redux slice liên quan đến một action mà người dùng của bạn muốn thực hiện trong app, như comments, thì bạn có thể di chuyển nó vào Features layer.

Entities và features có ý định độc lập với nhau. Nếu business domain của bạn chứa các kết nối bẩm sinh giữa các entity, hãy tham khảo [hướng dẫn về business entities][business-entities-cross-relations] để có lời khuyên về cách tổ chức các kết nối này.

Các API functions liên quan đến các slice này có thể giữ lại trong `📁 shared/api`.

### Bước 7. Refactor các modules của bạn \{#refactor-your-modules}

Folder `📁 modules` thường được sử dụng cho business logic, vì vậy nó đã khá tương tự về bản chất với Features layer từ FSD. Một số module cũng có thể mô tả những khối lớn của UI, như app header. Trong trường hợp đó, bạn nên migration chúng vào Widgets layer.

### Bước 8. Tạo một UI foundation sạch trong `shared/ui` \{#form-clean-ui-foundation}

`📁 shared/ui` lý tưởng nên chứa một tập hợp các UI elements không có business logic nào được encode trong chúng. Chúng cũng nên có tính tái sử dụng cao.

Refactor các UI components đã từng nằm trong `📁 components` và `📁 containers` để tách riêng business logic. Di chuyển business logic đó lên các layer cao hơn. Nếu nó không được sử dụng ở quá nhiều nơi, bạn thậm chí có thể cân nhắc copy-paste.

## Xem thêm \{#see-also}

- [(Bài nói tiếng Nga) Ilya Klimov — Крысиные бега бесконечного рефакторинга: как не дать техническому долгу убить мотивацию и продукт](https://youtu.be/aOiJ3k2UvO4)

[ext-steiger]: https://github.com/feature-sliced/steiger
[business-entities-cross-relations]: /vi/docs/guides/examples/types#business-entities-and-their-cross-references
