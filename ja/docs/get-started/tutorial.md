# チュートリアル

## 第１章 紙の上で[​](#第１章-紙の上で "この見出しへの直接リンク")

このガイドでは、Real World Appとしても知られるアプリケーションを見ていきます。Conduitは、[Medium](https://medium.com/)の簡略版であり、ブログ記事を読み書きし、他の人の記事にコメントすることができます。

![Conduitのホームページ](/documentation/ja/assets/images/realworld-feed-anonymous-8cbba45f488931979f6c8da8968ad685.jpg)

これはかなり小さなアプリケーションなので、過度に分解することなく開発を進めます。おそらく、アプリケーション全体は3つの層に収まります: **App層**、**Pages層**、**Shared層**。もしそうでなければ、進行に応じて追加の層を導入しましょう。準備はいいですか？

### ページの列挙から始める[​](#ページの列挙から始める "この見出しへの直接リンク")

上のスクリーンショットを見てみると、少なくとも次のページがあると推測できます。

* ホーム（記事のフィード）
* ログインと登録
* 記事の閲覧
* 記事の編集
* ユーザープロフィールの閲覧
* プロフィールの編集（設定）

これらの各ページは、*Pages*層の個別*スライス*になります。概要のセクションから思い出してください。スライスは単に層内のフォルダーであり、層は事前に定義された名前のフォルダーだけです。例えば、`pages`のようです。

したがって、私たちのPagesフォルダーは次のようになります。

```
📂 pages/
  📁 feed/ (フィード)
  📁 sign-in/ (ログイン/登録)
  📁 article-read/ (記事の閲覧)
  📁 article-edit/ (記事の編集)
  📁 profile/ (プロフィール)
  📁 settings/ (設定)
```

Feature-Sliced Designの特徴は、ページが互いに依存できないことです。つまり、1つのページが他のページのコードをインポートすることはできません。これは**層のインポートルール**によって禁じられています。

*スライス内のモジュール（ファイル）は、下層にあるスライスのみをインポートできる。*

この場合、ページはスライスであるため、そのページ内のモジュール（ファイル）は、他のページではなく、下層からのみコードをインポートできます。

### フィードを詳しく見てみると[​](#フィードを詳しく見てみると "この見出しへの直接リンク")

![匿名訪問者の視点](/documentation/ja/assets/images/realworld-feed-anonymous-8cbba45f488931979f6c8da8968ad685.jpg)

*匿名訪問者の視点*

![認証されたユーザーの視点](/documentation/ja/assets/images/realworld-feed-authenticated-15427d9ff7baae009b47b501bee6c059.jpg)

*認証されたユーザーの視点*

フィードページには3つの動的領域があります。

1. 認証状態を示すログインリンク
2. フィードをフィルタリングするタグ一覧
3. 1つ、または2つのフィード記事。各記事にはいいねボタンがある

ログインリンクは、すべてのページで共通のヘッダーの一部であるため、一旦保留にしましょう。

#### タグ一覧[​](#タグ一覧 "この見出しへの直接リンク")

タグ一覧を作成するには、すべての利用可能なタグを取得し、各タグをチップ（[chip](https://m3.material.io/components/chips/overview)）として表示し、選択されたタグをクライアント側のストレージに保存する必要があります。これらの操作は、「APIとのインタラクション」、「ユーザーインターフェース」、「データストレージ」のカテゴリに関連しています。Feature-Sliced Designでは、コードは目的に応じて*セグメント*に分けられます。セグメントはスライス内のフォルダーであり、目的を説明する任意の名前を持つことができます。いくつかの目的は非常に一般的であるため、いくつかの一般的な名前があります。

* 📂 `api/` バックエンドとのインタラクション
* 📂 `ui/` 表示と外観を担当するコード
* 📂 `model/` データとビジネスロジックのストレージ
* 📂 `config/` フィーチャーフラグ、環境変数、その他の設定形式

タグを取得するコードは`api`に、タグコンポーネントは`ui`に、ストレージとのインタラクションは`model`に配置します。

#### 記事[​](#記事 "この見出しへの直接リンク")

同じ論理に従って、記事のフィードを同じ3つのセグメントに分けることができます。

* 📂 `api/`: ページごとの記事一覧を取得したり、いいねを残したりする

* 📂 `ui/`:

  <!-- -->

  * タグを選択したときに追加のタブを表示できるタブ一覧
  * 個別の記事
  * ページネーション

* 📂 `model/`: クライアントのストレージに保存された読み込まれた投稿と現在のページ（必要に応じて）

### 共通コードの再利用[​](#共通コードの再利用 "この見出しへの直接リンク")

アプリケーションのページは通常、目的によって非常に異なりますが、全体で共通するものもあります。例えば、デザイン言語に対応するUIキットや、すべてが特定の認証メソッドを介してREST APIを通じて行われるというバックエンドにおける取り決めです。スライスは隔離されている必要があるため、コードの再利用は下層の**Shared層**を介して行われます。

Shared層は他の層とは異なり、スライスではなくセグメントを含むため、Shared層はレイヤーとスライスのハイブリッドです。

通常、Shared層内のコードは事前に作成されず、開発の過程で抽出されます。なぜなら、どの部分のコードが実際に再利用されるかが開発中に明らかになるからです。それでも、Shared層にどんなコードを保持するかを念頭に置いておくことは重要です。

* 📂 `ui/` — ビジネスロジックなしのUIキット。例えば、ボタン、ダイアログ、フォームフィールド。
* 📂 `api/` — バックエンドへのリクエスト用の便利なラッパー（例えば、ウェブの場合は、`fetch()`のラッパー）
* 📂 `config/` — 環境変数の処理
* 📂 `i18n/` — 多言語対応の設定
* 📂 `router/` — ルーティングのプリミティブと定数

これらはShared層内のセグメントの例に過ぎません。これらのいずれかを省略したり、自分自身のセグメントを作成したりできます。新しいセグメントを作成する際に覚えておくべき唯一のことは、セグメントの名前は内容の**本質（何）**&#x3067;はなく、**目的（なぜ）**&#x3092;説明するものでなければなりません。`components`、`hooks`、`modals`のような名前は使用しない方が良いです。なぜなら、これらはファイルが本質的に何を含んでいるかを説明するものであり、コードが書かれた目的を説明するものではないからです。このようなネーミングの結果、チームは必要なものを見つけるためにフォルダーを掘り下げなければならず、さらに無関係なコードが隣接しているため、リファクタリング時にアプリケーションの大部分に影響を与え、レビューやテストが難しくなってしまいます。

### 公開APIを定義する[​](#公開apiを定義する "この見出しへの直接リンク")

Feature-Sliced Designの文脈において、*公開API*という用語は、スライス、またはセグメントが、プロジェクト内の他のモジュールがインポートできるものを宣言することを意味します。例えば、JavaScriptでは、他のファイルからオブジェクトを再エクスポートする`index.js`ファイルがこれに該当します。これにより、外部との契約（つまり、公開API）が変更されない限り、スライス内でのリファクタリングを自由にできます。

Shared層にはスライスがないため、通常、セグメントレベルで公開API（インデックス）を定義する方が便利です。そうすることで、Shared層からのインポートは自然に目的に応じて整理されます。他のレイヤーにはスライスがあるため、通常は1つのインデックスをスライスに定義し、スライス自身が内部のセグメントのセットを制御する方が実用的です。なぜなら、他のレイヤーは通常、エクスポートがはるかに少なく、リファクタリングが頻繁に行われるからです。

私たちのスライス/セグメントは次のようになるでしょう。

```
📂 pages/
  📂 feed/
    📄 index
  📂 sign-in/
    📄 index
  📂 article-read/
    📄 index
  📁 …
📂 shared/
  📂 ui/
    📄 index
  📂 api/
    📄 index
  📁 …
```

`pages/feed`や`shared/ui`のようなフォルダー内にあるものは、これらのフォルダーにのみ知られており、これらのフォルダーの内容に関する保証はありません。

### 大きな再利用可能なUIブロック[​](#大きな再利用可能なuiブロック "この見出しへの直接リンク")

以前、再利用可能なアプリケーションのヘッダーのところに戻りますが、各ページでヘッダーを再構築するのは非効率的なので、再利用します。再利用するコードには、すでにShared層がありますが、Shared層内の大きなUIブロックには注意が必要です。Shared層は上層のレイヤーについて何も知らないべきです。

Shared層とPages層の間には、Entities層、Features層、Widgets層の3つの他のレイヤーがあります。他のプロジェクトでは、これらのレイヤーに大きな再利用可能なブロックで使用したいものがあるかもしれません。その場合、そのブロックをShared層に置くことはできません。なぜなら、上層からインポートしなければならず、それは禁止されているからです。ここでWidgets層が役立ちます。これはShared層、Entities層、Features層の上に位置しているため、すべてを使用できます。

私たちの場合、ヘッダーは非常にシンプルです。静的なロゴと上部ナビゲーションしかありません。ナビゲーションはAPIに現在のユーザーが認証されているかどうかを尋ねる必要がありますが、これは`api`セグメントからの単純なインポートで解決できます。したがって、ヘッダーはShared層に残します。

### フォームページに着目[​](#フォームページに着目 "この見出しへの直接リンク")

記事を読むだけでなく、編集することもできるページも見てみましょう。例えば、記事編集者のページです。

![Conduitの記事編集者](/documentation/ja/assets/images/realworld-editor-authenticated-10de4d01479270886859e08592045b1e.jpg)

見た目は単純ですが、私たちがまだ調べていないアプリケーション開発のいくつかの側面を含んでいます。フォームのバリデーション、エラー状態、データの永続的な保存のようなものです。

このページを作成するには、Shared層からいくつかのフィールドとボタンを取り、それらをこのページの`ui`セグメントにあるフォームにまとめます。次に、`api`セグメントで、バックエンドに記事を作成するための変更リクエストを定義します。

リクエストを送信する前にリクエストをバリデーションするために、バリデーションスキーマが必要です。バリデーションスキーマはデータモデルであるため、`model`セグメントに入れるのがちょうど良いです。そこでエラーメッセージを生成し、`ui`セグメントの別のコンポーネントを使用してエラーメッセージを表示します。

UXを向上させるために、ブラウザを閉じたときに偶発的なデータ損失を防ぐために、入力データを永続的に保存することもできます。これも`model`セグメントに適しています。

### まとめ[​](#まとめ "この見出しへの直接リンク")

いくつかのページに着目し、アプリケーションの基本的な構造を決めることができました。

1. Shared層

   <!-- -->

   1. `ui` には再利用可能なUIキットが含まれる
   2. `api` にはバックエンドとのインタラクションのためのプリミティブが含まれる
   3. 残りはコードを書く過程で整理する

2. Pages層 — 各ページに対して個別のスライスを作成

   <!-- -->

   1. `ui` にはページ自体とその構成要素が含まれる
   2. `api` には`shared/api`を使用するデータ取得のためのより専用的な関数が含まれる
   3. `model` には表示するデータのクライアントストレージなどが含まれる

これでこのアプリケーションを作りましょう！

## 第２章 コードの中で[​](#第２章-コードの中で "この見出しへの直接リンク")

計画ができたので、実現していきましょう。Reactと[Remix](https://remix.run/)を使用します。

このプロジェクトにはすでにテンプレートが用意されているので、GitHubからクローンして作成を始めてください。

<https://github.com/feature-sliced/tutorial-conduit/tree/clean>

依存関係を`npm install`でインストールし、`npm run dev`でサーバーを起動します。[http://localhost:3000](http://localhost:3000/)を開くと、空のアプリケーションが表示されます。

### ページごとに整理する[​](#ページごとに整理する "この見出しへの直接リンク")

すべてのページのために空のコンポーネントを作成することから始めましょう。ターミナルで次のコマンドを実行します。

```
npx fsd pages feed sign-in article-read article-edit profile settings --segments ui
```

これにより、`pages/feed/ui/`のようなフォルダーと、各ページのインデックスファイル`pages/feed/index.ts`が作成されます。

### フィードページを接続する[​](#フィードページを接続する "この見出しへの直接リンク")

アプリケーションのルート（`/`）をフィードページに接続しましょう。`pages/feed/ui`に`FeedPage.tsx`コンポーネントを作成し、次の内容を入れます。

pages/feed/ui/FeedPage.tsx

```
export function FeedPage() {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>知識を共有する場</p>
        </div>
      </div>
    </div>
  );
}
```

次に、このコンポーネントをフィードページの公開APIに再エクスポートします。

pages/feed/index.ts

```
export { FeedPage } from "./ui/FeedPage";
```

次に、ルートに接続します。Remixでは、ルーティングはファイルに基づいていて、ルートファイルは`app/routes`フォルダーにあります。これはFeature-Sliced Designとよく組み合っています。

`app/routes/_index.tsx`で`FeedPage`コンポーネントを使用します。

app/routes/\_index.tsx

```
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

これで、devサーバーを起動し、アプリケーションを開くと、Conduitのバナーが表示されるはずです！

![Conduitのバナー](/documentation/ja/assets/images/conduit-banner-a20e38edcd109ee21a8b1426d93a66b3.jpg)

### APIクライアント[​](#apiクライアント "この見出しへの直接リンク")

RealWorldのバックエンドと通信するために、Shared層内に便利なAPIクライアントを作成しましょう。クライアント用の`api`セグメントと、バックエンドの基本URLなどの変数用の`config`セグメントを作成します。

```
npx fsd shared --segments api config
```

次に、`shared/config/backend.ts`を作成します。

shared/config/backend.ts

```
export { mockBackendUrl as backendBaseUrl } from "mocks/handlers";
```

shared/config/index.ts

```
export { backendBaseUrl } from "./backend";
```

RealWorldプロジェクトは[OpenAPI仕様](https://github.com/gothinkster/realworld/blob/main/api/openapi.yml)を提供しているため、APIクライアントの型を自動的に生成できます。私たちは[`openapi-fetch`パッケージ](https://openapi-ts.pages.dev/openapi-fetch/)を使用します。このパッケージにはTypeScriptの型を自動生成するツールも含まれています。

次のコマンドを実行して、APIの最新の型を生成しましょう。

```
npm run generate-api-types
```

その結果、`shared/api/v1.d.ts`ファイルが作成されます。このファイルを使用して、`shared/api/client.ts`で型付きAPIクライアントを作成します。

shared/api/client.ts

```
import createClient from "openapi-fetch";

import { backendBaseUrl } from "shared/config";
import type { paths } from "./v1";

export const { GET, POST, PUT, DELETE } = createClient<paths>({ baseUrl: backendBaseUrl });
```

shared/api/index.ts

```
export { GET, POST, PUT, DELETE } from "./client";
```

### フィード内の実データ[​](#フィード内の実データ "この見出しへの直接リンク")

これで、バックエンドから記事を取得し、フィードに追加できます。まず、記事プレビューコンポーネントを実装しましょう。

`pages/feed/ui/ArticlePreview.tsx`を作成し、次の内容を記述します。

pages/feed/ui/ArticlePreview\.tsx

```
export function ArticlePreview({ article }) { /* TODO */ }
```

私たちはTypeScriptを使っているので、型付きのArticleオブジェクトを持つと良いでしょう。生成された`v1.d.ts`を調べると、Articleオブジェクトは`components["schemas"]["Article"]`を介して利用可能であることがわかります。これでShared層内にデータモデルを持つファイルを作成し、モデルをエクスポートしましょう。

shared/api/models.ts

```
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
```

shared/api/index.ts

```
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";
```

これで、記事プレビューコンポーネントに戻って、データでマークアップを埋めることができます。次の内容をコンポーネントに追加します。

pages/feed/ui/ArticlePreview\.tsx

```
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
        <span>続きを読む...</span>
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

「いいね」ボタンはまだ機能していません。それは記事の読み取りページに移動して、「いいね」機能を実装するときに修正します。

これで、記事を取得して、たくさんのプレビューカードを表示できます。Remixでは、データの取得は*ローダー*を使用して行われます。ローダーは、ページに必要なデータを収集するサーバー関数です。ローダーはページの代わりにAPIとやり取りをするため、`api`セグメントに配置します。

pages/feed/api/loader.ts

```
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

これをページに接続するには、ルートファイルから`loader`としてエクスポートする必要があります。

pages/feed/index.ts

```
export { FeedPage } from "./ui/FeedPage";
export { loader } from "./api/loader";
```

app/routes/\_index.tsx

```
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export { loader } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

最後のステップは、これらのカードをフィードに表示することです。`FeedPage`を次のコードで更新します。

pages/feed/ui/FeedPage.tsx

```
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
          <p>知識を共有する場</p>
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

### タグによるフィルタリング[​](#タグによるフィルタリング "この見出しへの直接リンク")

タグに関しては、バックエンドから取得し、ユーザーが選択したタグを記憶する必要があります。私たちはバックエンドからの取得方法はすでに知っています。これはローダー関数からの別のリクエストです。すでにインストールされている`remix-utils`パッケージの便利な`promiseHash`関数を使用します。

`pages/feed/api/loader.ts`のローダーを次のコードで更新します。

pages/feed/api/loader.ts

```
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

エラー処理を共通の`throwAnyErrors`関数に移したことに気付いたでしょうか。それはかなり使えそうに見えるので、後で再利用するかもしれません。

タグ一覧をインタラクティブにする必要があります。タグをクリックすると、そのタグが選択されるようにします。Remixの伝統に従い、選択されたタグのストレージとしてURLのクエリパラメータを使用します。ブラウザにストレージを任せ、私たちはより重要なことに集中しましょう。

`pages/feed/ui/FeedPage.tsx`を次のコードで更新します。

pages/feed/ui/FeedPage.tsx

```
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
          <p>知識を共有する場</p>
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
              <p>人気のタグ</p>

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

次に、タグの検索パラメータをローダーで使用する必要があります。`pages/feed/api/loader.ts`の`loader`関数を次のように変更します。

pages/feed/api/loader.ts

```
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

以上です。最終的に`model`セグメントは必要ありませんでした。Remixはすごいですよね。

### ページネーション[​](#ページネーション "この見出しへの直接リンク")

同様に、ページネーションを実装できます。自分で実装してみても、以下のコードをコピーしても良いです。

pages/feed/api/loader.ts

```
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

/** 1ページあたりの記事の数。 */
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

pages/feed/ui/FeedPage.tsx

```
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
          <p>知識を共有する場</p>
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
              <p>人気のタグ</p>

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

よし、これも実現しました。タグ一覧も同様に実装できますが、認証を実装するまで待ちましょう。ところで、認証についてですが！

### 認証[​](#認証 "この見出しへの直接リンク")

認証には、ログイン用のページと登録用のページの2つがあります。これらは主に非常に似ているため、必要に応じてコードを再利用できるように、1つの`sign-in`セグメントに保持するのが理にかなっています。

`pages/sign-in`の`ui`セグメントに`RegisterPage.tsx`を作成し、次の内容を配置します。

pages/sign-in/ui/RegisterPage.tsx

```
import { Form, Link, useActionData } from "@remix-run/react";

import type { register } from "../api/register";

export function RegisterPage() {
  const registerData = useActionData<typeof register>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">登録</h1>
            <p className="text-xs-center">
              <Link to="/login">アカウントをお持ちですか？</Link>
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
                  placeholder="ユーザー名"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="メールアドレス"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="パスワード"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                登録
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

これからは壊れたインポートを修正する必要があります。インポートが新しいセグメントにアクセスしているため、次のコマンドでそのセグメントを作成しましょう。

```
npx fsd pages sign-in -s api
```

ただし、登録のバックエンド部分を実装する前に、Remixのセッション処理のためのインフラコードが必要です。これは他のページでも必要になる可能性があるため、Shared層に配置します。

次のコードを`shared/api/auth.server.ts`に配置しましょう。このコードはRemixに特有のものであり、すべてが理解できなくても心配しないでください。単にコピーして貼り付けてください。

shared/api/auth.server.ts

```
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
        maxAge: 60 * 60 * 24 * 7, // 7日間
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

また、`models.ts`ファイルから`User`モデルをエクスポートしてください。

shared/api/models.ts

```
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
export type User = components["schemas"]["User"];
```

このコードが動作する前に、`SESSION_SECRET`環境変数を設定する必要があります。プロジェクトのルートに`.env`ファイルを作成し、`SESSION_SECRET=`を記述してから、適当にランダムな文字列を記入します。次のようになります。

.env

```
SESSION_SECRET=これをコピーしないでください
```

最後に、公開APIにいくつかのエクスポートを追加します。

shared/api/index.ts

```
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
```

これで、RealWorldのバックエンドと通信するコードを書くことができます。これを`pages/sign-in/api`に保存します。`register.ts`ファイルを作成して、中に次のコードを配置しましょう。

pages/sign-in/api/register.ts

```
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

pages/sign-in/index.ts

```
export { RegisterPage } from './ui/RegisterPage';
export { register } from './api/register';
```

ほぼ完成です！残りの部分は、`/register`ルートにアクションとページを接続することだけです。`app/routes`で`register.tsx`を作成します。

app/routes/register.tsx

```
import { RegisterPage, register } from "pages/sign-in";

export { register as action };

export default RegisterPage;
```

これで、<http://localhost:3000/register>にアクセスすると、ユーザーを作成できます！アプリケーションの残りの部分は、まだ反応しませんが、近々対処します。

同様に、ログインページを実装することもできます。自分で実装してみるか、下記のコードをコピペするか、次に進みましょう。

pages/sign-in/api/sign-in.ts

```
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

pages/sign-in/ui/SignInPage.tsx

```
import { Form, Link, useActionData } from "@remix-run/react";

import type { signIn } from "../api/sign-in";

export function SignInPage() {
  const signInData = useActionData<typeof signIn>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">サインイン</h1>
            <p className="text-xs-center">
              <Link to="/register">アカウントが必要ですか？</Link>
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
                  placeholder="メールアドレス"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="password"
                  type="password"
                  placeholder="パスワード"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                サインイン
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

pages/sign-in/index.ts

```
export { RegisterPage } from './ui/RegisterPage';
export { register } from './api/register';
export { SignInPage } from './ui/SignInPage';
export { signIn } from './api/sign-in';
```

app/routes/login.tsx

```
import { SignInPage, signIn } from "pages/sign-in";

export { signIn as action };

export default SignInPage;
```

これで、ユーザーがこれらのページにアクセスできるようになりました。

### ヘッダー[​](#ヘッダー "この見出しへの直接リンク")

前章で説明されたように、アプリケーションのヘッダーは通常Widgets層、またはShared層に配置されます。ヘッダーは非常にシンプルで、すべてのビジネスロジックを外部に保持できるので、Shared層に配置しましょう。ヘッダー用のフォルダーを作成します。

```
npx fsd shared ui
```

次に、`shared/ui/Header.tsx`を作成し、次の内容を配置します。

shared/ui/Header.tsx

```
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
              ホーム
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
                  サインイン
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/register" ? "active" : ""}`}
                  to="/register"
                >
                  登録
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
                  <i className="ion-compose"></i>&nbsp;新しい記事
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/settings" ? "active" : ""}`}
                  to="/settings"
                >
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;設定
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

このコンポーネントを`shared/ui`からエクスポートします。

shared/ui/index.ts

```
export { Header } from "./Header";
```

ヘッダーで`shared/api`にあるコンテキストを使っているので、それを作成しましょう。

shared/api/currentUser.ts

```
import { createContext } from "react";

import type { User } from "./models";

export const CurrentUser = createContext<User | null>(null);
```

shared/api/index.ts

```
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
export { CurrentUser } from "./currentUser";
```

これで、ヘッダーをページに追加できます。すべてのページに表示されるように、ルートに追加し、アウトレット（ページがレンダリングされる場所）を`CurrentUser`のコンテキストプロバイダーで包みます。これにより、ヘッダーを含むアプリ全体が現在のユーザーオブジェクトにアクセスできるようになります。また、クッキーから現在のユーザーオブジェクトを取得するためのローダーも追加します。次のコードを`app/root.tsx`に追加しましょう。

app/root.tsx

```
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

最終的に、ホームページは次のようになります。

![ヘッダー、フィード、タグがあるConduitのフィードページ。タブはまだありません。](/documentation/ja/assets/images/realworld-feed-without-tabs-5da4c9072101ac20e82e2234bd3badbe.jpg)

ヘッダー、フィード、タグがあるConduitのフィードページ。タブはまだない。

### タブ[​](#タブ "この見出しへの直接リンク")

これで認証状態を判断できるようになったので、タブと「いいね」ボタンをフィードページに実装しましょう。新しいフォームを作る必要がありますが、このページファイルはすでに大きすぎるので、これらのフォームを隣接するファイルに移動しましょう。`Tabs.tsx`、`PopularTags.tsx`、`Pagination.tsx`を作成し、次の内容を配置します。

pages/feed/ui/Tabs.tsx

```
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
                私のフィード
              </button>
            </li>
          )}
          <li className="nav-item">
            <button
              className={`nav-link ${searchParams.has("tag") || searchParams.has("source") ? "" : "active"}`}
            >
              グローバルフィード
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

pages/feed/ui/PopularTags.tsx

```
import { Form, useLoaderData } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import type { loader } from "../api/loader";

export function PopularTags() {
  const { tags } = useLoaderData<typeof loader>();

  return (
    <div className="sidebar">
      <p>人気のタグ</p>

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

pages/feed/ui/Pagination.tsx

```
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

これで、フィードページを大幅に簡素化できます。

pages/feed/ui/FeedPage.tsx

```
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
          <p>知識を共有する場</p>
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

ローダー関数にも新しいタブを考慮する必要があります。

pages/feed/api/loader.ts

```
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, requireUser } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  /* そのまま */
}

