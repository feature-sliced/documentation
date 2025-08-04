---
sidebar_position: 2
---

# Types

이 가이드는 TypeScript 같은 정적 타입 언어에서 데이터를 정의·활용하는 방법과, FSD 구조 내에서 타입을 어디에 배치할지 설명합니다.

:::info

더 궁금한 점이 있나요? 페이지 우측의 피드백 버튼을 눌러 의견을 남겨 주세요. 여러분의 제안은 문서 개선에 큰 도움이 됩니다!

:::

## 유틸리티 타입 

유틸리티 타입은 **스스로 큰 의미를 갖지는 않지만 다른 타입과 함께 자주 쓰이는 보조 타입**입니다. 예를 들어 배열 요소 타입을 추출하는 `ArrayValues`를 아래와 같이 정의할 수 있습니다.

<figure>

```ts
type ArrayValues<T extends readonly unknown[]> = T[number];
```

<figcaption>
  Source: https://github.com/sindresorhus/type-fest/blob/main/source/array-values.d.ts
</figcaption>

</figure>

프로젝트 전역에서 유틸리티 타입을 사용하려면 두 가지 방법이 있습니다.

1. **외부 라이브러리 설치**  
   대표적으로 [`type-fest`](https://github.com/sindresorhus/type-fest)를 설치합니다.
2. **내부 라이브러리 구축**  
   `shared/lib/utility-types` 폴더를 만들고 README에 “우리 팀에서 유틸리티 타입이라 부르는 기준”과 “추가·제외 규칙”을 명확히 적어 둡니다.

> 유틸리티 타입의 **재사용 가능성**을 지나친 기대를 하지 마세요.  
> 재사용 가능하다고 해서 반드시 전역에 둘 필요는 없습니다.

아래처럼 **사용 위치 근처**에 두는 편이 유지보수에 유리할 때가 많습니다.

- 📂 pages
  - 📂 home
    - 📂 api
      - 📄 ArrayValues.ts (유틸리티 타입)
      - 📄 getMemoryUsageMetrics.ts (유틸리티 타입을 사용하는 코드)

:::warning
`shared/types` 폴더를 만들거나 각 slice에 `types` segment를 추가하고 싶을 수 있습니다.  
그러나 **types 는 코드의 목적을 설명하지 못하는 분류**입니다.  
segment와 폴더는 무엇을 담는지가 아니라 왜 존재하는지를 드러내야 합니다.
:::

## 비즈니스 entity와 상호 참조

앱에서 가장 핵심이 되는 타입은 **비즈니스 entity**—즉, 도메인 객체—입니다.  
음악 스트리밍 서비스를 예로 들면 _Song_, _Album_ 등이 entity입니다.


### 1. 백엔드 Response 타입

백엔드에서 내려오는 데이터를 먼저 타입으로 정의합니다.  
추가적인 타입 안전성을 위해 [Zod][ext-zod] 같은 schema 기반 유효성 검사을 적용할 수도 있습니다.

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

`Song` 타입은 다른 entity인 `Artist`를 참조합니다.  
**Request·Response 코드를 Shared에 두면** 이런 상호 참조를 한곳에서 관리할 수 있어 유지보수가 간편해집니다.

반대로 이 함수를 `entities/song/api` 내부에 두면 다음과 같은 문제가 생깁니다.

- `entities/artist` slice가 `Song`을 **가져오고 싶어도**  
  FSD의 [layer별 import 규칙][import-rule-on-layers] 때문에 **동일 layer 간(import)** 의존은 금지됩니다.
- 규칙 요약  
  > *“한 slice의 모듈은 자신보다 **아래 layer**에 있는 slice만 import할 수 있다.”*

즉, 동일 layer 간 cross-import가 막혀 있어 **Artist → Song** 의존을 직접 연결하기 어렵습니다.  
이럴 땐 제네릭 파라미터화 또는 `@x` Public API 같은 방법을 선택해야 합니다.


### 2. 상호 참조 해결 전략

1. **제네릭 타입 매개변수화**  
   entity 간 연결이 필요한 타입에는 제네릭 타입 매개변수를 선언하고, 필요한 제약 조건을 부여합니다. 예를 들어, Song 타입에 ArtistType이라는 제약 조건을 설정할 수 있습니다.

   ```ts title="entities/song/model/song.ts"
   interface Song<ArtistType extends { id: string }> {
     id: number;
     title: string;
     artists: Array<ArtistType>;
   }
   ```

   제네릭 방식은 `Cart = { items: Product[] }`처럼 단순한 타입과 잘 어울립니다. 반면 `Country‑City`처럼 긴밀히 결합된 구조는 분리하기 어렵습니다.

2. **Cross-import (Public API(@x) 활용)**  
    FSD에서 entity 간 의존을 허용하려면, 참조 대상 entity 내부에 상대 entity 전용 Public API를 `@x` 디렉터리에 둡니다. 예를 들어 `artist`와 `playlist`가 `song`을 참조해야 한다면 다음과 같이 구성합니다.

   - 📂 entities
     - 📂 song
       - 📂 @x
         - 📄 artist.ts (artist entity용 public API)
         - 📄 playlist.ts (playlist entity용 public API)
       - 📄 index.ts (기본 public API)
   
    파일 `📄 entities/song/@x/artist.ts`의 내용은 `📄 entities/song/index.ts`와 유사합니다: 

   ```ts title="entities/song/@x/artist.ts"
   export type { Song } from "../model/song.ts";
   ```

   이제 `📄 entities/artist/model/artist.ts`에서는 다음과 같이 `Song`을 가져옵니다.

   ```ts title="entities/artist/model/artist.ts"
   import type { Song } from "entities/song/@x/artist";

   export interface Artist {
     name: string;
     songs: Array<Song>;
   }
   ```

   이렇게 명시적으로 연결하면 각 entity의 의존 관계를 쉽게 파악하고, 도메인 분리를 유지할 수 있습니다.

## 데이터 전송 객체와 mappers {#data-transfer-objects-and-mappers}

데이터 전송 객체(Data Transfer Object, DTO)는 백엔드에서 전달되는 데이터 구조를 의미합니다. DTO를 그대로 써도 될 때가 있지만, 프론트엔드에서 쓰기엔 다소 불편합니다. 이때 `mapper`를 사용해 DTO를 더 다루기 쉬운 형태로 변환합니다.

### DTO 배치 위치

- 백엔드 타입을 별도 패키지로 공유하는 경우 → 해당 패키지에서 DTO를 가져오면 끝입니다.
- 코드 공유가 없는 경우 → 프론트엔드 코드베이스 어딘가에 DTO를 넣어야 합니다.

Request 함수가 `shared/api`에 있다면 DTO도 바로 옆에 두는 편이 좋습니다.

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

### mapper 배치 위치

mapper는 DTO를 인자로 받아 변환하므로, DTO 정의와 최대한 가까이 둡니다. `shared/api`에 Request와 DTO가 있다면 mapper도 그곳에 둡니다.

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
  /** 디스크 번호까지 포함한 전체 제목 */
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

Request·Store가 `entity slice` 내부에 있다면 mapper도 해당 slice에 배치합니다(cross-import 제한 주의).

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
  /** 노래의 전체 제목, 디스크 번호까지 포함된 제목입니다. */
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

### 중첩 DTO 처리

백엔드 Response 에 여러 entity가 포함되면 서로를 알지 않을 수 없습니다. 예를 들어 곡 정보에 저자 객체 전체가 포함될 수 있습니다. 
이런 경우, 간접 연결(middleware 등) 대신 `@x` 표기법을 활용한 명시적 cross‑import가 낫습니다. 아래는 Redux Toolkit + Normalizr 예시입니다.

```ts title="entities/song/model/songs.ts"
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { getSong } from "../api/getSong";

// Normalizr entity schema
export const artistEntity = new schema.Entity('artists')
export const songEntity = new schema.Entity('songs', {
  artists: [artistEntity],
})

const songAdapter = createEntityAdapter()

export const fetchSong = createAsyncThunk(
  'songs/fetchSong',
  async (id: string) => {
    const data = await getSong(id)
    // 데이터를 정규화하여 리듀서가 예측 가능한 payload를 로드할 수 있도록 합니다:
    const normalized = normalize(data, songEntity)     // `action.payload = { songs: {}, artists: {} }`
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
      // 같은 fetch 결과를 처리하며, 여기서 artists를 삽입합니다.
      artistAdapter.upsertMany(state, action.payload.artists)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

이 방법을 사용하면 slice 간 완전한 독립성은 조금 줄어들지만, 어차피 분리하기 힘든 두 entity 의 의존 관계를 코드에 명확하게 드러낼 수 있습니다.
따라서 나중에 둘 중 하나를 수정할 때는, 연결된 엔티티까지 함께 리팩토링하는 것이 안전합니다.

## Global 타입과 Redux 

Global 타입은 애플리케이션 전반에서 사용되는 타입을 의미하며, 크게 두 가지로 나눌 수 있습니다:<br/>
1. 애플리케이션 특성이 없는 제너릭 타입
2. 애플리케이션 전체에 알고 있어야 하는 타입 


### 1) 제너릭 타입

첫 번째 경우에는 관련 타입을 Shared 폴더 안에 적절한 segment로 배치하면 됩니다. 예를 들어, 분석 전역 변수를 위한 Interface가 있다면 `shared/analytics`에 두는 것이 좋습니다.

:::warning

`shared/types` 폴더는 만들지 않는 편이 좋습니다. “타입이기 때문”이라는 이유만으로 무관한 항목을 묶으면 코드 검색이 어려워집니다.

:::

### 2) 애플리케이션 Global 타입

`Redux(순수 Redux + RTK 미사용)` 프로젝트에서 자주 나타납니다.
모든 reducer를 합쳐야 store 타입이 완성되지만, 이 타입은 전역에서 selector에 필요합니다.

```ts title="app/store/index.ts"
import { combineReducers, createStore } from "redux";

import { songReducer } from "entities/song";
import { artistReducer } from "entities/artist";

const rootReducer = combineReducers(songReducer, artistReducer);
const store = createStore(rootReducer);

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
```

`shared/store`에서 `useAppDispatch`, `useAppSelector` 훅을 만들고 싶어도, [import 규칙][import-rule-on-layers] 때문에 App layer의 `RootState·AppDispatch`를 가져올 수 없습니다.

> 한 slice의 module은 자신보다 하위 layer에 있는 slice만 import할 수 있습니다.

#### 권장 해결책


Shared ↔ App layer 간에 암묵적 의존성을 허용합니다.
두 타입은 변동 가능성이 작고 Redux 개발자에게 익숙하므로 부담이 적습니다.

```ts title="app/store/index.ts"
/* 이전 코드 블록과 동일한 내용입니다… */

declare type RootState = ReturnType<typeof rootReducer>;
declare type AppDispatch = typeof store.dispatch;
```

```ts title="shared/store/index.ts"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 열거형(enum)

- `가장 가까운 사용 위치`에 정의합니다.
- `segment`는 사용 위치로 결정합니다.
  - UI Toast 위치 → `ui` segment
  - 백엔드 Response 상태 → `api` segment

프로젝트 전역에서 공용으로 쓰이는 값(예: Response 상태, 디자인 토큰)은 `Shared`에 두고, 의미에 맞는 segment(`api`, `ui` 등)를 선택합니다.


## 타입 검증 Schema와 Zod

데이터 형태·제약을 검증하려면 [Zod][ext-zod] 같은 라이브러리로 검증 스키마를 정의합니다.
가능하면 사용 코드와 같은 위치에 둡니다.

- 백엔드 Response 검증 → api segment 옆
- 폼 입력 검증 → ui segment(또는 복잡할 경우 model)

검증 schema는 DTO를 파싱하고, schema에 맞지 않으면 즉시 오류를 던집니다.  
([Data transfer objects and mappers](#data-transfer-objects-and-mappers) 섹션도 참고하세요.)  
특히 백엔드 Response이 schema와 일치하지 않을 때 Request을 실패시키면, 조기에 버그를 발견할 수 있으므로 schema를 `api` segment에 두는 편이 일반적입니다.

## Component props, context 타입

일반적으로 `Component·Context 파일과 같은 파일`에 둡니다.
단일 파일(Vue·Svelte 등)에서 여러 Component가 Interface를 공유해야 한다면, 같은 폴더(보통 `ui` segment)에 별도 파일을 만듭니다.

```ts title="pages/home/ui/RecentActions.tsx"
interface RecentActionsProps {
  actions: Array<{ id: string; text: string }>;
}

export function RecentActions({ actions }: RecentActionsProps) {
  /* … */
}
```

Vue에서 Interface를 별도 파일에 저장한 예는 다음과 같습니다:

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

## Ambient 선언 파일(*.d.ts) 

[Vite][ext-vite]나 [ts-reset][ext-ts-reset] 같은 일부 패키지는 전역 Ambient 선언이 필요합니다. 

- **단순**하면 `src/`에 두어도 무방  
- 구조를 **명확히** 하려면 `app/ambient/`에 배치

타입이 없는 패키지는 `shared/lib/untyped-packages/%LIB%.d.ts`에 직접 선언합니다.

### 타입이 없는 외부 패키지

타입 정의가 없는 패키지는 **미타입(declare module)으로 선언**하거나 **직접 타입**을 작성해야 합니다.  
권장 위치는 `shared/lib/untyped-packages`. 이 폴더에 **`%LIBRARY_NAME%.d.ts`** 파일을 만들고 필요한 타입을 선언합니다.

```ts title="shared/lib/untyped-packages/use-react-screenshot.d.ts"
// 공식 타입 정의가 없는 라이브러리 예시
declare module "use-react-screenshot";
```

## 타입 자동 생성 

외부 schema(OpenAPI 등)로부터 타입을 생성하는 경우, 전용 디렉터리를 둡니다.<br/>
예: `shared/api/openapi` — README에 `파일 용도·재생성 방법`을 기록하면 좋습니다.

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-type-fest]: https://github.com/sindresorhus/type-fest
[ext-zod]: https://zod.dev
[ext-vite]: https://vitejs.dev
[ext-ts-reset]: https://www.totaltypescript.com/ts-reset

