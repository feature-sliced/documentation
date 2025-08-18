# Использование с SvelteKit

В SvelteKit проекте возможно реализовать FSD, однако возникают конфликты из-за различий между требованиями к структуре проекта SvelteKit и принципами FSD:

* Изначально, SvelteKit предлагает файловую структуру внутри папки `src/routes`, в то время как в FSD роутинг должен быть частью слоя `app`.
* SvelteKit предлагает складывать всё, что не относится к роутингу в папку `src/lib`.

## Настроим конфиг[​](#настроим-конфиг "Прямая ссылка на этот заголовок")

svelte.config.ts

```
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter(),
    files: {
      routes: 'src/app/routes',              // перемещаем роутинг внутрь app слоя
      lib: 'src',
      appTemplate: 'src/app/index.html',     // Перемещаем входную точку приложения внутрь слоя app
      assets: 'public'
    },
    alias: {
        '@/*': 'src/*'                       // Создаём алиас для директории src
    }
  }
};
export default config;
```

## Перемещение файлового роутинга в `src/app`[​](#перемещение-файлового-роутинга-в-srcapp "Прямая ссылка на этот заголовок")

Создадим слой app, переместим в него входную точку приложения `index.html` и создадим папку routes. Таким образом, ваша файловая структура должна выглядеть так:

```
├── src
│   ├── app
│   │   ├── index.html
│   │   ├── routes
│   ├── pages                               # Папка pages, закреплённая за FSD
```

Теперь, вы можете создавать роуты для страниц внутри `app` и подключать к ним страницы из `pages`.

Например, чтобы добавить главную страницу в проект, вам нужно сделать следующие шаги:

* Добавить слайс страницы внутри слоя `pages`
* Добавить соответствующий роут в папку `routes` из слоя `app`
* Совместить страницу из слайса с роутом

Для того чтобы создать слайс страницы, воспользуемся [CLI](https://github.com/feature-sliced/cli):

```
fsd pages home
```

Создайте файл `home-page.svelte` внутри сегмента ui, откройте к нему доступ с помощью Public API

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page.svelte';
```

Создайте роут для этой страницы внутри слоя `app`:

```

├── src
│   ├── app
│   │   ├── routes
│   │   │   ├── +page.svelte
│   │   ├── index.html
│   ├── pages
│   │   ├── home
│   │   │   ├── ui
│   │   │   │   ├── home-page.svelte
│   │   │   ├── index.ts
```

Добавьте внутрь `+page.svelte` файла компонент вашей страницы:

src/app/routes/+page.svelte

```
<script>
  import { HomePage } from '@/pages/home';
</script>


<HomePage/>
```

## См. также[​](#см-также "Прямая ссылка на этот заголовок")

* [Документация по изменению конфига директорий в SvelteKit](https://kit.svelte.dev/docs/configuration#files)
