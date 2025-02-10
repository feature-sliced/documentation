---
sidebar_position: 2
---

# 타입

이 가이드는 Typescript와 같은 정적 타입 언어의 데이터 타입을 다루는 방법과 FSD 구조 내에서 타입이 어떻게 활용되는지 설명합니다.

:::info

이 가이드에서 다루지 않는 질문이 있으신가요? 오른쪽 파란색 버튼을 눌러 피드백을 남겨주세요. 여러분의 의견을 반영해 가이드를 확장해 나가겠습니다! 

:::

## 유틸리티 타입 

유틸리티 타입은 자체로 큰 의미를 가지지는 않지만, 다른 타입과 자주 사용되는 경우가 많은 타입입니다. 예를 들어, 배열의 값을 나타내는 ArrayValues 타입을 정의할 수 있습니다. 

<figure>

```ts
type ArrayValues<T extends readonly unknown[]> = T[number];
```

<figcaption>
  Source: https://github.com/sindresorhus/type-fest/blob/main/source/array-values.d.ts
</figcaption>

</figure>

프로젝트에서 이러한 유틸리티 타입을 활용하려면, [`type-fest`][ext-type-fest] 같은 라이브러리를 설치하거나, 직접 `shared/lib`에 유틸리티 타입을 모아 라이브러리를 구축할 수 있습니다. 새로 추가할 타입과 이 라이브러리에 속하지 않는 타입을 명확하게 구분하는 것이 중요합니다. 예를 들어, 이를 `shared/lib/utility-types`로 수정하고 유틸리티 타입들에 대한 설명을 포함한 README 파일을 추가하는 것도 좋은 방법입니다. 

하지만 유틸리티 타입을 너무 많이 재사용하려고 하지 않는 것도 중요합니다. 재사용할 수 있다고 해서 꼭 모든 곳에서 사용할 필요는 없습니다. 모든 유틸리티 타입을 공유 폴더에 넣기보다는, 상황에 따라 필요한 파일 가까에에 두는 것이 더 좋을 떄도 있습니다. 

- 📂 pages
  - 📂 home
    - 📂 api
      - 📄 ArrayValues.ts (유틸리티 타입)
      - 📄 getMemoryUsageMetrics.ts (유틸리티 타입을 사용하는 코드)

:::warning

`shared/types` 폴더를 생성하거나 각 slice에 `types`라는 segment를 추가하고 싶은 마음이 들 수 있지만, 그렇게 하지 않는 것이 좋습니다.<br/>
`types`라는 카테고리는 `components`나 `hooks`와 마찬가지로 내용이 무엇인지를 설명할 뿐, 코드의 목적을 명확히 설명하지 않습니다. slice는 해당 코드의 목적을 정확히 설명할 수 있어야 합니다.

:::

## 비즈니스 entity 및 상호 참조 관계

앱에서 가장 중요한 타입 중 하나는 비즈니스 entity, 즉 앱에서 다루는 객체들 입니다. 
예를 들어, 음악 스트리밍 앱에서는 _Song_, _Album_ 등이 비즈니스 entity가 될 수 있습니다. 

비즈니스 entity는 주로 백엔드 바탕이기 떄문에, 백엔드 응답을 타입으로 정의하는 것이 첫 번째 단계입니다. 
각 endpoint에 대한 요청 함수와 그 응답을 타입으로 지정하는 것이 좋습니다, 추가적인 타입 안정성을 위해 [Zod][ext-zod]와 같은 스키마 검증 라이브러리를 사용해 응답을 검증할 수도 있습니다. 

예를 들어, 모든 요청을 Shared에 보관하는 경우 이렇게 작성할 수 있습니다.

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

`Song` 타입은 다른 entity인 `Artist`를 참조합니다. 이와 같이 요청 관련 코드들을 Shared에 관리하면, 타입들의 서로 얽혀 있을 떄 관리가 용이해집니다. 만약 이 함수를 `entities/song/api`에 보관했다면, `entities/artist`에서 간단히 가져오는 것이 어려웠을 것 입니다. FSD 구조에서는 [layer별 import 규칙][import-rule-on-layers]을 통해 slice 간의 교차 import를 제한하고 있기 떄문입니다:

> slice 안에 있는 module은 계층적으로 더 낮은 layer에 위치한 slice만 가져올 수 있습니다.

