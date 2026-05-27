# Hướng dẫn Build Ứng dụng FE2 (Android & iOS)

Tài liệu này hướng dẫn chi tiết cách build (đóng gói) ứng dụng di động **FE2** sử dụng **Expo Application Services (EAS)** hoặc **Build Cục bộ (Local Build)**.

> ℹ️ **Thông tin:**
> Bạn đã hoàn tất cấu hình định danh ứng dụng (`app.json`), cài đặt `eas-cli` và đăng nhập thành công vào tài khoản Expo `minhnghiabt179`. Dự án đã sẵn sàng để tiến hành đóng gói.

---

## 🗺️ Tóm tắt các Profile Build (trong `eas.json`)

Chúng ta cấu hình 3 môi trường đóng gói chính:
- **`development`**: Tạo bản cài đặt để kiểm thử trực tiếp (Development Client) hỗ trợ Hot Reload và nạp code trực tiếp từ máy của bạn.
- **`preview`**: Tạo bản cài đặt dùng thử nội bộ. 
  - **Android**: Xuất trực tiếp file **`.apk`** để tải về cài đặt ngay.
  - **iOS**: Xuất bản Simulator hoặc Ad-hoc.
- **`production`**: Tạo bản cài đặt chính thức để phát hành lên cửa hàng ứng dụng.
  - **Android**: Xuất file **`.aab`** để upload lên Google Play Console.
  - **iOS**: Xuất file **`.ipa`** để upload lên App Store Connect (TestFlight).

---

## ☁️ CÁCH 1: Build trên Cloud của Expo (Khuyên Dùng)

Phương pháp này không tốn tài nguyên máy của bạn và không yêu cầu cài đặt Android Studio hay Xcode phức tạp.

### 1. Build Android (Xuất file APK cài trực tiếp)

Để tạo ra file **`.apk`** và cài đặt trên bất kỳ điện thoại Android nào để test:

```bash
eas build --platform android --profile preview
```

> 💡 **Mẹo:**
> Sau khi build hoàn tất, Expo sẽ hiển thị một **mã QR** và **đường dẫn tải xuống** trực tiếp trên Terminal. Bạn chỉ cần quét mã QR bằng camera điện thoại là có thể tải file `.apk` về cài đặt ngay lập tức.

### 2. Build Android (Xuất file AAB để đưa lên CH Play)

Khi ứng dụng đã hoàn thiện và bạn muốn đưa lên cửa hàng Google Play:

```bash
eas build --platform android --profile production
```

---

### 3. Build iOS (Chạy trên giả lập Simulator của macOS)

Nếu bạn muốn tạo một bản build chạy trên trình giả lập Xcode Simulator trên máy Mac của bạn hoặc của đồng nghiệp:

```bash
eas build --platform ios --profile preview
```

### 4. Build iOS (Để tải lên App Store / TestFlight)

> ⚠️ **Chú ý:**
> Quy trình này yêu cầu bạn có tài khoản **Apple Developer Account (Cá nhân hoặc Doanh nghiệp - phí $99/năm)**.

Khi tiến hành đóng gói chính thức cho iOS:

```bash
eas build --platform ios --profile production
```
*Lưu ý: EAS sẽ tự động hỏi thông tin đăng nhập Apple ID của bạn để cấu hình chứng chỉ (Certificates) và Provisioning Profiles tự động.*

---

## 💻 CÁCH 2: Build Cục bộ (Local Build - Miễn phí)

Nếu bạn không muốn sử dụng máy chủ Cloud của Expo hoặc hết giới hạn lượt build miễn phí hàng tháng, bạn có thể build trực tiếp trên máy của mình.

### 1. Build APK Android cục bộ

Yêu cầu máy bạn đã cài sẵn **Java SDK (JDK)** và **Android SDK (Android Studio)**.

Chạy lệnh để sinh ra file APK nằm ngay trong thư mục cục bộ của bạn:

```bash
eas build --platform android --profile preview --local
```
*Hoặc sử dụng lệnh run trực tiếp của Expo:*
```bash
npx expo run:android --variant release
```
> File APK sau khi build thành công sẽ nằm tại đường dẫn:  
> `android/app/build/outputs/apk/release/app-release.apk`

---

### 2. Build iOS Simulator cục bộ

> ⚠️ **Yêu cầu:**
> Chỉ hỗ trợ trên hệ điều hành **macOS** đã cài đặt **Xcode** và **CocoaPods**.

Chạy lệnh build Simulator cục bộ bằng EAS:
```bash
eas build --platform ios --profile preview --local
```
Hoặc build và khởi chạy trực tiếp trên giả lập Mac bằng lệnh:
```bash
npx expo run:ios --configuration Release
```

---

## ✈️ Hướng dẫn đẩy ứng dụng lên TestFlight (iOS)

**TestFlight** là nền tảng của Apple để phân phối các bản thử nghiệm nội bộ và bên ngoài cho thiết bị iOS trước khi phát hành chính thức lên App Store.

