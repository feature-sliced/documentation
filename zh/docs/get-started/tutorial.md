# 教程

## 第一部分。理论上

本教程将检查 Real World App，也称为 Conduit。Conduit 是一个基本的 [Medium](https://medium.com/) 克隆 — 它让您阅读和编写文章，以及对他人的文章进行评论。

![Conduit home page](../../../../../../static/img/tutorial/realworld-feed-anonymous.jpg)

这是一个相当小的应用程序，所以我们将保持简单并避免过度分解。整个应用程序很可能只需要三个 layers：**App**、**Pages** 和 **Shared**。如果不是，我们将在过程中引入额外的 layers。准备好了吗？

### 从列出页面开始

如果我们查看上面的截图，我们可以至少假设以下页面：

- 主页（文章流）
- 登录和注册
- 文章阅读器
- 文章编辑器
- 用户资料查看器
- 用户资料编辑器（用户设置）

这些页面中的每一个都将成为 Pages *layer* 上的自己的 *slice*。回忆一下概览中的内容，slices 简单来说就是 layers 内部的文件夹，而 layers 简单来说就是具有预定义名称的文件夹，如 `pages`。

因此，我们的 Pages 文件夹将如下所示：

- pages/
  - feed/
  - sign-in/
  - article-read/
  - article-edit/
  - profile/
  - settings/
Feature-Sliced Design 与无规则代码结构的关键区别是页面不能相互引用。也就是说，一个页面不能从另一个页面导入代码。这是由于 **layers 上的导入规则**：

*slice 中的模块（文件）只能在其他 slices 位于严格低于当前的 layers 时才能导入它们。*

在这种情况下，页面是一个 slice，所以这个页面内部的模块（文件）只能引用下层 layers 的代码，而不能引用同一 layer Pages 的代码。

### 仔细查看 feed

<figure>
  ![Anonymous user’s perspective](../../../../../../static/img/tutorial/realworld-feed-anonymous.jpg)
  <figcaption>
    _Anonymous user’s perspective_
  </figcaption>
</figure>

<figure>
  ![Authenticated user’s perspective](../../../../../../static/img/tutorial/realworld-feed-authenticated.jpg)
  <figcaption>
    _Authenticated user’s perspective_
  </figcaption>
</figure>

feed 页面上有三个动态区域：

1. 带有登录状态指示的登录链接
2. 触发 feed 中过滤的标签列表
3. 一个/两个文章 feeds，每篇文章都有一个点赞按钮

登录链接是所有页面通用的头部的一部分，我们将单独重新访问它。

#### 标签列表

要构建标签列表，我们需要获取可用的标签，将每个标签渲染为芯片，并将选中的标签存储在客户端存储中。这些操作分别属于“API 交互”、“用户界面”和“存储”类别。在 Feature-Sliced Design 中，代码使用 *segments* 按目的分离。Segments 是 slices 中的文件夹，它们可以有描述目的的任意名称，但某些目的非常常见，以至于某些 segment 名称有约定：

- 📂 `api/` 用于后端交互
- 📂 `ui/` 用于处理渲染和外观的代码
- 📂 `model/` 用于存储和业务逻辑
- 📂 `config/` 用于 feature flags、环境变量和其他形式的配置

我们将获取标签的代码放入 `api`，标签组件放入 `ui`，存储交互放入 `model`。

#### 文章

使用相同的分组原则，我们可以将文章 feed 分解为相同的三个 segments：

- 📂 `api/`: 获取带有点赞数的分页文章；点赞文章
- 📂 `ui/`:
    - 可以在选中标签时渲染额外选项卡的选项卡列表
    - 单个文章
    - 功能分页
- 📂 `model/`: 当前加载的文章和当前页面的客户端存储（如果需要）

### 重用通用代码

大多数页面在意图上非常不同，但某些东西在整个应用程序中保持不变 — 例如，符合设计语言的 UI 套件，或后端上使用相同认证方法的 REST API 来完成所有事情的约定。由于 slices 旨在被隔离，代码重用由更低的 layer **Shared** 促进。

Shared 与其他 layers 不同，它包含 segments 而不是 slices。这样，Shared layer 可以被认为是 layer 和 slice 之间的混合体。

通常，Shared 中的代码不是提前计划的，而是在开发过程中提取的，因为只有在开发过程中才能明确哪些代码部分实际上是共享的。然而，记住哪种代码自然属于 Shared 仍然是有帮助的：

- 📂 `ui/` — the UI kit, pure appearance, no business logic. For example, buttons, modal dialogs, form inputs.
- 📂 `api/` — convenience wrappers around request making primitives (like `fetch()` on the Web) and, optionally, functions for triggering particular requests according to the backend specification.
- 📂 `config/` — parsing environment variables
- 📂 `i18n/` — configuration of language support
- 📂 `router/` — routing primitives and route constants

这些只是 Shared 中 segment 名称的几个示例，但您可以省略其中任何一个或创建自己的。创建新 segments 时要记住的唯一重要事情是，segment 名称应该描述**目的（为什么），而不是本质（是什么）**。像 "components"、"hooks"、"modals" 这样的名称*不应该*使用，因为它们描述了这些文件是什么，但不能帮助在内部导航代码。这要求团队中的人在这样的文件夹中挖掘每个文件，并且也保持不相关的代码接近，这导致了重构影响的代码区域广泛，从而使代码审查和测试更加困难。

### 定义严格的 public API

在 Feature-Sliced Design 的上下文中，术语 *public API* 指的是 slice 或 segment 声明项目中的其他模块可以从它导入什么。例如，在 JavaScript 中，这可以是一个 `index.js` 文件，从 slice 中的其他文件重新导出对象。这使得在 slice 内部重构代码的自由度成为可能，只要与外部世界的契约（即 public API）保持不变。

对于没有 slices 的 Shared layer，通常为每个 segment 定义单独的 public API 比定义 Shared 中所有内容的一个单一索引更方便。这使得从 Shared 的导入按意图自然地组织。对于具有 slices 的其他 layers，情况相反 — 通常每个 slice 定义一个索引并让 slice 决定外部世界未知的自己的 segments 集合更实用，因为其他 layers 通常有更少的导出。

我们的 slices/segments 将以以下方式相互出现：

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
像 `pages/feed` 或 `shared/ui` 这样的文件夹内部的任何内容只有这些文件夹知道，其他文件不应该依赖这些文件夹的内部结构。

### UI 中的大型重用块

早些时候我们记录了要重新访问出现在每个页面上的头部。在每个页面上从头开始重建它是不切实际的，所以想要重用它是很自然的。我们已经有 Shared 来促进代码重用，然而，在 Shared 中放置大型 UI 块有一个警告 — Shared layer 不应该了解上面的任何 layers。

在 Shared 和 Pages 之间有三个其他 layers：Entities、Features 和 Widgets。某些项目可能在这些 layers 中有他们在大型可重用块中需要的东西，这意味着我们不能将该可重用块放在 Shared 中，否则它将从上层 layers 导入，这是被禁止的。这就是 Widgets layer 的用武之地。它位于 Shared、Entities 和 Features 之上，所以它可以使用它们所有。

在我们的情况下，头部非常简单 — 它是一个静态 logo 和顶级导航。导航需要向 API 发出请求以确定用户当前是否已登录，但这可以通过从 `api` segment 的简单导入来处理。因此，我们将把我们的头部保留在 Shared 中。

### 仔细查看带有表单的页面

让我们也检查一个用于编辑而不是阅读的页面。例如，文章编写器：

![Conduit post editor](../../../../../../static/img/tutorial/realworld-editor-authenticated.jpg)

它看起来微不足道，但包含了我们尚未探索的应用程序开发的几个方面 — 表单验证、错误状态和数据持久化。

如果我们要构建这个页面，我们会从 Shared 中获取一些输入和按钮，并在此页面的 `ui` segment 中组合一个表单。然后，在 `api` segment 中，我们将定义一个变更请求以在后端创建文章。

为了在发送之前验证请求，我们需要一个验证模式，一个好地方是 `model` segment，因为它是数据模型。在那里我们将产生错误消息并使用 `ui` segment 中的另一个组件显示它们。

为了改善用户体验，我们还可以持久化输入以防止意外数据丢失。这也是 `model` segment 的工作。

### 总结

我们已经检查了几个页面并为我们的应用程序概述了初步结构：

1. Shared layer
   1. `ui` 将包含我们可重用的 UI 套件
   2. `api` 将包含我们与后端的原始交互
   3. 其余将根据需要安排
2. Pages layer — 每个页面都是一个单独的 slice
   1. `ui` 将包含页面本身及其所有部分
   2. `api` 将包含更专门的数据获取，使用 `shared/api`
   3. `model` 可能包含我们将显示的数据的客户端存储

让我们开始构建吧！

## 第二部分。在代码中

现在我们有了计划，让我们付诸实践。我们将使用 React 和 [Remix](https://remix.run)。

有一个为此项目准备的模板，从 GitHub 克隆它以获得先机：[https://github.com/feature-sliced/tutorial-conduit/tree/clean](https://github.com/feature-sliced/tutorial-conduit/tree/clean)。

使用 `npm install` 安装依赖项并使用 `npm run dev` 启动开发服务器。打开 `http://localhost:3000`，您应该看到一个空白应用程序。

### 布局页面

让我们首先为所有页面创建空白组件。在您的项目中运行以下命令：

```bash
npx fsd pages feed sign-in article-read article-edit profile settings --segments ui
```

这将为每个页面创建像 `pages/feed/ui/` 这样的文件夹和一个索引文件 `pages/feed/index.ts`。

### 连接 feed 页面

让我们将应用程序的根路由连接到 feed 页面。在 `pages/feed/ui` 中创建一个组件 `FeedPage.tsx` 并将以下内容放入其中：

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

然后在 feed 页面的 public API，`pages/feed/index.ts` 文件中重新导出此组件：

```ts title="pages/feed/index.ts"
export { FeedPage } from "./ui/FeedPage";
```

现在将它连接到根路由。在 Remix 中，路由是基于文件的，路由文件位于 `app/routes` 文件夹中，这与 Feature-Sliced Design 很好地契合。

在 `app/routes/_index.tsx` 中使用 `FeedPage` 组件：

```tsx title="app/routes/_index.tsx"
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

然后，如果您运行开发服务器并打开应用程序，您应该会看到 Conduit 横幅！

![The banner of Conduit](../../../../../../static/img/tutorial/conduit-banner.jpg)

### API 客户端

为了与 RealWorld 后端通信，让我们在 Shared 中创建一个方便的 API 客户端。创建两个 segments，`api` 用于客户端，`config` 用于像后端基础 URL 这样的变量：

```bash
npx fsd shared --segments api config
```

然后创建 `shared/config/backend.ts`：

```tsx title="shared/config/backend.ts"
export { mockBackendUrl as backendBaseUrl } from "mocks/handlers";
```

```tsx title="shared/config/index.ts"
export { backendBaseUrl } from "./backend";
```

由于 RealWorld 项目方便地提供了 [OpenAPI 规范](https://github.com/gothinkster/realworld/blob/main/api/openapi.yml)，我们可以利用为我们的客户端自动生成的类型。我们将使用 [the `openapi-fetch` package](https://openapi-ts.pages.dev/openapi-fetch/)，它附带一个额外的类型生成器。

运行以下命令生成最新的 API 类型：

```bash
npm run generate-api-types
```

这将创建一个文件 `shared/api/v1.d.ts`。我们将使用此文件在 `shared/api/client.ts` 中创建一个类型化的 API 客户端：

```tsx title="shared/api/client.ts"
import createClient from "openapi-fetch";

import { backendBaseUrl } from "shared/config";
import type { paths } from "./v1";

export const { GET, POST, PUT, DELETE } = createClient<paths>({ baseUrl: backendBaseUrl });
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";
```

### feed 中的真实数据

我们现在可以继续向 feed 添加从后端获取的文章。让我们首先实现一个文章预览组件。

使用以下内容创建 `pages/feed/ui/ArticlePreview.tsx`：

```tsx title="pages/feed/ui/ArticlePreview.tsx"
export function ArticlePreview({ article }) { /* TODO */ }
```

由于我们用 TypeScript 编写，有一个类型化的 article 对象会很好。如果我们探索生成的 `v1.d.ts`，我们可以看到 article 对象可以通过 `components["schemas"]["Article"]` 获得。所以让我们在 Shared 中创建一个包含我们数据模型的文件并导出模型：

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";
```

现在我们可以回到文章预览组件并用数据填充标记。使用以下内容更新组件：

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

点赞按钮目前不做任何事情，我们将在到达文章阅读器页面并实现点赞功能时修复它。

现在我们可以获取文章并渲染出一堆这些卡片。在 Remix 中获取数据是通过 *loaders* 完成的 — 服务器端函数，获取页面所需的确切内容。Loaders 代表页面与 API 交互，所以我们将它们放在页面的 `api` segment 中：

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

要将它连接到页面，我们需要从路由文件中以名称 `loader` 导出它：

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

最后一步是在 feed 中渲染这些卡片。使用以下代码更新您的 `FeedPage`：

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

### 按标签过滤

关于标签，我们的工作是从后端获取它们并存储当前选中的标签。我们已经知道如何进行获取 — 这是来自 loader 的另一个请求。我们将使用来自已安装的 `remix-utils` 包的便利函数 `promiseHash`。

使用以下代码更新 loader 文件 `pages/feed/api/loader.ts`：

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

您可能会注意到我们将错误处理提取到一个通用函数 `throwAnyErrors` 中。它看起来非常有用，所以我们可能希望稍后重用它，但现在让我们先留意一下。

现在，到标签列表。它需要是交互式的 — 点击标签应该使该标签被选中。按照 Remix 约定，我们将使用 URL 搜索参数作为我们选中标签的存储。让浏览器处理存储，而我们专注于更重要的事情。

使用以下代码更新 `pages/feed/ui/FeedPage.tsx`：

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

然后我们需要在我们的 loader 中使用 `tag` 搜索参数。将 `pages/feed/api/loader.ts` 中的 `loader` 函数更改为以下内容：

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

就是这样，不需要 `model` segment。Remix 非常整洁。

### 分页

以类似的方式，我们可以实现分页。随意自己尝试一下或直接复制下面的代码。反正没有人会判断您。

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

这样也完成了。还有选项卡列表可以类似地实现，但让我们等到实现身份验证时再处理。说到这个！

### 身份验证 \{#authentication}

身份验证涉及两个页面 — 一个用于登录，另一个用于注册。它们大部分相同，所以将它们保持在同一个 slice `sign-in` 中是有意义的，这样它们可以在需要时重用代码。

在 `pages/sign-in` 的 `ui` segment 中创建 `RegisterPage.tsx`，内容如下：

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

我们现在有一个损坏的导入要修复。它涉及一个新的 segment，所以创建它：

```bash
npx fsd pages sign-in -s api
```

然而，在我们可以实现注册的后端部分之前，我们需要一些供 Remix 处理会话的基础设施代码。这放在 Shared 中，以防其他页面需要它。

将以下代码放入 `shared/api/auth.server.ts`。这高度特定于 Remix，所以不要太担心，只需复制粘贴：

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

同时从旁边的 `models.ts` 文件中导出 `User` 模型：

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
export type User = components["schemas"]["User"];
```

在此代码能够工作之前，需要设置 `SESSION_SECRET` 环境变量。在项目根目录中创建一个名为 `.env` 的文件，写入 `SESSION_SECRET=`，然后在键盘上随意敲击一些键来创建一个长的随机字符串。您应该得到类似这样的东西：

```bash title=".env"
SESSION_SECRET=dontyoudarecopypastethis
```

最后，向 public API 添加一些导出以使用此代码：

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
```

现在我们可以编写与 RealWorld 后端通信以实际进行注册的代码。我们将其保存在 `pages/sign-in/api` 中。创建一个名为 `register.ts` 的文件，并将以下代码放入其中：

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

几乎完成了！只需要将页面和操作连接到 `/register` 路由。在 `app/routes` 中创建 `register.tsx`：

```tsx title="app/routes/register.tsx"
import { RegisterPage, register } from "pages/sign-in";

export { register as action };

export default RegisterPage;
```

现在如果您转到 `http://localhost:3000/register`，您应该能够创建用户！应用程序的其余部分还不会对此做出反应，我们将立即解决这个问题。

以非常类似的方式，我们可以实现登录页面。尝试一下或直接获取代码并继续：

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

现在让我们给用户一种实际达到这些页面的方法。

### 头部

正如我们在第一部分中讨论的，应用程序头部通常放在 Widgets 或 Shared 中。我们将其放在 Shared 中，因为它非常简单，所有业务逻辑都可以保持在它之外。让我们为它创建一个地方：

```bash
npx fsd shared ui
```

现在创建 `shared/ui/Header.tsx`，内容如下：

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

从 `shared/ui` 导出此组件：

```tsx title="shared/ui/index.ts"
export { Header } from "./Header";
```

在头部中，我们依赖保存在 `shared/api` 中的上下文。也创建它：

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

现在让我们将头部添加到页面。我们希望它出现在每一个页面上，所以简单地将其添加到根路由并用 `CurrentUser` 上下文提供者包装 outlet（页面将被渲染的地方）是有意义的。这样我们的整个应用程序以及头部都可以访问当前用户对象。我们还将添加一个 loader 来实际从 cookies 中获取当前用户对象。将以下内容放入 `app/root.tsx`：

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

在这一点，您应该在主页上得到以下结果：

<figure>
  ![The feed page of Conduit, including the header, the feed, and the tags. The tabs are still missing.](../../../../../../static/img/tutorial/realworld-feed-without-tabs.jpg)

  <figcaption>The feed page of Conduit, including the header, the feed, and the tags. The tabs are still missing.</figcaption>
</figure>

### 选项卡

现在我们可以检测身份验证状态，让我们也快速实现选项卡和帖子点赞来完成 feed 页面。我们需要另一个表单，但这个页面文件正在变得有点大，所以让我们将这些表单移动到相邻的文件中。我们将创建 `Tabs.tsx`、`PopularTags.tsx` 和 `Pagination.tsx`，内容如下：

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

现在我们可以显著简化 feed 页面本身：

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

我们还需要在 loader 函数中考虑新选项卡：

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

在我们离开 feed 页面之前，让我们添加一些处理帖子点赞的代码。将您的 `ArticlePreview.tsx` 更改为以下内容：

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

此代码将向 `/article/:slug` 发送带有 `_action=favorite` 的 POST 请求以将文章标记为收藏。它还不会工作，但当我们开始处理文章阅读器时，我们也会实现这个功能。

这样我们就正式完成了 feed！太好了！

### 文章阅读器

首先，我们需要数据。让我们创建一个 loader：

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

现在我们可以通过创建一个名为 `article.$slug.tsx` 的路由文件将其连接到路由 `/article/:slug`：

```tsx title="app/routes/article.$slug.tsx"
export { loader } from "pages/article-read";
```

页面本身由三个主要块组成 — 带有操作的文章头部（重复两次）、文章主体和评论部分。这是页面的标记，它并不特别有趣：

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

更有趣的是 `ArticleMeta` 和 `Comments`。它们包含写操作，如点赞文章、留下评论等。要让它们工作，我们首先需要实现后端部分。在页面的 `api` segment 中创建 `action.ts`：

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

从 slice 中导出它，然后从路由中导出。趁着这个机会，让我们也连接页面本身：

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

现在，尽管我们还没有在阅读器页面上实现点赞按钮，但 feed 中的点赞按钮将开始工作！这是因为它一直在向这个路由发送"点赞"请求。试试看吧。

`ArticleMeta` 和 `Comments` 又是一堆表单。我们之前已经做过这个，让我们获取它们的代码并继续：

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

这样我们的文章阅读器也完成了！关注作者、点赞帖子和留下评论的按钮现在应该能按预期工作。

<figure>
  ![Article reader with functioning buttons to like and follow](../../../../../../static/img/tutorial/realworld-article-reader.jpg)

  <figcaption>Article reader with functioning buttons to like and follow</figcaption>
</figure>

### 文章编辑器

这是我们将在本教程中涵盖的最后一个页面，这里最有趣的部分是我们将如何验证表单数据。

页面本身，`article-edit/ui/ArticleEditPage.tsx`，将非常简单，额外的复杂性被存储到其他两个组件中：

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

此页面获取当前文章（除非我们从头开始编写）并填写相应的表单字段。我们之前见过这个。有趣的部分是 `FormErrors`，因为它将接收验证结果并向用户显示。让我们看一下：

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

这里我们假设我们的 action 将返回 `errors` 字段，一个人类可读的错误消息数组。我们很快就会讲到 action。

另一个组件是标签输入。它只是一个普通的输入字段，附带所选标签的额外预览。这里没什么可看的：

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

现在，API 部分。loader 应该查看 URL，如果它包含文章 slug，那意味着我们正在编辑现有文章，应该加载其数据。否则，返回空。让我们创建该 loader：

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

action 将获取新的字段值，通过我们的数据模式运行它们，如果一切都正确，就将这些更改提交到后端，通过更新现有文章或创建新文章：

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

模式同时作为 `FormData` 的解析函数，这使我们可以方便地获取干净的字段或只是抛出错误在末尾处理。这里是该解析函数的样子：

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

可以说，它有点凗长和重复，但这是我们为人类可读错误付出的代价。这也可以是一个 Zod 模式，例如，但然后我们必须在前端渲染错误消息，这个表单不值得复杂化。

最后一步 — 将页面、loader 和 action 连接到路由。由于我们巧妙地支持创建和编辑，我们可以从 `editor._index.tsx` 和 `editor.$slug.tsx` 两者导出相同的东西：

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

我们现在完成了！登录并尝试创建一篇新文章。或者“忘记”编写文章并看到验证生效。

<figure>
  ![The Conduit article editor, with the title field saying “New article” and the rest of the fields empty. Above the form there are two errors: “**Describe what this article is about” and “Write the article itself”.**](../../../../../../static/img/tutorial/realworld-article-editor.jpg)

  <figcaption>The Conduit article editor, with the title field saying “New article” and the rest of the fields empty. Above the form there are two errors: **“Describe what this article is about”** and **“Write the article itself”**.</figcaption>
</figure>

资料和设置页面与文章阅读器和编辑器非常相似，它们留作读者的练习，这就是您 :)