이 문제를 해결하기 위한 두 가지 방법은 다음과 같습니다:

1. **타입 매개변수화**  
   타입이 다른 entity와 연결될 때, 타입 매개변수를 통해 처리할 수 있습니다. 예를 들어, Song 타입에 ArtistType이라는 제약 조건을 설정할 수 있습니다.

   ```ts title="entities/song/model/song.ts"
   interface Song<ArtistType extends { id: string }> {
     id: number;
     title: string;
     artists: Array<ArtistType>;
   }
   ```

   이 방법은 일부 타입에 더 적합합니다. 예를 들어, `Cart = { items: Array<Product> }`처럼 간단한 타입은 다양한 제품 타입을 지원하기 쉽게 할 수 있습니다. 하지만 `Country`와 `City`처럼 더 밀접하게 연결된 타입은 분리하기 어렵습니다.

2. **Cross-import (공개 API를 사용해 관리하기)**  
    FSD에서 entity 간 cross-imports를 허용하기 위해서는 공개 API를 사용할 수 있습니다. 예를 들어, `song`, `artist`, `playlist`라는 entity가 있고, 후자의 두 entity가 `song`을 참조해야 한다고 가정합니다. 이 경우, `song` entity 내에 `artist`와 `playlist`용 공개 API를 따로 `@x` 표기를 만들어 사용할 수 있습니다.

   - 📂 entities
     - 📂 song
       - 📂 @x
         - 📄 artist.ts (artist entities를 가져오기 위한 public API)
         - 📄 playlist.ts (playlist.ts (playlist entities를 가져오기 위한 public API))
       - 📄 index.ts (일반적인 public API)
   
    파일 `📄 entities/song/@x/artist.ts`의 내용은 `📄 entities/song/index.ts`와 유사합니다: 

   ```ts title="entities/song/@x/artist.ts"
   export type { Song } from "../model/song.ts";
   ```

   따라서 `📄 entities/artist/model/artist.ts` 파일은 다음과 같이 `Song`을 가져올 수 있습니다:

   ```ts title="entities/artist/model/artist.ts"
   import type { Song } from "entities/song/@x/artist";

   export interface Artist {
     name: string;
     songs: Array<Song>;
   }
   ```

   이렇게 entity 간 명시적으로 연결을 해두면 의존 관계를 파악하고 도메인 분리 수준을 유지하기 쉬워집니다. 

## 데이터 전송 객체와 mappers {#data-transfer-objects-and-mappers}

데이터 전송 객체(Data Transfer Object, DTO)는 백엔드에서 오는 데이터의 구조를 나타내는 용어입니다. 떄로는 DTO를 그대로 사용하는 것이 편리할 수 있지만, 경우에 따라 프론트엔드에서는 불편할 수 있습니다. 이때 mapper를 사용해 DTO를 더 편리한 형태로 변환합니다. 

### DTO의 위치

백엔드 타입이 별도의 패키지에 있는 경우(예: 프론트엔드와 백엔드에서 코드를 공유하는 경우) DTO를 해당 패키지에서 가져와 사용하면 됩니다. 백엔드와 프론트엔드 간 코드 공유가 없다면, 프론트엔드 코드베이스 어딘가에 DTO를 보관해야 하는데, 이를 아래에서 다루어 보겠습니다.

`shared/api`에 요청 함수가 있다면, DTO 역시 해당 함수 바로 옆에 두는 것이 좋습니다:

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

앞에서 언급한 것처럼, 요청과 DTO를 shared에 두면 다른 DTO를 참조하기가 용이합니다.

### Mappers의 위치

Mapper는 DTO를 받아 변환하는 역할을 하므로, DTO 정의와 가까운 위치에 두는 것이 좋습니다. 만약 요청과 DTO가 `shared/api`에 정의되어 있다면, mapper도 그곳에 위치하는 것이 적절합니다.

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
  /** 노래의 전체 제목, 디스크 번호까지 포함된 제목입니다. */
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

요청과 상태 관리 코드가 entity slice에 정의되어 있는 경우, mapper 역시 해당 slice 내에 두는 것이 좋습니다. 이때 slice 간 교차 참조가 발생하지 않도록 주의해야 합니다.

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

### 중첩된 DTO 처리 방법

