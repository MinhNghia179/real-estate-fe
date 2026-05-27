# Language Selector - UI Design Preview

## Overview
A luxury, modern language selector component positioned in the top-right corner of the welcome screen.

## Visual Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│                                          ┌──────────┐
│                                          │ 🇬🇧 EN  │ ← Button (closed)
│                                          └──────────┘
│
│  Welcome screen content...
│
│
└─────────────────────────────────────────────────┘
```

## When Opened

```
┌─────────────────────────────────────────────────┐
│                                          ┌──────────┐
│                                          │ 🇬🇧 EN  │ ← Active button
│                                          ├──────────┤
│                                          │ 🇬🇧 Eng  │
│                                          │    en    │
│                                          │      ✓   │ ← Selected
│                                          ├──────────┤
│                                          │ 🇻🇳 Vie  │
│                                          │    vi    │
│                                          └──────────┘
│
│  Welcome screen content...
│
└─────────────────────────────────────────────────┘
```

## Design Details

### Button (Default State)
- **Background**: Semi-transparent with blur effect
  - Color: `rgba(255, 255, 255, 0.08)`
  - Border: `rgba(255, 255, 255, 0.15)`
- **Style**: Glassmorphism effect
- **Padding**: 12px horizontal, 8px vertical
- **Border Radius**: 20px (pill shape)
- **Contents**: 
  - Flag emoji (🇬🇧/🇻🇳)
  - Language code in uppercase (EN/VI)
  - Font size: 12px
  - Letter spacing: 0.5px

### Button (Active/Hover State)
- **Background**: `rgba(255, 255, 255, 0.12)` (slightly brighter)
- **Border**: `rgba(255, 255, 255, 0.25)` (more visible)
- **Transition**: Smooth, instant response

### Dropdown Menu
- **Position**: Absolute, 48px below button, right-aligned
- **Width**: Minimum 200px
- **Background**: Dark semi-transparent
  - Color: `rgba(20, 20, 20, 0.95)`
  - Border: `rgba(255, 255, 255, 0.1)`
- **Border Radius**: 12px
- **Shadow**: `0 8px 32px rgba(0, 0, 0, 0.3)`
- **Overflow**: Hidden (no scrolling)

### Menu Options
Each option is 12px padding (vertical), with:
- **Flag**: 18px font size
- **Language Name**: 13px, white 70% opacity
- **Language Code**: 11px, white 50% opacity, margin-top 2px

### Active Option Styling
- **Background**: Orange tint `rgba(255, 140, 0, 0.08)`
- **Language Name**: Full opacity, bold (#FF8C00 orange)
- **Checkmark**: 
  - Size: 20x20px
  - Background: Orange (#FF8C00)
  - Border radius: 50% (circle)
  - Text: White checkmark (✓), 12px, bold

### Menu Item Separators
- **Border**: `rgba(255, 255, 255, 0.05)` (subtle divider)
- **Active item**: Border color changes to orange tint

## Color Palette
- **Orange (Accent)**: #FF8C00 (Palette.orange)
- **Text Primary**: #FFFFFF
- **Text Secondary**: rgba(255,255,255, 0.7)
- **Text Tertiary**: rgba(255,255,255, 0.5)
- **Background**: rgba(20,20,20,0.95)
- **Glass**: rgba(255,255,255, 0.08)

## Animations
- Button press: Subtle scale/opacity change
- Dropdown appear: Smooth fade-in
- Option selection: Instant visual feedback + persistence to storage

## Accessibility
- Touch target: Minimum 44x44px (button + dropdown area)
- Contrast ratio: WCAG AA compliant
- Semantic: Uses native Pressable and View components
- Focus: Clear visual feedback on selection

## Implementation
- **Framework**: React Native / Expo
- **State Management**: React Context (useLocale hook)
- **Persistence**: AsyncStorage (key: 'app-language')
- **Default Language**: Vietnamese (vi)
