import { useLocale } from '@contexts/locale-context';
import { Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import React, { useState } from 'react';

import {
  Alert,
  Platform,
  Image as RNImage,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';

import { AuthLayout, Button } from '@components/ui';

import { useAuthStore } from '@stores/authStore';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

type Role = 'buyer' | 'broker';

const ICONS = {
  person: require('@/assets/icons/icon-person.svg'),
  calendar: require('@/assets/icons/icon-calendar.svg'),
  location: require('@/assets/icons/icon-location.svg'),
  camera: require('@/assets/icons/icon-camera.svg'),
};

const INTEREST_KEYS = ['apartment', 'house', 'land', 'villa', 'rent', 'office'] as const;

const UpdateProfileSchema = z.object({
  name: z.string().min(2, { message: 'Tên tối thiểu 2 ký tự' }),
  dob: z.string().optional(),
  address: z.string().optional(),
});

type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export default function CompleteProfileScreen() {
  const { t } = useLocale();
  const { role } = useLocalSearchParams<{ role: Role }>();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (values: UpdateProfileInput) => {
    try {
      if (user) {
        setUser({
          ...user,
          displayName: values.name,
          name: values.name,
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
      const message = error instanceof Error ? error.message : 'Cập nhật thất bại';
      Alert.alert('Lỗi', message);
    }
  };

  // Get user initials for avatar placeholder
  const getInitials = (name?: string) => {
    if (!name) return 'NM';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initialValues: UpdateProfileInput = {
    name: user?.name || '',
    dob: '',
    address: '',
  };

  return (
    <AuthLayout
      step={t.completeProfile.step}
      title={t.completeProfile.title}
      subtitle={t.completeProfile.subtitle}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(UpdateProfileSchema)}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.form}>
            {/* Avatar Section - Horizontal Layout */}
            <View style={styles.avatarSection}>
              <TouchableOpacity style={styles.avatarContainer} onPress={handlePickAvatar}>
                {avatar ? (
                  <RNImage source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarInitials}>{getInitials(values.name)}</Text>
                  </View>
                )}
                {/* Camera Badge */}
                <View style={styles.cameraBadge}>
                  <Image source={ICONS.camera} style={styles.cameraBadgeIcon} />
                </View>
              </TouchableOpacity>
              <View style={styles.avatarInfo}>
                <Text style={styles.avatarTitle}>{t.completeProfile.avatarTitle}</Text>
                <Text style={styles.avatarHint}>{t.completeProfile.avatarHint}</Text>
              </View>
            </View>

            {/* Form Fields with SVG Icons */}

            {/* HỌ VÀ TÊN */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.completeProfile.nameLabel}</Text>
              <View
                style={[
                  styles.inputContainer,
                  touched.name && errors.name ? styles.inputError : null,
                ]}
              >
                <Image
                  source={ICONS.person}
                  style={styles.inputIcon}
                  tintColor={Palette.textMuted}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={t.completeProfile.namePlaceholder}
                  placeholderTextColor={Palette.textMuted}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
              </View>
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* NGÀY SINH */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.completeProfile.dateOfBirthLabel}</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={ICONS.calendar}
                  style={styles.inputIcon}
                  tintColor={Palette.textMuted}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={t.completeProfile.dateOfBirthPlaceholder}
                  placeholderTextColor={Palette.textMuted}
                  value={values.dob}
                  onChangeText={handleChange('dob')}
                  onBlur={handleBlur('dob')}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            {/* ĐỊA CHỈ */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.completeProfile.addressLabel}</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={ICONS.location}
                  style={styles.inputIcon}
                  tintColor={Palette.textMuted}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={t.completeProfile.addressPlaceholder}
                  placeholderTextColor={Palette.textMuted}
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                />
              </View>
            </View>

            {/* Interest Section */}
            <View style={styles.interestSection}>
              <Text style={styles.fieldLabel}>{t.completeProfile.interestsLabel}</Text>
              <View style={styles.chipsContainer}>
                {INTEREST_KEYS.map((key) => {
                  const isSelected = selectedInterests.includes(key);
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.chip, isSelected && styles.chipSelected]}
                      onPress={() => toggleInterest(key)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                        {t.completeProfile.interestTypes[key]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Spacer */}
            <View style={{ flex: 1, minHeight: 40 }} />

            {/* Submit Button */}
            <Button
              label={t.completeProfile.completeButton}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
              loading={isSubmitting}
              style={styles.submitButton}
            />
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  /* Form */
  form: {
    flex: 1,
    gap: Spacing.lg,
  },

  /* Avatar Section - Horizontal */
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    marginBottom: Spacing.sm,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Palette.border,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFECD2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Palette.orange,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Palette.white,
  },
  cameraBadgeIcon: {
    width: 14,
    height: 14,
    tintColor: Palette.white,
  },
  avatarInfo: {
    gap: 4,
  },
  avatarTitle: {
    fontSize: FontSize.h3,
    fontWeight: FontWeight.semibold,
    color: Palette.textPrimary,
  },
  avatarHint: {
    fontSize: FontSize.body,
    color: Palette.textMuted,
  },

  /* Field Group */
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semibold,
    color: Palette.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Palette.border,
    minHeight: 52,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  inputError: {
    borderWidth: 1.5,
    borderColor: Palette.badgeRed,
  },
  inputIcon: {
    width: 22,
    height: 22,
  },
  textInput: {
    flex: 1,
    fontSize: FontSize.h3,
    color: Palette.textPrimary,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
  },
  errorText: {
    fontSize: FontSize.caption,
    color: Palette.badgeRed,
  },

  /* Interest Section */
  interestSection: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Palette.border,
    backgroundColor: Palette.white,
  },
  chipSelected: {
    borderColor: Palette.textPrimary,
    backgroundColor: Palette.textPrimary,
  },
  chipText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.medium,
    color: Palette.textPrimary,
  },
  chipTextSelected: {
    color: Palette.white,
  },

  /* Submit Button */
  submitButton: {
    marginTop: Spacing.lg,
  },
});
