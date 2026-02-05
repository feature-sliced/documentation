# Использование с React Query

## Проблема «куда положить ключи»[​](#проблема-куда-положить-ключи "Прямая ссылка на этот заголовок")

### Решение - разбить по сущностям[​](#решение---разбить-по-сущностям "Прямая ссылка на этот заголовок")

Если в проекте уже присутствует разделение на сущности, и каждый запрос соответствует одной сущности, наиболее чистым будет разделение по сущностям. В таком случае, предлагаем использовать следующую структуру:

```
└── src/                                        #
    ├── app/                                    #
    |   ...                                     #
    ├── pages/                                  #
    |   ...                                     #
    ├── entities/                               #
    |     ├── {entity}/                         #
    |    ...     └── api/                       #
    |                 ├── `{entity}.query`      # Фабрика запросов, где определены ключи и функции
    |                 ├── `get-{entity}`        # Функция получения сущности
    |                 ├── `create-{entity}`     # Функция создания сущности
    |                 ├── `update-{entity}`     # Функция обновления объекта
    |                 ├── `delete-{entity}`     # Функция удаления объекта
    |                ...                        #
    |                                           #
    ├── features/                               #
    |   ...                                     #
    ├── widgets/                                #
    |   ...                                     #
    └── shared/                                 #
        ...                                     #
```

