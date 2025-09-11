# Hướng nhu cầu

Tóm tắt

— *Không thể đưa ra mục tiêu mà tính năng mới sẽ giải quyết? Hoặc có thể vấn đề là bản thân task không được đưa ra? **Điềm mấu chốt cũng là methodology giúp rút ra định nghĩa có vấn đề của các task và mục tiêu***

— *dự án không sống trong tĩnh - yêu cầu và chức năng liên tục thay đổi. Theo thời gian, code biến thành nhệu, bởi vì lúc bắt đầu dự án chỉ được thiết kế cho ấn tượng ban đầu của mong muốn. **Và nhiệm vụ của một kiến trúc tốt cũng là được mài giũa cho các điều kiện phát triển thay đổi.***

## Tại sao?[​](#tại-sao "Link trực tiếp đến heading")

Để chọn một tên rõ ràng cho một entity và hiểu các thành phần của nó, **bạn cần hiểu rõ task nào sẽ được giải quyết bằng tất cả code này.**

> *@sergeysova: Trong quá trình phát triển, chúng tôi cố gắng đặt cho mỗi entity hoặc function một tên rõ ràng phản ánh ý định và ý nghĩa của code đang được thực thi.*

*Sau cùng, không hiểu task thì không thể viết được test đúng bao phủ những trường hợp quan trọng nhất, đặt các lỗi giúp đỡ người dùng ở đúng chỗ, thậm chí là thiếu không làm gián đoạn luồng của người dùng vì các lỗi không quan trọng có thể sửa được.*

## Chúng ta đang nói về task gì?[​](#chúng-ta-đang-nói-về-task-gì "Link trực tiếp đến heading")

Frontend phát triển ứng dụng và giao diện cho người dùng cuối, nên chúng ta giải quyết các task của những người tiêu dùng này.

Khi một người đến với chúng ta, **anh ta muốn giải quyết một số đau khổ của mình hoặc đóng một nhu cầu.**

*Nhiệm vụ của các manager và analyst là đưa ra nhu cầu này, và triển khai developer tính đến các tính năng của phát triển web (mất kết nối, lỗi backend, typo, nhấm con trỏ hoặc ngón tay).*

**Chính mục tiêu này, mà người dùng đến, là task của các developer.**

> *Một vấn đề nhỏ được giải quyết là một feature trong methodology Feature-Sliced Design — bạn cần cắt toàn bộ phạm vi task của dự án thành các mục tiêu nhỏ.*

## Điều này ảnh hưởng đến phát triển như thế nào?[​](#điều-này-ảnh-hưởng-đến-phát-triển-như-thế-nào "Link trực tiếp đến heading")

### Phân tách task[​](#phân-tách-task "Link trực tiếp đến heading")

Khi một developer bắt đầu triển khai một task, để đơn giản hóa việc hiểu và hỗ trợ code, anh ta trong đầu **cắt nó thành các giai đoạn**:

* đầu tiên *chia thành các entity cấp cao nhất* và *triển khai chúng*,
* sau đó những entity này *chia thành những cái nhỏ hơn*
* và cứ tiếp tục như vậy

*Trong quá trình chia thành các entity, developer bị buộc phải đặt tên cho chúng một cách rõ ràng phản ánh ý tưởng của mình và giúp hiểu task nào code giải quyết khi đọc listing* *Đồng thời, chúng ta không quên rằng chúng ta đang cố gắng giúp người dùng giảm bớt đau khổ hoặc thực hiện nhu cầu*

### Hiểu bản chất của task[​](#hiểu-bản-chất-của-task "Link trực tiếp đến heading")

Nhưng để đặt tên rõ ràng cho một entity, **developer phải biết đủ về mục đích của nó**

* anh ta sẽ sử dụng entity này như thế nào,
* nó triển khai phần nào của task của người dùng, entity này còn có thể được áp dụng ở đâu khác,
* nó có thể tham gia vào những task nào khác,
* và vân vân

Không khó để rút ra kết luận: **trong khi developer sẽ suy ngẫm về tên của các entity trong khuôn khổ của methodology, anh ta sẽ có thể tìm ra các task được đưa ra kém thậm chí trước khi viết code.**

