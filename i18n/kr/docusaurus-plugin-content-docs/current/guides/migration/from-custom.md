---
sidebar_position: 3
sidebar_label: 기존 아키텍처에서 전환하기
---

# 기존 아키텍처에서 FSD로의 마이그레이션

이 가이드는 기존 아키텍처에서 Feature-Sliced Design(FSD)으로 전환할 때 도움이 될 수 있는 접근 방식을 설명합니다.

아래는 일반적인 기존 아키텍처의 폴더 구조입니다. 이 가이드에서는 이를 예시로 사용하여 전환 과정을 설명합니다.
파란색 화살표를 클릭하여 폴더를 열어보세요.

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

## 시작하기 전에 {#before-you-start}

FSD로 전환을 고려할 때 팀에게 가장 중요한 질문은 _정말로 FSD가 필요한가?_ 라는 점입니다. FSD는 훌륭한 방법론이지만, 어떤 프로젝트에서는 굳이 필요하지 않을 수 있습니다.

다음과 같은 이유가 있다면 전환을 고려해 볼 수 있습니다:

1. 신규 팀원이 프로젝트에 적응하기 어려워하는 경우
2. 코드 일부를 수정할 때, 관련 없는 다른 코드에 오류가 발생하는 경우가 **잦은** 경우 
3. 새 기능을 추가할 때 고려해야 할 사항이 너무 많아 어려움을 겪는 경우

**팀원의 동의 없이 FSD로 전환하지 마십시오.** 팀 리더라고 해도 전환의 이점이 비용보다 크다는 점을 먼저 설득하는 것이 중요합니다. 새로운 아키텍처를 도입하는 데는 학습과 전환 비용이 따르므로 충분한 논의가 필요합니다.

또한, 아키텍처 변경은 즉시 관리층에 가시적으로 드러나지 않을 수 있습니다. 프로젝트 전환을 시작하기 전에 관리자의 동의를 얻고, 전환이 프로젝트에 어떤 이점을 줄 수 있는지 설명하는 것이 중요합니다.

:::tip

프로젝트 매니저를 설득해야 한다면, 다음과 같은 점을 고려해 보세요:
1. FSD로의 전환은 점진적으로 진행될 수 있어 새로운 기능 개발을 중단할 필요가 없습니다.
2. 체계적인 아키텍처는 새로운 개발자가 업무에 익숙해지는 시간을 크게 줄여줄 수 있습니다.
3. FSD는 문서화된 아키텍처이기 때문에, 팀이 자체 문서화를 지속적으로 관리할 필요성이 줄어듭니다.

:::

---

마이그레이션을 시작하기로 결정했다면, `📁 src` 폴더에 대한 별칭(alias)을 설정하는 것이 첫 단계입니다. 이후 설명에서는 `@`를 `./src`의 별칭으로 사용하겠습니다.

## 1단계: 페이지별로 코드 분리하기 {#divide-code-by-pages}

대부분의 맞춤형 아키텍처는 어느 정도 페이지별로 코드가 나뉘어 있습니다. 만약 `📁 pages` 폴더가 이미 있다면 이 단계를 건너뛸 수 있습니다.

`📁 routes` 폴더만 있다면, `📁 pages` 폴더를 새로 만들고 `📁 routes`에서 가능한 많은 컴포넌트 코드를 pages로 이동하세요. 이상적인 구조는 작은 라우트 파일과 큰 페이지 파일을 갖추는 것입니다. 코드를 이동할 때는 페이지별로 폴더를 만들고, 인덱스 파일을 추가합니다.

:::note

현재는 페이지들이 서로를 참조해도 괜찮습니다. 지금은 페이지별로 구조를 명확하게 구분하는 데 집중하세요. 참조 문제는 나중에 해결할 수 있습니다.

:::

라우트 파일:

```js title="src/routes/products.[id].js"
export { ProductPage as default } from "@/pages/product"
```

페이지 인덱스 파일:

```js title="src/pages/product/index.js"
export { ProductPage } from "./ProductPage.jsx"
```

페이지 컴포넌트 파일:

```jsx title="src/pages/product/ProductPage.jsx"
export function ProductPage(props) {
  return <div />;
}
```

## 2단계: 페이지에서 나머지 코드 분리하기 {#separate-everything-else-from-pages}

`📁 src/shared` 폴더를 만들고 `📁 pages`나 `📁 routes`에 의존하지 않는 코드를 모두 이곳으로 이동합니다. 그다음 `📁 src/app` 폴더를 만들어 pages 또는 routes에 의존하는 코드를 이곳으로 옮깁니다. 라우트 파일도 포함됩니다.

Shared 레이어에는 슬라이스가 없으므로, 세그먼트끼리 서로 임포트해도 괜찮습니다.

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

## 3단계: 페이지 간의 교차 참조 해결하기 {#tackle-cross-imports-between-pages}

<!-- A good way to approach this is by setting up [Steiger][ext-steiger], the linter for FSD.  -->
<!-- TODO: add instructions once the new config format is standardized -->

각 페이지가 다른 페이지를 임포트하고 있는 경우, 다음 두 가지 방법 중 하나를 선택하여 해결할 수 있습니다:

1. 필요한 코드만 복사하여 붙여넣어 참조를 제거합니다.
2. 코드를 Shared 레이어의 적절한 세그먼트로 이동합니다:
      - UI 키트의 일부라면 `📁 shared/ui`로 이동
      - 설정 상수라면 `📁 shared/config`로 이동
      - 백엔드와의 상호작용 코드라면 `📁 shared/api`로 이동

:::note