백엔드 응답에 여러 entity가 포함된 경우 문제가 될 수 있습니다. 예를 들어, 곡 정보에 저자의 ID뿐만 아니라 저자 객체 전체가 포함된 경우가 있을 수 있습니다. 이런 상황에서는 entity 간의 상호 참조를 피하기 어렵습니다. 데이터를 지우거나 백엔드 팀과 협의하지 않는 한, 이러한 경우에는 slice 간 간접적인 연결 대신 명시적인 교차 참조를 사용하는 것이 좋습니다. 이를 위해 `@x` 표기법을 활용할 수 있으며, 다음은 Redux Toolkit을 사용한 예시입니다:

```ts title="entities/song/model/songs.ts"
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { getSong } from "../api/getSong";

// Normalizr의 entities 스키마 정의
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
      // 같은 fetch 결과를 처리하며, 여기서 artists를 삽입합니다.
      artistAdapter.upsertMany(state, action.payload.artists)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

이 방법은 slice 분리의 이점을 다소 제한할 수 있지만, 우리가 제어할 수 없는 두 entity 간의 관계를 명확하게 나타냅니다. 만약 이러한 entity가 리팩토링되어야 한다면, 함께 리팩토링해야 할 것입니다.

## 전역 타입과 Redux 

전역 타입은 애플리케이션 전반에서 사용되는 타입을 의미하며, 크게 두 가지로 나눌 수 있습니다:<br/>
1. 애플리케이션 특성이 없는 제너릭 타입
2. 애플리케이션 전체에 알고 있어야 하는 타입 

첫 번째 경우에는 관련 타입을 Shared 폴더 안에 적절한 segment로 배치하면 됩니다. 예를 들어, 분석 전역 변수를 위한 인터페이스가 있다면 `shared/analytics`에 두는 것이 좋습니다.

:::warning

경고: `shared/types` 폴더를 생성하지 않는 것이 좋습니다. "타입"이라는 공통된 속성으로 관련 없는 항목들을 그룹화하면, 프로젝트에서 코드를 검색할 때 효율성이 떨어질 수 있습니다.

:::

두 번째 경우는 Redux를 사용하지만 RTK가 없는 프로젝트에서 자주 발생합니다. 최종 store 타입은 모든 reducer를 추가한 후에만 사용 가능하지만, 이 store 타입은 앱 전체에서 사용하는 selector에 필요합니다. 예를 들어, 일반적인 store 정의는 다음과 같습니다:

```ts title="app/store/index.ts"
import { combineReducers, rootReducer } from "redux";

import { songReducer } from "entities/song";
import { artistReducer } from "entities/artist";

const rootReducer = combineReducers(songReducer, artistReducer);

