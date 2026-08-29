# Qisqacha

**Feature-Sliced Design** (FSD) bu front-end ilovalarining tuzilishini shakllantirish uchun arxitektura metodologiyasi. Oddiy qilib aytganda, bu kodni tartibga solish uchun qoidalar va konvensiyalar to'plami. Bu metodologiyaning asosiy maqsadi - loyihani yanada tushunarli va o'zgaruvchan biznes talablariga moslashuvchan qilishdir.

FSD nafaqat konvensiyalar to'plami, balki vositalar to'plamini ham o'z ichiga oladi. Bizda [linter][ext-steiger] sizning loyihangizning arxitekturasini tekshirish uchun, [papka generatorlari][ext-tools] CLI yoki IDE lar orqali, shuningdek, ko'plab misollar jamlanmasiga ega.

## Menga to'g'ri keladimi? \{#is-it-right-for-me}

FSD har qanday hajmdagi jamoalarda joriy qilinishi mumkin. Sizga to'g'ri keladi agar:

- Siz **frontend** qilayotgan bo'lsangiz (veb, mobil, kompyuter dasturlari, h.k.)
- Siz **ilova** qurayotgan bo'lsangiz, kutubxona emas

Shu bilan birga, bu yerda qaysi dasturlash tili, UI(foydalanuvchi interfeysi) freymvorki, yoki holat boshqaruvchisi(state manager)ni ishlatish bo'yicha hech qanday cheklov yo'q. Shuningdek, FSD ni bosqichma-bosqich joriy qilishingiz, monorepo(yagona repozitoriya)larda ishlatishingiz va ilovangizni modullarga bo'lib, FSD ni ularning har birida alohida amalga oshirishingiz mumkin.

Agar sizda allaqachon arxitektura mavjud bo‘lsa va FSDga o‘tishni o‘ylayotgan bo‘lsangiz, avvalo joriy arxitektura jamoangizga muammo tug‘dirayotganiga ishonch hosil qiling. Masalan, agar loyihangiz juda katta va o‘zaro juda bog‘lanib ketgan bo‘lsa, bu yangi xususiyatlarni samarali joriy etishni qiyinlashtirishi mumkin. Yoki jamoangizga ko‘plab yangi a’zolar qo‘shilishi kutilayotgan bo‘lsa, FSDga o‘tish foydali bo‘lishi mumkin. Agar hozirgi arxitektura yaxshi ishlayotgan bo‘lsa, ehtimol uni o‘zgartirishga hojat yo‘q. Ammo agar migratsiya qilishga qaror qilsangiz, yo‘riqnoma uchun [Migratsiya][migration] sahifasini ko'rib chiqishingiz mumkin.
## Asosiy misollar \{#basic-example}

Bu yerda FSD qo'llanilgan oddiy loyiha:

- app/
- pages/
- shared/
Bu yuqori darajadagi papkalar ular _layerlar_ deyiladi. Keling chuqurroq qaraymiz:

- app/
  - routes/
  - analytics/
- pages/
  - home/
  - article-reader/
    - ui/
    - api/
  - settings/
- shared/
  - ui/
  - api/
`📂 pages` ichidagi papkalar _slice(bo'lak)lar_ deyiladi. Ular layer ni domenlar bo'yicha bo'lishadi(bu holatda, sahifalar bo'yicha)

