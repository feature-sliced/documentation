# ページレイアウト

このガイドでは、複数のページが同じ構造を持ち、主な内容だけが異なる場合のページレイアウトの抽象化について説明します。

備考

あなたの質問がこのガイドにない場合は、この記事にフィードバックを残して質問を投稿してください（右側の青いボタン）、私たちはこのガイドを拡張する可能性を検討します！

## シンプルなレイアウト[​](#シンプルなレイアウト "この見出しへの直接リンク")

最もシンプルなレイアウトは、このページで直接見ることができます。これは、サイトのナビゲーションを含むヘッダー、2つのサイドバー、外部リンクを含むフッターを持っています。ここには複雑なビジネスロジックはなく、唯一の動的部分はサイドバーとヘッダーの右側にあるトグルスイッチです。このレイアウトは、`shared/ui`または`app/layouts`に全体を配置でき、サイドバーのコンテンツはプロパティを通じて埋め込むことができます。

shared/ui/layout/Layout.tsx

```
import { Link, Outlet } from "react-router-dom";
import { useThemeSwitcher } from "./useThemeSwitcher";

export function Layout({ siblingPages, headings }) {
  const [theme, toggleTheme] = useThemeSwitcher();

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li> <Link to="/">ホーム</Link> </li>
            <li> <Link to="/docs">ドキュメント</Link> </li>
            <li> <Link to="/blog">ブログ</Link> </li>
          </ul>
        </nav>
        <button onClick={toggleTheme}>{theme}</button>
      </header>
      <main>
        <SiblingPageSidebar siblingPages={siblingPages} />
        <Outlet /> {/* ここにページの主な内容が表示されます */}
        <HeadingsSidebar headings={headings} />
      </main>
      <footer>
        <ul>
          <li>GitHub</li>
          <li>X</li>
        </ul>
      </footer>
    </div>
  );
}
```

shared/ui/layout/useThemeSwitcher.ts

```
export function useThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, toggleTheme] as const;
}
```

サイドバーのコードは読者に課題として残されています！

## レイアウトでのウィジェットの使用[​](#レイアウトでのウィジェットの使用 "この見出しへの直接リンク")

時には、特定のビジネスロジックをレイアウトに組み込む必要があります。特に、[React Router](https://reactrouter.com/)のような深くネストされたルートを使用している場合、Shared層やWidgets層にレイアウトを保存することはできません。これは[レイヤーのインポートルール](/ja/docs/reference/layers.md#import-rule-on-layers)に違反しています。

> スライス内のモジュールは、下層にあるスライスのみをインポートできる。

解決策を議論する前に、これが実際に問題かどうかを確認する必要があります。このレイアウトは本当に必要なのか？もしそうなら、ウィジェットとして実装することが最適なのかも再考する必要があるでしょう。もしビジネスロジックのブロックが2〜3ページで使用され、レイアウトがそのウィジェットの小さなラッパーに過ぎない場合、次の2つのオプションを検討してください。

1. **レイアウトをApp層のルーターで直接作成する**<br /><!-- -->これは、ネストをサポートするルーターに最適です。特定のルートをグループ化し、必要なレイアウトをそれらにのみ適用できます。

2. **単にコピーする**<br /><!-- -->コードを抽象化する欲求はしばしば過大評価されます。特にレイアウトに関しては、変更がほとんどないためです。ある時点で、これらのページの1つが変更を必要とする場合、他のページに影響を与えずに変更を加えることができます。他のページを更新することを忘れるかもしれないと心配している場合は、ページ間の関係を説明するコメントを残すことができます。

上記のいずれのオプションも適用できない場合、ウィジェットをレイアウトに組み込むための2つの解決策があります。

1. **レンダープロップまたはスロットを使用する**<br /><!-- -->ほとんどのフレームワークは、UIの一部を外部から渡すことを許可しています。Reactではこれを[レンダープロップ](https://www.patterns.dev/react/render-props-pattern/)と呼び、Vueでは[スロット](https://jp.vuejs.org/guide/components/slots)と呼びます。

2. **レイアウトをApp層に移動する**<br /><!-- -->レイアウトをApp層に保存し、必要なウィジェットを組み合わせることもできます。

## 追加資料[​](#追加資料 "この見出しへの直接リンク")

* ReactとRemixを使用した認証付きレイアウトの作成例は[チュートリアル](/ja/docs/get-started/tutorial.md)で見つけることができます（React Routerに類似する）。
