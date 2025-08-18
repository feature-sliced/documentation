# ルーティング

WIP

この記事は執筆中です

その公開を早めるために、以下の方法があります。

* 📢 フィードバックを共有する [（チケットでのコメント/絵文字リアクション）](https://github.com/feature-sliced/documentation/issues/169)
* 💬 チャットでの議論結果をチケットにまとめる [（チャットURL）](https://t.me/feature_sliced)
* ⚒️ 他の方法で[貢献する](https://github.com/feature-sliced/documentation/blob/master/CONTRIBUTING.md)

<br />

*🍰 Stay tuned!*

## 状況[​](#situation "この見出しへの直接リンク")

ページへのURLが、pages層より下の層にハードコーディングされています。

entities/post/card

```

<Card>
    <Card.Title 
        href={`/post/${data.id}`}
        title={data.name}
    />
    ...
</Card>
```

## 問題[​](#problem "この見出しへの直接リンク")

URLがページ層に集中しておらず、責任範囲において適切な場所に配置されていません。

## 無視する場合[​](#if-you-ignore-it "この見出しへの直接リンク")

URLを変更する際に、URL（およびURL/リダイレクトのロジック）がpages層以外のすべての層に存在する可能性があることを考慮しなければなりません。

また、これは単純な商品カードでさえ、ページからの一部の責任を引き受けることを意味し、プロジェクト全体にロジックが分散してしまいます。

## 解決策[​](#solution "この見出しへの直接リンク")

URLやリダイレクトの処理をページ層およびそれ以上の層で定義することです。

URLを下層の層には、コンポジション/プロパティ/ファクトリーを通じて渡すことができます。
