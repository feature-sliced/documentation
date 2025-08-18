# 型

このガイドでは、TypeScriptのような型付き言語のデータの型と、それがFSDにどのように適合するかについて説明します。

備考

あなたの質問がこのガイドにない場合は、この記事にフィードバックを残して質問を投稿してください（右側の青いボタン）、私たちはこのガイドを拡張する可能性を検討します！

## ユーティリティ型[​](#ユーティリティ型 "この見出しへの直接リンク")

ユーティリティ型は、特に意味を持たず、通常は他の型と一緒に使用される型です。例えば

```
type ArrayValues<T extends readonly unknown[]> = T[number];
```

出典: <https://github.com/sindresorhus/type-fest/blob/main/source/array-values.d.ts>

ユーティリティ型をプロジェクトに追加するには、[`type-fest`](https://github.com/sindresorhus/type-fest)のようなライブラリをインストールするか、`shared/lib`に独自のライブラリを作成します。必ず、新しい型をこのライブラリに追加できるか、できないかを明確に示してください。例えば、`shared/lib/utility-types`と名付け、その中にユーティリティ型があなたのチームの理解において何であるかを説明するREADMEファイルを追加してください。

ユーティリティ型の再利用の可能性を過大評価しないでください。再利用可能であるからといって、必ずしも再利用されるわけではなく、したがってすべてのユーティリティ型がShared層に存在する必要はありません。一部のユーティリティ型は、使用される場所の近くに置くべきです。

* 📂 pages

  <!-- -->

  * 📂 home

    <!-- -->

    * 📂 api

      <!-- -->

      * 📄 ArrayValues.ts (ユーティリティ型)
      * 📄 getMemoryUsageMetrics.ts (このユーティリティを使用するコード)

警告

`shared/types`フォルダーを作成したり、スライスに`types`セグメントを追加する誘惑に負けないでください。「型」というカテゴリは「コンポーネント」や「フック」と同様に、内容を説明するものであり、目的を示すものではありません。セグメントはコードの目的を説明するべきであり、その本質を説明するべきではありません。

## ビジネスエンティティと相互参照[​](#ビジネスエンティティと相互参照 "この見出しへの直接リンク")

アプリケーションで最も重要な型の一つは、ビジネスエンティティの型、つまりアプリケーションが扱う実際のオブジェクトです。例えば、オンライン音楽サービスのアプリケーションでは、ビジネスエンティティとして「曲」(song)や「アルバム」(album)などがあります。

ビジネスエンティティは、しばしばバックエンドから提供されるため、最初のステップはバックエンドのレスポンスを型付けすることです。各エンドポイントに対してリクエスト関数を持ち、その関数の呼び出し結果を型付けするのが便利です。型の安全性を高めるために、Zodのようなスキーマ検証ライブラリを通じて結果を通過させることができます。

例えば、すべてのリクエストをShared層に保存している場合、次のようにできます。

shared/api/songs.ts

```
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

`Song`型が他の`Artist`エンティティを参照していることに気付くかもしれません。これはリクエストをShared層に保存する利点です。実際の型が相互に参照されることが多いです。この関数を`entities/song/api`に置いた場合、`entities/artist`から`Artist`を単純にインポートすることはできません。なぜなら、FSDはスライス間のクロスインポートを[レイヤーのインポートルール](/documentation/ja/docs/reference/layers.md#import-rule-on-layers)によって制限しているからです。

> スライス内のモジュールは、下層にあるスライスのみをインポートできる。

この問題を解決する方法は2つあります。

1. **型をパラメーター化する** 型が他のエンティティと接続するためのスロットとして型引数を受け取るようにすることができます。さらに、これらのスロットに制約を課すこともできます。例えば

   entities/song/model/song.ts

   ```
   interface Song<ArtistType extends { id: string }> {
     id: number;
     title: string;
     artists: Array<ArtistType>;
   }
   ```

   これはいくつかの型に対してはうまく機能しますが、機能しないケースもあります。`Cart = { items: Array<Product> }`のような単純な型は、任意のプロダクト型で簡単に機能させることができます。しかし、`Country`と`City`のようなより関連性の高い型は、分離するのが難しいかもしれません。

2. **クロスインポートする（正しく）** FSD内でエンティティ間のクロスインポートを行うには、各スライス専用の特別の公開APIを使用することができます。例えば、`song`（曲）、`artist`（アーティスト）、`playlist`（プレイリスト）のエンティティがあり、後者の2つが`song`を参照する必要がある場合、`@x`ノーテーションを通じて`song`エンティティ内に2つの特別な公開APIを作成できます。

   * 📂 entities

     <!-- -->

     * 📂 song

       <!-- -->

       * 📂 @x

         <!-- -->

         * 📄 artist.ts (公開API、`artist`エンティティをインポートする)
         * 📄 playlist.ts (公開API、`playlist`エンティティをインポートする)

       * 📄 index.ts (通常の公開API)

   `📄 entities/song/@x/artist.ts`ファイルの内容は、`📄 entities/song/index.ts`と似ています。

   entities/song/@x/artist.ts

   ```
   export type { Song } from "../model/song.ts";
   ```

   その後、`📄 entities/artist/model/artist.ts`は次のように`Song`をインポートできます。

   entities/artist/model/artist.ts

   ```
   import type { Song } from "entities/song/@x/artist";

   export interface Artist {
     name: string;
     songs: Array<Song>;
   }
   ```

   エンティティ間の明示的な関係を持つことで、依存関係を正確に制御し、ドメインの分離を十分に保つことができます。

## データ転送オブジェクト（DTO）とマッパー[​](#data-transfer-objects-and-mappers "この見出しへの直接リンク")

データ転送オブジェクト、またはDTO（Data Transfer Object）は、バックエンドから送信されるデータの形式を説明する用語です。時にはDTOをそのまま使用できますが、時にはその形式がフロントエンドにとって不便な場合があります。ここでマッパーが役立ちます。マッパーは、DTOをより使いやすい形式に変換する関数です。

### DTOをどこに置くか[​](#dtoをどこに置くか "この見出しへの直接リンク")

バックエンドの型が別のパッケージにある場合（例えば、フロントエンドとバックエンド間でコードを共有している場合）、そこからDTOをインポートするだけで済みます。バックエンドとフロントエンド間でコードを共有していない場合、DTOをフロントエンドコードのどこかに保存する必要があります。この場合については以下で説明します。

リクエスト関数を`shared/api`に保存している場合、その関数で使用するDTOも、ちょうどその関数の近くに配置するべきです。

shared/api/songs.ts

```
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

前のセクションで述べたように、リクエストとDTOをShared層に保存する利点は、他のDTOを参照できることです。

### マッパーをどこに置くか[​](#マッパーをどこに置くか "この見出しへの直接リンク")

マッパーは、DTOを変換するための関数であり、したがってDTOの定義の近くに置くべきです。実際には、リクエストとDTOが`shared/api`に定義されている場合、マッパーもそこに置くべきです。

shared/api/songs.ts

```
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
  /** 曲の完全なタイトル、ディスク番号を含む。 */
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

リクエストとストレージがエンティティスライスに定義されている場合、このすべてのコードはそこに置くべきであり、エンティティ間のクロスインポートの制限を考慮する必要があります。

entities/song/api/dto.ts

```
import type { ArtistDTO } from "entities/artist/@x/song";

export interface SongDTO {
  id: number;
  title: string;
  disc_no: number;
  artist_ids: Array<ArtistDTO["id"]>;
}
```

entities/song/api/mapper.ts

```
import type { SongDTO } from "./dto";

export interface Song {
  id: string;
  title: string;
  /** 曲の完全なタイトル、ディスク番号を含む。 */
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

entities/song/api/listSongs.ts

```
import { adaptSongDTO } from "./mapper";

export function listSongs() {
  return fetch('/api/songs').then(async (res) => (await res.json()).map(adaptSongDTO));
}
```

entities/song/model/songs.ts

```
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

### ネストされたDTOをどう扱うか[​](#ネストされたdtoをどう扱うか "この見出しへの直接リンク")

最も問題となるのは、バックエンドからのレスポンスが複数のエンティティを含む場合です。例えば、曲がアーティストのIDだけでなく、アーティストのデータオブジェクト全体を含む場合です。この場合、エンティティは互いに知らないわけにはいきません（データを捨てたり、バックエンドチームと真剣に話し合いたくない場合を除いて）。スライス間の暗黙的な関係の解決策を考えるのではなく、`@x`ノーテーションを通じて明示的なクロスインポートを選ぶべきです。Redux Toolkitを使用してこれを実装する方法は次のとおりです。

entities/song/model/songs.ts

```
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import { getSong } from "../api/getSong";

// normalizrでエンティティのスキーマを宣言
export const artistEntity = new schema.Entity('artists')
export const songEntity = new schema.Entity('songs', {
  artists: [artistEntity],
})

const songAdapter = createEntityAdapter()

export const fetchSong = createAsyncThunk(
  'songs/fetchSong',
  async (id: string) => {
    const data = await getSong(id)
    // データを正規化して、リデューサーが予測可能なオブジェクトをロードできるようにします。例えば
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

entities/song/@x/artist.ts

```
export { fetchSong } from "../model/songs";
```

entities/artist/model/artists.ts

```
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { fetchSong } from 'entities/song/@x/artist'

const artistAdapter = createEntityAdapter()

export const slice = createSlice({
  name: 'users',
  initialState: artistAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSong.fulfilled, (state, action) => {
      // ここでバックエンドからの同じレスポンスを処理し、ユーザーを追加します
      artistAdapter.upsertMany(state, action.payload.artists)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

これはスライスの分離の利点を少し制限しますが、私たちが制御できないこれらの2つのエンティティ間の関係を明確に示します。これらのエンティティがリファクタリングされる場合、同時にリファクタリングする必要があります。

## グローバルの型とRedux[​](#グローバルの型とredux "この見出しへの直接リンク")

グローバルの型とは、アプリケーション全体で使用される型のことです。グローバルの型には、必要な情報に応じて2種類があります。

1. アプリケーションに特有の情報を持たないユニバーサル型
2. アプリケーション全体について知る必要がある型

最初のケースは簡単に解決できます。型をShared層の適切なセグメントに置くだけです。例えば、分析用のグローバル変数のインターフェースがある場合、それを`shared/analytics`に置くことができます。

警告

`shared/types`フォルダーを作成することは避けてください。これは「型である」という特性に基づいて無関係なものをグループ化するだけであり、この特性はプロジェクト内でコードを検索する際には通常無意味です。

2番目のケースは、RTKなしでReduxを使用しているプロジェクトでよく見られます。最終的なストアの型は、すべてのリデューサーを結合した後にのみ利用可能ですが、このストアの型はアプリケーションで使用されるセレクターに必要です。例えば、以下はReduxでのストアの典型的な定義です。

app/store/index.ts

```
import { combineReducers, rootReducer } from "redux";

import { songReducer } from "entities/song";
import { artistReducer } from "entities/artist";

const rootReducer = combineReducers(songReducer, artistReducer);

const store = createStore(rootReducer);

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
```

`shared/store`に型付けされた`useAppDispatch`と`useAppSelector`のフックを持つことは良いアイデアですが、[レイヤーのインポートルール](/documentation/ja/docs/reference/layers.md#import-rule-on-layers)のために、App層から`RootState`と`AppDispatch`をインポートすることはできません。

> スライス内のモジュールは、下層にあるスライスのみをインポートできる。

この場合の推奨解決策は、Shared層とApp層の間に暗黙の依存関係を作成することです。これらの2つの型、`RootState`と`AppDispatch`は、変更される可能性が低く、Reduxの開発者には馴染みのあるものであるため、暗黙の関係は問題にならないでしょう。

TypeScriptでは、これらの型をグローバルとして宣言することで実現できます。例えば

app/store/index.ts

```
/* 上記のコードブロックと同じ内容… */

declare type RootState = ReturnType<typeof rootReducer>;
declare type AppDispatch = typeof store.dispatch;
```

shared/store/index.ts

```
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 型のバリデーションスキーマとZod[​](#型のバリデーションスキーマとzod "この見出しへの直接リンク")

データが特定の形式や制約に従っていることを確認したい場合、バリデーションスキーマを作成できます。TypeScriptでこの目的に人気のあるライブラリは[Zod](https://zod.dev)です。バリデーションスキーマは、可能な限りそれを使用するコードの近くに配置する必要があります。

バリデーションスキーマは、データ転送オブジェクト（DTO）と似ており（[DTOとマッパー](#data-transfer-objects-and-mappers)のセクションで説明）、DTOを受け取り、それを解析し、解析に失敗した場合はエラーを返します。

バリデーションの最も一般的なケースの一つは、バックエンドからのデータです。通常、データがスキーマに従わない場合、リクエストを失敗としてマークしたいので、リクエスト関数と同じ場所にスキーマを置くのが良いでしょう。通常、これは`api`セグメントになります。

ユーザー入力を介してデータが送信される場合、例えばフォームを通じて、バリデーションはデータ入力時に行わなければなりません。この場合、スキーマを`ui`セグメントに配置し、フォームコンポーネントの近くに置くか、`ui`セグメントが過負荷である場合は`model`セグメントに配置できます。

## コンポーネントのプロップスとコンテキストの型付け[​](#コンポーネントのプロップスとコンテキストの型付け "この見出しへの直接リンク")

一般的に、プロップスやコンテキストのインターフェースは、それを使用するコンポーネントやコンテキストと同じファイルに保存するのが最良です。VueやSvelteのように、単一ファイルコンポーネントを持つフレームワークの場合、インターフェースを同じファイルに定義できない場合や、複数のコンポーネント間でこのインターフェースを再利用したい場合は、通常は`ui`セグメント内の同じフォルダーに別のファイルを作成します。

以下はJSX（ReactまたはSolid）の例です。

pages/home/ui/RecentActions.tsx

```
interface RecentActionsProps {
  actions: Array<{ id: string; text: string }>;
}

export function RecentActions({ actions }: RecentActionsProps) {
  /* … */
}
```

以下は、Vueのために別のファイルにインターフェースを保存する例です。

pages/home/ui/RecentActionsProps.ts

```
export interface RecentActionsProps {
  actions: Array<{ id: string; text: string }>;
}
```

pages/home/ui/RecentActions.vue

```
<script setup lang="ts">
  import type { RecentActionsProps } from "./RecentActionsProps";

  const props = defineProps<RecentActionsProps>();
</script>
```

## 環境宣言ファイル（`*.d.ts`）[​](#環境宣言ファイルdts "この見出しへの直接リンク")

一部のパッケージ、例えば[Vite](https://vitejs.dev)や[ts-reset](https://www.totaltypescript.com/ts-reset)は、アプリケーションで動作するために環境宣言ファイルを必要とします。通常、これらは小さくて簡単なので、特にアーキテクチャを必要とせず、単に`src/`に置くことができます。`src`をより整理されたものにするために、App層の`app/ambient/`に保存することもできます。

他のパッケージは単に型を持たず、その型を未定義として宣言する必要があるか、あるいは自分で型を作成する必要があるかもしれません。これらの型の良い場所は`shared/lib`で、`shared/lib/untyped-packages`のようなフォルダーです。そこに`%LIBRARY_NAME%.d.ts`というファイルを作成し、必要な型を宣言します。

shared/lib/untyped-packages/use-react-screenshot.d.ts

```
// このライブラリには型がなく、自分で型を書くのは億劫です。
declare module "use-react-screenshot";
```

## 型の自動生成[​](#型の自動生成 "この見出しへの直接リンク")

外部ソースから型を生成することは、しばしば便利です。例えば、OpenAPIスキーマからバックエンドの型を生成することができます。この場合、これらの型のためにコード内に特別な場所を作成します。例えば、`shared/api/openapi`のようにします。これらのファイルが何であるか、どのように再生成されるかを説明するREADMEをこのフォルダーに含めておくと理想的です。
