# Types

Hướng dẫn này liên quan đến data types từ các typed languages như TypeScript và mô tả chúng phù hợp ở đâu trong FSD.

**Note:** Câu hỏi của bạn không được đề cập trong hướng dẫn này? Đăng câu hỏi của bạn bằng cách để lại feedback trên bài viết này (nút xanh ở bên phải) và chúng tôi sẽ cân nhắc mở rộng hướng dẫn này!

## Utility types

Utility types là các types không có nhiều ý nghĩa riêng và thường được sử dụng với các types khác. Ví dụ:

<figure>

```ts
type ArrayValues<T extends readonly unknown[]> = T[number];
```

<figcaption>
  Nguồn: https://github.com/sindresorhus/type-fest/blob/main/source/array-values.d.ts
</figcaption>

</figure>

Để làm cho utility types có sẵn trong toàn bộ dự án của bạn, hoặc là install một library như [`type-fest`][ext-type-fest], hoặc tạo library riêng của bạn trong `shared/lib`. Đảm bảo chỉ rõ ràng những types mới nào _nên_ được thêm vào library này, và những types nào _không thuộc về_ đó. Ví dụ, gọi nó là `shared/lib/utility-types` và thêm README bên trong mô tả utility type là gì trong team của bạn.

Đừng đánh giá quá cao khả năng tái sử dụng của utility type. Chỉ vì nó có thể được tái sử dụng, không có nghĩa là nó sẽ được tái sử dụng, và vì vậy, không phải mọi utility type đều cần ở trong Shared. Một số utility types thì ổn ngay bên cạnh nơi chúng được cần:

- pages/
  - home/
    - api/
      - ArrayValues.ts utility type
      - getMemoryUsageMetrics.ts code sử dụng utility type
**Caution:** Hãy cưỡng lại cám dỗ tạo folder `shared/types`, hoặc thêm segment `types` vào slices của bạn. Category "types" tương tự như category "components" hoặc "hooks" ở chỗ nó mô tả nội dung là gì, chứ không phải chúng dành cho gì. Segments nên mô tả mục đích của code, không phải bản chất.

## Business entities và cross-references của chúng \{#business-entities-and-their-cross-references}

Trong số những types quan trọng nhất trong app là types của business entities, tức là những thứ trong thế giới thực mà app của bạn làm việc với. Ví dụ, trong music streaming app, bạn có thể có business entities _Song_, _Album_, v.v.

Business entities thường đến từ backend, vì vậy bước đầu tiên là type backend responses. Thật tiện lợi khi có function để thực hiện request đến mỗi endpoint, và type response của function này. Để có thêm type safety, bạn có thể muốn chạy response qua schema validation library như [Zod][ext-zod].

Ví dụ, nếu bạn giữ tất cả requests của mình trong Shared, bạn có thể làm như thế này:

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

Bạn có thể nhận thấy rằng type `Song` tham chiếu đến một entity khác, `Artist`. Đây là lợi ích của việc lưu trữ requests của bạn trong Shared — các types thế giới thực thường đan xen. Nếu chúng ta giữ function này trong `entities/song/api`, chúng ta sẽ không thể đơn giản import `Artist` từ `entities/artist`, vì FSD hạn chế cross-imports giữa các slices với [import rule trên các layers][import-rule-on-layers]:

> Một module trong slice chỉ có thể import các slices khác khi chúng được đặt trên các layers ở phía dưới.

Có hai cách để giải quyết vấn đề này:

1. **Tham số hóa các types của bạn**
   Bạn có thể làm cho types của mình chấp nhận type arguments làm slots cho các kết nối với entities khác, và thậm chí áp dụng constraints trên những slots đó. Ví dụ:

   ```ts title="entities/song/model/song.ts"
   interface Song<ArtistType extends { id: string }> {
     id: number;
     title: string;
     artists: Array<ArtistType>;
   }
   ```

   Điều này hoạt động tốt hơn cho một số types so với những types khác. Một type đơn giản như `Cart = { items: Array<Product> }` có thể dễ dàng được làm để hoạt động với bất kỳ loại product nào. Các types kết nối nhiều hơn, như `Country` và `City`, có thể không dễ tách rời.

