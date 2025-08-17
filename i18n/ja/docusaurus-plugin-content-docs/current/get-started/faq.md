---
sidebar_position: 20
pagination_next: guides/examples/auth
---

# FAQ

:::info

質問は、[Discordコミュニティ][discord]、[GitHub Discussions][github-discussions]、および[Telegramチャット][telegram]で聞くことができます。

:::

### ツールキットやリンターはありますか？ {#is-there-a-toolkit-or-a-linter}

はい！CLI または IDE を通じてプロジェクトのアーキテクチャと [フォルダー ジェネレーター][ext-tools] をチェックするための [Steiger][ext-steiger] というリンターがあります。

### ページのレイアウト/テンプレートはどこに保存すればよいですか？ {#where-to-store-the-layouttemplate-of-pages}

シンプルなレイアウトテンプレートが必要な場合は、`shared/ui`に保存できます。より上層のレイヤーを使用する必要がある場合、いくつかのオプションがあります。

- レイアウトが本当に必要ですか？レイアウトが数行で構成されている場合、各ページにコードを重複させる方が合理的です。
- レイアウトが必要な場合は、個別のウィジェットやページとして保存し、App層のルーター設定にそれらを組み合わせることができます。ネストされたルーティングも一つのオプションです。

### フィーチャーとエンティティの違いは何ですか？ {#what-is-the-difference-between-feature-and-entity}

<i>エンティティ</i>はアプリケーションが扱う現実世界の概念です。<i>フィーチャー</i>はユーザーに実際の価値を提供するインタラクションであり、ユーザーがエンティティで行いたいことです。

詳細および例については、参考書セクションの[スライスについてのページ][reference-entities]を参照してください。

### ページ/フィーチャー/エンティティを相互に埋め込むことはできますか？ {#can-i-embed-pagesfeaturesentities-into-each-other}

はい、しかし、この埋め込みはより上層のレイヤーで行う必要があります。例えば、ウィジェット内で両方のフィーチャーをインポートし、プロップス/子要素として一方のフィーチャーを他方に挿入することができます。

一方のフィーチャーを他方のフィーチャーからインポートすることはできません。これは[**レイヤーのインポートルール**][import-rule-layers]で禁止されています。

### Atomic Designはどうですか？ {#what-about-atomic-design}

現在、アトミックデザインをFeature-Sliced Designと一緒に使用することを義務付けていませんが、禁止もしていません。

アトミックデザインは、モジュールの`ui`セグメントにうまく適用できます。

### FSDに関する有用なリソース/記事などはありますか？ {#are-there-any-useful-resourcesarticlesetc-about-fsd}

はい！ https://github.com/feature-sliced/awesome

### なぜFeature-Sliced Designが必要なのですか？ {#why-do-i-need-feature-sliced-design}

FSDは、プロジェクトの主要な価値を提供するコンポーネントの観点から、あなたとあなたのチームが迅速にプロジェクトを把握するのに役立ちます。標準化されたアーキテクチャは、オンボーディングを迅速化し、コード構造に関する議論を解決するのに役立ちます。FSDが作成された理由については、[モチベーション][motivation]のページを参照してください。

### 初心者の開発者にFSDのアーキテクチャ/設計方法論は必要ですか？ {#does-a-novice-developer-need-an-architecturemethodology}

おそらく必要です。

*通常、一人でプロジェクトを設計・開発する場合、すべてが順調に進みます。しかし、開発に中断が生じたり、新しい開発者がチームに加わると問題が発生します。*

### 認証コンテキストをどのように扱えばよいですか？ {#how-do-i-work-with-the-authorization-context}

[こちら](/docs/guides/examples/auth)で回答しています。

[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-tools]: https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools
[import-rule-layers]: /docs/reference/layers#import-rule-on-layers
[reference-entities]: /docs/reference/layers#entities
[motivation]: /docs/about/motivation
[telegram]: https://t.me/feature_sliced
[discord]: https://discord.gg/S8MzWTUsmp
[github-discussions]: https://github.com/feature-sliced/documentation/discussions
