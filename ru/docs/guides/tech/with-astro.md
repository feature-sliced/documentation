# Использование с Astro

## Файловая маршрутизация

Astro ожидает, что файлы маршрутов будут находиться в `📁 src/pages`, но в FSD эта папка предназначена для слайсов страниц. Использовать одну папку для обеих целей нельзя. Чтобы избежать конфликта, разместите слой FSD `🥞 pages` в `📁 src/_pages`, а `📁 src/pages` используйте только для маршрутизации.

- src
  - pages Маршрутизация Astro
    - 404.astro Стандартная страница ошибки 404
    - index.astro
  - _pages Слой pages в FSD
    - home
      - ui
        - HomePage.astro
      - index.ts
Файл маршрута только импортирует и отображает страницу из слоя FSD.

```astro title="src/pages/index.astro"
---
import { HomePage } from '@/_pages/home';
---

<HomePage />
```

## Настройка алиасов путей

Добавьте алиас пути в `tsconfig.json`, чтобы импортировать файлы из `src` с помощью `@/`:

```json title="tsconfig.json"
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Работа с интеграциями

Некоторые интеграции Astro, например [Starlight](https://starlight.astro.build/), используют коллекции контента для хранения содержимого. Такие интеграции часто ожидают, что контент будет находиться в определённых папках, например в `📁 src/content/docs`.

Если интеграция не позволяет изменить корневой путь, оставьте его как есть. Обычно папки коллекций контента не конфликтуют со слоями FSD, поэтому слои (`🥞 _pages`, `🥞 shared` и другие) можно разместить рядом с этими папками:

- src
  - _pages Слой pages в FSD
    - ...
  - content Контент интеграции (документация Starlight и т. п.)
    - docs
      - getting-started.md
  - shared Слой shared в FSD
    - ...
Пусть интеграция отвечает за свою маршрутизацию и отрисовку, а FSD организует код вашего приложения.

## См. также

- [Маршрутизация в Astro](https://docs.astro.build/en/guides/routing/)
- [Структура проекта Astro](https://docs.astro.build/en/basics/project-structure/)
