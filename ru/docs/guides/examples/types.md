# Типы

В этом руководстве рассматриваются типы данных из типизированных языков, таких как TypeScript, и где они вписываются в FSD.

**Note:** Вашего вопроса нет в этом руководстве? Напишите свой вопрос, оставив отзыв к этой статье (синяя кнопка справа), и мы рассмотрим возможность расширения этого руководства!

## Типы-утилиты

Типы-утилиты — это типы, которые сами по себе не имеют особого смысла и обычно используются с другими типами. Например:

<figure>

```ts
type ArrayValues<T extends readonly unknown[]> = T[number];
```

<figcaption>
  Источник: https://github.com/sindresorhus/type-fest/blob/main/source/array-values.d.ts
</figcaption>

</figure>

Чтобы добавить типы-утилиты в ваш проект, установите библиотеку, например [`type-fest`][ext-type-fest], или создайте свою собственную библиотеку в `shared/lib`. Обязательно четко укажите, какие новые типы _можно_ добавлять в эту библиотеку, а какие — _нельзя_. Например, назовите ее `shared/lib/utility-types` и добавьте внутрь файл README, описывающий, что такое типы-утилиты в понимании вашей команды.

Не переоценивайте потенциал переиспользования типов-утилит. То, что их _можно_ использовать повторно, не означает, что так и будет, и поэтому не каждый тип-утилита должен быть в Shared. Некоторые типы-утилиты должны лежать прямо там, где они нужны:

- pages
  - home
    - api
      - ArrayValues.ts (тип-утилита)
      - getMemoryUsageMetrics.ts (код, который будет использовать эту утилиту)
**Caution:** Не поддавайтесь искушению создать папку `shared/types` или добавить сегмент `types` в ваши слайсы. Категория "типы" похожа на категорию "компоненты" или "хуки" в том, что она описывает содержимое, а не то, для чего оно нужно. Сегменты должны описывать цель кода, а не его суть.

## Бизнес-сущности и их ссылки друг на друга \{#business-entities-and-their-cross-references}

Одними из наиболее важных типов в приложении являются типы бизнес-сущностей, т. е. реальных вещей, с которыми работает ваше приложение. Например, в приложении сервиса онлайн-музыки у вас могут быть бизнес-сущности _Песня_ (song), _Альбом_ (album) и т. д.

Бизнес-сущности часто приходят с бэкенда, поэтому первым шагом является типизация ответов бэкенда. Удобно иметь функцию запроса к каждому эндпоинту и типизировать результат вызова этой функции. Для дополнительной безопасности типов вы можете пропустить результат через библиотеку проверки по схемам, например [Zod][ext-zod].

Например, если вы храните все свои запросы в Shared, вы можете сделать так:

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

Вы могли заметить, что тип `Song` ссылается на другую сущность, `Artist`. Это преимущество хранения ваших запросов в Shared — реальные типы часто ссылаются друг на друга. Если бы мы положили эту функцию в `entities/song/api`, мы бы не смогли просто импортировать `Artist` из `entities/artist`, потому что FSD ограничивает кросс-импорт между слайсами через [правило импорта для слоёв][import-rule-on-layers]:

> Модуль в слайсе может импортировать другие слайсы только в том случае, если они расположены на слоях строго ниже.

Есть два способа решения этой проблемы:

1. **Параметризируйте типы**
   Вы можете сделать так, чтоб ваши типы принимали типовые аргументы в качестве слотов для соединения с другими сущностями, и даже накладывать ограничения на эти слоты. Например:

   ```ts title="entities/song/model/song.ts"
   interface Song<ArtistType extends { id: string }> {
     id: number;
     title: string;
     artists: Array<ArtistType>;
   }
   ```

   Это хорошо работает для некоторых типов, и иногда хуже работает для других. Простой тип, такой как `Cart = { items: Array<Product> }`, можно легко заставить работать с любым типом продукта. Более связанные типы, такие как `Country` и `City`, может быть не так легко разделить.

2. **Кросс-импортируйте (но только правильно)**
   Чтоб сделать кросс-импорт между сущностями в FSD, вы можете использовать отдельный публичный API специально для каждого слайса, который будет кросс-импортировать. Например, если у нас есть сущности `song` (песня), `artist` (исполнитель), и `playlist` (плейлист), и последние две должны ссылаться на `song`, мы можем создать два специальных публичных API для них обоих в сущности `song` через `@x`-нотацию:

- entities
  - song
    - @x
      - artist.ts (публичный API, из которого будет импортировать сущность `artist`)
      - playlist.ts (публичный API, из которого будет импортировать сущность `playlist`)
    - index.ts (обыкновенный публичный API)
