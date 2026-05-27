import { router } from 'expo-router';
import React, { useState } from 'react';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthLayout, Button } from '@components/ui';
import { FontSize, Palette, Spacing } from '@constants/theme';

type RoleType = 'buyer' | 'broker' | null;

export default function SelectRoleScreen() {
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
      title="Chọn vai trò"
      subtitle="Bạn muốn sử dụng Đất Vàng để làm gì?"
      contentContainerStyle={styles.content}
    >
      <View style={styles.rolesContainer}>
        <RoleCard
          id="buyer"
          emoji="🏠"
          title="Người mua / Thuê"
          description="Tìm kiếm và so sánh các bất động sản"
        />
        <RoleCard
          id="broker"
          emoji="💼"
          title="Môi giới / Bán"
          description="Đăng tin, quản lý và bán bất động sản"
        />
      </View>

      <Button
        label="Tiếp tục"
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
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: { marginBottom: Spacing.xl },

  /* Roles Container */
  rolesContainer: {
    gap: Spacing.lg,
    marginBottom: Spacing.xxl,
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
