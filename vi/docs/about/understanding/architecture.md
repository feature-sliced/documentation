# Về kiến trúc

## Các vấn đề[​](#các-vấn-đề "Link trực tiếp đến heading")

Thường thì cuộc trò chuyện về kiến trúc được nêng lên khi việc phát triển dừng lại do một số vấn đề nhất định trong dự án.

### Bus-factor & Onboarding[​](#bus-factor--onboarding "Link trực tiếp đến heading")

Chỉ có một số lượng hạn chế người hiểu dự án và kiến trúc của nó

**Ví dụ:**

* *"Khó đưa người vào phát triển"*
* *"Đối với mọi vấn đề, mọi người đều có ý kiến riêng về cách giải quyết" (hãy ghen tị với angular)*
* *"Tôi không hiểu chuyện gì đang xảy ra trong khối monolith lớn này"*

### Hậu quả ngầm định và không kiểm soát được[​](#hậu-quả-ngầm-định-và-không-kiểm-soát-được "Link trực tiếp đến heading")

Nhiều tác dụng phụ ngầm định trong quá trình phát triển/refactoring *("tất cả đều phụ thuộc vào nhau")*

**Ví dụ:**

* *"Feature import feature"*
* *"Tôi cập nhật store của một trang, và chức năng ở trang khác bị rơi"*
* *"Logic bị tráng đầy khắp ứng dụng, và không thể theo dõi được đâu là đầu, đâu là cuối"*

### Tái sử dụng logic không kiểm soát được[​](#tái-sử-dụng-logic-không-kiểm-soát-được "Link trực tiếp đến heading")

Khó khăn trong việc tái sử dụng/sửa đổi logic hiện có

Đồng thời, thường có [hai thái cực](https://github.com/feature-sliced/documentation/discussions/14):

* Hoặc logic được viết hoàn toàn từ đầu cho mỗi module *(với khả năng lặp lại trong codebase hiện có)*
* Hoặc có xu hướng chuyển tất-tất cả các module đã triển khai vào thư mục `shared`, từ đó tạo ra một kho chứa lớn các module *từ nó (trong đó hầu hết chỉ được sử dụng ở một nơi)*

**Ví dụ:**

* *"Tôi có **N** cách triển khai cùng một logic kinh doanh trong dự án của mình, mà tôi vẫn phải trả giá"*
* *"Có 6 component khác nhau của button/pop-up/... trong dự án"*
* *"Kho chứa các helper"*

## Yêu cầu[​](#yêu-cầu "Link trực tiếp đến heading")

Do đó, có vẻ hợp lý khi trình bày các *yêu cầu mong muốn cho một kiến trúc lý tưởng:*

ghi chú

Bất cứ đâu nói "dễ dàng", điều đó có nghĩa là "tương đối dễ dàng cho một nhóm rộng các developer", vì rõ ràng là [sẽ không thể tạo ra một giải pháp lý tưởng cho tất cả mọi người](/documentation/vi/docs/about/mission.md#limitations)

### Tính rõ ràng[​](#tính-rõ-ràng "Link trực tiếp đến heading")

* Nên **dễ dàng nắm vững và giải thích** dự án và kiến trúc của nó cho team
* Cấu trúc nên phản ánh **giá trị kinh doanh thực tế của dự án**
* Phải có **tác dụng phụ và kết nối** rõ ràng giữa các abstraction
* Nên **dễ phát hiện logic trùng lặp** mà không can thiệp vào các triển khai độc đáo
* Không nên có **sự phân tán logic** khắp dự án
* Không nên có **quá nhiều abstraction và quy tắc khác biệt** cho một kiến trúc tốt

### Kiểm soát[​](#kiểm-soát "Link trực tiếp đến heading")

* Một kiến trúc tốt nên **tăng tốc giải quyết các tác vụ, việc đưa vào các tính năng**

* Nên có thể kiểm soát quá trình phát triển dự án

* Nên dễ dàng **mở rộng, sửa đổi, xóa code**

* Phải tuân thủ việc **phân tách và cô lập** chức năng

* Mỗi component của hệ thống phải **dễ dàng thay thế và loại bỏ**

  * *[Không cần tối ưu hóa cho thay đổi](https://youtu.be/BWAeYuWFHhs?t=1631) - chúng ta không thể dự đoán tương lai*
  * *[Tốt hơn là tối ưu hóa cho việc xóa](https://youtu.be/BWAeYuWFHhs?t=1666) - dựa trên bối cảnh đã tồn tại*

### Khả năng thích ứng[​](#khả-năng-thích-ứng "Link trực tiếp đến heading")

* Một kiến trúc tốt nên có thể áp dụng **cho hầu hết các dự án**

  * *Với các giải pháp hạ tầng hiện có*
  * *ở bất kỳ giai đoạn phát triển nào*

* Không nên phụ thuộc vào framework và nền tảng

* Nên có thể **dễ dàng mở rộng dự án và team**, với khả năng song song hóa phát triển

* Nên dễ dàng **thích ứng với các yêu cầu và hoàn cảnh thay đổi**

## Xem thêm[​](#xem-thêm "Link trực tiếp đến heading")

* [(React Berlin Talk) Oleg Isonen - Feature Driven Architecture](https://youtu.be/BWAeYuWFHhs)
* [(React SPB Meetup #1) Sergey Sova - Feature Slice](https://t.me/feature_slices)
* [(Bài viết) Về việc modular hóa dự án](https://alexmngn.medium.com/why-react-developers-should-modularize-their-applications-d26d381854c1)
* [(Bài viết) Về Separation of Concern và cấu trúc theo feature](https://ryanlanciaux.com/blog/2017/08/20/a-feature-based-approach-to-react-development/)
