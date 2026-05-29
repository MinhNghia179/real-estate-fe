import { useLocale } from '@contexts/locale-context';

import React, { useState } from 'react';

import { Alert, Pressable, StyleSheet } from 'react-native';

import { Image } from 'expo-image';
import { ThemedText, ThemedView } from "@components/ui";
import { router } from 'expo-router';

import { AuthLayout, Button } from '@components/ui';

import { FontSize, FontWeight, Palette, Spacing } from '@constants/theme';

type RoleType = 'buyer' | 'broker' | null;

const ICONS = {
  buyer: require('@/assets/icons/icon-role-buyer.svg'),
  broker: require('@/assets/icons/icon-role-broker.svg'),
};
import { ThemedText, ThemedView } from "@components/ui";

export default function SelectRoleScreen() {
  const { t } = useLocale();
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert(t.selectRole.title, 'Please select a role');
      return;
    }

    router.push({
      pathname: '/complete-profile',
      params: { role: selectedRole },
    });
  };

  const RoleCard = ({ id }: { id: 'buyer' | 'broker' }) => {
    const isSelected = selectedRole === id;
    const badges = id === 'buyer' ? t.selectRole.buyerBadges : t.selectRole.brokerBadges;
    const title = id === 'buyer' ? t.selectRole.buyer : t.selectRole.broker;
    const desc = id === 'buyer' ? t.selectRole.buyerDesc : t.selectRole.brokerDesc;

    return (
      <Pressable
        style={[styles.card, isSelected ? styles.cardSelected : styles.cardUnselected]}
        onPress={() => setSelectedRole(id)}
      >
        <ThemedView style={styles.iconContainer}>
          <Image source={ICONS[id]} style={[styles.icon, { opacity: isSelected ? 1 : 0.7 }]} />
        </ThemedView>

        {/* Content */}
        <ThemedView style={styles.contentContainer}>
          <ThemedText style={styles.cardTitle}>{title}</ThemedText>
          <ThemedText style={styles.cardDescription}>{desc}</ThemedText>

          {/* Badges */}
          <ThemedView style={styles.badgesRow}>
            {badges.map((badge) => (
              <ThemedView key={badge} style={styles.badgeContainer}>
                <ThemedText style={styles.badgeText}>{badge}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Checkmark - Top Right Corner */}
        {isSelected && (
          <ThemedView style={styles.checkmark}>
            <ThemedText style={styles.checkmarkText}>✓</ThemedText>
          </ThemedView>
        )}
      </Pressable>
    );
  };

  return (
    <AuthLayout step="Step 3 / 4" title={t.selectRole.title} subtitle={t.selectRole.subtitle}>
      <ThemedView style={styles.mainContainer}>
        {/* Role Cards */}
        <ThemedView style={styles.cardsSection}>
          <ThemedView style={styles.cardWrapper}>
            <RoleCard id="buyer" />
            <RoleCard id="broker" />
          </ThemedView>

          {/* Info Banner */}
          <ThemedView style={styles.infoBanner}>
            <ThemedText style={styles.infoBannerText}>ℹ {t.selectRole.infoBanner}</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Continue Button */}
        <Button
          label={t.selectRole.continueButton}
          onPress={handleContinue}
          disabled={!selectedRole}
          fullWidth
        />
      </ThemedView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Spacing.xl,
  },
  cardsSection: {
    gap: Spacing.base,
  },
  cardWrapper: {
    gap: Spacing.base,
  },
  card: {
    borderWidth: 2,
    borderRadius: Spacing.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    gap: Spacing.base,
    position: 'relative',
  },
  cardSelected: {
    borderColor: Palette.orange,
    backgroundColor: '#FFFBEB',
  },
  cardUnselected: {
    borderColor: Palette.border,
    backgroundColor: Palette.white,
  },
  iconContainer: {
    flexShrink: 0,
  },
  icon: {
    width: 56,
    height: 56,
  },
  contentContainer: {
    flex: 1,
    gap: Spacing.sm,
  },
  cardTitle: {
    fontSize: FontSize.h3,
    fontWeight: FontWeight.bold,
    color: Palette.textPrimary,
  },
  cardDescription: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  badgeContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: Spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: FontSize.caption,
    color: Palette.orange,
    fontWeight: FontWeight.semibold,
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Palette.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: Palette.white,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.body,
  },
  infoBanner: {
    backgroundColor: Palette.divider,
    borderRadius: Spacing.md,
    padding: Spacing.base,
    marginTop: Spacing.md,
  },
  infoBannerText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
  },
});
