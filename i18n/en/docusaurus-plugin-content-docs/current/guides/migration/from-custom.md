---
sidebar_position: 3
sidebar_label: From a custom architecture
---

# Migration from a custom architecture

This guide describes an approach that might be helpful when migrating from a custom self-made architecture to Feature-Sliced Design.

Here is the folder structure of a typical custom architecture. We will be using it as an example in this guide.  
Click on the blue arrow to open the folder.

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

## Before you start {#before-you-start}

The most important question to ask your team when considering to switch to Feature-Sliced Design is — _do you really need it?_ We love Feature-Sliced Design, but even we recognize that some projects are perfectly fine without it.

Here are some reasons to consider making the switch:

1. New team members are complaining that it's hard to get to a productive level
2. Making modifications to one part of the code **often** causes another unrelated part to break
3. Adding new functionality is difficult due to the sheer amount of things you need to think about

**Avoid switching to FSD against the will of your teammates**, even if you are the lead.  
First, convince your teammates that the benefits outweigh the cost of migration and the cost of learning a new architecture instead of the established one.

Also keep in mind that any kind of architectural changes are not immediately observable to the management. Make sure they are on board with the switch before starting and explain to them why it might benefit the project.

:::tip

If you need help convincing the project manager that FSD is beneficial, consider some of these points:
1. Migration to FSD can happen incrementally, so it will not halt the development of new features
2. A good architecture can significantly decrease the time that a new developer needs to get productive
3. FSD is a documented architecture, so the team doesn't have to continuously spend time on maintaining their own documentation

:::

---

If you made the decision to start migrating, then the first thing you want to do is to set up an alias for `📁 src`. It will be helpful later to refer to top-level folders. We will consider `@` as an alias for `./src` for the rest of this guide.

## Step 1. Divide the code by pages {#divide-code-by-pages}

Most custom architectures already have a division by pages, however small or large in logic. If you already have `📁 pages`, you may skip this step.

If you only have `📁 routes`, create `📁 pages` and try to move as much component code from `📁 routes` as possible. Ideally, you would have a tiny route and a larger page. As you're moving code, create a folder for each page and add an index file:

:::note

For now, it's okay if your pages reference each other. You can tackle that later, but for now, focus on establishing a prominent division by pages.

:::

Route file:

```js title="src/routes/products.[id].js"
export { ProductPage as default } from "@/pages/product"
```

Page index file:

```js title="src/pages/product/index.js"
export { ProductPage } from "./ProductPage.jsx"
```

Page component file:

```jsx title="src/pages/product/ProductPage.jsx"
export function ProductPage(props) {
  return <div />;
}
```

## Step 2. Separate everything else from the pages {#separate-everything-else-from-pages}

Create a folder `📁 src/shared` and move everything that doesn't import from `📁 pages` or `📁 routes` there. Create a folder `📁 src/app` and move everything that does import the pages or routes there, including the routes themselves.

Remember that the Shared layer doesn't have slices, so it's fine if segments import from each other.

You should end up with a file structure like this:

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

## Step 3. Tackle cross-imports between pages {#tackle-cross-imports-between-pages}

<!-- A good way to approach this is by setting up [Steiger][ext-steiger], the linter for FSD.  -->
<!-- TODO: add instructions once the new config format is standardized -->

Find all instances where one page is importing from the other and do one of the two things:

1. Copy-paste the imported code into the depending page to remove the dependency
2. Move the code to a proper segment in Shared: 
      - if it's a part of the UI kit, move it to `📁 shared/ui`; 
      - if it's a configuration constant, move it to `📁 shared/config`; 
      - if it's a backend interaction, move it to `📁 shared/api`.

:::note

**Copy-pasting isn't architecturally wrong**, in fact, sometimes it may be more correct to duplicate than to abstract into a new reusable module. The reason is that sometimes the shared parts of pages start drifting apart, and you don't want dependencies getting in your way in these cases.

However, there is still sense in the DRY ("don't repeat yourself") principle, so make sure you're not copy-pasting business logic. Otherwise you will need to remember to fix bugs in several places at once.

:::

## Step 4. Unpack the Shared layer {#unpack-shared-layer}

You might have a lot of stuff in the Shared layer on this step, and you generally want to avoid that. The reason is that the Shared layer may be a dependency for any other layer in your codebase, so making changes to that code is automatically more prone to unintended consequences.

Find all the objects that are only used on one page and move it to the slice of that page. And yes, _that applies to actions, reducers, and selectors, too_. There is no benefit in grouping all actions together, but there is benefit in colocating relevant actions close to their usage.

You should end up with a file structure like this:

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

## Step 5. Organize code by technical purpose {#organize-by-technical-purpose}

In FSD, division by technical purpose is done with _segments_. There are a few common ones:

- `ui` — everything related to UI display: UI components, date formatters, styles, etc.
- `api` — backend interactions: request functions, data types, mappers, etc.
- `model` — the data model: schemas, interfaces, stores, and business logic.
- `lib` — library code that other modules on this slice need.
- `config` — configuration files and feature flags.

You can create your own segments, too, if you need. Make sure not to create segments that group code by what it is, like `components`, `actions`, `types`, `utils`. Instead, group the code by what it's for.

Reorganize your pages to separate code by segments. You should already have a `ui` segment, now it's time to create other segments, like `model` for your actions, reducers, and selectors, or `api` for your thunks and mutations.

Also reorganize the Shared layer to remove these folders:
- `📁 components`, `📁 containers` — most of it should become `📁 shared/ui`;
- `📁 helpers`, `📁 utils` — if there are some reused helpers left, group them together by function, like dates or type conversions, and move theses groups to `📁 shared/lib`;
- `📁 constants` — again, group by function and move to `📁 shared/config`.

## Optional steps {#optional-steps}

### Step 6. Form entities/features from Redux slices that are used on several pages {#form-entities-features-from-redux}

Usually, these reused Redux slices will describe something relevant to the business, for example, products or users, so these can be moved to the Entities layer, one entity per one folder. If the Redux slice is related to an action that your users want to do in your app, like comments, then you can move it to the Features layer.

Entities and features are meant to be independent from each other. If your business domain contains inherent connections between entities, refer to the [guide on business entities][business-entities-cross-relations] for advice on how to organize these connections.

The API functions related to these slices can stay in `📁 shared/api`.

### Step 7. Refactor your modules {#refactor-your-modules}

The `📁 modules` folder is commonly used for business logic, so it's already pretty similar in nature to the Features layer from FSD. Some modules might also be describe large chunks of the UI, like an app header. In that case, you should migrate them to the Widgets layer.

### Step 8. Form a clean UI foundation in `shared/ui` {#form-clean-ui-foundation}

`📁 shared/ui` should ideally contain a set of UI elements that don't have any business logic encoded in them. They should also be highly reusable.

Refactor the UI components that used to be in `📁 components` and `📁 containers` to separate out the business logic. Move that business logic to the higher layers. If it's not used in too many places, you could even consider copy-pasting.

## See also {#see-also}

- [(Talk in Russian) Ilya Klimov — Крысиные бега бесконечного рефакторинга: как не дать техническому долгу убить мотивацию и продукт](https://youtu.be/aOiJ3k2UvO4)

[ext-steiger]: https://github.com/feature-sliced/steiger
[business-entities-cross-relations]: /docs/guides/examples/types#business-entities-and-their-cross-references
