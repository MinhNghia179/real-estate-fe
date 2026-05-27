# Internationalization (i18n) Implementation

## Overview
Added English (EN) and Vietnamese (VN) language support with a modern, luxury language selector displayed in the top-right corner of the welcome screen.

## Files Created

### 1. Translation Files
- **`src/locales/en.ts`** - English translations
- **`src/locales/vi.ts`** - Vietnamese translations  
- **`src/locales/index.ts`** - Translation export and configuration

### 2. Locale Context
- **`src/contexts/locale-context.tsx`** - React Context for managing language state
  - Persists language preference to AsyncStorage
  - Provides `useLocale()` hook for accessing translations and language controls
  - Loads saved preference on app startup

### 3. Components
- **`components/ui/language-selector.tsx`** - Luxury language selector component
  - Positioned in top-right corner
  - Modern glassmorphism design with blur effect
  - Dropdown menu with language options
  - Shows current selection with checkmark
  - Smooth transitions and animations

## Features

### Language Switching
- Dropdown menu displays both English and Vietnamese
- Flags (🇬🇧 🇻🇳) for visual distinction
- Language preference saved to AsyncStorage automatically
- Persists across app sessions

### Design
- **Luxury aesthetic** with:
  - Glassmorphism effect (backdrop blur)
  - Subtle borders with transparent white
  - Orange accent color for active selection
  - Smooth button transitions
  - Professional spacing and typography

### Dynamic Content
- Welcome screen slides now translate based on selected language
- Button labels (Sign Up / Sign In) translate in real-time
- All slide content (labels, titles, descriptions) support both languages

## Configuration

### TSConfig Updates
Added path aliases in `tsconfig.json`:
```json
"@locales": ["./src/locales/index"],
"@locales/*": ["./src/locales/*"],
"@contexts/*": ["./src/contexts/*"]
```

### App Initialization
Updated `app/_layout.tsx` to wrap the app with `LocaleProvider`:
```tsx
<QueryClientProvider client={queryClient}>
  <LocaleProvider>
    {/* Rest of app */}
  </LocaleProvider>
</QueryClientProvider>
```

## Usage

### In Components
```tsx
import { useLocale } from '@contexts/locale-context';

function MyComponent() {
  const { language, setLanguage, t } = useLocale();
  
  return (
    <Text>{t.welcome.registerButton}</Text>
  );
}
```

### Adding More Languages
1. Create `src/locales/xx.ts` with translations
2. Import in `src/locales/index.ts`
3. Add to `languages` array with code, label, and flag
4. Export from `translations` object

## UI Components

### Language Selector (Top-Right Corner)
- **Button**: Shows flag + language code (EN/VN)
- **Dropdown**: 
  - Language name (English / Tiếng Việt)
  - Language code
  - Checkmark for active selection
  - Clickable options

### Styling Details
- Background: `rgba(20, 20, 20, 0.95)` with border
- Active option: Orange background (`#FF8C00`)
- Text colors: White with transparency
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.3)`
- Border radius: 12px with continuous curves

## Storage
Language preference stored in AsyncStorage with key: `app-language`
Default language: Vietnamese (vi)

## Type Safety
- Full TypeScript support with `Language` type
- Exported type definitions for all translations
- Proper typing for locale context and hooks
