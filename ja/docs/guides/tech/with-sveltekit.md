# SvelteKitとの併用

SvelteKitプロジェクトでFSDを実装することは可能ですが、SvelteKitのプロジェクト構造要件とFSDの原則の違いにより、以下の2点でコンフリクトが発生してしまいます。

* SvelteKitは`src/routes`フォルダー内でファイル構造を作成することを提案しているが、FSDではルーティングは`app`層の一部である必要がある
* SvelteKitは、ルーティングに関係のないすべてのものを`src/lib`フォルダーに入れることを提案している

## コンフィグファイルの設定[​](#コンフィグファイルの設定 "この見出しへの直接リンク")

svelte.config.ts

```
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter(),
    files: {
      routes: 'src/app/routes', // ルーティングをapp層内に移動
      lib: 'src',
      appTemplate: 'src/app/index.html', // アプリケーションのエントリーポイントをapp層内に移動
      assets: 'public'
    },
    alias: {
        '@/*': 'src/*' // srcディレクトリのエイリアスを作成
    }
  }
};
export default config;
```

## `src/app`内へのファイルルーティングの移動[​](#srcapp内へのファイルルーティングの移動 "この見出しへの直接リンク")

`app`層を作成し、アプリケーションのエントリーポイントである`index.html`を移動し、`routes`フォルダーを作成します。 最終的にファイル構造は次のようになります。

```
├── src
│   ├── app
│   │   ├── index.html
│   │   ├── routes
│   ├── pages # FSDに割り当てられたpagesフォルダー
```

これで、`app`内にページのルートを作成したり、`pages`からのページをルートに接続したりできます。

例えば、プロジェクトにホームページを追加するには、次の手順を実行します。

* `pages`層内にホームページスライスを追加する
* `app`層の`routes`フォルダーに対応するルートを追加する
* スライスのページとルートを統合する

ホームページスライスを作成するには、[CLI](https://github.com/feature-sliced/cli)を使用します。

```
fsd pages home
```

`ui`セグメント内に`home-page.svelte`ファイルを作成し、公開APIを介してアクセスできるようにします。　

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page.svelte';
```

このページのルートを`app`層内に作成します。

```

├── src
│   ├── app
│   │   ├── routes
│   │   │   ├── +page.svelte
│   │   ├── index.html
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.svelte
│   │   │   ├── index.ts
```

最後に`+page.svelte`ファイル内にページコンポーネントを追加します。

src/app/routes/+page.svelte

```
<script>
  import { HomePage } from '@/pages/home';
</script>


<HomePage/>
```

## 参照[​](#参照 "この見出しへの直接リンク")

* [SvelteKitのディレクトリ設定変更に関するドキュメント](https://kit.svelte.dev/docs/configuration#files)