`📂 app`, `📂 shared`, va `📂 pages/article-reader` ichidagilar _segment(bo'lim)lar_ deyiladi, va ular slicelar(yoki layerlar), ya'ni kodning vazifasiga qarab ajratiladi.

## Tushunchalar \{#concepts}

Layerlar, slicelar va segmentlar quyidagi iyerarxiyani hosil qiladi:

<figure>
   ![FSD konsepsiyalari iyearxiyasi, quyida tasvirlangan](../../../../../../static/img/visual_schema.jpg)

   <figcaption style={{ fontStyle: "italic", fontSize: "0.9em" }}>
      <p>Tepadagi rasmda: uchta ustunlar, chapdan o'ngga qarab mos ravishda "Layerlar", "Slicelar" va "Segmentlar" deb belgilangan.</p>
      <p>"Layers" ustuni yuqoridan pastga qarab joylashtirilgan etti bo‘limni o‘z ichiga oladi: "app", "processes", "pages", "widgets", "features", "entities" va "shared". "Processes" bo‘limi ustidan chizib tashlangan. "Entities" bo‘limi ikkinchi ustun — "Slicelar" bilan bog‘langan bo‘lib, bu ikkinchi ustunning "entities" tarkibida ekanligini bildiradi.</p>
      <p>"Slices" ustuni yuqoridan pastga qarab joylashtirilgan uch bo‘limni o‘z ichiga oladi: "user", "post" va "comment". "Post" bo‘limi uchinchi ustun — "Segmentlar" bilan bog‘langan bo‘lib, bu uchinchi ustunning "post" tarkibida ekanligini bildiradi.</p>
      <p>"Segments" ustuni yuqoridan pastga qarab joylashtirilgan uchta bo'limni o'z ichiga oladi: "ui", "model" va "api".</p>
   </figcaption>
</figure>

### Layerlar \{#layers}

Layerlar barcha FSD loyihalarida standartlashtirilgan. Siz ularning barchasidan foydalanishingiz shart emas, lekin ularning nomlari muhim. Hozirda yettita layer mavjud(tepadan pastga qarab):

1. **App** — Ilovaning ishlashi uchun zarur bo'lgan hamma narsa — marshrutlash(routing), dastur boshlanish nuqtasi(entrypoint), global stillar, provayderlar.
2. **Processes** (eskirgan) — Murakkab sahifalararo ssenariylar(ya'ni foydalanuvchi bir sahifada amal bajarsa, boshqa sahifada natija ko‘rinishi yoki turli sahifalar o‘rtasida state(holat) uzatilishi).
3. **Pages** — To‘liq sahifalar yoki ichma-ich marshrutlashdagi(routing) sahifaning katta qismlari.
4. **Widgets** — Katta, mustaqil funksionallik yoki UI bo‘laklari, odatda butun bir foydalanish holatini ta’minlaydi.
5. **Features** — _Qayta foydalaniladigan_ butun mahsulot xususiyatlarining implementatsiyalari, ya’ni foydalanuvchiga biznes qiymatini keltiradigan harakatlar.
6. **Entities** — Loyihada ishlaydigan biznes obyekti, masalan, `user` yoki `product`.
7. **Shared** — Loyihaning yoki biznesning aniq xususiyatlariga bog‘liq bo‘lmagan, lekin qayta ishlatiladigan funksionallik.

**Caution:** **App** va **Shared** layerlari boshqa layerlardan farqli o‘laroq slicelarga ega emas va to‘g‘ridan-to‘g‘ri segmentlarga bo‘linadi.

Biroq, boshqa barcha layerlar — **Entities**, **Features**, **Widgets** va **Pages** avval slicelar yaratishni talab qiladi, shundan keyingina ularning ichida segments yaratiladi.
Layerlar bilan ishlashning asosiy tamoyili shundaki, bitta layerdagi modullar faqat o‘zidan quyi joylashgan layerlardagi modullarni bilishi va ulardan import qilishi mumkin.

### Slicelar \{#slices}

Keyingi tushuncha slicelar, ya’ni kodni biznes domenlari bo‘yicha bo‘lish usuli. Ularning nomlarini o‘zingiz tanlashingiz va xohlaganingizcha ko‘paytirishingiz mumkin. Slices kod bazangizni yanada tushunarli qiladi, chunki bir-biriga bog‘liq modullar bir joyda saqlanadi.

Slicelar bir xil layer ichida boshqa slicelardan foydalana olmaydi. Bu esa yuqori cohesion([uyg'unlik][cohesion]) va low coupling([past bog‘liqlik][low-coupling]) tamoyillariga rioya qilishga yordam beradi.

### Segmentlar \{#segments}

Slicelar, shuningdek, App va Shared layerlari segmentlardan tashkil topadi. Segmentlar kodni uning maqsadiga qarab guruhlaydi. Segment nomlari standart bilan cheklanmagan, ammo eng keng tarqalgan maqsadlar uchun bir nechta an’anaviy nomlar mavjud:

- `ui` — UI(foydalanuvchi interfeysi) ni aks ettiruvchi barcha narsalar: UI(foydalanuvchi interfeysi) komponentlar, sana formatlagichlar, stillar va boshqalar.
- `api` — backend bilan munosabat: so'rov funksiyalari, ma'lumot turlari, mapperlar va boshqalar.
- `model` — ma'lumot modeli: sxemalar, interfeyslar, holat saqlovchi obyektlar (stores) va biznes mantiq(business logic).
- `lib` — Ushbu sliceda joylashgan boshqa modullarga kerak kutubxona kodi.
- `config` — konfiguratsiya fayllari va feature flags(yoqib o'chiriladigan xususiyat bayroqlari)

Odatda, ushbu segmentlar ko‘pchilik layerlar uchun yetarli bo‘ladi. Siz faqat Shared yoki App layerlarida o‘z segmentlaringizni yaratishingiz mumkin, lekin bu qat’iy qoida emas.

## Afzalliklar \{#advantages}

- **Bir xillik**
  Tuzilma standartlashtirilganligi sababli loyihalar yanada bir xil ko'rinishga ega bo‘ladi, bu esa jamoaga yangi a’zolarni jalb qilish jarayonini osonlashtiradi.

- **O'zgarishlar va refaktoring(kodni qayta tuzish) jarayonida barqarorlik**
  Bitta layerdagi modul boshqa shu layerdagi yoki undan yuqoridagi modullardan foydalana olmaydi.
  Bu esa ilovaning boshqa qismlariga kutilmagan ta’sir ko‘rsatmasdan izolyatsiyalangan o‘zgarishlar kiritish imkonini beradi.

- **Qayta foydalaniladigan mantiq(logic)ni tartibli boshqarish**
  Layerga qarab, kodni keng miqyosda qayta ishlatish yoki faqat ma'lum bir joyda ishlatish mumkin.
  Bu esa **DRY** tamoyilini ushlab turish bilan birga, loyihaning qulayligini ham saqlab qolishga yordam beradi.

- **Biznes va foydalanuvchi ehtiyojlariga yo‘naltirilganlik.**
  Ilova biznes domenlarga bo‘lingan va nomlashda biznesga oid terminologiya(business language) dan foydalanish tavsiya etiladi, bu esa sizga loyiha tarkibidagi boshqa qismlarni to‘liq tushunmasdan ham mahsulot ustida ishlash imkonini beradi.

## Bosqichma-bosqich joriy etish \{#incremental-adoption}

Agar mavjud kod bazangizni FSD ga o'tkazmoqchi bo'lsangiz, quyidagi strategiyani tavsiya qilamiz. Biz buni bizning tajribamizda foydali deb topdik.

1. Avval App va Shared layerlarini modul-ma-modul shakllantirib, mustahkam asos yarating.

2. Mavjud UI komponentlarini Widgets va Pages ga umumiy tartibda joylashtiring, hatto ular FSD qoidalarini buzadigan bog‘liqliklarga ega bo‘lsa ham.

3. Import qoidabuzarliklarini bosqichma-bosqich tuzatishni boshlang va shu bilan birga Entities, ehtimol Features ham ajratib chiqing.

Refaktoring jarayonida yoki loyihaning faqat ayrim qismlarini o‘zgartirayotganda yangi yirik Entities qo‘shmaslik tavsiya etiladi.

## Keyingi qadamlar \{#next-steps}

- **FSD haqida chuqur tushuncha hosil qilmoqchimisiz?** [Bu yerda][tutorial].
- **Savolingiz bormi?** Bizning [Telegram chat][ext-telegram] ga qo'shiling va yordam oling.

[tutorial]: /uz/docs/get-started/tutorial
[migration]: /uz/docs/guides/migration/from-custom
[ext-steiger]: https://github.com/feature-sliced/steiger
[ext-tools]: https://github.com/feature-sliced/awesome?tab=readme-ov-file#tools
[ext-telegram]: https://t.me/feature_sliced
[low-coupling]: https://en.wikipedia.org/wiki/Loose_coupling
[cohesion]: https://en.wikipedia.org/wiki/Cohesion_(computer_science)
