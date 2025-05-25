---
sidebar_position: 4
---

# API requests

## `shared/api`

Start by placing your requests in the `shared/api`, this will remove unnecessary architectural boundaries and let you prototype faster and reuse requests easier. This might be enough for the majority of projects. The file structure might look like this:

- 📂 shared
    - 📂 api
        - 📂 endpoints
            - 📄 login.ts
        - 📄 client.ts
        - 📄 index.ts

The `📄 client.ts` file contains a wrapper around your request-making primitive (for example, `fetch()`). This wrapper would know about the base URL of your backend, set necessary headers, serialize data correctly, and so on:

```ts title="shared/api/client.ts"
// axios api client
export const axiosInstance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

// fetch api client
export const fetchInstance = {
    async get() {
        const response = await fetch('https://some-domain', {
            headers: {
              'X-Custom-Header': 'foobar'
            }
        });

        return response.json();
    }
};
```

Then, you put all your API requests in `shared/api/endpoints`, grouped by endpoint:

```ts title="shared/api/endpoints/login.ts"
import { instance } from "../client";

export function login({ email, password }: { email: string, password: string }) {
    return instance.post("/login", { email, password });
}
```

And then create an index file to allow components to use new functionality:

```ts title="shared/api/index.ts"
export { login } from "./endpoints/login";
```

## slice

API requests that clearly won't be reused in the future should be placed in the `api` segment of the same slice to keep project scope clean:

- 📂 pages
    - 📂 login
        - 📂 api
            - 📄 login.ts
        - 📂 ui
            - 📄 LoginPage.tsx
        - 📄 index.ts

```ts title="pages/login/api/login.ts"
import { instance } from "shared/api";

export function login({ email, password }: { email: string, password: string }) {
    return instance.post("/login", { email, password });
}
```

You don't have to export the `login()` function in the page's public API, because it's unlikely that any other place in the app will need this request.

:::note

Do not move API calls to the `entities` layer preemptively, as you might end up in the situation when you have no abstraction layer for frontend-specific entities. Backend responses can vary between requests, and they might be inappropriate for the frontend.

:::

If the backend provides OpenAPI specifications, you can use a tool like orval to generate types and requests for you in `shared/api` folder.

When using libraries like TanStack Query or pinia-colada in the `pages`, `widgets`, or `features` layers, you might need to reuse types or cache keys across slices, which is prohibited by Feature-Sliced Design. In such cases, you can share types, cache keys, and options via `shared` layer.
