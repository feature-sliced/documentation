# React Queryとの併用

## キーをどこに置くか問題[​](#キーをどこに置くか問題 "この見出しへの直接リンク")

### 解決策 - エンティティごとに分割する[​](#解決策---エンティティごとに分割する "この見出しへの直接リンク")

プロジェクトにすでにエンティティの分割があり、各クエリが1つのエンティティに対応している場合、エンティティごとに分割するのが最良です。この場合、次の構造を使用することをお勧めします。

```
└── src/                                        #
    ├── app/                                    #
    |   ...                                     #
    ├── pages/                                  #
    |   ...                                     #
    ├── entities/                               #
    |     ├── {entity}/                         #
    |    ...     └── api/                       #
    |                 ├── `{entity}.query`      # クエリファクトリー、キーと関数が定義されている
    |                 ├── `get-{entity}`        # エンティティを取得する関数
    |                 ├── `create-{entity}`     # エンティティを作成する関数
    |                 ├── `update-{entity}`     # オブジェクトを更新する関数
    |                 ├── `delete-{entity}`     # オブジェクトを削除する関数
    |                ...                        #
    |                                           #
    ├── features/                               #
    |   ...                                     #
    ├── widgets/                                #
    |   ...                                     #
    └── shared/                                 #
        ...                                     #
```