### 📋 Điều kiện cần chuẩn bị
- **Tài khoản Apple Developer**: Bạn phải có tài khoản lập trình viên trả phí của Apple ($99/năm).
- **Quyền quản trị viên**: Tài khoản Apple Developer của bạn phải có quyền *Account Holder*, *Admin*, hoặc *App Manager*.

---

### Cách 1: Tự động Build và Gửi thẳng lên TestFlight (Nhanh & Khuyên Dùng)

Đây là cách đơn giản nhất. Một lệnh duy nhất sẽ tiến hành build ứng dụng trên Cloud của Expo và tự động tải lên TestFlight ngay sau khi build thành công:

```bash
eas build --platform ios --profile production --auto-submit
```

- **Quy trình hoạt động**:
  1. EAS bắt đầu build ứng dụng bản Production.
  2. EAS sẽ hỏi thông tin tài khoản Apple Developer của bạn (hoặc khóa App Store Connect API Key) để tự động cấu hình các chứng chỉ ký số (App Signing).
  3. Sau khi build xong và xuất ra file `.ipa`, EAS sẽ tự động đẩy bản build này lên App Store Connect (TestFlight).

---

### Cách 2: Gửi một bản build có sẵn lên TestFlight

Nếu bạn đã chạy lệnh build trước đó (`eas build --platform ios --profile production`), bạn không cần build lại mà chỉ cần đẩy bản build đó lên:

```bash
eas submit --platform ios
```

- **Quy trình hoạt động**:
  1. Lệnh này sẽ hiển thị danh sách các bản build production gần nhất của bạn trên Expo.
  2. Bạn chọn bản build mong muốn.
  3. EAS CLI sẽ tiến hành tải bản build đó lên App Store Connect.

---

### Cách 3: Upload thủ công bằng ứng dụng Transporter (Dành cho máy Mac)

Nếu bạn muốn kiểm soát hoàn toàn quy trình tải lên hoặc gặp lỗi trong quá trình tự động hóa:

