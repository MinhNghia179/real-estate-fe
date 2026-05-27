import { Text as RNText, TextProps as RNTextProps } from 'react-native';

import { FontSize, FontWeight, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TextProps extends RNTextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'stat' | 'label';
}

export function Text({ variant = 'body', style, ...props }: TextProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const variantStyles: Record<NonNullable<TextProps['variant']>, any> = {
    heading: {
      fontSize: FontSize.display,
      fontWeight: FontWeight.bold,
      color: isDark ? '#ECEDEE' : Palette.textPrimary,
      lineHeight: FontSize.display * 1.2,
    },
    subheading: {
      fontSize: FontSize.h3,
      fontWeight: FontWeight.regular,
      color: isDark ? '#9BA1A6' : Palette.textSecondary,
      lineHeight: FontSize.h3 * 1.5,
    },
    body: {
      fontSize: FontSize.h3,
      fontWeight: FontWeight.semibold,
      color: isDark ? '#ECEDEE' : Palette.textPrimary,
    },
    stat: {
      fontSize: FontSize.h1,
      fontWeight: FontWeight.bold,
      color: isDark ? '#ECEDEE' : Palette.textPrimary,
      fontVariant: ['tabular-nums'] as any,
    },
    label: {
      fontSize: FontSize.caption,
      color: isDark ? '#9BA1A6' : Palette.textMuted,
      marginTop: 4,
    },
  };

  return <RNText {...props} style={[variantStyles[variant], style]} />;
}
