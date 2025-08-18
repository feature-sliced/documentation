# デセグメンテーション

WIP

この記事は執筆中です

その公開を早めるために、以下の方法があります。

* 📢 フィードバックを共有する [（チケットでのコメント/絵文字リアクション）](https://github.com/feature-sliced/documentation/issues/148)
* 💬 チャットでの議論結果をチケットにまとめる [（チャットURL）](https://t.me/feature_sliced)
* ⚒️ 他の方法で[貢献する](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## 状況[​](#situation "この見出しへの直接リンク")

プロジェクトでは、特定のドメインに関連するモジュールが過度にデセグメント化され、プロジェクト全体に散らばっていることがよくあります。

```
├── components/
|    ├── DeliveryCard
|    ├── DeliveryChoice
|    ├── RegionSelect
|    ├── UserAvatar
├── actions/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── epics/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── constants/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── helpers/
|    ├── delivery.js
|    ├── region.js
|    ├── user.js
├── entities/
|    ├── delivery/
|    |      ├── getters.js
|    |      ├── selectors.js
|    ├── region/
|    ├── user/
```

## 問題[​](#problem "この見出しへの直接リンク")

問題は、**高い凝集性**の原則の違反と、**変更の軸**の過度な拡張として現れます。

## 無視する場合[​](#if-you-ignore-it "この見出しへの直接リンク")

* 例えば、配達に関するロジックに触れる必要がある場合、このロジックが複数の箇所に分散していることを考慮しなければならず、コード内で複数の箇所に触れる必要がある。これにより、**変更の軸**が過度に引き伸ばされる
* ユーザーに関するロジックを調べる必要がある場合、**actions、epics、constants、entities、components**の詳細を調べるためにプロジェクト全体を巡回しなければならない
* 暗黙関係と拡大するドメインの制御不能
  <!-- -->
  * このアプローチでは、視野が狭くなり、「定数のための定数」を作成し、プロジェクトの該当ディレクトリをごちゃごちゃさせてしまうことに気づかないことがよくある

## 解決策[​](#solution "この見出しへの直接リンク")

特定のドメイン/ユースケースに関連するすべてのモジュールを近くに配置することです。

これは特定のモジュールを調べる際に、そのすべての構成要素がプロジェクト全体に散らばらず、近くに配置されるためです。

> これにより、コードベースとモジュール間の関係の発見しやすさと明確さが向上します。

```
- ├── components/
- |    ├── DeliveryCard
- |    ├── DeliveryChoice
- |    ├── RegionSelect
- |    ├── UserAvatar
- ├── actions/
- |    ├── delivery.js
- |    ├── region.js
- |    ├── user.js
- ├── epics/{...}
- ├── constants/{...}
- ├── helpers/{...}
  ├── entities/
  |    ├── delivery/
+ |    |      ├── ui/ # ~ components/
+ |    |      |   ├── card.js
+ |    |      |   ├── choice.js
+ |    |      ├── model/
+ |    |      |   ├── actions.js
+ |    |      |   ├── constants.js
+ |    |      |   ├── epics.js
+ |    |      |   ├── getters.js
+ |    |      |   ├── selectors.js
+ |    |      ├── lib/ # ~ helpers
  |    ├── region/
  |    ├── user/
```

## 参照[​](#see-also "この見出しへの直接リンク")

* [(記事) Cohesion and Coupling: the difference](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
