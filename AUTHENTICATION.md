# Authentication Screens - Implementation Guide

## Overview

The authentication system has been completely redesigned with modern UI/UX using the existing design system components. All screens now follow the brand guidelines with the orange color (#F97316) as the primary accent.

## 📱 Screens Created/Updated

### 1. **Login Screen** (`app/login.tsx`)
- ✅ Uses `Input` component with password toggle
- ✅ Uses `Button` component (primary style)
- ✅ Form validation with Formik + Zod
- ✅ Forgot password link
- ✅ Register link
- ✅ Google Sign-In placeholder (ready for implementation)
- ✅ Responsive design with ScrollView

**Features:**
- Email input with validation
- Password input with eye toggle
- Loading state during submission
- Error handling with user-friendly messages

### 2. **Register Screen** (`app/register.tsx`)
- ✅ Uses `Input` component with all fields
- ✅ Uses `Button` component
- ✅ Form validation with Formik + Zod
- ✅ Login link
- ✅ Terms of service placeholder
- ✅ Responsive design with ScrollView

**Fields:**
- Name (min 2 characters)
- Email (valid email format)
- Phone (optional, 10-11 digits)
- Password (min 8 chars, must include uppercase and number)
- Confirm Password (must match)

### 3. **OTP Verification Screen** (`app/verify-otp.tsx`)
- ✅ Uses new `OTPInput` component
- ✅ 6-digit OTP input
- ✅ Resend OTP functionality
- ✅ Resend tracking (shows how many times resent)
- ✅ Dynamic routing based on purpose (register/login)
- ✅ Email display for confirmation

**Flow:**
```
User Email → Navigate to verify-otp?email=user@email.com&purpose=register
```

### 4. **Forgot Password Screen** (`app/forgot-password.tsx`)
- ✅ Uses `Input` and `Button` components
- ✅ Email-based password reset
- ✅ Success alert with back navigation
- ✅ Error handling

## 🧩 New Components

### **OTPInput Component** (`components/ui/OTPInput.tsx`)
Reusable OTP input component built on `react-native-otp-entry`.

**Props:**
```typescript
interface OTPInputProps {
  label?: string;           // Optional label above input
  error?: string;           // Error message
  containerStyle?: ViewStyle;
  numberOfDigits?: number;  // Default: 6
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
}
```

**Usage:**
```tsx
import { OTPInput } from '@components/ui';

<OTPInput
  label="OTP Code"
  numberOfDigits={6}
  onTextChange={(code) => setOtp(code)}
  error={errors.otp}
/>
```

## 🎨 Design System Integration

All screens use the centralized theme from `@constants/theme`:

- **Colors:** 
  - Primary: `Palette.orange` (#F97316)
  - Text: `Palette.textPrimary`, `Palette.textSecondary`
  - Borders: `Palette.border`

- **Typography:**
  - Headings: `FontSize.display` (32px)
  - Body: `FontSize.body` (14px)
  - Labels: `FontSize.caption` (12px)

- **Spacing:**
  - Base spacing unit: `Spacing.base` (16px)
  - Gap between elements: `Spacing.lg` (20px)

## 📦 Dependencies

### New Package Installed
```bash
npm install react-native-otp-entry
```

**Version:** Latest (built for React Native compatibility)

### Existing Packages Used
- `formik` - Form state management
- `zod-formik-adapter` - Schema validation
- `expo-router` - Navigation

## 🔐 Validation Schemas

### LoginSchema
```typescript
{
  email: string (valid email)
  password: string (min 8 chars)
}
```

### RegisterSchema
```typescript
{
  name: string (2-50 chars)
  email: string (valid email)
  password: string (8+ chars, uppercase, digit)
  confirmPassword: string (must match password)
  phone: string (optional, 10-11 digits)
}
```

### OTPSchema
```typescript
{
  otp: string (exactly 6 digits)
}
```

## 🚀 Integration Points

### Firebase Authentication
The screens integrate with existing Firebase service:

```typescript
import { authService } from '@services/authService';

// Login
const user = await authService.signIn({ email, password });

// Register
const user = await authService.signUp({ name, email, password, phone });

// Password Reset
await authService.resetPassword(email);

// TODO: Implement OTP verification in authService
// const result = await authService.verifyOTP(email, otp);
```

### State Management
Uses Zustand store for user state:

```typescript
import { useAuthStore } from '@stores/authStore';

const setUser = useAuthStore((s) => s.setUser);
setUser(user); // After successful login/registration
```

## 📋 Implementation Checklist

### MVP Features (Implemented)
- [x] Login screen with email/password
- [x] Register screen with validation
- [x] Forgot password screen
- [x] OTP verification screen
- [x] UI component integration
- [x] Form validation with Zod
- [x] Error handling and alerts
- [x] Loading states

### Phase 2 (Ready for Implementation)
- [ ] OTP verification API integration
- [ ] OTP resend API implementation
- [ ] Google Sign-In integration
- [ ] Social auth (Facebook, Apple)
- [ ] Biometric authentication
- [ ] Session persistence

### Phase 3 (Future)
- [ ] Two-factor authentication
- [ ] Account recovery
- [ ] Email verification
- [ ] Password strength meter

## 🎯 Navigation Flow

```
Welcome Screen
    ↓
    ├─→ Login Screen
    │   ├─→ Forgot Password Screen
    │   └─→ Register Screen
    │
    └─→ Register Screen
        ├─→ OTP Verification Screen
        │   └─→ Main App (/(tabs))
        └─→ Terms & Conditions
```

## 🧪 Testing Recommendations

### Unit Tests
- Validation schemas with various inputs
- Error message formatting
- Form submission logic

### E2E Tests
1. Login flow with valid/invalid credentials
2. Register flow with validation
3. Password reset flow
4. OTP verification flow

### Manual Testing
1. Test all keyboard types (email, phone, numeric for OTP)
2. Verify responsive layout on different screen sizes
3. Test form submission with slow network
4. Verify error states and messages

## 📝 Notes

- All screens use `ScrollView` with `contentContainerStyle` for responsive layout
- Keyboard avoiding behavior is platform-specific (iOS: padding, Android: default)
- Password field automatically toggles visibility
- All forms use controlled components with Formik
- Error messages are only shown after field blur and when field is touched

## 🔗 Related Files

- `src/schemas/index.ts` - Validation schemas
- `src/services/authService.ts` - Firebase auth service
- `src/stores/authStore.ts` - Zustand auth store
- `constants/theme.ts` - Design system
- `components/ui/` - Reusable UI components
