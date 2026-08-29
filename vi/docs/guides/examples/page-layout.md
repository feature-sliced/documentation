# Page Layouts

Hướng dẫn này xem xét abstraction của một _page layout_ — khi nhiều pages chia sẻ cùng một cấu trúc tổng thể, và chỉ khác nhau ở main content.

**Note:** Câu hỏi của bạn không được đề cập trong hướng dẫn này? Đăng câu hỏi của bạn bằng cách để lại feedback trên bài viết này (nút xanh ở bên phải) và chúng tôi sẽ cân nhắc mở rộng hướng dẫn này!

## Simple layout

Layout đơn giản nhất có thể được nhìn thấy trên trang bạn đang xem đây. Nó có header với site navigation, hai sidebars, và footer với external links. Không có business logic phức tạp, và các phần dynamic duy nhất là sidebars và switchers ở phía bên phải của header. Layout như vậy có thể được đặt hoàn toàn trong `shared/ui` hoặc trong `app/layouts`, với props điền vào content cho các sidebars:

```tsx title="shared/ui/layout/Layout.tsx"
import { Link, Outlet } from "react-router-dom";
import { useThemeSwitcher } from "./useThemeSwitcher";

export function Layout({ siblingPages, headings }) {
  const [theme, toggleTheme] = useThemeSwitcher();

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/docs">Docs</Link> </li>
            <li> <Link to="/blog">Blog</Link> </li>
          </ul>
        </nav>
        <button onClick={toggleTheme}>{theme}</button>
      </header>
      <main>
        <SiblingPageSidebar siblingPages={siblingPages} />
        <Outlet /> {/* This is where the main content goes */}
        <HeadingsSidebar headings={headings} />
      </main>
      <footer>
        <ul>
          <li>GitHub</li>
          <li>Twitter</li>
        </ul>
      </footer>
    </div>
  );
}
```

```ts title="shared/ui/layout/useThemeSwitcher.ts"
export function useThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, toggleTheme] as const;
}
```

Code của các sidebars được để lại như bài tập cho độc giả 😉.

## Sử dụng widgets trong layout

Thiệng thoảng bạn muốn bao gồm business logic nhất định trong layout, đặc biệt nếu bạn đang sử dụng deeply nested routes với router như [React Router][ext-react-router]. Khi đó bạn không thể lưu trữ layout trong Shared hoặc trong Widgets do [import rule trên các layers][import-rule-on-layers]:

> Một module trong slice chỉ có thể import các slices khác khi chúng được đặt trên các layers ở phía dưới.

Trước khi chúng ta thảo luận các giải pháp, chúng ta cần thảo luận liệu đó có phải là vấn đề ngay từ đầu hay không. Bạn có _thực sự cần_ layout đó không, và nếu có, liệu nó _thực sự cần_ là Widget không? Nếu block business logic đang bàn được tái sử dụng trên 2-3 pages, và layout chỉ đơn giản là wrapper nhỏ cho widget đó, hãy cân nhắc một trong hai lựa chọn này:

1. **Viết layout inline trên layer App, nơi bạn cấu hình routing**  
   Điều này rất tốt cho các routers hỗ trợ nesting, vì bạn có thể nhóm các routes nhất định và chỉ áp dụng layout cho chúng.

2. **Chỉ cần copy-paste nó**  
   Xu hướng abstract code thường bị đánh giá quá cao. Điều này đặc biệt đúng cho các layouts, hiếm khi thay đổi. Tại một thời điểm nào đó, nếu một trong những pages này cần thay đổi, bạn có thể đơn giản thực hiện thay đổi mà không cần thiết ảnh hưởng đến các pages khác. Nếu bạn lo lắng rằng ai đó có thể quên cập nhật các pages khác, bạn luôn có thể để lại comment mô tả mối quan hệ giữa các pages.

Nếu không có điều nào ở trên áp dụng được, có hai giải pháp để bao gồm widget trong layout:

1. **Sử dụng render props hoặc slots**  
   Hầu hết các frameworks cho phép bạn pass một phần UI từ bên ngoài. Trong React, được gọi là [render props][ext-render-props], trong Vue được gọi là [slots][ext-vue-slots].
2. **Chuyển layout đến layer App**  
   Bạn cũng có thể lưu trữ layout của mình trên layer App, ví dụ, trong `app/layouts`, và compose bất kỳ widgets nào bạn muốn.

## Đọc thêm

- Có một ví dụ về cách xây dựng layout với authentication sử dụng React và Remix (tương đương với React Router) trong [tutorial][tutorial].

[tutorial]: /vi/docs/get-started/tutorial
[import-rule-on-layers]: /vi/docs/reference/layers#import-rule-on-layers
[ext-react-router]: https://reactrouter.com/
[ext-render-props]: https://www.patterns.dev/react/render-props-pattern/
[ext-vue-slots]: https://vuejs.org/guide/components/slots
