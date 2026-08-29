# Tutorial

## Part 1. 설계

이 튜토리얼에서는 Real World App이라고도 알려진 Conduit를 살펴보겠습니다. Conduit는 기본적인 [Medium](https://medium.com/) 클론입니다 - 글을 읽고 쓸 수 있으며 다른 사람의 글에 댓글을 달 수 있습니다.

![Conduit home page](../../../../../../static/img/tutorial/realworld-feed-anonymous.jpg)

이 애플리케이션은 매우 작은 애플리케이션이므로 과도한 분해를 피하고 간단하게 유지할 것입니다. 전체 애플리케이션이 세 개의 레이어인 **App**, **Pages**, 그리고 **Shared**에 맞춰 들어갈 것입니다. 그렇지 않다면 우리는 계속해서 추가적인 레이어를 도입할 것입니다. 준비되셨나요?

### 먼저 페이지를 나열해 봅시다.

위의 스크린샷을 보면 최소한 다음과 같은 페이지들이 있다고 가정할 수 있습니다:

- 홈 (글 피드)
- 로그인 및 회원가입
- 글 읽기
- 글 편집기
- 사용자 프로필 보기
- 사용자 프로필 편집 (사용자 설정)

이 페이지들 각각은 Pages *레이어*의 독립된 *슬라이스*가 될 것입니다. 개요에서 언급했듯이 슬라이스는 단순히 레이어 내의 폴더이고, 레이어는 `pages`와 같은 미리 정의된 이름을 가진 폴더일 뿐입니다.

따라서 우리의 Pages 폴더는 다음과 같이 보일 것입니다.

- pages/
  - feed/
  - sign-in/
  - article-read/
  - article-edit/
  - profile/
  - settings/
Feature-Sliced Design이 규제되지 않은 코드 구조와 다른 주요 차이점은 페이지들이 서로를 참조할 수 없다는 것입니다. 즉, 한 페이지가 다른 페이지의 코드를 가져올 수 없습니다. 이는 **레이어의 import 규칙** 때문입니다.

*슬라이스의 모듈은 엄격히 아래에 있는 레이어에 위치한 다른 슬라이스만 가져올 수 있습니다.*

이 경우 페이지는 슬라이스이므로, 이 페이지 내의 모듈(파일)은 같은 레이어인 Pages가 아닌 아래 레이어의 코드만 참조할 수 있습니다.

### 피드 자세히 보기

<figure>
  ![Anonymous user’s perspective](../../../../../../static/img/tutorial/realworld-feed-anonymous.jpg)
  <figcaption>
    _익명 사용자의 관점_
  </figcaption>
</figure>

<figure>
  ![Authenticated user’s perspective](../../../../../../static/img/tutorial/realworld-feed-authenticated.jpg)
  <figcaption>
    _인증된 사용자의 관점_
  </figcaption>
</figure>

피드 페이지에는 세 가지 동적 영역이 있습니다.

1. 로그인 여부를 나타내는 로그인 링크
2. 피드에서 필터링을 트리거하는 태그 목록
3. 좋아요 버튼이 있는 하나/두 개의 글 피드

로그인 링크는 모든 페이지에 공통적인 헤더의 일부이므로 나중에 따로 다루겠습니다.

#### 태그 목록

태그 목록을 만들기 위해서는 사용 가능한 태그를 가져오고, 각 태그를 칩으로 렌더링하고, 선택된 태그를 클라이언트 측 저장소에 저장해야 합니다. 이러한 작업들은 각각 "API 상호작용", "사용자 인터페이스", "저장소" 카테고리에 속합니다. Feature-Sliced Design에서는 코드를 *세그먼트*를 사용하여 목적별로 분리합니다. 세그먼트는 슬라이스 내의 폴더이며, 목적을 설명하는 임의의 이름을 가질 수 있지만, 일부 목적은 너무 일반적이어서 특정 세그먼트 이름에 대한 규칙이 있습니다.

- 📂 `api/` 백엔드 상호작용
- 📂 `ui/` 렌더링과 외관을 다루는 코드
- 📂 `model/` 저장소와 비즈니스 로직
- 📂 `config/` 기능 플래그, 환경 변수 및 기타 구성 형식

태그를 가져오는 코드는 `api`에, 태그 컴포넌트는 `ui`에, 저장소 상호작용은 `model`에 배치할 것입니다.

#### 글

같은 그룹화 원칙을 사용하여 글 피드를 같은 세 개의 세그먼트로 분해할 수 있습니다.

- 📂 `api/`: 좋아요 수가 포함된 페이지네이션된 글 가져오기
- 📂 `ui/`:
    - 태그가 선택된 경우 추가 탭을 렌더링할 수 있는 탭 목록
    - 개별 글
    - 기능적 페이지네이션
- 📂 `model/`: 현재 로드된 글과 현재 페이지의 클라이언트 측 저장소 (필요한 경우)

### 일반적인 코드 재사용

대부분의 페이지는 의도가 매우 다르지만, 앱 전체에 걸쳐 일부 요소는 동일하게 유지됩니다. 예를 들어, 디자인 언어를 준수하는 UI 키트나 모든 것이 동일한 인증 방식으로 REST API를 통해 수행되는 백엔드의 규칙 등이 있습니다. 슬라이스는 격리되도록 설계되었기 때문에, 코드 재사용은 더 낮은 계층인 **Shared**에 의해 촉진됩니다.

Shared는 슬라이스가 아닌 세그먼트를 포함한다는 점에서 다른 계층과 다릅니다. 이런 면에서 Shared 계층은 계층과 슬라이스의 하이브리드로 생각할 수 있습니다.

일반적으로 Shared의 코드는 미리 계획되지 않고 개발 중에 추출됩니다. 실제로 어떤 코드 부분이 공유되는지는 개발 중에만 명확해지기 때문입니다. 그러나 어떤 종류의 코드가 자연스럽게 Shared에 속하는지 머릿속에 메모해 두는 것은 여전히 도움이 됩니다.

- 📂 `ui/` — UI 키트, 비즈니스 로직이 없는 순수한 UI. 예: 버튼, 모달 대화 상자, 폼 입력.
- 📂 `api/` — 요청 생성 기본 요소(예: 웹의 `fetch()`)에 대한 편의 래퍼 및 선택적으로 백엔드 사양에 따라 특정 요청을 트리거하는 함수.
- 📂 `config/` — 환경 변수 파싱
- 📂 `i18n/` — 언어 지원에 대한 구성
- 📂 `router/` — 라우팅 기본 요소 및 라우트 상수

이는 Shared의 세그먼트 이름의 몇 가지 예시일 뿐이며, 이 중 일부를 생략하거나 자신만의 세그먼트를 만들 수 있습니다. 새로운 세그먼트를 만들 때 기억해야 할 유일한 중요한 점은 세그먼트 이름이 **본질(무엇인지)이 아닌 목적(왜)을 설명해야 한다**는 것입니다. "components", "hooks", "modals"과 같은 이름은 이 파일들이 무엇인지는 설명하지만 내부 코드를 탐색하는 데 도움이 되지 않기 때문에 사용해서는 안 됩니다. 이는 팀원들이 이러한 폴더의 모든 파일을 파헤쳐야 하며, 관련 없는 코드를 가까이 유지하게 되어 리팩토링의 영향을 받는 코드 영역이 넓어지고 결과적으로 코드 리뷰와 테스트를 더 어렵게 만듭니다.

### 엄격한 공개 API 정의

Feature-Sliced Design의 맥락에서 *공개 API*라는 용어는 슬라이스나 세그먼트가 프로젝트의 다른 모듈에서 가져올 수 있는 것을 선언하는 것을 의미합니다. 예를 들어, JavaScript에서는 슬라이스의 다른 파일에서 객체를 다시 내보내는 `index.js` 파일일 수 있습니다. 이를 통해 외부 세계와의 계약(즉, 공개 API)이 동일하게 유지되는 한 슬라이스 내부의 코드를 자유롭게 리팩토링할 수 있습니다.

슬라이스가 없는 Shared 계층의 경우, Shared의 모든 것에 대한 단일 인덱스를 정의하는 것과 반대로 각 세그먼트에 대해 별도의 공개 API를 정의하는 것이 일반적으로 더 편리합니다. 이렇게 하면 Shared에서의 가져오기가 자연스럽게 의도별로 구성됩니다. 슬라이스가 있는 다른 계층의 경우 반대가 사실입니다 — 일반적으로 슬라이스당 하나의 인덱스를 정의하고 슬라이스가 외부 세계에 알려지지 않은 자체 세그먼트 세트를 결정하도록 하는 것이 더 실용적입니다. 다른 계층은 일반적으로 내보내기가 훨씬 적기 때문입니다.

우리의 슬라이스/세그먼트는 서로에게 다음과 같이 나타날 것입니다.

- pages/
  - feed/
    - index
  - sign-in/
    - index
  - article-read/
    - index
  - ...
- shared/
  - ui/
    - index
  - api/
    - index
  - ...
`pages/feed`나 `shared/ui`와 같은 폴더 내부의 내용은 해당 폴더에만 알려져 있으며, 다른 파일은 이러한 폴더의 내부 구조에 의존해서는 안 됩니다.

### UI의 큰 재사용 블록

앞서 모든 페이지에 나타나는 헤더를 다시 살펴보기로 했습니다. 모든 페이지에서 처음부터 다시 만드는 것은 비실용적이므로 재사용하고 싶을 것입니다. 우리는 이미 코드 재사용을 용이하게 하는 Shared를 가지고 있지만, Shared에 큰 UI 블록을 넣는 데는 주의할 점이 있습니다 — Shared 계층은 위의 계층에 대해 알지 못해야 합니다.

Shared와 Pages 사이에는 Entities, Features, Widgets의 세 가지 다른 계층이 있습니다. 일부 프로젝트는 이러한 계층에 큰 재사용 가능한 블록에 필요한 것이 있을 수 있으며, 이는 해당 재사용 가능한 블록을 Shared에 넣을 수 없다는 것을 의미합니다. 그렇지 않으면 상위 계층에서 가져오게 되어 금지됩니다. 이것이 Widgets 계층이 필요한 이유입니다. Widgets는 Shared, Entities, Features 위에 위치하므로 이들 모두를 사용할 수 있습니다.

우리의 경우, 헤더는 매우 간단합니다 — 정적 로고와 최상위 탐색입니다. 탐색은 사용자가 현재 로그인했는지 여부를 확인하기 위해 API에 요청을 해야 하지만, 이는 `api` 세그먼트에서 간단한 가져오기로 처리할 수 있습니다. 따라서 우리는 헤더를 Shared에 유지할 것입니다.

### 폼이 있는 페이지 자세히 보기

읽기가 아닌 편집을 위한 페이지도 살펴보겠습니다.

![Conduit post editor](../../../../../../static/img/tutorial/realworld-editor-authenticated.jpg)

간단해 보이지만, 폼 유효성 검사, 오류 상태, 데이터 지속성 등 아직 탐구하지 않은 애플리케이션 개발의 여러 측면을 포함하고 있습니다.

이 페이지를 만들려면 Shared에서 일부 입력과 버튼을 가져와 이 페이지의 `ui` 세그먼트에서 폼을 구성할 것입니다. 그런 다음 `api` 세그먼트에서 백엔드에 글을 생성하는 변경 요청을 정의할 것입니다.

요청을 보내기 전에 유효성을 검사하려면 유효성 검사 스키마가 필요하며, 이를 위한 좋은 위치는 데이터 모델이기 때문에 `model` 세그먼트입니다. 여기서 오류 메시지를 생성하고 `ui` 세그먼트의 다른 컴포넌트를 사용하여 표시할 것입니다.

사용자 경험을 개선하기 위해 우발적인 데이터 손실을 방지하기 위해 입력을 지속시킬 수도 있습니다. 이것도 `model` 세그먼트의 작업입니다.

### 요약

우리는 여러 페이지를 검토하고 애플리케이션의 예비 구조를 개략적으로 설명했습니다.

1. Shared layer
   1. `ui`는 재사용 가능한 UI 키트를 포함할 것입니다.
   2. `api`는 백엔드와의 기본적인 상호작용을 포함할 것입니다.
   3. 나머지는 필요에 따라 정리될 것입니다.
2. Pages layer — 각 페이지는 별도의 슬라이스입니다.
   1. `ui`는 페이지 자체와 모든 부분을 포함할 것입니다.
   2. `api`는 `shared/api`를 사용하여 더 특화된 데이터 가져오기를 포함할 것입니다.
   3. `model`은 표시할 데이터의 클라이언트 측 저장소를 포함할 수 있습니다.

이제 코드 작성을 시작해 봅시다!

## Part 2. 코드 작성

이제 설계를 완료했으니 실제로 코드를 작성해 봅시다. React와 [Remix](https://remix.run)를 사용할 것입니다.

이 프로젝트를 위한 템플릿이 준비되어 있습니다. GitHub에서 클론하여 시작하세요. [https://github.com/feature-sliced/tutorial-conduit/tree/clean](https://github.com/feature-sliced/tutorial-conduit/tree/clean).

`npm install`로 의존성을 설치하고 `npm run dev`로 개발 서버를 시작하세요. http://localhost:3000을 열면 빈 앱이 보일 것입니다.

### 페이지 레이아웃

모든 페이지에 대한 빈 컴포넌트를 만드는 것부터 시작하겠습니다. 프로젝트에서 다음 명령을 실행하세요.

```bash
npx fsd pages feed sign-in article-read article-edit profile settings --segments ui
```

이렇게 하면 `pages/feed/ui/`와 같은 폴더와 모든 페이지에 대한 인덱스 파일인 `pages/feed/index.ts`가 생성됩니다.

### 피드 페이지 연결

애플리케이션의 루트 경로를 피드 페이지에 연결해 봅시다. `pages/feed/ui`에 `FeedPage.tsx` 컴포넌트를 만들고 다음 내용을 넣으세요:

```tsx title="pages/feed/ui/FeedPage.tsx"
export function FeedPage() {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    </div>
  );
}
```

그런 다음 피드 페이지의 공개 API인 `pages/feed/index.ts` 파일에서 이 컴포넌트를 다시 내보내세요.

```ts title="pages/feed/index.ts"
export { FeedPage } from "./ui/FeedPage";
```

이제 루트 경로에 연결합니다. Remix에서 라우팅은 파일 기반이며, 라우트 파일은 `app/routes` 폴더에 있어 Feature-Sliced Design과 잘 맞습니다.

`app/routes/_index.tsx`에서 `FeedPage` 컴포넌트를 사용하세요.

```tsx title="app/routes/_index.tsx"
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

그런 다음 개발 서버를 실행하고 애플리케이션을 열면 Conduit 배너가 보일 것입니다!

![The banner of Conduit](../../../../../../static/img/tutorial/conduit-banner.jpg)

### API 클라이언트

RealWorld 백엔드와 통신하기 위해 Shared에 편리한 API 클라이언트를 만들어 봅시다. 클라이언트를 위한 `api`와 백엔드 기본 URL과 같은 변수를 위한 `config`, 두 개의 세그먼트를 만드세요.

```bash
npx fsd shared --segments api config
```

그런 다음 `shared/config/backend.ts`를 만드세요.

```tsx title="shared/config/backend.ts"
export { mockBackendUrl as backendBaseUrl } from "mocks/handlers";
```

```tsx title="shared/config/index.ts"
export { backendBaseUrl } from "./backend";
```

RealWorld 프로젝트는 편리하게 [OpenAPI 사양](https://github.com/gothinkster/realworld/blob/main/api/openapi.yml)을 제공하므로, 클라이언트를 위한 자동 생성 타입을 활용할 수 있습니다. 추가 타입 생성기가 포함된 [`openapi-fetch` 패키지](https://openapi-ts.pages.dev/openapi-fetch/)를 사용할 것입니다.

다음 명령을 실행하여 최신 API 타입을 생성하세요.

```bash
npm run generate-api-types
```

이렇게 하면 `shared/api/v1.d.ts` 파일이 생성됩니다. 이 파일을 사용하여 `shared/api/client.ts`에 타입이 지정된 API 클라이언트를 만들 것입니다.

```tsx title="shared/api/client.ts"
import createClient from "openapi-fetch";

import { backendBaseUrl } from "shared/config";
import type { paths } from "./v1";

export const { GET, POST, PUT, DELETE } = createClient<paths>({ baseUrl: backendBaseUrl });
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";
```

### 피드의 실제 데이터

이제 백엔드에서 가져온 글을 피드에 추가할 수 있습니다. 글 미리보기 컴포넌트를 구현하는 것부터 시작하겠습니다.

다음 내용으로 `pages/feed/ui/ArticlePreview.tsx`를 만드세요.

```tsx title="pages/feed/ui/ArticlePreview.tsx"
export function ArticlePreview({ article }) { /* TODO */ }
```

TypeScript를 사용하고 있으므로 글 객체에 타입을 지정하면 좋을 것 같습니다. 생성된 `v1.d.ts`를 살펴보면 글 객체가 `components["schemas"]["Article"]`을 통해 사용 가능한 것을 볼 수 있습니다. 그럼 Shared에 데이터 모델이 있는 파일을 만들고 모델을 내보내겠습니다.

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";
```

이제 글 미리보기 컴포넌트로 돌아가 데이터로 마크업을 채울 수 있습니다. 컴포넌트를 다음 내용으로 업데이트하세요.

```tsx title="pages/feed/ui/ArticlePreview.tsx"
import { Link } from "@remix-run/react";
import type { Article } from "shared/api";

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`} prefetch="intent">
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <Link
            to={`/profile/${article.author.username}`}
            className="author"
            prefetch="intent"
          >
            {article.author.username}
          </Link>
          <span className="date" suppressHydrationWarning>
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link
        to={`/article/${article.slug}`}
        className="preview-link"
        prefetch="intent"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
```

좋아요 버튼은 지금은 아무 작업도 하지 않습니다. 글 읽기 페이지를 만들고 좋아요 기능을 구현할 때 수정하겠습니다.

이제 글을 가져와서 이러한 카드를 여러 개 렌더링할 수 있습니다. Remix에서 데이터 가져오기는 *로더* — 페이지가 필요로 하는 것을 정확히 가져오는 서버 측 함수 — 를 통해 수행됩니다. 로더는 페이지를 대신하여 API와 상호 작용하므로 페이지의 `api` 세그먼트에 넣을 것입니다:

```tsx title="pages/feed/api/loader.ts"
import { json } from "@remix-run/node";

import { GET } from "shared/api";

export const loader = async () => {
  const { data: articles, error, response } = await GET("/articles");

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return json({ articles });
};
```

페이지에 연결하려면 라우트 파일에서 `loader`라는 이름으로 내보내야 합니다.

```tsx title="pages/feed/index.ts"
export { FeedPage } from "./ui/FeedPage";
export { loader } from "./api/loader";
```

```tsx title="app/routes/_index.tsx"
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export { loader } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

마지막 단계는 피드에 이러한 카드를 렌더링하는 것입니다. `FeedPage`를 다음 코드로 업데이트하세요.

```tsx title="pages/feed/ui/FeedPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 태그로 필터링

태그와 관련해서는 백엔드에서 태그를 가져오고 현재 선택된 태그를 저장해야 합니다. 가져오기 방법은 이미 알고 있습니다 — 로더에서 또 다른 요청을 하면 됩니다. `remix-utils` 패키지에서 `promiseHash`라는 편리한 함수를 사용할 것입니다. 이 패키지는 이미 설치되어 있습니다.

로더 파일인 `pages/feed/api/loader.ts`를 다음 코드로 업데이트하세요.

```tsx title="pages/feed/api/loader.ts"
import { json } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async () => {
  return json(
    await promiseHash({
      articles: throwAnyErrors(GET("/articles")),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

오류 처리를 일반 함수 `throwAnyErrors`로 추출했다는 점에 주목하세요. 꽤 유용해 보이므로 나중에 재사용할 수 있을 것 같습니다. 지금은 그냥 주목해 두겠습니다.

이제 태그 목록으로 넘어갑시다. 이는 상호작용이 가능해야 합니다 — 태그를 클릭하면 해당 태그가 선택되어야 합니다. Remix 규칙에 따라 URL 검색 매개변수를 선택된 태그의 저장소로 사용할 것입니다. 브라우저가 저장을 처리하게 하고 우리는 더 중요한 일에 집중하겠습니다.

`pages/feed/ui/FeedPage.tsx`를 다음 코드로 업데이트하세요.

```tsx title="pages/feed/ui/FeedPage.tsx"
import { Form, useLoaderData } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const { articles, tags } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Form>
                <ExistingSearchParams exclude={["tag"]} />
                <div className="tag-list">
                  {tags.tags.map((tag) => (
                    <button
                      key={tag}
                      name="tag"
                      value={tag}
                      className="tag-pill tag-default"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

그런 다음 로더에서 `tag` 검색 매개변수를 사용해야 합니다. `pages/feed/api/loader.ts`의 `loader` 함수를 다음과 같이 변경하세요.

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", { params: { query: { tag: selectedTag } } }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

이게 전부입니다. `model` 세그먼트가 필요하지 않습니다. Remix는 꽤 깔끔하죠.

### 페이지네이션

비슷한 방식으로 페이지네이션을 구현할 수 있습니다. 직접 시도해 보거나 아래 코드를 복사하세요. 어차피 당신을 판단할 사람은 없습니다.

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

/** Amount of articles on one page. */
export const LIMIT = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "", 10);

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", {
          params: {
            query: {
              tag: selectedTag,
              limit: LIMIT,
              offset: !Number.isNaN(page) ? page * LIMIT : undefined,
            },
          },
        }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

```tsx title="pages/feed/ui/FeedPage.tsx"
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import { LIMIT, type loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const [searchParams] = useSearchParams();
  const { articles, tags } = useLoaderData<typeof loader>();
  const pageAmount = Math.ceil(articles.articlesCount / LIMIT);
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}

            <Form>
              <ExistingSearchParams exclude={["page"]} />
              <ul className="pagination">
                {Array(pageAmount)
                  .fill(null)
                  .map((_, index) =>
                    index + 1 === currentPage ? (
                      <li key={index} className="page-item active">
                        <span className="page-link">{index + 1}</span>
                      </li>
                    ) : (
                      <li key={index} className="page-item">
                        <button
                          className="page-link"
                          name="page"
                          value={index + 1}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ),
                  )}
              </ul>
            </Form>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Form>
                <ExistingSearchParams exclude={["tag", "page"]} />
                <div className="tag-list">
                  {tags.tags.map((tag) => (
                    <button
                      key={tag}
                      name="tag"
                      value={tag}
                      className="tag-pill tag-default"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

이것으로 완료되었습니다. 탭 목록도 비슷하게 구현할 수 있지만, 인증을 구현할 때까지 잠시 보류하겠습니다. 그런데 말이 나왔으니!

### 인증 \{#authentication}

인증에는 두 개의 페이지가 관련됩니다 - 로그인과 회원가입입니다. 이들은 대부분 동일하므로 필요한 경우 코드를 재사용할 수 있도록 `sign-in`이라는 동일한 슬라이스에 유지하는 것이 합리적입니다.

`pages/sign-in`의 `ui` 세그먼트에 다음 내용으로 `RegisterPage.tsx`를 만드세요.

```tsx title="pages/sign-in/ui/RegisterPage.tsx"
import { Form, Link, useActionData } from "@remix-run/react";

import type { register } from "../api/register";

export function RegisterPage() {
  const registerData = useActionData<typeof register>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            {registerData?.error && (
              <ul className="error-messages">
                {registerData.error.errors.body.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

이제 고쳐야 할 깨진 import가 있습니다. 새로운 세그먼트가 필요하므로 다음과 같이 만드세요.

```bash
npx fsd pages sign-in -s api
```

그러나 등록의 백엔드 부분을 구현하기 전에 Remix가 세션을 처리할 수 있도록 일부 인프라 코드가 필요합니다. 다른 페이지에서도 필요할 수 있으므로 이는 Shared로 갑니다.

다음 코드를 `shared/api/auth.server.ts`에 넣으세요. 이는 Remix에 매우 특화된 것이므로 너무 걱정하지 마세요. 그냥 복사-붙여넣기 하세요.

```tsx title="shared/api/auth.server.ts"
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { User } from "./models";

invariant(
  process.env.SESSION_SECRET,
  "SESSION_SECRET must be set for authentication to work",
);

const sessionStorage = createCookieSessionStorage<{
  user: User;
}>({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createUserSession({
  request,
  user,
  redirectTo,
}: {
  request: Request;
  user: User;
  redirectTo: string;
}) {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  session.set("user", user);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }),
    },
  });
}

export async function getUserFromSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  return session.get("user") ?? null;
}

export async function requireUser(request: Request) {
  const user = await getUserFromSession(request);

  if (user === null) {
    throw redirect("/login");
  }

  return user;
}
```

그리고 바로 옆에 있는 `models.ts` 파일에서 `User` 모델도 내보내세요.

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
export type User = components["schemas"]["User"];
```

이 코드가 작동하려면 `SESSION_SECRET` 환경 변수를 설정해야 합니다. 프로젝트 루트에 `.env` 파일을 만들고 `SESSION_SECRET=`을 작성한 다음 키보드에서 무작위로 키를 눌러 긴 무작위 문자열을 만드세요. 다음과 같은 결과가 나와야 합니다.

```bash title=".env"
SESSION_SECRET=dontyoudarecopypastethis
```

마지막으로 이 코드를 사용하기 위해 공개 API에 일부 내보내기를 추가하세요.

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
```

이제 RealWorld 백엔드와 실제로 통신하여 등록을 수행하는 코드를 작성할 수 있습니다. 그것을 `pages/sign-in/api`에 유지할 것입니다. `register.ts`라는 파일을 만들고 다음 코드를 넣으세요.

```tsx title="pages/sign-in/api/register.ts"
import { json, type ActionFunctionArgs } from "@remix-run/node";

import { POST, createUserSession } from "shared/api";

export const register = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const { data, error } = await POST("/users", {
    body: { user: { email, password, username } },
  });

  if (error) {
    return json({ error }, { status: 400 });
  } else {
    return createUserSession({
      request: request,
      user: data.user,
      redirectTo: "/",
    });
  }
};
```

```tsx title="pages/sign-in/index.ts"
export { RegisterPage } from './ui/RegisterPage';
export { register } from './api/register';
```

거의 다 왔습니다! 페이지와 액션을 `/register` 라우트에 연결하기만 하면 됩니다. `app/routes`에 `register.tsx`를 만드세요.

```tsx title="app/routes/register.tsx"
import { RegisterPage, register } from "pages/sign-in";

export { register as action };

export default RegisterPage;
```

이제 `http://localhost:3000/register`로 가면 사용자를 생성할 수 있어야 합니다! 애플리케이션의 나머지 부분은 아직 이에 반응하지 않을 것입니다. 곧 그 문제를 해결하겠습니다.

매우 유사한 방식으로 로그인 페이지를 구현할 수 있습니다. 직접 시도해 보거나 그냥 코드를 가져와서 계속 진행하세요.

```tsx title="pages/sign-in/api/sign-in.ts"
import { json, type ActionFunctionArgs } from "@remix-run/node";

import { POST, createUserSession } from "shared/api";

export const signIn = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const { data, error } = await POST("/users/login", {
    body: { user: { email, password } },
  });

  if (error) {
    return json({ error }, { status: 400 });
  } else {
    return createUserSession({
      request: request,
      user: data.user,
      redirectTo: "/",
    });
  }
};
```

```tsx title="pages/sign-in/ui/SignInPage.tsx"
import { Form, Link, useActionData } from "@remix-run/react";

import type { signIn } from "../api/sign-in";

export function SignInPage() {
  const signInData = useActionData<typeof signIn>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            {signInData?.error && (
              <ul className="error-messages">
                {signInData.error.errors.body.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

```tsx title="pages/sign-in/index.ts"
export { RegisterPage } from './ui/RegisterPage';
export { register } from './api/register';
export { SignInPage } from './ui/SignInPage';
export { signIn } from './api/sign-in';
```

```tsx title="app/routes/login.tsx"
import { SignInPage, signIn } from "pages/sign-in";

export { signIn as action };

export default SignInPage;
```

이제 사용자가 이 페이지에 실제로 접근할 수 있는 방법을 제공해 봅시다.

### 헤더

1부에서 논의했듯이, 앱 헤더는 일반적으로 Widgets나 Shared에 배치됩니다. 매우 간단하고 모든 비즈니스 로직을 외부에 유지할 수 있기 때문에 Shared에 넣을 것입니다. 이를 위한 장소를 만들어 봅시다.

```bash
npx fsd shared ui
```

이제 다음 내용으로 `shared/ui/Header.tsx`를 만드세요.

```tsx title="shared/ui/Header.tsx"
import { useContext } from "react";
import { Link, useLocation } from "@remix-run/react";

import { CurrentUser } from "../api/currentUser";

export function Header() {
  const currentUser = useContext(CurrentUser);
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/" prefetch="intent">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link
              prefetch="intent"
              className={`nav-link ${pathname == "/" ? "active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>
          {currentUser == null ? (
            <>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/login" ? "active" : ""}`}
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/register" ? "active" : ""}`}
                  to="/register"
                >
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/editor" ? "active" : ""}`}
                  to="/editor"
                >
                  <i className="ion-compose"></i>&nbsp;New Article{" "}
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/settings" ? "active" : ""}`}
                  to="/settings"
                >
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname.includes("/profile") ? "active" : ""}`}
                  to={`/profile/${currentUser.username}`}
                >
                  {currentUser.image && (
                    <img
                      width={25}
                      height={25}
                      src={currentUser.image}
                      className="user-pic"
                      alt=""
                    />
                  )}
                  {currentUser.username}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
```

이 컴포넌트를 `shared/ui`에서 내보내세요.

```tsx title="shared/ui/index.ts"
export { Header } from "./Header";
```

헤더에서는 `shared/api`에 유지되는 컨텍스트에 의존합니다. 그것도 만드세요.

```tsx title="shared/api/currentUser.ts"
import { createContext } from "react";

import type { User } from "./models";

export const CurrentUser = createContext<User | null>(null);
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
export { CurrentUser } from "./currentUser";
```

이제 페이지에 헤더를 추가해 봅시다. 모든 페이지에 있어야 하므로 루트 라우트에 추가하고 outlet(페이지가 렌더링될 위치)을 `CurrentUser` 컨텍스트 제공자로 감싸는 것이 합리적입니다. 이렇게 하면 전체 앱과 헤더가 현재 사용자 객체에 접근할 수 있습니다. 또한 쿠키에서 실제로 현재 사용자 객체를 가져오는 로더를 추가할 것입니다. `app/root.tsx`에 다음 내용을 넣으세요.

```tsx title="app/root.tsx"
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { Header } from "shared/ui";
import { getUserFromSession, CurrentUser } from "shared/api";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = ({ request }: LoaderFunctionArgs) =>
  getUserFromSession(request);

export default function App() {
  const user = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        <style>{`
          button {
            border: 0;
          }
        `}</style>
      </head>
      <body>
        <CurrentUser.Provider value={user}>
          <Header />
          <Outlet />
        </CurrentUser.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

이 시점에서 홈 페이지에 다음과 같은 내용이 표시되어야 합니다.

<figure>
  ![The feed page of Conduit, including the header, the feed, and the tags. The tabs are still missing.](../../../../../../static/img/tutorial/realworld-feed-without-tabs.jpg)

  <figcaption>헤더, 피드, 태그를 포함한 Conduit의 피드 페이지. 탭은 아직 없습니다.</figcaption>
</figure>

### 탭

이제 인증 상태를 감지할 수 있으므로 탭과 글 좋아요를 빠르게 구현하여 피드 페이지를 완성해 봅시다. 또 다른 폼이 필요하지만 이 페이지 파일이 꽤 커지고 있으므로 이러한 폼을 인접한 파일로 옮기겠습니다. `Tabs.tsx`, `PopularTags.tsx`, `Pagination.tsx`를 다음 내용으로 만들 것입니다.

```tsx title="pages/feed/ui/Tabs.tsx"
import { useContext } from "react";
import { Form, useSearchParams } from "@remix-run/react";

import { CurrentUser } from "shared/api";

export function Tabs() {
  const [searchParams] = useSearchParams();
  const currentUser = useContext(CurrentUser);

  return (
    <Form>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {currentUser !== null && (
            <li className="nav-item">
              <button
                name="source"
                value="my-feed"
                className={`nav-link ${searchParams.get("source") === "my-feed" ? "active" : ""}`}
              >
                Your Feed
              </button>
            </li>
          )}
          <li className="nav-item">
            <button
              className={`nav-link ${searchParams.has("tag") || searchParams.has("source") ? "" : "active"}`}
            >
              Global Feed
            </button>
          </li>
          {searchParams.has("tag") && (
            <li className="nav-item">
              <span className="nav-link active">
                <i className="ion-pound"></i> {searchParams.get("tag")}
              </span>
            </li>
          )}
        </ul>
      </div>
    </Form>
  );
}
```

```tsx title="pages/feed/ui/PopularTags.tsx"
import { Form, useLoaderData } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import type { loader } from "../api/loader";

export function PopularTags() {
  const { tags } = useLoaderData<typeof loader>();

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <Form>
        <ExistingSearchParams exclude={["tag", "page", "source"]} />
        <div className="tag-list">
          {tags.tags.map((tag) => (
            <button
              key={tag}
              name="tag"
              value={tag}
              className="tag-pill tag-default"
            >
              {tag}
            </button>
          ))}
        </div>
      </Form>
    </div>
  );
}
```

```tsx title="pages/feed/ui/Pagination.tsx"
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import { LIMIT, type loader } from "../api/loader";

export function Pagination() {
  const [searchParams] = useSearchParams();
  const { articles } = useLoaderData<typeof loader>();
  const pageAmount = Math.ceil(articles.articlesCount / LIMIT);
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  return (
    <Form>
      <ExistingSearchParams exclude={["page"]} />
      <ul className="pagination">
        {Array(pageAmount)
          .fill(null)
          .map((_, index) =>
            index + 1 === currentPage ? (
              <li key={index} className="page-item active">
                <span className="page-link">{index + 1}</span>
              </li>
            ) : (
              <li key={index} className="page-item">
                <button className="page-link" name="page" value={index + 1}>
                  {index + 1}
                </button>
              </li>
            ),
          )}
      </ul>
    </Form>
  );
}
```

이제 `FeedPage`를 다음과 같이 업데이트하세요.

```tsx title="pages/feed/ui/FeedPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";
import { Tabs } from "./Tabs";
import { PopularTags } from "./PopularTags";
import { Pagination } from "./Pagination";

export function FeedPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Tabs />

            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}

            <Pagination />
          </div>

          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
}
```

마지막으로 로더를 업데이트하여 새로운 필터를 처리하세요.

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, requireUser } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  /* unchanged */
}

/** Amount of articles on one page. */
export const LIMIT = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "", 10);

  if (url.searchParams.get("source") === "my-feed") {
    const userSession = await requireUser(request);

    return json(
      await promiseHash({
        articles: throwAnyErrors(
          GET("/articles/feed", {
            params: {
              query: {
                limit: LIMIT,
                offset: !Number.isNaN(page) ? page * LIMIT : undefined,
              },
            },
            headers: { Authorization: `Token ${userSession.token}` },
          }),
        ),
        tags: throwAnyErrors(GET("/tags")),
      }),
    );
  }

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", {
          params: {
            query: {
              tag: selectedTag,
              limit: LIMIT,
              offset: !Number.isNaN(page) ? page * LIMIT : undefined,
            },
          },
        }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

피드 페이지를 떠나기 전에, 글에 대한 좋아요를 처리하는 코드를 추가해 봅시다. `ArticlePreview.tsx`를 다음과 같이 변경하세요.

```tsx title="pages/feed/ui/ArticlePreview.tsx"
import { Form, Link } from "@remix-run/react";
import type { Article } from "shared/api";

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`} prefetch="intent">
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <Link
            to={`/profile/${article.author.username}`}
            className="author"
            prefetch="intent"
          >
            {article.author.username}
          </Link>
          <span className="date" suppressHydrationWarning>
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
        </div>
        <Form
          method="post"
          action={`/article/${article.slug}`}
          preventScrollReset
        >
          <button
            name="_action"
            value={article.favorited ? "unfavorite" : "favorite"}
            className={`btn ${article.favorited ? "btn-primary" : "btn-outline-primary"} btn-sm pull-xs-right`}
          >
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </Form>
      </div>
      <Link
        to={`/article/${article.slug}`}
        className="preview-link"
        prefetch="intent"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
```

이 코드는 글에 좋아요를 표시하기 위해 `/article/:slug`로 `_action=favorite`과 함께 POST 요청을 보냅니다. 아직 작동하지 않겠지만, 글 읽기 페이지 작업을 시작하면서 이것도 구현할 것입니다.

이것으로 피드가 공식적으로 완성되었습니다! 야호!

### 글 읽기 페이지

먼저 데이터가 필요합니다. 로더를 만들어 봅시다.

```bash
npx fsd pages article-read -s api
```

```tsx title="pages/article-read/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, getUserFromSession } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.slug, "Expected a slug parameter");
  const currentUser = await getUserFromSession(request);
  const authorization = currentUser
    ? { Authorization: `Token ${currentUser.token}` }
    : undefined;

  return json(
    await promiseHash({
      article: throwAnyErrors(
        GET("/articles/{slug}", {
          params: {
            path: { slug: params.slug },
          },
          headers: authorization,
        }),
      ),
      comments: throwAnyErrors(
        GET("/articles/{slug}/comments", {
          params: {
            path: { slug: params.slug },
          },
          headers: authorization,
        }),
      ),
    }),
  );
};
```

```tsx title="pages/article-read/index.ts"
export { loader } from "./api/loader";
```

이제 `/article/:slug` 라우트에 연결할 수 있습니다. `article.$slug.tsx`라는 라우트 파일을 만드세요.

```tsx title="app/routes/article.$slug.tsx"
export { loader } from "pages/article-read";
```

페이지 자체는 세 가지 주요 블록으로 구성됩니다 - 글 헤더와 액션(두 번 반복), 글 본문, 댓글 섹션입니다. 다음은 페이지의 마크업입니다. 특별히 흥미로운 내용은 없습니다:

```tsx title="pages/article-read/ui/ArticleReadPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticleMeta } from "./ArticleMeta";
import { Comments } from "./Comments";

export function ArticleReadPage() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.article.title}</h1>

          <ArticleMeta />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.article.body}</p>
            <ul className="tag-list">
              {article.article.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta />
        </div>

        <div className="row">
          <Comments />
        </div>
      </div>
    </div>
  );
}
```

더 흥미로운 것은 `ArticleMeta`와 `Comments`입니다. 이들은 글 좋아요, 댓글 작성 등과 같은 쓰기 작업을 포함합니다. 이들을 작동시키려면 먼저 백엔드 부분을 구현해야 합니다. 페이지의 `api` 세그먼트에 `action.ts`를 만드세요:

```tsx title="pages/article-read/api/action.ts"
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { namedAction } from "remix-utils/named-action";
import { redirectBack } from "remix-utils/redirect-back";
import invariant from "tiny-invariant";

import { DELETE, POST, requireUser } from "shared/api";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const currentUser = await requireUser(request);

  const authorization = { Authorization: `Token ${currentUser.token}` };

  const formData = await request.formData();

  return namedAction(formData, {
    async delete() {
      invariant(params.slug, "Expected a slug parameter");
      await DELETE("/articles/{slug}", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirect("/");
    },
    async favorite() {
      invariant(params.slug, "Expected a slug parameter");
      await POST("/articles/{slug}/favorite", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async unfavorite() {
      invariant(params.slug, "Expected a slug parameter");
      await DELETE("/articles/{slug}/favorite", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async createComment() {
      invariant(params.slug, "Expected a slug parameter");
      const comment = formData.get("comment");
      invariant(typeof comment === "string", "Expected a comment parameter");
      await POST("/articles/{slug}/comments", {
        params: { path: { slug: params.slug } },
        headers: { ...authorization, "Content-Type": "application/json" },
        body: { comment: { body: comment } },
      });
      return redirectBack(request, { fallback: "/" });
    },
    async deleteComment() {
      invariant(params.slug, "Expected a slug parameter");
      const commentId = formData.get("id");
      invariant(typeof commentId === "string", "Expected an id parameter");
      const commentIdNumeric = parseInt(commentId, 10);
      invariant(
        !Number.isNaN(commentIdNumeric),
        "Expected a numeric id parameter",
      );
      await DELETE("/articles/{slug}/comments/{id}", {
        params: { path: { slug: params.slug, id: commentIdNumeric } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async followAuthor() {
      const authorUsername = formData.get("username");
      invariant(
        typeof authorUsername === "string",
        "Expected a username parameter",
      );
      await POST("/profiles/{username}/follow", {
        params: { path: { username: authorUsername } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async unfollowAuthor() {
      const authorUsername = formData.get("username");
      invariant(
        typeof authorUsername === "string",
        "Expected a username parameter",
      );
      await DELETE("/profiles/{username}/follow", {
        params: { path: { username: authorUsername } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
  });
};
```

그 슬라이스에서 이를 내보내고 라우트에서도 내보내세요. 그리고 페이지 자체도 연결하겠습니다.

```tsx title="pages/article-read/index.ts"
export { ArticleReadPage } from "./ui/ArticleReadPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

```tsx title="app/routes/article.$slug.tsx"
import { ArticleReadPage } from "pages/article-read";

export { loader, action } from "pages/article-read";

export default ArticleReadPage;
```

이제 독자 페이지에서 좋아요 버튼을 아직 구현하지 않았지만, 피드의 좋아요 버튼이 작동하기 시작할 것입니다! 이 라우트로 "좋아요" 요청을 보내고 있었기 때문입니다. 한번 시도해 보세요.

`ArticleMeta`와 `Comments`는 다시 한번 폼들의 모음입니다. 이전에 이미 해봤으니, 코드를 가져와서 넘어가겠습니다.

```tsx title="pages/article-read/ui/ArticleMeta.tsx"
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useContext } from "react";

