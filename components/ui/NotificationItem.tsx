import { Ionicons } from '@expo/vector-icons';

import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';

import { formatRelative } from '@utils/dateFormatter';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

type NotifType = 'price' | 'match' | 'message' | 'expiry' | 'area' | 'system';

interface NotificationItemProps {
  type: NotifType;
  title: string;
  description: string;
  time: Date | string;
  unread?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const iconMap: Record<NotifType, { name: string; bg: string; color: string }> = {
  price: { name: 'pricetag-outline', bg: '#FFF0E6', color: Palette.orange },
  match: { name: 'home-outline', bg: '#EFF6FF', color: '#3B82F6' },
  message: { name: 'chatbubble-outline', bg: '#F0FDF4', color: Palette.badgeGreen },
  expiry: { name: 'warning-outline', bg: '#FFFBEB', color: '#F59E0B' },
  area: { name: 'eye-outline', bg: '#F5F3FF', color: '#8B5CF6' },
  system: { name: 'information-circle-outline', bg: Palette.bgApp, color: Palette.textSecondary },
};

export const NotificationItem = ({
  type,
  title,
  description,
  time,
  unread = false,
  onPress,
  style,
}: NotificationItemProps) => {
  const ic = iconMap[type];
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconWrapper, { backgroundColor: ic.bg }]}>
        <Ionicons name={ic.name as never} size={20} color={ic.color} />
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, unread && styles.titleUnread]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.time}>{formatRelative(time)}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
      {unread && <View style={styles.dot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.base,
    gap: Spacing.md,
    backgroundColor: Palette.white,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: { flex: 1, gap: 3 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: FontSize.body,
    color: Palette.textPrimary,
    fontWeight: FontWeight.medium,
  },
  titleUnread: { fontWeight: FontWeight.bold },
  time: { fontSize: FontSize.caption, color: Palette.textMuted, flexShrink: 0 },
  description: { fontSize: FontSize.caption, color: Palette.textSecondary, lineHeight: 18 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.orange,
    marginTop: 4,
    flexShrink: 0,
  },
});
