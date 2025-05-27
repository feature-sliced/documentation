---
sidebar_position: 4
---

# Handling API Requests

Feature-Sliced Design provides a structured way to organize your API request logic.

## Shared API Requests

Start by placing common API request logic in the `shared/api` directory. This makes it easy to reuse requests across your application and helps with faster prototyping. For many projects, this is all you'll need for API calls.

A typical file structure would be:
- 📂 shared
    - 📂 api
        - 📄 client.ts
        - 📄 index.ts
        - 📂 endpoints
            - 📄 login.ts

The `client.ts` file centralizes your HTTP request setup. It wraps your chosen method (like `fetch()` or an `axios` instance) and handles common configurations, such as:

- Backend base URL.
- Default headers (e.g., for authentication).
- Data serialization.

Here are examples for `axios` and `fetch`:

```ts title="shared/api/client.ts"
// Example using axios
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://your-api-domain.com/api/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'my-custom-value' }
});

// --- OR ---

// Example using fetch
export const fetchClient = {
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

// Choose one client, for instance, you might export your preferred client as 'client':
// export const client = axiosClient;
// export const client = fetchClient;
```

Organize your individual API request functions in `shared/api/endpoints`, grouping them by the API endpoint.

```ts title="shared/api/endpoints/login.ts"
import { client } from '../client'; // Assuming 'client' is configured and exported

export interface LoginCredentials {
  email: string;
  password: string;
}

export function login(credentials: LoginCredentials) {
  return client.post('/login', credentials);
}
```
Use an `index.ts` file in `shared/api` to export your request functions.

```ts title="shared/api/index.ts"
export { client } from './client'; // If you want to export the client itself
export { login } from './endpoints/login';
export type { LoginCredentials } from './endpoints/login';
```

## Slice-Specific API Requests

If an API request is only used by a specific slice (like a single page or feature) and won't be reused, place it in the api segment of that slice. This keeps slice-specific logic neatly contained.

- 📂 pages
    - 📂 login
        - 📄 index.ts
        - 📂 api
            - 📄 login.ts
        - 📂 ui
            - 📄 LoginPage.tsx

```ts title="pages/login/api/login.ts"
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

:::note

Avoid placing API calls and response types in the `entities` layer prematurely. Backend responses may differ from what your frontend entities need. API logic in `shared/api` or a slice's `api` segment allows you to transform data appropriately, keeping entities focused on frontend concerns.

:::

## Using Client Generators

If your backend has an OpenAPI specification, tools like [orval](https://orval.dev/) or [openapi-typescript](https://openapi-ts.dev/) can generate API types and request functions for you. Place the generated code in `shared/api`.

## Integrating with Server State Libraries

When using server state libraries like [TanStack Query (React Query)](https://tanstack.com/query/latest) or [Pinia Colada](https://pinia-colada.esm.dev/) you might need to share types or cache keys between slices. Use the `shared` layer for things like:

- API data types
- Cache keys
- Common query/mutation options
