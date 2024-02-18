---
sidebar_position: 2
---
# Tutorial

## Part 1. On paper

This tutorial will examine the Real World App, also known as Conduit. Conduit is a basic [Medium](https://medium.com/) clone — it lets you read and write articles as well as comment on the articles of others.

![realworld-feed-anonymous.png](/img/tutorial/realworld-feed-anonymous.png)

This is a pretty small application, so we will keep it simple and avoid excessive decomposition. It’s highly likely that the entire app will fit into just three layers: **App**, **Pages**, and **Shared**. If not, we will introduce additional layers as we go. Ready?

### Start by listing the pages

If we look at the screenshot above, we can assume at least the following pages:

- Home (article feed)
- Sign in and sign up
- Article reader
- Article editor
- User profile viewer
- User profile editor (user settings)

Every one of these pages will become its own *slice* on the Pages *layer*. Recall from the overview that slices are simply folders inside of layers and layers are simply folders with predefined names like `pages`.

As such, our Pages folder will look like this:

```
📂 pages/
  📁 feed/
  📁 sign-in/
  📁 article-read/
  📁 article-edit/
  📁 profile/
  📁 settings/
```

The key difference of Feature-Sliced Design from an unregulated code structure is that pages cannot reference each other. That is, one page cannot import code from another page. This is due to the **import rule on layers**:

*A module in a slice can only import other slices when they are located on layers strictly below.*

In this case, a page is a slice, so modules (files) inside this page can only reference code from layers below, not from the same layer, Pages.

### Close look at the feed

<figure>
  ![Anonymous user’s perspective](/img/tutorial/realworld-feed-anonymous.png)
  <figcaption>
    _Anonymous user’s perspective_
  </figcaption>
</figure>

<figure>
  ![Authenticated user’s perspective](/img/tutorial/realworld-feed-authenticated.png)
  <figcaption>
    _Authenticated user’s perspective_
  </figcaption>
</figure>

There are three dynamic areas on the feed page:

1. Sign-in links with an indication if you are signed in
2. List of tags that triggers filtering in the feed
3. One/two feeds of articles, each article with a like button

The sign-in links are a part of a header that is common to all pages, we will revisit it separately.

#### List of tags

To build the list of tags, we need to fetch the available tags, render each tag as a chip, and store the selected tags in a client-side storage. These operations fall into categories “API interaction”, “user interface”, and “storage”, respectively. In Feature-Sliced Design, code is separated by purpose using *segments*. Segments are folders in slices, and they can have arbitrary names that describe the purpose, but some purposes are so common that there’s a convention for certain segment names:

- 📂 `api/` for backend interactions
- 📂 `ui/` for code that handles rendering and appearance
- 📂 `model/` for storage and business logic
- 📂 `config/` for feature flags, environment variables and other forms of configuration

We will place code that fetches tags into `api`, the tag component into `ui`, and the storage interaction into `model`.

#### Articles

Using the same grouping principles, we can decompose the feed of articles into the same three segments:

- 📂 `api/`: fetch paginated articles with like count; like an article
- 📂 `ui/`:
    - tab list that can render an extra tab if a tag is selected
    - individual article
    - functional pagination
- 📂 `model/`: client-side storage of the currently loaded articles and current page (if needed)

### Reuse generic code

Most pages are very different in intent, but certain things stay the same across the entire app — for example, the UI kit that conforms to the design language, or the convention on the backend that everything is done with a REST API with the same authentication method. Since slices are meant to be isolated, code reuse is facilitated by a lower layer, **Shared**.

Shared is different from other layers in the sense that it contains segments, not slices. In this way, the Shared layer can be thought of as a hybrid between a layer and a slice.

Usually, the code in Shared is not planned ahead of time, but rather extracted during development, because only during development does it become clear which parts of code are actually shared. However, it’s still helpful to keep a mental note of what kind of code naturally belongs in Shared:

- 📂 `ui/` — the UI kit, pure appearance, no business logic. For example, buttons, modal dialogs, form inputs.
- 📂 `api/` — convenience wrappers around request making primitives (like `fetch()` on the Web) and, optionally, functions for triggering particular requests according to the backend specification.
- 📂 `config/` — parsing environment variables
- 📂 `i18n/` — configuration of language support
- 📂 `router/` — routing primitives and route constants

Those are just a few examples of segment names in Shared, but you can omit any of them or create your own. The only important thing to remember when creating new segments is that segment names should describe **purpose (the why), not essence (the what)**. Names like “components”, “hooks”, “modals” *should not* be used because they describe what these files are, but don’t help to navigate the code inside. This requires people on the team to dig through every file in such folders and also keeps unrelated code close, which leads to broad areas of code being affected by refactoring and thus makes code review and testing harder.

### Define a strict public API

In the context of Feature-Sliced Design, the term *public API* refers to a slice or segment declaring what can be imported from it by other modules in the project. For example, in JavaScript that can be an `index.js` file re-exporting objects from other files in the slice. This enables freedom in refactoring code inside a slice as long as the contract with the outside world (i.e. the public API) stays the same.

For the Shared layer that has no slices, it’s usually more convenient to define a separate public API for each segment as opposed to defining one single index of everything in Shared. This keeps imports from Shared naturally organized by intent. For other layers that have slices, the opposite is true — it’s usually more practical to define one index per slice and let the slice decide its own set of segments that is unknown to the outside world because other layers usually have a lot less exports.

Our slices/segments will appear to each other as follows:

```jsx
📂 pages/
  📂 feed/
    📄 index
  📂 sign-in/
    📄 index
  📂 article-read/
    📄 index
  📁 …
📂 shared/
  📂 ui/
    📄 index
  📂 api/
    📄 index
  📁 …
```

Whatever is inside folders like `pages/feed` or `shared/ui` is only known to those folders, and other files should not rely on the internal structure of these folders.

### Large reused blocks in the UI

Earlier we made a note to revisit the header that appears on every page. Rebuilding it from scratch on every page would be impractical, so it’s only natural to want to reuse it. We already have Shared to facilitate code reuse, however, there’s a caveat to putting large blocks of UI in Shared — the Shared layer is not supposed to know about any of the layers above. 

Between Shared and Pages there are three other layers: Entities, Features, and Widgets.  Some projects may have something in those layers that they need in a large reusable block, and that means we can’t put that reusable block in Shared, or else it would be importing from upper layers, which is prohibited. That’s where the Widgets layer comes in. It is located above Shared, Entities, and Features, so it can use them all.

In our case, the header is very simple — it’s a static logo and top-level navigation. The navigation needs to make a request to the API to determine if the user is currently logged in or not, but that can be handled by a simple import from the `api` segment. Therefore, we will keep our header in Shared.

### Close look at a page with a form

Let’s also examine a page that’s intended for editing, not reading. For example, the article writer:

![realworld-editor-authenticated.png](/img/tutorial/realworld-editor-authenticated.png)

It looks trivial, but contains several aspects of application development that we haven’t explored yet — form validation, error states, and data persistence.

If we were to build this page, we would grab some inputs and buttons from Shared and put together a form in the `ui` segment of this page. Then, in the `api` segment, we would define a mutation request to create the article on the backend. 

To validate the request before sending, we need a validation schema, and a good place for it is the `model` segment, since it’s the data model. There we will produce error messages and display them using another component in the `ui` segment. 

To improve user experience, we could also persist the inputs to prevent accidental data loss. This is also a job of the `model` segment.

### Summary

We have examined several pages and outlined a preliminary structure for our application:

1. Shared layer
    1. `ui`  will contain our reusable UI kit
    2. `api`  will contain our primitive interactions with the backend
    3. The rest will be arranged on demand
2. Pages layer — each page is a separate slice
    1. `ui`  will contain the page itself and all of its parts
    2. `api`  will contain more specialized data fetching, using `shared/ui` 
    3. `model`  might contain client-side storage of the data that we will display

Let’s get building!

_To be continued._
