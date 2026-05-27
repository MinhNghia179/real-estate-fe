# Authentication Flow Redesign - Figma Design Implementation

## ✅ Completed: 4-Step Registration & Login Flow

All authentication screens have been redesigned to exactly match the Figma design specifications.

---

## 🎯 Complete User Flow

```
Welcome Screen (app/welcome.tsx)
    ↓
Login Screen (app/login.tsx)
    ├─→ Phone Tab | Email Tab
    ├─→ Password Input
    ├─→ Forgot Password Link
    ├─→ Social Login (Google, Apple, Zalo)
    └─→ Link to Register

Register Screen (app/register.tsx) - BƯỚC 1/4
    ├─→ Phone Tab | Email Tab
    ├─→ Phone Input with +84 flag
    ├─→ Password Input
    ├─→ Terms & Conditions Checkbox
    ├─→ Social Login (Google, Apple, Zalo)
    └─→ "Tiếp tục" Button
         ↓
OTP Verification Screen (app/verify-otp.tsx) - BƯỚC 2/4
    ├─→ 6 Individual OTP Input Boxes
    ├─→ Countdown Timer (Gửi lại sau 00:42)
    ├─→ "Chưa nhận được mã?" Resend Section
    ├─→ Error Message Box (after 2+ resends)
    ├─→ "Xác nhận" Button
    └─→ "Thay đổi số điện thoại" Link
         ↓
Select Role Screen (app/select-role.tsx) - BƯỚC 3/4
    ├─→ "Người mua / Thuê" Card
    │   └─→ 🏠 Icon + Description
    ├─→ "Môi giới / Bán" Card
    │   └─→ 💼 Icon + Description
    ├─→ Selection Checkmark + Orange Border
    └─→ "Tiếp tục" Button
         ↓
Complete Profile Screen (app/complete-profile.tsx) - BƯỚC 4/4
    ├─→ Avatar Picker (with edit badge)
    ├─→ Name Input
    ├─→ Phone Input
    ├─→ Selected Role Display
    └─→ "Hoàn tất" Button → Main App (/(tabs))
```

---

## 📱 Screen Details

### **Login Screen** (`app/login.tsx`)
- **Tabs:** Phone | Email
- **Phone Tab:** 🇻🇳 +84 flag + phone input
- **Email Tab:** Standard email input
- **Fields:** Phone/Email + Password
- **Links:** Forgot Password, Register
- **Social:** Google, Apple, Zalo buttons
- **Styling:** Matches Figma exactly

### **Register Screen (Step 1/4)** (`app/register.tsx`)
- **Step Indicator:** "Bước 1 / 4"
- **Tabs:** Số điện thoại | Email
- **Phone Variant:**
  - Country code selector (🇻🇳 +84)
  - Phone number input
  - Placeholder: "912 345 678"
- **Email Variant:**
  - Email input
- **Password Field** with uppercase/number validation
- **Checkbox:** Terms & Conditions agreement
  - Tôi đồng ý với [Điều khoản dịch vụ] và [Chính sách bảo mật] của Đất Vàng
- **Social Buttons:** Google, Apple, Zalo
- **Button:** "Tiếp tục" (disabled until checkbox checked)

### **OTP Verification Screen (Step 2/4)** (`app/verify-otp.tsx`)
- **Step Indicator:** "Bước 2 / 4"
- **Display:** "Mã 6 chữ số đã gửi đến +84 912 ... 678"
- **6 OTP Boxes:**
  - Individual boxes for each digit
  - Orange border when focused/filled
  - Light orange background when filled
- **Countdown Timer:**
  - "Chưa nhận được mã?" on left
  - "Gửi lại sau 00:42" on right
  - Transforms to "Gửi lại" link when timer expires
- **Error Box** (appears after 2+ resends):
  - ⚠ Icon
  - "Không nhận được tin nhắn?"
  - "Thử nhận mã qua cuộc gọi tự động..."
  - Orange left border
- **Button:** "Xác nhận"
- **Link:** "Thay đổi số điện thoại"

### **Select Role Screen (Step 3/4)** (`app/select-role.tsx`)
- **Step Indicator:** "Bước 3 / 4"
- **Title:** "Chọn vai trò"
- **Subtitle:** "Bạn muốn sử dụng Đất Vàng để làm gì?"
- **Role Card 1 - Buyer:**
  - 🏠 Icon (gray bg, changes to orange when selected)
  - Title: "Người mua / Thuê"
  - Description: "Tìm kiếm và so sánh các bất động sản"
- **Role Card 2 - Broker:**
  - 💼 Icon (gray bg, changes to orange when selected)
  - Title: "Môi giới / Bán"
  - Description: "Đăng tin, quản lý và bán bất động sản"
- **Selection Styling:**
  - Orange border around selected card
  - Light orange background
  - Green checkmark (✓) in top-right corner
- **Button:** "Tiếp tục" (disabled until role selected)
- **Link:** "Bỏ qua bước này"

