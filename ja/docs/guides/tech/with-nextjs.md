# NextJSとの併用

NextJSプロジェクトでFSDを実装することは可能ですが、プロジェクトの構造に関するNextJSの要件とFSDの原則の間に2つの点で対立が生じます。

* `pages`のファイルルーティング
* NextJSにおける`app`の対立、または欠如

## `pages`におけるFSDとNextJSの対立[​](#pages-conflict "この見出しへの直接リンク")

NextJSは、アプリケーションのルートを定義するために`pages`フォルダーを使用することを提案しています。`pages`フォルダー内のファイルがURLに対応することを期待しています。このルーティングメカニズムは、FSDの概念に**適合しません**。なぜなら、このようなルーティングメカニズムでは、スライスの平坦な構造を維持することができないからです。

### NextJSの`pages`フォルダーをプロジェクトのルートフォルダーに移動する（推奨）[​](#nextjsのpagesフォルダーをプロジェクトのルートフォルダーに移動する推奨 "この見出しへの直接リンク")

このアプローチは、NextJSの`pages`フォルダーをプロジェクトのルートフォルダーに移動し、FSDのページをNextJSの`pages`フォルダーにインポートすることにあります。これにより、`src`フォルダー内でFSDのプロジェクト構造を維持できます。

```
├── pages              # NextJSのpagesフォルダー
├── src
│   ├── app
│   ├── entities
│   ├── features
│   ├── pages          # FSDのpagesフォルダー
│   ├── shared
│   ├── widgets
```

### FSD構造における`pages`フォルダーの名前変更[​](#fsd構造におけるpagesフォルダーの名前変更 "この見出しへの直接リンク")

もう一つの解決策は、FSD構造内の`pages`層の名前を変更して、NextJSの`pages`フォルダーとの名前衝突を避けることです。 FSDの`pages`層を`views`層に変更することができます。 このようにすることで、`src`フォルダー内のプロジェクト構造は、NextJSの要件と矛盾することなく保持されます。

```
├── app
├── entities
├── features
├── pages              # NextJSのpagesフォルダー
├── views              # 名前が変更されたFSDのページフォルダー
├── shared
├── widgets
```

この場合、プロジェクトのREADMEや内部ドキュメントなど、目立つ場所にこの名前変更を文書化することをお勧めします。この名前変更は、[「プロジェクト知識」](/documentation/ja/docs/about/understanding/knowledge-types.md)の一部です。

## NextJSにおける`app`フォルダーの欠如[​](#app-absence "この見出しへの直接リンク")

NextJSのバージョン13未満では、明示的な`app`フォルダーは存在せず、代わりにNextJSは`_app.tsx`ファイルを提供しています。このファイルは、プロジェクトのすべてのページのラッピングコンポーネントとして機能しています。

### `pages/_app.tsx`ファイルへの機能のインポート[​](#pages_apptsxファイルへの機能のインポート "この見出しへの直接リンク")

NextJSの構造における`app`フォルダーの欠如の問題を解決するために、`app`層内に`App`コンポーネントを作成し、NextJSがそれを使用できるように`pages/_app.tsx`に`App`コンポーネントをインポートすることができます。例えば

```
// app/providers/index.tsx

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider1>
      <Provider2>
        <BaseLayout>
            <Component {...pageProps} />
        </BaseLayout>
      </Provider2>
    </Provider1>
  );
};

export default App;
```

その後、`App`コンポーネントとプロジェクトのグローバルスタイルを`pages/_app.tsx`に次のようにインポートできます。

```
// pages/_app.tsx

import 'app/styles/index.scss'

export { default } from 'app/providers';
```

## App Routerの使用[​](#app-router "この見出しへの直接リンク")

App Routerは、Next.jsのバージョン13.4で安定版として登場しました。App Routerを使用すると、`pages`フォルダーの代わりに`app`フォルダーをルーティングに使用できます。 FSDの原則に従うために、NextJSの`app`フォルダーを`pages`フォルダーとの名前衝突を解消するために推奨される方法で扱うべきです。

このアプローチは、NextJSの`app`フォルダーをプロジェクトのルートフォルダーに移動し、FSDのページをNextJSの`app`フォルダーにインポートすることに基づいています。これにより、`src`フォルダー内のFSDプロジェクト構造が保持されます。また、プロジェクトのルートフォルダーに`pages`フォルダーを追加することもお勧めします。なぜなら、App RouterはPages Routerと互換性があるからです。

```
├── app                # NextJSのappフォルダー
├── pages              # 空のNextJSのpagesフォルダー
│   ├── README.md      # このフォルダーの目的に関する説明
├── src
│   ├── app            # FSDのappフォルダー
│   ├── entities
│   ├── features
│   ├── pages          # FSDのpagesフォルダー
│   ├── shared
│   ├── widgets
```

[![StackBlitzで開く](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/stackblitz-starters-aiez55?file=README.md)
