# NuxtJSとの併用

NuxtJSプロジェクトでFSDを実装することは可能ですが、NuxtJSのプロジェクト構造要件とFSDの原則の違いにより、以下の2点でコンフリクトが発生してしまいます。

* NuxtJSは`src`フォルダーなしでプロジェクトのファイル構造を提供している。つまり、ファイル構造がプロジェクトのルートに配置される。
* ファイルルーティングは`pages`フォルダーにあるが、FSDではこのフォルダーはフラットなスライス構造に割り当てられている。

## `src`ディレクトリのエイリアスを追加する[​](#srcディレクトリのエイリアスを追加する "この見出しへの直接リンク")

設定ファイルに`alias`オブジェクトを追加します。

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // FSDには関係なく、プロジェクト起動時に有効
  alias: {
    "@": '../src'
  },
})
```

## ルーター設定方法の選択[​](#ルーター設定方法の選択 "この見出しへの直接リンク")

NuxtJSには、コンフィグを使用する方法とファイル構造を使用する方法の2つのルーティング設定方法があります。 ファイルベースのルーティングの場合、`app/routes`ディレクトリ内に`index.vue`ファイルを作成します。一方、コンフィグを使用する場合は、`router.options.ts`ファイルでルートを設定します。

### コンフィグによるルーティング[​](#コンフィグによるルーティング "この見出しへの直接リンク")

`app`層に`router.options.ts`ファイルを作成し、設定オブジェクトをエクスポートします。

app/router.options.ts

```
import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
  routes: (_routes) => [],
};
```

プロジェクトにホームページを追加するには、次の手順を行います。

* `pages`層内にページスライスを追加する
* `app/router.config.ts`のコンフィグに適切なルートを追加する

ページスライスを作成するには、[CLI](https://github.com/feature-sliced/cli)を使用します。

```
fsd pages home
```

`home-page.vue`ファイルを`ui`セグメント内に作成し、公開APIを介してアクセスできるようにします。

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page';
```

このように、ファイル構造は次のようになります。

```
|── src
│   ├── app
│   │   ├── router.config.ts
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.vue
│   │   │   ├── index.ts
```

最後に、ルートをコンフィグに追加します。

app/router.config.ts

```
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/home.vue').then(r => r.default || r)
    }
  ],
}
```

### ファイルルーティング[​](#ファイルルーティング "この見出しへの直接リンク")

まず、プロジェクトのルートに`src`ディレクトリを作成し、その中に`app`層と`pages`層のレイヤー、`app`層内に`routes`フォルダーを作成します。 このように、ファイル構造は次のようになります。

```
├── src
│   ├── app
│   │   ├── routes
│   ├── pages # FSDに割り当てられたpagesフォルダー
```

NuxtJSが`app`層内の`routes`フォルダーをファイルルーティングに使用するには、`nuxt.config.ts`を次のように変更します。

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // FSDには関係なく、プロジェクト起動時に有効
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes'
  }
})
```

これで、`app`層内のページに対してルートを作成し、`pages`層からページを接続できます。

例えば、プロジェクトに`Home`ページを追加するには、次の手順を行います。

* `pages`層内にページスライスを追加する
* `app`層内に適切なルートを追加する
* スライスのページをルートに接続する

ページスライスを作成するには、[CLI](https://github.com/feature-sliced/cli)を使用します。

```
fsd pages home
```

`home-page.vue`ファイルを`ui`セグメント内に作成し、公開APIを介してアクセスできるようにします。　

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page';
```

このページのルートを`app`層内に作成します。

```

├── src
│   ├── app
│   │   ├── routes
│   │   │   ├── index.vue
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.vue
│   │   │   ├── index.ts
```

`index.vue`ファイル内にページコンポーネントを追加します。

src/app/routes/index.vue

```
<script setup>
  import { HomePage } from '@/pages/home';
</script>

<template>
  <HomePage/>
</template>
```

## `layouts`について[​](#layoutsについて "この見出しへの直接リンク")

`layouts`は`app`層内に配置できます。そのためには、コンフィグを次のように変更します。

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // FSDには関係なく、プロジェクト起動時に有効
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes',
    layouts: './src/app/layouts'
  }
})
```

## 参照[​](#参照 "この見出しへの直接リンク")

* [NuxtJSのディレクトリ設定変更に関するドキュメント](https://nuxt.com/docs/api/nuxt-config#dir)
* [NuxtJSのルーター設定変更に関するドキュメント](https://nuxt.com/docs/guide/recipes/custom-routing#router-config)
* [NuxtJSのエイリアス設定変更に関するドキュメント](https://nuxt.com/docs/api/nuxt-config#alias)
