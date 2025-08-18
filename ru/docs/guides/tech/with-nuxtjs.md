# Использование с NuxtJS

В NuxtJS проекте возможно реализовать FSD, однако возникают конфликты из-за различий между требованиями к структуре проекта NuxtJS и принципами FSD:

* Изначально, NuxtJS предлагает файловую структуру проекта без папки `src`, то есть в корне проекта.
* Файловый роутинг находится в папке `pages`, а в FSD эта папка отведена под плоскую структуру слайсов.

## Добавление алиаса для `src` директории[​](#добавление-алиаса-для-src-директории "Прямая ссылка на этот заголовок")

Добавьте обьект `alias` в ваш конфиг:

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true },        // Не относятся к FSD, включёны при старте проекта
  alias: {
    "@": '../src'
  },
})
```

## Выбор способа настройки роутера[​](#выбор-способа-настройки-роутера "Прямая ссылка на этот заголовок")

В NuxtJS есть два способа настройки роутинга - с помощью конфига и с помощью файловой структуры. В случае с файловым роутингом вы будете создавать index.vue файлы в папках внутри директории app/routes, а в случае конфига - настраивать роуты в `router.options.ts` файле.

### Роутинг с помощью конфига[​](#роутинг-с-помощью-конфига "Прямая ссылка на этот заголовок")

В слое `app` создайте файл `router.options.ts`, и экспортируйте из него обьект конфига:

app/router.options.ts

```
import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
  routes: (_routes) => [],
};
```

Чтобы добавить страницу `Home` в проект, вам нужно сделать следующие шаги:

* Добавить слайс страницы внутри слоя `pages`
* Добавить соответствующий роут в конфиг `app/router.config.ts`

Для того чтобы создать слайс страницы, воспользуемся [CLI](https://github.com/feature-sliced/cli):

```
fsd pages home
```

Создайте файл `home-page.vue` внутри сегмента ui, откройте к нему доступ с помощью Public API

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page';
```

Таким образом, файловая структура будет выглядеть так:

```
|── src
│   ├── app
│   │   ├── router.config.ts
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.vue
│   │   │   ├── index.ts
```

Наконец, добавим роут в конфиг:

app/router.config.ts

```
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/home.vue').then(r => r.default || r)
    }
  ],
}
```

### Файловый роутинг[​](#файловый-роутинг "Прямая ссылка на этот заголовок")

В первую очередь, создайте `src` директорию в корне проекта, а также создайте внутри этой директории слои app и pages и папку routes внутри слоя app. Таким образом, ваша файловая структура должна выглядеть так:

```
├── src
│   ├── app
│   │   ├── routes
│   ├── pages                         # Папка pages, закреплённая за FSD
```

Для того чтобы NuxtJS использовал папку routes внутри слоя `app` для файлового роутинга, вам нужно изменить `nuxt.config.ts` следующим образом:

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true },        // Не относятся к FSD, включёны при старте проекта
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes'
  }
})
```

Теперь, вы можете создавать роуты для страниц внутри `app` и подключать к ним страницы из `pages`.

Например, чтобы добавить страницу `Home` в проект, вам нужно сделать следующие шаги:

* Добавить слайс страницы внутри слоя `pages`
* Добавить соответствующий роут внутрь слоя `app`
* Совместить страницу из слайса с роутом

Для того чтобы создать слайс страницы, воспользуемся [CLI](https://github.com/feature-sliced/cli):

```
fsd pages home
```

Создайте файл `home-page.vue` внутри сегмента ui, откройте к нему доступ с помощью Public API

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page';
```

Создайте роут для этой страницы внутри слоя `app`:

```

├── src
│   ├── app
│   │   ├── routes
│   │   │   ├── index.vue
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.vue
│   │   │   ├── index.ts
```

Добавьте внутрь `index.vue` файла компонент вашей страницы:

src/app/routes/index.vue

```
<script setup>
  import { HomePage } from '@/pages/home';
</script>

<template>
  <HomePage/>
</template>
```

## Что делать с `layouts`?[​](#что-делать-с-layouts "Прямая ссылка на этот заголовок")

Вы можете разместить layouts внутри слоя `app`, для этого нужно изменить конфиг следующим образом:

nuxt.config.ts

```
export default defineNuxtConfig({
  devtools: { enabled: true },        // Не относятся к FSD, включёны при старте проекта
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes',
    layouts: './src/app/layouts'
  }
})
```

## См. также[​](#см-также "Прямая ссылка на этот заголовок")

* [Документация по изменению конфига директорий в NuxtJS](https://nuxt.com/docs/api/nuxt-config#dir)
* [Документация по изменению конфига роутера в NuxtJS](https://nuxt.com/docs/guide/recipes/custom-routing#router-config)
* [Документация по изменению алиасов в NuxtJS](https://nuxt.com/docs/api/nuxt-config#alias)
