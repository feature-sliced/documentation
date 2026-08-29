# Tutorial

## Phần 1. Trên giấy

Tutorial này sẽ xem xét một app thực tế, còn được biết đến với tên Conduit. Conduit là một bản clone cơ bản của [Medium](https://medium.com/) — nó cho phép bạn đọc và viết bài, cũng như bình luận trên các bài viết của người khác.

![Conduit home page](../../../../../../static/img/tutorial/realworld-feed-anonymous.jpg)

Đây là một ứng dụng khá nhỏ, vì vậy chúng ta sẽ giữ nó đơn giản và tránh phân tách quá mức. Rất có thể toàn bộ ứng dụng sẽ chỉ cần ba layer: **App**, **Pages**, và **Shared**. Nếu không, chúng ta sẽ giới thiệu thêm các layer khi cần. Sẵn sàng chưa?

### Bắt đầu bằng việc liệt kê các trang

Nếu nhìn vào ảnh chụp màn hình ở trên, chúng ta có thể giả định ít nhất những trang sau:

- Trang chủ (article feed)
- Đăng nhập và đăng ký
- Đọc article
- Chỉnh sửa article
- Xem profile người dùng
- Chỉnh sửa profile người dùng (user settings)

Mỗi trang này sẽ trở thành một *slice* riêng trên *layer* Pages. Hãy nhớ lại từ phần tổng quan rằng slice chỉ đơn giản là các folder bên trong layer, và layer chỉ đơn giản là các folder có tên định sẵn như `pages`.

Như vậy, folder Pages của chúng ta sẽ trông như thế này:

- pages/
  - feed/
  - sign-in/
  - article-read/
  - article-edit/
  - profile/
  - settings/
Sự khác biệt chính của Feature-Sliced Design so với cấu trúc code không được quy định là các pages không thể tham chiếu lẫn nhau. Nghĩa là, một page không thể import code từ trang khác. Điều này là do **quy tắc import trên các layer**:

*Một module (file) trong một slice chỉ có thể import các slice khác khi chúng nằm trên các layer ở bên dưới.*

Trong trường hợp này, một trang là một slice, vì vậy các module (file) bên trong trang này chỉ có thể tham chiếu code từ các layer bên dưới, không phải từ cùng layer Pages.

### Nhìn kỹ hơn vào feed

<figure>
  ![Anonymous user's perspective](../../../../../../static/img/tutorial/realworld-feed-anonymous.jpg)
  <figcaption>
    _Từ góc nhìn của người dùng ẩn danh_
  </figcaption>
</figure>

<figure>
  ![Authenticated user's perspective](../../../../../../static/img/tutorial/realworld-feed-authenticated.jpg)
  <figcaption>
    _Từ góc nhìn của người dùng đã xác thực_
  </figcaption>
</figure>

Có ba khu vực động trên trang feed:

1. Các link đăng nhập với thông báo nếu bạn đã đăng nhập
2. Danh sách các tag kích hoạt việc lọc trong feed
3. Một/hai feed của các article, mỗi article có nút like

Các link đăng nhập là một phần của header chung cho tất cả các trang, chúng ta sẽ xem xét nó riêng.

#### Danh sách các tag

Để xây dựng danh sách các tag, chúng ta cần lấy các tag có sẵn, render mỗi tag dưới dạng chip, và lưu trữ các tag đã chọn trong client-side storage. Những thao tác này thuộc các danh mục "tương tác API", "giao diện người dùng", và "lưu trữ". Trong Feature-Sliced Design, code được phân tách theo mục đích sử dụng *segment*. Segment là các folder trong slice, và chúng có thể có tên tùy ý để mô tả mục đích, nhưng một số mục đích rất phổ biến nên có quy ước cho một số tên segment nhất định:

- 📂 `api/` cho các tương tác backend
- 📂 `ui/` cho code xử lý rendering và giao diện
- 📂 `model/` cho storage và business logic
- 📂 `config/` cho feature flag, biến môi trường và các hình thức cấu hình khác

Chúng ta sẽ đặt code lấy tag vào `api`, component tag vào `ui`, và tương tác storage vào `model`.

#### Các article

Sử dụng cùng nguyên tắc nhóm, chúng ta có thể phân tách feed của các article thành ba segment tương tự:

- 📂 `api/`: lấy các article được phân trang với số lượng like; thích một article
- 📂 `ui/`:
    - danh sách tab có thể render thêm tab nếu có tag được chọn
    - article riêng lẻ
    - phân trang chức năng
- 📂 `model/`: client-side storage của các article hiện tại được tải và trang hiện tại (nếu cần)

### Tái sử dụng code chung

Hầu hết các trang có ý định rất khác nhau, nhưng một số thứ nhất định vẫn giữ nguyên trong toàn bộ app — ví dụ, UI kit tuân thủ design language, hoặc quy ước trên backend rằng mọi thứ được thực hiện bằng REST API với cùng phương thức xác thực. Vì các slice được thiết kế để tách biệt, việc tái sử dụng code được hỗ trợ bởi một layer thấp hơn, **Shared**.

Shared khác với các layer khác ở chỗ nó chứa các segment, không phải slice. Theo cách này, layer Shared có thể được coi là sự kết hợp giữa một layer và một slice.

Thông thường, code trong Shared không được lên kế hoạch trước, mà được trích xuất trong quá trình phát triển, vì chỉ trong quá trình phát triển mới rõ phần nào của code thực sự được chia sẻ. Tuy nhiên, vẫn hữu ích khi ghi nhớ loại code nào thuộc về Shared:

- 📂 `ui/` — UI kit, giao diện thuần túy, không có business logic. Ví dụ, button, modal dialog, form input.
- 📂 `api/` — wrapper tiện lợi xung quanh các primitive tạo request (như `fetch()` trên Web) và, tùy chọn, các function để kích hoạt request cụ thể theo đặc tả backend.
- 📂 `config/` — phân tích biến môi trường
- 📂 `i18n/` — cấu hình hỗ trợ ngôn ngữ
- 📂 `router/` — routing primitive và route constant

Đó chỉ là một vài ví dụ về tên segment trong Shared, nhưng bạn có thể bỏ qua bất kỳ segment nào hoặc tạo segment của riêng bạn. Điều quan trọng duy nhất cần nhớ khi tạo segment mới là tên segment nên mô tả **mục đích (tại sao), không phải bản chất (cái gì)**. Các tên như "components", "hooks", "modals" *không nên* được sử dụng vì chúng mô tả những file này là gì, nhưng không giúp điều hướng code bên trong. Điều này yêu cầu mọi người trong team phải đào sâu vào từng file trong những folder như vậy và cũng giữ code không liên quan gần nhau, dẫn đến việc refactoring ảnh hưởng đến các khu vực rộng lớn của code và do đó làm cho việc review code và testing khó khăn hơn.

### Định nghĩa public API nghiêm ngặt

Trong ngữ cảnh của Feature-Sliced Design, thuật ngữ *public API* đề cập đến một slice hoặc segment khai báo những gì có thể được import từ nó bởi các module khác trong dự án. Ví dụ, trong JavaScript đó có thể là file `index.js` re-export các object từ các file khác trong slice. Điều này cho phép tự do refactoring code bên trong slice miễn là hợp đồng với thế giới bên ngoài (tức là public API) vẫn giữ nguyên.

Đối với layer Shared không có slice, thường thuận tiện hơn khi định nghĩa public API riêng cho mỗi segment thay vì định nghĩa một index duy nhất cho mọi thứ trong Shared. Điều này giữ các import từ Shared được tổ chức tự nhiên theo ý định. Đối với các layer khác có slice, ngược lại — thường thực tế hơn khi định nghĩa một index cho mỗi slice và để slice quyết định tập hợp segment riêng của nó mà thế giới bên ngoài không biết vì các layer khác thường có ít export hơn nhiều.

Các slice/segment của chúng ta sẽ xuất hiện với nhau như sau:

- pages/
  - feed/
    - index
  - sign-in/
    - index
  - article-read/
    - index
  - ...
- shared/
  - ui/
    - index
  - api/
    - index
  - ...
Bất cứ thứ gì bên trong các folder như `pages/feed` hoặc `shared/ui` chỉ được biết đến bởi những folder đó, và các file khác không nên dựa vào cấu trúc nội bộ của những folder này.

### Khối UI lớn được tái sử dụng

Trước đó chúng ta đã ghi chú để xem lại header xuất hiện trên mỗi trang. Xây dựng lại từ đầu trên mỗi trang sẽ không thực tế, vì vậy việc muốn tái sử dụng nó là điều tự nhiên. Chúng ta đã có Shared để hỗ trợ tái sử dụng code, tuy nhiên, có một lưu ý khi đặt các khối UI lớn trong Shared — layer Shared không được biết về bất kỳ layer nào ở trên.

Giữa Shared và Pages có ba layer khác: Entities, Features, và Widgets. Một số dự án có thể có thứ gì đó trong những layer đó mà họ cần trong một khối có thể tái sử dụng lớn, và điều đó có nghĩa là chúng ta không thể đặt khối có thể tái sử dụng đó trong Shared, nếu không nó sẽ import từ các layer trên, điều này bị cấm. Đó là lúc layer Widgets xuất hiện. Nó được đặt phía trên Shared, Entities, và Features, vì vậy nó có thể sử dụng tất cả chúng.

Trong trường hợp của chúng ta, header rất đơn giản — đó là logo tĩnh và điều hướng cấp cao nhất. Điều hướng cần thực hiện request đến API để xác định người dùng hiện tại có đăng nhập hay không, nhưng điều đó có thể được xử lý bằng một import đơn giản từ segment `api`. Do đó, chúng ta sẽ giữ header của mình trong Shared.

### Nhìn kỹ vào trang có form

Hãy cũng kiểm tra một trang được thiết kế để chỉnh sửa, không phải đọc. Ví dụ, trình soạn thảo article:

![Conduit post editor](../../../../../../static/img/tutorial/realworld-editor-authenticated.jpg)

Nó trông đơn giản, nhưng chứa một số khía cạnh của phát triển ứng dụng mà chúng ta chưa khám phá — validation form, trạng thái lỗi, và data persistence.

Nếu chúng ta xây dựng trang này, chúng ta sẽ lấy một số input và button từ Shared và ghép thành một form trong segment `ui` của trang này. Sau đó, trong segment `api`, chúng ta sẽ định nghĩa một mutation request để tạo article trên backend.

Để validate request trước khi gửi, chúng ta cần một validation schema, và vị trí tốt cho nó là segment `model`, vì nó là data model. Ở đó chúng ta sẽ tạo ra các thông báo lỗi và hiển thị chúng bằng một component khác trong segment `ui`.

Để cải thiện trải nghiệm người dùng, chúng ta cũng có thể persist các input để ngăn mất dữ liệu vô tình. Đây cũng là công việc của segment `model`.

### Tóm tắt

Chúng ta đã kiểm tra một số trang và phác thảo cấu trúc sơ bộ cho ứng dụng của mình:

1. Layer Shared
   1. `ui` sẽ chứa UI kit có thể tái sử dụng của chúng ta
   2. `api` sẽ chứa các tương tác primitive với backend
   3. Phần còn lại sẽ được sắp xếp theo yêu cầu
2. Layer Pages — mỗi trang là một slice riêng biệt
   1. `ui` sẽ chứa chính trang đó và tất cả các phần của nó
   2. `api` sẽ chứa data fetching chuyên biệt hơn, sử dụng `shared/api`
   3. `model` có thể chứa client-side storage của dữ liệu mà chúng ta sẽ hiển thị

Hãy bắt đầu xây dựng!

## Phần 2. Trong code

Bây giờ chúng ta đã có kế hoạch, hãy đưa nó vào thực hành. Chúng ta sẽ sử dụng React và [Remix](https://remix.run).

Có một template sẵn sàng cho dự án này, clone nó từ GitHub để có được khởi đầu: [https://github.com/feature-sliced/tutorial-conduit/tree/clean](https://github.com/feature-sliced/tutorial-conduit/tree/clean).

Cài đặt dependencies với `npm install` và khởi động development server với `npm run dev`. Mở `http://localhost:3000` và bạn sẽ thấy một app trống.

### Bố trí các trang

Hãy bắt đầu bằng việc tạo các component trống cho tất cả các trang của chúng ta. Chạy lệnh sau trong dự án của bạn:

```bash
npx fsd pages feed sign-in article-read article-edit profile settings --segments ui
```

Điều này sẽ tạo các folder như `pages/feed/ui/` và một file index, `pages/feed/index.ts`, cho mỗi trang.

### Kết nối trang feed

Hãy kết nối route gốc của ứng dụng với trang feed. Tạo một component, `FeedPage.tsx` trong `pages/feed/ui` và đặt nội dung sau vào đó:

```tsx title="pages/feed/ui/FeedPage.tsx"
export function FeedPage() {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    </div>
  );
}
```

Sau đó re-export component này trong public API của trang feed, file `pages/feed/index.ts`:

```ts title="pages/feed/index.ts"
export { FeedPage } from "./ui/FeedPage";
```

Bây giờ kết nối nó với root route. Trong Remix, routing dựa trên file, và các file route được đặt trong folder `app/routes`, điều này phù hợp với Feature-Sliced Design.

Sử dụng component `FeedPage` trong `app/routes/_index.tsx`:

```tsx title="app/routes/_index.tsx"
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

Sau đó, nếu bạn chạy dev server và mở ứng dụng, bạn sẽ thấy banner của Conduit!

![The banner of Conduit](../../../../../../static/img/tutorial/conduit-banner.jpg)

### API client

Để giao tiếp với RealWorld backend, hãy tạo một API client tiện lợi trong Shared. Tạo hai segment, `api` cho client và `config` cho các biến như backend base URL:

```bash
npx fsd shared --segments api config
```

Sau đó tạo `shared/config/backend.ts`:

```tsx title="shared/config/backend.ts"
export { mockBackendUrl as backendBaseUrl } from "mocks/handlers";
```

```tsx title="shared/config/index.ts"
export { backendBaseUrl } from "./backend";
```

Vì dự án RealWorld tiện lợi cung cấp [đặc tả OpenAPI](https://github.com/gothinkster/realworld/blob/main/api/openapi.yml), chúng ta có thể tận dụng các type được tự động tạo cho client của mình. Chúng ta sẽ sử dụng [package `openapi-fetch`](https://openapi-ts.pages.dev/openapi-fetch/) đi kèm với type generator bổ sung.

Chạy lệnh sau để tạo API typing cập nhật:

```bash
npm run generate-api-types
```

Điều này sẽ tạo file `shared/api/v1.d.ts`. Chúng ta sẽ sử dụng file này để tạo typed API client trong `shared/api/client.ts`:

```tsx title="shared/api/client.ts"
import createClient from "openapi-fetch";

import { backendBaseUrl } from "shared/config";
import type { paths } from "./v1";

export const { GET, POST, PUT, DELETE } = createClient<paths>({ baseUrl: backendBaseUrl });
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";
```

### Dữ liệu thực trong feed

Bây giờ chúng ta có thể tiến hành thêm các article vào feed, được lấy từ backend. Hãy bắt đầu bằng cách triển khai component preview article.

Tạo `pages/feed/ui/ArticlePreview.tsx` với nội dung sau:

```tsx title="pages/feed/ui/ArticlePreview.tsx"
export function ArticlePreview({ article }) { /* TODO */ }
```

Vì chúng ta viết bằng TypeScript, sẽ tốt nếu có một article object được type. Nếu chúng ta khám phá `v1.d.ts` được tạo, chúng ta có thể thấy rằng article object có sẵn thông qua `components["schemas"]["Article"]`. Vì vậy hãy tạo file với các data model của chúng ta trong Shared và export các model:

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";
```

Bây giờ chúng ta có thể quay lại component preview article và điền markup với dữ liệu. Cập nhật component với nội dung sau:

```tsx title="pages/feed/ui/ArticlePreview.tsx"
import { Link } from "@remix-run/react";
import type { Article } from "shared/api";

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`} prefetch="intent">
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <Link
            to={`/profile/${article.author.username}`}
            className="author"
            prefetch="intent"
          >
            {article.author.username}
          </Link>
          <span className="date" suppressHydrationWarning>
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link
        to={`/article/${article.slug}`}
        className="preview-link"
        prefetch="intent"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
```

Button like hiện tại chưa làm gì cả, chúng ta sẽ sửa điều đó khi đến trang đọc article và triển khai tính năng thích.

Bây giờ chúng ta có thể lấy các article và render ra một loạt các card này. Lấy dữ liệu trong Remix được thực hiện bằng *loader* — các function phía server lấy chính xác những gì trang cần. Loader tương tác với API thay mặt cho trang, vì vậy chúng ta sẽ đặt chúng trong segment `api` của trang:

```tsx title="pages/feed/api/loader.ts"
import { json } from "@remix-run/node";

import { GET } from "shared/api";

export const loader = async () => {
  const { data: articles, error, response } = await GET("/articles");

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return json({ articles });
};
```

Để kết nối nó với trang, chúng ta cần export nó với tên `loader` từ route file:

```tsx title="pages/feed/index.ts"
export { FeedPage } from "./ui/FeedPage";
export { loader } from "./api/loader";
```

```tsx title="app/routes/_index.tsx"
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export { loader } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

Và bước cuối cùng là render các card này trong feed. Cập nhật `FeedPage` của bạn với code sau:

```tsx title="pages/feed/ui/FeedPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Lọc theo tag

Về các tag, công việc của chúng ta là lấy chúng từ backend và lưu trữ tag hiện tại được chọn. Chúng ta đã biết cách lấy — đó là một request khác từ loader. Chúng ta sẽ sử dụng function tiện lợi `promiseHash` từ package `remix-utils`, đã được cài đặt.

Cập nhật file loader, `pages/feed/api/loader.ts`, với code sau:

```tsx title="pages/feed/api/loader.ts"
import { json } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async () => {
  return json(
    await promiseHash({
      articles: throwAnyErrors(GET("/articles")),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

Bạn có thể nhận thấy rằng chúng ta đã trích xuất xử lý lỗi thành function generic `throwAnyErrors`. Nó trông khá hữu ích, vì vậy chúng ta có thể muốn tái sử dụng nó sau, nhưng hiện tại hãy chỉ để mắt đến nó.

Bây giờ, đến danh sách các tag. Nó cần phải tương tác — nhấp vào tag sẽ làm cho tag đó được chọn. Theo quy ước Remix, chúng ta sẽ sử dụng URL search parameter làm storage cho tag đã chọn. Để trình duyệt lo về storage trong khi chúng ta tập trung vào những thứ quan trọng hơn.

Cập nhật `pages/feed/ui/FeedPage.tsx` với code sau:

```tsx title="pages/feed/ui/FeedPage.tsx"
import { Form, useLoaderData } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const { articles, tags } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Form>
                <ExistingSearchParams exclude={["tag"]} />
                <div className="tag-list">
                  {tags.tags.map((tag) => (
                    <button
                      key={tag}
                      name="tag"
                      value={tag}
                      className="tag-pill tag-default"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
```

Sau đó chúng ta cần sử dụng search parameter `tag` trong loader của chúng ta. Thay đổi function `loader` trong `pages/feed/api/loader.ts` thành như sau:

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", { params: { query: { tag: selectedTag } } }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

Thế là xong, không cần segment `model`. Remix khá gọn gàng.

### Phân trang

Tương tự như vậy, chúng ta có thể triển khai phân trang. Hãy thoải mái thử tự làm hoặc chỉ copy code bên dưới. Dù sao cũng không ai phán xét bạn.

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

/** Amount of articles on one page. */
export const LIMIT = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "", 10);

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", {
          params: {
            query: {
              tag: selectedTag,
              limit: LIMIT,
              offset: !Number.isNaN(page) ? page * LIMIT : undefined,
            },
          },
        }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

```tsx title="pages/feed/ui/FeedPage.tsx"
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import { LIMIT, type loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const [searchParams] = useSearchParams();
  const { articles, tags } = useLoaderData<typeof loader>();
  const pageAmount = Math.ceil(articles.articlesCount / LIMIT);
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}

            <Form>
              <ExistingSearchParams exclude={["page"]} />
              <ul className="pagination">
                {Array(pageAmount)
                  .fill(null)
                  .map((_, index) =>
                    index + 1 === currentPage ? (
                      <li key={index} className="page-item active">
                        <span className="page-link">{index + 1}</span>
                      </li>
                    ) : (
                      <li key={index} className="page-item">
                        <button
                          className="page-link"
                          name="page"
                          value={index + 1}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ),
                  )}
              </ul>
            </Form>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Form>
                <ExistingSearchParams exclude={["tag", "page"]} />
                <div className="tag-list">
                  {tags.tags.map((tag) => (
                    <button
                      key={tag}
                      name="tag"
                      value={tag}
                      className="tag-pill tag-default"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Vậy là cũng xong rồi. Còn có danh sách tab có thể được triển khai tương tự, nhưng hãy đợi cho đến khi chúng ta triển khai authentication. Nói về điều đó!

### Authentication

Authentication liên quan đến hai trang — một để đăng nhập và một để đăng ký. Chúng hầu như giống nhau, vì vậy hợp lý khi giữ chúng trong cùng một slice, `sign-in`, để chúng có thể tái sử dụng code nếu cần.

Tạo `RegisterPage.tsx` trong segment `ui` của `pages/sign-in` với nội dung sau:

```tsx title="pages/sign-in/ui/RegisterPage.tsx"
import { Form, Link, useActionData } from "@remix-run/react";

import type { register } from "../api/register";

export function RegisterPage() {
  const registerData = useActionData<typeof register>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            {registerData?.error && (
              <ul className="error-messages">
                {registerData.error.errors.body.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Chúng ta có một import bị lỗi cần sửa bây giờ. Nó liên quan đến một segment mới, vì vậy hãy tạo nó:

```bash
npx fsd pages sign-in -s api
```

Tuy nhiên, trước khi chúng ta có thể triển khai phần backend của đăng ký, chúng ta cần một số code infrastructure để Remix xử lý session. Điều đó thuộc về Shared, phòng khi trang nào khác cần nó.

Đặt code sau vào `shared/api/auth.server.ts`. Đây là code rất cụ thể cho Remix, vì vậy đừng lo lắng quá nhiều về nó, chỉ cần copy-paste:

```tsx title="shared/api/auth.server.ts"
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { User } from "./models";

invariant(
  process.env.SESSION_SECRET,
  "SESSION_SECRET must be set for authentication to work",
);

const sessionStorage = createCookieSessionStorage<{
  user: User;
}>({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createUserSession({
  request,
  user,
  redirectTo,
}: {
  request: Request;
  user: User;
  redirectTo: string;
}) {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  session.set("user", user);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }),
    },
  });
}

export async function getUserFromSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  return session.get("user") ?? null;
}

export async function requireUser(request: Request) {
  const user = await getUserFromSession(request);

  if (user === null) {
    throw redirect("/login");
  }

  return user;
}
```

Và cũng export model `User` từ file `models.ts` ngay cạnh nó:

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
export type User = components["schemas"]["User"];
```

Trước khi code này có thể hoạt động, biến môi trường `SESSION_SECRET` cần được đặt. Tạo file tên `.env` trong thư mục gốc của dự án, viết `SESSION_SECRET=` và sau đó bấm một số phím trên bàn phím để tạo chuỗi ngẫu nhiên dài. Bạn sẽ có thứ gì đó như thế này:

```bash title=".env"
SESSION_SECRET=dontyoudarecopypastethis
```

Cuối cùng, thêm một số export vào public API để sử dụng code này:

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
```

Bây giờ chúng ta có thể viết code sẽ giao tiếp với RealWorld backend để thực sự thực hiện đăng ký. Chúng ta sẽ giữ điều đó trong `pages/sign-in/api`. Tạo file có tên `register.ts` và đặt code sau vào bên trong:

```tsx title="pages/sign-in/api/register.ts"
import { json, type ActionFunctionArgs } from "@remix-run/node";

import { POST, createUserSession } from "shared/api";

export const register = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const { data, error } = await POST("/users", {
    body: { user: { email, password, username } },
  });

  if (error) {
    return json({ error }, { status: 400 });
  } else {
    return createUserSession({
      request: request,
      user: data.user,
      redirectTo: "/",
    });
  }
};
```

```tsx title="pages/sign-in/index.ts"
export { RegisterPage } from './ui/RegisterPage';
export { register } from './api/register';
```

Gần xong rồi! Chỉ cần kết nối trang và action với route `/register`. Tạo `register.tsx` trong `app/routes`:

```tsx title="app/routes/register.tsx"
import { RegisterPage, register } from "pages/sign-in";

export { register as action };

export default RegisterPage;
```

Bây giờ nếu bạn đi đến `http://localhost:3000/register`, bạn sẽ có thể tạo người dùng! Phần còn lại của ứng dụng sẽ chưa phản ứng với điều này, chúng ta sẽ giải quyết điều đó ngay.

Tương tự như vậy, chúng ta có thể triển khai trang đăng nhập. Hãy thử hoặc chỉ lấy code và tiếp tục:

```tsx title="pages/sign-in/api/sign-in.ts"
import { json, type ActionFunctionArgs } from "@remix-run/node";

import { POST, createUserSession } from "shared/api";

export const signIn = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const { data, error } = await POST("/users/login", {
    body: { user: { email, password } },
  });

  if (error) {
    return json({ error }, { status: 400 });
  } else {
    return createUserSession({
      request: request,
      user: data.user,
      redirectTo: "/",
    });
  }
};
```

```tsx title="pages/sign-in/ui/SignInPage.tsx"
import { Form, Link, useActionData } from "@remix-run/react";

import type { signIn } from "../api/sign-in";

export function SignInPage() {
  const signInData = useActionData<typeof signIn>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            {signInData?.error && (
              <ul className="error-messages">
                {signInData.error.errors.body.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

```tsx title="pages/sign-in/index.ts"
export { RegisterPage } from './ui/RegisterPage';
export { register } from './api/register';
export { SignInPage } from './ui/SignInPage';
export { signIn } from './api/sign-in';
```

```tsx title="app/routes/login.tsx"
import { SignInPage, signIn } from "pages/sign-in";

export { signIn as action };

export default SignInPage;
```

Bây giờ hãy cung cấp cho người dùng cách thực sự đến các trang này.

### Header

Như chúng ta đã thảo luận trong phần 1, header app thường được đặt trong Widgets hoặc trong Shared. Chúng ta sẽ đặt nó trong Shared vì nó rất đơn giản và tất cả business logic có thể được giữ bên ngoài nó. Hãy tạo chỗ cho nó:

```bash
npx fsd shared ui
```

Bây giờ tạo `shared/ui/Header.tsx` với nội dung sau:

```tsx title="shared/ui/Header.tsx"
import { useContext } from "react";
import { Link, useLocation } from "@remix-run/react";

import { CurrentUser } from "../api/currentUser";

export function Header() {
  const currentUser = useContext(CurrentUser);
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/" prefetch="intent">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link
              prefetch="intent"
              className={`nav-link ${pathname == "/" ? "active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>
          {currentUser == null ? (
            <>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/login" ? "active" : ""}`}
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/register" ? "active" : ""}`}
                  to="/register"
                >
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/editor" ? "active" : ""}`}
                  to="/editor"
                >
                  <i className="ion-compose"></i>&nbsp;New Article{" "}
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/settings" ? "active" : ""}`}
                  to="/settings"
                >
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname.includes("/profile") ? "active" : ""}`}
                  to={`/profile/${currentUser.username}`}
                >
                  {currentUser.image && (
                    <img
                      width={25}
                      height={25}
                      src={currentUser.image}
                      className="user-pic"
                      alt=""
                    />
                  )}
                  {currentUser.username}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
```

Export component này từ `shared/ui`:

```tsx title="shared/ui/index.ts"
export { Header } from "./Header";
```

Trong header, chúng ta dựa vào context được giữ trong `shared/api`. Cũng tạo điều đó:

```tsx title="shared/api/currentUser.ts"
import { createContext } from "react";

import type { User } from "./models";

export const CurrentUser = createContext<User | null>(null);
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
export { CurrentUser } from "./currentUser";
```

Bây giờ hãy thêm header vào trang. Chúng ta muốn nó có trên mọi trang, vì vậy hợp lý khi chỉ thêm nó vào root route và wrap outlet (nơi trang sẽ được render) với provider context `CurrentUser`. Theo cách này, toàn bộ app của chúng ta và cả header đều có quyền truy cập vào object người dùng hiện tại. Chúng ta cũng sẽ thêm loader để thực sự lấy object người dùng hiện tại từ cookie. Đặt nội dung sau vào `app/root.tsx`:

```tsx title="app/root.tsx"
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { Header } from "shared/ui";
import { getUserFromSession, CurrentUser } from "shared/api";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = ({ request }: LoaderFunctionArgs) =>
  getUserFromSession(request);

export default function App() {
  const user = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        <style>{`
          button {
            border: 0;
          }
        `}</style>
      </head>
      <body>
        <CurrentUser.Provider value={user}>
          <Header />
          <Outlet />
        </CurrentUser.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

Tại thời điểm này, bạn sẽ có kết quả sau trên trang chủ:

<figure>
  ![The feed page of Conduit, including the header, the feed, and the tags. The tabs are still missing.](../../../../../../static/img/tutorial/realworld-feed-without-tabs.jpg)

  <figcaption>Trang feed của Conduit, bao gồm header, feed, và các tag. Các tab vẫn còn thiếu.</figcaption>
</figure>

### Tab

Bây giờ chúng ta có thể phát hiện trạng thái authentication, hãy cũng nhanh chóng triển khai các tab và like bài viết để hoàn thành trang feed. Chúng ta cần một form khác, nhưng file trang này đang trở nên khá lớn, vì vậy hãy chuyển những form này vào các file liền kề. Chúng ta sẽ tạo `Tabs.tsx`, `PopularTags.tsx`, và `Pagination.tsx` với nội dung sau:

```tsx title="pages/feed/ui/Tabs.tsx"
import { useContext } from "react";
import { Form, useSearchParams } from "@remix-run/react";

import { CurrentUser } from "shared/api";

export function Tabs() {
  const [searchParams] = useSearchParams();
  const currentUser = useContext(CurrentUser);

  return (
    <Form>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {currentUser !== null && (
            <li className="nav-item">
              <button
                name="source"
                value="my-feed"
                className={`nav-link ${searchParams.get("source") === "my-feed" ? "active" : ""}`}
              >
                Your Feed
              </button>
            </li>
          )}
          <li className="nav-item">
            <button
              className={`nav-link ${searchParams.has("tag") || searchParams.has("source") ? "" : "active"}`}
            >
              Global Feed
            </button>
          </li>
          {searchParams.has("tag") && (
            <li className="nav-item">
              <span className="nav-link active">
                <i className="ion-pound"></i> {searchParams.get("tag")}
              </span>
            </li>
          )}
        </ul>
      </div>
    </Form>
  );
}
```

```tsx title="pages/feed/ui/PopularTags.tsx"
import { Form, useLoaderData } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import type { loader } from "../api/loader";

export function PopularTags() {
  const { tags } = useLoaderData<typeof loader>();

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <Form>
        <ExistingSearchParams exclude={["tag", "page", "source"]} />
        <div className="tag-list">
          {tags.tags.map((tag) => (
            <button
              key={tag}
              name="tag"
              value={tag}
              className="tag-pill tag-default"
            >
              {tag}
            </button>
          ))}
        </div>
      </Form>
    </div>
  );
}
```

```tsx title="pages/feed/ui/Pagination.tsx"
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import { LIMIT, type loader } from "../api/loader";

export function Pagination() {
  const [searchParams] = useSearchParams();
  const { articles } = useLoaderData<typeof loader>();
  const pageAmount = Math.ceil(articles.articlesCount / LIMIT);
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  return (
    <Form>
      <ExistingSearchParams exclude={["page"]} />
      <ul className="pagination">
        {Array(pageAmount)
          .fill(null)
          .map((_, index) =>
            index + 1 === currentPage ? (
              <li key={index} className="page-item active">
                <span className="page-link">{index + 1}</span>
              </li>
            ) : (
              <li key={index} className="page-item">
                <button className="page-link" name="page" value={index + 1}>
                  {index + 1}
                </button>
              </li>
            ),
          )}
      </ul>
    </Form>
  );
}
```

Và bây giờ chúng ta có thể đơn giản hóa đáng kể chính trang feed:

```tsx title="pages/feed/ui/FeedPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";
import { Tabs } from "./Tabs";
import { PopularTags } from "./PopularTags";
import { Pagination } from "./Pagination";

export function FeedPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Tabs />

            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}

            <Pagination />
          </div>

          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
}
```

Chúng ta cũng cần tính đến tab mới trong function loader:

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, requireUser } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  /* unchanged */
}

/** Amount of articles on one page. */
export const LIMIT = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "", 10);

  if (url.searchParams.get("source") === "my-feed") {
    const userSession = await requireUser(request);

    return json(
      await promiseHash({
        articles: throwAnyErrors(
          GET("/articles/feed", {
            params: {
              query: {
                limit: LIMIT,
                offset: !Number.isNaN(page) ? page * LIMIT : undefined,
              },
            },
            headers: { Authorization: `Token ${userSession.token}` },
          }),
        ),
        tags: throwAnyErrors(GET("/tags")),
      }),
    );
  }

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", {
          params: {
            query: {
              tag: selectedTag,
              limit: LIMIT,
              offset: !Number.isNaN(page) ? page * LIMIT : undefined,
            },
          },
        }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

Trước khi rời trang feed, hãy thêm một số code xử lý like cho bài viết. Thay đổi `ArticlePreview.tsx` của bạn thành như sau:

```tsx title="pages/feed/ui/ArticlePreview.tsx"
import { Form, Link } from "@remix-run/react";
import type { Article } from "shared/api";

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`} prefetch="intent">
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <Link
            to={`/profile/${article.author.username}`}
            className="author"
            prefetch="intent"
          >
            {article.author.username}
          </Link>
          <span className="date" suppressHydrationWarning>
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
        </div>
        <Form
          method="post"
          action={`/article/${article.slug}`}
          preventScrollReset
        >
          <button
            name="_action"
            value={article.favorited ? "unfavorite" : "favorite"}
            className={`btn ${article.favorited ? "btn-primary" : "btn-outline-primary"} btn-sm pull-xs-right`}
          >
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </Form>
      </div>
      <Link
        to={`/article/${article.slug}`}
        className="preview-link"
        prefetch="intent"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
```

Code này sẽ gửi POST request đến `/article/:slug` với `_action=favorite` để đánh dấu article là yêu thích. Nó chưa hoạt động, nhưng khi chúng ta bắt đầu làm việc trên trình đọc article, chúng ta cũng sẽ triển khai điều này.

Và với điều đó, chúng ta đã chính thức hoàn thành feed! Yay!

### Trình đọc article

Trước tiên, chúng ta cần dữ liệu. Hãy tạo một loader:

```bash
npx fsd pages article-read -s api
```

```tsx title="pages/article-read/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, getUserFromSession } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.slug, "Expected a slug parameter");
  const currentUser = await getUserFromSession(request);
  const authorization = currentUser
    ? { Authorization: `Token ${currentUser.token}` }
    : undefined;

  return json(
    await promiseHash({
      article: throwAnyErrors(
        GET("/articles/{slug}", {
          params: {
            path: { slug: params.slug },
          },
          headers: authorization,
        }),
      ),
      comments: throwAnyErrors(
        GET("/articles/{slug}/comments", {
          params: {
            path: { slug: params.slug },
          },
          headers: authorization,
        }),
      ),
    }),
  );
};
```

```tsx title="pages/article-read/index.ts"
export { loader } from "./api/loader";
```

Bây giờ chúng ta có thể kết nối nó với route `/article/:slug` bằng cách tạo file route có tên `article.$slug.tsx`:

```tsx title="app/routes/article.$slug.tsx"
export { loader } from "pages/article-read";
```

Chính trang bao gồm ba khối chính — header article với các action (lặp lại hai lần), nội dung article, và phần comment. Đây là markup cho trang, nó không đặc biệt thú vị:

```tsx title="pages/article-read/ui/ArticleReadPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticleMeta } from "./ArticleMeta";
import { Comments } from "./Comments";

export function ArticleReadPage() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.article.title}</h1>

          <ArticleMeta />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.article.body}</p>
            <ul className="tag-list">
              {article.article.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta />
        </div>

        <div className="row">
          <Comments />
        </div>
      </div>
    </div>
  );
}
```

Điều thú vị hơn là `ArticleMeta` và `Comments`. Chúng chứa các thao tác ghi như thích article, để lại comment, v.v. Để chúng hoạt động, trước tiên chúng ta cần triển khai phần backend. Tạo `action.ts` trong segment `api` của trang:

```tsx title="pages/article-read/api/action.ts"
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { namedAction } from "remix-utils/named-action";
import { redirectBack } from "remix-utils/redirect-back";
import invariant from "tiny-invariant";

import { DELETE, POST, requireUser } from "shared/api";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const currentUser = await requireUser(request);

  const authorization = { Authorization: `Token ${currentUser.token}` };

  const formData = await request.formData();

  return namedAction(formData, {
    async delete() {
      invariant(params.slug, "Expected a slug parameter");
      await DELETE("/articles/{slug}", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirect("/");
    },
    async favorite() {
      invariant(params.slug, "Expected a slug parameter");
      await POST("/articles/{slug}/favorite", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async unfavorite() {
      invariant(params.slug, "Expected a slug parameter");
      await DELETE("/articles/{slug}/favorite", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async createComment() {
      invariant(params.slug, "Expected a slug parameter");
      const comment = formData.get("comment");
      invariant(typeof comment === "string", "Expected a comment parameter");
      await POST("/articles/{slug}/comments", {
        params: { path: { slug: params.slug } },
        headers: { ...authorization, "Content-Type": "application/json" },
        body: { comment: { body: comment } },
      });
      return redirectBack(request, { fallback: "/" });
    },
    async deleteComment() {
      invariant(params.slug, "Expected a slug parameter");
      const commentId = formData.get("id");
      invariant(typeof commentId === "string", "Expected an id parameter");
      const commentIdNumeric = parseInt(commentId, 10);
      invariant(
        !Number.isNaN(commentIdNumeric),
        "Expected a numeric id parameter",
      );
      await DELETE("/articles/{slug}/comments/{id}", {
        params: { path: { slug: params.slug, id: commentIdNumeric } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async followAuthor() {
      const authorUsername = formData.get("username");
      invariant(
        typeof authorUsername === "string",
        "Expected a username parameter",
      );
      await POST("/profiles/{username}/follow", {
        params: { path: { username: authorUsername } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async unfollowAuthor() {
      const authorUsername = formData.get("username");
      invariant(
        typeof authorUsername === "string",
        "Expected a username parameter",
      );
      await DELETE("/profiles/{username}/follow", {
        params: { path: { username: authorUsername } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
  });
};
```

Export điều đó từ slice và sau đó từ route. Trong khi làm điều đó, hãy cũng kết nối chính trang:

```tsx title="pages/article-read/index.ts"
export { ArticleReadPage } from "./ui/ArticleReadPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

```tsx title="app/routes/article.$slug.tsx"
import { ArticleReadPage } from "pages/article-read";

export { loader, action } from "pages/article-read";

export default ArticleReadPage;
```

Bây giờ, mặc dù chúng ta chưa triển khai button like trên trang đọc, button like trong feed sẽ bắt đầu hoạt động! Đó là vì nó đã gửi request "like" đến route này. Hãy thử điều đó.

`ArticleMeta` và `Comments`, một lần nữa, là một loạt form. Chúng ta đã làm điều này trước đây, hãy lấy code của chúng và tiếp tục:

```tsx title="pages/article-read/ui/ArticleMeta.tsx"
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useContext } from "react";

import { CurrentUser } from "shared/api";
import type { loader } from "../api/loader";

export function ArticleMeta() {
  const currentUser = useContext(CurrentUser);
  const { article } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <div className="article-meta">
        <Link
          prefetch="intent"
          to={`/profile/${article.article.author.username}`}
        >
          <img src={article.article.author.image} alt="" />
        </Link>

        <div className="info">
          <Link
            prefetch="intent"
            to={`/profile/${article.article.author.username}`}
            className="author"
          >
            {article.article.author.username}
          </Link>
          <span className="date">{article.article.createdAt}</span>
        </div>

        {article.article.author.username == currentUser?.username ? (
          <>
            <Link
              prefetch="intent"
              to={`/editor/${article.article.slug}`}
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="ion-edit"></i> Edit Article
            </Link>
            &nbsp;&nbsp;
            <button
              name="_action"
              value="delete"
              className="btn btn-sm btn-outline-danger"
            >
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </>
        ) : (
          <>
            <input
              name="username"
              value={article.article.author.username}
              type="hidden"
            />
            <button
              name="_action"
              value={
                article.article.author.following
                  ? "unfollowAuthor"
                  : "followAuthor"
              }
              className={`btn btn-sm ${article.article.author.following ? "btn-secondary" : "btn-outline-secondary"}`}
            >
              <i className="ion-plus-round"></i>
              &nbsp;{" "}
              {article.article.author.following
                ? "Unfollow"
                : "Follow"}{" "}
              {article.article.author.username}
            </button>
            &nbsp;&nbsp;
            <button
              name="_action"
              value={article.article.favorited ? "unfavorite" : "favorite"}
              className={`btn btn-sm ${article.article.favorited ? "btn-primary" : "btn-outline-primary"}`}
            >
              <i className="ion-heart"></i>
              &nbsp; {article.article.favorited
                ? "Unfavorite"
                : "Favorite"}{" "}
              Post{" "}
              <span className="counter">
                ({article.article.favoritesCount})
              </span>
            </button>
          </>
        )}
      </div>
    </Form>
  );
}
```

```tsx title="pages/article-read/ui/Comments.tsx"
import { useContext } from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { CurrentUser } from "shared/api";
import type { loader } from "../api/loader";

export function Comments() {
  const { comments } = useLoaderData<typeof loader>();
  const currentUser = useContext(CurrentUser);

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {currentUser !== null ? (
        <Form
          preventScrollReset={true}
          method="post"
          className="card comment-form"
        >
          <div className="card-block">
            <textarea
              required
              className="form-control"
              name="comment"
              placeholder="Write a comment..."
              rows={3}
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              src={currentUser.image}
              className="comment-author-img"
              alt=""
            />
            <button
              className="btn btn-sm btn-primary"
              name="_action"
              value="createComment"
            >
              Post Comment
            </button>
          </div>
        </Form>
      ) : (
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <p>
              <Link to="/login">Sign in</Link>
              &nbsp; or &nbsp;
              <Link to="/register">Sign up</Link>
              &nbsp; to add comments on this article.
            </p>
          </div>
        </div>
      )}

      {comments.comments.map((comment) => (
        <div className="card" key={comment.id}>
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>

          <div className="card-footer">
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              <img
                src={comment.author.image}
                className="comment-author-img"
                alt=""
              />
            </Link>
            &nbsp;
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              {comment.author.username}
            </Link>
            <span className="date-posted">{comment.createdAt}</span>
            {comment.author.username === currentUser?.username && (
              <span className="mod-options">
                <Form method="post" preventScrollReset={true}>
                  <input type="hidden" name="id" value={comment.id} />
                  <button
                    name="_action"
                    value="deleteComment"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <i className="ion-trash-a"></i>
                  </button>
                </Form>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

Và với điều đó, trình đọc article của chúng ta cũng hoàn thành! Các button theo dõi tác giả, thích bài viết, và để lại comment giờ đây sẽ hoạt động như mong đợi.

<figure>
  ![Article reader with functioning buttons to like and follow](../../../../../../static/img/tutorial/realworld-article-reader.jpg)

  <figcaption>Trình đọc article với các button hoạt động để thích và theo dõi</figcaption>
</figure>

### Trình chỉnh sửa article

Đây là trang cuối cùng mà chúng ta sẽ đề cập trong tutorial này, và phần thú vị nhất ở đây là cách chúng ta sẽ validate dữ liệu form.

Chính trang, `article-edit/ui/ArticleEditPage.tsx`, sẽ khá đơn giản, độ phức tạp bổ sung được cất giấu trong hai component khác:

```tsx title="pages/article-edit/ui/ArticleEditPage.tsx"
import { Form, useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { TagsInput } from "./TagsInput";
import { FormErrors } from "./FormErrors";

export function ArticleEditPage() {
  const article = useLoaderData<typeof loader>();

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormErrors />

            <Form method="post">
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="title"
                    placeholder="Article Title"
                    defaultValue={article.article?.title}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="What's this article about?"
                    defaultValue={article.article?.description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    name="body"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    defaultValue={article.article?.body}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <TagsInput
                    name="tags"
                    defaultValue={article.article?.tagList ?? []}
                  />
                </fieldset>

                <button className="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Trang này lấy article hiện tại (trừ khi chúng ta viết từ đầu) và điền vào các trường form tương ứng. Chúng ta đã thấy điều này trước đây. Phần thú vị là `FormErrors`, vì nó sẽ nhận kết quả validation và hiển thị cho người dùng. Hãy xem:

```tsx title="pages/article-edit/ui/FormErrors.tsx"
import { useActionData } from "@remix-run/react";
import type { action } from "../api/action";

export function FormErrors() {
  const actionData = useActionData<typeof action>();

  return actionData?.errors != null ? (
    <ul className="error-messages">
      {actionData.errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  ) : null;
}
```

Ở đây chúng ta giả định rằng action của chúng ta sẽ trả về trường `errors`, một mảng các thông báo lỗi có thể đọc được. Chúng ta sẽ đến action ngay.

Component khác là input tag. Nó chỉ là trường input đơn giản với preview bổ sung của các tag đã chọn. Không có gì nhiều để xem ở đây:

```tsx title="pages/article-edit/ui/TagsInput.tsx"
import { useEffect, useRef, useState } from "react";

export function TagsInput({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: Array<string>;
}) {
  const [tagListState, setTagListState] = useState(defaultValue ?? []);

  function removeTag(tag: string): void {
    const newTagList = tagListState.filter((t) => t !== tag);
    setTagListState(newTagList);
  }

  const tagsInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    tagsInput.current && (tagsInput.current.value = tagListState.join(","));
  }, [tagListState]);

  return (
    <>
      <input
        type="text"
        className="form-control"
        id="tags"
        name={name}
        placeholder="Enter tags"
        defaultValue={tagListState.join(",")}
        onChange={(e) =>
          setTagListState(e.target.value.split(",").filter(Boolean))
        }
      />
      <div className="tag-list">
        {tagListState.map((tag) => (
          <span className="tag-default tag-pill" key={tag}>
            <i
              className="ion-close-round"
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                [" ", "Enter"].includes(e.key) && removeTag(tag)
              }
              onClick={() => removeTag(tag)}
            ></i>{" "}
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
```

Bây giờ, cho phần API. Loader nên nhìn vào URL, và nếu nó chứa article slug, có nghĩa là chúng ta đang chỉnh sửa article hiện có, và dữ liệu của nó nên được tải. Nếu không, trả về không có gì. Hãy tạo loader đó:

```ts title="pages/article-edit/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";

import { GET, requireUser } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const currentUser = await requireUser(request);

  if (!params.slug) {
    return { article: null };
  }

  return throwAnyErrors(
    GET("/articles/{slug}", {
      params: { path: { slug: params.slug } },
      headers: { Authorization: `Token ${currentUser.token}` },
    }),
  );
};
```

Action sẽ lấy các giá trị trường mới, chạy chúng qua data schema của chúng ta, và nếu mọi thứ đều đúng, commit những thay đổi đó đến backend, hoặc bằng cách cập nhật article hiện có hoặc tạo một article mới:

```tsx title="pages/article-edit/api/action.ts"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";

import { POST, PUT, requireUser } from "shared/api";
import { parseAsArticle } from "../model/parseAsArticle";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const { body, description, title, tags } = parseAsArticle(
      await request.formData(),
    );
    const tagList = tags?.split(",") ?? [];

    const currentUser = await requireUser(request);
    const payload = {
      body: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      headers: { Authorization: `Token ${currentUser.token}` },
    };

    const { data, error } = await (params.slug
      ? PUT("/articles/{slug}", {
          params: { path: { slug: params.slug } },
          ...payload,
        })
      : POST("/articles", payload));

    if (error) {
      return json({ errors: error }, { status: 422 });
    }

    return redirect(`/article/${data.article.slug ?? ""}`);
  } catch (errors) {
    return json({ errors }, { status: 400 });
  }
};
```

Schema có vai trò kép như một function phân tích cho `FormData`, cho phép chúng ta thuận tiện lấy các trường sạch hoặc chỉ throw lỗi để xử lý ở cuối. Đây là cách function phân tích đó có thể trông như thế nào:

```tsx title="pages/article-edit/model/parseAsArticle.ts"
export function parseAsArticle(data: FormData) {
  const errors = [];

  const title = data.get("title");
  if (typeof title !== "string" || title === "") {
    errors.push("Give this article a title");
  }

  const description = data.get("description");
  if (typeof description !== "string" || description === "") {
    errors.push("Describe what this article is about");
  }

  const body = data.get("body");
  if (typeof body !== "string" || body === "") {
    errors.push("Write the article itself");
  }

  const tags = data.get("tags");
  if (typeof tags !== "string") {
    errors.push("The tags must be a string");
  }

  if (errors.length > 0) {
    throw errors;
  }

  return { title, description, body, tags: data.get("tags") ?? "" } as {
    title: string;
    description: string;
    body: string;
    tags: string;
  };
}
```

Có thể nói, nó hơi dài và lặp lại, nhưng đó là cái giá chúng ta phải trả cho các lỗi có thể đọc được. Điều này cũng có thể là Zod schema, ví dụ, nhưng sau đó chúng ta sẽ phải render thông báo lỗi trên frontend, và form này không đáng để phức tạp hóa.

Một bước cuối cùng — kết nối trang, loader, và action với các route. Vì chúng ta hỗ trợ gọn gàng cả tạo và chỉnh sửa, chúng ta có thể export cùng một thứ từ cả `editor._index.tsx` và `editor.$slug.tsx`:

```tsx title="pages/article-edit/index.ts"
export { ArticleEditPage } from "./ui/ArticleEditPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

```tsx title="app/routes/editor._index.tsx, app/routes/editor.$slug.tsx (same content)"
import { ArticleEditPage } from "pages/article-edit";

export { loader, action } from "pages/article-edit";

export default ArticleEditPage;
```

Chúng ta hoàn thành rồi! Đăng nhập và thử tạo article mới. Hoặc "quên" viết article và xem validation hoạt động.

<figure>
  ![The Conduit article editor, with the title field saying "New article" and the rest of the fields empty. Above the form there are two errors: "**Describe what this article is about" and "Write the article itself".**](../../../../../../static/img/tutorial/realworld-article-editor.jpg)

  <figcaption>Trình chỉnh sửa article Conduit, với trường tiêu đề nói "New article" và phần còn lại của các trường trống. Phía trên form có hai lỗi: **"Describe what this article is about"** và **"Write the article itself"**.</figcaption>
</figure>

Các trang profile và settings rất giống với trình đọc và chỉnh sửa article, chúng được để lại như bài tập cho người đọc, đó là bạn :)
