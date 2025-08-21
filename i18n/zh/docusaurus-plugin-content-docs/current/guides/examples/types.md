---
sidebar_position: 2
---

# 类型

本指南涉及来自类型化语言（如 TypeScript）的数据类型，并描述它们在 FSD 中的适用位置。

:::info

本指南没有涵盖您的问题？请通过在本文上留下反馈（右侧的蓝色按钮）来发布您的问题，我们将考虑扩展本指南！

:::

## 实用类型

实用类型是本身没有太多意义的类型，通常与其他类型一起使用。例如：

<figure>

```ts
type ArrayValues<T extends readonly unknown[]> = T[number];
```

<figcaption>
  Source: https://github.com/sindresorhus/type-fest/blob/main/source/array-values.d.ts
</figcaption>

</figure>

要使实用类型在整个项目中可用，可以安装像 [`type-fest`][ext-type-fest] 这样的库，或者在 `shared/lib` 中创建您自己的库。确保清楚地指出哪些新类型_应该_添加到此库中，哪些类型_不属于_那里。例如，将其命名为 `shared/lib/utility-types` 并在其中添加一个 README，描述您团队中什么是实用类型。

不要高估实用类型的潜在可重用性。仅仅因为它可以被重用，并不意味着它会被重用，因此，并非每个实用类型都需要在 Shared 中。一些实用类型放在需要它们的地方就很好：

- 📂 pages
  - 📂 home
    - 📂 api
      - 📄 ArrayValues.ts (utility type)
      - 📄 getMemoryUsageMetrics.ts (the code that uses the utility type)

:::warning

抵制创建 `shared/types` 文件夹或向您的 slices 添加 `types` segment 的诱惑。"types"类别类似于"components"或"hooks"类别，它描述的是内容是什么，而不是它们的用途。Segments 应该描述代码的目的，而不是本质。

:::

## 业务实体及其交叉引用

应用程序中最重要的类型之一是业务实体的类型，即您的应用程序处理的现实世界的事物。例如，在音乐流媒体应用程序中，您可能有业务实体 _Song_、_Album_ 等。

业务实体通常来自后端，因此第一步是为后端响应添加类型。为每个端点创建一个请求函数，并为此函数的响应添加类型是很方便的。为了额外的类型安全，您可能希望通过像 [Zod][ext-zod] 这样的 schema 验证库来运行响应。

例如，如果您将所有请求保存在 Shared 中，您可以这样做：

```ts title="shared/api/songs.ts"
import type { Artist } from "./artists";

interface Song {
  id: number;
  title: string;
  artists: Array<Artist>;
}

export function listSongs() {
  return fetch('/api/songs').then((res) => res.json() as Promise<Array<Song>>);
}
```

您可能会注意到 `Song` 类型引用了不同的实体 `Artist`。这是将请求存储在 Shared 中的好处 — 现实世界的类型通常是相互交织的。如果我们将此函数保存在 `entities/song/api` 中，我们将无法简单地从 `entities/artist` 导入 `Artist`，因为 FSD 通过[层上的导入规则][import-rule-on-layers]限制 slices 之间的交叉导入：

> slice 中的模块只能在其他 slices 位于严格较低的层时导入它们。

有两种方法来处理这个问题：

1. **参数化您的类型**  
   您可以让您的类型接受类型参数作为与其他实体连接的插槽，甚至可以对这些插槽施加约束。例如：

   ```ts title="entities/song/model/song.ts"
   interface Song<ArtistType extends { id: string }> {
     id: number;
     title: string;
     artists: Array<ArtistType>;
   }
   ```

   这对某些类型比其他类型效果更好。像 `Cart = { items: Array<Product> }` 这样的简单类型可以很容易地与任何类型的产品一起工作。更连接的类型，如 `Country` 和 `City`，可能不那么容易分离。

