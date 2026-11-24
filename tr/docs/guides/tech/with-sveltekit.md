# SvelteKit ile Kullanım

SvelteKit projesinde FSD uygulamak mümkündür, ancak SvelteKit proje yapısı gereksinimleri ile FSD ilkeleri arasındaki farklılıklar nedeniyle bazı çakışmalar ortaya çıkar:

- Başlangıçta SvelteKit, dosya yapısını `src/routes` klasörü içinde sunar; oysa FSD'de yönlendirme (routing) `app` katmanının bir parçası olmalıdır.
- SvelteKit, yönlendirmeyle ilgili olmayan her şeyin `src/lib` klasörüne konulmasını önerir.

## Yapılandırmayı ayarlayalım \{#lets-set-up-the-config\}

```ts title="svelte.config.ts"
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter(),
    files: {
      routes: 'src/app/routes',             // yönlendirmeyi app katmanının içine taşıyın
      lib: 'src',
      appTemplate: 'src/app/index.html',    // Uygulamanın giriş noktasını app katmanının içine taşıyın
      assets: 'public'
    },
    alias: {
      '@/*': 'src/*'                        // src dizini için bir yol takma adı (alias) oluşturun
    }
  }
};
export default config;
```

## Dosya yönlendirmesini `src/app` içine taşıyın \{#move-file-routing-to-srcapp\}

Bir `app` katmanı oluşturalım, uygulamanın giriş noktası olan `index.html` dosyasını bu katmana taşıyalım ve bir `routes` klasörü oluşturalım.
Böylece dosya yapınız şu şekilde görünmelidir:

- src
  - app
    - index.html
    - routes
  - pages FSD Pages klasörü
Artık `app` içinde sayfalar için rotalar oluşturabilir ve `pages` katmanındaki sayfaları bunlara bağlayabilirsiniz.

Örneğin, projenize bir ana sayfa eklemek için aşağıdaki adımları izlemeniz gerekir:
- `pages` katmanı içine bir sayfa dilimi (page slice) ekleyin
- `app` katmanındaki `routes` klasörüne ilgili rotayı ekleyin
- Dilimdeki sayfayı rota ile eşleştirin

Bir sayfa dilimi oluşturmak için [CLI](https://github.com/feature-sliced/cli) aracını kullanalım:

```shell
fsd pages home
```

`ui` segmenti içinde `home-page.svelte` dosyasını oluşturun ve Public API üzerinden erişilebilir hale getirin:

```ts title="src/pages/home/index.ts"
export { default as HomePage } from './ui/home-page.svelte';
```

`app` katmanı içinde bu sayfa için bir rota oluşturun:

- src
  - app
    - routes
      - +page.svelte
    - index.html
  - pages
    - home
      - ui
        - home-page.svelte
      - index.ts
Sayfa bileşeninizi `+page.svelte` dosyasının içine ekleyin:

```html title="src/app/routes/+page.svelte"
<script>
  import { HomePage } from '@/pages/home';
</script>

<HomePage/>
```

## Ayrıca bakınız \{#see-also\}

- [SvelteKit'te dizin yapılandırmasını değiştirme dokümantasyonu](https://kit.svelte.dev/docs/configuration#files)
