---
sidebar_position: 20
pagination_next: guides/index
---

# FAQ

:::info

Savollaringizni [telegram-чате](https://t.me/feature_sliced) / [github-issues](https://github.com/feature-sliced/documentation/issues) / [github-discussions](https://github.com/feature-sliced/documentation/discussions) da berishingiz mumkin

:::

### Struktura = Arxitikturaga? {#structure--architecture}

Arxitektura - bu abstraktsiyalar va ular o'rtasidagi aloqalarni o'rnatish (shared/features/pages/...)

*Ammo to'g'ri tuzilmasiz - yaxshi arxitektura qilib bomidi*

### Menga loyihada nima sodir bo'layotganini "tushunish va aniqlashtirish" uchun metodologiya kerakmi? {#do-i-need-a-methodology-only-for-understanding-and-clarity-of-what-is-happening-in-the-project}

Katta ehtimol bilan yoqdan ko'ra ha

*Aks holda siz katta direktoriyalarni ko'rib chiqishingizga tog'ri kerak `components/`...*

### Yosh dasturchiga arxitektura/metodologiyasi kerakmi? {#does-a-novice-developer-need-an-architecturemethodology}

Katta ehtimol bilan yoqdan ko'ra ha

*Odatda, loyihani ozingiz ishlab chiqsangiz va ishlab chiqsangiz, hamma narsa muammosiz ketadi. Qachonki dasturlashda tohtamlar bosa yoki jamoaga yangi odam qoshilsa muammolar chiqish boshlidi.*

### Hamma narsa printsiplarga asoslangan bo'lsa, nima uchun bizga boshqa metodologiya kerak? {#why-do-we-need-another-methodology-when-everything-is-based-on-principles}

Javob [bu yerda](/docs/about/motivation)

### Metadologiyani qo'llash namunalarini qayerdan olsam boladi? {#where-can-i-find-examples-of-applying-the-methodology}

Hozircha ochiq ommada faqatgina shular bor, hali hech kim so'ngi versiyagachon adaptatsiya qimagan.

*Yaqin kelajakda ro'yxat yangilanadi va alohida bo'limga joylashtiriladi*

- [Internal Examples](https://github.com/feature-sliced/examples)
- [External Examples](/examples)

*Hamda [gaydlar](/docs/guides) va [tutoriallar](/docs/get-started) bilan tanishib chiqishingiz mumkin*

### FSD yoki unga bog'liq foydali resurslar/nashirlar bormi? {#are-there-some-useful-resources--articles--etc-about-fsd-and-related-things}

<https://github.com/feature-sliced/awesome>

### Dastur feature-slices v1 da yozilgan, ozgartirish kerkami nima deb oylaysiz? {#the-project-is-written-on-feature-slices-v1-how-to-update-and-is-it-worth-it}

Javob [bu yerda](/docs/guides/migration/from-v1)

### Могу ли я вкладывать страницы/фичи/сущности друг в друга? {#can-i-embed-pagesfeaturesentities-into-each-other}

Javob [bu yerda](/docs/reference/slices-segments#slices)

### Avtorizatsiya konteksti bilan qanday ishlayman? {#how-do-i-work-with-the-authorization-context}

Javob [bu yerda](/docs/guides/examples/auth)

### Atomic Design nima u? {#what-about-atomic-design}

Metodologiyaning joriy versiyasi Atomic Design bilan Feature-Sliced Design birga foydalanishga yoki foydalanmaslikka undamaydi.

Shu bilan birga, Atomic Design modullarning `UI` segmenti uchun [yaxshi qo'llaniladi](https://t.me/feature_sliced/1653).

### feature и entity ning farqi? {#what-is-the-difference-between-feature-and-entity}

- `Entity` - biznes **mantiq**
  - blog-post / user / order / product / ...
- `Feature` - biznes fitcher, **mantiq ustida harakat**
  - create-blog-post / login-by-oauth / edit-account / publish-video / ...

Hamda [справочную информацию по сравнению](/docs/reference/layers), [реализация viewer логики по слоям](/docs/guides/examples/auth) halovalarni ko'ring

### layout/template sahifalarini qayerda saqlash kerak? {#where-to-store-the-layouttemplate-of-pages}

Общие шаблоны для разметки лучше хранить в Umumiy shablonlarni `shared/ui` saqlagan maqul, но бывают lekin turli [holatlar](https://github.com/feature-sliced/documentation/discussions/129) bolishi mumkin

### tulkin / linterlar boladimi? {#will-there-be-a-toolkit--linters}

Bo'ladi, hozir ishlab chiqarish jarayonida =)

> Hozircha, importlarni tartiblash / taqiqlash dan foydalansa boladi
>
> - `eslint-plugin-import`
> - `eslint-plugin-simple-import-sort`
> - `eslint-plugin-boundaries`
> - `dependency-cruiser`
>
> Asosiy konfiglar misollarini [ko'ring](https://gist.github.com/azinit/4cb940a1d4a3e05ef47e15aa18a9ecc5)

### Qo'llaniladigan fichelarni bitta sahifada direktoriyani ozida saqlasam boladimi? {#can-i-store-the-features-used-on-one-page-directly-in-the-page-directory}

Metadalogiya bunaqa qilishni tavsiya qilmaydi, chunki strukturada har bir modul uchun ozini joyi bor 

Aks holda - proektdagi kod bazasi mukamallashib ketish ehtimoli bor

> *"Hozirda ficha faqatgina bitta sahifada qo'laniladi. Keyingi haftada uch sahifada. Uch oydan so'ng umuman bolmasligi mumkun. Kelajakda nima bo'lishini aytib berolmimiz, va har safar muddatidan oldin optimallashtirishdan voz kechishingiz kerak"*

*Hamda [tutorial](/docs/get-started/tutorial#usual-approach) lardan namunalar ko'rishingiz mumkin*