Содержимое файла `📄 entities/song/@x/artist.ts` похоже на `📄 entities/song/index.ts`:

   ```ts title="entities/song/@x/artist.ts"
   export type { Song } from "../model/song.ts";
   ```

   Затем `📄 entities/artist/model/artist.ts` может импортировать `Song` следующим образом:

   ```ts title="entities/artist/model/artist.ts"
   import type { Song } from "entities/song/@x/artist";

   export interface Artist {
     name: string;
     songs: Array<Song>;
   }
   ```

   С помощью явных связей между сущностями мы получаем точный контроль взаимозависимостей и при этом поддерживаем достаточный уровень разделения доменов.

## Объекты передачи данных (DTO) и мапперы \{#data-transfer-objects-and-mappers\}

Объекты передачи данных, или DTO (от англ. _data transfer object_), — это термин, описывающий форму данных, которые поступают из бэкенда. Иногда DTO можно использовать как есть, но иногда их формат неудобен для фронтенда. Тут приходят на помощь мапперы — это функции, которые преобразуют DTO в более удобную форму.

### Куда положить DTO

Если ваши типы бэкенда находятся в отдельном пакете (например, если вы делите код между фронтендом и бэкендом), просто импортируйте ваши DTO оттуда, и готово! Если вы не делите код между бэкендом и фронтендом, вам нужно хранить DTO где-то в вашем фронтенд-коде, и мы рассмотрим этот случай ниже.

Если вы храните функции запросов в `shared/api`, то именно там должны быть DTO, прямо рядом с функцией, которая их использует:

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

Как упоминалось в предыдущем разделе, хранение ваших запросов и DTO в Shared имеет преимущество того, что вы можете ссылаться на другие DTO.

### Куда положить мапперы

Мапперы — это функции, которые принимают DTO для преобразования, и, следовательно, они должны находиться рядом с определением DTO. На практике это означает, что если ваши запросы и DTO определены в `shared/api`, то и мапперы должны быть там же:

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

Если ваши запросы и хранилища определены в слайсах сущностей, то весь этот код должен быть там, с учётом ограничения кросс-импортов между сущностями:

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
  /** Полное название песни, включая номер диска. */
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

### Что делать с вложенными DTO

Самый проблемный момент — это когда ответ от бэкенда содержит несколько сущностей. Например, если песня включает в себя не только ID авторов, но и сами объекты данных об авторах целиком. В этом случае сущности не могут не знать друг о друге (если только мы не хотим выбрасывать данные или проводить серьезную беседу с командой бэкенда). Вместо того, чтобы придумывать решения для неявных связей между срезами (например, общий middleware, который будет диспатчить действия другим слайсам), предпочитайте явный кросс-импорт через `@x`-нотацию. Вот как мы можем это реализовать с Redux Toolkit:

```ts title="entities/song/model/songs.ts"
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { getSong } from "../api/getSong";

// Объявляем схемы сущностей в normalizr
export const artistEntity = new schema.Entity('artists')
export const songEntity = new schema.Entity('songs', {
  artists: [artistEntity],
})

const songAdapter = createEntityAdapter()

export const fetchSong = createAsyncThunk(
  'songs/fetchSong',
  async (id: string) => {
    const data = await getSong(id)
    // Нормализуем данные, чтобы редьюсеры могли загружать предсказуемый объект, например:
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
      // И здесь обрабатываем тот же ответ с бэкенда, добавляя исполнителей
      artistAdapter.upsertMany(state, action.payload.artists)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

Это немного ограничивает преимущества изоляции слайсов, но чётко обозначает связь между этими двумя сущностями, которую мы не контролируем. Если эти сущности когда-либо будут рефакториться, их нужно будет рефакторить вместе.

## Глобальные типы и Redux

Глобальные типы — это типы, которые будут использоваться во всем приложении. Существует два вида глобальных типов, в зависимости от того, что им нужно знать:
1. Универсальные типы, которые не имеют никакой специфики приложения
2. Типы, которым нужно знать обо всем приложении

Первый случай легко решить — поместите свои типы в Shared, в соответствующий сегмент. Например, если у вас есть интерфейс глобальной переменной для аналитики, вы можете поместить его в `shared/analytics`.

**Caution:** Избегайте создания папки `shared/types`. Она группирует несвязанные вещи только на основе свойства «быть типом», и это свойство обычно бесполезно при поиске кода в проекте.

Второй случай часто встречается в проектах с Redux без RTK. Ваш окончательный тип хранилища доступен только после того, как вы соедините все редьюсеры, но этот тип хранилища нужен селекторам, которые вы используете в приложении. Например, вот типичное определение хранилища в Redux:

```ts title="app/store/index.ts"
import { combineReducers, rootReducer } from "redux";

import { songReducer } from "entities/song";
import { artistReducer } from "entities/artist";

