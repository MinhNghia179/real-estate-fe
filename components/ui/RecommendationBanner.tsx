import { Ionicons } from '@expo/vector-icons';

import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

interface RecommendationBannerProps {
  count: number;
  subtitle?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const RecommendationBanner = ({
  count,
  subtitle,
  onPress,
  style,
}: RecommendationBannerProps) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.9}>
    <View style={styles.content}>
      <Text style={styles.eyebrow}>GỢI Ý CHO BẠN</Text>
      <Text style={styles.title}>
        <Text style={styles.count}>{count}</Text> tin mới phù hợp{'\n'}nhu cầu của bạn
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    <TouchableOpacity style={styles.cta} onPress={onPress}>
      <Ionicons name="arrow-forward" size={20} color={Palette.dark} />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.dark,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: { flex: 1, gap: 4 },
  eyebrow: {
    fontSize: FontSize.xs,
    color: Palette.textMuted,
    letterSpacing: 1,
    fontWeight: FontWeight.semibold,
  },
  title: {
    fontSize: FontSize.h3,
    color: Palette.white,
    fontWeight: FontWeight.semibold,
    lineHeight: 22,
  },
  count: { color: Palette.orange },
  subtitle: { fontSize: FontSize.caption, color: Palette.textMuted },
  cta: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.md,
  },
});