もしエンティティ間に関係がある場合（例えば、「国」のエンティティに「都市」のエンティティ一覧フィールドがある場合）、`@x` アノテーションを使用した組織的なクロスインポートの[クロスインポート用のパブリックAPI](/documentation/ja/docs/reference/public-api.md#public-api-for-cross-imports)を利用するか、以下の代替案を検討できます。

### 代替案 — クエリを公開で保存する[​](#代替案--クエリを公開で保存する "この見出しへの直接リンク")

エンティティごとの分割が適さない場合、次の構造を考慮できます。

```
└── src/                                        #
   ...                                          #
    └── shared/                                 #
          ├── api/                              #
         ...   ├── `queries`                    # クエリファクトリー
               |      ├── `document.ts`         #
               |      ├── `background-jobs.ts`  #
               |     ...                        #
               └──  index.ts                    #
```

次に、`@/shared/api/index.ts`に

@/shared/api/index.ts

```
export { documentQueries } from "./queries/document";
```

## 問題「ミューテーションはどこに？」[​](#問題ミューテーションはどこに "この見出しへの直接リンク")

ミューテーションをクエリと混合することは推奨されません。2つの選択肢が考えられます。

### 1. 使用場所の近くにAPIセグメントにカスタムフックを定義する[​](#1-使用場所の近くにapiセグメントにカスタムフックを定義する "この見出しへの直接リンク")

@/features/update-post/api/use-update-title.ts

```
export const useUpdateTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newTitle }) =>
      apiClient
        .patch(`/posts/${id}`, { title: newTitle })
        .then((data) => console.log(data)),

    onSuccess: (newPost) => {
      queryClient.setQueryData(postsQueries.ids(id), newPost);
    },
  });
};
```

### 2. 別の場所（Shared層やEntities層）にミューテーション関数を定義し、コンポーネント内で`useMutation`を直接使用する[​](#2-別の場所shared層やentities層にミューテーション関数を定義しコンポーネント内でusemutationを直接使用する "この見出しへの直接リンク")

```
const { mutateAsync, isPending } = useMutation({
  mutationFn: postApi.createPost,
});
```

@/pages/post-create/ui/post-create-page.tsx

```
export const CreatePost = () => {
  const { classes } = useStyles();
  const [title, setTitle] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: postApi.createPost,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ title, userId: DEFAULT_USER_ID });
  };

  return (
    <form className={classes.create_form} onSubmit={handleSubmit}>
      <TextField onChange={handleChange} value={title} />
      <LoadingButton type="submit" variant="contained" loading={isPending}>
        Create
      </LoadingButton>
    </form>
  );
};
```

## クエリの組織化[​](#クエリの組織化 "この見出しへの直接リンク")

### クエリファクトリー[​](#クエリファクトリー "この見出しへの直接リンク")

このガイドでは、クエリファクトリーの使い方について説明します。

注記

クエリファクトリーとは、JSオブジェクトのことで、そのオブジェクトキーの値がクエリキー一覧を返す関数である。

```
const keyFactory = {
  all: () => ["entity"],
  lists: () => [...postQueries.all(), "list"],
};
```

備考

`queryOptions` - react-query\@v5に組み込まれたユーティリティ（オプション）

```
queryOptions({
  queryKey,
  ...options,
});
```

より高い型安全性と将来のreact-queryのバージョンとの互換性を確保し、クエリの関数やキーへのアクセスを簡素化するために、`@tanstack/react-query`の`queryOptions`関数を使用することができる[(詳細はこちら)](https://tkdodo.eu/blog/the-query-options-api#queryoptions)。

### 1. クエリファクトリーの作成[​](#1-クエリファクトリーの作成 "この見出しへの直接リンク")

@/entities/post/api/post.queries.ts

```
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getPosts } from "./get-posts";
import { getDetailPost } from "./get-detail-post";
import { PostDetailQuery } from "./query/post.query";

export const postQueries = {
  all: () => ["posts"],

  lists: () => [...postQueries.all(), "list"],
  list: (page: number, limit: number) =>
    queryOptions({
      queryKey: [...postQueries.lists(), page, limit],
      queryFn: () => getPosts(page, limit),
      placeholderData: keepPreviousData,
    }),

  details: () => [...postQueries.all(), "detail"],
  detail: (query?: PostDetailQuery) =>
    queryOptions({
      queryKey: [...postQueries.details(), query?.id],
      queryFn: () => getDetailPost({ id: query?.id }),
      staleTime: 5000,
    }),
};
```

### 2. アプリケーションコードでのクエリファクトリーの適用[​](#2-アプリケーションコードでのクエリファクトリーの適用 "この見出しへの直接リンク")

```
import { useParams } from "react-router-dom";
import { postApi } from "@/entities/post";
import { useQuery } from "@tanstack/react-query";

type Params = {
  postId: string;
};

export const PostPage = () => {
  const { postId } = useParams<Params>();
  const id = parseInt(postId || "");
  const {
    data: post,
    error,
    isLoading,
    isError,
  } = useQuery(postApi.postQueries.detail({ id }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !post) {
    return <>{error?.message}</>;
  }

  return (
    <div>
      <p>Post id: {post.id}</p>
      <div>
        <h1>{post.title}</h1>
        <div>
          <p>{post.body}</p>
        </div>
      </div>
      <div>Owner: {post.userId}</div>
    </div>
  );
};
```

### クエリファクトリーを使用する利点[​](#クエリファクトリーを使用する利点 "この見出しへの直接リンク")

* **クエリの構造化:** ファクトリーはすべてのAPIクエリを1か所に整理し、コードをより読みやすく、保守しやすくしている
* **クエリとキーへの便利なアクセス:** ファクトリーはさまざまなタイプのクエリとそのキーへの便利なメソッドを提供している
* **クエリの再フェッチ機能:** ファクトリーは、アプリケーションのさまざまな部分でクエリキーを変更することなく、簡単に再フェッチを行うことを可能にしている

## ページネーション[​](#ページネーション "この見出しへの直接リンク")

このセクションでは、ページネーションを使用して投稿エンティティを取得するためのAPIクエリを行う`getPosts`関数の例を挙げます。

### 1. `getPosts`関数の作成[​](#1-getposts関数の作成 "この見出しへの直接リンク")

`getPosts`関数は、APIセグメント内の`get-posts.ts`ファイルにあります。

@/pages/post-feed/api/get-posts.ts

```
import { apiClient } from "@/shared/api/base";

import { PostWithPaginationDto } from "./dto/post-with-pagination.dto";
import { PostQuery } from "./query/post.query";
import { mapPost } from "./mapper/map-post";
import { PostWithPagination } from "../model/post-with-pagination";

const calculatePostPage = (totalCount: number, limit: number) =>
  Math.floor(totalCount / limit);

export const getPosts = async (
  page: number,
  limit: number,
): Promise<PostWithPagination> => {
  const skip = page * limit;
  const query: PostQuery = { skip, limit };
  const result = await apiClient.get<PostWithPaginationDto>("/posts", query);

  return {
    posts: result.posts.map((post) => mapPost(post)),
    limit: result.limit,
    skip: result.skip,
    total: result.total,
    totalPages: calculatePostPage(result.total, limit),
  };
};
```

### 2. ページネーション用のクエリファクトリー[​](#2-ページネーション用のクエリファクトリー "この見出しへの直接リンク")

`postQueries`クエリファクトリーは、投稿に関するさまざまなクエリオプションを定義し、事前に定義されたページとリミットを使用して投稿一覧を取得するクエリを含みます。

```
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getPosts } from "./get-posts";

export const postQueries = {
  all: () => ["posts"],
  lists: () => [...postQueries.all(), "list"],
  list: (page: number, limit: number) =>
    queryOptions({
      queryKey: [...postQueries.lists(), page, limit],
      queryFn: () => getPosts(page, limit),
      placeholderData: keepPreviousData,
    }),
};
```

### 3. アプリケーションコードでの使用[​](#3-アプリケーションコードでの使用 "この見出しへの直接リンク")

@/pages/home/ui/index.tsx

```
export const HomePage = () => {
  const itemsOnScreen = DEFAULT_ITEMS_ON_SCREEN;
  const [page, setPage] = usePageParam(DEFAULT_PAGE);
  const { data, isFetching, isLoading } = useQuery(
    postApi.postQueries.list(page, itemsOnScreen),
  );
  return (
    <>
      <Pagination
        onChange={(_, page) => setPage(page)}
        page={page}
        count={data?.totalPages}
        variant="outlined"
        color="primary"
      />
      <Posts posts={data?.posts} />
    </>
  );
};
```

注記

例は簡略化されている。

## クエリ管理用の`QueryProvider`[​](#クエリ管理用のqueryprovider "この見出しへの直接リンク")

このガイドでは、`QueryProvider`をどのように構成するべきかを説明します。

### 1. `QueryProvider`の作成[​](#1-queryproviderの作成 "この見出しへの直接リンク")

`query-provider.tsx`ファイルは`@/app/providers/query-provider.tsx`にあります。

@/app/providers/query-provider.tsx

```
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  client: QueryClient;
};

export const QueryProvider = ({ client, children }: Props) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
```

### 2. `QueryClient`の作成[​](#2-queryclientの作成 "この見出しへの直接リンク")

`QueryClient`はAPIクエリを管理するために使用されるインスタンスです。`query-client.ts`ファイルは`@/shared/api/query-client.ts`にあります。`QueryClient`はクエリキャッシング用の特定の設定で作成されます。

@/shared/api/query-client.ts

```
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});
```

## コード生成[​](#コード生成 "この見出しへの直接リンク")

自動コード生成のためのツールが存在しますが、これらは上記のように設定可能なものと比較して柔軟性が低いです。Swaggerファイルが適切に構造化されている場合、これらのツールの1つを使用して`@/shared/api`ディレクトリ内のすべてのコードを生成することができます。

## RQの整理に関する追加のアドバイス[​](#rqの整理に関する追加のアドバイス "この見出しへの直接リンク")

### APIクライアント[​](#apiクライアント "この見出しへの直接リンク")

共有層であるshared層でカスタムのAPIクライアントクラスを使用することで、プロジェクト内でのAPI設定やAPI操作を標準化できます。これにより、ログ記録、ヘッダー、およびデータ交換形式（例: JSONやXML）を一元管理することができます。このアプローチにより、APIとの連携の変更や更新が簡単になり、プロジェクトのメンテナンスや開発が容易になります。

@/shared/api/api-client.ts

```
import { API_URL } from "@/shared/config";

export class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error("Error parsing JSON response");
    }
  }

  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
  ): Promise<TResult> {
    const url = new URL(endpoint, this.baseUrl);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.handleResponse<TResult>(response);
  }

  public async post<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
  ): Promise<TResult> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(API_URL);
```

## 参照[​](#see-also "この見出しへの直接リンク")

* [The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
