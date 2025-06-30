---
sidebar_position: 1
sidebar_label: 인증
---

# 인증

보통 인증은 세 가지 주요 단계로 이루어집니다:

1. 사용자로부터 로그인 정보(아이디, 비밀번호 등)을 수집합니다.
2. 백엔드 서버로 해당 로그인 정보을 전송합니다.
3. 인증 후 발급받은 토큰을 저장하여 이후 요청에 사용합니다.

## 사용자 로그인 정보 수집 방법

앱에서 사용자로부터 로그인 정보를 수집하는 방법을 알아보겠습니다. 만약에 OAuth를 사용하는 경우, OAuth 제공자의 로그인 page를 사용하여 [3단계](#how-to-store-the-token-for-authenticated-requests)로 바로 넘어갈 수 있습니다.

### 전용 로그인 page 만들기

웹사이트에서 사용자 이름과 비밀번호를 입력하는 로그인 page를 제공하는 것이 일반적입니다. 이러한 page들은 구조가 단순하여 별도의 복잡한 분해 작업이 필요하지 않습니다. 다만, 로그인과 회원가입 양식은 외형이 비슷하기 때문에, 경우에 따라 두 양식을 하나의 page에서 통합하여 제공하기도 합니다.

- 📂 pages
    - 📂 login
        - 📂 ui
            - 📄 LoginPage.tsx (or your framework's component file format)
            - 📄 RegisterPage.tsx
        - 📄 index.ts
    - other pages…

로그인과 회원가입 컴포넌트를 별도로 만들고, 필요에 따라 index 파일에서 export 할 수 있습니다. 이 컴포넌트들은 사용자로부터 로그인 정보을 입력받는 폼을 포함합니다.

### 로그인 dialog 만들기

앱의 어디서나 사용할 수 있는 로그인 dialog가 필요하다면, 이 dialog를 재사용 가능한 widget으로 만드는 것이 좋습니다. 이렇게 하면 불필요한 세분화를 피하면서도 어떤 page에서나 쉽게 로그인 dialog를 띄울 수 있습니다.

- 📂 widgets
    - 📂 login-dialog
        - 📂 ui
            - 📄 LoginDialog.tsx
        - 📄 index.ts
    - other widgets…

가이드 나머지 부분은 전용 page 방식에 대해 설명하고 있지만, 동일한 원칙을 로그인 dialog에도 적용할 수 있습니다.

### 클라이언트 측 검증

특히 회원가입의 경우, 사용자가 입력한 내용에 문제가 있을 때 빠르게 피드백을 제공하기 위해 클라이언트 측 검증을 수행하는 것이 좋습니다. 이를 위해 로그인 page의 `model` segment에서 검증 로직을 구현할 수 있습니다. 예를 들어 JS/TS에서는 [Zod][ext-zod]와 같은 스키마 검증 라이브러리를 사용할 수 있습니다:

```ts title="pages/login/model/registration-schema.ts"
import { z } from "zod";

export const registrationData = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
});
```
    
그런 다음, ui segment에서 이 스키마를 사용하여 사용자 입력을 검증할 수 있습니다:

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
            <label htmlFor="email">이메일</label>
            <input id="email" name="email" required />

            <label htmlFor="password">비밀번호 (최소 6자)</label>
            <input id="password" name="password" type="password" required />

            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required />
        </form>
    )
}
```

## 로그인 정보 전송 방법

로그인 정보를 백엔드 서버로 전송하기 위한 요청 함수를 작성하세요. 이 함수는 상태 관리 라이브러리나 TanStack Query의 `useMutation`과 같은 mutation 기능를 사용하여 호출할 수 있습니다.

### 요청 함수 저장 위치

이 요청 함수를 저장할 수 있는 위치는 크게 두 가지입니다: `shared/api` 또는 page의 `api` segment입니다.

#### `shared/api`에 저장하기

모든 API 요청을 `shared/api`에 모아서 관리하고, 엔드포인트별로 그룹화하는 접근 방식입니다. 파일 구조는 다음과 같습니다:

- 📂 shared
    - 📂 api
        - 📂 endpoints
            - 📄 login.ts
            - other endpoint functions…
        - 📄 client.ts
        - 📄 index.ts

`📄 client.ts` 파일은 요청을 수행하는 원시 함수(예: `fetch()`)에 대한 wrapper를 포함합니다. 이 wrapper는 백엔드의 기본 URL 설정, 헤더 설정, 데이터 직렬화 등을 처리합니다.

```ts title="shared/api/endpoints/login.ts"
import { POST } from "../client";