/** 1ページあたりの記事数。 */
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

フィードページを一旦置いておく前に、投稿へのいいねを処理するコードを追加しましょう。`ArticlePreview.tsx`を次のように変更します。

pages/feed/ui/ArticlePreview\.tsx

```
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
        <span>もっと読む...</span>
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

このコードは、`/article/:slug`にPOSTリクエストを送信し、`_action=favorite`を使用して記事をお気に入りにします。今は機能していませんが、記事リーダーの作成を始めると、これも実装します。

これで、フィードの作成が完了しました！やったね！

### 記事リーダー[​](#記事リーダー "この見出しへの直接リンク")

まず、データが必要です。ローダーを作成しましょう。

```
npx fsd pages article-read -s api
```

pages/article-read/api/loader.ts

```
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
  invariant(params.slug, "スラッグパラメータが必要です");
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

pages/article-read/index.ts

```
export { loader } from "./api/loader";
```

これで、`/article/:slug`ルートに接続できます。`article.$slug.tsx`というルートファイルを作成します。

app/routes/article.$slug.tsx

```
export { loader } from "pages/article-read";
```

ページ自体は、記事のタイトルとアクション、記事の本文、コメントセクションの3つの主要なブロックで構成されています。下記はページのマークアップで、特に興味深いものはありません。

