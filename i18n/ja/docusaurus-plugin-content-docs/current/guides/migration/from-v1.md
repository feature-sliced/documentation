---
sidebar_position: 2
---

# v1からv2への移行

## なぜv2なのか？ {#why-v2}

初期の**feature-slices**の概念は、2018年に提唱されました。

それ以来、FSD方法論は多くの変革を経てきましたが、基本的な原則は保持されています。

- *標準化された*フロントエンドプロジェクト構造の使用
- アプリケーションを*ビジネスロジック*に基づいて分割
- *孤立した機能*の使用により、暗黙の副作用や循環依存を防止
- モジュールの「内部」にアクセスすることを禁止する*公開API*の使用

しかし、以前のバージョンのFSD方法論には依然として**弱点が残っていました**。

- ボイラープレートの発生
- コードベースの過剰な複雑化と抽象化間の明確でないルール
- プロジェクトのメンテナンスや新しいメンバーのオンボーディングを妨げていた暗黙のアーキテクチャ的決定

新しいバージョンのFSD方法論（[v2][ext-v2]）は、**これらの欠点を解消しつつ、既存の利点を保持することを目的としています**。

2018年以降、[**feature-driven**][ext-fdd]という別の類似の方法論が[発展してきました][ext-fdd-issues]。それを最初に提唱したのは[Oleg Isonen][ext-kof]でした。

2つのアプローチの統合により、**既存のプラクティスが改善され、柔軟性、明確さ、効率が向上しました**。

> 結果として、方法論の名称も「feature-slice**d**」に変更されました。

## なぜプロジェクトをv2に移行する意味があるのか？ {#why-does-it-make-sense-to-migrate-the-project-to-v2}

> `WIP:` 現在の方法論のバージョンは開発中であり、一部の詳細は*変更される可能性があります*。

#### 🔍 より透明でシンプルなアーキテクチャ {#-more-transparent-and-simple-architecture}

FSD（v2）は、**より直感的で、開発者の間で広く受け入れられている抽象化とロジックの分割方法を提供しています**。

これにより、新しいメンバーの参加やプロジェクトの現状理解、アプリケーションのビジネスロジック分配に非常に良い影響を与えます。

#### 📦 より柔軟で誠実なモジュール性 {#-more-flexible-and-honest-modularity}

FSD（v2）は、**より柔軟な方法でロジックを分配することを可能にしています**。

- 孤立した部分をゼロからリファクタリングできる
- 同じ抽象化に依存しつつ、余計な依存関係の絡みを避けられる
- 新しいモジュールの配置をよりシンプルにできる *(layer → slice → segment)*

#### 🚀 より多くの仕様、計画、コミュニティ {#-more-specifications-plans-community}

`core-team`は最新の（v2）バージョンのFSD方法論に積極的に取り組んでいます。

したがって、以下のことが期待できます。

- より多くの記述されたケース/問題
- より多くの適用ガイド
- より多くの実例
- 新しいメンバーのオンボーディングや方法論概念の学習のための全体的な文書の増加
- 方法論の概念とアーキテクチャに関するコンベンションを遵守するためのツールキットのさらなる発展

> もちろん、初版に対するユーザーサポートも行われますが、私たちにとっては最新のバージョンが最優先です。

> 将来的には、次のメジャーアップデートの際に、現在のバージョン（v2）へのアクセスが保持され、**チームやプロジェクトにリスクをもたらすことはありません**。

## Changelog

### `BREAKING` Layers

FSD方法論は上位レベルでの層の明示的な分離を前提としています。

- `/app` > `/processes` > **`/pages`** > **`/features`** > `/entities` > `/shared`
- *つまり、すべてがフィーチャーやページとして解釈されるわけではない*
- このアプローチにより、層のルールを明示的に設定することが可能になる
  - モジュールの**層が高いほど**、より多くの**コンテキスト**を持つことができる
  
    *(言い換えれば、各層のモジュールは、下層のモジュールのみをインポートでき、上層のモジュールはインポートできない)*
  - モジュールの**層が低いほど**、変更を加える際の**危険性と責任**が増す
  
    *(一般的に、再利用されるのは下層のモジュールらからである)*

