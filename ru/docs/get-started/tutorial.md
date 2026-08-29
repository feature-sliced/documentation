# Туториал

## Часть 1. На бумаге

В этом руководстве мы рассмотрим приложение Real World App, также известное как Conduit. Conduit является упрощённым клоном [Medium](https://medium.com/) — он позволяет вам читать и писать статьи в блогах, а также комментировать статьи других людей.

![Главная страница Conduit](../../../../../../static/img/tutorial/realworld-feed-anonymous.jpg)

Это довольно небольшое приложение, поэтому мы не станем сильно усложнять разработку излишней декомпозицией. Вероятнее всего, что всё приложение поместится в три слоя: **App**, **Pages** и **Shared**. Если нет, будем вводить дополнительные слои по ходу. Готовы?

### Начните с перечисления страниц

Если мы посмотрим на скриншот выше, мы можем предположить, что по крайней мере, есть следующие страницы:

- Домашняя (лента статей)
- Войти и зарегистрироваться
- Просмотр статей
- Редактор статей
- Просмотр профилей людей
- Редактор профиля (настройки)

Каждая из этих страниц станет отдельным *слайсом* на *слое* Pages. Вспомните из обзора, что слайсы — это просто папки внутри слоев, а слои — это просто папки с заранее определенными названиями, например, `pages`.

Таким образом, наша папка Pages будет выглядеть так:

- pages/
  - feed/ лента
  - sign-in/ войти/зарегистрироваться
  - article-read/ просмотр статей
  - article-edit/ редактор статей
  - profile/ профиль
  - settings/ настройки
Ключевое отличие Feature-Sliced Design от произвольной структуры кода заключается в том, что страницы не могут зависеть друг от друга. То есть одна страница не может импортировать код с другой страницы. Это связано с **правилом импорта для слоёв**:

*Модуль (файл) в слайсе может импортировать другие слайсы только в том случае, если они расположены на слоях строго ниже.*

В этом случае страница является слайсом, поэтому модули (файлы) внутри этой страницы могут импортировать код только из слоев ниже, а не из других страниц.

### Пристальный взгляд на ленту

<figure>
  ![Перспектива анонимного посетителя](../../../../../../static/img/tutorial/realworld-feed-anonymous.jpg)
  <figcaption>
    _Перспектива анонимного посетителя_
  </figcaption>
</figure>

<figure>
  ![Перспектива авторизованного пользователя](../../../../../../static/img/tutorial/realworld-feed-authenticated.jpg)
  <figcaption>
    _Перспектива авторизованного пользователя_
  </figcaption>
</figure>

На странице ленты есть три динамических области:

1. Ссылки для логина, показывающие статус авторизации
2. Список тэгов, фильтрующих ленту
3. Одна—две ленты статей, у каждой статьи кнопка лайка

Ссылки для логина — часть заголовка, общего для всех страниц, так что пока что отложим их.

#### Список тэгов

Чтобы создать список тэгов, нам нужно получить все доступные тэги, отобразить каждый тэг как чип ([chip](https://m3.material.io/components/chips/overview)) и сохранить выбранные тэги в хранилище на стороне клиента. Эти операции относятся к категориям «взаимодействие с API», «пользовательский интерфейс» и «хранение данных». В Feature-Sliced Design код делится по назначению с помощью *сегментов*. Сегменты — это папки в слайсах, и они могут иметь произвольные названия, описывающие их цель, но некоторые цели настолько распространены, что существует несколько общепринятых названий:

- 📂 `api/` для взаимодействия с бэкендом
- 📂 `ui/` для кода, отвечающего за отображение и внешний вид
- 📂 `model/` для хранения данных и бизнес-логики
- 📂 `config/` для фиче-флагов, переменных окружения и других форм конфигурации

Мы поместим код, который получает тэги, в `api`, сам компонент тэга в `ui`, а взаимодействие с хранилищем в `model`.

#### Статьи

Следуя той же логике, мы можем разбить ленту статей на те же три сегмента:

- 📂 `api/`: получить постраничный список статей с количеством лайков, оставить лайк
- 📂 `ui/`:
    - список вкладок, который может отображать дополнительную вкладку при выборе тэга
    - отдельная статья
    - рабочая пагинация
- 📂 `model/`: клиентское хранилище загруженных постов и текущей страницы (при необходимости)

### Переиспользование общего кода

  Страницы, как правило, очень отличаются по своей цели, но что-то остается одинаковым по всему приложению — например, UI-кит, соответствующий языку дизайна, или соглашение на бэкенде, что все делается через REST API с конкретным методом аутентификации. Поскольку слайсы должны быть изолированными, переиспользование кода происходит за счёт слоя ниже, **Shared**.

Shared отличается от других слоев тем, что он содержит сегменты, а не слайсы. Таким образом, слой Shared представляет собой гибрид между слоем и слайсом.

Обычно код в Shared не планируется заранее, а извлекается по ходу разработки, потому что только во время разработки становится ясно, какие части кода действительно переиспользуются. Тем не менее, полезно держать в голове, какой код имеет смысл хранить в Shared:

- 📂 `ui/` — UI-кит, только внешний вид, без бизнес-логики. Например, кнопки, диалоги, поля форм.
- 📂 `api/` — удобные обёртки вокруг запросов на бэкенд (например, обёртка над `fetch()`  в случае веба)
- 📂 `config/` — обработка переменных окружения
- 📂 `i18n/` — конфигурация поддержки разных языков
- 📂 `router/` — примитивы и константы маршрутизации

Это лишь примеры сегментов в Shared, вы можете опустить любой из них или создать свой собственный. Единственное, что нужно помнить при создании новых сегментов — названия сегментов должны описывать **цель (почему), а не суть (что)**. Такие названия как `components` , `hooks`  или `modals`  *не стоит* использовать, потому что они описывают, что содержат эти файлы по сути, а не то, с какой целью писался этот код. Как следствие таких названий, команде приходится копаться в таких папках, чтоб найти нужное. Помимо этого,  несвязанный код лежит рядом, из-за чего при рефакторинге затрагивается большая часть приложения, что усложняет ревью и тестирование.

### Определите строгий публичный API

В контексте Feature-Sliced Design термин *публичный API* означает, что слайс или сегмент объявляет, что из него могут импортировать другие модули в проекте. Например, в JavaScript это может быть файл `index.js`, который переэкспортирует объекты из других файлов в слайсе. Это обеспечивает свободу рефакторинга внутри слайса до тех пор, пока контракт с внешним миром (т.е. публичный API) остается неизменным.

Для слоя Shared,  на котором нет слайсов, обычно удобнее определить публичный API (он же индекс) на уровне сегментов, а не один индекс на весь слой. В таком случае импорты из Shared естественным образом организуются по назначению. Для других слоев, на которых слайсы есть, верно обратное — обычно практичнее определить один индекс на слайс и позволить слайсу самому контролировать набор сегментов внутри, потому что другие слои обычно имеют гораздо меньше экспортов и чаще рефакторятся.

Наши слайсы/сегменты будут выглядеть друг для друга следующим образом:

- pages/
  - feed/
    - index
  - sign-in/
    - index
  - article-read/
    - index
  - ...
- shared/
  - ui/
    - index
  - api/
    - index
  - ...
Все, что находится внутри папок типа `pages/feed`  или `shared/ui` , известно только этим папкам, и нет никаких гарантий по содержанию этих папок.

### Крупные переиспользуемые блоки интерфейса

Ранее мы хотели отдельно вернуться к переиспользуемому заголовку приложения. Собирать его заново на каждой странице было бы непрактично, поэтому мы его переиспользуем. У нас уже есть слой Shared для переиспользования кода, однако, в случае крупных блоков интерфейса в Shared есть нюанс — слой Shared не должен знать о слоях выше.

Между слоями Shared и Pages есть три других слоя: Entities, Features и Widgets. В других проектах на этих слоях может лежать что-то, что хочется использовать в крупном переиспользуемом блоке, и тогда мы не сможем поместить этот блок в Shared, потому что тогда ему придется импортировать со слоёв выше, а это запрещено. Тут приходит на помощь слой Widgets. Он расположен выше Shared, Entities и Features, поэтому он может использовать их всех.

В нашем случае заголовок очень простой — это статический логотип и навигация верхнего уровня. Навигация должна спросить у API, авторизован ли сейчас пользователь, но это может быть решено простым импортом из сегмента `api`. Поэтому мы оставим наш заголовок в Shared.

### Пристальный взгляд на страницу с формой

Давайте также рассмотрим страницу, на которой можно не только читать, но и редактировать. К примеру, редактор статей:

![Редактор статей в Conduit](../../../../../../static/img/tutorial/realworld-editor-authenticated.jpg)

Она выглядит тривиально, но содержит несколько аспектов разработки приложений, которые мы еще не исследовали — валидацию форм, состояние ошибки и постоянное хранение данных.

Для создания этой страницы нам нужно несколько полей и кнопок из Shared, которые мы соберём в форму в сегменте `ui` этой страницы. Затем, в сегменте `api` мы определим изменяющий запрос, чтобы создать статью на бэкенде. 

Чтобы проверить запрос перед отправкой, нам нужна схема валидации, и хорошим местом для нее является сегмент `model` , поскольку это модель данных. Там же мы сгенерируем сообщение об ошибке, а отобразим его с помощью ещё одного компонента в сегменте `ui`.

Чтобы улучшить пользовательский опыт, мы также можем сохранять введённые данные постоянно, чтобы предотвратить случайную потерю при закрытии браузера. Это тоже подходит под сегмент `model`.

### Итоги

Мы разобрали несколько страниц и пришли к базовой структуре нашего приложения:

1. Слой Shared
   1. `ui`  будет содержать наш переиспользуемый UI-кит
   2. `api`  будет содержать наши примитивы для взаимодействия с бэкендом
   3. Остальное разложим по ходу написания кода
2. Слой Pages — для каждой страницы отдельный слайс
   1. `ui`  будет содержать саму страницу и составляющие её блоки
   2. `api`  будет содержать более специализированные функции получения данных, использующие `shared/api`
   3. `model`  может содержать клиентское хранилище данных, которые мы будем отображать

Давайте создадим это приложение!

## Часть 2. В коде

Теперь, когда у нас есть план, давайте воплотим его в жизнь. Мы будем использовать React и [Remix](https://remix.run/).

Для этого проекта уже есть готовый шаблон, cклонируйте его с GitHub, чтобы начать работу: [https://github.com/feature-sliced/tutorial-conduit/tree/clean](https://github.com/feature-sliced/tutorial-conduit/tree/clean)

Установите зависимости с помощью `npm install` и запустите сервер с помощью `npm run dev`. Откройте `http://localhost:3000`, и вы увидите пустое приложение.

### Разложим по страницам

Давайте начнем с создания пустых компонентов для всех наших страниц. Выполните следующую команду в своем проекте:

```bash
npx fsd pages feed sign-in article-read article-edit profile settings --segments ui
```

Это создаст папки наподобие `pages/feed/ui/` и индексный файл `pages/feed/index.ts` для каждой страницы.

### Подключим страницу фида

Давайте подключим корневой маршрут (`/`) нашего приложения к странице фида. Создайте компонент `FeedPage.tsx` в `pages/feed/ui` и поместите в него следующее:

```tsx title="pages/feed/ui/FeedPage.tsx"
export function FeedPage() {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    </div>
  );
}
```

Затем ре-экспортируйте этот компонент в публичном API страницы фида, файл `pages/feed/index.ts`:

```tsx title="pages/feed/index.ts"
export { FeedPage } from "./ui/FeedPage";
```

Теперь подключите его к корневому маршруту. В Remix маршрутизация работает на файлах, и файлы маршрутов находятся в папке `app/routes`, что хорошо сочетается с Feature-Sliced Design.

Используйте компонент `FeedPage` в `app/routes/_index.tsx`:

```tsx title="app/routes/_index.tsx"
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

Затем, если вы запустите dev-сервер и откроете приложение, вы должны увидеть баннер Conduit!

![Баннер Conduit](../../../../../../static/img/tutorial/conduit-banner.jpg)

### API-клиент

Чтобы общаться с бэкендом RealWorld, давайте создадим удобный API-клиент в Shared. Создайте два сегмента, `api` для клиента и `config` для таких переменных как базовый URL бэкенда:

```bash
npx fsd shared --segments api config
```

Затем создайте `shared/config/backend.ts`:

```tsx title="shared/config/backend.ts"
export { mockBackendUrl as backendBaseUrl } from "mocks/handlers";
```

```tsx title="shared/config/index.ts"
export { backendBaseUrl } from "./backend";
```

Поскольку проект RealWorld предоставляет [спецификацию OpenAPI](https://github.com/gothinkster/realworld/blob/main/api/openapi.yml), мы можем автоматически сгенерировать типы для нашего API-клиента. Мы будем использовать [пакет `openapi-fetch`](https://openapi-ts.pages.dev/openapi-fetch/), в котором дополнительно есть генератор типов.

Выполните следующую команду, чтобы сгенерировать актуальные типы для API:

```bash
npm run generate-api-types
```

В результате будет создан файл `shared/api/v1.d.ts`. Мы воспользуемся этим файлом в `shared/api/client.ts` для создания типизированного клиента API:

```tsx title="shared/api/client.ts"
import createClient from "openapi-fetch";

import { backendBaseUrl } from "shared/config";
import type { paths } from "./v1";

export const { GET, POST, PUT, DELETE } = createClient<paths>({ baseUrl: backendBaseUrl });
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";
```

### Реальные данные в ленте

Теперь мы можем перейти к получению статей из бэкенда и добавлению их в ленту. Начнем с реализации компонента предпросмотра статьи.

Создайте `pages/feed/ui/ArticlePreview.tsx` со следующим содержимым:

```tsx title="pages/feed/ui/ArticlePreview.tsx"
export function ArticlePreview({ article }) { /* TODO */ }
```

Поскольку мы пишем на TypeScript, было бы неплохо иметь типизированный объект статьи Article. Если мы изучим сгенерированный `v1.d.ts`, то увидим, что объект Article доступен через `components["schemas"]["Article"]`. Поэтому давайте создадим файл с нашими моделями данных в Shared и экспортируем модели:

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";
```

Теперь мы можем вернуться к компоненту предпросмотра статьи и заполнить разметку данными. Обновите компонент, добавив в него следующее содержимое:

```tsx title="pages/feed/ui/ArticlePreview.tsx"
import { Link } from "@remix-run/react";
import type { Article } from "shared/api";

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`} prefetch="intent">
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <Link
            to={`/profile/${article.author.username}`}
            className="author"
            prefetch="intent"
          >
            {article.author.username}
          </Link>
          <span className="date" suppressHydrationWarning>
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link
        to={`/article/${article.slug}`}
        className="preview-link"
        prefetch="intent"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
```

Кнопка "Мне нравится" пока ничего не делает, мы исправим это, когда перейдем на страницу чтения статей и реализуем функцию "Мне нравится".

Теперь мы можем получить статьи и отобразить кучу этих карточек предпросмотра. Получение данных в Remix осуществляется с помощью *загрузчиков* — серверных функций, которые собирают те данные, которые нужны странице. Загрузчики взаимодействуют с API от имени страницы, поэтому мы поместим их в сегмент `api` страницы:

```tsx title="pages/feed/api/loader.ts"
import { json } from "@remix-run/node";

import { GET } from "shared/api";

export const loader = async () => {
  const { data: articles, error, response } = await GET("/articles");

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return json({ articles });
};
```

Чтобы подключить его к странице, нам нужно экспортировать его с именем `loader`  из файла маршрута:

```tsx title="pages/feed/index.ts"
export { FeedPage } from "./ui/FeedPage";
export { loader } from "./api/loader";
```

```tsx title="app/routes/_index.tsx"
import type { MetaFunction } from "@remix-run/node";
import { FeedPage } from "pages/feed";

export { loader } from "pages/feed";

export const meta: MetaFunction = () => {
  return [{ title: "Conduit" }];
};

export default FeedPage;
```

И последний шаг — отображение этих карточек в ленте. Обновите `FeedPage` следующим кодом:

```tsx title="pages/feed/ui/FeedPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Фильтрация по тегам

Что касается тегов, то наша задача — получить их из бэкенда и запомнить выбранный пользователем тег. Мы уже знаем, как загружать из бэкенда — это еще один запрос от функции-загрузчика. Мы будем использовать удобную функцию `promiseHash` из пакета `remix-utils`, который уже установлен.

Обновите файл загрузчика, `pages/feed/api/loader.ts`, следующим кодом:

```tsx title="pages/feed/api/loader.ts"
import { json } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async () => {
  return json(
    await promiseHash({
      articles: throwAnyErrors(GET("/articles")),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

Вы можете заметить, что мы вынесли обработку ошибок в общую функцию `throwAnyErrors`. Она выглядит довольно полезной, так что, возможно, мы захотим переиспользовать её позже, а пока давайте просто заметим этот факт.

Теперь перейдем к списку тегов. Он должен быть интерактивным - щелчок по тегу должен выбрать этот тег. По традиции Remix, мы будем использовать параметры запроса в URL в качестве хранилища для выбранного тега. Пусть браузер позаботится о хранилище, а мы сосредоточимся на более важных вещах.

Обновите `pages/feed/ui/FeedPage.tsx` следующим кодом:

```tsx title="pages/feed/ui/FeedPage.tsx"
import { Form, useLoaderData } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const { articles, tags } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Form>
                <ExistingSearchParams exclude={["tag"]} />
                <div className="tag-list">
                  {tags.tags.map((tag) => (
                    <button
                      key={tag}
                      name="tag"
                      value={tag}
                      className="tag-pill tag-default"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
```

Затем нам нужно использовать параметр поиска тегов в нашем загрузчике. Измените функцию `loader` в `pages/feed/api/loader.ts` на следующую:

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", { params: { query: { tag: selectedTag } } }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

И всё, сегмент `model` нам не понадобился. Remix — клёвая штука.

### Пагинация

Аналогичным образом мы можем реализовать пагинацию. Не стесняйтесь попробовать реализовать её сами или же просто скопируйте код ниже. В любом случае, осуждать вас некому.

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

/** Amount of articles on one page. */
export const LIMIT = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "", 10);

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", {
          params: {
            query: {
              tag: selectedTag,
              limit: LIMIT,
              offset: !Number.isNaN(page) ? page * LIMIT : undefined,
            },
          },
        }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

```tsx title="pages/feed/ui/FeedPage.tsx"
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import { LIMIT, type loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";

export function FeedPage() {
  const [searchParams] = useSearchParams();
  const { articles, tags } = useLoaderData<typeof loader>();
  const pageAmount = Math.ceil(articles.articlesCount / LIMIT);
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}

            <Form>
              <ExistingSearchParams exclude={["page"]} />
              <ul className="pagination">
                {Array(pageAmount)
                  .fill(null)
                  .map((_, index) =>
                    index + 1 === currentPage ? (
                      <li key={index} className="page-item active">
                        <span className="page-link">{index + 1}</span>
                      </li>
                    ) : (
                      <li key={index} className="page-item">
                        <button
                          className="page-link"
                          name="page"
                          value={index + 1}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ),
                  )}
              </ul>
            </Form>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Form>
                <ExistingSearchParams exclude={["tag", "page"]} />
                <div className="tag-list">
                  {tags.tags.map((tag) => (
                    <button
                      key={tag}
                      name="tag"
                      value={tag}
                      className="tag-pill tag-default"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Ну вот, это тоже сделали. Есть еще список вкладок, который можно реализовать аналогичным образом, но давайте повременим с этим, пока не реализуем аутентификацию. Кстати, о ней!

### Аутентификация \{#authentication}

Аутентификация включает в себя две страницы — одну для входа в систему и другую для регистрации. Они, в основном, очень схожие, поэтому имеет смысл держать их в одном слайсе, `sign-in`, чтобы при необходимости можно было переиспользовать код.

Создайте `RegisterPage.tsx` в сегменте `ui` в `pages/sign-in` со следующим содержимым:

```tsx title="pages/sign-in/ui/RegisterPage.tsx"
import { Form, Link, useActionData } from "@remix-run/react";

import type { register } from "../api/register";

export function RegisterPage() {
  const registerData = useActionData<typeof register>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            {registerData?.error && (
              <ul className="error-messages">
                {registerData.error.errors.body.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Сейчас нам нужно исправить сломанный импорт. Он обращается к новому сегменту, поэтому создайте его:

```bash
npx fsd pages sign-in -s api
```

Однако прежде чем мы сможем реализовать бэкенд-часть регистрации, нам нужен некоторый инфраструктурный код для Remix для обработки сессий. Отправим его в Shared, на случай, если он понадобится какой-либо другой странице.

Поместите следующий код в `shared/api/auth.server.ts`. Этот код очень специфичен для Remix, так что не беспокойтесь, если там не все понятно, просто скопируйте и вставьте:

```tsx title="shared/api/auth.server.ts"
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { User } from "./models";

invariant(
  process.env.SESSION_SECRET,
  "SESSION_SECRET must be set for authentication to work",
);

const sessionStorage = createCookieSessionStorage<{
  user: User;
}>({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createUserSession({
  request,
  user,
  redirectTo,
}: {
  request: Request;
  user: User;
  redirectTo: string;
}) {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  session.set("user", user);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }),
    },
  });
}

export async function getUserFromSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  return session.get("user") ?? null;
}

export async function requireUser(request: Request) {
  const user = await getUserFromSession(request);

  if (user === null) {
    throw redirect("/login");
  }

  return user;
}
```

А также экспортируйте модель `User` из файла `models.ts`, расположенного рядом с ним:

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
export type User = components["schemas"]["User"];
```

Прежде чем этот код заработает, необходимо установить переменную окружения `SESSION_SECRET`. Создайте файл `.env` в корне проекта, пропишите в нем `SESSION_SECRET=`, а затем пробегитесь по клавиатуре, чтобы создать длинную случайную строку. У вас должно получиться что-то вроде этого:

```bash title=".env"
SESSION_SECRET=несмейтеэтокопировать
```

Наконец, добавьте несколько экспортов в публичный API, чтобы использовать этот код:

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
```

Теперь мы можем написать код, который будет общаться с бэкендом RealWorld для регистрации. Мы сохраним его в `pages/sign-in/api`. Создайте файл `register.ts` и поместите в него следующий код:

```tsx title="pages/sign-in/api/register.ts"
import { json, type ActionFunctionArgs } from "@remix-run/node";

import { POST, createUserSession } from "shared/api";

export const register = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const { data, error } = await POST("/users", {
    body: { user: { email, password, username } },
  });

  if (error) {
    return json({ error }, { status: 400 });
  } else {
    return createUserSession({
      request: request,
      user: data.user,
      redirectTo: "/",
    });
  }
};
```

```tsx title="pages/sign-in/index.ts"
export { RegisterPage } from './ui/RegisterPage';
export { register } from './api/register';
```

Почти готово! Осталось подключить страницу и действие регистрации к маршруту `/register`. Создайте `register.tsx` в `app/routes`:

```tsx title="app/routes/register.tsx"
import { RegisterPage, register } from "pages/sign-in";

export { register as action };

export default RegisterPage;
```

Теперь, если вы перейдете на `http://localhost:3000/register` вы сможете создать пользователя! Остальная часть приложения пока что на это не отреагирует, мы займемся этим в ближайшее время.

Аналогичным образом мы можем реализовать страницу входа в систему. Попробуйте сами или просто возьмите код и двигайтесь дальше:

```tsx title="pages/sign-in/api/sign-in.ts"
import { json, type ActionFunctionArgs } from "@remix-run/node";

import { POST, createUserSession } from "shared/api";

export const signIn = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const { data, error } = await POST("/users/login", {
    body: { user: { email, password } },
  });

  if (error) {
    return json({ error }, { status: 400 });
  } else {
    return createUserSession({
      request: request,
      user: data.user,
      redirectTo: "/",
    });
  }
};
```

```tsx title="pages/sign-in/ui/SignInPage.tsx"
import { Form, Link, useActionData } from "@remix-run/react";

import type { signIn } from "../api/sign-in";

export function SignInPage() {
  const signInData = useActionData<typeof signIn>();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            {signInData?.error && (
              <ul className="error-messages">
                {signInData.error.errors.body.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

```tsx title="pages/sign-in/index.ts"
export { RegisterPage } from './ui/RegisterPage';
export { register } from './api/register';
export { SignInPage } from './ui/SignInPage';
export { signIn } from './api/sign-in';
```

```tsx title="app/routes/login.tsx"
import { SignInPage, signIn } from "pages/sign-in";

export { signIn as action };

export default SignInPage;
```

Теперь давайте дадим пользователям возможность попасть на эти страницы.

### Хэдер

Как мы уже говорили в первой части, хэдер приложения обычно размещается либо в Widgets, либо в Shared. Мы поместим его в Shared, потому что он очень прост, и вся бизнес-логика может быть сохранена за его пределами. Давайте создадим для него место:

```bash
npx fsd shared ui
```

Теперь создайте `shared/ui/Header.tsx` со следующим содержимым:

```tsx title="shared/ui/Header.tsx"
import { useContext } from "react";
import { Link, useLocation } from "@remix-run/react";

import { CurrentUser } from "../api/currentUser";

export function Header() {
  const currentUser = useContext(CurrentUser);
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/" prefetch="intent">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link
              prefetch="intent"
              className={`nav-link ${pathname == "/" ? "active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>
          {currentUser == null ? (
            <>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/login" ? "active" : ""}`}
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/register" ? "active" : ""}`}
                  to="/register"
                >
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/editor" ? "active" : ""}`}
                  to="/editor"
                >
                  <i className="ion-compose"></i>&nbsp;New Article{" "}
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname == "/settings" ? "active" : ""}`}
                  to="/settings"
                >
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  prefetch="intent"
                  className={`nav-link ${pathname.includes("/profile") ? "active" : ""}`}
                  to={`/profile/${currentUser.username}`}
                >
                  {currentUser.image && (
                    <img
                      width={25}
                      height={25}
                      src={currentUser.image}
                      className="user-pic"
                      alt=""
                    />
                  )}
                  {currentUser.username}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
```

Экспортируйте этот компонент из `shared/ui`:

```tsx title="shared/ui/index.ts"
export { Header } from "./Header";
```

В хэдере мы полагаемся на контекст, расположенный в `shared/api`. Создайте ещё его:

```tsx title="shared/api/currentUser.ts"
import { createContext } from "react";

import type { User } from "./models";

export const CurrentUser = createContext<User | null>(null);
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
export { CurrentUser } from "./currentUser";
```

Теперь давайте добавим хэдер на страницу. Мы хотим, чтобы он был на каждой странице, поэтому имеет смысл просто добавить его в корневой маршрут и обернуть аутлет (место, в которое будет отрендерена страница) провайдером контекста `CurrentUser`. Таким образом, все наше приложение, включая хэдер, получит доступ к объекту текущего пользователя. Мы также добавим загрузчик для получения объекта текущего пользователя из cookies. Добавьте следующее в `app/root.tsx`:

```tsx title="app/root.tsx"
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { Header } from "shared/ui";
import { getUserFromSession, CurrentUser } from "shared/api";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = ({ request }: LoaderFunctionArgs) =>
  getUserFromSession(request);

export default function App() {
  const user = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        <style>{`
          button {
            border: 0;
          }
        `}</style>
      </head>
      <body>
        <CurrentUser.Provider value={user}>
          <Header />
          <Outlet />
        </CurrentUser.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

В итоге на главной странице должно получиться следующее:

<figure>
  ![Страница фида Conduit, на которой есть хэдер, фид и теги. Вкладки по-прежнему отсутствуют.](../../../../../../static/img/tutorial/realworld-feed-without-tabs.jpg)
  
  <figcaption>Страница фида Conduit, на которой есть хэдер, фид и теги. Вкладки по-прежнему отсутствуют.</figcaption>
</figure>

### Вкладки

Теперь, когда мы можем определить состояние аутентификации, давайте также быстренько реализуем вкладки и лайки, чтоб закончить со страницей ленты. Нам нужна еще одна форма, но этот файл страницы становится слишком большим, поэтому давайте перенесем эти формы в соседние файлы. Мы создадим `Tabs.tsx`, `PopularTags.tsx` и `Pagination.tsx` со следующим содержимым:

```tsx title="pages/feed/ui/Tabs.tsx"
import { useContext } from "react";
import { Form, useSearchParams } from "@remix-run/react";

import { CurrentUser } from "shared/api";

export function Tabs() {
  const [searchParams] = useSearchParams();
  const currentUser = useContext(CurrentUser);

  return (
    <Form>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {currentUser !== null && (
            <li className="nav-item">
              <button
                name="source"
                value="my-feed"
                className={`nav-link ${searchParams.get("source") === "my-feed" ? "active" : ""}`}
              >
                Your Feed
              </button>
            </li>
          )}
          <li className="nav-item">
            <button
              className={`nav-link ${searchParams.has("tag") || searchParams.has("source") ? "" : "active"}`}
            >
              Global Feed
            </button>
          </li>
          {searchParams.has("tag") && (
            <li className="nav-item">
              <span className="nav-link active">
                <i className="ion-pound"></i> {searchParams.get("tag")}
              </span>
            </li>
          )}
        </ul>
      </div>
    </Form>
  );
}
```

```tsx title="pages/feed/ui/PopularTags.tsx"
import { Form, useLoaderData } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import type { loader } from "../api/loader";

export function PopularTags() {
  const { tags } = useLoaderData<typeof loader>();

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <Form>
        <ExistingSearchParams exclude={["tag", "page", "source"]} />
        <div className="tag-list">
          {tags.tags.map((tag) => (
            <button
              key={tag}
              name="tag"
              value={tag}
              className="tag-pill tag-default"
            >
              {tag}
            </button>
          ))}
        </div>
      </Form>
    </div>
  );
}
```

```tsx title="pages/feed/ui/Pagination.tsx"
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { ExistingSearchParams } from "remix-utils/existing-search-params";

import { LIMIT, type loader } from "../api/loader";

export function Pagination() {
  const [searchParams] = useSearchParams();
  const { articles } = useLoaderData<typeof loader>();
  const pageAmount = Math.ceil(articles.articlesCount / LIMIT);
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  return (
    <Form>
      <ExistingSearchParams exclude={["page"]} />
      <ul className="pagination">
        {Array(pageAmount)
          .fill(null)
          .map((_, index) =>
            index + 1 === currentPage ? (
              <li key={index} className="page-item active">
                <span className="page-link">{index + 1}</span>
              </li>
            ) : (
              <li key={index} className="page-item">
                <button className="page-link" name="page" value={index + 1}>
                  {index + 1}
                </button>
              </li>
            ),
          )}
      </ul>
    </Form>
  );
}
```

И теперь мы можем значительно упростить саму страницу с фидом:

```tsx title="pages/feed/ui/FeedPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticlePreview } from "./ArticlePreview";
import { Tabs } from "./Tabs";
import { PopularTags } from "./PopularTags";
import { Pagination } from "./Pagination";

export function FeedPage() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Tabs />

            {articles.articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))}

            <Pagination />
          </div>

          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
}
```

Нам также нужно учесть новую вкладку в функции-загрузчике:

```tsx title="pages/feed/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, requireUser } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  /* unchanged */
}

/** Amount of articles on one page. */
export const LIMIT = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") ?? undefined;
  const page = parseInt(url.searchParams.get("page") ?? "", 10);

  if (url.searchParams.get("source") === "my-feed") {
    const userSession = await requireUser(request);

    return json(
      await promiseHash({
        articles: throwAnyErrors(
          GET("/articles/feed", {
            params: {
              query: {
                limit: LIMIT,
                offset: !Number.isNaN(page) ? page * LIMIT : undefined,
              },
            },
            headers: { Authorization: `Token ${userSession.token}` },
          }),
        ),
        tags: throwAnyErrors(GET("/tags")),
      }),
    );
  }

  return json(
    await promiseHash({
      articles: throwAnyErrors(
        GET("/articles", {
          params: {
            query: {
              tag: selectedTag,
              limit: LIMIT,
              offset: !Number.isNaN(page) ? page * LIMIT : undefined,
            },
          },
        }),
      ),
      tags: throwAnyErrors(GET("/tags")),
    }),
  );
};
```

Прежде чем мы отложим страницу ленты, давайте добавим код, который будет обрабатывать лайки к постам. Измените ваш `ArticlePreview.tsx` на следующий:

```tsx title="pages/feed/ui/ArticlePreview.tsx"
import { Form, Link } from "@remix-run/react";
import type { Article } from "shared/api";

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`} prefetch="intent">
          <img src={article.author.image} alt="" />
        </Link>
        <div className="info">
          <Link
            to={`/profile/${article.author.username}`}
            className="author"
            prefetch="intent"
          >
            {article.author.username}
          </Link>
          <span className="date" suppressHydrationWarning>
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
        </div>
        <Form
          method="post"
          action={`/article/${article.slug}`}
          preventScrollReset
        >
          <button
            name="_action"
            value={article.favorited ? "unfavorite" : "favorite"}
            className={`btn ${article.favorited ? "btn-primary" : "btn-outline-primary"} btn-sm pull-xs-right`}
          >
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </Form>
      </div>
      <Link
        to={`/article/${article.slug}`}
        className="preview-link"
        prefetch="intent"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
```

