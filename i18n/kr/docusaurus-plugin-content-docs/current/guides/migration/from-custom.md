---
sidebar_position: 3
sidebar_label: 기존 아키텍처에서 전환하기
---

# 기존 아키텍처에서 FSD로의 마이그레이션

이 가이드는 기존 아키텍처를 **Feature-Sliced Design(FSD)** 으로 단계별 전환하는 방법을 설명합니다.

아래 폴더 구조를 예시로 살펴보세요. (파란 화살표를 클릭하면 펼쳐집니다).

<details className="file-tree">
      <summary>📁 src</summary>
      <ul>
            <li>
                  <details className="file-tree">
                        <summary>📁 actions</summary>
                        <ul>
                              <li>📁 product</li>
                              <li>📁 order</li>
                        </ul>
                  </details>
            </li>
            <li>📁 api</li>
            <li>📁 components</li>
            <li>📁 containers</li>
            <li>📁 constants</li>
            <li>📁 i18n</li>
            <li>📁 modules</li>
            <li>📁 helpers</li>
            <li>
                  <details className="file-tree">
                        <summary>📁 routes</summary>
                        <ul>
                              <li>📁 products.jsx</li>
                              <li>📄 products.[id].jsx</li>
                        </ul>
                  </details>
            </li>
            <li>📁 utils</li>
            <li>📁 reducers</li>
            <li>📁 selectors</li>
            <li>📁 styles</li>
            <li>📄 App.jsx</li>
            <li>📄 index.js</li>
      </ul>
</details>

## 시작 전 체크리스트 {#before-you-start}

Feature-Sliced Design(FSD)이 **정말 필요한지 먼저 확인하세요.**  
모든 프로젝트가 새로운 아키텍처를 요구하는 것은 아닙니다.

### 전환을 고려해야 할 징후

1. 신규 팀원이 프로젝트에 적응하기 어려워하는 경우
2. 코드 일부를 수정할 때, 관련 없는 다른 코드에 오류가 발생하는 경우가 **잦은** 경우 
3. 새 기능을 추가할 때 고려해야 할 사항이 너무 많아 어려움을 겪는 경우

**팀의 합의 없이 FSD 전환을 시작하지 마세요.**  
팀 리더라도 전환의 이점이 학습·전환 비용을 상회한다는 점을 먼저 설득해야 합니다.  
또한, 개선 효과가 바로 눈에 띄지 않을 수 있으므로 **팀원** 및 **프로젝트 매니저(PM)** 의 승인을 사전에 확보하고 이점을 공유하세요.

:::tip PM 설득 시 고려할 사항

- FSD 전환은 단계적으로 진행할 수 있어 기존 기능 개발을 중단하지 않아도 됩니다.  
- 명확한 아키텍처 구조는 신규 개발자 온보딩 시간을 단축합니다.  
- 공식 문서를 활용하면 별도 문서 유지·관리 비용을 절감할 수 있습니다.  

:::

---

마이그레이션을 시작하기로 결정했다면, `📁 src` 폴더에 별칭(alias)을 설정하는 것을 첫 단계로 삼으세요.<br/>

## 1단계: 페이지 단위로 코드 분리하기 {#divide-code-by-pages}

대부분의 커스텀 아키텍처는 규모와 관계없이 이미 어느 정도 페이지 단위로 코드를 나누고 있습니다. `📁 pages` 폴더가 있다면 이 단계를 건너뛰어도 됩니다.


위에 예시 폴더처럼 `📁 routes`만 있다면 다음 순서를 따르세요.

1. `📁 pages` 폴더를 새로 만듭니다.  
2. `📁 routes`에 있던 **페이지용 컴포넌트**를 가능한 한 모두 `📁 pages` 폴더로 옮깁니다. 
3. 코드를 옮길 때마다 해당 페이지 전용 폴더를 만들고 그 안에 `index` 파일을 추가해 entry를 노출합니다.

:::note

이 단계에서는 **Page A에서 Page B의 코드를 import**해도 괜찮습니다. 나중 단계에서 이러한 의존성을 분리할 예정이니, 우선 **페이지 폴더를 만드는 것**에 집중하세요.

:::

route file:

```js title="src/routes/products.[id].js"
export { ProductPage as default } from "src/pages/product"
```

page index file:

```js title="src/pages/product/index.js"
export { ProductPage } from "./ProductPage.jsx"
```

page component file:

```jsx title="src/pages/product/ProductPage.jsx"
export function ProductPage(props) {
  return <div />;
}
```

