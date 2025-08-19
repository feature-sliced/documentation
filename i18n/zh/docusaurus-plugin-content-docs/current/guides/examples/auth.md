---
sidebar_position: 1
---

# 身份验证

广义上，身份验证包含以下步骤：

1. 从用户获取凭据
1. 将它们发送到后端
1. 存储 token 以进行经过身份验证的请求

## 如何从用户获取凭据

我们假设您的应用程序负责获取凭据。如果您通过 OAuth 进行身份验证，您可以简单地创建一个登录页面，其中包含指向 OAuth 提供商登录页面的链接，然后跳转到[步骤 3](#how-to-store-the-token-for-authenticated-requests)。

### 专用登录页面

通常，网站有专用的登录页面，您在其中输入用户名和密码。这些页面相当简单，所以不需要分解。登录和注册表单在外观上相当相似，所以它们甚至可以被组合在一个页面中。在 Pages layer 上为您的登录/注册页面创建一个 slice：

- 📂 pages
    - 📂 login
        - 📂 ui
            - 📄 LoginPage.tsx (or your framework's component file format)
            - 📄 RegisterPage.tsx
        - 📄 index.ts
    - other pages…

在这里我们创建了两个组件并在 slice 的 index 文件中导出它们。这些组件将包含表单，负责为用户提供可理解的控件来获取他们的凭据。

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

Create a function that makes a request to your backend's login endpoint. This function can either be called directly in the component code using a mutation library (e.g. TanStack Query), or it can be called as a side effect in a state manager. As explained in the [guide for API requests][examples-api-requests], you can put your request either in `shared/api` or in the `api` segment of your login page.

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

> A module (file) in a slice can only import other slices when they are located on layers strictly below.

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
[examples-api-requests]: /docs/guides/examples/api-requests
[ext-remix]: https://remix.run
[ext-zod]: https://zod.dev

