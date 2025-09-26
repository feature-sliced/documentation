---
sidebar_position: 2
---

# Động lực

Ý tưởng chính của **Feature-Sliced Design** là tạo điều kiện thuận lợi và giảm chi phí phát triển các dự án phức tạp và được phát triển, dựa trên việc [kết hợp kết quả nghiên cứu, thảo luận kinh nghiệm của các loại developer khác nhau trong phạm vi rộng][ext-discussions].

Hiển nhiên, đây sẽ không phải là giải pháp vạn năng, và tất nhiên, phương pháp này sẽ có [giới hạn khả năng áp dụng][refs-mission] riêng của mình.

Tuy nhiên, có những câu hỏi hợp lý về *tính khả thi của một phương pháp như vậy nói chung*

:::note

Chi tiết hơn [được thảo luận trong cuộc thảo luận][disc-src]

:::

## Tại sao các giải pháp hiện có không đủ?
<!--TODO: #existing-solutions -->
> Thường là những lập luận này:
>
> - *"Tại sao bạn cần một methodology mới, khi đã có những phương pháp và nguyên tắc thiết kế lâu đời như `SOLID`, `KISS`, `YAGNI`, `DDD`, `GRASP`, `DRY`, v.v."*
> - *"Tất cả các vấn đề được giải quyết bằng tài liệu dự án tốt, test và quy trình có cấu trúc"*
> - *"Các vấn đề sẽ không xảy ra nếu tất cả developer đều tuân theo những điều trên"*
> - *"Mọi thứ đã được phát minh trước bạn, bạn chỉ không biết sử dụng nó"*
> - *"Hãy lấy \{FRAMEWORK_NAME\} - mọi thứ đã được quyết định sẵn cho bạn ở đó"*

### Chỉ có nguyên tắc là chưa đủ

**Việc tồn tại các nguyên tắc là chưa đủ để thiết kế một kiến trúc tốt**

Không phải ai cũng biết chúng một cách hoàn toàn, thậm chí ít người hơn hiểu và áp dụng chúng một cách chính xác

*Các nguyên tắc thiết kế quá chung chung, và không đưa ra câu trả lời cụ thể cho câu hỏi: "Làm thế nào để thiết kế cấu trúc và kiến trúc của một ứng dụng có thể mở rộng và linh hoạt?"*

### Quy trình không phải lúc nào cũng hiệu quả

*Tài liệu/Test/Quy trình* tất nhiên là tốt, nhưng tiếc thay, ngay cả với chi phí cao cho chúng - **chúng không phải lúc nào cũng giải quyết được các vấn đề do kiến trúc đặt ra và việc đưa người mới vào dự án**

- Thời gian để mỗi developer tham gia vào dự án không được giảm đáng kể, bởi vì tài liệu thường sẽ trở nên khổng lồ / lỗi thời
- Liên tục đảm bảo rằng mọi người hiểu kiến trúc theo cùng một cách - điều này cũng đòi hỏi một lượng tài nguyên khổng lồ
- Đừng quên về bus-factor

### Các framework hiện có không thể áp dụng ở mọi nơi

- Các giải pháp hiện có thường có ngưỡng vào cao, điều này khiến việc tìm kiếm developer mới trở nên khó khăn
- Ngoài ra, phần lớn thời gian, việc lựa chọn công nghệ đã được xác định trước khi các vấn đề nghiêm trọng trong dự án xuất hiện, và do đó bạn cần có khả năng "làm việc với những gì có sẵn" - **mà không bị ràng buộc vào công nghệ**

> Q: *"Trong dự án của tôi `React/Vue/Redux/Effector/Mobx/{YOUR_TECH}` - làm thế nào tôi có thể xây dựng tốt hơn cấu trúc của các entity và mối quan hệ giữa chúng?"*

### Kết quả

Chúng ta nhận được các dự án *"độc đáo như bông tuyết"*, mỗi dự án đều đòi hỏi nhân viên phải học hỏi lâu dài, và kiến thức không chắc có thể áp dụng được cho dự án khác

> @sergeysova: *"Đây chính xác là tình huống hiện tại tồn tại trong lĩnh vực phát triển frontend của chúng ta: mỗi lead sẽ phát minh ra các kiến trúc và cấu trúc dự án khác nhau, trong khi không chắc rằng những cấu trúc này sẽ vượt qua được thử thách thời gian, kết quả là tối đa hai người có thể phát triển dự án ngoài anh ta, và mỗi developer mới cần phải được hướng dẫn lại từ đầu."*

## Tại sao các developer cần methodology?

### Tập trung vào các tính năng kinh doanh, không phải vấn đề kiến trúc

Methodology cho phép bạn tiết kiệm tài nguyên trong việc thiết kế một kiến trúc có thể mở rộng và linh hoạt, thay vào đó hướng sự chú ý của các developer vào việc phát triển chức năng chính. Đồng thời, các giải pháp kiến trúc được tiêu chuẩn hóa từ dự án này sang dự án khác.

*Một câu hỏi riêng là methodology nên giành được sự tin tưởng của cộng đồng, để một developer khác có thể làm quen với nó và dựa vào nó trong việc giải quyết các vấn đề của dự án trong thời gian có sẵn*

### Giải pháp đã được kiểm chứng bằng kinh nghiệm

Methodology được thiết kế cho các developer hướng tới *một giải pháp đã được chứng minh cho việc thiết kế logic kinh doanh phức tạp*

*Tuy nhiên, rõ ràng là methodology nói chung là về một tập hợp các best-practice, bài viết giải quyết các vấn đề và trường hợp nhất định trong quá trình phát triển. Do đó, methodology cũng sẽ hữu ích cho các developer khác - những người bằng cách nào đó gặp phải vấn đề trong quá trình phát triển và thiết kế*