### `BREAKING` Shared層

以前はプロジェクトのsrcルートにあったインフラストラクチャの `/ui`, `/lib`, `/api` 抽象化は、現在 `/src/shared` という別のディレクトリに分離されています。

- `shared/ui` - アプリケーションの共通UIキット（オプション）
  - *ここで`Atomic Design`を使用することは引き続き許可されている*
- `shared/lib` - ロジックを実装するための補助ライブラリセット
  - *引き続き、ヘルパー関数の「ごみ屋敷」を作らずに*
- `shared/api` - APIへのアクセスのための共通エントリポイント
  - *各フィーチャー/ページにローカルに記述することも可能だが、推奨されない*
- 以前と同様に、`shared`にはビジネスロジックへの明示的な依存関係があってはならない
  - *必要に応じて、この依存関係は`entities`、またはそれ以上の層に移動する必要がある*

### `新規` Entities層, Processes層

v2では、**ロジックの複雑さと強い結合の問題を解消するために、新しい抽象化が追加されました**。

- `/entities` - **ビジネスエンティティ**の層で、ビジネスモデルやフロントエンド専用の合成エンティティに関連するスライスを含む
  - *例：`user`, `i18n`, `order`, `blog`*
- `/processes` - アプリケーション全体にわたる**ビジネスプロセス**の層
  - **この層はオプションであり、通常は*ロジックが拡大し、複数のページにまたがる場合に使用が推奨される***
  - *例：`payment`, `auth`, `quick-tour`*

### `BREAKING` 抽象化と命名

具体的な抽象化とその命名に関する[明確なガイドライン][refs-adaptability]が定義されています。

#### Layers

- `/app` — **アプリケーションの初期化層**
  - *以前のバリエーション: `app`, `core`, `init`, `src/index`*
- `/processes` — **ビジネスプロセスの層**
  - *以前のバリエーション: `processes`, `flows`, `workflows`*
- `/pages` — **アプリケーションのページ層**
  - *以前のバリエーション: `pages`, `screens`, `views`, `layouts`, `components`, `containers`*
- `/features` — **機能部分の層**
  - *以前のバリエーション: `features`, `components`, `containers`*
- `/entities` — **ビジネスエンティティの層**
  - *以前のバリエーション: `entities`, `models`, `shared`*
- `/shared` — **再利用可能なインフラストラクチャコードの層** 🔥
  - *以前のバリエーション: `shared`, `common`, `lib`*

#### Segments

- `/ui` — **UIセグメント** 🔥
  - *以前のバリエーション：`ui`, `components`, `view`*
- `/model` — **ビジネスロジックのセグメント** 🔥
  - *以前のバリエーション：`model`, `store`, `state`, `services`, `controller`*
- `/lib` — **補助コードのセグメント**
  - *以前のバリエーション：`lib`, `libs`, `utils`, `helpers`*
- `/api` — **APIセグメント**
  - *以前のバリエーション：`api`, `service`, `requests`, `queries`*
- `/config` — **アプリケーション設定のセグメント**
  - *以前のバリエーション：`config`, `env`, `get-env`*

### `REFINED` 低結合

新しいレイヤーのおかげで、モジュール間の[低結合の原則][refs-low-coupling]を遵守することがはるかに簡単になりました。

*それでも、モジュールを「切り離す」ことが非常に難しい場合は、できるだけ避けることが推奨されます*。

## 参照 {#see-also}

- [React Berlin Talk - Oleg Isonen "Feature Driven Architecture"][ext-kof-fdd]

[refs-low-coupling]: /docs/reference/slices-segments#zero-coupling-high-cohesion
[refs-adaptability]: /docs/about/understanding/naming

[ext-fdd]: https://github.com/feature-sliced/documentation/tree/rc/feature-driven
[ext-fdd-issues]: https://github.com/kof/feature-driven-architecture/issues
[ext-v2]: https://github.com/feature-sliced/documentation
[ext-kof]: https://github.com/kof
[ext-kof-fdd]: https://www.youtube.com/watch?v=BWAeYuWFHhs