2. **交叉导入（但要正确地做）**  
   要在 FSD 中的实体之间进行交叉导入，您可以为每个将要交叉导入的 slice 使用特殊的公共 API。例如，如果我们有实体 `song`、`artist` 和 `playlist`，后两者需要引用 `song`，我们可以在 `song` 实体中使用 `@x` 符号为它们创建两个特殊的公共 API：

   - 📂 entities
     - 📂 song
       - 📂 @x
         - 📄 artist.ts (供 `artist` 实体导入的公共 API)
         - 📄 playlist.ts (供 `playlist` 实体导入的公共 API)
       - 📄 index.ts (常规公共 API)
   
   文件 `📄 entities/song/@x/artist.ts` 的内容类似于 `📄 entities/song/index.ts`：

   ```ts title="entities/song/@x/artist.ts"
   export type { Song } from "../model/song.ts";
   ```

   然后 `📄 entities/artist/model/artist.ts` 可以像这样导入 `Song`：

   ```ts title="entities/artist/model/artist.ts"
   import type { Song } from "entities/song/@x/artist";

   export interface Artist {
     name: string;
     songs: Array<Song>;
   }
   ```

   通过在实体之间建立显式连接，我们掌握相互依赖关系并保持良好的域分离水平。

## 数据传输对象和映射器 {#data-transfer-objects-and-mappers}

数据传输对象，或 DTO，是一个描述来自后端的数据形状的术语。有时，DTO 可以直接使用，但有时对前端来说不太方便。这就是映射器发挥作用的地方 — 它们将 DTO 转换为更方便的形状。

### 在哪里放置 DTO

如果您在单独的包中有后端类型（例如，如果您在前端和后端之间共享代码），那么只需从那里导入您的 DTO 就完成了！如果您不在后端和前端之间共享代码，那么您需要将 DTO 保存在前端代码库的某个地方，我们将在下面探讨这种情况。

如果您的请求函数在 `shared/api` 中，那么 DTO 应该放在那里，就在使用它们的函数旁边：

```ts title="shared/api/songs.ts"
import type { ArtistDTO } from "./artists";

interface SongDTO {
  id: number;
  title: string;
  artist_ids: Array<ArtistDTO["id"]>;
}

export function listSongs() {
  return fetch('/api/songs').then((res) => res.json() as Promise<Array<SongDTO>>);
}
```

如前一节所述，将请求和 DTO 存储在 Shared 中的好处是能够引用其他 DTO。

### 在哪里放置映射器

映射器是接受 DTO 进行转换的函数，因此，它们应该位于 DTO 定义附近。在实践中，这意味着如果您的请求和 DTO 在 `shared/api` 中定义，那么映射器也应该放在那里：

```ts title="shared/api/songs.ts"
import type { ArtistDTO } from "./artists";

interface SongDTO {
  id: number;
  title: string;
  disc_no: number;
  artist_ids: Array<ArtistDTO["id"]>;
}

interface Song {
  id: string;
  title: string;
  /** The full title of the song, including the disc number. */
  fullTitle: string;
  artistIds: Array<string>;
}

function adaptSongDTO(dto: SongDTO): Song {
  return {
    id: String(dto.id),
    title: dto.title,
    fullTitle: `${dto.disc_no} / ${dto.title}`,
    artistIds: dto.artist_ids.map(String),
  };
}

export function listSongs() {
  return fetch('/api/songs').then(async (res) => (await res.json()).map(adaptSongDTO));
}
```

如果您的请求和存储在实体 slices 中定义，那么所有这些代码都会放在那里，请记住 slices 之间交叉导入的限制：

```ts title="entities/song/api/dto.ts"
import type { ArtistDTO } from "entities/artist/@x/song";

export interface SongDTO {
  id: number;
  title: string;
  disc_no: number;
  artist_ids: Array<ArtistDTO["id"]>;
}
```

```ts title="entities/song/api/mapper.ts"
import type { SongDTO } from "./dto";

export interface Song {
  id: string;
  title: string;
  /** The full title of the song, including the disc number. */
  fullTitle: string;
  artistIds: Array<string>;
}

export function adaptSongDTO(dto: SongDTO): Song {
  return {
    id: String(dto.id),
    title: dto.title,
    fullTitle: `${dto.disc_no} / ${dto.title}`,
    artistIds: dto.artist_ids.map(String),
  };
}
```

```ts title="entities/song/api/listSongs.ts"
import { adaptSongDTO } from "./mapper";

export function listSongs() {
  return fetch('/api/songs').then(async (res) => (await res.json()).map(adaptSongDTO));
}
```

