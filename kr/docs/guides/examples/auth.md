# Authentication

일반적으로 **인증(Authentication)** 플로우는 세 단계로 구성됩니다.

1. **Credential 입력 수집** — 아이디, 패스워드(또는 OAuth redirect URL)를 입력받습니다.
2. **백엔드 Endpoint 호출** — `/login`, `/oauth/callback`, `/2fa` 등 로그인 관련 API endpoint에 request을 보냅니다.
3. **Token 저장** — 발급된 token을 **cookie** 또는 **store** 에 저장해 이후 request에 사용합니다.

## 1. Credential 입력 수집[​](#1-credential-입력-수집 "해당 헤딩으로 이동")

> OAuth 로그인을 사용한다면 **2단계를 건너뛰고 바로 [token 저장](#how-to-store-the-token-for-authenticated-requests)** 단계로 이동합니다.

### 1‑1. 로그인 전용 페이지[​](#11-로그인전용-페이지 "해당 헤딩으로 이동")

웹 애플리케이션에서는 보통 **/login** 같은 로그인 전용 페이지를 제공해 사용자 이름과 패스워드를 입력받습니다.<br /><!-- -->페이지가 단순하므로 추가 **decomposition(구조 분할)** 이 필요 없으며, 로그인 폼과 회원가입 폼을 하나의 컴포넌트로 만들어 재사용할 수 있습니다.

* 📂 pages

  * 📂 login

    <!-- -->

    * 📂 ui

      <!-- -->

      * 📄 LoginPage.tsx (or your framework's component file format)
      * 📄 RegisterPage.tsx

    * 📄 index.ts

  * other pages…

* `LoginPage`·`RegisterPage` 두 컴포넌트를 **분리**해 구현하고, 필요 시 `index.ts`에서 export 합니다.

* 각 컴포넌트는 **form elements**와 form submit handler만 포함해 단순성을 유지합니다.

### 1‑2. 로그인 dialog 만들기[​](#12-로그인dialog-만들기 "해당 헤딩으로 이동")

모든 페이지에서 호출할 로그인 dialog가 필요하다면 **재사용 가능한 widget**으로 구현하세요.<br /><!-- -->widget으로 만들면 과도하게 구조를 쪼개지 않으면서도, 어떤 페이지에서도 동일한 dialog을 쉽게 띄울 수 있습니다.

* 📂 widgets

  <!-- -->

  * 📂 login-dialog

    <!-- -->

    * 📂 ui
      <!-- -->
      * 📄 LoginDialog.tsx
    * 📄 index.ts

  * other widgets…

> 이후 설명은 로그인 전용 페이지를 기준으로 하지만, 동일한 원칙이 dialog widget에도 적용됩니다.

### 1‑3. Client‑side Validation[​](#13-clientsidevalidation "해당 헤딩으로 이동")

회원가입 페이지에서 입력 오류를 즉시 알려 주는 것이 UX에 도움이 됩니다.<br /><!-- -->검증 schema는 `pages/login/model` segment에 정의하고 `ui` segment에서 재사용하세요.<br /><!-- -->아래 예시는 [Zod](https://zod.dev) 로 타입과 값을 동시에 검증하는 패턴입니다.

pages/login/model/registration-schema.ts

```
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

그런 다음, ui segment에서 이 schema를 사용해 사용자 입력을 검증할 수 있습니다:

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

## 2. Send credentials[​](#2-send-credentials "해당 헤딩으로 이동")

사용자 **credentials**(e‑mail, password)을 백엔드 **endpoint**로 전송하는 request 함수을 생성합니다.<br /><!-- -->이 함수는 Zustand, Redux Toolkit, **TanStack Query** `useMutation` 등에서 호출할 수 있습니다.

### 2‑1. 함수 placement[​](#21-함수-placement "해당 헤딩으로 이동")

| 목적        | 권장 위치         | 이유                       |
| ----------- | ----------------- | -------------------------- |
| 전역 재사용 | `shared/api`      | 모든 slice에서 import 가능 |
| 로그인 전용 | `pages/login/api` | slice 내부 capsule 유지    |

#### `shared/api`에 저장하기[​](#sharedapi에-저장하기 "해당 헤딩으로 이동")

모든 API request을 `shared/api`에 모아 endpoint로 그룹화합니다.

* 📂 shared

  <!-- -->

  * 📂 api

    <!-- -->

    * 📂 endpoints

      <!-- -->

      * 📄 login.ts
      * other endpoint functions…

    * 📄 client.ts

    * 📄 index.ts

`📄 client.ts`는 원시 request 함수(`fetch` 등)를 감싸 **기본 URL, 공통 헤더, 직렬화** 등을 처리합니다.

shared/api/endpoints/login.ts

```
import { POST } from "../client";

export function login({ email, password }: { email: string, password: string }) {
    return POST("/login", { email, password });
}
```

shared/api/index.ts

```
export { login } from "./endpoints/login";
```

#### page의 `api` segment에 저장하기[​](#page의-api-segment에-저장하기 "해당 헤딩으로 이동")

로그인 요청이 로그인 페이지에서만 필요하다면, 해당 페이지의 `api` segment에 함수를 두십시오.

* 📂 pages

  <!-- -->

  * 📂 login

    <!-- -->

    * 📂 api
      <!-- -->
      * 📄 login.ts
    * 📂 ui
      <!-- -->
      * 📄 LoginPage.tsx
    * 📄 index.ts

  * other pages…

pages/login/api/login.ts

```
import { POST } from "shared/api";

export function login({ email, password }: { email: string, password: string }) {
    return POST("/login", { email, password });
}
```

> 이 함수는 로그인 페이지 내부에서만 사용하므로 index.ts에 재-export할 필요가 없습니다.

### Two‑Factor Auth (2FA)[​](#twofactorauth2fa "해당 헤딩으로 이동")

1. `/login` 응답에 `has2FA` 플래그가 있으면 `/login/2fa` 페이지로 redirect합니다.
2. 2FA 페이지와 관련 API는 `pages/login` slice에 함께 둡니다.
3. `/2fa/verify` 같은 별도 endpoint를 호출하는 함수를 `shared/api` 또는 `pages/login/api`에 배치합니다.

## Authenticated Requests를 위한 token 저장[​](#how-to-store-the-token-for-authenticated-requests "해당 헤딩으로 이동")

로그인, 비밀번호, OAuth, 2단계 인증 등 어떤 방식이든 인증 API 호출의 **응답(response)** 으로 token을 받습니다.<br /><!-- -->이 token을 저장해 두면 이후 **모든 API 요청(request)** 에 token을 자동으로 포함해 인증을 통과할 수 있습니다.

웹 애플리케이션에서 token을 저장하기에 **가장 바람직한 방법은 cookie**입니다. cookie를 사용하면 token을 직접 저장하거나 관리할 필요가 없으므로, 프론트엔드 아키텍처 차원에서 별도의 고려가 거의 필요 없습니다. 프레임워크에 서버 사이드 기능이 있다면(예: [Remix](https://remix.run)), 서버 측 cookie 로직을 `shared/api`에 두세요. Remix 예제는 [튜토리얼의 Authentication 섹션](/documentation/kr/docs/get-started/tutorial.md#authentication)을 참고하면 됩니다.

그러나 cookie를 사용할 수 없는 환경도 있습니다. 이 경우 token을 **직접** 저장하고, 만료 시 token을 갱신(Refresh)하는 로직도 구현해야 합니다. FSD에서는 **어느 layer 또는 어느 segment에** token을 저장할지, 그리고 **어떻게** 앱 전역에 노출할지 다양한 선택지가 존재합니다.

### 3‑1. Shared[​](#31-shared "해당 헤딩으로 이동")

이 접근법은 `shared/api`에 정의한 **API 클라이언트**와 잘 어울리는 방식입니다. token을 module scope나 reactive store에 담아 두면, 인증이 필요한 다른 API 호출 함수에서 그대로 참조할 수 있습니다.

token 자동 재발급(Refresh)는 클라이언트 **middleware**로 구현합니다.

1. 로그인 시 **access token, refresh token** 저장
2. 인증이 필요한 request 실행
3. 만료 코드가 오면 refresh token으로 새 token을 받아 저장하고 **기존 request**을 재시도

#### Token 관리 분리 전략[​](#token-관리-분리-전략 "해당 헤딩으로 이동")

* **전담 segment 부재**<br /><!-- -->token 저장, 재발급 로직이 request 로직과 같은 파일에 섞이면<br /><!-- -->규모가 커질수록 유지보수가 어려워집니다.<br /><!-- -->→ **request 함수, 클라이언트**는 `shared/api`,<br />**token 관리 로직**은 `shared/auth` segment로 분리하세요.

* **token과 사용자 정보를 함께 받는 경우**<br /><!-- -->백엔드가 token과 함께 **현재 사용자 정보**를 반환한다면

  1. 별도 store에 함께 저장하거나
  2. `/me`·`/users/current` 엔드포인트를 다시 호출해 가져올 수 있습니다.

### 3‑2. Entities[​](#32-entities "해당 헤딩으로 이동")

FSD 프로젝트에서는 **User entity**(또는 **Current User entity**)를 두는 경우가 많습니다.<br /><!-- -->두 entity가 하나로 합쳐져도 무방합니다.

note

**Current User**는 “viewer” 또는 “me”라고도 부릅니다.<br /><!-- -->권한·개인 정보가 있는 **단일 인증 사용자**와, 공개 목록에 나타나는 **모든 사용자 목록**를 구분하기 위해서입니다.

#### Token을 User Entities에 저장하기[​](#token을-user-entities에-저장하기 "해당 헤딩으로 이동")

`model` segment에 **reactive store**를 만들고, token과 user 객체를 함께 보관하세요.

API 클라이언트는 일반적으로 `shared/api` 정의되거나 entity 전체에 분산되어 있습니다. 따라서 주요 과제는 layer의 import 규칙([import rule on layers](/documentation/kr/docs/reference/layers.md#import-rule-on-layers))을 위반하지 않으면서 다른 request에서도 token을 사용할 수 있도록 하는 것입니다.

> Layer 규칙 — Slice의 module은 **자기보다 아래 layer**의 Slice만 import할 수 있습니다.

##### 해결 방법[​](#해결-방법 "해당 헤딩으로 이동")

1. **request마다 token을 직접 넘기기**

   * 구현은 단순하지만 반복적이고, 타입 안전성이 없으면 실수 위험이 큽니다.
   * `shared/api`에 middleware pattern을 적용하기도 어렵습니다.

2. **앱 전역(Context / `localStorage`)에 노출**

   * token key는 `shared/api`에 두고, token store는 User entity에서 export합니다.
   * Context Provider는 App layer에 배치합니다.
   * 설계 자유도가 높지만, 상위 layer에 **암묵적 의존성**이 생깁니다.
     <br />
     <!-- -->
     ⇒ Context나 `localStorage`가 누락된 경우 **명확한 에러**를 제공해 주세요.

3. **token이 바뀔 때마다 API 클라이언트에 업데이트**

   * store **subscription**으로 "token 변경 → 클라이언트 상태 업데이트”를 수행합니다.

   * 방법 2와 마찬가지로 암묵적 의존성이 있으나,

     <!-- -->

     * 방법 2는 **선언형(pull)**,
     * 방법 3은 **명령형(push)** 접근입니다.

token을 노출한 뒤에는 `model` segment에 **비즈니스 로직**을 추가할 수 있습니다.

* 만료 시간 도달 시 token 갱신
* 일정 시간이 지나면 token 자동 무효화

실제 백엔드 호출은 **User entity의 `api` segment**나 `shared/api`에서 수행하세요.

### 3‑3. Pages / Widgets — 권장하지 않음[​](#33pages--widgets권장하지-않음 "해당 헤딩으로 이동")

* page, widget layer에 token을 저장하면 전역 의존성이 생기고 다른 slice에서 재사용하기 어려워집니다.
* `Shared` 또는 `Entities` 중 한 곳에 token을 저장하는 것을 권장합니다.

## 4. Logout & Token Invalidation[​](#4logouttokeninvalidation "해당 헤딩으로 이동")

### 로그아웃과 token 무효화[​](#로그아웃과-token-무효화 "해당 헤딩으로 이동")

일반적으로 애플리케이션에는 `로그아웃 전용 페이지`가 없습니다.<br /><!-- -->그러나 로그아웃 기능은 매우 중요하며 다음 두 단계로 이루어집니다.

1. 백엔드에 인증된 로그아웃 request (예: `POST /logout`)
2. token store reset (access/refresh token 모두 제거)

> 모든 API request을 `shared/api`에 모아 관리한다면, 로그아웃 API는 `login()` 근처 (`shared/api/endpoints/logout.ts`)에 배치합니다.<br /><!-- -->특정 UI(예: Header)에서만 호출된다면 `widgets/header/api/logout.ts` 같이 버튼 근처에 두는 것도 좋습니다.

token store reset은 로그아웃 버튼을 가진 UI에서 트리거됩니다.<br /><!-- -->request와 reset를 widget의 `model` segment에 함께 둘 수도 있습니다.

### 자동 로그아웃[​](#자동-로그아웃 "해당 헤딩으로 이동")

다음 두 경우에는 반드시 token store를 초기화하세요.

* 로그아웃 request 실패
* 로그인 token 갱신(`/refresh`) 실패

> token을 Entities(User)에 보관한다면 해당 entitle의 `model` segment에서 초기화 코드를 둡니다.<br /><!-- -->Shared layer라면 `shared/auth` segment로 분리하는 것도 좋습니다.
