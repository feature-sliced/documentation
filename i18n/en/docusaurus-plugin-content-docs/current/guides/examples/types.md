---
sidebar_position: 2
---

# Types

This guide concerns data types from typed languages like TypeScript and describes where they fit within FSD.

## Utility types

Utility types are types that don't have much meaning on their own and are usually used with other types. For example:

<figure>

```ts
type ArrayValues<T extends readonly unknown[]> = T[number];
```

<figcaption>
  Source: https://github.com/sindresorhus/type-fest/blob/main/source/array-values.d.ts
</figcaption>

</figure>

To make utility types available across your project, either install a library like [`type-fest`][ext-type-fest], or create your own library in `shared/lib`. Make sure to clearly indicate what new types _should_ be added to this library, and what types _don't belong_ there. For example, call it `shared/lib/utility-types` and add a README inside that describes what is a utility type in your team.

Don't overestimate the potential reusability of a utility type. Just because it can be reused, doesn't mean it will be, and as such, not every utility type needs to be in Shared. Some utility types are fine right next to where they are needed:

- 📂 pages
  - 📂 home
    - 📂 api
      - 📄 ArrayValues.ts (utility type)
      - 📄 getMemoryUsageMetrics.ts (the code that uses the utility type)

:::warning

Resist the temptation to create a `shared/types` folder, or to add a `types` segment to your slices. The category "types" is similar to the category "components" or "hooks" in that it describes what the contents are, not what they are for. Segments should describe the purpose of the code, not the essence.

:::

## Business entities and their cross-references

Among the most important types in an app are the types of business entities, i.e. the real-world things that your app works with. For example, in a music streaming app, you might have business entities _Song_, _Album_, etc.

Business entities often come from the backend, so the first step is to type the backend responses. It's convenient to have a function to make a request to every endpoint, and to type the response of this function. For extra type safety, you may want to run the response through a schema validation library like [Zod][ext-zod]. 

For example, if you keep all your requests in Shared, you could do it like this:

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

You might notice that the `Song` type references a different entity, `Artist`. This is a benefit of storing your requests in Shared — real-world types are often intertwined. If we kept this function in `entities/song/api`, we wouldn't be able to simply import `Artist` from `entities/artist`, because FSD restricts cross-imports between slices with [the import rule on layers][import-rule-on-layers]:

> A module in a slice can only import other slices when they are located on layers strictly below.

There are two ways to deal with this issue:

1. **Parametrize your types**  
   You can make your types accept type arguments as slots for connections with other entities, and even impose constraints on those slots. For example:

   ```ts title="entities/song/model/song.ts"
   interface Song<ArtistType extends { id: string }> {
     id: number;
     title: string;
     artists: Array<ArtistType>;
   }
   ```

   This works better for some types than others. A simple type like `Cart = { items: Array<Product> }` can easily be made to work with any type of product. More connected types, like `Country` and `City`, may not be as easy to separate.

2. **Cross-import (but do it right)**  
   To make cross-imports between entities in FSD, you can use a special public API specifically for each slice that will be cross-importing. For example, if we have entities `song`, `artist`, and `playlist`, and the latter two need to reference `song`, we can make two special public APIs for both of them in the `song` entity with the `@x` notation:

   - 📂 entities
     - 📂 song
       - 📂 @x
         - 📄 artist.ts (a public API for the `artist` entity to import from)
         - 📄 playlist.ts (a public API for the `playlist` entity to import from)
       - 📄 index.ts (regular public API)
   
   The contents of a file `📄 entities/song/@x/artist.ts` are similar to `📄 entities/song/index.ts`:

   ```ts title="entities/song/@x/artist.ts"
   export type { Song } from "../model/song.ts";
   ```

   Then the `📄 entities/artist/model/artist.ts` can import `Song` like this:

   ```ts title="entities/artist/model/artist.ts"
   import type { Song } from "entities/song/@x/artist";

   export interface Artist {
     name: string;
     songs: Array<Song>;
   }
   ```

   By making explicit connections between entities, we stay on top of inter-dependencies and maintain a decent level of domain separation.

## Data transfer objects and mappers

Data transfer objects, or DTOs, is a term that describes the shape of data that comes from the backend. Sometimes, the DTO is fine to use as is, but sometimes it's inconvenient for the frontend. That's where mappers come in — they transform a DTO into a more convenient shape.

If you have your request functions in `shared/api`, that's where the DTOs should be, right next to the function that uses them:

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

As mentioned in the previous section, storing your requests and DTOs in Shared comes with the benefit of being able to reference other DTOs.

Mappers, however, should usually be located next to stores. They should be applied before the store is written to. For example, with Redux Toolkit:

```ts title="entities/song/model/mapper.ts"
import { listSongs, type SongDTO } from "shared/api";

interface Song {
  id: string;
  title: string;
  fullTitle: string;
  artistIds: Array<string>;
}

export function convertSongDTO(dto: SongDTO): Song {
  return {
    id: String(dto.id),
    title: dto.title,
    fullTitle: `${dto.disc_no} / ${dto.title}`,
    artistIds: dto.artist_ids.map(String),
  };
}
```

```ts title="entities/song/model/songs.ts"
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { listSongs } from "shared/api";
import { convertSongDTO } from "./mapper";

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => listSongs().then((response) => response.songs));

const songAdapter = createEntityAdapter();
const songsSlice = createSlice({
  name: "songs",
  initialState: songAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSong.fulfilled, (state, action) => {
      articlesAdapter.upsertMany(state, action.payload.map(convertSongDTO))
    })
  },
});
```

The most problematic part is when a response from the backend contains several entities. For example, if the song included not just the authors' IDs, but the entire author objects. In this case, it is impossible for entities not to know about each other (unless we want to discard the data or have a firm conversation with the backend team). Instead of coming up with solutions for indirect connections between slices (such as a common middleware that would dispatch actions to other slices), prefer explicit cross-imports with the `@x` notation:

```ts title="entities/song/model/songs.ts"
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { getSong } from "shared/api";
import { convertSongDTO } from "./mapper";

// Define normalizr entity schemas
export const artistEntity = new schema.Entity('artists')
export const songEntity = new schema.Entity('songs', {
  artists: [artistEntity],
})

const songAdapter = createEntityAdapter()

export const fetchSong = createAsyncThunk(
  'songs/fetchSong',
  async (id: string) => {
    const data = await getSong(id)
    // Normalize the data so reducers can load a predictable payload, like:
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
      articlesAdapter.upsertMany(state, action.payload.songs)
    })
  },
})

const reducer = slice.reducer
export default reducer
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
      // And handle the same fetch result by inserting the artists here
      usersAdapter.upsertMany(state, action.payload.users)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

This slightly limits the benefits of slice isolation, but it accurately represents a connection between these two entities that we have no control over. If these entities are to ever be refactored, they have to be refactored together.

## Global types and Redux

Global types are types that will be used across the whole application. There are two kinds of global types, based on what they need to know about:
1. Generic types that don't have any application specifics
2. Types that need to know about the whole application

The first case is simple to resolve — place your types in Shared, in an appropriate segment. For example, if you have an interface for a global variable for analytics, you can put it in `shared/analytics`.

:::warning

Avoid creating the `shared/types` folder. It groups unrelated things based only on the property of "being a type", and that property is usually not useful when searching for code in a project.

:::

The second case is commonly encountered in projects with Redux without RTK. Your final store type is only available once you add all the reducers together, but this store type needs to be available to selectors that you use across the app. For example, here's your typical store definition:

```ts title="app/store/index.ts"
import { combineReducers, rootReducer } from "redux";

import { songReducer } from "entities/song";
import { artistReducer } from "entities/artist";

const rootReducer = combineReducers(songReducer, artistReducer);

const store = createStore(rootReducer);

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
```

It would be nice to have typed Redux hooks `useAppDispatch` and `useAppSelector` in `shared/redux`, but they cannot import `RootState` and `AppDispatch` from the App layer due to the [import rule on layers][import-rule-on-layers]:

> A module in a slice can only import other slices when they are located on layers strictly below.

The recommended solution in this case is to create an implicit dependency between layers Shared and App. These two types, `RootState` and `AppDispatch` are unlikely to change, and they will be familiar to Redux developers, so we don't have to worry about them as much.

In TypeScript, you can do it by declaring the types as global like this:

```ts title="app/store/index.ts"
/* same content as in the code block before… */

declare type RootState = ReturnType<typeof rootReducer>;
declare type AppDispatch = typeof store.dispatch;
```

```ts title="shared/redux/index.ts"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Enums

The general rule with enums is that they should be defined **as close to the usage locations as possible**. When an enum represents values specific to a single feature, it should be defined in that same feature.

The choice of segment should be dictated by usage locations as well. If your enum contains, for example, positions of a toast on the screen, it should be placed in the `ui` segment. If it represents the loading state of a backend operation, it should be placed in the `api` segment.

Some enums are truly common across the whole project, like general backend response statuses or design system tokens. In this case, you can place them in Shared, and choose the segment based on what the enum represents (`api` for response statuses, `ui` for design tokens, etc.).

<!-- TODO: ## Type validation schemas and Zod -->

<!-- TODO: ## Typings of component props and context -->

<!-- TODO: ## Ambient declaration files (`*.d.ts`) -->

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-type-fest]: https://github.com/sindresorhus/type-fest
[ext-zod]: https://zod.dev