Этот код отправит POST-запрос на `/article/:slug` с `_action=favorite`, чтобы отметить статью как любимую. Пока это не работает, но как только мы начнем работать над читалкой статей, мы реализуем и это.

И на этом мы официально закончили работу над фидом! Ура!

### Читалка статей

Во-первых, нам нужны данные. Давайте создадим загрузчик:

```bash
npx fsd pages article-read -s api
```

```tsx title="pages/article-read/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { FetchResponse } from "openapi-fetch";
import { promiseHash } from "remix-utils/promise";

import { GET, getUserFromSession } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.slug, "Expected a slug parameter");
  const currentUser = await getUserFromSession(request);
  const authorization = currentUser
    ? { Authorization: `Token ${currentUser.token}` }
    : undefined;

  return json(
    await promiseHash({
      article: throwAnyErrors(
        GET("/articles/{slug}", {
          params: {
            path: { slug: params.slug },
          },
          headers: authorization,
        }),
      ),
      comments: throwAnyErrors(
        GET("/articles/{slug}/comments", {
          params: {
            path: { slug: params.slug },
          },
          headers: authorization,
        }),
      ),
    }),
  );
};
```

```tsx title="pages/article-read/index.ts"
export { loader } from "./api/loader";
```

Теперь мы можем подключить его к маршруту `/article/:slug`, создав файл маршрута `article.$slug.tsx`:

