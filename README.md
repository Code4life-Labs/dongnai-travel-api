<div>
    <h1>
        <a align="left"><img src="https://i.ibb.co/SQWy8xC/logo-big.png" alt="DONGNAITRRAVEL-Logo" style="width: 80px; float: left; margin-right: 1rem" border="0"></a>
        DONG NAI TRAVEL
        <br>
        Cẩm nang du lịch cho mọi người
    </h1>
</div>

Ứng dụng được xây dựng cho mục đích tham gia **cuộc thi Sáng tạo Khoa học Kĩ thuật** tỉnh Đồng Nai - 2023 và là đồ án tốt nghiệp 2024.

Giải pháp đạt được giải **Khuyến khích** chung cuộc. Xem thêm thông tin [tại đây](https://drive.google.com/file/d/1rtrAE14D4_O47xg_cKyicr1dSMoTsqJe/view?usp=sharing).

## Hướng dẫn thiết lập và cài đặt

Phần hướng dẫn này sẽ tập trung vào cho môi trường phát triển, và nó cũng tương tự trong trường hợp các thành phần trong backend thay đổi. Ví dụ như hiện tại trong môi trường phát triển thì Server và Database sẽ là các containers trong một network. Nhưng khi lên production thì sẽ có thể có một vài sự thay đổi.

- **Server** có thể chạy ở trong một máy ảo thay vì là container.
- **Server** có thể vẫn chạy ở trong một container trong một máy ảo.
- **Server** có thể chạy ở trong một container, nhưng là ở trong một dịch vụ điện toán nào đó.
- **Database** có thể chạy ở trong một máy ảo thay vì là container.
- **Database** có thể chạy ở trong một container trong một máy ảo, có thể chạy ở cùng máy ảo với server.
- **Database** có thẻ chạy ở trong một dịch vụ điện toán đám mây chuyên giải quyết các vấn đề về database.
- **Database** có thể chạy ở trong một dịch vụ được cung cấp bởi chính hạ tầng của nhà duy trình & phát triển database đó.

Nhưng dù là cách triển khai nào đi chăng nữa, thì mình chỉ cần quan tâm tới những thứ như sau:

- File `database/scripts/init.js` dùng trong quá trình khởi tạo của MongoDB để tạo các dữ liệu mặc định (bất kể là trong máy ảo hay container).
- File `server/secrets` là thư mục chứa các thông tin được bảo vệ, về phần này thì các bạn có thể hỏi nhóm tác giả để biết thêm thông tin chi tiết.
- File `server/src/db.config.json` là file chứa các cấu hình để giao tiếp với cơ sở dữ liệu, rất quan trọng. Để đảm bảo cho server có thể kết nối được tới database, thì mình phải đảm bảo được các cấu hình trong file này phù hợp với các yêu cầu của database server đang chạy.

Ở trong môi trường phát triển thì mình không cần quan tâm tới `server/src/db.config.json` nhưng vẫn cần `server/src/db.config.json` để chạy được. Để có thể chạy được thì cần phải cài Docker hoặc Docker Desktop hoặc Podman ở trong máy, sau đó làm theo các bước hướng dẫn sau:

1. Với **Docker** trong Linux:

   - CD vào trong gốc của thư mục dự án.
   - Gõ lệnh `docker compose -f docker-compose.dev.yml up -d`.
   - Xong.

2. Với **Docker Deskop** trong Linux hoặc Windows:

   - Khởi động Docker Desktop.
   - CD vào trong gốc của thư mục dự án.
   - Gõ lệnh `docker compose -f docker-compose.dev.yml up -d`.
   - Xong.

3. Với **Podman** trong Linux hoặc trong WSL của Windows:

   - CD vào trong gốc của thư mục dự án.
   - Gõ lệnh `podman compose -f docker-compose.dev.yml up -d`.
   - Xong.

4. Với **Podman** trong Windows (thằng này hơi lỗi ở đoạn start container):

   - CD vào trong gốc của thư mục dự án.
   - Gõ lệnh `podman compose -f docker-compose.dev.yml up -d`.
   - Gõ lệnh `podman ps -a` để xem tất cả các containers, bao gồm các containers đang dừng.
   - Xong start lần lượt Database và Server như sau:
     - Database: `podman start <container-name>` (thường tên là **dongnai-travel-api_database_1**).
     - Server: `podman start -ia <container-name>` (thường tên là **dongnai-travel-api_server_1**).
   - Xong.

Note: để có thể xài được podman compose thì mình phải cài `podman-compose` qua thư viện python `pip install podman-compose`.

## Demo

Xem [tại đây](https://www.youtube.com/watch?v=6lMZkIQiZ68)

## Thông tin

Hỗ trợ khám phá các địa điểm du lịch ở Đồng Nai, đồng thời người dùng có thể chia sẻ được các trải nghiệm của người dùng thông qua các bài viết và quản lý hồ sơ cá nhân... Hơn thế nữa, người dùng còn có thể dùng Travel Bot để tham khảo lộ trình, kế hoạch đi du lịch; xem thông tin về thời tiết; xem lộ trình đường đi với Map tích hợp.

**Công nghệ**: `React-Native`, `NodeJS`, `Express`, `MongoDB`, `GoogleAPI`, `Cloudinary`, `GPT` , các thư viện khác của React Native, NodeJS.

**Thời gian**: từ tháng 02 - tới tháng 07 năm 2023.

**Người tham gia**:

- Thái Anh Đức, [xem thêm](https://github.com/ThaiAnhDuc02).
- Lương Văn Pháp, [xem thêm](https://github.com/phapdev).
- Từ Nhật Phương, [xem thêm](https://github.com/FromSunNews).
- Nguyễn Anh Tuấn, [xem thêm](https://github.com/NguyenAnhTuan1912).
- Nguyễn Thị Liệu (giảng viên hướng dẫn).
- Lê Nhật Tùng (giảng viên hướng dẫn).

## Các chức năng chính

Giới thiệu sơ qua các chức năng chính của ứng dụng. Ứng dụng được chia ra làm 4 chức năng chính, trong đó:

- Xem các thông tin mới nhất về địa điểm, bài viết, sự kiện. Ngoài ra thì người dùng có thể lưu thông tin địa điểm, bài viết.
- Tìm lộ trình đi tới điểm điểm, xem các thông tin chi tiết về địa điểm.
- Đọc, nghe thông tin về địa điểm, bài viết.
- Sử dụng Travel Bot để tham khảo, tạo lộ trình, kế hoạch đi du lịch.

## Tài liệu liệu quan

- Tài liệu chính, [tại đây](https://docs.google.com/document/d/1KdUV5ahihEOVYrn73MnY4GPgdbXIl4ou/edit?usp=sharing&ouid=102396661633118680496&rtpof=true&sd=true).
- Các issues của dự án, [tại đây](https://github.com/FromSunNews/DongNaiTravelApp/issues).
- Inforgraphic, [tại đây](https://www.behance.net/gallery/177198847/DongNaiTravel-App).

## Tài liệu kỹ thuật

- Cloudinary Document for NodeJS (2023). Nguồn: [https://cloudinary.com/documentation/node_integration](https://cloudinary.com/documentation/node_integration)
- Expo Document (2023). Nguồn: [https://docs.expo.dev](https://docs.expo.dev)
- Google API Document (2023). Nguồn: [https://developers.google.com/workspace/products](https://developers.google.com/workspace/products)
- React Document (2023). Nguồn: [https://react.dev](https://react.dev/)
- React-Native Document (2023). Nguồn: [https://reactnative.dev](https://reactnative.dev)
- React-Navigation Document (2023). Nguồn: [https://reactnavigation.org](https://reactnavigation.org)
