# 与 Next.js 一起使用

如果您解决了主要冲突——`app` 和 `pages` 文件夹，FSD 与 Next.js 的 App Router 版本和 Pages Router 版本都兼容。

## App Router[​](#app-router "标题的直接链接")

### FSD 和 Next.js 在 `app` 层中的冲突[​](#conflict-between-fsd-and-nextjs-in-the-app-layer "标题的直接链接")

Next.js 建议使用 `app` 文件夹来定义应用程序路由。它期望 `app` 文件夹中的文件对应于路径名。这种路由机制**与 FSD 概念不一致**，因为无法维护扁平的 slice 结构。

解决方案是将 Next.js 的 `app` 文件夹移动到项目根目录，并将 FSD 页面从 `src`（FSD 层所在的位置）导入到 Next.js 的 `app` 文件夹中。

您还需要在项目根目录中添加一个 `pages` 文件夹，否则即使您使用 App Router，Next.js 也会尝试将 `src/pages` 用作 Pages Router，这会破坏构建。在这个根 `pages` 文件夹中放置一个 `README.md` 文件来描述为什么它是必要的也是一个好主意，即使它是空的。

```
├── app                              # App folder (Next.js)
│   ├── api
│   │   └── get-example
│   │       └── route.ts
│   └── example
│       └── page.tsx
├── pages                            # Empty pages folder (Next.js)
│   └── README.md
└── src
    ├── app
    │   └── api-routes               # API routes
    ├── pages
    │   └── example
    │       ├── index.ts
    │       └── ui
    │           └── example.tsx
    ├── widgets
    ├── features
    ├── entities
    └── shared
```

在 Next.js `app` 中从 `src/pages` 重新导出页面的示例：

app/example/page.tsx

```
export { ExamplePage as default, metadata } from '@/pages/example';
```

### 中间件[​](#middleware "标题的直接链接")

如果您在项目中使用中间件，它必须位于项目根目录中，与 Next.js 的 `app` 和 `pages` 文件夹并列。

### 检测[​](#instrumentation "标题的直接链接")

`instrumentation.js` 文件允许您监控应用程序的性能和行为。如果您使用它，它必须位于项目根目录中，类似于 `middleware.js`。

## Pages Router[​](#pages-router "标题的直接链接")

### FSD 和 Next.js 在 `pages` 层中的冲突[​](#conflict-between-fsd-and-nextjs-in-the-pages-layer "标题的直接链接")

路由应该放在项目根目录的 `pages` 文件夹中，类似于 App Router 的 `app` 文件夹。`src` 内部层文件夹所在的结构保持不变。

```
├── pages                            # Pages folder (Next.js)
│   ├── _app.tsx
│   ├── api
│   │   └── example.ts               # API route re-export
│   └── example
│       └── index.tsx
└── src
    ├── app
    │   ├── custom-app
    │   │   └── custom-app.tsx       # Custom App component
    │   └── api-routes
    │       └── get-example-data.ts  # API route
    ├── pages
    │   └── example
    │       ├── index.ts
    │       └── ui
    │           └── example.tsx
    ├── widgets
    ├── features
    ├── entities
    └── shared
```

在 Next.js `pages` 中从 `src/pages` 重新导出页面的示例：

pages/example/index.tsx

```
export { Example as default } from '@/pages/example';
```

### 自定义 `_app` 组件[​](#custom-_app-component "标题的直接链接")

您可以将自定义 App 组件放在 `src/app/_app` 或 `src/app/custom-app` 中：

src/app/custom-app/custom-app.tsx

```
import type { AppProps } from 'next/app';

export const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <p>My Custom App component</p>
            <Component { ...pageProps } />
        </>
    );
};
```

pages/\_app.tsx

```
export { App as default } from '@/app/custom-app';
```

## 路由处理程序（API 路由）[​](#route-handlers-api-routes "标题的直接链接")

使用 `app` 层中的 `api-routes` segment 来处理路由处理程序。

在 FSD 结构中编写后端代码时要谨慎——FSD 主要用于前端，这意味着人们会期望找到前端代码。 如果您需要很多端点，请考虑将它们分离到 monorepo 中的不同包中。

* App Router
* Pages Router

src/app/api-routes/get-example-data.ts

```
import { getExamplesList } from '@/shared/db';

export const getExampleData = () => {
    try {
        const examplesList = getExamplesList();

        return Response.json({ examplesList });
    } catch {
        return Response.json(null, {
            status: 500,
            statusText: 'Ouch, something went wrong',
        });
    }
};
```

app/api/example/route.ts

```
export { getExampleData as GET } from '@/app/api-routes';
```

src/app/api-routes/get-example-data.ts

```
import type { NextApiRequest, NextApiResponse } from 'next';

const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
    maxDuration: 5,
};

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    res.status(200).json({ message: 'Hello from FSD' });
};

export const getExampleData = { config, handler } as const;
```

src/app/api-routes/index.ts

```
export { getExampleData } from './get-example-data';
```

app/api/example.ts

```
import { getExampleData } from '@/app/api-routes';

export const config = getExampleData.config;
export default getExampleData.handler;
```

## Additional recommendations[​](#additional-recommendations "标题的直接链接")

* Use the `db` segment in the `shared` layer to describe database queries and their further use in higher layers.
* Caching and revalidating queries logic is better kept in the same place as the queries themselves.

## See also[​](#see-also "标题的直接链接")

* [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
* [Next.js Page Layouts](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