```tsx title="app/routes/article.$slug.tsx"
export { loader } from "pages/article-read";
```

Сама страница состоит из трех основных блоков — заголовка статьи с действиями (повторяется дважды), тела статьи и раздела комментариев. Это разметка страницы, она не особенно интересна:

```tsx title="pages/article-read/ui/ArticleReadPage.tsx"
import { useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { ArticleMeta } from "./ArticleMeta";
import { Comments } from "./Comments";

export function ArticleReadPage() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.article.title}</h1>

          <ArticleMeta />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.article.body}</p>
            <ul className="tag-list">
              {article.article.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta />
        </div>

        <div className="row">
          <Comments />
        </div>
      </div>
    </div>
  );
}
```

Более интересными являются `ArticleMeta` и `Comments`. Они содержат операции записи, такие как лайкнуть статью, оставить комментарий и т. д. Чтобы они заработали, нам сначала нужно реализовать бэкенд-часть. Создайте файл `action.ts` в сегменте `api` этой страницы:

```tsx title="pages/article-read/api/action.ts"
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { namedAction } from "remix-utils/named-action";
import { redirectBack } from "remix-utils/redirect-back";
import invariant from "tiny-invariant";

import { DELETE, POST, requireUser } from "shared/api";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const currentUser = await requireUser(request);

  const authorization = { Authorization: `Token ${currentUser.token}` };

  const formData = await request.formData();

  return namedAction(formData, {
    async delete() {
      invariant(params.slug, "Expected a slug parameter");
      await DELETE("/articles/{slug}", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirect("/");
    },
    async favorite() {
      invariant(params.slug, "Expected a slug parameter");
      await POST("/articles/{slug}/favorite", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async unfavorite() {
      invariant(params.slug, "Expected a slug parameter");
      await DELETE("/articles/{slug}/favorite", {
        params: { path: { slug: params.slug } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async createComment() {
      invariant(params.slug, "Expected a slug parameter");
      const comment = formData.get("comment");
      invariant(typeof comment === "string", "Expected a comment parameter");
      await POST("/articles/{slug}/comments", {
        params: { path: { slug: params.slug } },
        headers: { ...authorization, "Content-Type": "application/json" },
        body: { comment: { body: comment } },
      });
      return redirectBack(request, { fallback: "/" });
    },
    async deleteComment() {
      invariant(params.slug, "Expected a slug parameter");
      const commentId = formData.get("id");
      invariant(typeof commentId === "string", "Expected an id parameter");
      const commentIdNumeric = parseInt(commentId, 10);
      invariant(
        !Number.isNaN(commentIdNumeric),
        "Expected a numeric id parameter",
      );
      await DELETE("/articles/{slug}/comments/{id}", {
        params: { path: { slug: params.slug, id: commentIdNumeric } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async followAuthor() {
      const authorUsername = formData.get("username");
      invariant(
        typeof authorUsername === "string",
        "Expected a username parameter",
      );
      await POST("/profiles/{username}/follow", {
        params: { path: { username: authorUsername } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
    async unfollowAuthor() {
      const authorUsername = formData.get("username");
      invariant(
        typeof authorUsername === "string",
        "Expected a username parameter",
      );
      await DELETE("/profiles/{username}/follow", {
        params: { path: { username: authorUsername } },
        headers: authorization,
      });
      return redirectBack(request, { fallback: "/" });
    },
  });
};
```

