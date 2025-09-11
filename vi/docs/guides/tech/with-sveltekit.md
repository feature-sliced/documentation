# Sử dụng với SvelteKit

Có thể triển khai FSD trong dự án SvelteKit, nhưng xảy ra xung đột do sự khác biệt giữa yêu cầu cấu trúc của dự án SvelteKit và các nguyên tắc của FSD:

* Ban đầu, SvelteKit cung cấp cấu trúc file bên trong thư mục `src/routes`, trong khi ở FSD thì routing phải là một phần của layer `app`.
* SvelteKit đề xuất đặt mọi thứ không liên quan đến routing trong thư mục `src/lib`.

## Hãy thiết lập config[​](#hãy-thiết-lập-config "Link trực tiếp đến heading")

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
      routes: 'src/app/routes',             // move routing inside the app layer
      lib: 'src',
      appTemplate: 'src/app/index.html',    // Move the application entry point inside the app layer
      assets: 'public'
    },
    alias: {
      '@/*': 'src/*'                        // Create an alias for the src directory
    }
  }
};
export default config;
```

## Di chuyển file routing vào `src/app`.[​](#di-chuyển-file-routing-vào-srcapp "Link trực tiếp đến heading")

Hãy tạo một layer app, di chuyển điểm đầu vào `index.html` của app vào đó, và tạo một thư mục routes. Vậy, cấu trúc file của bạn nên trông như thế này:

```
├── src
│   ├── app
│   │   ├── index.html
│   │   ├── routes
│   ├── pages                               # FSD Pages folder
```

Bây giờ, bạn có thể tạo các route cho pages trong `app` và kết nối các page từ `pages` với chúng.

Ví dụ, để thêm một home page vào dự án của bạn, bạn cần thực hiện các bước sau:

* Thêm một page slice bên trong layer `pages`
* Thêm route tương ứng vào thư mục `routes` từ layer `app`
* Canh chỉnh page từ slice với route

Để tạo một page slice, hãy sử dụng [CLI](https://github.com/feature-sliced/cli):

```
fsd pages home
```

Tạo file `home-page.svelte` bên trong segment ui, truy cập nó bằng Public API

src/pages/home/index.ts

```
export { default as HomePage } from './ui/home-page.svelte';
```

Tạo một route cho page này bên trong layer `app`:

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

Thêm page component của bạn vào bên trong file `+page.svelte`:

src/app/routes/+page.svelte

```
<script>
  import { HomePage } from '@/pages/home';
</script>


<HomePage/>
```

## Xem thêm[​](#xem-thêm "Link trực tiếp đến heading")

* [Documentation on changing directory config in SvelteKit](https://kit.svelte.dev/docs/configuration#files)