2. **Cross-import (nhưng làm đúng cách)**
   Để thực hiện cross-imports giữa các entities trong FSD, bạn có thể sử dụng public API đặc biệt dành riêng cho mỗi slice sẽ cross-importing. Ví dụ, nếu chúng ta có entities `song`, `artist`, và `playlist`, và hai cái sau cần tham chiếu `song`, chúng ta có thể tạo hai public APIs đặc biệt cho cả hai trong entity `song` với ký hiệu `@x`:

   - entities/
     - song/
       - @x/
         - artist.ts public API cho entity `artist` để import
         - playlist.ts public API cho entity `playlist` để import
       - index.ts public API thông thường
   Nội dung của file `📄 entities/song/@x/artist.ts` tương tự như `📄 entities/song/index.ts`:

   ```ts title="entities/song/@x/artist.ts"
   export type { Song } from "../model/song.ts";
   ```

   Sau đó `📄 entities/artist/model/artist.ts` có thể import `Song` như thế này:

   ```ts title="entities/artist/model/artist.ts"
   import type { Song } from "entities/song/@x/artist";

   export interface Artist {
     name: string;
     songs: Array<Song>;
   }
   ```

   Bằng cách tạo kết nối rõ ràng giữa các entities, chúng ta kiểm soát được inter-dependencies và duy trì mức độ phân tách domain tốt.

## Data transfer objects và mappers \{#data-transfer-objects-and-mappers}

Data transfer objects, hay DTOs, là thuật ngữ mô tả hình dạng của dữ liệu đến từ backend. Đôi khi, DTO có thể sử dụng ngay, nhưng đôi khi nó không thuận tiện cho frontend. Đó là lúc mappers xuất hiện — chúng biến đổi DTO thành hình dạng thuận tiện hơn.

### Đặt DTOs ở đâu

Nếu bạn có backend types trong package riêng (ví dụ, nếu bạn chia sẻ code giữa frontend và backend), thì chỉ cần import DTOs từ đó và xong! Nếu bạn không chia sẻ code giữa backend và frontend, thì bạn cần giữ DTOs ở đâu đó trong frontend codebase, và chúng ta sẽ khám phá trường hợp này dưới đây.

Nếu bạn có request functions trong `shared/api`, đó là nơi DTOs nên ở, ngay cạnh function sử dụng chúng:

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

Như đã đề cập trong phần trước, lưu trữ requests và DTOs của bạn trong Shared mang lại lợi ích có thể tham chiếu DTOs khác.

### Đặt mappers ở đâu

Mappers là các functions chấp nhận DTO để biến đổi, và vì vậy, chúng nên được đặt gần định nghĩa của DTO. Trong thực tế điều này có nghĩa là nếu requests và DTOs của bạn được định nghĩa trong `shared/api`, thì mappers cũng nên ở đó:

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
  /** Tiêu đề đầy đủ của bài hát, bao gồm số đĩa. */
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

Nếu requests và stores của bạn được định nghĩa trong entity slices, thì tất cả code này sẽ đi vào đó, nhớ lưu ý giới hạn của cross-imports giữa các slices:

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
  /** Tiêu đề đầy đủ của bài hát, bao gồm số đĩa. */
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

### Cách xử lý nested DTOs

Phần có vấn đề nhất là khi response từ backend chứa nhiều entities. Ví dụ, nếu bài hát bao gồm không chỉ IDs của tác giả, mà cả toàn bộ author objects. Trong trường hợp này, không thể cho các entities không biết về nhau (trừ khi chúng ta muốn loại bỏ dữ liệu hoặc có cuộc trò chuyện nghiêm túc với backend team). Thay vì nghĩ ra giải pháp cho kết nối gián tiếp giữa các slices (như common middleware sẽ dispatch actions đến slices khác), ưu tiên cross-imports rõ ràng với ký hiệu `@x`. Đây là cách chúng ta có thể triển khai với Redux Toolkit:

