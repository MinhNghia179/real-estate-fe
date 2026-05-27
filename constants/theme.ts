import { Platform } from 'react-native';

// ─── Brand Colors ────────────────────────────────────────────────────────────
export const Palette = {
  orange: '#F97316',
  orangeLight: '#FFF0E6',
  orangeDark: '#EA6C0A',
  dark: '#1A1A1A',
  black: '#111111',
  white: '#FFFFFF',
  bgApp: '#F5F5F5',
  bgCard: '#FFFFFF',
  textPrimary: '#111111',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  borderFocus: '#F97316',
  divider: '#F3F4F6',
  badgeRed: '#EF4444',
  badgeGreen: '#22C55E',
  overlay: 'rgba(0,0,0,0.4)',
} as const;

// ─── Semantic Colors (light / dark) ─────────────────────────────────────────
export const Colors = {
  light: {
    text: Palette.textPrimary,
    textSub: Palette.textSecondary,
    background: Palette.bgApp,
    card: Palette.bgCard,
    tint: Palette.orange,
    border: Palette.border,
    icon: Palette.textSecondary,
    tabIconDefault: Palette.textSecondary,
    tabIconSelected: Palette.orange,
  },
  dark: {
    text: '#ECEDEE',
    textSub: '#9BA1A6',
    background: '#111111',
    card: '#1E1E1E',
    tint: Palette.orange,
    border: '#2E2E2E',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.orange,
  },
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
export const FontSize = {
  xs: 10,
  caption: 12,
  body: 14,
  h3: 16,
  h2: 18,
  h1: 24,
  display: 32,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', rounded: 'normal', mono: 'monospace' },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    rounded: 'system-ui',
    mono: 'SFMono-Regular, Menlo, Monaco, monospace',
  },
});

// ─── Spacing ─────────────────────────────────────────────────────────────────
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────
export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 50,
  full: 999,
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────
export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

// ─── Layout ──────────────────────────────────────────────────────────────────
export const Layout = {
  screenPadding: Spacing.base,
  sectionSpacing: Spacing.xl,
  cardGap: Spacing.md,
} as const;