pages/article-read/ui/ArticleReadPage.tsx

```
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

興味深いのは`ArticleMeta`と`Comments`です。これらは、記事を「いいね」したり、コメントを残したりするための操作を含んでいます。これらが機能するためには、まずバックエンド部分を実装する必要があります。このページの`api`セグメントに`action.ts`ファイルを作成します。

pages/article-read/api/action.ts

```
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
      invariant(params.slug, "スラッグパラメータが必要です");
      await DELETE("/articles/{slug}", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirect("/");
    },
    async favorite() {
      invariant(params.slug, "スラッグパラメータが必要です");
      await POST("/articles/{slug}/favorite", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async unfavorite() {
      invariant(params.slug, "スラッグパラメータが必要です");
      await DELETE("/articles/{slug}/favorite", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async createComment() {
      invariant(params.slug, "スラッグパラメータが必要です");
      const comment = formData.get("comment");
      invariant(typeof comment === "string", "コメントパラメータが必要です");
      await POST("/articles/{slug}/comments", {
        params: { path: { slug: params.slug } },
        headers: { ...authorization, "Content-Type": "application/json" },
        body: { comment: { body: comment } },
      });
      return redirectBack(request, { fallback: "/" });
    },
    async deleteComment() {
      invariant(params.slug, "スラッグパラメータが必要です");
      const commentId = formData.get("id");
      invariant(typeof commentId === "string", "idパラメータが必要です");
      const commentIdNumeric = parseInt(commentId, 10);
      invariant(
        !Number.isNaN(commentIdNumeric),
        "数値のidパラメータが必要です",
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
        "ユーザーネームパラメータが必要です",
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
        "ユーザーネームパラメータが必要です",
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

これをスライスから再エクスポートし、ルートから再エクスポートします。ここにいる間に、ページ自体も接続しましょう。

pages/article-read/index.ts

```
export { ArticleReadPage } from "./ui/ArticleReadPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

app/routes/article.$slug.tsx

```
import { ArticleReadPage } from "pages/article-read";

export { loader, action } from "pages/article-read";

export default ArticleReadPage;
```

これで、記事リーダーの「いいね」ボタンはまだ実装されていないにも関わらず、フィードの「いいね」ボタンは機能し始めます！それは、フィードの「いいね」ボタンもそのルートにリクエストを送っているからです。何かを「いいね」してみてください！

`ArticleMeta`と`Comments`は、単なるフォームです。以前にこれを行ったので、コードをコピペして先に進みましょう。

pages/article-read/ui/ArticleMeta.tsx

```
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
              <i className="ion-edit"></i> 記事を編集
            </Link>
            &nbsp;&nbsp;
            <button
              name="_action"
              value="delete"
              className="btn btn-sm btn-outline-danger"
            >
              <i className="ion-trash-a"></i> 記事を削除
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
                ? "フォロー解除"
                : "フォロー"}{" "}
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
                ? "いいね解除"
                : "いいね"}{" "}
              記事{" "}
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

pages/article-read/ui/Comments.tsx

```
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
          key={Date()}
        >
          <div className="card-block">
            <textarea
              required
              className="form-control"
              name="comment"
              placeholder="コメントを書く..."
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
              コメントを投稿
            </button>
          </div>
        </Form>
      ) : (
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <p>
              <Link to="/login">サインイン</Link>
              &nbsp; または &nbsp;
              <Link to="/register">登録</Link>
              &nbsp; して記事にコメントを追加しましょう！
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

これで、記事リーダーが完成しました！「著者をフォローする」ボタン、「いいね」ボタン、「コメントを残す」ボタンがすべて正常に機能するはずです。

![記事リーダーの画像](/documentation/ja/assets/images/realworld-article-reader-6a420e4f2afe139d2bdd54d62974f0b9.jpg)

記事リーダーの画像

### 記事編集[​](#記事編集 "この見出しへの直接リンク")

これは、このガイドで最後に取り上げるページです。ここで最も興味深い部分は、フォームデータを検証する方法です。

`article-edit/ui/ArticleEditPage.tsx`ページ自体は、非常にシンプルで、追加のロジックは他の2つのコンポーネントに含まれます。

pages/article-edit/ui/ArticleEditPage.tsx

```
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
                    placeholder="記事のタイトル"
                    defaultValue={article.article?.title}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="この記事は何についてですか？"
                    defaultValue={article.article?.description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    name="body"
                    rows={8}
                    placeholder="記事を記述してください（マークダウン形式）"
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
                  記事を公開
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

このページは、存在する記事を取得し（新しい記事を作成する場合を除く）、対応するフォームフィールドを埋めます。これは以前に見たものです。着目すべき部分は`FormErrors`で、これは検証結果を取得し、ユーザーに表示します。

pages/article-edit/ui/FormErrors.tsx

```
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

アクションが`errors`フィールドを返し、人間に理解できるエラーメッセージの配列を表示することを想定しています。アクションには後で移ります。

もう1つのコンポーネントはタグ入力フィールドです。これは、選択されたタグのプレビューできる通常の入力フィールドです。特に注目すべき点はありません。

pages/article-edit/ui/TagsInput.tsx

```
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
        placeholder="タグを入力"
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

次に、API部分に移ります。ローダーはURLを確認し、記事へのリンクがある場合、既存の記事を編集していることを意味し、そのデータをロードする必要があります。そうでない場合は、何も返しません。このローダーを作成しましょう。

pages/article-edit/api/loader.ts

```
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

アクションは新しいフィールドの値を受け取り、それらをデータスキーマに通し、すべてが正しければ、既存の記事を更新するか、新しい記事を作成することによって、バックエンドに変更を保存します。

pages/article-edit/api/action.ts

```
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

私たちのデータスキーマは、`FormData`を解析するので、最終的に処理するエラーメッセージを投げたりするのに役立ちます。この解析関数は次のようになります。

pages/article-edit/model/parseAsArticle.ts

```
export function parseAsArticle(data: FormData) {
  const errors = [];

  const title = data.get("title");
  if (typeof title !== "string" || title === "") {
    errors.push("記事にタイトルを付けてください");
  }

  const description = data.get("description");
  if (typeof description !== "string" || description === "") {
    errors.push("この記事が何についてか説明してください");
  }

  const body = data.get("body");
  if (typeof body !== "string" || body === "") {
    errors.push("記事そのものを書いてください");
  }

  const tags = data.get("tags");
  if (typeof tags !== "string") {
    errors.push("タグは文字列である必要があります");
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

少し長く繰り返しが多いように見えるかもしれませんが、これはエラーメッセージを人間に理解しやすくするための代償です。Zodのようなスキーマを使用することもできますが、その場合、フロントエンドでエラーメッセージを表示する必要があります。このフォームはそのような複雑さには値しません。

最後のステップは、ページ、ローダー、アクションをルートに接続することです。私たちは作成と編集の両方をきれいにサポートしているので、`editor._index.tsx`と`editor.$slug.tsx`の両方から同じアクションをエクスポートできます。

pages/article-edit/index.ts

```
export { ArticleEditPage } from "./ui/ArticleEditPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

app/routes/editor.\_index.tsx, app/routes/editor.$slug.tsx (同じ内容)

```
import { ArticleEditPage } from "pages/article-edit";

export { loader, action } from "pages/article-edit";

export default ArticleEditPage;
```

これで完成です！ログインして新しい記事を作成してみてください。あるいは、フィールドに何も記入せず進み、バリデーションがどのように機能するかを検証してみてください。

![記事編集者の画像](/documentation/ja/assets/images/realworld-article-editor-bc3ee45c96ae905fdbb54d6463d12723.jpg)

記事編集画像

プロフィールページや設定ページは、記事の読み取りや編集ページに非常に似ていて、読者のための宿題として残されています。
