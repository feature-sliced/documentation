---
sidebar_position: 1
---

# Qisqacha ma'lumot

## Menga tog'ri keladimi? {#is-it-right-for-me}

FSD ba'zi ogohlantirishlar bilan har qanday hajmdagi loyihalar va jamoalar uchun javob beradi:

- Ushbu metodologiya faqat frontend uchun. Agar siz backend arxitekturasini izlayotgan bo'lsangiz, [Clean Architecture][refs-clean-architecture] ga e'tibor bering.
- Ushbu metodologiya faqatgina foydalanuvchi interfeysi ilovalari uchun. Katta komponentli kutubxona arxitekturasi uchun ilhom sifatida [Material UI][ext-material-ui] lar tavsiya etiladi.
- Agar siz FSD-da juda oddiy bir sahifali dasturni ishlab chiqayotgan bo'lsangiz, metodologiyaning afzalliklariga ehtiyoj sezilmaydi, va kodlash jarayoni sekinlashishi mumkin. Biroq, FSD oldingi ilovalar haqida standartlashtirilgan tarzda fikr yuritishga yordam beradi, shuning uchun agar sizga nima kerakligini bilsangiz, undan hatto kichik loyihalarda ham foydalaning.
- Google Cloud administrator paneli hajmidagi ulkan dasturlarda maxsus arxitekturani talab qiladi. Bu holda FSD boshlang'ich nuqtasi sifatida harakat qilishi mumkin.

Metodologiya ma'lum bir dasturlash tiliga, UI ramkasiga yoki davlat menejeriga bog'liq emas - har qanday ([ishlash namunalari][refs-examples]) ga tog'ri keladi.

Agar sizda allaqachon loyiha bo'lsa, tashvishlanmang - FSD asta-sekin joylashtirish mumkin. Jamoaga beriladigan asosiy savol: "**Kamchiliklar bormi** dasturlashda?" Agar kamchiliklar bo'lmasa o'tish shart emas. Migratsiya bo'yicha ko'rsatmalar uchun [Migratsiya][refs-migration] ga qarang.


## Asoslari {#basics}

FSD dagi dastur <mark>qatlamlardan</mark> tashkil qiladi (layers), har bir qatlam <mark>slayslardan</mark> (slices) tashkil qiladi va har bir slays <mark>segmentlardan</mark> (segments).

![themed--scheme](/img/visual_schema.jpg)

**Qatlamlar** hamma dasturlarda standartlashtirilgan va vertikal joylashkan. Bir qatlamdagi modullar faqatkina pastdagi modullar bilan aloqada bo'la oladi. Hozirda qatlamlar soni yettita (pastdan tepaga):

1. `shared` — ilova/biznesning o'ziga xos xususiyatlari bilan bog'liq bo'lmagan qayta ishlatiladigan kod.
<small>(masalan, UIKit, libs, API)</small>
2. `entities` (mantiqlar) — biznes-mantiqlar.
<small>(misol, User, Product, Order)</small>
3. `features` (fichelar) — foydalanuvchining o'zaro ta'siri, foydalanuvchiga biznes qiymatini keltiradigan harakatlar.
<small>(misol, SendComment, AddToCart, UsersSearch)</small>
4. `widgets` (vidjetlar) — mantiqlar va xususiyatlarni mustaqil bloklarga ulash uchun kompozitsion qatlam.
<small>(misol, IssuesList, UserProfile)</small>.
5. `pages` (sahifalar) — mantiqlar, xususiyatlar va vidjetlardan to'liq huquqli sahifalarni yig'ish uchun kompozitsion qatlam.
6. `processes` (protseslar, eskirgan qatlam) — bir necha sahifalarni qamrab olgan murakkab skriptlar.
<small>(misol, авторизация)</small>
7. `app` — butun dastur uchun sozlamalar, uslublar va provayderlar.

Keyin **slayslar** bor, kodni mavzu sohasiga bo'lish. Ular bir-biriga mantiqiy bog'liq bo'lgan modullarni birlashtiradi, bu kodlar bazasini boshqarishni osonlashtiradi. Dilimlar bir qatlamda boshqa bo'laklardan foydalana olmaydi, bu esa yuqori darajani ta'minlaydi [_bog'lanmalar_][refs-wiki-cohesion] (cohesion) past urovenda [_ulanmalar_][refs-wiki-coupling] (coupling).

O'z navbatida, har bir slays **segmentlarda** iborat. Bu kichik modullar bo'lib, ularning asosiy vazifasi tilim ichidagi kodni texnik maqsadiga ko'ra ajratishdir. Keng trqalgan segmentlar — `ui`, `model` (store, actions), `api` va `lib` (utils/hooks), lekin sizning slaysingizda ba'zi segmentlar bo'lmasligi mumkin, sizning ixtiyoringizda boshqalar ham bo'lishi mumkin.

