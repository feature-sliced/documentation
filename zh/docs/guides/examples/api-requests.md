# 处理 API 请求

## 共享 API 请求[​](#shared-api-requests "标题的直接链接")

首先将通用的 API 请求逻辑放在 `shared/api` 目录中。这使得在应用程序中重用请求变得容易，并有助于更快的原型开发。对于许多项目来说，这就是 API 调用所需的全部内容。

典型的文件结构是：

* 📂 shared

  <!-- -->

  * 📂 api

    <!-- -->

    * 📄 client.ts
    * 📄 index.ts
    * 📂 endpoints
      <!-- -->
      * 📄 login.ts

`client.ts` 文件集中了您的 HTTP 请求设置。它包装您选择的方法（如 `fetch()` 或 `axios` 实例）并处理常见配置，例如：

* 后端基础 URL。
* 默认头部（例如，用于身份验证）。
* 数据序列化。

以下是 `axios` 和 `fetch` 的示例：

* Axios
* Fetch

shared/api/client.ts

```
// Example using axios
import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://your-api-domain.com/api/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'my-custom-value' }
});
```

shared/api/client.ts

```
export const client = {
  async post(endpoint: string, body: any, options?: RequestInit) {
    const response = await fetch(`https://your-api-domain.com/api${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'my-custom-value',
        ...options?.headers,
      },
    });
    return response.json();
  }
  // ... other methods like put, delete, etc.
};
```

在 `shared/api/endpoints` 中组织您的单个 API 请求函数，按 API 端点分组。

备注

为了保持示例的重点，我们省略了表单交互和验证。有关 Zod 或 Valibot 等库的详细信息，请参阅[类型验证和 Schemas](/documentation/zh/docs/guides/examples/types.md#type-validation-schemas-and-zod) 文章。

shared/api/endpoints/login.ts

```
import { client } from '../client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export function login(credentials: LoginCredentials) {
  return client.post('/login', credentials);
}
```

在 `shared/api` 中使用 `index.ts` 文件来导出您的请求函数。

shared/api/index.ts

```
export { client } from './client'; // 如果您想导出客户端本身
export { login } from './endpoints/login';
export type { LoginCredentials } from './endpoints/login';
```

## 特定 Slice 的 API 请求[​](#slice-specific-api-requests "标题的直接链接")

如果 API 请求仅由特定 slice（如单个页面或功能）使用且不会被重用，请将其放在该 slice 的 api segment 中。这样可以保持特定 slice 的逻辑整齐地包含在内。

* 📂 pages

  <!-- -->

  * 📂 login

    <!-- -->

    * 📄 index.ts
    * 📂 api
      <!-- -->
      * 📄 login.ts
    * 📂 ui
      <!-- -->
      * 📄 LoginPage.tsx

pages/login/api/login.ts

```
import { client } from 'shared/api';

interface LoginCredentials {
  email: string;
  password: string;
}

export function login(credentials: LoginCredentials) {
  return client.post('/login', credentials);
}
```

您不需要在页面的公共 API 中导出 `login()` 函数，因为应用程序中的其他地方不太可能需要这个请求。

备注

避免过早地将 API 调用和响应类型放在 `entities` 层中。后端响应可能与您的前端实体需要的不同。`shared/api` 或 slice 的 `api` segment 中的 API 逻辑允许您适当地转换数据，保持实体专注于前端关注点。

## 使用客户端生成器[​](#client-generators "标题的直接链接")

如果您的后端有 OpenAPI 规范，像 [orval](https://orval.dev/) 或 [openapi-typescript](https://openapi-ts.dev/) 这样的工具可以为您生成 API 类型和请求函数。将生成的代码放在，例如 `shared/api/openapi` 中。确保包含 `README.md` 来记录这些类型是什么，以及如何生成它们。

## 与服务器状态库集成[​](#server-state-libraries "标题的直接链接")

当使用像 [TanStack Query (React Query)](https://tanstack.com/query/latest) 或 [Pinia Colada](https://pinia-colada.esm.dev/) 这样的服务器状态库时，您可能需要在 slices 之间共享类型或缓存键。将以下内容使用 `shared` 层：

* API 数据类型
* 缓存键
* 通用查询/变更选项

有关如何使用服务器状态库的更多详细信息，请参阅 [React Query 文章](/documentation/zh/docs/guides/tech/with-react-query.md)