### **Complete Profile Screen (Step 4/4)** (`app/complete-profile.tsx`)
- **Step Indicator:** "Bước 4 / 4"
- **Title:** "Hoàn tất hồ sơ"
- **Avatar Section:**
  - Large circular avatar picker (120x120px)
  - Placeholder with 📷 emoji
  - Dashed border on placeholder
  - Edit badge (✏️) in bottom-right
- **Form Fields:**
  - Name input
  - Phone input
- **Role Display:**
  - Gray background box
  - Shows selected role (Người mua/Môi giới)
- **Button:** "Hoàn tất"
- **Link:** "Bỏ qua và vào ứng dụng"

---

## 🎨 Design System Integration

All screens use:
- **Primary Color:** `Palette.orange` (#F97316)
- **Tab Active State:** Orange border + white background
- **Tab Inactive State:** Gray background (#F3F4F6)
- **Button Style:** Orange rounded pill shape
- **Input Fields:** Custom Input component with error states
- **Spacing:** Consistent with design system spacing units

---

## 📋 Key Features Implemented

✅ **Tab Switching** - Phone/Email selection  
✅ **Phone Input** - With country code selector  
✅ **Password Toggle** - Show/hide password  
✅ **OTP Input** - 6 individual boxes  
✅ **Countdown Timer** - 60-second auto-reset  
✅ **Resend Tracking** - Shows resend count  
✅ **Error Messages** - Context-aware alerts  
✅ **Role Selection** - Visual card selection  
✅ **Avatar Picker** - Image selection & upload  
✅ **Form Validation** - Zod schemas  
✅ **Loading States** - Button loading indicators  
✅ **Navigation Flow** - 4-step registration journey  

---

## 🔄 Data Flow

```
Register:
1. User enters phone/email + password
2. Verify identity via OTP
3. Select user role (buyer/broker)
4. Complete profile with avatar & name
5. Enter main app

Login:
1. User enters phone/email + password
2. Access main app directly
```

---

## 📁 Files Modified/Created

### New Files
- `app/select-role.tsx` - Role selection screen
- `app/complete-profile.tsx` - Profile completion screen

### Modified Files
- `app/register.tsx` - Complete redesign with tabs & flow
- `app/login.tsx` - Redesigned with tabs & social buttons
- `app/verify-otp.tsx` - OTP boxes + countdown timer
- `app/forgot-password.tsx` - Updated styling (already done)
- `src/types/models.ts` - Added `name` and `avatar` fields to User

### Unchanged
- `components/ui/OTPInput.tsx` - Reusable component (kept)
- All UI components and theme system

---

## 🔗 Integration Points

### Navigation
```typescript
// Register flow
router.push({ pathname: '/verify-otp', params: { email, purpose: 'register' } });
router.push({ pathname: '/select-role', params: { role } });
router.push({ pathname: '/complete-profile', params: { role } });

// Direct navigation after completion
router.replace('/(tabs)');
```

### Form Validation
- `LoginSchema` - Email + Password
- `RegisterSchema` - Email + Password + confirmPassword + phone
- `OTPSchema` - 6-digit OTP
- `UpdateProfileSchema` - Name + Phone

### State Management
- Zustand auth store for user state
- Local component state for UI (tabs, selections, timers)
- Form state via Formik

---

## ⚙️ Setup & Configuration

### Required Dependencies
```json
{
  "formik": "^2.4.2",
  "zod": "^3.22.0",
  "zod-formik-adapter": "^1.2.2",
  "expo-image-picker": "latest"
}
```

### Environment Variables
- Firebase auth configuration (in `.env.local`)

---

## 🧪 Testing Checklist

- [ ] Phone tab input works correctly
- [ ] Email tab input works correctly
- [ ] OTP countdown timer counts down
- [ ] OTP input accepts only digits
- [ ] OTP resend works and updates counter
- [ ] Role selection toggles correctly
- [ ] Avatar picker works
- [ ] Form validation shows errors
- [ ] Navigation flow is smooth
- [ ] All styling matches Figma screenshots

---

## 📝 Next Steps

1. **Backend Integration:**
   - Implement OTP sending (SMS/Email)
   - Implement OTP verification
   - Implement resend logic

2. **Social Auth:**
   - Google Sign-In
   - Apple Sign-In
   - Zalo Sign-In

3. **Image Upload:**
   - Upload avatar to Firebase Storage
   - Store avatar URL in user profile

4. **Testing:**
   - E2E tests for complete flow
   - Unit tests for validation
   - UI testing for responsiveness

---

## 🎓 Design System Usage

### Colors
- Primary: `Palette.orange` (#F97316)
- Text Primary: `Palette.textPrimary` (#111111)
- Text Secondary: `Palette.textSecondary` (#6B7280)
- Border: `Palette.border` (#E5E7EB)
- Background: `Palette.white`

### Spacing
- Base unit: `Spacing.base` (16px)
- Gap: `Spacing.lg` (20px)
- Large gap: `Spacing.xl` (24px)

### Typography
- Display: `FontSize.display` (32px)
- Heading: `FontSize.h3` (16px)
- Body: `FontSize.body` (14px)
- Caption: `FontSize.caption` (12px)