## 2단계: 페이지 외부 코드를 분리하기 {#separate-everything-else-from-pages}

1. **`📁 src/shared` 폴더를 만든다.**  
   - `📁 pages` 또는 `📁 routes`를 **import하지 않는** 모든 코드를 이곳으로 이동한다.  
2. **`📁 src/app` 폴더를 만든다.**  
   - `📁 pages` 또는 `📁 routes`를 **import하는** 코드를 이곳으로 옮긴다. 라우트 파일도 여기에 포함한다.

> **Shared layer에는 slice가 없다.**  
> 따라서 segment 간 import는 자유롭다.

이제 폴더 구조는 다음과 같아야 합니다:

<details className="file-tree" open>
      <summary>📁 src</summary>
      <ul>
            <li>
                  <details className="file-tree">
                        <summary>📁 app</summary>
                        <ul>
                              <li>
                                    <details className="file-tree">
                                          <summary>📁 routes</summary>
                                          <ul>
                                                <li>📄 products.jsx</li>
                                                <li>📄 products.[id].jsx</li>
                                          </ul>
                                    </details>
                              </li>
                              <li>📄 App.jsx</li>
                              <li>📄 index.js</li>
                        </ul>
                  </details>
            </li>
            <li>
                  <details className="file-tree">
                        <summary>📁 pages</summary>
                        <ul>
                              <li>
                                    <details className="file-tree">
                                          <summary>📁 product</summary>
                                          <ul>
                                                <li>
                                                      <details className="file-tree">
                                                            <summary>📁 ui</summary>
                                                            <ul>
                                                                  <li>📄 ProductPage.jsx</li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li>📄 index.js</li>
                                          </ul>
                                    </details>
                              </li>
                              <li>📁 catalog</li>
                        </ul>
                  </details>
            </li>
            <li>
                  <details className="file-tree">
                        <summary>📁 shared</summary>
                        <ul>
                              <li>📁 actions</li>
                              <li>📁 api</li>
                              <li>📁 components</li>
                              <li>📁 containers</li>
                              <li>📁 constants</li>
                              <li>📁 i18n</li>
                              <li>📁 modules</li>
                              <li>📁 helpers</li>
                              <li>📁 utils</li>
                              <li>📁 reducers</li>
                              <li>📁 selectors</li>
                              <li>📁 styles</li>
                        </ul>
                  </details>
            </li>
      </ul>
</details>

## 3단계: 페이지 간의 cross-imports 해결 {#tackle-cross-imports-between-pages}

<!-- A good way to approach this is by setting up [Steiger][ext-steiger], the linter for FSD.  -->
<!-- TODO: add instructions once the new config format is standardized -->

한 페이지가 다른 페이지의 코드를 가져오고 있다면 두 가지 방법으로 의존성을 제거한다.

| 방법 | 사용 시점 |
|------|-----------|
| **A. 코드 복사** | 페이지마다 로직이 달라질 가능성이 있거나, 재사용성이 낮을 때 |
| **B. Shared로 이동** | 여러 페이지에서 공통으로 쓰일 때 |


- Shared 이동 위치 예시
  - UI 구성 요소 → `📁 shared/ui`  
  - 설정 상수   → `📁 shared/config`  
  - 백엔드 호출  → `📁 shared/api`

:::note

코드 복사는 잘못이 아니다. **중복보다 의존성 최소화**가 더 중요할 때가 많다.  
다만 비즈니스 로직은 중복을 피해야 하며, 복사 시에도 DRY 원칙을 염두에 둔다.

:::

## 4단계: Shared 레이어 정리하기 {#unpack-shared-layer}

- **한 페이지에서만 쓰이는 코드**는 해당 페이지 **slice**로 이동한다.  
- `actions / reducers / selectors`도 예외가 아니다. **사용처와 가까이** 두는 편이 좋다.  

Shared는 모든 layer가 의존할 수 있는 **공통 의존점**이므로, 코드를 최소화해 변경 위험을 낮춘다.

최종 폴더 구조는 다음과 같아야 합니다:

