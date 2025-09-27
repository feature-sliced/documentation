# 身份验证

广义上，身份验证包含以下步骤：

1. 从用户获取凭据
2. 将它们发送到后端
3. 存储 token 以进行经过身份验证的请求

## 如何从用户获取凭据[​](#如何从用户获取凭据 "标题的直接链接")

我们假设您的应用程序负责获取凭据。如果您通过 OAuth 进行身份验证，您可以简单地创建一个登录页面，其中包含指向 OAuth 提供商登录页面的链接，然后跳转到[步骤 3](#how-to-store-the-token-for-authenticated-requests)。

### 专用登录页面[​](#专用登录页面 "标题的直接链接")

通常，网站有专用的登录页面，您在其中输入用户名和密码。这些页面相当简单，所以不需要分解。登录和注册表单在外观上相当相似，所以它们甚至可以被组合在一个页面中。在 Pages layer 上为您的登录/注册页面创建一个 slice：

* 📂 pages

  <!-- -->

  * 📂 login

    <!-- -->

    * 📂 ui

      <!-- -->

      * 📄 LoginPage.tsx (or your framework's component file format)
      * 📄 RegisterPage.tsx

    * 📄 index.ts

  * other pages…

在这里我们创建了两个组件并在 slice 的 index 文件中导出它们。这些组件将包含表单，负责为用户提供可理解的控件来获取他们的凭据。

### 登录对话框[​](#登录对话框 "标题的直接链接")

如果您的应用程序有一个可以在任何页面上使用的登录对话框，请考虑将该对话框设为 widget。这样，您仍然可以避免过多的分解，但可以自由地在任何页面上重用此对话框。

* 📂 widgets

  <!-- -->

  * 📂 login-dialog

    <!-- -->

    * 📂 ui
      <!-- -->
      * 📄 LoginDialog.tsx
    * 📄 index.ts

  * other widgets…

本指南的其余部分是为专用页面方法编写的，但相同的原则也适用于对话框 widget。

### 客户端验证[​](#客户端验证 "标题的直接链接")

有时，特别是对于注册，执行客户端验证是有意义的，可以让用户快速知道他们犯了错误。验证可以在登录页面的 `model` segment 中进行。使用 schema 验证库，例如 JS/TS 的 [Zod](https://zod.dev)，并将该 schema 暴露给 `ui` segment：

pages/login/model/registration-schema.ts

```
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

然后，在 `ui` segment 中，您可以使用此 schema 来验证用户输入：

pages/login/ui/RegisterPage.tsx

```
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

## 如何将凭据发送到后端[​](#如何将凭据发送到后端 "标题的直接链接")

创建一个向后端登录端点发出请求的函数。此函数可以使用 mutation 库（例如 TanStack Query）直接在组件代码中调用，也可以作为状态管理器中的副作用调用。如 [API 请求指南](/documentation/zh/docs/guides/examples/api-requests.md) 中所述，您可以将请求放在 `shared/api` 中或登录页面的 `api` segment 中。

### 双因素认证[​](#双因素认证 "标题的直接链接")

如果您的应用程序支持双因素认证（2FA），您可能需要重定向到另一个页面，用户可以在其中输入一次性密码。通常，您的 `POST /login` 请求会返回带有标志的用户对象，指示用户已启用 2FA。如果设置了该标志，请将用户重定向到 2FA 页面。

由于此页面与登录密切相关，您也可以将其保留在 Pages layer 上的同一个 slice `login` 中。

您还需要另一个请求函数，类似于我们上面创建的 `login()`。将它们放在一起，要么在 Shared 中，要么在 `login` 页面的 `api` segment 中。

## 如何存储 token 以进行经过身份验证的请求[​](#how-to-store-the-token-for-authenticated-requests "标题的直接链接")

无论您使用哪种身份验证方案，无论是简单的登录和密码、OAuth 还是双因素认证，最终您都会收到一个 token。应该存储此 token，以便后续请求可以识别自己。

Web 应用程序的理想 token 存储是 **cookie** — 它不需要手动 token 存储或处理。因此，cookie 存储几乎不需要从前端架构方面考虑。如果您的前端框架有服务器端（例如 [Remix](https://remix.run)），那么您应该将服务器端 cookie 基础设施存储在 `shared/api` 中。在[教程的身份验证部分](/documentation/zh/docs/get-started/tutorial.md#authentication)中有一个如何使用 Remix 做到这一点的示例。

但是，有时 cookie 存储不是一个选项。在这种情况下，您将必须手动存储 token。除了存储 token 之外，您可能还需要设置在 token 过期时刷新 token 的逻辑。使用 FSD，有几个地方可以存储 token，以及几种方法可以使其对应用程序的其余部分可用。

### 在 Shared 中[​](#在-shared-中 "标题的直接链接")

这种方法与在 `shared/api` 中定义的 API 客户端配合得很好，因为 token 可以自由地用于其他需要身份验证才能成功的请求函数。您可以让 API 客户端保持状态，无论是使用响应式存储还是简单的模块级变量，并在您的 `login()`/`logout()` 函数中更新该状态。

自动 token 刷新可以作为 API 客户端中的中间件实现 — 每次您发出任何请求时都可以执行的东西。它可以这样工作：

* 认证并存储访问 token 以及刷新 token
* 发出任何需要身份验证的请求
* 如果请求失败并返回指示 token 过期的状态码，并且存储中有 token，则发出刷新请求，存储新的 token，并重试原始请求

这种方法的缺点之一是管理和刷新token的逻辑没有专门的位置。对于某些应用程序或团队来说，这可能是可以接受的，但如果token管理逻辑更复杂，最好将发出请求和管理token的职责分开。你可以通过将请求和API客户端保留在`shared/api`中，但将token存储和管理逻辑放在`shared/auth`中来实现这一点。

这种方法的另一个缺点是，如果你的后端返回当前用户信息的对象以及token，你必须将其存储在某处或丢弃该信息，并从诸如`/me`或`/users/current`之类的端点再次请求它。

### 在 Entities 中[​](#在-entities-中 "标题的直接链接")

FSD 项目通常有一个用户实体和/或当前用户实体。甚至可以是同一个实体。

备注

**当前用户**有时也被称为"viewer"或"me"。这是为了区分具有权限和私人信息的单个经过身份验证的用户与具有公开可访问信息的所有用户列表。

要在用户实体中存储token，请在`model`段中创建一个响应式存储。该存储可以同时包含token和用户对象。

由于API客户端通常在`shared/api`中定义或分布在各个实体中，这种方法的主要挑战是在不违反[层级导入规则](/documentation/zh/docs/reference/layers.md#import-rule-on-layers)的情况下使token对需要它的其他请求可用：

> 切片中的模块（文件）只能在其他切片位于严格较低的层级时导入它们。

有几种解决这个挑战的方案：

1. **每次发出请求时手动传递token**
   <br />
   <!-- -->
   这是最简单的解决方案，但很快就会变得繁琐，如果你没有类型安全，很容易忘记。它也与Shared中API客户端的中间件模式不兼容。
2. **通过上下文或像`localStorage`这样的全局存储将token暴露给整个应用程序**
   <br />
   <!-- -->
   检索token的键将保存在`shared/api`中，以便API客户端可以访问它。token的响应式存储将从用户实体导出，上下文提供者（如果需要）将在App层设置。这为设计API客户端提供了更多自由，但是，这会对更高层级提供上下文创建隐式依赖。遵循这种方法时，如果上下文或`localStorage`没有正确设置，请考虑提供有用的错误消息。
3. **每次token更改时将其注入API客户端**
   <br />
   <!-- -->
   如果你的存储是响应式的，你可以创建一个订阅，每次实体中的存储更改时都会更新API客户端的token存储。这与前一个解决方案类似，因为它们都对更高层级创建隐式依赖，但这个更具命令性（"推送"），而前一个更具声明性（"拉取"）。

一旦你克服了暴露存储在实体模型中的token的挑战，你就可以编码更多与token管理相关的业务逻辑。例如，`model`段可以包含在一定时间后使token失效的逻辑，或在token过期时刷新token的逻辑。要实际向后端发出请求，请使用用户实体的`api`段或`shared/api`。

### 在页面/小部件中（不推荐）[​](#在页面小部件中不推荐 "标题的直接链接")

不建议在页面或小部件中存储像访问token这样的应用程序范围状态。避免将token存储放在登录页面的`model`段中，而是从前两个解决方案中选择：Shared或Entities。

## 登出和 token 失效[​](#登出和-token-失效 "标题的直接链接")

通常，应用程序没有专门的登出页面，但登出功能仍然非常重要。它包括对后端的经过身份验证的请求和对 token 存储的更新。

如果您将所有请求存储在 `shared/api` 中，请将登出请求函数保留在那里，靠近登录函数。否则，请考虑将登出请求函数保留在触发它的按钮旁边。例如，如果您有一个出现在每个页面上并包含登出链接的头部 widget，请将该请求放在该 widget 的 `api` segment 中。

token 存储的更新必须从登出按钮的位置触发，比如头部 widget。您可以在该 widget 的 `model` segment 中组合请求和存储更新。

### 自动登出[​](#自动登出 "标题的直接链接")

不要忘记为登出请求失败或刷新登录 token 请求失败时构建故障保护。在这两种情况下，您都应该清除 token 存储。如果您将 token 保存在 Entities 中，此代码可以放在 `model` segment 中，因为它是纯业务逻辑。如果您将 token 保存在 Shared 中，将此逻辑放在 `shared/api` 中可能会使 segment 膨胀并稀释其目的。如果您注意到您的 API segment 包含几个不相关的东西，请考虑将 token 管理逻辑拆分到另一个 segment 中，例如 `shared/auth`。