**코드를 복사해서 붙여넣는 것이 항상 잘못된 것은 아닙니다.** 경우에 따라, 모듈로 재사용하는 것보다 복사하여 독립적으로 사용하는 것이 더 나을 수 있습니다. 특히, 각 페이지에서 코드가 조금씩 달라질 가능성이 있는 경우에는 불필요한 의존성을 만들지 않도록 하는 것이 중요합니다.

다만, 비즈니스 로직을 반복하지 않도록 주의하세요. 비즈니스 로직을 여러 곳에 복사해 둘 경우, 오류 수정 시 여러 위치에서 코드를 수정해야 할 수도 있습니다.

:::

## 4단계: Shared 레이어 정리하기 {#unpack-shared-layer}

이 단계에서는 Shared 레이어에 많은 코드가 남아 있을 수 있지만, 가능하면 이를 피하는 것이 좋습니다. Shared 레이어는 코드베이스 내 다른 모든 레이어에 의존할 수 있으므로, 여기에 변경이 발생하면 예기치 않은 결과를 초래할 가능성이 높아집니다

한 페이지에서만 사용하는 코드가 있다면 해당 페이지의 슬라이스로 이동하세요. _이는 액션, 리듀서, 셀렉터에도 적용됩니다_. 모든 액션을 한 곳에 모을 필요는 없으며, 관련된 액션을 사용하는 위치에 가까이 배치하는 것이 더 좋습니다.

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

## 5단계: 기술적 목적에 따른 코드 정리 {#organize-by-technical-purpose}

FSD에서는 코드를 _세그먼트_ 단위로 나누어, 기술적 목적에 따라 구분합니다. 다음은 일반적인 세그먼트 예시입니다:

- `ui` — UI 표시와 관련된 요소들: UI 컴포넌트, 날짜 형식 지정, 스타일 등
- `api` — 백엔드와의 상호작용: 요청 함수, 데이터 타입, 매퍼 등
- `model` — 데이터 모델: 스키마, 인터페이스, 스토어 및 비즈니스 로직
- `lib` — 이 슬라이스의 다른 모듈에서 필요한 라이브러리 코드
- `config` — 설정 파일과 기능 플래그

필요에 따라 자체적인 세그먼트를 추가할 수도 있습니다. 단, `components`, `actions`, `types`, `utils`처럼 코드의 성격에 따라 그룹화하기보다는, 코드의 목적에 따라 구분하는 것이 좋습니다.

각 페이지에 세그먼트를 나누어 코드를 정리하세요. 이미 `ui` 세그먼트가 있다면, 이제는 actions, reducers, selectors를 위한 `model` 세그먼트를 만들고, thunks와 mutations를 위한 `api` 세그먼트도 추가할 차례입니다.

또한, Shared 레이어에 있는 폴더를 다음과 같이 재배치하세요:
- `📁 components`, `📁 containers` — 대부분은 `📁 shared/ui`로 이동
- `📁 helpers`, `📁 utils` — 재사용되는 헬퍼들이 남아 있다면 기능에 따라 그룹화하여 `📁 shared/lib`로 이동
- `📁 constants` — 기능에 따라 그룹화하여 `📁 shared/config`로 이동


## 선택 단계 {#optional-steps}

### 6단계: 여러 페이지에서 사용하는 Redux 슬라이스를 엔티티/기능으로 정리하기 {#form-entities-features-from-redux}

일반적으로 여러 페이지에서 재사용되는 Redux 슬라이스는 제품이나 사용자와 같이 비즈니스와 관련이 깊습니다. 이러한 경우, 슬라이스를 엔티티 레이어로 이동하고, 하나의 폴더에 하나의 엔티티가 있도록 구성합니다. 만약 Redux 슬라이스가 사용자의 특정 액션과 관련이 있다면, 이를 기능 레이어로 이동할 수 있습니다.

엔티티와 기능은 서로 독립적으로 사용될 수 있도록 설계됩니다. 비즈니스 도메인에 따라 엔티티 간에 본질적인 연결이 필요한 경우, [비즈니스 엔티티 연결 가이드][business-entities-cross-relations]를 참고하여 이러한 연결을 효율적으로 조직하는 방법을 확인하세요.

이 슬라이스와 관련된 API 함수는 `📁 shared/api`에 그대로 두어도 괜찮습니다.

### 7단계: 모듈 리팩터링 {#refactor-your-modules}

`📁 modules` 폴더는 일반적으로 비즈니스 로직을 담고 있어 FSD의 기능 레이어와 성격이 비슷합니다. 일부 모듈은 앱 헤더와 같이 큰 UI 요소를 설명하는 역할을 할 수도 있습니다. 이 경우 해당 모듈을 위젯 레이어로 이동하는 것이 좋습니다.

### 8단계: `shared/ui`에서 UI 기본 요소 정리하기 {#form-clean-ui-foundation}

상적으로 `📁 shared/ui`는 비즈니스 로직이 포함되지 않고 재사용 가능한 UI 요소들로만 구성되어야 합니다.

이전 `📁 components`와 `📁 containers`에 있던 UI 컴포넌트를 리팩터링하여 비즈니스 로직을 분리하고, 해당 로직을 상위 레이어로 이동시키세요. 많은 곳에서 사용되지 않는다면, 코드 복사를 통해 필요한 부분에만 사용해도 좋습니다.

## 추가 참고 자료 {#see-also}

- [(러시아어 영상) Ilya Klimov — "끝없는 리팩터링의 악순환에서 벗어나기: 기술 부채가 동기와 제품에 미치는 영향](https://youtu.be/aOiJ3k2UvO4)

[ext-steiger]: https://github.com/feature-sliced/steiger
[business-entities-cross-relations]: /docs/guides/examples/types#business-entities-and-their-cross-references
