# 与 SvelteKit 一起使用

可以在 SvelteKit 项目中实现 FSD，但由于 SvelteKit 项目的结构要求与 FSD 原则之间的差异，会产生冲突：

* 最初，SvelteKit 在 `src/routes` 文件夹内提供文件结构，而在 FSD 中，路由必须是 `app` 层的一部分。
* SvelteKit 建议将与路由无关的所有内容放在 `src/lib` 文件夹中。

## 让我们设置配置[​](#让我们设置配置 "标题的直接链接")

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
      routes: 'src/app/routes',             // move routing inside the app layer
      lib: 'src',
      appTemplate: 'src/app/index.html',    // Move the application entry point inside the app layer
      assets: 'public'
    },
    alias: {
      '@/*': 'src/*'                        // Create an alias for the src directory
    }
  }
};
export default config;
```

## 将文件路由移动到 `src/app`。[​](#将文件路由移动到-srcapp "标题的直接链接")

让我们创建一个 app 层，将应用程序的入口点 `index.html` 移动到其中，并创建一个 routes 文件夹。 因此，您的文件结构应该如下所示：

```
├── src
│   ├── app
│   │   ├── index.html
│   │   ├── routes
│   ├── pages                               # FSD Pages folder
```

现在，您可以在 `app` 内为页面创建路由，并将 `pages` 中的页面连接到它们。

例如，要向项目添加主页，您需要执行以下步骤：

* 在 `pages` 层内添加页面 slice
* 从 `app` 层向 `routes` 文件夹添加相应的路由
* 将 slice 中的页面与路由对齐

要创建页面 slice，让我们使用 [CLI](https://github.com/feature-sliced/cli)：

```
fsd pages home
```

在 ui segment 内创建 `home-page.svelte` 文件，使用公共 API 访问它

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page.svelte';
```

在 `app` 层内为此页面创建路由：

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

在 `+page.svelte` 文件中添加您的页面组件：

src/app/routes/+page.svelte

```
<script>
  import { HomePage } from '@/pages/home';
</script>


<HomePage/>
```

## 另请参阅[​](#另请参阅 "标题的直接链接")

* [SvelteKit 中更改目录配置的文档](https://kit.svelte.dev/docs/configuration#files)
