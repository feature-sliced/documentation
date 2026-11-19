# NuxtJS ile Kullanım

NuxtJS projesinde FSD uygulamak mümkündür, ancak NuxtJS proje yapısı gereksinimleri ile FSD ilkeleri arasındaki farklılıklar nedeniyle bazı çakışmalar ortaya çıkar:

- Başlangıçta NuxtJS, bir `src` klasörü olmadan, yani projenin kök dizininde bir dosya yapısı sunar.
- Dosya tabanlı yönlendirme `pages` klasöründe yer alırken, FSD'de bu klasör düz dilim (slice) yapısı için ayrılmıştır.

## `src` dizini için bir yol takma adı (alias) ekleme \{#adding-an-alias-for-the-src-directory\}

Yapılandırmanıza bir `alias` nesnesi ekleyin:
```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  devtools: { enabled: true }, // FSD ile ilgili değildir, proje başlangıcında etkinleştirilir
  alias: {
    "@": '../src'
  },
})
```

## Yönlendiriciyi (router) nasıl yapılandıracağınızı seçin \{#choose-how-to-configure-the-router\}

NuxtJS'te yönlendirmeyi özelleştirmenin iki yolu vardır — bir yapılandırma dosyası kullanarak ve dosya yapısını kullanarak.
Dosya tabanlı yönlendirme durumunda, `app/routes` dizini içindeki klasörlerde `index.vue` dosyaları oluşturursunuz; yapılandırma durumunda ise yönlendiricileri `router.options.ts` dosyasında yapılandırırsınız.

### Yapılandırma kullanarak yönlendirme \{#routing-using-config\}

`app` katmanında bir `router.options.ts` dosyası oluşturun ve içinden bir yapılandırma nesnesi dışa aktarın:
```ts title="app/router.options.ts"
import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
  routes: (_routes) => [],
};
```

Projenize bir `Home` sayfası eklemek için aşağıdaki adımları izlemeniz gerekir:
- `pages` katmanı içinde bir sayfa dilimi ekleyin
- `app/router.config.ts` yapılandırmasına uygun rotayı ekleyin

Bir sayfa dilimi oluşturmak için [CLI](https://github.com/feature-sliced/cli) aracını kullanalım:

```shell
fsd pages home
```

`ui` segmenti içinde bir `home-page.vue` dosyası oluşturun ve Public API kullanarak erişim sağlayın:

```ts title="src/pages/home/index.ts"
export { default as HomePage } from './ui/home-page';
```

Böylece dosya yapısı şu şekilde görünecektir:

- src
  - app
    - router.config.ts
  - pages
    - home
      - ui
        - home-page.vue
      - index.ts
Son olarak yapılandırmaya bir rota ekleyelim:

```ts title="app/router.config.ts"
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

### Dosya Tabanlı Yönlendirme \{#file-routing\}

İlk olarak projenizin kök dizininde bir `src` dizini oluşturun; bu dizinin içinde `app` ve `pages` katmanlarını ve `app` katmanı içinde bir `routes` klasörü oluşturun.
Böylece dosya yapınız şu şekilde görünmelidir:

- src
  - app
    - routes
  - pages FSD ile ilgili Pages klasörü
NuxtJS'in dosya tabanlı yönlendirme için `app` katmanı içindeki `routes` klasörünü kullanabilmesi için `nuxt.config.ts` dosyasını aşağıdaki gibi değiştirmeniz gerekir:
```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  devtools: { enabled: true }, // FSD ile ilgili değildir, proje başlangıcında etkinleştirilir
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes'
  }
})
```

Artık `app` içinde sayfalar için rotalar oluşturabilir ve `pages` katmanındaki sayfaları bu rotalara bağlayabilirsiniz.

Örneğin projenize bir `Home` sayfası eklemek için aşağıdaki adımları uygulamanız gerekir:
- `pages` katmanı içinde bir sayfa dilimi ekleyin
- `app` katmanı içine ilgili rotayı ekleyin
- Dilimdeki sayfayı rota ile bağlayın

Bir sayfa dilimi oluşturmak için [CLI](https://github.com/feature-sliced/cli) aracını kullanalım:

```shell
fsd pages home
```

`ui` segmenti içinde bir `home-page.vue` dosyası oluşturun ve Public API kullanarak erişim sağlayın:

```ts title="src/pages/home/index.ts"
export { default as HomePage } from './ui/home-page';
```

Bu sayfa için `app` katmanı içinde bir rota oluşturun:

- src
  - app
    - routes
      - index.vue
  - pages
    - home
      - ui
        - home-page.vue
      - index.ts
Sayfa bileşeninizi `index.vue` dosyası içine ekleyin:

```html title="src/app/routes/index.vue"
<script setup>
  import { HomePage } from '@/pages/home';
</script>

<template>
  <HomePage/>
</template>
```

## `layouts` ile ne yapılmalı? \{#what-to-do-with-layouts\}

Düzenleri (layouts) `app` katmanı içine yerleştirebilirsiniz; bunu yapmak için yapılandırmayı aşağıdaki gibi değiştirmeniz gerekir:

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  devtools: { enabled: true }, // FSD ile ilgili değildir, proje başlangıcında etkinleştirilir
  alias: {
    "@": '../src'
  },
  dir: {
    pages: './src/app/routes',
    layouts: './src/app/layouts'
  }
})
```

## Ayrıca bakınız \{#see-also\}

- [NuxtJS dizin yapılandırmasını değiştirme dokümantasyonu](https://nuxt.com/docs/api/nuxt-config#dir)
- [NuxtJS yönlendirici yapılandırmasını değiştirme dokümantasyonu](https://nuxt.com/docs/guide/recipes/custom-routing#router-config)
- [NuxtJS yol takma adlarını (alias) değiştirme dokümantasyonu](https://nuxt.com/docs/api/nuxt-config#alias)
