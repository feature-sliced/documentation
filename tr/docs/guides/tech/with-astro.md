# Astro ile Kullanım

## Dosya tabanlı yönlendirme \{#file-based-routing\}

Astro, rotaların `📁 src/pages` içinde bulunmasını bekler; ancak FSD bu klasörü sayfa dilimleri için bir katman olarak kullanır. İkisi için aynı klasörü kullanamayız. Bu durumu çözmek için, FSD `🥞 pages` katmanı olarak `📁 src/_pages` klasörünü kullanın ve `📁 src/pages` klasörünü yalnızca yönlendirme için kullanın.

- src
  - pages Astro yönlendirmesi (ince giriş noktaları)
    - 404.astro yerleşik 404 hata sayfası
    - index.astro
  - _pages FSD pages katmanı
    - home
      - ui
        - HomePage.astro
      - index.ts
Rota dosyası yalnızca FSD katmanındaki sayfayı içe aktarır ve render eder.

```astro title="src/pages/index.astro"
---
import { HomePage } from '@/_pages/home';
---

<HomePage />
```

## Yol takma adlarını (path aliases) ayarlama \{#setting-up-path-aliases\}

`src` dizininden `@/` kullanarak içe aktarım yapabilmek için `tsconfig.json` dosyasına bir yol takma adı (path alias) ekleyin:

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

## Entegrasyonlar ile çalışma \{#working-with-integrations\}

[Starlight](https://starlight.astro.build/) gibi bazı Astro entegrasyonları, içerikleri için içerik koleksiyonlarını (content collections) kullanır. Bu entegrasyonlar genellikle `📁 src/content/docs` gibi belirli klasörlerde içerik bulunmasını bekler.

Entegrasyon kök dizin yolunu (root path) değiştirmenize izin vermiyorsa sorun değil — olduğu gibi bırakın. Genellikle içerik koleksiyonu klasörleri FSD katmanlarıyla çakışmaz; bu nedenle FSD katmanları (`🥞 _pages`, `🥞 shared`, vb.) bu klasörlerle yan yana bulunabilir:

- src
  - _pages FSD pages katmanı
    - ...
  - content Entegrasyon içeriği (Starlight dokümanları vb.)
    - docs
      - getting-started.md
  - shared FSD shared katmanı
    - ...
Entegrasyonun kendi yönlendirmesini ve render işlemlerini yönetmesine izin verin; FSD yapınız ise uygulamaya özgü kodu yönetsin.

## Ayrıca bakınız \{#see-also\}

- [Astro Yönlendirme (Routing)](https://docs.astro.build/en/guides/routing/)
- [Astro Proje Yapısı](https://docs.astro.build/en/basics/project-structure/)
