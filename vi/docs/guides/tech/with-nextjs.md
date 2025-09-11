# Sử dụng với Next.js

FSD tương thích với Next.js trong cả phiên bản App Router và Pages Router nếu bạn giải quyết được xung đột chính — thư mục `app` và `pages`.

## App Router[​](#app-router "Link trực tiếp đến heading")

### Xung đột giữa FSD và Next.js trong layer `app`[​](#conflict-between-fsd-and-nextjs-in-the-app-layer "Link trực tiếp đến heading")

Next.js đề xuất sử dụng thư mục `app` để định nghĩa các route của ứng dụng. Nó mong đợi các file trong thư mục `app` tương ứng với các pathname. Cơ chế routing này **không phù hợp** với khái niệm FSD, vì không thể duy trì cấu trúc slice phẳng.

Giải pháp là di chuyển thư mục `app` của Next.js vào thư mục gốc của dự án và import các pages FSD từ `src`, nơi chứa các layer FSD, vào thư mục `app` của Next.js.

Bạn cũng cần thêm thư mục `pages` vào thư mục gốc của dự án, nếu không Next.js sẽ cố gắng sử dụng `src/pages` như Pages Router ngay cả khi bạn sử dụng App Router, điều này sẽ làm hỏng quá trình build. Cũng nên đặt file `README.md` bên trong thư mục `pages` gốc này để mô tả tại sao nó cần thiết, mặc dù nó trống.

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

Ví dụ về việc re-export một page từ `src/pages` trong `app` của Next.js:

app/example/page.tsx

```
export { ExamplePage as default, metadata } from '@/pages/example';
```

### Middleware[​](#middleware "Link trực tiếp đến heading")

Nếu bạn sử dụng middleware trong dự án, nó phải được đặt ở thư mục gốc của dự án cùng với thư mục `app` và `pages` của Next.js.

### Instrumentation[​](#instrumentation "Link trực tiếp đến heading")

File `instrumentation.js` cho phép bạn giám sát hiệu suất và hành vi của ứng dụng. Nếu bạn sử dụng nó, nó phải được đặt ở thư mục gốc của dự án, tương tự như `middleware.js`.

## Pages Router[​](#pages-router "Link trực tiếp đến heading")

### Xung đột giữa FSD và Next.js trong layer `pages`[​](#conflict-between-fsd-and-nextjs-in-the-pages-layer "Link trực tiếp đến heading")

Các route nên được đặt trong thư mục `pages` ở thư mục gốc của dự án, tương tự như thư mục `app` cho App Router. Cấu trúc bên trong `src` nơi các thư mục layer được đặt vẫn không thay đổi.

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

Ví dụ về việc re-export một page từ `src/pages` trong `pages` của Next.js:

pages/example/index.tsx

```
export { Example as default } from '@/pages/example';
```

### Custom `_app` component[​](#custom-_app-component "Link trực tiếp đến heading")

Bạn có thể đặt Custom App component của mình trong `src/app/_app` hoặc `src/app/custom-app`:

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

## Route Handlers (API routes)[​](#route-handlers-api-routes "Link trực tiếp đến heading")

Sử dụng segment `api-routes` trong layer `app` để làm việc với Route Handlers.

Hãy chú ý khi viết code backend trong cấu trúc FSD — FSD chủ yếu dành cho frontend, nghĩa là đó là điều mà mọi người sẽ mong đợi tìm thấy. Nếu bạn cần nhiều endpoint, hãy cân nhắc tách chúng thành một package khác trong một monorepo.

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

## Các đề xuất bổ sung[​](#additional-recommendations "Link trực tiếp đến heading")

* Sử dụng segment `db` trong layer `shared` để mô tả các database query và việc sử dụng chúng ở các layer cao hơn.
* Logic caching và revalidating queries tốt nhất nên được giữ cùng chỗ với các query.

## Xem thêm[​](#see-also "Link trực tiếp đến heading")

* [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
* [Next.js Page Layouts](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