```ts title="entities/song/model/songs.ts"
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { listSongs } from "../api/listSongs";

export const fetchSongs = createAsyncThunk('songs/fetchSongs', listSongs);

const songAdapter = createEntityAdapter();
const songsSlice = createSlice({
  name: "songs",
  initialState: songAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      songAdapter.upsertMany(state, action.payload);
    })
  },
});
```

### 如何处理嵌套 DTO

最有问题的部分是当来自后端的响应包含多个实体时。例如，如果歌曲不仅包含作者的 ID，还包含整个作者对象。在这种情况下，实体不可能不相互了解（除非我们想要丢弃数据或与后端团队进行坚定的对话）。与其想出 slices 之间间接连接的解决方案（例如将操作分派到其他 slices 的通用中间件），不如使用 `@x` 符号进行显式交叉导入。以下是我们如何使用 Redux Toolkit 实现它：

```ts title="entities/song/model/songs.ts"
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { getSong } from "../api/getSong";

// 定义 normalizr 实体 schemas
export const artistEntity = new schema.Entity('artists')
export const songEntity = new schema.Entity('songs', {
  artists: [artistEntity],
})

const songAdapter = createEntityAdapter()

export const fetchSong = createAsyncThunk(
  'songs/fetchSong',
  async (id: string) => {
    const data = await getSong(id)
    // 规范化数据，以便 reducers 可以加载可预测的 payload，如：
    // `action.payload = { songs: {}, artists: {} }`
    const normalized = normalize(data, songEntity)
    return normalized.entities
  }
)

export const slice = createSlice({
  name: 'songs',
  initialState: songAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSong.fulfilled, (state, action) => {
      songAdapter.upsertMany(state, action.payload.songs)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

```ts title="entities/song/@x/artist.ts"
export { fetchSong } from "../model/songs";
```

```ts title="entities/artist/model/artists.ts"
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { fetchSong } from 'entities/song/@x/artist'

const artistAdapter = createEntityAdapter()