> Làm thế nào đặt tên cho một entity nếu bạn không hiểu rõ những task nào nó có thể giải quyết, làm thế nào bạn có thể chia một task thành các entity nếu bạn không hiểu rõ nó?

## Làm thế nào để đưa ra nó?[​](#làm-thế-nào-để-đưa-ra-nó "Link trực tiếp đến heading")

**Để đưa ra một task được giải quyết bằng các feature, bạn cần hiểu bản thân task đó**, và đây đã là trách nhiệm của project manager và các analyst.

*Methodology chỉ có thể nói cho developer những task nào mà product manager nên chú ý kỹ.*

> *@sergeysova: Toàn bộ frontend chủ yếu là hiển thị thông tin, bất kỳ component nào ở lượt đầu tiên, hiển thị, và sau đó task "hiển thị cho người dùng một cái gì đó" không có giá trị thực tế.*
>
> *Ngay cả khi không tính đến đặc thù của frontend có thể hỏi, "tại sao tôi phải hiển thị cho bạn", và có thể tiếp tục hỏi cho đến khi không thoát được khỏi đau khổ hoặc nhu cầu của người tiêu dùng.*

Người khi chúng ta có thể đến được những nhu cầu hoặc đau khổ cơ bản, chúng ta có thể quay lại và tìm hiểu **chính xác sản phẩm hoặc dịch vụ của bạn có thể giúp người dùng với mục tiêu của họ như thế nào**

Bất kỳ task mới nào trong tracker của bạn đều hướng đến giải quyết các vấn đề kinh doanh, và doanh nghiệp cố gắng giải quyết các task của người dùng đồng thời kiếm tiền từ nó. Điều này có nghĩa là mỗi task đều có những mục tiêu nhất định, ngay cả khi chúng không được viết rõ trong văn bản mô tả.

***Developer phải hiểu rõ mục tiêu mà task này hay task khác đang theo đuổi**, nhưng không phải công ty nào cũng có thể đủ khả năng xây dựng quy trình hoàn hảo, mặc dù đây là một cuộc trò chuyện riêng, tuy nhiên, developer có thể "ping" các manager phù hợp để tìm hiểu điều này và thực hiện phần việc của mình một cách hiệu quả.*

## Và lợi ích là gì?[​](#và-lợi-ích-là-gì "Link trực tiếp đến heading")

Bây giờ hãy nhìn toàn bộ quy trình từ đầu đến cuối.

### 1. Hiểu task của người dùng[​](#1-hiểu-task-của-người-dùng "Link trực tiếp đến heading")

Khi developer hiểu nỗi đau của họ và cách doanh nghiệp giải quyết chúng, anh ta có thể đưa ra các giải pháp mà doanh nghiệp không có do đặc thù của phát triển web.

> Nhưng tất nhiên, tất cả điều này chỉ có thể hoạt động nếu developer không thờ ơ với những gì anh ta đang làm và vì mục đích gì, nếu không thì *tại sao lại cần methodology và các cách tiếp cận?*

### 2. Cấu trúc hóa và sắp xếp[​](#2-cấu-trúc-hóa-và-sắp-xếp "Link trực tiếp đến heading")

Với sự hiểu biết về task đến **một cấu trúc rõ ràng cả trong đầu và trong task cùng với code**

### 3. Hiểu feature và các thành phần của nó[​](#3-hiểu-feature-và-các-thành-phần-của-nó "Link trực tiếp đến heading")

**Một feature là một chức năng hữu ích cho người dùng**

* Khi nhiều features được triển khai trong một feature, đây là **vi phạm ranh giới**
* Feature có thể không thể chia nhỏ và đang phát triển - **và điều này không tệ**
* **Tệ** - khi feature không trả lời câu hỏi *"Giá trị kinh doanh cho người dùng là gì?"*
* Không thể có feature "map-office"
  <!-- -->
  * Nhưng `booking-meeting-on-the-map`, `search-for-an-employee`, `change-of-workplace` - **có**

