import { Ionicons } from '@expo/vector-icons';

import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

interface ListMenuItemProps {
  icon?: string;
  label: string;
  badge?: string | number;
  badgeVariant?: 'count' | 'status';
  onPress?: () => void;
  style?: ViewStyle;
  showChevron?: boolean;
}

export const ListMenuItem = ({
  icon,
  label,
  badge,
  badgeVariant = 'count',
  onPress,
  style,
  showChevron = true,
}: ListMenuItemProps) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
    {icon && (
      <View style={styles.iconWrapper}>
        <Ionicons name={icon as never} size={20} color={Palette.textSecondary} />
      </View>
    )}
    <Text style={styles.label}>{label}</Text>
    <View style={styles.right}>
      {badge !== undefined &&
        (badgeVariant === 'count' ? (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{badge}</Text>
          </View>
        ) : (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{badge}</Text>
          </View>
        ))}
      {showChevron && <Ionicons name="chevron-forward" size={16} color={Palette.textMuted} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    backgroundColor: Palette.white,
    gap: Spacing.md,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Palette.bgApp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: FontSize.body,
    color: Palette.textPrimary,
    fontWeight: FontWeight.medium,
  },
  right: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  countBadge: {
    backgroundColor: Palette.bgApp,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    fontSize: FontSize.caption,
    color: Palette.textSecondary,
    fontWeight: FontWeight.semibold,
  },
  statusBadge: {
    backgroundColor: Palette.orangeLight,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: FontSize.caption,
    color: Palette.orange,
    fontWeight: FontWeight.semibold,
  },
});