Реэкспортируйте её из слайса, а затем из маршрута. Пока мы здесь, давайте также подключим саму страницу:

```tsx title="pages/article-read/index.ts"
export { ArticleReadPage } from "./ui/ArticleReadPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

```tsx title="app/routes/article.$slug.tsx"
import { ArticleReadPage } from "pages/article-read";

export { loader, action } from "pages/article-read";

export default ArticleReadPage;
```

Теперь, несмотря на то, что мы еще не реализовали кнопку лайка в читалке, кнопка лайка в ленте начнет работать! Это потому, что она тоже отправляет запросы на этот маршрут. Попробуйте лайкнуть что-нибудь.

`ArticleMeta` и `Comments` — это, опять же, просто формы. Мы уже делали это раньше, давайте возьмем их код и пойдем дальше:

```tsx title="pages/article-read/ui/ArticleMeta.tsx"
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useContext } from "react";

import { CurrentUser } from "shared/api";
import type { loader } from "../api/loader";

export function ArticleMeta() {
  const currentUser = useContext(CurrentUser);
  const { article } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <div className="article-meta">
        <Link
          prefetch="intent"
          to={`/profile/${article.article.author.username}`}
        >
          <img src={article.article.author.image} alt="" />
        </Link>

        <div className="info">
          <Link
            prefetch="intent"
            to={`/profile/${article.article.author.username}`}
            className="author"
          >
            {article.article.author.username}
          </Link>
          <span className="date">{article.article.createdAt}</span>
        </div>

        {article.article.author.username == currentUser?.username ? (
          <>
            <Link
              prefetch="intent"
              to={`/editor/${article.article.slug}`}
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="ion-edit"></i> Edit Article
            </Link>
            &nbsp;&nbsp;
            <button
              name="_action"
              value="delete"
              className="btn btn-sm btn-outline-danger"
            >
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </>
        ) : (
          <>
            <input
              name="username"
              value={article.article.author.username}
              type="hidden"
            />
            <button
              name="_action"
              value={
                article.article.author.following
                  ? "unfollowAuthor"
                  : "followAuthor"
              }
              className={`btn btn-sm ${article.article.author.following ? "btn-secondary" : "btn-outline-secondary"}`}
            >
              <i className="ion-plus-round"></i>
              &nbsp;{" "}
              {article.article.author.following
                ? "Unfollow"
                : "Follow"}{" "}
              {article.article.author.username}
            </button>
            &nbsp;&nbsp;
            <button
              name="_action"
              value={article.article.favorited ? "unfavorite" : "favorite"}
              className={`btn btn-sm ${article.article.favorited ? "btn-primary" : "btn-outline-primary"}`}
            >
              <i className="ion-heart"></i>
              &nbsp; {article.article.favorited
                ? "Unfavorite"
                : "Favorite"}{" "}
              Post{" "}
              <span className="counter">
                ({article.article.favoritesCount})
              </span>
            </button>
          </>
        )}
      </div>
    </Form>
  );
}
```

```tsx title="pages/article-read/ui/Comments.tsx"
import { useContext } from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { CurrentUser } from "shared/api";
import type { loader } from "../api/loader";