1. Truy cập vào trang quản lý của bạn trên [expo.dev](https://expo.dev).
2. Tìm bản build production thành công và tải file **`.ipa`** về máy Mac của bạn.
3. Lên Mac App Store, tìm và tải xuống ứng dụng **Transporter** (của chính Apple cung cấp miễn phí).
4. Mở ứng dụng Transporter, đăng nhập bằng Apple ID (Developer) của bạn.
5. Kéo thả file `.ipa` đã tải vào Transporter và nhấn **Deliver (Gửi)**.

---

### ⏱️ Lưu ý quan trọng sau khi tải lên thành công

1. **Trạng thái Processing (Đang xử lý)**: Sau khi tải lên thành công, bản build sẽ chưa xuất hiện ngay trên ứng dụng TestFlight. Bạn cần chờ **5 đến 15 phút** để Apple xử lý và quét mã nguồn (Processing). Bạn sẽ nhận được một email từ Apple thông báo khi quá trình này hoàn tất.
2. **Khai báo thông tin Mã hóa (Missing Compliance)**:
   - Khi bản build chuyển sang trạng thái sẵn sàng, thường sẽ có cảnh báo màu vàng yêu cầu xác nhận về việc ứng dụng của bạn có sử dụng công nghệ mã hóa đặc biệt hay không.
   - Nhấp vào bản build trên App Store Connect, chọn **Provide Export Compliance Information** và chọn **No** (nếu ứng dụng chỉ sử dụng giao thức HTTPS thông thường). Bản build sẽ lập tức khả dụng để cài đặt trên TestFlight.
3. **Mời Người dùng Test**:
   - **Internal Testing**: Thêm tối đa 100 thành viên trong nhóm của bạn (những người có vai trò trong App Store Connect). Bản build sẽ có hiệu lực ngay lập tức.
   - **External Testing**: Thêm người kiểm thử bên ngoài qua email hoặc link công khai (cần Apple duyệt sơ bộ từ 1 - 24 giờ).

---

## 🚀 Hướng dẫn phát hành lên Google Play Store (CH Play) & App Store

Sau khi đã hoàn tất quá trình đóng gói bản Production, đây là các bước chi tiết để bạn đưa ứng dụng lên các kho ứng dụng chính thức.

---

### 1. Phát hành lên Google Play Store (CH Play)

#### 📋 Điều kiện chuẩn bị
- **Tài khoản Google Play Developer**: Chi phí đăng ký là $25 (chỉ trả 1 lần duy nhất).
- **Tạo ứng dụng mới**: Đăng nhập vào [Google Play Console](https://play.google.com/console/), nhấp **Create app**, nhập thông tin cơ bản (Tên app, Quốc gia mặc định, Miễn phí/Trả phí).

#### ⚠️ LƯU Ý QUAN TRỌNG CHO LẦN ĐẦU TIÊN (BẮT BUỘC LÀM THỦ CÔNG)
Google Play API yêu cầu bạn phải tải bản build đầu tiên lên hệ thống **bằng tay** trước khi cấp quyền cho các công cụ tự động hóa như EAS.

1. **Build bản Production**:
   ```bash
   eas build --platform android --profile production
   ```
2. **Tải file `.aab`**: Sau khi hoàn thành, truy cập trang quản lý dự án trên `expo.dev` và tải file **`.aab`** về máy tính của bạn.
3. **Upload thủ công**: Trên Google Play Console, đi tới mục **Testing** -> **Internal testing** (Kiểm thử nội bộ) hoặc **Production**, tạo một Release mới và tải file `.aab` lên.
4. **Điền thông tin khảo sát**: Hoàn thành các bảng khảo sát bắt buộc của Google (Chính sách nội dung ứng dụng, bảo mật dữ liệu, v.v.).

#### Cấu hình tự động đẩy (cho các lần tiếp theo)
Từ lần build thứ 2, bạn có thể tự động đẩy lên CH Play thông qua EAS:
1. Tạo một **Google Service Account** trên Google Cloud và tải file key JSON về (EAS CLI sẽ tự hướng dẫn bạn làm việc này).
2. Chạy lệnh để EAS tự động liên kết và đẩy ứng dụng:
   ```bash
   eas submit --platform android
   ```
   *(Hoặc thêm flag `--auto-submit` khi chạy lệnh build).*

---

### 2. Phát hành lên Apple App Store (iOS)

#### 📋 Điều kiện chuẩn bị
- **Tài khoản Apple Developer**: Chi phí $99/năm.
- **Tạo ứng dụng mới**: Đăng nhập vào [App Store Connect](https://appstoreconnect.apple.com) -> Chọn mục **Apps** -> Nhấn nút **(+)** -> Chọn **New App**.
  - Nhập **Tên ứng dụng**, chọn ngôn ngữ chính.
  - Chọn **Bundle ID** chính xác của dự án (`com.dev.realestate`).
  - Nhập mã **SKU** (chuỗi ký tự bất kỳ viết liền để định danh app của riêng bạn, ví dụ: `fe2-realestate`).

#### Bước 1: Gửi bản build lên App Store Connect
Chạy lệnh đóng gói và tự động đẩy bản build lên kho quản lý của Apple:
```bash
eas build --platform ios --profile production --auto-submit
```
*(Nếu đã có bản build sẵn, chỉ cần chạy: `eas submit --platform ios`)*.

#### Bước 2: Chuẩn bị thông tin trên App Store Connect
1. Truy cập App Store Connect, vào trang ứng dụng của bạn.
2. Chọn phiên bản **1.0.0 Prepare for Submission** (Chuẩn bị gửi duyệt) ở thanh bên trái.
3. **Thêm ảnh chụp màn hình (Screenshots)**:
   - Ảnh màn hình cho iPhone màn hình 6.5 inch (iPhone Xs Max / 11 Pro Max / 12 Pro Max trở lên).
   - Ảnh màn hình cho iPhone màn hình 5.5 inch (iPhone 8 Plus trở lên).
4. **Nhập các thông tin bắt buộc**:
   - **Description (Mô tả)** và **Keywords (Từ khóa)** của ứng dụng.
   - **Support URL** (Trang web hỗ trợ người dùng).
   - **Privacy Policy URL** (Đường dẫn chính sách bảo mật thông tin).
5. **Chọn bản build (Build)**: Cuộn xuống mục **Build**, click vào dấu **(+)** và chọn bản build bạn đã tải lên thành công từ TestFlight trước đó.
6. **Xác nhận xếp hạng tuổi (Age Rating)**: Điền bảng khảo sát nội dung để Apple xếp hạng độ tuổi thích hợp.

#### Bước 3: Gửi duyệt cho Apple (Submit for Review)
1. Sau khi điền đầy đủ tất cả thông tin bắt buộc, nhấn nút **Add for Review** hoặc **Submit for Review** ở góc trên cùng bên phải.
2. Ứng dụng sẽ chuyển sang trạng thái **Waiting for Review** (Đang chờ duyệt).
3. Đội ngũ kiểm duyệt viên của Apple sẽ trực tiếp tải app về test và phê duyệt ứng dụng của bạn trong khoảng **24 đến 48 giờ**. Bạn sẽ nhận được email thông báo ngay khi ứng dụng được duyệt thành công!

---

## 🛠️ Lệnh Kiểm tra Trạng thái và Quản lý Build

- **Kiểm tra danh sách các bản build đang chạy hoặc đã xong:**
  ```bash
  eas build:list
  ```
- **Xem log chi tiết trực tiếp từ Terminal khi đang build trên Cloud:**
  EAS CLI sẽ tự động hiển thị link theo dõi log dạng `https://expo.dev/accounts/.../builds/...`. Bạn chỉ cần click vào link để xem tiến độ trực tiếp.
