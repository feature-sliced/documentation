# NextJS와 함께 사용하기

NextJS 프로젝트에도 FSD 아키텍처를 적용할 수 있지만, 구조적 차이로 두 가지 충돌이 발생합니다.

* **`pages` layer 라우팅 파일**
* **NextJS에서 `app` layer의 충돌 또는 미지원**

## `pages` layer 충돌[​](#pages-conflict "해당 헤딩으로 이동")

NextJS는 파일 시스템 기반 라우팅을 위해 **`pages` 폴더**의 파일을 URL에 매핑합니다.<br /><!-- -->그러나 이 방식은 FSD에서 권장하는 **평탄(flat)한 slice 구조**와 맞지 않아 충돌이 발생합니다.

### NextJS `pages` 폴더를 Project Root로 이동 (권장)[​](#nextjs-pages-폴더를-project-root로-이동-권장 "해당 헤딩으로 이동")

`pages` 폴더를 **프로젝트 최상위**로 옮긴 뒤,<br />FSD `src/pages`의 각 페이지 컴포넌트를 `pages` 폴더에서 **re-export** 하면 NextJS 라우팅과 FSD 구조를 모두 유지할 수 있습니다.

```
├── pages              # NextJS 라우팅 폴더 (FSD pages를 재-export)
│   └── index.tsx     
│   └── about.tsx      
├── src
│   ├── app
│   ├── entities
│   ├── features
│   ├── pages          # FSD pages layer 
│   ├── shared
│   └── widgets
```

### FSD pages layer 이름 변경[​](#fsd-pages-layer-이름-변경 "해당 헤딩으로 이동")

FSD의 `pages` layer 이름을 변경해 NextJS `pages` 폴더와 충돌을 방지할 수 있습니다.<br /><!-- -->예를 들어, `pages`를 `views`로 바꾸면 라우팅 폴더와 FSD 페이지 layer를 동시에 사용할 수 있습니다.

```
├── app
├── entities
├── features
├── pages              # NextJS 라우팅 폴더
├── views              # 변경된 FSD pages layer
├── shared
├── widgets
```

폴더 이름을 변경했다면 프로젝트 README나 내부 문서에 반드시 기록해야 합니다.<br /><!-- -->이 내용을 [프로젝트 지식](/documentation/kr/docs/about/understanding/knowledge-types.md)에 포함해 팀원들이 쉽게 확인할 수 있도록 하세요.

## NextJS에서 `app` layer 구현하기[​](#app-absence "해당 헤딩으로 이동")

NextJS 13 이전 버전에는 FSD app layer에 대응하는 전용 폴더가 없습니다.<br /><!-- -->대신 pages/\_app.tsx가 모든 페이지의 wrapping component로 작동합니다.<br /><!-- -->이 파일에서 전역 상태 관리(global state management)와 레이아웃 구성(layout)을 담당합니다.

### `pages/_app.tsx`에 app layer 기능 통합하기[​](#pages_apptsx에-app-layer-기능-통합하기 "해당 헤딩으로 이동")

먼저 `src/app/providers/index.tsx`에 `App` 컴포넌트를 정의합니다.<br /><!-- -->이 컴포넌트에서 전체 애플리케이션의 provider와 layout을 설정합니다.

```
// app/providers/index.tsx

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider1>
      <Provider2>
        <BaseLayout>
            <Component {...pageProps} />
        </BaseLayout>
      </Provider2>
    </Provider1>
  );
};

export default App;
```

다음으로 `pages/_app.tsx`에서 위 `App` 컴포넌트를 export합니다.<br /><!-- -->이 과정에서 global style도 함께 import할 수 있습니다.

```
// pages/_app.tsx

import 'app/styles/index.scss'

export { default } from 'app/providers';
```

## App Router 사용하기[​](#app-router "해당 헤딩으로 이동")

NextJS 13.4부터 `app` 폴더 기반 App Router를 지원합니다.<br /><!-- -->FSD 아키텍처를 App Router와 함께 사용하려면 다음 구조를 적용하세요.

`app` 폴더는 NextJS App Router 전용입니다.<br />`src/app`은 FSD의 app layer를 유지합니다. 필요에 따라 App Router와 Pages Router를 함께 사용할 수 있습니다.

```
├── app                # NextJS의 App Router용 폴더
├── pages              # NextJS의 Pages Router용 폴더 (선택적)
│   ├── README.md      # 폴더의 용도 설명
├── src
│   ├── app            # FSD의 app layer
│   ├── entities
│   ├── features
│   ├── pages          # FSD의 pages layer
│   ├── shared
│   ├── widgets
```

`app` 폴더에서 `src/pages`의 컴포넌트를 re-export하세요.<br /><!-- -->App Router만 사용해도 `Pages Router`와의 호환성을 위해 `root pages` 폴더를 유지합니다.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/stackblitz-starters-aiez55?file=README.md)

## Middleware[​](#middleware "해당 헤딩으로 이동")

NextJS middleware 파일은 반드시 프로젝트 root 폴더(`app` 또는 `pages` 폴더와 동일 수준)에 둬야 합니다.<br />`src` 아래에 두면 NextJS가 인식하지 않으므로, middleware 파일을 root로 이동하세요.

## 참고 자료[​](#see-also "해당 헤딩으로 이동")

* [(스레드) NextJS의 pages 폴더에 대한 토론](https://t.me/feature_sliced/3623)
