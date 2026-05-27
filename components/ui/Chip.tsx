import React from 'react';

import { StyleSheet, Text, TouchableOpacity, type ViewStyle } from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

type ChipVariant = 'outlined' | 'filled';

interface ChipProps {
  label: string;
  active?: boolean;
  variant?: ChipVariant;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Chip = ({
  label,
  active = false,
  variant = 'outlined',
  color = Palette.orange,
  onPress,
  style,
}: ChipProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[
      styles.base,
      variant === 'outlined' &&
        (active
          ? { borderColor: color, backgroundColor: Palette.orangeLight }
          : styles.outlinedDefault),
      variant === 'filled' && { backgroundColor: color },
      style,
    ]}
  >
    <Text
      style={[
        styles.label,
        variant === 'outlined' && (active ? { color } : styles.labelDefault),
        variant === 'filled' && styles.labelFilled,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm - 2,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignSelf: 'flex-start',
  },
  outlinedDefault: { borderColor: Palette.border, backgroundColor: Palette.white },
  label: { fontSize: FontSize.body, fontWeight: FontWeight.medium },
  labelDefault: { color: Palette.textPrimary },
  labelFilled: { color: Palette.white, fontWeight: FontWeight.semibold },
});