<details className="file-tree" open>
      <summary>📁 src</summary>
      <ul>
            <li>📁 app (unchanged)</li>
            <li>
                  <details className="file-tree" open>
                        <summary>📁 pages</summary>
                        <ul>
                              <li>
                                    <details className="file-tree" open>
                                          <summary>📁 product</summary>
                                          <ul>
                                                <li>📁 actions</li>
                                                <li>📁 reducers</li>
                                                <li>📁 selectors</li>
                                                <li>
                                                      <details className="file-tree">
                                                            <summary>📁 ui</summary>
                                                            <ul>
                                                                  <li>📄 Component.jsx</li>
                                                                  <li>📄 Container.jsx</li>
                                                                  <li>📄 ProductPage.jsx</li>
                                                            </ul>
                                                      </details>
                                                </li>
                                                <li>📄 index.js</li>
                                          </ul>
                                    </details>
                              </li>
                              <li>📁 catalog</li>
                        </ul>
                  </details>
            </li>
            <li>
                  <details className="file-tree">
                        <summary>📁 shared (only objects that are reused)</summary>
                        <ul>
                              <li>📁 actions</li>
                              <li>📁 api</li>
                              <li>📁 components</li>
                              <li>📁 containers</li>
                              <li>📁 constants</li>
                              <li>📁 i18n</li>
                              <li>📁 modules</li>
                              <li>📁 helpers</li>
                              <li>📁 utils</li>
                              <li>📁 reducers</li>
                              <li>📁 selectors</li>
                              <li>📁 styles</li>
                        </ul>
                  </details>
            </li>
      </ul>
</details>

## 5단계: 기술적 목적별 segment 정리 {#organize-by-technical-purpose}


| segment | 용도 예시 |
|----------|-----------|
| `ui`     | Components, formatters, styles |
| `api`    | Backend requests, DTOs, mappers |
| `model`  | Store, schema, business logic |
| `lib`    | Shared utilities / helpers |
| `config` | Configuration files, feature flags |


> “**무엇인지**”가 아니라 “**무엇을 위해**” 존재하는지를 기준으로 나눈다.  
> 따라서 `components`, `utils`, `types` 같은 이름은 지양한다.

1. **각 페이지**에 `ui / model / api` 등 필요한 segment를 만든다.  
2. **Shared** 폴더를 정리한다.  
   - `components·containers` → `shared/ui`  
   - `helpers·utils` → `shared/lib` (기능별 그룹화 후)  
   - `constants` → `shared/config`


## 선택 단계 {#optional-steps}

### 6단계: 여러 페이지에서 재사용되는 Redux slice를 Entities / Features layer로 분리하기 {#form-entities-features-from-redux}

- 여러 페이지에서 재사용되는 Redux **slice**는 주로 **product, user** 같은 **business entity**를 표현합니다.  
  이 경우 **Entities layer**로 옮기고, **entity**마다 폴더를 하나씩 만듭니다.  
- 댓글 작성처럼 **사용자 행동(action)** 을 다루는 **slice**는 **Features layer**로 이동합니다.

**Entities**와 **Features**는 서로 독립적으로 사용될 수 있도록 설계되어 있습니다.  
Entitles 간 연결이 필요하면 [Business-Entities Cross-Relations 가이드][business-entities-cross-relations]를 참고하세요.  
해당 **slice**와 연관된 API 함수는 `📁 shared/api`에 그대로 두어도 무방합니다.

### 7단계: modules 폴더 리팩터링 {#refactor-your-modules}

`📁 modules`는 과거에 비즈니스 로직을 모아 두던 곳으로, 성격상 **Features layer**와 비슷합니다.  
단, 앱 Header처럼 **large UI block**(예: global Header, Sidebar)이라면 **Widgets layer**로 옮기는 편이 좋습니다.

### 8단계: shared/ui에 presentational UI 기반 마련하기 {#form-clean-ui-foundation}

`📁 shared/ui`에는 비즈니스 로직이 전혀 없는, 재사용 가능한 presentational UI 컴포넌트만 남겨야 합니다.  

- 기존 `📁 components` · `📁 containers`에 있던 컴포넌트에서 비즈니스 로직을 분리해 상위 layer로 이동합니다.  
- 여러 곳에서 쓰이지 않는 부분은 **복사(paste)** 해서 각 layer에서 독립적으로 관리해도 괜찮습니다.

## 참고 자료 {#see-also}

- [(러시아어 영상) Ilya Klimov — "끝없는 리팩터링의 악순환에서 벗어나기: 기술 부채가 동기와 제품에 미치는 영향](https://youtu.be/aOiJ3k2UvO4)

[ext-steiger]: https://github.com/feature-sliced/steiger
[business-entities-cross-relations]: /docs/guides/examples/types#business-entities-and-their-cross-references
