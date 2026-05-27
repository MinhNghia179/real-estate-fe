import { Ionicons } from '@expo/vector-icons';

import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';

import { router } from 'expo-router';

import { FontSize, FontWeight, Palette, Spacing } from '@constants/theme';

import { Avatar } from './Avatar';

// ─── Home Header ─────────────────────────────────────────────────────────────
interface HomeHeaderProps {
  city: string;
  onCityPress?: () => void;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
  avatarName?: string;
  avatarUri?: string;
  unreadCount?: number;
  style?: ViewStyle;
}

export const HomeHeader = ({
  city,
  onCityPress,
  onNotificationPress,
  onAvatarPress,
  avatarName,
  avatarUri,
  unreadCount = 0,
  style,
}: HomeHeaderProps) => (
  <View style={[styles.row, style]}>
    <TouchableOpacity style={styles.locationRow} onPress={onCityPress} activeOpacity={0.7}>
      <Text style={styles.locationLabel}>Khu vực</Text>
      <View style={styles.cityRow}>
        <Ionicons name="location" size={14} color={Palette.orange} />
        <Text style={styles.city}>{city}</Text>
        <Ionicons name="chevron-down" size={14} color={Palette.textSecondary} />
      </View>
    </TouchableOpacity>

    <View style={styles.actions}>
      <TouchableOpacity style={styles.iconBtn} onPress={onNotificationPress}>
        <Ionicons name="notifications-outline" size={22} color={Palette.textPrimary} />
        {unreadCount > 0 && <View style={styles.badge} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={onAvatarPress}>
        <Avatar name={avatarName} uri={avatarUri} size="sm" />
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Detail Header ────────────────────────────────────────────────────────────
interface DetailHeaderProps {
  onSharePress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  style?: ViewStyle;
}

export const DetailHeader = ({
  onSharePress,
  onFavoritePress,
  isFavorite,
  style,
}: DetailHeaderProps) => (
  <View style={[styles.row, style]}>
    <TouchableOpacity style={styles.roundBtn} onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={20} color={Palette.textPrimary} />
    </TouchableOpacity>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.roundBtn} onPress={onSharePress}>
        <Ionicons name="share-outline" size={20} color={Palette.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.roundBtn} onPress={onFavoritePress}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? Palette.badgeRed : Palette.textPrimary}
        />
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Modal Header ─────────────────────────────────────────────────────────────
interface ModalHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
}

export const ModalHeader = ({
  title,
  actionLabel,
  onActionPress,
  onClose,
  style,
}: ModalHeaderProps) => (
  <View style={[styles.row, style]}>
    <TouchableOpacity style={styles.iconBtn} onPress={onClose ?? (() => router.back())}>
      <Ionicons name="close" size={22} color={Palette.textPrimary} />
    </TouchableOpacity>
    <Text style={styles.modalTitle}>{title}</Text>
    {actionLabel ? (
      <TouchableOpacity onPress={onActionPress}>
        <Text style={styles.action}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : (
      <View style={{ width: 30 }} />
    )}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  locationRow: { gap: 2 },
  locationLabel: { fontSize: FontSize.caption, color: Palette.textSecondary },
  cityRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  city: { fontSize: FontSize.body, fontWeight: FontWeight.semibold, color: Palette.textPrimary },
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  iconBtn: { position: 'relative', padding: 4 },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.orange,
    borderWidth: 1.5,
    borderColor: Palette.white,
  },
  roundBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: FontSize.h3,
    fontWeight: FontWeight.semibold,
    color: Palette.textPrimary,
  },
  action: { fontSize: FontSize.body, color: Palette.orange, fontWeight: FontWeight.semibold },
});