Если среди сущностей есть связи (например, у сущности Страна есть поле-список сущностей Город), то можно воспользоваться [публичным API для кросс-импортов](/ru/docs/reference/public-api.md#public-api-for-cross-imports) или рассмотреть альтернативное решение ниже.

### Альтернативное решение — хранить запросы в общем доступе.[​](#альтернативное-решение--хранить-запросы-в-общем-доступе "Прямая ссылка на этот заголовок")

В случаях, когда не подходит разделение по сущностям, можно рассмотреть следующую структуру:

```
└── src/                                        #
   ...                                          #
    └── shared/                                 #
          ├── api/                              #
         ...   ├── `queries`                    # Query-factories
               |      ├── `document.ts`         #
               |      ├── `background-jobs.ts`  #
               |     ...                        #
               └──  index.ts                    #
```

Затем в `@/shared/api/index.ts`:

@/shared/api/index.ts

```
export { documentQueries } from "./queries/document";
```

## Проблема «Куда мутации?»[​](#проблема-куда-мутации "Прямая ссылка на этот заголовок")

Мутации не рекомендуется смешивать с запросами. Возможны два варианта:

### 1. Определить кастомный хук в сегменте api рядом с местом использования[​](#1-определить-кастомный-хук-в-сегменте-api-рядом-с-местом-использования "Прямая ссылка на этот заголовок")

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

### 2. Определить функцию мутации в другом месте (Shared или Entities) и использовать `useMutation` напрямую в компоненте[​](#2-определить-функцию-мутации-в-другом-месте-shared-или-entities-и-использовать-usemutation-напрямую-в-компоненте "Прямая ссылка на этот заголовок")

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

## Организация запросов[​](#организация-запросов "Прямая ссылка на этот заголовок")

### Фабрика запросов[​](#фабрика-запросов "Прямая ссылка на этот заголовок")

В этом гайде рассмотрим, как использовать фабрику запросов (объект, где значениями ключа - являются функции, возвращающие список ключей запроса)

```
const keyFactory = {
  all: () => ["entity"],
  lists: () => [...postQueries.all(), "list"],
};
```

к сведению

`queryOptions` - встроенная утилита react-query\@v5 (опционально)

```
queryOptions({
  queryKey,
  ...options,
});
```

Для большей типобезопасности и дальнейшей совместимости со следующими версиями react-query, а также упрощенного доступа к функциям и ключам запросов - можно использовать встроенную в функцию queryOptions из “@tanstack/react-query” [(Подробнее здесь)](https://tkdodo.eu/blog/the-query-options-api#queryoptions).

### 1. Создание Фабрики запросов[​](#1-создание-фабрики-запросов "Прямая ссылка на этот заголовок")

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

### 2. Применение Фабрики запросов в коде приложения[​](#2-применение-фабрики-запросов-в-коде-приложения "Прямая ссылка на этот заголовок")

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

### Преимущества использования Фабрики запросов[​](#преимущества-использования-фабрики-запросов "Прямая ссылка на этот заголовок")

* **Структурирование запросов:** Фабрика позволяет организовать все запросы к API в одном месте, что делает код более читаемым и поддерживаемым.
* **Удобный доступ к запросам и ключам:** Фабрика предоставляет удобные методы для доступа к различным типам запросов и их ключам.
* **Возможность рефетчинга запросов:** Фабрика обеспечивает возможность легкой рефетчинга без необходимости изменения ключей запросов в разных частях приложения.

## Пагинация[​](#пагинация "Прямая ссылка на этот заголовок")

В этом разделе рассмотрим пример функции `getPosts`, которая выполняет запрос к API для получения сущностей постов с применением пагинации.

### 1. Создание функции `getPosts`[​](#1-создание-функции-getposts "Прямая ссылка на этот заголовок")

Функция getPosts находится в файле `get-posts.ts`, который находится в сегменте API.

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

### 2. Фабрика запросов для пагинации[​](#2-фабрика-запросов-для-пагинации "Прямая ссылка на этот заголовок")

Фабрика запросов `postQueries` определяет различные варианты запросов для работы с постами, включая запрос списка постов с заранее определенной страницей и лимитом.

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

### 3. Использование в коде приложения[​](#3-использование-в-коде-приложения "Прямая ссылка на этот заголовок")

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

примечание

Пример упрощен, полная версия доступна на [GitHub](https://github.com/ruslan4432013/fsd-react-query-example)

## `QueryProvider` для управления запросами[​](#queryprovider-для-управления-запросами "Прямая ссылка на этот заголовок")

В этом гайде рассмотрим, как организовать `QueryProvider`.

### 1. Создание `QueryProvider`[​](#1-создание-queryprovider "Прямая ссылка на этот заголовок")

Файл `query-provider.tsx` расположен по пути `@/app/providers/query-provider.tsx`.

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

### 2. Создание `QueryClient`[​](#2-создание-queryclient "Прямая ссылка на этот заголовок")

`QueryClient` представляет собой экземпляр, используемый для управления запросами к API. Файл `query-client.ts` расположен по пути `@/shared/api/query-client.ts`. `QueryClient` создается с определенными настройками для кэширования запросов.

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

## Кодогенерация[​](#кодогенерация "Прямая ссылка на этот заголовок")

Существуют инструменты для автоматической генерации кода, которые менее гибкие, по сравнению с теми, что можно настроить, как описано выше. Если ваш Swagger-файл хорошо структурирован, и вы используете одно из таких инструментов, то возможно имеет смысл сгенерировать весь код в каталоге @/shared/api.

## Дополнительный совет по организации RQ[​](#дополнительный-совет-по-организации-rq "Прямая ссылка на этот заголовок")

### API-Клиент[​](#api-клиент "Прямая ссылка на этот заголовок")

Используя собственный класс клиента API в общем слое shared, можно стандартизировать настройку и работу с API в проекте. Это позволяет управлять логированием, заголовками и форматом обмена данными (например, JSON или XML) из одного места. Такой подход облегчает поддержку и развитие проекта, поскольку упрощает изменения и обновления взаимодействия с API.

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

## Полезные ссылки[​](#see-also "Прямая ссылка на этот заголовок")

* [(GitHub) Пример проекта](https://github.com/ruslan4432013/fsd-react-query-example)
* [(CodeSandbox) Пример проекта](https://codesandbox.io/p/github/ruslan4432013/fsd-react-query-example/main)
* [О фабрике запросов](https://tkdodo.eu/blog/the-query-options-api)