export function login({ email, password }: { email: string, password: string }) {
    return POST("/login", { email, password });
}
```

```ts title="shared/api/index.ts"
export { login } from "./endpoints/login";
```

#### page의 `api` segment에 저장하기 

로그인 요청이 특정 page에만 필요한 경우, 로그인 page의 `api` segment에 함수를 저장할 수 있습니다:

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

이 함수는 page의 공개 API에서 내보낼 필요가 없습니다. 로그인 요청이 다른 곳에서 필요할 가능성이 낮기 때문입니다.

### 이중 인증(2FA)

앱이 이중 인증(2FA)을 지원하는 경우, 사용자가 일회용 비밀번호(OTP)를 입력할 수 있는 별도의 page로 이동해야 할 수 있습니다. 일반적으로 `POST /login` 요청은 사용자가 2FA를 활성화했음을 나타내는 플래그가 포함된 사용자 객체를 반환합니다. 이 플래그가 설정되면 사용자를 2FA page로 리디렉션해야 합니다.

2FA page는 로그인과 밀접하게 연관되어 있으므로 Pages layer의 `login` slice에 함께 저장하는 것이 좋습니다.<br/>

이중 인증을 처리하기 위해서는 `login()` 함수와 유사한 또 다른 요청 함수가 필요할 것입니다. 이러한 함수들은 `Shared`나 로그인 page의 `api` segment에 함께 배치할 수 있습니다.

## 인증된 요청의 토큰 저장 방법 {#how-to-store-the-token-for-authenticated-requests}

인증 방식이 로그인/비밀번호, OAuth, 2단계 인증 등 어떤 것이든, 결국 토큰이 발급됩니다. 이 토큰은 이후 요청에서 사용자 식별을 위해 저장되어야 합니다.

웹 애플리케이션에서는 **쿠키**를 사용해 토큰을 저장하는 것이 가장 일반적이고 이상적인 방법입니다. 쿠키를 사용하면 토큰을 수동으로 관리할 필요가 없으며, 복잡한 처리를 줄일 수 있습니다. 만약 서버 사이드 렌더링을 지원하는 프레임워크(예: [Remix][ext-remix])를 사용 중이라면, 서버 사이드 쿠키 인프라를 `shared/api`에 저장하는 것이 좋습니다. Remix를 사용하는 예시는 튜토리얼의 [인증 섹션][tutorial-authentication]에서 확인할 수 있습니다.

그러나 쿠키를 사용할 수 없는 상황에서는, 토큰을 직접 관리해야 합니다. 이 경우, 토큰 만료 시 갱신 로직을 함께 구현해야 할 수도 있습니다. 이 경우, 토큰 만료 시 갱신 로직을 함께 구현해야 합니다. FSD에서는 토큰을 저장할 수 있는 다양한 방법이 있습니다.

### Shared에 저장하기

`shared/api`에 저장하는 접근 방식은 API 클라이언트와 잘 맞아떨어집니다. 인증이 필요한 다른 요청 함수에서 이 토큰을 쉽게 사용할 수 있기 때문입니다. API 클라이언트에서 반응형 store나 module 수준 변수를 사용해 토큰을 저장하고, `login()/logout()` 함수에서 해당 상태를 업데이트할 수 있습니다.   

토큰 자동 갱신은 API 클라이언트에서 미들웨어 형태로 구현할 수 있습니다. 모든 요청마다 실행되며, 아래와 같은 방식으로 동작합니다:

- 사용자가 로그인하면 액세스 토큰과 갱신 토큰을 저장합니다.
- 인증이 필요한 요청을 수행합니다.
- 토큰이 만료되어 요청이 실패하면, 갱신 토큰을 사용해 새로운 토큰을 요청하고 저장한 후, 원래 요청을 다시 시도합니다.

이 방법의 단점 중 하나는 토큰 관리 로직이 요청 로직과 같은 위치에 있어, 복잡해질 수 있다는 점입니다. 간단한 경우에는 문제가 없겠지만, 토큰 관리 로직이 복잡한 경우에는 요청과 관리 로직을 분리하는 것이 좋습니다. 요청 및 API 클라이언트는 `shared/api`에 두고, 토큰 관리 로직은 `shared/auth`에 두는 방식으로 나눌 수 있습니다.

또 다른 단점은 백엔드가 토큰과 함께 현재 사용자 정보를 반환하는 경우, 이 정보를 별도로 저장하거나 `/me` 또는 `/users/current`와 같은 엔드포인트에서 다시 요청해야 한다는 점입니다.

### Entities에 저장하기

FSD 프로젝트에서는 user entity 또는 current user entity를 사용하는 것이 일반적입니다. 두 entity는 같은 것을 가리킬 수도 있습니다.

:::note

**현재 사용자**는 "viewer" 또는 "me"라고도 합니다. 이는 권한과 개인 정보를 가진 단일 인증 사용자와 공개적으로 접근 가능한 정보로 구성된 모든 사용자 목록을 구별하기 위해 사용됩니다.

:::

User entity에 토큰을 저장하려면 `model` segment에 reactive store를 생성해야 합니다. 이 store는 토큰과 user 객체를 모두 포함할 수 있습니다.

API 클라이언트는 일반적으로 `shared/api` 정의되거나 entity 전체에 분산되어 있습니다. 따라서 주요 과제는 layer의 임포트 규칙([import rule on layers][import-rule-on-layers])을 위반하지 않으면서 다른 요청에서도 토큰을 사용할 수 있도록 하는 것입니다.

> Layer 규칙: slice의 module은 자기보다 낮은 layer에 위치한 다른 slice만 import할 수 있습니다.

이 문제를 해결하기 위한 몇 가지 방법은 다음과 같습니다:

1. **요청 시마다 토큰 수동 전달**  
    이 방법은 가장 간단하지만, 번거롭고 타입 안전성이 보장되지 않으면 실수가 발생할 가능성이 큽니다. 또한 Shared의 API 클라이언트에 미들웨어 패턴을 적용하기 어렵습니다.
2. **앱 전역에서 글로벌 store로 토큰 관리**  
    토큰을 context나 `localStorage`에 저장하고, `shared/api`에 토큰 접근 키를 보관합니다. 토큰의 reactive store는 User entity에서 내보내며, 필요한 경우 context Provider는 App layer에서 설정합니다. 이 방법은 API 클라이언트 설계를 유연하게 만들지만, 상위 layer에 context 제공이 필요하다는 암묵적인 의존성을 발생시킵니다. 따라서 context나 `localStorage`가 제대로 설정되지 않았을 경우, 유용한 오류 메시지를 제공하는 것이 좋습니다.
3. **토큰 변경 시 API 클라이언트 업데이트**  
    reactive store를 활용해 entity의 store가 변경될 때마다 API 클라이언트의 토큰 store를 업데이트하는 구독(subscribe)을 생성할 수 있습니다. 이 방법은 상위 layer에 암묵적인 의존성을 만든다는 점에서는 이전 해결책과 비슷하지만, 이 방법은 더 "명령형(push)" 접근이고, 이전 방법은 더 "선언형(pull)" 접근입니다.

entity의 `model` segment에 토큰을 저장하여 문제를 해결하면, 토큰 관리와 관련된 더 많은 비즈니스 로직을 추가할 수 있습니다. 예를 들어, `model` segment에 토큰 만료 시 갱신하는 로직을 추가하거나, 일정 시간이 지나면 토큰을 무효화하는 로직을 포함할 수 있습니다.
백엔드에 요청을 보내야 하는 경우에는 User entity의 api segment나 `shared/api`를 사용할 수 있습니다.

### Pages/Widgets에 저장하기 (권장하지 않음)

애플리케이션 전역에 적용되는 상태(예: 액세스 토큰)를 page나 widget에 저장하는 것은 권장되지 않습니다. 예를 들어, 로그인 page의 `model` segment에 토큰 store를 배치하는 대신, 이 아티클에서 제시한 처음 두 해결책인 Shared나 Entities를 사용하는 것이 권장됩니다.

## 로그아웃 및 토큰 무효화

로그아웃 기능은 애플리케이션에서 중요한 기능이지만, 이를 위한 별도의 page는 없는 경우가 많습니다. 이 기능은 백엔드에 인증된 요청을 보내고, 토큰 store를 업데이트하는 작업으로 구성됩니다.

모든 요청을 `shared/api`에 보관했다면, 로그인 함수 근처에 로그아웃 요청 함수를 두는 것이 좋습니다. 그렇지 않은 경우, 로그아웃 버튼이 있는 위치 근처에 로그아웃 요청 함수를 배치할 수 있습니다. 예를 들어, 모든 page에 나타나는 header widget에 로그아웃 링크가 있다면, 해당 요청을 그 widget의 `api` segment에 배치하는 것이 좋습니다.

토큰 store에 대한 업데이트는 로그아웃 버튼이 위치한 곳(예: header widget)에서 트리거되어야 합니다. 이 요청과 store 업데이트를 해당 widget의 `model` segment에서 결합할 수 있습니다.

### 자동 로그아웃

로그아웃 요청 실패나 로그인 토큰 갱신 실패 시를 대비해 안전장치를 마련하는 것도 중요합니다. 이 두 경우 모두 토큰 store를 비워야 합니다. 토큰을 Entities에 저장하는 경우, 이 로직은 `model` segment에 배치할 수 있습니다. 토큰을 Shared에 저장하는 경우, 이 로직을 `shared/api`에 포함하면 segment가 너무 복잡해질 수 있습니다. 따라서 토큰 관리 로직을 별도의 segment(예: `shared/auth`)로 분리하는 것도 고려해볼 만합니다.

[tutorial-authentication]: /docs/get-started/tutorial#authentication
[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-remix]: https://remix.run
[ext-zod]: https://zod.dev