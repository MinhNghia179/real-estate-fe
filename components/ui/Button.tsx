import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  type TextStyle,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const sizeMap: Record<
  Size,
  { paddingVertical: number; paddingHorizontal: number; fontSize: number }
> = {
  sm: { paddingVertical: 8, paddingHorizontal: 16, fontSize: FontSize.caption },
  md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: FontSize.body },
  lg: { paddingVertical: 15, paddingHorizontal: 24, fontSize: FontSize.h3 },
};

export const Button = ({
  label,
  variant = 'primary',
  size = 'lg',
  loading = false,
  fullWidth = true,
  style,
  textStyle,
  disabled,
  ...props
}: ButtonProps) => {
  const sz = sizeMap[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        { paddingVertical: sz.paddingVertical, paddingHorizontal: sz.paddingHorizontal },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : Palette.orange} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`], { fontSize: sz.fontSize }, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.5 },

  primary: { backgroundColor: Palette.orange },
  secondary: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Palette.orange },
  ghost: { backgroundColor: 'transparent' },

  text: { fontWeight: FontWeight.semibold },
  primaryText: { color: '#fff' },
  secondaryText: { color: Palette.orange },
  ghostText: { color: Palette.orange },
});
