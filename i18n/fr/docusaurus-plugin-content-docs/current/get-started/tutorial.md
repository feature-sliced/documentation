---
sidebar_position: 2
---
# Tutoriel

## Partie 1. Sur le papier

Ce tutoriel va examiner l'application Real World App, également connue sous le nom de Conduit. Conduit est un clone simple de [Medium](https://medium.com/) — il vous permet de lire et d'écrire des articles ainsi que de commenter les articles des autres.

![Page d'accueil de Conduit](/img/tutorial/realworld-feed-anonymous.jpg)

Il s'agit d'une application assez petite, donc nous allons la garder simple et éviter une décomposition excessive. Il est très probable que l'ensemble de l'application tienne dans seulement trois couches : **App**, **Pages**, et **Shared**. Si ce n'est pas le cas, nous introduirons des couches supplémentaires au fur et à mesure. Prêt ?

### Commencez par lister les pages

Si nous regardons la capture d'écran ci-dessus, nous pouvons supposer au moins les pages suivantes :

- Accueil (fil d'articles)
- Connexion et inscription
- Lecteur d'articles
- Éditeur d'articles
- Vue du profil utilisateur
- Éditeur du profil utilisateur (paramètres de l'utilisateur)


Chacune de ces pages deviendra son propre *slice* dans la *couche* Pages. Rappelez-vous de l'aperçu, les slices sont simplement des dossiers à l'intérieur des couches, et les couches sont simplement des dossiers avec des noms prédéfinis comme `pages`.

Ainsi, notre dossier Pages ressemblera à ceci :


```
📂 pages/
  📁 feed/
  📁 sign-in/
  📁 article-read/
  📁 article-edit/
  📁 profile/
  📁 settings/
```

La différence clé entre le Feature-Sliced Design et une structure de code non régulée est que les pages ne peuvent pas se référencer entre elles. Autrement dit, une page ne peut pas importer du code d'une autre page. Cela est dû à la règle d'importation sur les couches :

Un module dans une slice ne peut importer d'autres slices que lorsqu'elles se trouvent sur des couches strictement inférieures.

Dans ce cas, une page est une slice, donc les modules (fichiers) à l'intérieur de cette page ne peuvent se référer qu'au code des couches inférieures, et non de la même couche, Pages.

### Vue détaillée du flux

<figure>
  ![Vue de l'utilisateur anonyme](/img/tutorial/realworld-feed-anonymous.jpg)
  <figcaption>
    _Vue de l'utilisateur anonyme_
  </figcaption>
</figure>

<figure>
  ![Vue de l'utilisateur authentifié](/img/tutorial/realworld-feed-authenticated.jpg)
  <figcaption>
    _Vue de l'utilisateur authentifié_
  </figcaption>
</figure>


Il y a trois zones dynamiques sur la page de flux :

1. Les liens de connexion avec une indication si l'utilisateur est connecté
2. La liste des tags qui déclenche le filtrage dans le flux
3. Un/deux flux d'articles, chaque article avec un bouton "J'aime"

Les liens de connexion font partie d'un en-tête qui est commun à toutes les pages, nous reviendrons dessus séparément.

#### Liste des tags

Pour construire la liste des tags, nous devons récupérer les tags disponibles, rendre chaque tag sous forme de puce, et stocker les tags sélectionnés dans un stockage côté client. Ces opérations appartiennent aux catégories "Interaction avec l'API", "Interface utilisateur" et "Stockage", respectivement. Dans le cadre de Feature-Sliced Design, le code est séparé par objectif à l'aide des *segments*. Les segments sont des dossiers dans les slices, et ils peuvent avoir des noms arbitraires décrivant leur objectif, mais certains objectifs sont tellement courants qu'il existe une convention pour certains noms de segments :

- 📂 `api/` pour les interactions avec le backend
- 📂 `ui/` pour le code qui gère l'affichage et l'apparence
- 📂 `model/` pour le stockage et la logique métier
- 📂 `config/` pour les indicateurs de fonctionnalité, les variables d'environnement et autres formes de configuration

Nous allons placer le code qui récupère les tags dans `api`, le composant de tag dans `ui`, et l'interaction avec le stockage dans `model`.


#### Articles

En utilisant les mêmes principes de regroupement, nous pouvons décomposer le flux d'articles en trois segments identiques :

- 📂 `api/` : récupérer les articles paginés avec le nombre de "J'aime" ; aimer un article
- 📂 `ui/` :
    - liste d'onglets qui peut afficher un onglet supplémentaire si un tag est sélectionné
    - article individuel
    - pagination fonctionnelle
- 📂 `model/` : stockage côté client des articles actuellement chargés et de la page en cours (si nécessaire)

### Réutilisation du code générique

La plupart des pages ont des objectifs très différents, mais certaines choses restent les mêmes dans toute l'application — par exemple, l'UI kit qui respecte le langage de design, ou la convention côté backend que tout est fait avec une API REST utilisant la même méthode d'authentification. Puisque les slices sont censées être isolées, la réutilisation du code est facilitée par une couche inférieure, **Shared**.

Shared diffère des autres couches dans le sens où elle contient des segments, et non des slices. De cette façon, la couche Shared peut être considérée comme un hybride entre une couche et une slice.

En général, le code dans Shared n'est pas planifié à l'avance, mais plutôt extrait au fur et à mesure du développement, car c'est seulement en cours de développement qu'il devient clair quelles parties du code sont réellement partagées. Cependant, il est toujours utile de garder à l'esprit quel type de code appartient naturellement à Shared :

- 📂 `ui/` — l'UI kit, pure apparence, pas de logique métier. Par exemple, les boutons, les boîtes de dialogue modales, les champs de formulaire.
- 📂 `api/` — des wrappers pratiques autour des primitives de requêtes (comme `fetch()` sur le Web) et, éventuellement, des fonctions pour déclencher des requêtes particulières selon la spécification du backend.
- 📂 `config/` — parsing des variables d'environnement
- 📂 `i18n/` — configuration du support des langues
- 📂 `router/` — primitives de routage et constantes de route

Ce ne sont que quelques exemples de noms de segments dans Shared, mais vous pouvez en omettre certains ou créer les vôtres. La seule chose importante à retenir lorsque vous créez de nouveaux segments, c'est que les noms de segments doivent décrire **l'objectif (le pourquoi), pas l'essence (le quoi)**. Des noms comme « composants », « hooks », « modals » *ne doivent pas* être utilisés, car ils décrivent ce que ces fichiers sont, mais ne facilitent pas la navigation dans le code. Cela oblige les membres de l'équipe à fouiller dans chaque fichier de ces dossiers et garde également le code non lié à proximité, ce qui entraîne des zones larges de code affectées par le refactoring et rend ainsi la revue de code et les tests plus difficiles.

### Définir une API publique stricte

Dans le cadre de Feature-Sliced Design, le terme *API publique* fait référence à une slice ou un segment déclarant ce qui peut être importé par d'autres modules dans le projet. Par exemple, en JavaScript, cela peut être un fichier `index.js` réexportant des objets provenant d'autres fichiers dans la slice. Cela permet de refactoriser librement le code à l'intérieur d'une slice tant que le contrat avec l'extérieur (c'est-à-dire l'API publique) reste le même.

Pour la couche Shared qui n'a pas de slices, il est généralement plus pratique de définir une API publique séparée pour chaque segment plutôt que de définir un seul index pour tout Shared. Cela permet de garder les imports de Shared naturellement organisés par objectif. Pour les autres couches qui ont des slices, l'inverse est vrai — il est généralement plus pratique de définir un index par slice et de laisser la slice décider de son propre ensemble de segments qui est inconnu de l'extérieur, car les autres couches ont généralement beaucoup moins d'exports.

Nos slices/segments apparaîtront les uns aux autres comme suit :


```
📂 pages/
  📂 feed/
    📄 index
  📂 sign-in/
    📄 index
  📂 article-read/
    📄 index
  📁 …
📂 shared/
  📂 ui/
    📄 index
  📂 api/
    📄 index
  📁 …
```
Ce qui se trouve à l'intérieur des dossiers comme `pages/feed` ou `shared/ui` n'est connu que de ces dossiers, et les autres fichiers ne doivent pas dépendre de la structure interne de ces dossiers.

### Blocs réutilisés de grande taille dans l'UI

Plus tôt, nous avons mentionné de revenir sur l'en-tête qui apparaît sur chaque page. Le reconstruire à partir de zéro sur chaque page serait peu pratique, donc il est tout à fait naturel de vouloir le réutiliser. Nous avons déjà Shared pour faciliter la réutilisation du code, cependant, il y a une mise en garde à propos de la mise en place de gros blocs d'UI dans Shared — la couche Shared ne doit pas connaître les couches situées au-dessus d'elle.

Entre Shared et Pages, il y a trois autres couches : Entities, Features, et Widgets. Certains projets peuvent avoir des éléments dans ces couches qu'ils doivent utiliser dans un grand bloc réutilisable, ce qui signifie que nous ne pouvons pas placer ce bloc réutilisable dans Shared, sinon il importerait des couches supérieures, ce qui est interdit. C'est là qu'intervient la couche Widgets. Elle est située au-dessus de Shared, Entities et Features, donc elle peut utiliser toutes ces couches.

Dans notre cas, l'en-tête est très simple — il s'agit d'un logo statique et d'une navigation de haut niveau. La navigation doit faire une requête à l'API pour déterminer si l'utilisateur est actuellement connecté ou non, mais cela peut être géré par un simple import du segment `api`. Par conséquent, nous conserverons notre en-tête dans Shared.

### Analyse d'une page avec un formulaire

Examinons également une page destinée à la modification, et non à la lecture. Par exemple, l'éditeur d'articles :

![Conduit post editor](/img/tutorial/realworld-editor-authenticated.jpg)

Cela semble trivial, mais comporte plusieurs aspects du développement d'application que nous n'avons pas encore explorés — validation des formulaires, états d'erreur, et persistance des données.

Si nous devions créer cette page, nous prendrions quelques champs de saisie et boutons depuis Shared et assemblerions un formulaire dans le segment `ui` de cette page. Ensuite, dans le segment `api`, nous définirions une requête de mutation pour créer l'article sur le backend.

Pour valider la requête avant de l'envoyer, nous aurions besoin d'un schéma de validation, et un bon endroit pour cela est le segment `model`, car il s'agit du modèle de données. Là, nous produirions des messages d'erreur et les afficherions en utilisant un autre composant dans le segment `ui`.

Pour améliorer l'expérience utilisateur, nous pourrions également persister les entrées pour éviter toute perte de données accidentelle. Cela relève également du segment `model`.

### Résumé

Nous avons examiné plusieurs pages et esquissé une structure préliminaire pour notre application :

1. Couche Shared
    1. `ui` contiendra notre kit UI réutilisable
    2. `api` contiendra nos interactions primitives avec le backend
    3. Le reste sera organisé au besoin
2. Couche Pages — chaque page est une slice distincte
    1. `ui` contiendra la page elle-même et toutes ses parties
    2. `api` contiendra des récupérations de données plus spécialisées, utilisant `shared/api`
    3. `model` pourrait contenir le stockage côté client des données que nous afficherons

Passons à la construction !

## Partie 2. En code

Maintenant que nous avons un plan, mettons-le en pratique. Nous utiliserons React et [Remix](https://remix.run).

Un modèle est prêt pour ce projet, clonez-le depuis GitHub pour démarrer rapidement : [https://github.com/feature-sliced/tutorial-conduit/tree/clean](https://github.com/feature-sliced/tutorial-conduit/tree/clean).

Installez les dépendances avec `npm install` et lancez le serveur de développement avec `npm run dev`. Ouvrez [http://localhost:3000](http://localhost:3000) et vous devriez voir une application vide.

Run the following command to generate up-to-date API typings:

```bash
npm run generate-api-types
```

This will create a file `shared/api/v1.d.ts`. We will use this file to create a typed API client in `shared/api/client.ts`:

```tsx title="shared/api/client.ts"
import createClient from "openapi-fetch";

import { backendBaseUrl } from "shared/config";
import type { paths } from "./v1";

export const { GET, POST, PUT, DELETE } = createClient<paths>({ baseUrl: backendBaseUrl });
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";
```

### Real data in the feed

We can now proceed to adding articles to the feed, fetched from the backend. Let’s begin by implementing an article preview component.

Create `pages/feed/ui/ArticlePreview.tsx` with the following content:

```tsx title="pages/feed/ui/ArticlePreview.tsx"
export function ArticlePreview({ article }) { /* TODO */ }
```

Since we’re writing in TypeScript, it would be nice to have a typed article object. If we explore the generated `v1.d.ts`, we can see that the article object is available through `components["schemas"]["Article"]`. So let’s create a file with our data models in Shared and export the models:

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
```

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";
```

Now we can come back to the article preview component and fill the markup with data. Update the component with the following content:

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

The like button doesn’t do anything for now, we will fix that when we get to the article reader page and implement the liking functionality.

Now we can fetch the articles and render out a bunch of these cards. Fetching data in Remix is done with *loaders* — server-side functions that fetch exactly what a page needs. Loaders interact with the API on the page’s behalf, so we will put them in the `api` segment of a page:

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

To connect it to the page, we need to export it with the name `loader` from the route file:

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

And the final step is to render these cards in the feed. Update your `FeedPage` with the following code:

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

### Filtering by tag

Regarding the tags, our job is to fetch them from the backend and to store the currently selected tag. We already know how to do fetching — it’s another request from the loader. We will use a convenience function `promiseHash` from a package `remix-utils`, which is already installed.

Update the loader file, `pages/feed/api/loader.ts`, with the following code:

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

You might notice that we extracted the error handling into a generic function `throwAnyErrors`. It looks pretty useful, so we might want to reuse it later, but for now let’s just keep an eye on it.

Now, to the list of tags. It needs to be interactive — clicking on a tag should make that tag selected. By Remix convention, we will use the URL search parameters as our storage for the selected tag. Let the browser take care of storage while we focus on more important things.

Update `pages/feed/ui/FeedPage.tsx` with the following code:

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

Then we need to use the `tag` search parameter in our loader. Change the `loader` function in `pages/feed/api/loader.ts` to the following:

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

That’s it, no `model` segment necessary. Remix is pretty neat.

### Pagination

In a similar fashion, we can implement the pagination. Feel free to give it a shot yourself or just copy the code below. There’s no one to judge you anyway.

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

So that’s also done. There’s also the tab list that can be similarly implemented, but let’s hold on to that until we implement authentication. Speaking of which!

### Authentication

Authentication involves two pages — one to login and another to register. They are mostly the same, so it makes sense to keep them in the same slice, `sign-in`, so that they can reuse code if needed.

Create `RegisterPage.tsx` in the `ui` segment of `pages/sign-in` with the following content:

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

We have a broken import to fix now. It involves a new segment, so create that:

```bash
npx fsd pages sign-in -s api
```

However, before we can implement the backend part of registering, we need some infrastructure code for Remix to handle sessions. That goes to Shared, in case any other page needs it.

Put the following code in `shared/api/auth.server.ts`. This is highly Remix-specific, so don’t worry too much about it, just copy-paste:

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

And also export the `User` model from the `models.ts` file right next to it:

```tsx title="shared/api/models.ts"
import type { components } from "./v1";

export type Article = components["schemas"]["Article"];
export type User = components["schemas"]["User"];
```

Before this code can work, the `SESSION_SECRET` environment variable needs to be set. Create a file called `.env` in the root of the project, write `SESSION_SECRET=` and then mash some keys on your keyboard to create a long random string. You should get something like this:

```bash title=".env"
SESSION_SECRET=dontyoudarecopypastethis
```

Finally, add some exports to the public API to make use of this code:

```tsx title="shared/api/index.ts"
export { GET, POST, PUT, DELETE } from "./client";

export type { Article } from "./models";

export { createUserSession, getUserFromSession, requireUser } from "./auth.server";
```

Now we can write the code that will talk to the RealWorld backend to actually do the registration. We will keep that in `pages/sign-in/api`. Create a file called `register.ts` and put the following code inside:

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

Almost done! Just need to connect the page and action to the `/register` route. Create `register.tsx` in `app/routes`:

```tsx title="app/routes/register.tsx"
import { RegisterPage, register } from "pages/sign-in";

export { register as action };

export default RegisterPage;
```

Now if you go to [http://localhost:3000/register](http://localhost:3000/register), you should be able to create a user! The rest of the application won’t react to this yet, we’ll address that momentarily.

In a very similar way, we can implement the login page. Give it a try or just grab the code and move on:

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

Now let’s give the users a way to actually get to these pages.

### Header

As we discussed in part 1, the app header is commonly placed either in Widgets or in Shared. We will put it in Shared because it’s very simple and all the business logic can be kept outside of it. Let’s create a place for it:

```bash
npx fsd shared ui
```

Now create `shared/ui/Header.tsx`  with the following contents:

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

Export this component from `shared/ui`:

```tsx title="shared/ui/index.ts"
export { Header } from "./Header";
```

In the header, we rely on the context that’s kept in `shared/api`. Create that as well:

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

Now let’s add the header to the page. We want it to be on every single page, so it makes sense to simply add it to the root route and wrap the outlet (the place where the page will be rendered) with the `CurrentUser` context provider. This way our entire app and also the header has access to the current user object. We will also add a loader to actually obtain the current user object from cookies. Drop the following into `app/root.tsx`:

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

At this point, you should end up with the following on the home page:

<figure>
  ![The feed page of Conduit, including the header, the feed, and the tags. The tabs are still missing.](/img/tutorial/realworld-feed-without-tabs.jpg)

  <figcaption>The feed page of Conduit, including the header, the feed, and the tags. The tabs are still missing.</figcaption>
</figure>

### Tabs

Now that we can detect the authentication state, let’s also quickly implement the tabs and post likes to be done with the feed page. We need another form, but this page file is getting kind of large, so let’s move these forms into adjacent files. We will create `Tabs.tsx`, `PopularTags.tsx`, and `Pagination.tsx` with the following content:

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

And now we can significantly simplify the feed page itself:

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

We also need to account for the new tab in the loader function:

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

Before we leave the feed page, let’s add some code that handles likes to posts. Change your `ArticlePreview.tsx` to the following:

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

This code will send a POST request to `/article/:slug`  with `_action=favorite` to mark the article as favorite. It won’t work yet, but as we start working on the article reader, we will implement this too.

And with that we are officially done with the feed! Yay!

### Article reader

First, we need data. Let’s create a loader:

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

Now we can connect it to the route `/article/:slug` by creating the a route file called `article.$slug.tsx`:

```tsx title="app/routes/article.$slug.tsx"
export { loader } from "pages/article-read";
```

The page itself consists of three main blocks — the article header with actions (repeated twice), the article body, and the comments section. This is the markup for the page, it’s not particularly interesting:

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

What’s more interesting is the `ArticleMeta` and `Comments`. They contain write operations such as liking an article, leaving a comment, etc. To get them to work, we first need to implement the backend part. Create `action.ts` in the `api` segment of the page:

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

Export that from the slice and then from the route. While we’re at it, let’s also connect the page itself:

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

Now, even though we haven’t implemented the like button on the reader page yet, the like button in the feed will start working! That’s because it’s been sending “like” requests to this route. Give that a try.

`ArticleMeta` and `Comments` are, again, a bunch of forms. We’ve done this before, let’s grab their code and move on:

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

And with that our article reader is also complete! The buttons to follow the author, like a post, and leave a comment should now function as expected.

<figure>
  ![Article reader with functioning buttons to like and follow](/img/tutorial/realworld-article-reader.jpg)

  <figcaption>Article reader with functioning buttons to like and follow</figcaption>
</figure>

### Article editor

This is the last page that we will cover in this tutorial, and the most interesting part here is how we’re going to validate form data.

The page itself, `article-edit/ui/ArticleEditPage.tsx`, will be quite simple, extra complexity stowed away into two other components:

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

This page gets the current article (unless we’re writing from scratch) and fills in the corresponding form fields. We’ve seen this before. The interesting part is `FormErrors`, because it will receive the validation result and display it to the user. Let’s take a look:

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

Here we are assuming that our action will return the `errors` field, an array of human-readable error messages. We will get to the action shortly.

Another component is the tags input. It’s just a plain input field with an additional preview of chosen tags. Not much to see here:

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

Now, for the API part. The loader should look at the URL, and if it contains an article slug, that means we’re editing an existing article, and its data should be loaded. Otherwise, return nothing. Let’s create that loader:

```ts title="pages/article-edit/api/loader.ts"
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

The action will take the new field values, run them through our data schema, and if everything is correct, commit those changes to the backend, either by updating an existing article or creating a new one:

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

The schema doubles as a parsing function for `FormData`, which allows us to conveniently get the clean fields or just throw the errors to handle at the end. Here’s how that parsing function could look:

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

Arguably, it’s a bit lengthy and repetitive, but that’s the price we pay for human-readable errors. This could also be a Zod schema, for example, but then we would have to render error messages on the frontend, and this form is not worth the complication.

One last step — connect the page, the loader, and the action to the routes. Since we neatly support both creation and editing, we can export the same thing from both `editor._index.tsx` and `editor.$slug.tsx`:

```tsx title="pages/article-edit/index.ts"
export { ArticleEditPage } from "./ui/ArticleEditPage";
export { loader } from "./api/loader";
export { action } from "./api/action";
```

```tsx title="app/routes/editor._index.tsx, app/routes/editor.$slug.tsx (same content)"
import { ArticleEditPage } from "pages/article-edit";

export { loader, action } from "pages/article-edit";

export default ArticleEditPage;
```

We’re done now! Log in and try creating a new article. Or “forget” to write the article and see the validation kick in.

<figure>
  ![The Conduit article editor, with the title field saying “New article” and the rest of the fields empty. Above the form there are two errors: “**Describe what this article is about” and “Write the article itself”.**](/img/tutorial/realworld-article-editor.jpg)

  <figcaption>The Conduit article editor, with the title field saying “New article” and the rest of the fields empty. Above the form there are two errors: **“Describe what this article is about”** and **“Write the article itself”**.</figcaption>
</figure>

The profile and settings pages are very similar to the article reader and editor, they are left as an exercise for the reader, that’s you :)
