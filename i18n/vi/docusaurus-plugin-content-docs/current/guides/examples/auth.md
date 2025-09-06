---
sidebar_position: 1
---

# Authentication

Nói chung, authentication bao gồm các bước sau:

1. Lấy credentials từ người dùng
1. Gửi chúng đến backend
1. Lưu trữ token để thực hiện các authenticated requests

## Cách lấy credentials từ người dùng

Chúng tôi giả định rằng app của bạn chịu trách nhiệm lấy credentials. Nếu bạn có authentication qua OAuth, bạn có thể đơn giản tạo một login page với link đến login page của OAuth provider và bỏ qua đến [bước 3](#how-to-store-the-token-for-authenticated-requests).

### Page chuyên dụng cho login

Thông thường, các websites có các pages chuyên dụng cho login, nơi bạn nhập username và password. Các pages này khá đơn giản, vì vậy chúng không yêu cầu decomposition. Login và registration forms khá giống nhau về ngoại hình, vì vậy chúng thậm chí có thể được nhóm vào một page. Tạo một slice cho login/registration page của bạn trên layer Pages:

- 📂 pages
    - 📂 login
        - 📂 ui
            - 📄 LoginPage.tsx (or your framework's component file format)
            - 📄 RegisterPage.tsx
        - 📄 index.ts
    - other pages…

Ở đây chúng tôi tạo hai components và export cả hai trong index file của slice. Các components này sẽ chứa forms chịu trách nhiệm trình bày cho người dùng các controls dễ hiểu để lấy credentials của họ.

### Dialog cho login

Nếu app của bạn có dialog cho login có thể được sử dụng trên bất kỳ page nào, hãy cân nhắc tạo dialog đó thành một widget. Bằng cách đó, bạn vẫn có thể tránh quá nhiều decomposition, nhưng có tự do tái sử dụng dialog này trên bất kỳ page nào.

- 📂 widgets
    - 📂 login-dialog
        - 📂 ui
            - 📄 LoginDialog.tsx
        - 📄 index.ts
    - other widgets…

Phần còn lại của hướng dẫn này được viết cho cách tiếp cận dedicated page, nhưng các nguyên tắc tương tự áp dụng cho dialog widget.

### Client-side validation

Thiệng thoảng, đặc biệt là cho registration, việc thực hiện client-side validation để cho người dùng biết nhanh chóng rằng họ đã mắc lỗi là hợp lý. Validation có thể diễn ra trong segment `model` của login page. Sử dụng một schema validation library, ví dụ, [Zod][ext-zod] cho JS/TS, và expose schema đó cho segment `ui`:

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
    
Sau đó, trong segment `ui`, bạn có thể sử dụng schema này để validate user input:

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

## Cách gửi credentials đến backend

Tạo một function thực hiện request đến login endpoint của backend. Function này có thể được gọi trực tiếp trong component code sử dụng mutation library (ví dụ TanStack Query), hoặc có thể được gọi như side effect trong state manager. Như được giải thích trong [hướng dẫn cho API requests][examples-api-requests], bạn có thể đặt request của mình trong `shared/api` hoặc trong segment `api` của login page.

### Two-factor authentication

Nếu app của bạn hỗ trợ two-factor authentication (2FA), bạn có thể phải redirect đến page khác nơi người dùng có thể nhập one-time password. Thông thường `POST /login` request của bạn sẽ trả về user object với flag chỉ ra rằng người dùng đã bật 2FA. Nếu flag đó được thiết lập, redirect người dùng đến 2FA page.

Vì page này liên quan rất chặt chẽ đến logging in, bạn cũng có thể giữ nó trong cùng một slice, `login` trên layer Pages.

Bạn cũng cần một request function khác, tương tự như `login()` mà chúng tôi đã tạo ở trên. Đặt chúng cùng nhau, hoặc trong Shared, hoặc trong segment `api` của page `login`.

## Cách lưu trữ token cho authenticated requests {#how-to-store-the-token-for-authenticated-requests}

Bất kể authentication scheme nào bạn có, cho dù là login & password đơn giản, OAuth, hoặc two-factor authentication, cuối cùng bạn sẽ nhận được một token. Token này nên được lưu trữ để các requests tiếp theo có thể identify chính chúng.

Lưu trữ token lý tưởng cho web app là **cookie** — nó không yêu cầu token storage hoặc handling thủ công. Vì vậy, cookie storage hầu như không cần cân nhắc gì từ phía frontend architecture. Nếu frontend framework của bạn có server side (ví dụ, [Remix][ext-remix]), thì bạn nên lưu trữ server-side cookie infrastructure trong `shared/api`. Có một ví dụ trong [phần Authentication của tutorial][tutorial-authentication] về cách thực hiện điều đó với Remix.

Tuy nhiên, đôi khi cookie storage không phải là lựa chọn. Trong trường hợp này, bạn sẽ phải lưu trữ token thủ công. Ngoài việc lưu trữ token, bạn cũng có thể cần thiết lập logic để refresh token khi nó expires. Với FSD, có nhiều nơi bạn có thể lưu trữ token, cũng như nhiều cách để làm cho nó available cho phần còn lại của app.

### Trong Shared

Cách tiếp cận này hoạt động tốt với API client được define trong `shared/api` vì token có sẵn một cách tự do cho các request functions khác yêu cầu authentication để thành công. Bạn có thể làm cho API client giữ state, hoặc với reactive store hoặc đơn giản là module-level variable, và cập nhật state đó trong các functions `login()`/`logout()` của bạn.

Automatic token refresh có thể được implement như middleware trong API client — thứ gì đó có thể thực thi mỗi khi bạn thực hiện bất kỳ request nào. Nó có thể hoạt động như thế này:

- Authenticate và lưu trữ access token cũng như refresh token
- Thực hiện bất kỳ request nào yêu cầu authentication
- Nếu request thất bại với status code chỉ ra token expiration, và có token trong store, thực hiện refresh request, lưu trữ các tokens mới, và retry request gốc

Một trong những drawbacks của cách tiếp cận này là logic managing và refreshing token không có một nơi chuyên dụng. Điều này có thể ổn đối với một số apps hoặc teams, nhưng nếu logic token management phức tạp hơn, có thể tốt hơn là tách biệt trách nhiệm của việc thực hiện requests và managing tokens. Bạn có thể làm điều đó bằng cách giữ requests và API client trong `shared/api`, nhưng token store và management logic trong `shared/auth`.

Một drawback khác của cách tiếp cận này là nếu backend của bạn trả về object thông tin của current user cùng với token, bạn phải lưu trữ điều đó ở đâu đó hoặc bỏ qua thông tin đó và request lại từ endpoint như `/me` hoặc `/users/current`.

### Trong Entities

Thông thường các dự án FSD có một entity cho user và/hoặc một entity cho current user. Nó thậm chí có thể là cùng một entity cho cả hai.

:::note

**Current user** đôi khi cũng được gọi là "viewer" hoặc "me". Điều này là để phân biệt single authenticated user, với permissions và private information, từ danh sách tất cả users với publicly accessible information.

:::

Để lưu trữ token trong User entity, tạo reactive store trong segment `model`. Store đó có thể chứa cả token và user object.

Vì API client thường được define trong `shared/api` hoặc spread qua các entities, thách thức chính của cách tiếp cận này là làm cho token available cho các requests khác cần nó mà không vi phạm [import rule trên các layers][import-rule-on-layers]:

> Một module (file) trong slice chỉ có thể import các slices khác khi chúng được đặt trên các layers ở phía dưới.

Có nhiều giải pháp cho thách thức này:

1. **Pass token thủ công mỗi lần bạn thực hiện request**  
    Đây là giải pháp đơn giản nhất, nhưng nó nhanh chóng trở nên cồng kềnh, và nếu bạn không có type safety, dễ quên. Nó cũng không tương thích với middlewares pattern cho API client trong Shared.
1. **Expose token cho toàn bộ app với context hoặc global store như `localStorage`**  
    Key để retrieve token sẽ được giữ trong `shared/api` để API client có thể truy cập nó. Reactive store của token sẽ được export từ User entity, và context provider (nếu cần) sẽ được thiết lập trên layer App. Điều này cho nhiều tự do hơn để thiết kế API client, tuy nhiên, nó tạo ra implicit dependency trên các layers cao hơn để cung cấp context. Khi theo cách tiếp cận này, hãy cân nhắc cung cấp các error messages hữu ích nếu context hoặc `localStorage` không được thiết lập chính xác.
1. **Inject token vào API client mỗi khi nó thay đổi**  
    Nếu store của bạn là reactive, bạn có thể tạo subscription sẽ cập nhật token store của API client mỗi khi store trong entity thay đổi. Điều này tương tự như giải pháp trước ở chỗ chúng đều tạo implicit dependency trên các layers cao hơn, nhưng cái này imperative hơn ("push"), trong khi cái trước declarative hơn ("pull").

Khi bạn vượt qua thách thức expose token được lưu trữ trong model của entity, bạn có thể encode nhiều business logic liên quan đến token management. Ví dụ, segment `model` có thể chứa logic để invalidate token sau một khoảng thời gian nhất định, hoặc refresh token khi nó expires. Để thực sự thực hiện requests đến backend, sử dụng segment `api` của User entity hoặc `shared/api`.

### Trong Pages/Widgets (không được khuyến nghị)

Không được khuyến khích lưu trữ app-wide state như access token trong pages hoặc widgets. Tránh đặt token store của bạn trong segment `model` của login page, thay vào đó hãy chọn từ hai giải pháp đầu tiên, Shared hoặc Entities.

## Logout và token invalidation

Thông thường, các apps không có một page hoàn chỉnh cho logging out, nhưng logout functionality vẫn rất quan trọng. Nó bao gồm authenticated request đến backend và cập nhật token store.

Nếu bạn lưu trữ tất cả requests trong `shared/api`, hãy giữ logout request function ở đó, gần login function. Nếu không, hãy cân nhắc giữ logout request function gần button kích hoạt nó. Ví dụ, nếu bạn có header widget xuất hiện trên mỗi page và chứa logout link, hãy đặt request đó trong segment `api` của widget đó.

Cập nhật token store sẽ phải được trigger từ vị trí của logout button, như header widget. Bạn có thể kết hợp request và store update trong segment `model` của widget đó.

### Automatic logout

Đừng quên xây dựng các failsafes cho khi request log out thất bại, hoặc request refresh login token thất bại. Trong cả hai trường hợp này, bạn nên clear token store. Nếu bạn giữ token trong Entities, code này có thể được đặt trong segment `model` vì nó là pure business logic. Nếu bạn giữ token trong Shared, đặt logic này trong `shared/api` có thể làm segment phình to và pha loãng mục đích của nó. Nếu bạn nhận thấy rằng API segment của mình chứa nhiều thứ không liên quan, hãy cân nhắc tách logic token management thành segment khác, ví dụ, `shared/auth`.

[tutorial-authentication]: /docs/get-started/tutorial#authentication
[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[examples-api-requests]: /docs/guides/examples/api-requests
[ext-remix]: https://remix.run
[ext-zod]: https://zod.dev

