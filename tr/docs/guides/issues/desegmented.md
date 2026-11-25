# Desegmentasyon (Desegmentation)

Desegmentasyon (yatay dilimleme veya katmana göre paketleme olarak da bilinir), dosyaların hizmet ettikleri iş alanlarına (business domains) göre değil, teknik rollerine göre gruplandırıldığı bir kod organizasyonu örüntüsüdür. Bu, benzer teknik işlevlere sahip kodların, yönettiği iş mantığından bağımsız olarak aynı yerde saklandığı anlamına gelir.

Bu yaklaşım, başlaması kolay olduğu ve otomatik içe aktarma (auto-imports) ile dosya tabanlı yönlendirme (file-based routing) gibi özellikleri mümkün kıldığı için Next ve Nuxt gibi meta-framework'lerde popülerdir:

- app
  - components
    - DeliveryCard.jsx
    - DeliveryChoice.jsx
    - RegionSelect.jsx
    - UserAvatar.jsx
  - actions
    - delivery.js
    - region.js
    - user.js
  - composables
    - delivery.js
    - region.js
    - user.js
  - constants
    - delivery.js
    - region.js
    - user.js
  - utils
    - delivery.js
    - region.js
    - user.js
  - stores
    - delivery
      - getters.js
      - actions.js
Bu örüntü FSD kod tabanlarında da genel amaçlı klasörler şeklinde ortaya çıkar:

- features
  - delivery
    - ui
      - components ⚠️
- entities
  - recommendations
    - utils ⚠️
Dosyalar da desegmentasyon kaynağı olabilir. `types.ts` gibi dosyalar birden fazla iş alanını bir arada toplayarak özellikle `pages` veya `widgets` gibi katmanlarda gezinmeyi ve gelecekteki yeniden düzenlemeleri (refactoring) zorlaştırabilir:

- pages
  - delivery
    - index.ts
    - ui
      - DeliveryCard.tsx
      - DeliveryChoice.tsx
      - UserAvatar.tsx
    - model
      - types.ts ⚠️
      - utils.ts ⚠️
    - api
      - endpoints.ts ⚠️
```ts title="pages/delivery/model/types.ts"
// ❌ Kötü: Genel amaçlı dosyada karışık iş alanları
export interface DeliveryOption {
  id: string;
  name: string;
  price: number;
}

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
}
```
```ts title="pages/delivery/model/utils.ts"
// ❌ Kötü: Genel amaçlı dosyada karışık iş alanları
export function formatDeliveryPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function getUserInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}
```
```ts title="pages/delivery/api/endpoints.ts"
// ❌ Kötü: Genel amaçlı dosyada karışık iş alanları
export async function fetchDeliveryOptions() { /* ... */ }
export async function fetchUserInfo() { /* ... */ }
```
## Sorun \{#the-problem\}

Bu yapı başlangıç için kolay olsa da, daha büyük projelerde ölçeklenebilirlik sorunlarına yol açabilir:

- Düşük Uyum (Low Cohesion): Tek bir özelliği değiştirmek çoğu zaman `pages`, `components` ve `stores` gibi birden fazla büyük klasördeki dosyaları düzenlemeyi gerektirir.

- Sıkı Bağlılık (Tight Coupling): Bileşenler beklenmedik bağımlılıklara sahip olabilir ve bu durum karmaşık, birbirine dolanmış bağımlılık zincirlerine yol açar.

- Zor Yeniden Düzenleme (Difficult Refactoring): Belirli bir iş alanıyla ilgili kodu manuel olarak ayıklamak için ek çaba gerekir.

## Çözüm \{#solution\}

Belirli bir iş alanıyla ilgili tüm kodu tek bir yerde gruplayın.

`types`, `components`, `utils` gibi genel klasör adlarının yanı sıra `types.ts`, `utils.ts` veya `helpers.ts` gibi genel dosya adlarından da kaçının. Bunun yerine, temsil ettikleri iş alanını doğrudan yansıtan adlar kullanın.

Özellikle birden fazla iş alanına sahip dilimlerde (slices) mümkünse `types.ts` gibi genel dosya adlarından kaçının:

- pages
  - delivery
    - index.tsx
    - ui
      - DeliveryPage.tsx
      - DeliveryCard.tsx
      - DeliveryChoice.tsx
      - UserInfo.tsx
    - model
      - delivery.ts
      - user.ts
## Ayrıca bakınız \{#see-also\}

* [(Makale) Düşük Bağlılık ve Yüksek Uyum (Low Coupling and High Cohesion) hakkında net anlatım](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
* [(Makale) Düşük Bağlılık ve Yüksek Uyum. Demeter Yasası](https://medium.com/german-gorelkin/low-coupling-high-cohesion-d36369fb1be9)