### Sức khỏe dự án

Methodology sẽ cho phép *giải quyết và theo dõi các vấn đề của dự án trước, mà không đòi hỏi một lượng lớn tài nguyên*

**Phần lớn thời gian, nợ kỹ thuật tích tụ và tích tụ theo thời gian, và trách nhiệm giải quyết nó nằm ở cả lead và team**

Methodology sẽ cho phép bạn *cảnh báo* trước các vấn đề có thể xảy ra trong việc mở rộng và phát triển dự án

## Tại sao doanh nghiệp cần một methodology?

### Onboarding nhanh chóng

Với methodology, bạn có thể thuê một người vào dự án **đã quen thuộc với cách tiếp cận này trước đó, và không cần đào tạo lại**

*Mọi người bắt đầu hiểu và đóng góp cho dự án nhanh hơn, và có thêm bảo đảm để tìm người cho các lần lặp tiếp theo của dự án*

### Giải pháp đã được kiểm chứng bằng kinh nghiệm

Với methodology, doanh nghiệp sẽ có *giải pháp cho hầu hết các vấn đề phát sinh trong quá trình phát triển hệ thống*

Vì phần lớn thời gian doanh nghiệp muốn có một framework / giải pháp có thể giải quyết phần lớn các vấn đề trong quá trình phát triển dự án

### Khả năng áp dụng cho các giai đoạn khác nhau của dự án

Methodology có thể mang lại lợi ích cho dự án *cả ở giai đoạn hỗ trợ và phát triển dự án, và ở giai đoạn MVP*

Vâng, điều quan trọng nhất đối với MVP là *"các tính năng, không phải kiến trúc được đặt nền cho tương lai"*. Nhưng ngay cả trong điều kiện deadline hạn chế, việc biết các best-practice từ methodology, bạn có thể *"làm với ít máu"*, khi thiết kế phiên bản MVP của hệ thống, tìm ra một sự thỏa hiệp hợp lý
(thay vì mô hình hóa các tính năng "một cách ngẫu nhiên")

*Điều tương tự có thể nói về testing*

## Khi nào methodology của chúng tôi không cần thiết?

- Nếu dự án sẽ tồn tại trong thời gian ngắn
- Nếu dự án không cần kiến trúc được hỗ trợ
- Nếu doanh nghiệp không nhận thấy mối liên kết giữa code base và tốc độ phát triển tính năng
- Nếu đối với doanh nghiệp việc đóng các đơn hàng càng sớm càng tốt, mà không cần hỗ trợ thêm

### Qôy mô doanh nghiệp

- **Doanh nghiệp nhỏ** - thường cần một giải pháp có sẵn và rất nhanh. Chỉ khi doanh nghiệp phát triển (ít nhất là gần trung bình), họ mới hiểu rằng để khách hàng tiếp tục sử dụng, cần thiết, trong số những điều khác, là dành thời gian cho chất lượng và tính ổn định của các giải pháp đang được phát triển
- **Doanh nghiệp vừa** - thường hiểu tất cả các vấn đề của phát triển, và ngay cả khi cần thiết *"đua tốc để có các tính năng"*, họ vẫn dành thời gian cho việc cải thiện chất lượng, refactoring và test (và tất nhiên - cho kiến trúc có thể mở rộng)
- **Doanh nghiệp lớn** - thường đã có đối tượng rộng rãi, nhân sự, và một tập hợp các thực hành rộng rãi hơn nhiều, và có thể thậm chí có cách tiếp cận kiến trúc riêng của họ, nên ý tưởng sử dụng của người khác không đến với họ thường xuyên

## Kế hoạch

Phần chính của các mục tiêu [được trình bày ở đây][refs-mission--goals], nhưng ngoài ra, đáng nói về kỳ vọng của chúng tôi từ methodology trong tương lai

### Kết hợp kinh nghiệm

Hiện tại chúng tôi đang cố gắng kết hợp tất cả kinh nghiệm đa dạng của `core-team`, và có được một methodology được rèn luyện bằng thực hành

Tất nhiên, kết quả có thể là Angular 3.0, nhưng quan trọng hơn ở đây là **nghiên cứu chính vấn đề thiết kế kiến trúc của các hệ thống phức tạp**

*Và vâng - chúng tôi có phàn nàn về phiên bản hiện tại của methodology, nhưng chúng tôi muốn làm việc cùng nhau để đi đến một giải pháp duy nhất và tối ưu (tính đến, trong số những điều khác, kinh nghiệm của cộng đồng)*

### Cuộc sống ngoài specification

Nếu mọi thứ điễn ra tốt, thì methodology sẽ không chỉ giới hạn trong specification và toolkit

- Có thể sẽ có báo cáo, bài viết
- Có thể có `CODE_MOD` cho việc migration sang các công nghệ khác của các dự án được viết theo methodology
- Có thể kết quả là chúng ta sẽ có thể tiếp cận được các maintainer của các giải pháp công nghệ lớn
  - *Đặc biệt cho React, so với các framework khác - đây là vấn đề chính, vì nó không nói cách giải quyết những vấn đề nhất định*

## Xem thêm

- [(Thảo luận) Không cần methodology?][disc-src]
- [Về sứ mệnh của methodology: mục tiêu và giới hạn][refs-mission]
- [Các loại kiến thức trong dự án][refs-knowledge]

[refs-mission]: /docs/about/mission
[refs-mission--goals]: /docs/about/mission#goals
[refs-knowledge]: /docs/about/understanding/knowledge-types

[disc-src]: https://github.com/feature-sliced/documentation/discussions/27
[ext-discussions]: https://github.com/feature-sliced/documentation/discussions
