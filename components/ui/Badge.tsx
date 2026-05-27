import { Ionicons } from '@expo/vector-icons';

import React from 'react';

import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

type BadgeType = 'verified' | 'hot' | 'new' | 'custom';

interface BadgeProps {
  type?: BadgeType;
  label?: string;
  style?: ViewStyle;
}

const config: Record<
  BadgeType,
  { bg: string; color: string; icon?: string; defaultLabel: string }
> = {
  verified: {
    bg: Palette.orangeLight,
    color: Palette.orange,
    icon: 'checkmark-circle',
    defaultLabel: 'Đã xác thực',
  },
  hot: { bg: '#FEE2E2', color: Palette.badgeRed, icon: 'flame', defaultLabel: 'HOT' },
  new: { bg: '#DCFCE7', color: Palette.badgeGreen, icon: 'sparkles', defaultLabel: 'Mới' },
  custom: { bg: Palette.bgApp, color: Palette.textSecondary, defaultLabel: '' },
};

export const Badge = ({ type = 'custom', label, style }: BadgeProps) => {
  const c = config[type];
  const text = label ?? c.defaultLabel;
  return (
    <View style={[styles.base, { backgroundColor: c.bg }, style]}>
      {c.icon && <Ionicons name={c.icon as never} size={12} color={c.color} />}
      <Text style={[styles.label, { color: c.color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  label: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
});