:::note

Aksariyat hollarda `api` va `config` larni faqatgina shared qatlamida joylashtirish [tavsiya][ext-disc-api] etiladi

:::

## Namuna {#example}

Ijtimoiy tarmoq ilovasini ko'rib chiqing.

* `app/` router konfiguratsiyasi, global xotira va uslublarni o'z ichiga oladi.
* `pages/` ilovaning har bir sahifasi uchun marshrut komponentlarini o'z ichiga oladi, asosan, iloji bo'lsa, o'z mantig'isiz tuzadi.

Ushbu ilovaning bir qismi sifatida keling, yangiliklar lentasidagi pochta kartasini ko'rib chiqaylik.

* `widgets/` "yig'ilgan" pochta kartasini o'z ichiga oladi, mazmuni va interaktiv tugmalari mavjud bo'lib, ular orqa qismga so'rovlar kiritilgan.
* `features/` kartaning barcha interaktivligini (masalan, yoqtirish tugmasi) va ushbu interaktivlikni qayta ishlash mantiqini o'z ichiga oladi.
* `entities/` interaktiv elementlar uchun slotlari bo'lgan skelet kartasini o'z ichiga oladi. Xabar muallifini ko'rsatadigan komponent ham ushbu jildda, lekin boshqa bo'lakda.

### Afzalliklar {#advantages}

- **Bir xillik**
Kod ta'sir doirasi (qatlami), mavzu maydoni (bo'limi) va texnik maqsadi (segment) bo'yicha taqsimlanadi.
Bu arxitekturani standartlashtiradi va tushunishni osonlashtiradi.

- **Boshqariladigan mantiqni qayta ishlatish**
Arxitekturaning har bir komponenti o'z maqsadiga va taxmin qilinadigan bog'liqlik ro'yxatiga ega.
Buning yordamida **DRY** printsipiga muvofiqlik va modulni turli maqsadlar uchun moslashtirish qobiliyati o'rtasida muvozanat saqlanadi.

- **O'zgarishlarga va qayta ishlashga chidamli**
Bitta modul bitta qatlamda yoki yuqoridagi qatlamlarda joylashgan boshqa moduldan foydalana olmaydi.
Bu kutilmagan oqibatlarsiz yangi talablarni qondirish uchun ilovani alohida o'zgartirish imkonini beradi.

- **Biznes va foydalanuvchi ehtiyojlariga e'tibor qarating**
Ilovani biznes domenlariga bo'lish loyiha xususiyatlarini yaxshiroq tushunish, tuzilish va topishga yordam beradi.

## Sekin-asta amalga oshirish {#incremental-adoption}

FSD ning kuchi uning tuzilmali parchalanishidir. O'zining eng yaxshi ko'rinishida FSD sizga kodning istalgan qismi uchun joyni deyarli aniq topishga imkon beradi. Biroq, parchalanish darajasi parametrdir va har qanday jamoa uni amalga oshirish qulayligi va foyda o'rtasidagi optimal muvozanat uchun sozlashi mumkin.

Mavjud kodlar bazasini FSD ga ko'chirish bo'yicha tajriba bilan tasdiqlangan quyidagi strategiyani taklif qilamiz:

1. Keyingi qadamlarni qo'llab-quvvatlash uchun `api` va shared qatlamlarni kesib tashlang. Bu qatlamlar ingichka va sodda bo'lib chiqadi, ular shunday bo'lib qolsin.

2. Biznes bilan bog'liq barcha interfeysni olib tashlang va uni vidjetlar va sahifalar bo'ylab tarqating, hatto ular hali ham FSD qoidalarini buzadigan bog'liqliklarga ega bo'lsa ham.

3. `features` va `entities` ni ta'kidlab, parchalanish darajasini asta-sekin oshiring. Sahifalar va vidjetlarni mantiqiy yuklangan qatlamlardan sof kompozitsion qatlamlarga aylantiring.

Refaktoring jarayonida yangi yirik ob'ektlarni qo'shishdan, shuningdek, qismlarga qayta ishlashdan bosh tortish tavsiya etiladi.

[refs-clean-architecture]: https://medium.com/codex/clean-architecture-for-dummies-df6561d42c94
[ext-disc-api]: https://github.com/feature-sliced/documentation/discussions/66
[ext-material-ui]: https://github.com/mui/material-ui
[refs-examples]: /examples
[refs-migration]: /docs/guides/migration
[refs-wiki-cohesion]: https://ru.wikipedia.org/wiki/%D0%A1%D0%B2%D1%8F%D0%B7%D0%BD%D0%BE%D1%81%D1%82%D1%8C_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
[refs-wiki-coupling]: https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D1%86%D0%B5%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)