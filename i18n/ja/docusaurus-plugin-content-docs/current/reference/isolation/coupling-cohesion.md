---
sidebar_position: 1
---

# 低結合と高凝集

アプリケーションのモジュールは、**強い結合性**（明確なタスクを解決することに焦点を当てる）と**弱い結合性**（他のモジュールからできるだけ依存しない）を持つように設計されるべきです。

<figure>
    <img src="/img/coupling-cohesion-light.svg#light-mode-only" alt="" />
    <img src="/img/coupling-cohesion-dark.svg#dark-mode-only" alt="" />
    <figcaption>
        インスパイア先: https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/
    </figcaption>
</figure>

FSDでは、以下の方法で達成されます。

* アプリケーションを層とスライスに分割する - 特定の機能を実現するモジュール。
* 各モジュールには、[公開API][refs-public-api]を提供することが求められます。
* モジュール間の相互作用に特別な制限を設ける - 各モジュールは「下位」のモジュールにのみ依存でき、同じ層またはそれ以上の層のモジュールには依存できません。

## コンポーネントの構成（UIレベル） {#components-composition-ui-level}

ほとんどの現代のUIフレームワークやライブラリは、各コンポーネントが独自のプロパティ、状態、子コンポーネントを持つことができるコンポーネントモデルを提供しています。

このモデルにより、**直接的に関連しないさまざまなコンポーネントの構成**としてインターフェースを構築し、**コンポーネントの弱い結合性**を達成することができます。

### 例 {#example}

**ヘッダー付きリスト**の例を考えてみましょう。

#### 拡張性を考慮する {#laying-the-extensibility}

リストコンポーネントは、ヘッダーとリストアイテムの構造を自ら定義せず、代わりにそれらをパラメータとして受け取ります。

```tsx
interface ListProps {
    Header: React.ReactNode;
    Items: React.ReactNode;
}

const List: Component<ListProps> = ({ Header, Items }) => (
    <div class="wrapper">
        {Header}
        <ul class="...">
            {Items}
        </ul>
    </div>
)
```

#### 構成を使用する {#using-the-composition}

これにより、**異なるバージョンのヘッダーやリストアイテムのコンポーネントを再利用し、独立して変更する**ことが可能になります。ヘッダーとリストアイテムのコンポーネントは、それぞれ独自のローカル状態やアプリケーションの共通状態の任意の部分へのバインディングを持つことができ、リストコンポーネントはそれについて何も知らず、したがってそれに依存しません。

```tsx
<List Header={<FancyHeader />} Items={<ToDoItems />} />

<List Items={<CartItems />} />

<List Header={<FancyHeaderV2 color="red" />} Items={<FancyItems />} />
```

## 層の構成（アプリレベル） {#layer-composition-app-level}

FSDは、ユーザーにとって価値のある機能を個別のモジュール - **フィーチャー（features）** - に分割し、ビジネスエンティティに関連するロジックを**エンティティ（entities）**に分けることを提案します。フィーチャーとエンティティは、**高い結合性を持つモジュール**として設計されるべきであり、すなわち**特定のタスクを解決することに焦点を当てる**か、**特定のエンティティの周りに集中する**べきです。

これらのモジュール間のすべての相互作用は、上記のUIコンポーネントの例と同様に、**さまざまなモジュールの構成**として整理されるべきです。

### 例 {#example}

チャットアプリケーションの例を考えてみましょう。

* 連絡先リストを開いて友達を選択できる
* 選択した友達とのチャットを開くことができる

FSDに基づいて、次のように表現できます。

エンティティ

* ユーザー（ユーザーの状態を含む）
* 連絡先（連絡先リストの状態、特定の連絡先を操作するためのツール）
* チャット（現在のチャットの状態とその操作）

フィーチャー

* メッセージ送信フォーム
* チャット選択メニュー

#### すべてを結びつける {#lets-tie-it-all-together}

アプリケーションには、最初に1つのページがあり、インターフェースは最初の例の少し修正されたコンポーネントに基づいています。

```tsx title="page/main/ui.tsx"
<List
    Header={<ConversationSwitch />}
    Items={<Messages />}
    Footer={<MessageInput />}
/>
```

#### データモデル {#data-model}

ページのデータモデルは、**フィーチャーとエンティティの構成**として整理されます。この例では、フィーチャーはファクトリーとして実装され、これらのファクトリーのパラメータを介してエンティティのインターフェースにアクセスします。

> ただし、ファクトリーとしての実装は必須ではなく、フィーチャーは下位層に依存し、直接的にアクセスすることもできます。

```ts title="pages/main/model.ts"
import { userModel } from "entitites/user"
import { conversationModel } from "entities/conversation"
import { contactModel } from "entities/contact"

import { createMessageInput } from "features/message-input"
import { createConversationSwitch } from "features/conversation-switch"

import { beautifiy } from "shared/lib/beautify-text"

export const { allConversations, setConversation } = createConversationSwitch({
    contacts: contactModel.allContacts,
    setConversation: conversationModel.setConversation,
    currentConversation: conversationModel.conversation,
    currentUser: userModel.currentUser
})

export const { sendMessage, attachFile } = createMessageInput({
    author: userModel.currentUser,
    send: conversationModel.sendMessage,
    formatMessage: beautify
})
```

## まとめ {#summary}

1. モジュールは**強い結合性**を持つべきであり（1つの責任を持ち、特定のタスクを解決する）、[**公開API**][refs-public-api]を提供する必要があります。
2. **弱い結合性**は、UIコンポーネント、フィーチャー、エンティティの要素の構成を通じて達成されます。
3. また、結合性を低下させるために、モジュールは**公開APIを介してのみ互いに依存するべきです** - これにより、モジュールは互いの内部実装から独立します。

## 参照 {#see-also}

* [(記事) 低結合と高凝集についての視覚的説明](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
  * *最初の図はこの論文からインスパイアを受けています*
* [(記事) 低結合と高凝集。デメトリの法則](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
* [(プレゼンテーション) 設計原則について（低結合と高凝集を含む）](https://www.slideshare.net/cristalngo/software-design-principles-57388843)

[refs-public-api]: /docs/reference/public-api