const rootReducer = combineReducers(songReducer, artistReducer);

const store = createStore(rootReducer);

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
```

Было бы неплохо иметь типизированные хуки `useAppDispatch` и `useAppSelector` в `shared/store`, но они не могут импортировать `RootState` и `AppDispatch` из слоя App из-за [правила импорта для слоёв][import-rule-on-layers]:

> Модуль в слайсе может импортировать другие слайсы только в том случае, если они расположены на слоях строго ниже.

Рекомендуемое решение в этом случае — создать неявную зависимость между слоями Shared и App. Эти два типа, `RootState` и `AppDispatch`, вряд ли изменятся, и они будут знакомы разработчикам на Redux, поэтому неявная связь вряд ли станет проблемой.

В TypeScript это можно сделать, объявив типы как глобальные, например так:

```ts title="app/store/index.ts"
/* то же содержимое, что и в блоке кода до этого… */

declare type RootState = ReturnType<typeof rootReducer>;
declare type AppDispatch = typeof store.dispatch;
```

```ts title="shared/store/index.ts"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Схемы валидации типов и Zod \{#type-validation-schemas-and-zod}

Если вы хотите проверить, что ваши данные соответствуют определенной форме или ограничениям, вы можете создать схему валидации. В TypeScript популярной библиотекой для этой задачи является [Zod][ext-zod]. Схемы валидации также должны быть размещены рядом с кодом, который их использует, насколько это возможно.

Схемы валидации похожи на мапперы (как обсуждалось в разделе [Объекты передачи данных (DTO) и мапперы](#data-transfer-objects-and-mappers)) в том смысле, что они принимают объект передачи данных и парсят его, выдавая ошибку, если парсинг не удался.

Один из наиболее распространенных случаев валидации — это данные, поступающие с бэкенда. Обычно вы хотите пометить запрос как неудавшийся, если данные не соответствуют схеме, поэтому имеет смысл поместить схему в том же месте, что и функция запроса, что обычно является сегментом `api`.

Если ваши данные поступают через пользовательский ввод, например, через форму, валидация должна происходить во время ввода данных. Вы можете разместить свою схему в сегменте `ui`, рядом с компонентом формы, или в сегменте `model`, если сегмент `ui` слишком перегружен.

## Типизация пропов компонентов и контекста

В целом, лучше хранить интерфейс пропов или контекста в том же файле, что и компонент или контекст, который их использует. Если у вас фреймворк с однофайловыми компонентами, например, Vue или Svelte, и вы не можете определить интерфейс пропов в том же файле, или вы хотите переиспользовать этот интерфейс между несколькими компонентами, создайте отдельный файл в той же папке, обычно в сегменте `ui`.

Вот пример с JSX (React или Solid):

```ts title="pages/home/ui/RecentActions.tsx"
interface RecentActionsProps {
  actions: Array<{ id: string; text: string }>;
}

export function RecentActions({ actions }: RecentActionsProps) {
  /* … */
}
```

И вот пример с интерфейсом, хранящимся в отдельном файле, для Vue:

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

## Декларационные файлы окружения (`*.d.ts`)

Некоторые пакеты, например, [Vite][ext-vite] или [ts-reset][ext-ts-reset], требуют декларационные файлы окружения для работы в вашем приложении. Обычно они небольшие и несложные, поэтому часто не требуют какой-либо архитектуры, их можно просто поместить в папку `src/`. Чтобы `src` был более организованным, вы можете хранить их на слое App, в `app/ambient/`.

Другие пакеты просто не имеют типов, и вам может понадобиться объявить их как нетипизированные или даже написать собственные типы для них. Хорошим местом для этих типов будет `shared/lib`, в папке типа `shared/lib/untyped-packages`. Создайте там файл `%LIBRARY_NAME%.d.ts` и объявите типы, которые вам нужны:

```ts title="shared/lib/untyped-packages/use-react-screenshot.d.ts"
// У этой библиотеки нет типов, и мы не хотели заморачиваться с написанием своих.
declare module "use-react-screenshot";
```

## Автогенерация типов

Часто бывает полезно генерировать типы из внешних источников, например, генерировать типы бэкенда из схемы OpenAPI. В этом случае создайте специальное место в вашем коде для этих типов, например, `shared/api/openapi`. Идеально, если вы также включите README в эту папку, который описывает, что это за файлы, как их перегенерировать и т. д.

[import-rule-on-layers]: /ru/docs/reference/layers#import-rule-on-layers
[ext-type-fest]: https://github.com/sindresorhus/type-fest
[ext-zod]: https://zod.dev
[ext-vite]: https://vitejs.dev
[ext-ts-reset]: https://www.totaltypescript.com/ts-reset