```ts title="entities/song/model/songs.ts"
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { getSong } from "../api/getSong";

// Định nghĩa normalizr entity schemas
export const artistEntity = new schema.Entity('artists')
export const songEntity = new schema.Entity('songs', {
  artists: [artistEntity],
})

const songAdapter = createEntityAdapter()

export const fetchSong = createAsyncThunk(
  'songs/fetchSong',
  async (id: string) => {
    const data = await getSong(id)
    // Normalize dữ liệu để reducers có thể load payload dự đoán được, như:
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
      // Và xử lý cùng fetch result bằng cách chèn artists ở đây
      artistAdapter.upsertMany(state, action.payload.artists)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

Điều này hạn chế một chút lợi ích của slice isolation, nhưng nó thể hiện chính xác kết nối giữa hai entities này mà chúng ta không kiểm soát được. Nếu các entities này cần được refactor, chúng phải được refactor cùng nhau.

## Global types và Redux

Global types là types sẽ được sử dụng trong toàn bộ ứng dụng. Có hai loại global types, dựa trên những gì chúng cần biết:
1. Generic types không có bất kỳ đặc điểm ứng dụng nào
2. Types cần biết về toàn bộ ứng dụng

Trường hợp đầu tiên đơn giản để giải quyết — đặt types của bạn trong Shared, trong segment phù hợp. Ví dụ, nếu bạn có interface cho global variable cho analytics, bạn có thể đặt nó trong `shared/analytics`.

**Caution:** Tránh tạo folder `shared/types`. Nó nhóm những thứ không liên quan chỉ dựa trên thuộc tính "là một type", và thuộc tính đó thường không hữu ích khi tìm kiếm code trong dự án.

Trường hợp thứ hai thường gặp trong các dự án với Redux không có RTK. Store type cuối cùng của bạn chỉ có sẵn khi bạn thêm tất cả reducers lại với nhau, nhưng store type này cần có sẵn cho selectors mà bạn sử dụng trong app. Ví dụ, đây là định nghĩa store điển hình của bạn:

```ts title="app/store/index.ts"
import { combineReducers, rootReducer } from "redux";

import { songReducer } from "entities/song";
import { artistReducer } from "entities/artist";

const rootReducer = combineReducers(songReducer, artistReducer);

const store = createStore(rootReducer);

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
```

Sẽ tốt nếu có typed Redux hooks `useAppDispatch` và `useAppSelector` trong `shared/store`, nhưng chúng không thể import `RootState` và `AppDispatch` từ App layer do [import rule trên layers][import-rule-on-layers]:

> Một module trong slice chỉ có thể import các slices khác khi chúng được đặt trên layers nghiêm ngặt bên dưới.

Giải pháp được khuyến nghị trong trường hợp này là tạo implicit dependency giữa layers Shared và App. Hai types này, `RootState` và `AppDispatch` không chắc sẽ thay đổi, và chúng sẽ quen thuộc với Redux developers, vì vậy chúng ta không phải lo lắng về chúng nhiều.

Trong TypeScript, bạn có thể làm điều đó bằng cách khai báo types là global như thế này:

```ts title="app/store/index.ts"
/* cùng nội dung như trong code block trước… */

declare type RootState = ReturnType<typeof rootReducer>;
declare type AppDispatch = typeof store.dispatch;
```

```ts title="shared/store/index.ts"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Enums

Quy tắc chung với enums là chúng nên được định nghĩa **càng gần với vị trí sử dụng càng tốt**. Khi enum đại diện cho các giá trị cụ thể cho một feature duy nhất, nó nên được định nghĩa trong cùng feature đó.

Việc chọn segment cũng nên được quyết định bởi vị trí sử dụng. Nếu enum của bạn chứa, ví dụ, vị trí của toast trên màn hình, nó nên được đặt trong segment `ui`. Nếu nó đại diện cho loading state của backend operation, nó nên được đặt trong segment `api`.