export function Comments() {
  const { comments } = useLoaderData<typeof loader>();
  const currentUser = useContext(CurrentUser);

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {currentUser !== null ? (
        <Form
          preventScrollReset={true}
          method="post"
          className="card comment-form"
          key={Date()}
        >
          <div className="card-block">
            <textarea
              required
              className="form-control"
              name="comment"
              placeholder="Write a comment..."
              rows={3}
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              src={currentUser.image}
              className="comment-author-img"
              alt=""
            />
            <button
              className="btn btn-sm btn-primary"
              name="_action"
              value="createComment"
            >
              Post Comment
            </button>
          </div>
        </Form>
      ) : (
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <p>
              <Link to="/login">Sign in</Link>
              &nbsp; or &nbsp;
              <Link to="/register">Sign up</Link>
              &nbsp; to add comments on this article.
            </p>
          </div>
        </div>
      )}

      {comments.comments.map((comment) => (
        <div className="card" key={comment.id}>
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>

          <div className="card-footer">
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              <img
                src={comment.author.image}
                className="comment-author-img"
                alt=""
              />
            </Link>
            &nbsp;
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              {comment.author.username}
            </Link>
            <span className="date-posted">{comment.createdAt}</span>
            {comment.author.username === currentUser?.username && (
              <span className="mod-options">
                <Form method="post" preventScrollReset={true}>
                  <input type="hidden" name="id" value={comment.id} />
                  <button
                    name="_action"
                    value="deleteComment"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <i className="ion-trash-a"></i>
                  </button>
                </Form>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

А вместе с этим и наша читалка статей! Кнопки "Подписаться на автора", "Мне нравится" и "Оставить комментарий" теперь должны работать как положено.

<figure>
  ![Читалка статей с рабочими кнопками подписки и лайка](../../../../../../static/img/tutorial/realworld-article-reader.jpg)

  <figcaption>Читалка статей с рабочими кнопками подписки и лайка</figcaption>
</figure>

### Редактор статей

Это последняя страница, которую мы рассмотрим в этом руководстве, и самая интересная часть здесь — это то, как мы будем проверять данные формы.

Сама страница, `article-edit/ui/ArticleEditPage.tsx`, будет довольно простой, дополнительная логика будет скрыта в двух других компонентах:

```tsx title="pages/article-edit/ui/ArticleEditPage.tsx"
import { Form, useLoaderData } from "@remix-run/react";

import type { loader } from "../api/loader";
import { TagsInput } from "./TagsInput";
import { FormErrors } from "./FormErrors";

export function ArticleEditPage() {
  const article = useLoaderData<typeof loader>();

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormErrors />

            <Form method="post">
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="title"
                    placeholder="Article Title"
                    defaultValue={article.article?.title}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="What's this article about?"
                    defaultValue={article.article?.description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    name="body"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    defaultValue={article.article?.body}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <TagsInput
                    name="tags"
                    defaultValue={article.article?.tagList ?? []}
                  />
                </fieldset>

                <button className="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Эта страница получает текущую статью (если мы пишем статью не с нуля) и заполняет соответствующие поля формы. Мы уже видели это. Интересной частью является `FormErrors`, потому что он будет получать результат проверки и отображать его пользователю. Давайте посмотрим:

```tsx title="pages/article-edit/ui/FormErrors.tsx"
import { useActionData } from "@remix-run/react";
import type { action } from "../api/action";

export function FormErrors() {
  const actionData = useActionData<typeof action>();

  return actionData?.errors != null ? (
    <ul className="error-messages">
      {actionData.errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  ) : null;
}
```

Здесь мы предполагаем, что наш экшн будет возвращать поле `errors`, массив понятных человеку сообщений об ошибках. К экшну мы перейдем чуть позже.

Еще один компонент — это поле ввода тегов. Это обычное поле ввода с дополнительным предпросмотром выбранных тегов. Здесь особо не на что смотреть:

```tsx title="pages/article-edit/ui/TagsInput.tsx"
import { useEffect, useRef, useState } from "react";

export function TagsInput({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: Array<string>;
}) {
  const [tagListState, setTagListState] = useState(defaultValue ?? []);

  function removeTag(tag: string): void {
    const newTagList = tagListState.filter((t) => t !== tag);
    setTagListState(newTagList);
  }

  const tagsInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    tagsInput.current && (tagsInput.current.value = tagListState.join(","));
  }, [tagListState]);

  return (
    <>
      <input
        type="text"
        className="form-control"
        id="tags"
        name={name}
        placeholder="Enter tags"
        defaultValue={tagListState.join(",")}
        onChange={(e) =>
          setTagListState(e.target.value.split(",").filter(Boolean))
        }
      />
      <div className="tag-list">
        {tagListState.map((tag) => (
          <span className="tag-default tag-pill" key={tag}>
            <i
              className="ion-close-round"
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                [" ", "Enter"].includes(e.key) && removeTag(tag)
              }
              onClick={() => removeTag(tag)}
            ></i>{" "}
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
```

Теперь перейдем к API-части. Загрузчик должен посмотреть на URL, и если в нем есть ссылка на статью, это означает, что мы редактируем существующую статью, и ее данные должны быть загружены. В противном случае ничего не возвращается. Давайте создадим этот загрузчик:

```tsx title="pages/article-edit/api/loader.ts"
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { FetchResponse } from "openapi-fetch";

import { GET, requireUser } from "shared/api";

async function throwAnyErrors<T, O, Media extends `${string}/${string}`>(
  responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const currentUser = await requireUser(request);

  if (!params.slug) {
    return { article: null };
  }

  return throwAnyErrors(
    GET("/articles/{slug}", {
      params: { path: { slug: params.slug } },
      headers: { Authorization: `Token ${currentUser.token}` },
    }),
  );
};
```

Экшн примет новые значения полей, прогонит их через нашу схему данных и, если все правильно, зафиксирует изменения в бэкенде, либо обновив существующую статью, либо создав новую:

```tsx title="pages/article-edit/api/action.ts"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";

import { POST, PUT, requireUser } from "shared/api";
import { parseAsArticle } from "../model/parseAsArticle";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const { body, description, title, tags } = parseAsArticle(
      await request.formData(),
    );
    const tagList = tags?.split(",") ?? [];

    const currentUser = await requireUser(request);
    const payload = {
      body: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      headers: { Authorization: `Token ${currentUser.token}` },
    };

    const { data, error } = await (params.slug
      ? PUT("/articles/{slug}", {
          params: { path: { slug: params.slug } },
          ...payload,
        })
      : POST("/articles", payload));

    if (error) {
      return json({ errors: error }, { status: 422 });
    }

    return redirect(`/article/${data.article.slug ?? ""}`);
  } catch (errors) {
    return json({ errors }, { status: 400 });
  }
};
```

Наша схема данных будет ещё и парсить `FormData`, что позволяет нам удобно получать чистые поля или просто бросать ошибки для обработки в конце. Вот как может выглядеть эта функция парсинга:

```tsx title="pages/article-edit/model/parseAsArticle.ts"
export function parseAsArticle(data: FormData) {
  const errors = [];

  const title = data.get("title");
  if (typeof title !== "string" || title === "") {
    errors.push("Give this article a title");
  }

  const description = data.get("description");
  if (typeof description !== "string" || description === "") {
    errors.push("Describe what this article is about");
  }

  const body = data.get("body");
  if (typeof body !== "string" || body === "") {
    errors.push("Write the article itself");
  }

  const tags = data.get("tags");
  if (typeof tags !== "string") {
    errors.push("The tags must be a string");
  }

  if (errors.length > 0) {
    throw errors;
  }

  return { title, description, body, tags: data.get("tags") ?? "" } as {
    title: string;
    description: string;
    body: string;
    tags: string;
  };
}
```

Возможно, она покажется немного длинной и повторяющейся, но такова цена, которую мы платим за читаемые сообщения об ошибках. Это может быть и схема Zod, например, но тогда нам придется выводить сообщения об ошибках на фронтенде, а эта форма не стоит таких сложностей.

Последний шаг — подключение страницы, загрузчика и действия к маршрутам. Поскольку мы аккуратно поддерживаем и создание, и редактирование, мы можем экспортировать одно и то же действие как из `editor._index.tsx`, так и из `editor.$slug.tsx`:

```tsx title="pages/article-edit/index.ts"
export { ArticleEditPage } from "./ui/ArticleEditPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

```tsx title="app/routes/editor._index.tsx, app/routes/editor.$slug.tsx (одинаковое содержимое)"
import { ArticleEditPage } from "pages/article-edit";

export { loader, action } from "pages/article-edit";

export default ArticleEditPage;
```

Мы закончили! Войдите в систему и попробуйте создать новую статью. Или “забудьте” написать статью и посмотрите, как сработает валидация.

<figure>
  ![Редактор статей Conduit, в поле заголовка которого написано “New article”, а остальные поля пусты. Над формой есть две ошибки: “**Describe what this article is about**” и “**Write the article itself**”.](../../../../../../static/img/tutorial/realworld-article-editor.jpg)
  
  <figcaption>Редактор статей Conduit, в поле заголовка которого написано “New article”, а остальные поля пусты. Над формой есть две ошибки: **“Describe what this article is about”** и **“Write the article itself**”.</figcaption>
</figure>

Страницы профиля и настроек очень похожи на страницы чтения и редактирования статей, они оставлены в качестве упражнения для читателя, то есть для вас :)
