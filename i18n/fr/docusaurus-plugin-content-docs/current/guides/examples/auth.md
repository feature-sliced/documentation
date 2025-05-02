---
sidebar_position: 1
---

# Authentication

Broadly, authentication consists of the following steps:

1. Get the credentials from the user
1. Send them to the backend
1. Store the token to make authenticated requests

## How to get credentials from the user

We are assuming that your app is responsible for getting credentials. If you have authentication via OAuth, you can simply create a login page with a link to the OAuth provider's login page and skip to [step 3](#how-to-store-the-token-for-authenticated-requests).

### Dedicated page for login

Usually, websites have dedicated pages for login, where you enter your username and password. These pages are quite simple, so they don't require decomposition. Login and registration forms are quite similar in appearance, so they can even be grouped into one page. Create a slice for your login/registration page on the Pages layer:

- 📂 pages
    - 📂 login
        - 📂 ui
            - 📄 LoginPage.tsx (or your framework's component file format)
            - 📄 RegisterPage.tsx
        - 📄 index.ts
    - other pages…

Here we created two components and exported them both in the index file of the slice. These components will contain forms that are responsible for presenting the user with understandable controls to get their credentials.

### Dialog for login

If your app has a dialog for login that can be used on any page, consider making that dialog a widget. That way, you can still avoid too much decomposition, but have the freedom to reuse this dialog on any page.

- 📂 widgets
    - 📂 login-dialog
        - 📂 ui
            - 📄 LoginDialog.tsx
        - 📄 index.ts
    - other widgets…

The rest of this guide is written for the dedicated page approach, but the same principles apply to the dialog widget.

### Client-side validation

Sometimes, especially for registration, it makes sense to perform client-side validation to let the user know quickly that they made a mistake. Validation can take place in the `model` segment of the login page. Use a schema validation library, for example, [Zod][ext-zod] for JS/TS, and expose that schema to the `ui` segment:

```ts title="pages/login/model/registration-schema.ts"
import { z } from "zod";

export const registrationData = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
```
    
Then, in the `ui` segment, you can use this schema to validate the user input:

```tsx title="pages/login/ui/RegisterPage.tsx"
import { registrationData } from "../model/registration-schema";

function validate(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    try {
        registrationData.parse(data);
    } catch (error) {
        // TODO: Show error message to the user
    }
}

export function RegisterPage() {
    return (
        <form onSubmit={(e) => validate(new FormData(e.target))}>
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" required />

            <label htmlFor="password">Password (min. 6 characters)</label>
            <input id="password" name="password" type="password" required />

            <label htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required />
        </form>
    )
}
```

## How to send credentials to the backend

Create a function that makes a request to your backend's login endpoint. This function can either be called directly in the component code using a mutation library (e.g. TanStack Query), or it can be called as a side effect in a state manager.

### Where to store the request function

There are two places you can put this function: in `shared/api`, or in the `api` segment of the page.

#### In `shared/api`

This approach goes well with when you put all your API requests in `shared/api`, grouped by endpoint, for example. The file structure might look like this:

- 📂 shared
    - 📂 api
        - 📂 endpoints
            - 📄 login.ts
            - other endpoint functions…
        - 📄 client.ts
        - 📄 index.ts

The `📄 client.ts` file contains a wrapper around your request-making primitive (for example, `fetch()`). This wrapper would know about the base URL of your backend, set necessary headers, serialize data correctly, etc.

```ts title="shared/api/endpoints/login.ts"
import { POST } from "../client";

export function login({ email, password }: { email: string, password: string }) {
    return POST("/login", { email, password });
}
```

```ts title="shared/api/index.ts"
export { login } from "./endpoints/login";
```

#### In the `api` segment of the page

If you don't keep all your requests in one place, consider stashing the login request in the `api` segment of the login page.

- 📂 pages
    - 📂 login
        - 📂 api
            - 📄 login.ts
        - 📂 ui
            - 📄 LoginPage.tsx
        - 📄 index.ts
    - other pages…

```ts title="pages/login/api/login.ts"
import { POST } from "shared/api";

export function login({ email, password }: { email: string, password: string }) {
    return POST("/login", { email, password });
}
```

You don't have to export the `login()` function in the page's public API, because it's unlikely that any other place in the app will need this request.

### Two-factor authentication

If your app supports two-factor authentication (2FA), you might have to redirect to another page where a user can enter a one-time password. Usually your `POST /login` request would return the user object with a flag indicating that the user has 2FA enabled. If that flag is set, redirect the user to the 2FA page.

Since this page is very related to logging in, you can also keep it in the same slice, `login` on the Pages layer.

You would also need another request function, similar to `login()` that we created above. Place them together, either in Shared, or in the `api` segment of the `login` page.

## How to store the token for authenticated requests {#how-to-store-the-token-for-authenticated-requests}

Regardless of the authentication scheme you have, be it a simple login & password, OAuth, or two-factor authentication, at the end you will receive a token. This token should be stored so that subsequent requests can identify themselves.

The ideal token storage for a web app is a **cookie** — it requires no manual token storage or handling. As such, cookie storage needs almost no consideration from the frontend architecture side. If your frontend framework has a server side (for example, [Remix][ext-remix]), then you should store the server-side cookie infrastructure in `shared/api`. There is an example in [the Authentication section of the tutorial][tutorial-authentication] of how to do that with Remix.

Sometimes, however, cookie storage is not an option. In this case, you will have to store the token manually. Apart from storing the token, you may also need to set up logic for refreshing your token when it expires. With FSD, there are several places where you can store the token, as well as several ways to make it available for the rest of the app.

### In Shared

This approach plays well with an API client defined in `shared/api` because the token is freely available for other request functions that require authentication to succeed. You can make the API client hold state, either with a reactive store or simply a module-level variable, and update that state in your `login()`/`logout()` functions.

Automatic token refresh can be implemented as a middleware in the API client — something that can execute every time you make any request. It can work like this:

- Authenticate and store the access token as well as the refresh token
- Make any request that requires authentication
- If the request fails with a status code that indicates token expiration, and there is a token in the store, make a refresh request, store the new tokens, and retry the original request

One of the drawbacks of this approach is that the logic of managing and refreshing the token doesn't have a dedicated place. This can be fine for some apps or teams, but if the token management logic is more complex, it may be preferable to separate responsibilities of making requests and managing tokens. You can do that by keeping your requests and API client in `shared/api`, but the token store and management logic in `shared/auth`.

Another drawback of this approach is that if your backend returns an object of your current user's information along with the token, you have to store that somewhere or discard that information and request it again from an endpoint like `/me` or `/users/current`.

### In Entities

It's common for FSD projects to have an entity for a user and/or an entity for the current user. It can even be the same entity for both.

:::note

The **current user** is also sometimes called "viewer" or "me". This is to distinguish the single authenticated user, with permissions and private information, from a list of all users with publicly accessible information.

:::

To store the token in the User entity, create a reactive store in the `model` segment. That store can contain both the token and the user object.

Since the API client is usually defined in `shared/api` or spreaded across the entities, the main challenge to this approach is making the token available to other requests that need it without breaking [the import rule on layers][import-rule-on-layers]:

> A module in a slice can only import other slices when they are located on layers strictly below.

There are several solutions to this challenge:

1. **Pass the token manually every time you make a request**  
    This is the simplest solution, but it quickly becomes cumbersome, and if you don't have type safety, it's easy to forget. It's also not compatible with middlewares pattern for the API client in Shared.
1. **Expose the token to the entire app with a context or a global store like `localStorage`**  
    The key to retrieve the token will be kept in `shared/api` so that the API client can access it. The reactive store of the token will be exported from the User entity, and the context provider (if needed) will be set up on the App layer. This gives more freedom for designing the API client, however, this creates an implicit dependency on higher layers to provide context. When following this approach, consider providing helpful error messages if the context or `localStorage` are not set up correctly.
1. **Inject the token into the API client every time it changes**  
    If your store is reactive, you can create a subscription that will update the API client's token store every time the store in the entity changes. This is similar to the previous solution in that they both create an implicit dependency on higher layers, but this one is more imperative ("push"), while the previous one is more declarative ("pull").

Once you overcome the challenge of exposing the token that is stored in the entity's model, you can encode more business logic related to token management. For example, the `model` segment can contain logic to invalidate the token after a certain period of time, or to refresh the token when it expires. To actually make requests to the backend, use the `api` segment of the User entity or `shared/api`.

### In Pages/Widgets (not recommended)

It is discouraged to store app-wide state like an access token in pages or widgets. Avoid placing your token store in the `model` segment of the login page, instead choose from the first two solutions, Shared or Entities.

## Logout and token invalidation

Usually, apps don't have an entire page for logging out, but the logout functionality is still very important. It consists of an authenticated request to the backend and an update to the token store.

If you store all your requests in `shared/api`, keep the logout request function there, close to the login function. Otherwise, consider keeping the logout request function next to the button that triggers it. For example, if you have a header widget that appears on every page and contains the logout link, put that request in the `api` segment of that widget.

The update to the token store will have to be triggered from the place of the logout button, like a header widget. You can combine the request and the store update in the `model` segment of that widget.

### Automatic logout

Don't forget to build failsafes for when a request to log out fails, or a request to refresh a login token fails. In both of these cases, you should clear the token store. If you keep your token in Entities, this code can be placed in the `model` segment as it is pure business logic. If you keep your token in Shared, placing this logic in `shared/api` might bloat the segment and dilute its purpose. If you're noticing that your API segment contains two several unrelated things, consider splitting out the token management logic into another segment, for example, `shared/auth`.

[tutorial-authentication]: /docs/get-started/tutorial#authentication
[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-remix]: https://remix.run
[ext-zod]: https://zod.dev

