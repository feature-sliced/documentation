---
sidebar_position: 3
sidebar_label: 公開API
pagination_next: about/index
---

# 公開API

FSDでの各エンティティは、**使いやすく統合しやすいモジュール**として設計されています。

## 目的 {#goals}

モジュールの使いやすさと統合しやすさは、*いくつかの目的*を達成することによって実現されます。

1. アプリケーションは、個々モジュール内部構造の**変更から保護されるべき**
1. モジュール内部構造の再設計は、**他のモジュールに影響を与えてはならない**
1. モジュールの動作の重要な変更は、**簡単に特定できるべき**
    > **モジュールの動作に関する重要な変更**とは、モジュール利用者の期待を壊す変更

これらの目的を達成するために、公開API（公開インターフェース）が導入され、モジュール機能への単一アクセス点を提供し、モジュールと外部世界との相互作用の「契約」を定義します。

:::info 重要

エンティティの構造は、公開APIを提供する単一のエントリーポイントを持つべき

:::

```sh
└── features/                          # 
   └── auth-form/                      # フィーチャーの内部構造
            ├── ui/                    #
            ├── model/                 #
            ├── {...}/                 #
            └── index.ts               # フィーチャーの公開APIを持つエントリーポイント
```

```ts title="**/**/index.ts"
export { Form as AuthForm } from "./ui"
export * as authFormModel from "./model"
```

## 公開APIの要件 {#requirements-for-the-public-api}

下記の要件を満たすことで、モジュールとの相互作用を**公開API契約の実行**に制限し、モジュールの信頼性と使いやすさを達成できます。

### 1. アクセス制御 {#1-access-control}

公開APIは、モジュール内容への**アクセス制御**を行うべきです。

- アプリケーションの他の部分は、**公開APIで提供されるモジュールのエンティティのみを使用できる**
- 公開APIのないモジュールの内部部分は、**モジュール自身のみがアクセスできる**

#### 例 {#examples}

##### プライベートインポートからの排除 {#suspension-from-private-imports}

- **悪い例**: 公開APIをバイパスしてモジュールの内部部分に直接アクセスすることは危険であり、特にモジュールのリファクタリング時に問題を引き起こす可能性がある。

    ```diff
    - import { Form } from "features/auth-form/components/view/form"
    ```

- **良い例**: APIは事前に必要なものだけをエクスポートし、モジュールの開発者はリファクタリング時に公開APIを壊さないことだけを考えればよい。

    ```diff
    + import { AuthForm } from "features/auth-form"
    ```

### 2. 変更への耐性 {#2-sustainability-for-changes}

公開APIは、モジュール内部の**変更に対して耐性があるべきです**。

- モジュールの動作を壊す変更は、公開APIの変更として反映されるべき

#### 例 {#examples}

##### 実装からの抽象化 {#abstracting-from-the-implementation}

内部構造の変更は、公開APIの変更を引き起こすべきではありません。

- **悪い例**: このコンポーネントをフィーチャー内で移動、または名前変更すると、すべての使用場所でインポートをリファクタリングする必要が生じる。

    ```diff
    - import { Form } from "features/auth-form/ui/form"
    ```

- **良い例**: フィーチャーのインターフェースは内部構造を反映せず、外部の「ユーザー」はフィーチャー内のコンポーネントの移動や名前変更の影響を受けない。

    ```diff
    + import { AuthForm } from "features/auth-form"
    ```

### 3. 統合性 {#3-integrability}

公開APIは、**簡単で柔軟な統合を促進するべきです**。

- 公開APIは、アプリケーションの他の部分での使用が便利であり、特に名前衝突問題を解決する必要がある。

#### 例 {#examples}

##### 名前の衝突 {#name-collision}

