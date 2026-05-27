import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';

import {
  Alert,
  Image as RNImage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AuthLayout, Button, Input } from '@components/ui';
import { FontSize, Palette, Spacing } from '@constants/theme';

import { useAuthStore } from '@stores/authStore';
import { useLocale } from '@contexts/locale-context';
import { z } from 'zod';

type Role = 'buyer' | 'broker';

const UpdateProfileSchema = z.object({
  name: z.string().min(2, { message: 'Tên tối thiểu 2 ký tự' }),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, { message: 'Số điện thoại không hợp lệ' }),
});

type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export default function CompleteProfileScreen() {
  const { t } = useLocale();
  const { role } = useLocalSearchParams<{ role: Role }>();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [avatar, setAvatar] = useState<string | null>(null);

  const handlePickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chọn ảnh');
    }
  };

  const handleSubmit = async (values: UpdateProfileInput) => {
    try {
      if (user) {
        setUser({
          ...user,
          displayName: values.name,
          name: values.name,
          phone: values.phone,
          photoURL: avatar || null,
          avatar: avatar || undefined,
        });
      }

      Alert.alert('Thành công', 'Hồ sơ đã được cập nhật!', [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/(tabs)');
          },
        },
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Cập nhật thất bại';
      Alert.alert('Lỗi', message);
    }
  };

  const initialValues: UpdateProfileInput = {
    name: user?.name || '',
    phone: user?.phone || '',
  };

  return (
    <AuthLayout
      step="Bước 4 / 4"
      title="Hoàn tất hồ sơ"
      subtitle="Thêm ảnh đại diện và thông tin cá nhân"
      contentContainerStyle={styles.content}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(UpdateProfileSchema)}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View style={styles.form}>
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={handlePickAvatar}
              >
                {avatar ? (
                  <RNImage
                    source={{ uri: avatar }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarPlaceholderText}>📷</Text>
                  </View>
                )}
                <View style={styles.editBadge}>
                  <Text style={styles.editBadgeText}>✏️</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.avatarHint}>Chọn ảnh đại diện</Text>
            </View>

            {/* Form Fields */}
            <Input
              label="Họ và tên"
              placeholder="Nhập tên của bạn"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && errors.name ? errors.name : undefined}
            />

            <Input
              label="Số điện thoại"
              placeholder="0123456789"
              keyboardType="phone-pad"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              error={
                touched.phone && errors.phone ? errors.phone : undefined
              }
            />

            {/* Role Info */}
            <View style={styles.roleInfo}>
              <Text style={styles.roleLabel}>Vai trò đã chọn:</Text>
              <Text style={styles.roleValue}>
                {role === 'buyer'
                  ? '👤 Người mua / Thuê'
                  : '💼 Môi giới / Bán'}
              </Text>
            </View>

            {/* Submit Button */}
            <Button
              label="Hoàn tất"
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
              loading={isSubmitting}
              style={styles.button}
            />

            {/* Skip Link */}
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)')}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>Bỏ qua và vào ứng dụng</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: { marginBottom: Spacing.xl },

  /* Avatar Section */
  form: { gap: Spacing.lg, marginBottom: Spacing.xl },
  avatarSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Palette.border,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Palette.border,
    borderStyle: 'dashed',
  },
  avatarPlaceholderText: {
    fontSize: 48,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Palette.white,
  },
  editBadgeText: {
    fontSize: 18,
  },
  avatarHint: {
    fontSize: FontSize.caption,
    color: Palette.textMuted,
  },

  /* Role Info */
  roleInfo: {
    backgroundColor: '#F3F4F6',
    borderRadius: Spacing.md,
    padding: Spacing.md,
  },
  roleLabel: {
    fontSize: FontSize.caption,
    color: Palette.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  roleValue: {
    fontSize: FontSize.h3,
    color: Palette.textPrimary,
    fontWeight: '600',
  },

  /* Button */
  button: { marginTop: Spacing.lg },

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