export const slice = createSlice({
  name: 'users',
  initialState: artistAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSong.fulfilled, (state, action) => {
      // 通过在这里插入艺术家来处理相同的获取结果
      artistAdapter.upsertMany(state, action.payload.artists)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

这稍微限制了 slice 隔离的好处，但它准确地表示了我们无法控制的这两个实体之间的连接。如果这些实体要被重构，它们必须一起重构。

## 全局类型和 Redux

全局类型是将在整个应用程序中使用的类型。根据它们需要了解的内容，有两种全局类型：
1. 没有任何应用程序特定内容的通用类型
2. 需要了解整个应用程序的类型

第一种情况很容易解决 — 将您的类型放在 Shared 中的适当 segment 中。例如，如果您有一个用于分析的全局变量接口，您可以将其放在 `shared/analytics` 中。

:::warning

避免创建 `shared/types` 文件夹。它仅基于"是一个类型"的属性将不相关的事物分组，而该属性在项目中搜索代码时通常没有用。

:::

第二种情况在没有 RTK 的 Redux 项目中很常见。您的最终存储类型只有在将所有 reducer 添加在一起后才可用，但此存储类型需要对您在应用程序中使用的选择器可用。例如，这是您的典型存储定义：

```ts title="app/store/index.ts"
import { combineReducers, rootReducer } from "redux";

import { songReducer } from "entities/song";
import { artistReducer } from "entities/artist";

const rootReducer = combineReducers(songReducer, artistReducer);

const store = createStore(rootReducer);

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
```

在 `shared/store` 中拥有类型化的 Redux hooks `useAppDispatch` 和 `useAppSelector` 会很好，但由于[层上的导入规则][import-rule-on-layers]，它们无法从 App 层导入 `RootState` 和 `AppDispatch`：

> slice 中的模块只能在其他 slices 位于严格较低的层时导入它们。

在这种情况下，推荐的解决方案是在 Shared 和 App 层之间创建隐式依赖关系。这两种类型 `RootState` 和 `AppDispatch` 不太可能改变，Redux 开发者会熟悉它们，所以我们不必太担心它们。

在 TypeScript 中，您可以通过将类型声明为全局来做到这一点：

```ts title="app/store/index.ts"
/* 与之前代码块中的内容相同… */

declare type RootState = ReturnType<typeof rootReducer>;
declare type AppDispatch = typeof store.dispatch;
```

```ts title="shared/store/index.ts"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 枚举

枚举的一般规则是它们应该**尽可能接近使用位置**定义。当枚举表示特定于单个功能的值时，它应该在同一功能中定义。

segment 的选择也应该由使用位置决定。例如，如果您的枚举包含屏幕上 toast 的位置，它应该放在 `ui` segment 中。如果它表示后端操作的加载状态，它应该放在 `api` segment 中。

一些枚举在整个项目中确实是通用的，如一般的后端响应状态或设计系统令牌。在这种情况下，您可以将它们放在 Shared 中，并根据枚举所代表的内容选择 segment（响应状态用 `api`，设计令牌用 `ui` 等）。

## 类型验证 schemas 和 Zod

如果您想验证您的数据符合某种形状或约束，您可以定义一个验证 schema。在 TypeScript 中，这项工作的流行库是 [Zod][ext-zod]。验证 schemas 也应该尽可能与使用它们的代码放在一起。

验证 schemas 类似于映射器（如[数据传输对象和映射器](#data-transfer-objects-and-mappers)部分所讨论的），它们接受数据传输对象并解析它，如果解析失败则产生错误。

验证最常见的情况之一是来自后端的数据。通常，当数据与 schema 不匹配时，您希望请求失败，因此将 schema 放在与请求函数相同的位置是有意义的，这通常是 `api` segment。

如果您的数据通过用户输入（如表单）传入，验证应该在输入数据时进行。您可以将 schema 放在 `ui` segment 中，紧挨着表单组件，或者如果 `ui` segment 太拥挤，可以放在 `model` segment 中。

## 组件 props 和 context 的类型定义

一般来说，最好将 props 或 context 接口保存在使用它们的组件或 context 的同一文件中。如果您有一个单文件组件的框架，如 Vue 或 Svelte，并且您无法在同一文件中定义 props 接口，或者您想在几个组件之间共享该接口，请在同一文件夹中创建一个单独的文件，通常是 `ui` segment。

以下是 JSX（React 或 Solid）的示例：

```ts title="pages/home/ui/RecentActions.tsx"
interface RecentActionsProps {
  actions: Array<{ id: string; text: string }>;
}

export function RecentActions({ actions }: RecentActionsProps) {
  /* … */
}
```

以下是将接口存储在 Vue 的单独文件中的示例：

```ts title="pages/home/ui/RecentActionsProps.ts"
export interface RecentActionsProps {
  actions: Array<{ id: string; text: string }>;
}
```

```html title="pages/home/ui/RecentActions.vue"
<script setup lang="ts">
  import type { RecentActionsProps } from "./RecentActionsProps";

  const props = defineProps<RecentActionsProps>();
</script>
```

## 环境声明文件 (`*.d.ts`)

一些包，例如 [Vite][ext-vite] 或 [ts-reset][ext-ts-reset]，需要环境声明文件才能在您的应用程序中工作。通常，它们不大也不复杂，所以它们通常不需要任何架构，只需将它们放在 `src/` 文件夹中即可。为了保持 `src` 更有组织，您可以将它们保存在 App 层的 `app/ambient/` 中。

其他包根本没有类型定义，您可能希望将它们声明为无类型或甚至为它们编写自己的类型定义。这些类型定义的好地方是 `shared/lib`，在像 `shared/lib/untyped-packages` 这样的文件夹中。在那里创建一个 `%LIBRARY_NAME%.d.ts` 文件并声明您需要的类型：

```ts title="shared/lib/untyped-packages/use-react-screenshot.d.ts"
// 这个库没有类型定义，我们不想费心编写自己的。
declare module "use-react-screenshot";
```

## 类型的自动生成

从外部源生成类型是很常见的，例如，从 OpenAPI schema 生成后端类型。在这种情况下，为这些类型在您的代码库中创建一个专门的位置，如 `shared/api/openapi`。理想情况下，您还应该在该文件夹中包含一个 README，描述这些文件是什么、如何重新生成它们等。

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-type-fest]: https://github.com/sindresorhus/type-fest
[ext-zod]: https://zod.dev
[ext-vite]: https://vitejs.dev
[ext-ts-reset]: https://www.totaltypescript.com/ts-reset