> *@sergeysova: Điểm mấu chốt là feature chỉ chứa code triển khai chính chức năng*, không có chi tiết không cần thiết và giải pháp nội bộ (lý tưởng)\*
>
> *Mở code feature **và chỉ thấy những gì liên quan đến task** - không hơn*

### 4. Lợi ích[​](#4-lợi-ích "Link trực tiếp đến heading")

Doanh nghiệp rất hiếm khi xoay chuyển hướng đi hoàn toàn sang hướng khác, có nghĩa là **phản ánh các task kinh doanh trong code ứng dụng frontend là lợi ích rất đáng kể.**

*Sau đó bạn không phải giải thích cho mỗi thành viên mới trong team code này hay code kia làm gì, và nói chung tại sao nó được thêm vào - **mọi thứ sẽ được giải thích thông qua các task kinh doanh đã được phản ánh trong code.***

> Cái được gọi là ["Ngôn ngữ kinh doanh" trong Domain Driven Development](https://thedomaindrivendesign.io/developing-the-ubiquitous-language)

***

## Quay lại thực tế[​](#quay-lại-thực-tế "Link trực tiếp đến heading")

Nếu quy trình kinh doanh được hiểu và đặt tên tốt ở giai đoạn thiết kế - *thì không có vấn đề gì đặc biệt khi chuyển sự hiểu biết và logic này vào code.*

**Tuy nhiên, trong thực tế**, task và chức năng thường được phát triển "quá" lặp đi lặp lại và (hoặc) không có thời gian để suy nghĩ kỹ về thiết kế.

**Kết quả là, feature có ý nghĩa hôm nay, và nếu bạn mở rộng feature này trong một tháng, bạn có thể phải viết lại nửa dự án.**

> *\[[Từ cuộc thảo luận](https://t.me/sergeysova/318)]: Developer cố gắng suy nghĩ trước 2-3 bước, tính đến những mong muốn trong tương lai, nhưng ở đây anh ta dựa vào kinh nghiệm của riêng mình*
>
> *Kỹ sư có kinh nghiệm thường ngay lập tức nhìn trước 10 bước, và hiểu nơi nào để chia một feature và kết hợp với feature khác*
>
> *Nhưng đôi khi có những task mà chưa từng gặp trong kinh nghiệm, và không biết lấy đâu ra sự hiểu biết về cách phân tách hợp lý, với hậu quả không mong muốn ít nhất trong tương lai*

## Vai trò của methodology[​](#vai-trò-của-methodology "Link trực tiếp đến heading")

**Methodology giúp giải quyết vấn đề của developers, để dễ dàng hơn giải quyết vấn đề của người dùng.**

Không có giải pháp cho vấn đề của developers chỉ vì lợi ích của developers

Nhưng để developer giải quyết task của mình, **bạn cần hiểu task của người dùng** - ngược lại sẽ không hoạt động

### Yêu cầu của methodology[​](#yêu-cầu-của-methodology "Link trực tiếp đến heading")

Rõ ràng là bạn cần xác định ít nhất hai yêu cầu cho **Feature-Sliced Design**:

1. Methodology nên chỉ ra **cách tạo features, processes và entities**

   * Có nghĩa là nó nên giải thích rõ ràng *cách chia code giữa chúng*, có nghĩa là việc đặt tên các entities này cũng nên được quy định trong specification.

2. Methodology nên giúp kiến trúc **[dễ dàng thích ứng với yêu cầu thay đổi của dự án](/documentation/vi/docs/about/understanding/architecture.md#adaptability)**

## Xem thêm[​](#xem-thêm "Link trực tiếp đến heading")

* [(Bài viết) Kích thích cho việc xây dựng task rõ ràng (+ thảo luận)](https://t.me/sergeysova/318)

  > ***Bài viết hiện tại** là bản chuyển thể của cuộc thảo luận này, bạn có thể đọc phiên bản đầy đủ không cắt tại liên kết*

* [(Thảo luận) Cách chia chức năng và nó là gì](https://t.me/atomicdesign/18972)

* [(Bài viết) "Cách tổ chức ứng dụng của bạn tốt hơn"](https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1)