const store = createStore(rootReducer);

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
```

`shared/store`에서 `useAppDispatch`와 `useAppSelector`와 같은 타입이 지정된 Redux 훅을 사용하는 것이 좋지만, [layer에 대한 import 규칙][import-rule-on-layers] 때문에 App layer에서 `RootState`와 `AppDispatch`를 import 할 수 없습니다. 

> slice의 module은 더 낮은 layer에 위치한 다른 slice만 import 할 수 있습니다.

이 경우 권장되는 해결책은 Shared와 App layer 간에 암묵적인 의존성을 만드는 것입니다. `RootState`와 `AppDispatch` 두 타입은 유지보수 필요성이 적고 Redux를 사용하는 개발자들에게 익숙하므로 큰 문제 없이 사용할 수 있습니다.

TypeScript에서는 다음과 같이 타입을 전역으로 선언할 수 있습니다: 

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

## 열거형 

**일반적으로 열거형(enum)은 사용되는 위치와 최대한 가까운 곳에 정의하는 것이 좋습니다**. 열거형이 특정 기능과 관련된 값을 나타낸다면, 해당 기능 내에 정의해야 합니다.

segment 선택도 사용 위치에 따라 달라져야 합니다. 예를 들어, 화면에서 토스트 위치를 나타내는 열거형이라면 ui segment에 두는 것이 좋고, 백엔드 응답 상태 등을 나타낸다면 api segment에 두는 것이 적합합니다.

프로젝트 전반에서 공통으로 사용되는 열거형도 있습니다. 예를 들어, 일반적인 백엔드 응답 상태나 디자인 시스템 토큰 등이 있습니다. 이 경우 Shared에 두되, 열거형이 나타내는 것을 기준으로 segment를 선택하면 됩니다 (`api`는 응답 상태, `ui`는 디자인 토큰 등).

## 타입 검증 스키마와 Zod

데이터가 특정 형태나 제약 조건을 충족하는지 검증하려면 검증 스키마를 정의할 수 있습니다. TypeScript에서는 [Zod][ext-zod]와 같은 라이브러리를 많이 사용합니다. 검증 스키마는 가능하면 사용하는 코드와 같은 위치에 두는 것이 좋습니다.

검증 스키마는 데이터를 파싱하며, 파싱에 실패하면 오류를 발생시킵니다.([Data transfoer objects and mappers](#data-transfer-objects-and-mappers) 토론을 참조하세요.) 가장 일반적인 검증 사례 중 하나는 백엔드에서 오는 데이터에 대한 것입니다. 데이터가 스키마와 일치하지 않는 경우 요청을 실패시키기를 원하기 때문에, 보통 `api` segment에 스키마를 두는 것이 좋습니다.

사용자 입력(예: 폼)으로 데이터를 받을 경우, 입력된 데이터에 대해 바로 검증이 이루어져야 합니다. 이 경우 스키마를 `ui` segment 내 폼 컴포넌트 옆에 두거나, `ui` segment가 너무 복잡하다면 `model` segment에 둘 수 있습니다.

## 컴포넌트 props와 context의 타입 정의 

보통 props나 context 인터페이스는 이를 사용하는 컴포넌트나 컨텍스트와 같은 파일에 두는 것이 가장 좋습니다. 만약 Vue나 Svelte처럼 단일 파일 컴포넌트를 사용하는 프레임워크에서 여러 컴포넌트 간에 해당 인터페이스를 공유해야 한다면, `ui` segment 내 동일 폴더에 별도의 파일을 만들어 정의할 수 있습니다.

예를 들어, React의 JSX에서는 다음과 같이 정의합니다:

```ts title="pages/home/ui/RecentActions.tsx"
interface RecentActionsProps {
  actions: Array<{ id: string; text: string }>;
}

export function RecentActions({ actions }: RecentActionsProps) {
  /* … */
}
```

Vue에서 인터페이스를 별도 파일에 저장한 예는 다음과 같습니다:

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

[Vite][ext-vite]나 [ts-reset][ext-ts-reset] 같은 일부 패키지는 앱 전반에서 작동하기 위해 Ambient 선언 파일을 필요로 합니다. 이러한 파일들은 보통 크거나 복잡하지 않기 때문에 `src/` 폴더에 두어도 괜찮습니다. 더 정리된 구조를 위해 `app/ambient/` 폴더에 두는 것도 좋은 방법입니다.

타이핑이 없는 패키지인 경우, 해당 패키지를 미타입으로 선언하거나 직접 타이핑을 작성할 수 있습니다. 이러한 타이핑을 위한 좋은 위치는 `shared/lib` 폴더 내의 `shared/lib/untyped-packages` 폴더입니다. 이 폴더에 `%LIBRARY_NAME%.d.ts` 파일을 생성하고 필요한 타입을 선언합니다

```ts title="shared/lib/untyped-packages/use-react-screenshot.d.ts"
// 이 라이브러리는 타입 정의가 없으며 작성하는 것을 생략했습니다.
declare module "use-react-screenshot";
```

## 타입 자동 생성 

외부 소스로부터 타입을 생성하는 일은 흔히 발생합니다. 예를 들어, OpenAPI 스키마로부터 백엔드 타입을 생성하는 경우가 있습니다.<br/>
이러한 타입을 위한 전용 위치를 코드베이스에 만드는 것이 좋습니다. 예를 들어 `shared/api/openapi`와 같은 위치가 적합합니다. 이상적으로는 이러한 파일이 무엇인지, 어떻게 재생성하는지 등을 설명하는 README 파일도 포함하는 것이 좋습니다.

[import-rule-on-layers]: /docs/reference/layers#import-rule-on-layers
[ext-type-fest]: https://github.com/sindresorhus/type-fest
[ext-zod]: https://zod.dev
[ext-vite]: https://vitejs.dev
[ext-ts-reset]: https://www.totaltypescript.com/ts-reset
