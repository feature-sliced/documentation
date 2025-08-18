# Handling API Requests

## Shared API Requests[​](#shared-api-requests "この見出しへの直接リンク")

Start by placing common API request logic in the `shared/api` directory. This makes it easy to reuse requests across your application and helps with faster prototyping. For many projects, this is all you'll need for API calls.

A typical file structure would be:

* 📂 shared

  <!-- -->

  * 📂 api

    <!-- -->

    * 📄 client.ts
    * 📄 index.ts
    * 📂 endpoints
      <!-- -->
      * 📄 login.ts

The `client.ts` file centralizes your HTTP request setup. It wraps your chosen method (like `fetch()` or an `axios` instance) and handles common configurations, such as:

* Backend base URL.
* Default headers (e.g., for authentication).
* Data serialization.

Here are examples for `axios` and `fetch`:

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

Organize your individual API request functions in `shared/api/endpoints`, grouping them by the API endpoint.

注記

To keep examples focused, we omit form interaction and validation. For details on libraries like Zod or Valibot, refer to the [Type Validation and Schemas](/documentation/ja/docs/guides/examples/types.md#type-validation-schemas-and-zod) article.

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

Use an `index.ts` file in `shared/api` to export your request functions.

shared/api/index.ts

```
export { client } from './client'; // If you want to export the client itself
export { login } from './endpoints/login';
export type { LoginCredentials } from './endpoints/login';
```

## Slice-Specific API Requests[​](#slice-specific-api-requests "この見出しへの直接リンク")

If an API request is only used by a specific slice (like a single page or feature) and won't be reused, place it in the api segment of that slice. This keeps slice-specific logic neatly contained.

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

You don't need to export `login()` function in the page's public API, because it's unlikely that any other place in the app will need this request.

注記

Avoid placing API calls and response types in the `entities` layer prematurely. Backend responses may differ from what your frontend entities need. API logic in `shared/api` or a slice's `api` segment allows you to transform data appropriately, keeping entities focused on frontend concerns.

## Using Client Generators[​](#client-generators "この見出しへの直接リンク")

If your backend has an OpenAPI specification, tools like [orval](https://orval.dev/) or [openapi-typescript](https://openapi-ts.dev/) can generate API types and request functions for you. Place the generated code in, for example, `shared/api/openapi`. Make sure to include `README.md` to document what those types are, and how to generate them.

## Integrating with Server State Libraries[​](#server-state-libraries "この見出しへの直接リンク")

When using server state libraries like [TanStack Query (React Query)](https://tanstack.com/query/latest) or [Pinia Colada](https://pinia-colada.esm.dev/) you might need to share types or cache keys between slices. Use the `shared` layer for things like:

* API data types
* Cache keys
* Common query/mutation options

For more details on how to work with server state libraries, refer to [React Query article](/documentation/ja/docs/guides/tech/with-react-query.md)