import { CurrentUser } from "shared/api";
import type { loader } from "../api/loader";

export function ArticleMeta() {
  const currentUser = useContext(CurrentUser);
  const { article } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <div className="article-meta">
        <Link
          prefetch="intent"
          to={`/profile/${article.article.author.username}`}
        >
          <img src={article.article.author.image} alt="" />
        </Link>

        <div className="info">
          <Link
            prefetch="intent"
            to={`/profile/${article.article.author.username}`}
            className="author"
          >
            {article.article.author.username}
          </Link>
          <span className="date">{article.article.createdAt}</span>
        </div>

        {article.article.author.username == currentUser?.username ? (
          <>
            <Link
              prefetch="intent"
              to={`/editor/${article.article.slug}`}
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="ion-edit"></i> Edit Article
            </Link>
            &nbsp;&nbsp;
            <button
              name="_action"
              value="delete"
              className="btn btn-sm btn-outline-danger"
            >
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </>
        ) : (
          <>
            <input
              name="username"
              value={article.article.author.username}
              type="hidden"
            />
            <button
              name="_action"
              value={
                article.article.author.following
                  ? "unfollowAuthor"
                  : "followAuthor"
              }
              className={`btn btn-sm ${article.article.author.following ? "btn-secondary" : "btn-outline-secondary"}`}
            >
              <i className="ion-plus-round"></i>
              &nbsp;{" "}
              {article.article.author.following
                ? "Unfollow"
                : "Follow"}{" "}
              {article.article.author.username}
            </button>
            &nbsp;&nbsp;
            <button
              name="_action"
              value={article.article.favorited ? "unfavorite" : "favorite"}
              className={`btn btn-sm ${article.article.favorited ? "btn-primary" : "btn-outline-primary"}`}
            >
              <i className="ion-heart"></i>
              &nbsp; {article.article.favorited
                ? "Unfavorite"
                : "Favorite"}{" "}
              Post{" "}
              <span className="counter">
                ({article.article.favoritesCount})
              </span>
            </button>
          </>
        )}
      </div>
    </Form>
  );
}
```

```tsx title="pages/article-read/ui/Comments.tsx"
import { useContext } from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { CurrentUser } from "shared/api";
import type { loader } from "../api/loader";

