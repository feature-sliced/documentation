# FAQ

備考

質問は、[Discordコミュニティ](https://discord.gg/S8MzWTUsmp)、[GitHub Discussions](https://github.com/feature-sliced/documentation/discussions)、および[Telegramチャット](https://t.me/feature_sliced)で聞くことができます。

### ツールキットやリンターはありますか？[​](#is-there-a-toolkit-or-a-linter "この見出しへの直接リンク")

はい！CLI または IDE を通じてプロジェクトのアーキテクチャと [フォルダー ジェネレーター](https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools) をチェックするための [Steiger](https://github.com/feature-sliced/steiger) というリンターがあります。

### ページのレイアウト/テンプレートはどこに保存すればよいですか？[​](#where-to-store-the-layouttemplate-of-pages "この見出しへの直接リンク")

シンプルなレイアウトテンプレートが必要な場合は、`shared/ui`に保存できます。より上層のレイヤーを使用する必要がある場合、いくつかのオプションがあります。

* レイアウトが本当に必要ですか？レイアウトが数行で構成されている場合、各ページにコードを重複させる方が合理的です。
* レイアウトが必要な場合は、個別のウィジェットやページとして保存し、App層のルーター設定にそれらを組み合わせることができます。ネストされたルーティングも一つのオプションです。

### フィーチャーとエンティティの違いは何ですか？[​](#what-is-the-difference-between-feature-and-entity "この見出しへの直接リンク")

*エンティティ*はアプリケーションが扱う現実世界の概念です。*フィーチャー*はユーザーに実際の価値を提供するインタラクションであり、ユーザーがエンティティで行いたいことです。

詳細および例については、参考書セクションの[スライスについてのページ](/ja/docs/reference/layers.md#entities)を参照してください。

### ページ/フィーチャー/エンティティを相互に埋め込むことはできますか？[​](#can-i-embed-pagesfeaturesentities-into-each-other "この見出しへの直接リンク")

はい、しかし、この埋め込みはより上層のレイヤーで行う必要があります。例えば、ウィジェット内で両方のフィーチャーをインポートし、プロップス/子要素として一方のフィーチャーを他方に挿入することができます。

一方のフィーチャーを他方のフィーチャーからインポートすることはできません。これは[**レイヤーのインポートルール**](/ja/docs/reference/layers.md#import-rule-on-layers)で禁止されています。

### Atomic Designはどうですか？[​](#what-about-atomic-design "この見出しへの直接リンク")

現在、アトミックデザインをFeature-Sliced Designと一緒に使用することを義務付けていませんが、禁止もしていません。

アトミックデザインは、モジュールの`ui`セグメントにうまく適用できます。

### FSDに関する有用なリソース/記事などはありますか？[​](#are-there-any-useful-resourcesarticlesetc-about-fsd "この見出しへの直接リンク")

はい！ <https://github.com/feature-sliced/awesome>

### なぜFeature-Sliced Designが必要なのですか？[​](#why-do-i-need-feature-sliced-design "この見出しへの直接リンク")

FSDは、プロジェクトの主要な価値を提供するコンポーネントの観点から、あなたとあなたのチームが迅速にプロジェクトを把握するのに役立ちます。標準化されたアーキテクチャは、オンボーディングを迅速化し、コード構造に関する議論を解決するのに役立ちます。FSDが作成された理由については、[モチベーション](/ja/docs/about/motivation.md)のページを参照してください。

### 初心者の開発者にFSDのアーキテクチャ/設計方法論は必要ですか？[​](#does-a-novice-developer-need-an-architecturemethodology "この見出しへの直接リンク")

おそらく必要です。

*通常、一人でプロジェクトを設計・開発する場合、すべてが順調に進みます。しかし、開発に中断が生じたり、新しい開発者がチームに加わると問題が発生します。*

### 認証コンテキストをどのように扱えばよいですか？[​](#how-do-i-work-with-the-authorization-context "この見出しへの直接リンク")

[こちら](/ja/docs/guides/examples/auth.md)で回答しています。