Một số enums thực sự chung cho toàn bộ dự án, như general backend response statuses hoặc design system tokens. Trong trường hợp này, bạn có thể đặt chúng trong Shared, và chọn segment dựa trên enum đại diện cho gì (`api` cho response statuses, `ui` cho design tokens, v.v.).

## Type validation schemas và Zod \{#type-validation-schemas-and-zod}

Nếu bạn muốn validate rằng dữ liệu của bạn phù hợp với hình dạng hoặc ràng buộc nhất định, bạn có thể định nghĩa validation schema. Trong TypeScript, library phổ biến cho công việc này là [Zod][ext-zod]. Validation schemas cũng nên được colocated với code sử dụng chúng, càng nhiều càng tốt.

Validation schemas tương tự như mappers (như đã thảo luận trong phần [Data transfer objects và mappers](#data-transfer-objects-and-mappers)) ở chỗ chúng nhận data transfer object và parse nó, tạo ra lỗi nếu parsing thất bại.

Một trong những trường hợp phổ biến nhất của validation là cho dữ liệu đến từ backend. Thông thường, bạn muốn request thất bại khi dữ liệu không khớp với schema, vì vậy hợp lý khi đặt schema ở cùng nơi với request function, thường là segment `api`.

Nếu dữ liệu của bạn đến qua user input, như form, validation nên xảy ra khi dữ liệu đang được nhập. Bạn có thể đặt schema trong segment `ui`, cạnh form component, hoặc trong segment `model`, nếu segment `ui` quá đông.

## Typings của component props và context

Nói chung, tốt nhất là giữ props hoặc context interface trong cùng file với component hoặc context sử dụng chúng. Nếu bạn có framework với single-file components, như Vue hoặc Svelte, và bạn không thể định nghĩa props interface trong cùng file, hoặc bạn muốn chia sẻ interface đó giữa nhiều components, tạo file riêng trong cùng folder, thường là segment `ui`.

Đây là ví dụ với JSX (React hoặc Solid):

```ts title="pages/home/ui/RecentActions.tsx"
interface RecentActionsProps {
  actions: Array<{ id: string; text: string }>;
}

export function RecentActions({ actions }: RecentActionsProps) {
  /* … */
}
```

Và đây là ví dụ với interface được lưu trong file riêng cho Vue:

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

## Ambient declaration files (`*.d.ts`)

Một số packages, ví dụ, [Vite][ext-vite] hoặc [ts-reset][ext-ts-reset], yêu cầu ambient declaration files để hoạt động trong app của bạn. Thường thì chúng không lớn hoặc phức tạp, vì vậy chúng thường không yêu cầu bất kỳ architecting nào, có thể chỉ cần đặt chúng trong folder `src/`. Để giữ `src` có tổ chức hơn, bạn có thể giữ chúng trên App layer, trong `app/ambient/`.

Các packages khác đơn giản là không có typings, và bạn có thể muốn khai báo chúng là untyped hoặc thậm chí viết typings riêng cho chúng. Nơi tốt cho những typings đó sẽ là `shared/lib`, trong folder như `shared/lib/untyped-packages`. Tạo file `%LIBRARY_NAME%.d.ts` ở đó và khai báo types bạn cần:

```ts title="shared/lib/untyped-packages/use-react-screenshot.d.ts"
// Library này không có typings, và chúng tôi không muốn phiền viết riêng.
declare module "use-react-screenshot";
```

## Tự động sinh types

Thường xuyên sinh types từ nguồn bên ngoài, ví dụ, sinh backend types từ OpenAPI schema. Trong trường hợp này, tạo nơi chuyên dụng trong codebase của bạn cho những types này, như `shared/api/openapi`. Lý tưởng nhất, bạn cũng nên bao gồm README trong folder đó mô tả những files này là gì, cách tái tạo chúng, v.v.

[import-rule-on-layers]: /vi/docs/reference/layers#import-rule-on-layers
[ext-type-fest]: https://github.com/sindresorhus/type-fest
[ext-zod]: https://zod.dev
[ext-vite]: https://vitejs.dev
[ext-ts-reset]: https://www.totaltypescript.com/ts-reset
