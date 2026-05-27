import { router } from 'expo-router';
import React, { useState } from 'react';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthLayout, Button } from '@components/ui';
import { FontSize, Palette, Spacing } from '@constants/theme';
import { useLocale } from '@contexts/locale-context';

type RoleType = 'buyer' | 'broker' | null;

export default function SelectRoleScreen() {
  const { t } = useLocale();
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert('Lỗi', 'Vui lòng chọn vai trò');
      return;
    }

    router.push({
      pathname: '/complete-profile',
      params: { role: selectedRole },
    });
  };

  const RoleCard = ({
    id,
    emoji,
    title,
    description,
  }: {
    id: RoleType;
    emoji: string;
    title: string;
    description: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.roleCard,
        selectedRole === id && styles.roleCardSelected,
      ]}
      onPress={() => setSelectedRole(id)}
    >
      <View style={styles.roleCardContent}>
        <View
          style={[
            styles.roleIcon,
            selectedRole === id && styles.roleIconSelected,
          ]}
        >
          <Text style={styles.roleIconText}>{emoji}</Text>
        </View>
        <Text style={styles.roleTitle}>{title}</Text>
        <Text style={styles.roleDescription}>{description}</Text>
      </View>
      {selectedRole === id && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <AuthLayout
      step="Bước 3 / 4"
      title={t.selectRole.title}
      subtitle={t.selectRole.subtitle}
      contentContainerStyle={styles.content}
    >
      <View style={styles.form}>
        <View style={styles.rolesContainer}>
          <RoleCard
            id="buyer"
            emoji="🏠"
            title={t.selectRole.buyer}
            description={t.selectRole.buyerDesc}
          />
          <RoleCard
            id="broker"
            emoji="💼"
            title={t.selectRole.broker}
            description={t.selectRole.brokerDesc}
          />
        </View>

        <View style={styles.buttonsSection}>
          <Button
            label={t.selectRole.continueButton}
            onPress={handleContinue}
            disabled={!selectedRole}
            style={styles.button}
          />

          <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Bỏ qua bước này</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: { marginBottom: 0 },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Spacing.lg,
  },
  buttonsSection: { gap: 0 },

  /* Roles Container */
  rolesContainer: {
    gap: Spacing.lg,
    marginBottom: 0,
  },

  /* Role Card */
  roleCard: {
    borderWidth: 2,
    borderColor: Palette.border,
    borderRadius: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Palette.white,
    position: 'relative',
  },
  roleCardSelected: {
    borderColor: Palette.orange,
    backgroundColor: '#FFF5EE',
  },

  roleCardContent: {
    alignItems: 'center',
  },

  /* Role Icon */
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  roleIconSelected: {
    backgroundColor: Palette.orange,
  },
  roleIconText: {
    fontSize: 40,
  },

  /* Role Title & Description */
  roleTitle: {
    fontSize: FontSize.h3,
    fontWeight: '600',
    color: Palette.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  roleDescription: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  /* Checkmark */
  checkmark: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Palette.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 18,
    color: Palette.white,
    fontWeight: '700',
  },

  /* Button */
  button: {
    marginBottom: Spacing.lg,
  },

  /* Skip Button */
  skipButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  skipText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    fontWeight: '500',
  },
});