export function Comments() {
  const { comments } = useLoaderData<typeof loader>();
  const currentUser = useContext(CurrentUser);

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {currentUser !== null ? (
        <Form
          preventScrollReset={true}
          method="post"
          className="card comment-form"
        >
          <div className="card-block">
            <textarea
              required
              className="form-control"
              name="comment"
              placeholder="Write a comment..."
              rows={3}
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              src={currentUser.image}
              className="comment-author-img"
              alt=""
            />
            <button
              className="btn btn-sm btn-primary"
              name="_action"
              value="createComment"
            >
              Post Comment
            </button>
          </div>
        </Form>
      ) : (
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <p>
              <Link to="/login">Sign in</Link>
              &nbsp; or &nbsp;
              <Link to="/register">Sign up</Link>
              &nbsp; to add comments on this article.
            </p>
          </div>
        </div>
      )}

      {comments.comments.map((comment) => (
        <div className="card" key={comment.id}>
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>

          <div className="card-footer">
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              <img
                src={comment.author.image}
                className="comment-author-img"
                alt=""
              />
            </Link>
            &nbsp;
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              {comment.author.username}
            </Link>
            <span className="date-posted">{comment.createdAt}</span>
            {comment.author.username === currentUser?.username && (
              <span className="mod-options">
                <Form method="post" preventScrollReset={true}>
                  <input type="hidden" name="id" value={comment.id} />
                  <button
                    name="_action"
                    value="deleteComment"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <i className="ion-trash-a"></i>
                  </button>
                </Form>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

이것으로 우리의 글 읽기 페이지도 완성되었습니다! 이제 작성자를 팔로우하고, 글에 좋아요를 누르고, 댓글을 남기는 버튼들이 예상대로 작동해야 합니다.

<figure>
  ![Article reader with functioning buttons to like and follow](../../../../../../static/img/tutorial/realworld-article-reader.jpg)

  <figcaption>기능하는 좋아요와 팔로우 버튼이 있는 글 읽기 페이지</figcaption>
</figure>

### 글 작성 페이지

이것은 이 튜토리얼에서 다룰 마지막 페이지이며, 여기서 가장 흥미로운 부분은 폼 데이터를 어떻게 검증할 것인가 입니다.

페이지 자체인 `article-edit/ui/ArticleEditPage.tsx`는 꽤 간단할 것이며, 추가적인 복잡성은 다른 두 개의 컴포넌트로 숨겨질 것입니다.

```tsx title="pages/article-edit/ui/ArticleEditPage.tsx"
import { Form, useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { TagsInput } from "./TagsInput";
import { FormErrors } from "./FormErrors";

export function ArticleEditPage() {
  const article = useLoaderData<typeof loader>();

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormErrors />

            <Form method="post">
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="title"
                    placeholder="Article Title"
                    defaultValue={article.article?.title}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="What's this article about?"
                    defaultValue={article.article?.description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    name="body"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    defaultValue={article.article?.body}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <TagsInput
                    name="tags"
                    defaultValue={article.article?.tagList ?? []}
                  />
                </fieldset>

                <button className="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

이 페이지는 현재 글(새로 작성하는 경우가 아니라면)을 가져와서 해당하는 폼 필드를 채웁니다. 이전에 본 적이 있습니다. 흥미로운 부분은 `FormErrors`인데, 이는 검증 결과를 받아 사용자에게 표시할 것입니다. 한번 살펴보겠습니다.

```tsx title="pages/article-edit/ui/FormErrors.tsx"
import { useActionData } from "@remix-run/react";
import type { action } from "../api/action";

export function FormErrors() {
  const actionData = useActionData<typeof action>();

  return actionData?.errors != null ? (
    <ul className="error-messages">
      {actionData.errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  ) : null;
}
```

여기서는 우리의 액션이 `errors` 필드, 즉 사람이 읽을 수 있는 오류 메시지 배열을 반환할 것이라고 가정하고 있습니다. 곧 액션에 대해 다루겠습니다.

또 다른 컴포넌트는 태그 입력입니다. 이는 단순한 입력 필드에 선택된 태그의 추가적인 미리보기가 있는 것입니다. 여기에는 특별한 것이 없습니다:

```tsx title="pages/article-edit/ui/TagsInput.tsx"
import { useEffect, useRef, useState } from "react";

export function TagsInput({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: Array<string>;
}) {
  const [tagListState, setTagListState] = useState(defaultValue ?? []);

  function removeTag(tag: string): void {
    const newTagList = tagListState.filter((t) => t !== tag);
    setTagListState(newTagList);
  }

  const tagsInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    tagsInput.current && (tagsInput.current.value = tagListState.join(","));
  }, [tagListState]);

  return (
    <>
      <input
        type="text"
        className="form-control"
        id="tags"
        name={name}
        placeholder="Enter tags"
        defaultValue={tagListState.join(",")}
        onChange={(e) =>
          setTagListState(e.target.value.split(",").filter(Boolean))
        }
      />
      <div className="tag-list">
        {tagListState.map((tag) => (
          <span className="tag-default tag-pill" key={tag}>
            <i
              className="ion-close-round"
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                [" ", "Enter"].includes(e.key) && removeTag(tag)
              }
              onClick={() => removeTag(tag)}
            ></i>{" "}
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
```

이제 API 부분입니다. 로더는 URL을 살펴보고, 글 슬러그가 포함되어 있다면 기존 글을 수정하는 것이므로 해당 데이터를 로드해야 합니다. 그렇지 않으면 아무것도 반환하지 않습니다. 그 로더를 만들어 봅시다.

```ts title="pages/article-edit/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";

import { GET, requireUser } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const currentUser = await requireUser(request);

  if (!params.slug) {
    return { article: null };
  }

  return throwAnyErrors(
    GET("/articles/{slug}", {
      params: { path: { slug: params.slug } },
      headers: { Authorization: `Token ${currentUser.token}` },
    }),
  );
};
```

액션은 새로운 필드 값들을 받아 우리의 데이터 스키마를 통해 실행하고, 모든 것이 올바르다면 이러한 변경사항을 백엔드에 커밋합니다. 이는 기존 글을 업데이트하거나 새 글을 생성하는 방식으로 이루어집니다.

```tsx title="pages/article-edit/api/action.ts"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";

import { POST, PUT, requireUser } from "shared/api";
import { parseAsArticle } from "../model/parseAsArticle";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const { body, description, title, tags } = parseAsArticle(
      await request.formData(),
    );
    const tagList = tags?.split(",") ?? [];

    const currentUser = await requireUser(request);
    const payload = {
      body: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      headers: { Authorization: `Token ${currentUser.token}` },
    };

    const { data, error } = await (params.slug
      ? PUT("/articles/{slug}", {
          params: { path: { slug: params.slug } },
          ...payload,
        })
      : POST("/articles", payload));

    if (error) {
      return json({ errors: error }, { status: 422 });
    }

    return redirect(`/article/${data.article.slug ?? ""}`);
  } catch (errors) {
    return json({ errors }, { status: 400 });
  }
};
```

스키마는 `FormData`를 위한 파싱 함수로도 작동하여, 깨끗한 필드를 편리하게 얻거나 마지막에 처리할 오류를 던질 수 있게 해줍니다. 그 파싱 함수는 다음과 같이 보일 수 있습니다.

```tsx title="pages/article-edit/model/parseAsArticle.ts"
export function parseAsArticle(data: FormData) {
  const errors = [];

  const title = data.get("title");
  if (typeof title !== "string" || title === "") {
    errors.push("Give this article a title");
  }

  const description = data.get("description");
  if (typeof description !== "string" || description === "") {
    errors.push("Describe what this article is about");
  }

  const body = data.get("body");
  if (typeof body !== "string" || body === "") {
    errors.push("Write the article itself");
  }

  const tags = data.get("tags");
  if (typeof tags !== "string") {
    errors.push("The tags must be a string");
  }

  if (errors.length > 0) {
    throw errors;
  }

  return { title, description, body, tags: data.get("tags") ?? "" } as {
    title: string;
    description: string;
    body: string;
    tags: string;
  };
}
```

물론 이는 다소 길고 반복적이지만, 사람이 읽을 수 있는 오류 메시지를 위해 우리가 지불해야 하는 대가입니다. 이것은 Zod 스키마일 수도 있지만, 그렇게 하면 프론트엔드에서 오류 메시지를 렌더링해야 하고, 이 폼은 그런 복잡성을 감당할 만한 가치가 없습니다.

마지막 단계로 - 페이지, 로더, 그리고 액션을 라우트에 연결합니다. 우리는 생성과 편집을 모두 깔끔하게 지원하므로 `editor._index.tsx`와 `editor.$slug.tsx` 모두에서 동일한 것을 내보낼 수 있습니다.

```tsx title="pages/article-edit/index.ts"
export { ArticleEditPage } from "./ui/ArticleEditPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

```tsx title="app/routes/editor._index.tsx, app/routes/editor.$slug.tsx (same content)"
import { ArticleEditPage } from "pages/article-edit";

export { loader, action } from "pages/article-edit";

export default ArticleEditPage;
```

이제 완료되었습니다! 로그인하고 새 글을 작성해보세요. 또는 글을 "잊어버리고" 검증이 작동하는 것을 확인해보세요.

<figure>
  ![The Conduit article editor, with the title field saying “New article” and the rest of the fields empty. Above the form there are two errors: “**Describe what this article is about” and “Write the article itself”.**](../../../../../../static/img/tutorial/realworld-article-editor.jpg)

  <figcaption>제목 필드에 "새 글"이라고 쓰여 있고 나머지 필드는 비어 있는 Conduit 글 편집기. 폼 위에 두 개의 오류가 있습니다. **"이 글이 무엇에 관한 것인지 설명해주세요"**, **"글 본문을 작성해주세요"**.</figcaption>
</figure>

프로필과 설정 페이지는 글 읽기와 편집기 페이지와 매우 유사하므로, 독자인 여러분의 연습 과제로 남겨두겠습니다 :)
