# 与 NuxtJS 一起使用

可以在 NuxtJS 项目中实现 FSD，但由于 NuxtJS 项目结构要求与 FSD 原则之间的差异，会产生冲突：

* 最初，NuxtJS 提供的项目文件结构没有 `src` 文件夹，即在项目的根目录中。
* 文件路由在 `pages` 文件夹中，而在 FSD 中，此文件夹保留用于扁平 slice 结构。

## 为 `src` 目录添加别名[​](#为-src-目录添加别名 "标题的直接链接")

将 `alias` 对象添加到您的配置中：

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // Not FSD related, enabled at project startup
  alias: {
    "@": '../src'
  },
})
```

## 选择如何配置路由器[​](#选择如何配置路由器 "标题的直接链接")

在 NuxtJS 中，有两种自定义路由的方法 - 使用配置和使用文件结构。 在基于文件的路由情况下，您将在 app/routes 目录内的文件夹中创建 index.vue 文件，在配置情况下，您将在 `router.options.ts` 文件中配置路由器。

### 使用配置进行路由[​](#使用配置进行路由 "标题的直接链接")

在 `app` 层中，创建一个 `router.options.ts` 文件，并从中导出配置对象：

app/router.options.ts

```
import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
  routes: (_routes) => [],
};
```

要向项目添加 `Home` 页面，您需要执行以下步骤：

* 在 `pages` 层内添加页面 slice
* 将适当的路由添加到 `app/router.config.ts` 配置中

要创建页面 slice，让我们使用 [CLI](https://github.com/feature-sliced/cli)：

```
fsd pages home
```

在 ui segment 内创建一个 `home-page.vue` 文件，使用 Public API 访问它

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page';
```

因此，文件结构将如下所示：

```
├── src
│   ├── app
│   │   ├── router.config.ts
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.vue
│   │   │   ├── index.ts
```

最后，让我们向配置添加一个路由：

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

### 文件路由[​](#文件路由 "标题的直接链接")

首先，在项目根目录中创建一个`src`目录，并在此目录内创建app和pages层，以及在app层内创建一个routes文件夹。 因此，你的文件结构应该如下所示：

```
├── src
│   ├── app
│   │   ├── routes
│   ├── pages                         # Pages folder, related to FSD
```

为了让 NuxtJS 使用 `app` 层内的 routes 文件夹进行文件路由，您需要按如下方式修改 `nuxt.config.ts`：

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // Not FSD related, enabled at project startup
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes'
  }
})
```

现在，你可以在`app`内为页面创建路由，并将`pages`中的页面连接到它们。

例如，要向项目添加 `Home` 页面，您需要执行以下步骤：

* 在 `pages` 层内添加页面 slice
* 在 `app` 层内添加相应的路由
* 将 slice 中的页面与路由连接

要创建页面 slice，让我们使用 [CLI](https://github.com/feature-sliced/cli)：

```
fsd pages home
```

在 ui segment 内创建一个 `home-page.vue` 文件，使用 Public API 访问它

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page';
```

在 `app` 层内为此页面创建路由：

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

在 `index.vue` 文件内添加您的页面组件：

src/app/routes/index.vue

```
<script setup>
  import { HomePage } from '@/pages/home';
</script>

<template>
  <HomePage/>
</template>
```

## `layouts` 怎么办？[​](#layouts-怎么办 "标题的直接链接")

您可以将布局放在 `app` 层内，为此您需要按如下方式修改配置：

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // Not related to FSD, enabled at project startup
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes',
    layouts: './src/app/layouts'
  }
})
```

## 另请参阅[​](#另请参阅 "标题的直接链接")

* [NuxtJS 中更改目录配置的文档](https://nuxt.com/docs/api/nuxt-config#dir)
* [NuxtJS 中更改路由器配置的文档](https://nuxt.com/docs/guide/recipes/custom-routing#router-config)
* [NuxtJS 中更改别名的文档](https://nuxt.com/docs/api/nuxt-config#alias)
