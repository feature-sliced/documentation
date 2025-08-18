# NuxtJS와 함께 사용하기

NuxtJS 프로젝트에 FSD(Feature-Sliced Design)를 도입할 때는 기본 구조와 FSD 원칙 간에 다음과 같은 차이를 고려해야 합니다:

* NuxtJS는 `src` 폴더 없이 project root에서 파일을 관리합니다.
* NuxtJS는 `pages` 폴더 기반 파일 라우팅을 사용하지만, FSD는 slice 관점에서 폴더를 구성합니다.

## `src` 폴더 alias 설정하기[​](#src-폴더-alias-설정하기 "해당 헤딩으로 이동")

NuxtJS 프로젝트에도 `src` 폴더를 두고 싶다면, `nuxt.config.ts`의 `alias`에 매핑을 추가하세요.

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // 개발 도구 활성화(선택 사항)
  alias: {
    "@": '../src' // root의 src 폴더를 @로 참조
  },
})
```

## 라우터 설정 방법 선택하기[​](#라우터-설정-방법-선택하기 "해당 헤딩으로 이동")

NuxtJS에서는 두 가지 라우팅 방식을 지원합니다:

* **파일 기반 라우팅**: `src/app/routes` 폴더 내 `.vue` 파일을 자동으로 라우트로 등록
* **설정 기반 라우팅**: `src/app/router.options.ts`에서 라우트를 직접 정의

### 설정 기반 라우팅[​](#설정-기반-라우팅 "해당 헤딩으로 이동")

`src/app/router.options.ts` 파일을 생성한 뒤, 아래와 같이 `RouterConfig`를 정의하세요:

app/router.options.ts

```
import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
  routes: (_routes) => [],
};
```

Home 페이지를 추가하려면 다음 순서로 진행합니다.

1. `pages` layer에 Home page slice를 생성합니다.
2. `app/router.options.ts`에 Home 라우트를 등록합니다.

page slice는 [CLI](https://github.com/feature-sliced/cli)를 사용하여 생성할 수 있습니다:

```
fsd pages home
```

`src/pages/home/ui/home-page.vue`를 만든 뒤, Public API로 노출합니다.

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page';
```

프로젝트 구조는 다음과 같습니다.

```
|── src
│   ├── app
│   │   ├── router.options.ts
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.vue
│   │   │   ├── index.ts
```

이제 `router.options.ts`의 routes 배열에 Home 라우트를 추가합니다.

app/router.options.ts

```
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/home.vue').then(r => r.default || r)
    }
  ],
}
```

### 파일 기반 라우팅[​](#파일-기반-라우팅 "해당 헤딩으로 이동")

#### `src` 폴더와 라우트 폴더 구성[​](#src-폴더와-라우트-폴더-구성 "해당 헤딩으로 이동")

루트에 `src` 폴더를 만들고 그 안에 `app`과 `pages` layer를 생성합니다. `app` layer에 `routes` 폴더를 추가해 Nuxt 라우트를 관리합니다.

```
├── src
│   ├── app
│   │   ├── routes
│   ├── pages                         # FSD Pages layer
```

#### nuxt.config.ts에서 라우트 폴더 변경[​](#nuxtconfigts에서-라우트-폴더-변경 "해당 헤딩으로 이동")

`pages` 폴더 대신 `app/routes` 폴더를 라우트 폴더로 사용하도록 설정하려면, `nuxt.config.ts` 파일을 수정해야 합니다.

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // 개발 도구 활성화 (FSD와 무관)
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes'
  }
})
```

이제 `app/routes`에서 라우트를 만들고 `pages`의 컴포넌트를 연결할 수 있습니다.

`Home` 페이지를 추가하려면:

* `pages` layer에 slice를 생성합니다.
* `app/routes`에 라우트를 생성합니다.
* page slice의 컴포넌트를 라우트에서 사용할 수 있도록 연결합니다.

#### 1. page slice 생성[​](#1-page-slice-생성 "해당 헤딩으로 이동")

page slice는 [CLI](https://github.com/feature-sliced/cli)를 사용하여 간편하게 생성할 수 있습니다:

```
fsd pages home
```

이제 `ui` segment 내에 `home-page.vue` 파일을 생성하고, Public API를 통해 이를 노출합니다:

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page';
```

#### 2. `app/routes` 내에 라우트 추가[​](#2-approutes-내에-라우트-추가 "해당 헤딩으로 이동")

생성한 page를 라우트와 연결하려면, `app/routes/index.vue` 파일을 생성하고 `HomePage` 컴포넌트를 등록해야 합니다.

```

├── src
│   ├── app
│   │   ├── routes
│   │   │   ├── index.vue
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.vue
│   │   │   ├── index.ts
```

#### 3. `index.vue`에서 page 컴포넌트 등록[​](#3-indexvue에서-page-컴포넌트-등록 "해당 헤딩으로 이동")

src/app/routes/index.vue

```
<script setup>
  import { HomePage } from '@/pages/home';
</script>

<template>
  <HomePage/>
</template>
```

이제 `HomePage`가 Nuxt 라우팅으로 정상 렌더링됩니다.

## `layouts` 관리하기[​](#layouts-관리하기 "해당 헤딩으로 이동")

레이아웃 파일을 `src/app/layouts`에 두고, `nuxt.config.ts`의 `dir.layouts`에 경로를 지정합니다.

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true }, // 개발 도구 활성화 (FSD와 무관)
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes',
    layouts: './src/app/layouts'
  }
})
```

## 참고 자료[​](#참고-자료 "해당 헤딩으로 이동")

* [NuxtJS dir 설정 문서](https://nuxt.com/docs/api/nuxt-config#dir)
* [NuxtJS 라우터 설정 변경 문서](https://nuxt.com/docs/guide/recipes/custom-routing#router-config)
* [NuxtJS 별칭(alias) 설정 문서](https://nuxt.com/docs/api/nuxt-config#alias)