- **悪い例**: 名前の衝突が発生してしまう。

    ```ts title="features/auth-form/index.ts"
    export { Form } from "./ui"
    export * as model from "./model"
    ```

    ```ts title="features/post-form/index.ts"
    export { Form } from "./ui"
    export * as model from "./model"
    ```

    ```diff
    - import { Form, model } from "features/auth-form"
    - import { Form, model } from "features/post-form"
    ```

- **良い例**: インターフェースレベルで名前の衝突が解決される。

    ```ts title="features/auth-form/index.ts"
    export { Form as AuthForm } from "./ui"
    export * as authFormModel from "./model"
    ```

    ```ts title="features/post-form/index.ts"
    export { Form as PostForm } from "./ui"
    export * as postFormModel from "./model"
    ```

    ```diff
    + import { AuthForm, authFormModel } from "features/auth-form"
    + import { PostForm, postFormModel } from "features/post-form"
    ```

##### 柔軟な使用 {#flexible-use}

- **悪い例**: 書きにくく、読みづらく、「ユーザー」は不便を感じます。

    ```diff
    - import { storeActionUpdateUserDetails } from "features/auth-form"
    - dispatch(storeActionUpdateUserDetails(...))
    ```

- **良い例**: 「ユーザー」は必要なものに対して反復的かつ柔軟にアクセスできます。

    ```diff
    + import { authFormModel } from "features/auth-form"
    + dispatch(authFormModel.effects.updateUserDetails(...)) // redux
    + authFormModel.updateUserDetailsFx(...) // effector
    ```

##### 衝突の解決 {#resolution-of-collisions}

名前の衝突は、実装レベルではなく公開APIのレベルで解決されるべきです。

- **悪い例**: 名前の衝突が実装レベルで解決される。

    ```ts title="features/auth-form/index.ts"
    export { AuthForm } from "./ui"
    export { authFormActions, authFormReducer } from "model"
    ```

    ```ts title="features/post-form/index.ts"
    export { PostForm } from "./ui"
    export { postFormActions, postFormReducer } from "model"
    ```

- **良い例**: 名前の衝突がインターフェースレベルで解決される。

    ```ts title="features/auth-form/model.ts"
    export { actions, reducer }
    ```

    ```ts title="features/auth-form/index.ts"
    export { Form as AuthForm } from "./ui"
    export * as authFormModel from "./model"
    ```

     ```ts title="features/post-form/model.ts"
    export { actions, reducer }
    ```

    ```ts title="features/post-form/index.ts"
    export { Form as PostForm } from "./ui"
    export * as postFormModel from "./model"
    ```

## 再エクスポートについて {#about-re-exports}

JavaScriptでは、モジュールの公開APIは、モジュール内部のエンティティを`index`ファイルで再エクスポートすることによって作成されます。

```ts title="**/**/index.ts"
export { Form as AuthForm } from "./ui"
export * as authModel from "./model"
```

### 欠点 {#disadvantages}

- ほとんどの人気のバンドラーでは、再エクスポートのために**コード分割の効果が低下してしまいます**。なぜなら、このアプローチでは[ツリーシェイキング](https://webpack.js.org/guides/tree-shaking/)が安全にモジュール全体しか削除することができないからです。
   > 例えば、ページモデルで`authModel`をインポートすると、たとえ使用されていなくても、`AuthForm`コンポーネントがそのページのチャンクに含まれてしまいます。

- 結果として、チャンクの初期化が高コストになり、ブラウザはその中のすべてのモジュールを処理する必要があります。

### 可能な解決策 {#possible-solutions}

- `webpack`は、再エクスポートファイルを[**副作用なし**](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)としてマークすることを可能にしています。これにより、`webpack`はそのファイルを扱う際に攻撃的な最適化を使用できるようになります。

## 参照 {#see-also}

- [**SOLID**原則][ext-solid]
- [**GRASP**パターン][ext-grasp]

[ext-solid]: https://ja.wikipedia.org/wiki/SOLID
[ext-grasp]: https://ja.wikipedia.org/wiki/GRASP
