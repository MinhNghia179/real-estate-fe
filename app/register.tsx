import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import React, { useState } from 'react';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Link, router } from 'expo-router';

import {
  AuthLayout,
  AuthTabSwitcher,
  Button,
  Input,
  PhoneInput,
  SocialLoginButtons,
} from '@components/ui';
import { FontSize, Palette, Spacing } from '@constants/theme';

import { authService } from '@services/authService';
import { useAuthStore } from '@stores/authStore';

import type { RegisterInput } from '@schemas';
import { RegisterSchema } from '@schemas';

type AuthMethod = 'phone' | 'email';

export default function RegisterScreen() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (values: RegisterInput) => {
    if (!agreedToTerms) {
      Alert.alert('Lỗi', 'Bạn phải đồng ý với Điều khoản dịch vụ');
      return;
    }

    try {
      const user = await authService.signUp(values);
      setUser(user);
      router.push({
        pathname: '/verify-otp',
        params: { email: user.email, purpose: 'register' },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng ký thất bại';
      Alert.alert('Lỗi', message);
    }
  };

  const initialValues: RegisterInput = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  };

  return (
    <AuthLayout
      step="Bước 1 / 4"
      title="Tạo tài khoản"
      subtitle="Đăng ký bằng email hoặc số điện thoại để bắt đầu."
      contentContainerStyle={styles.content}
    >
      {/* Tab Switcher */}
      <AuthTabSwitcher
        tabs={[
          { id: 'phone', label: 'Số điện thoại' },
          { id: 'email', label: 'Email' },
        ]}
        activeTab={authMethod}
        onTabChange={(tab) => setAuthMethod(tab as AuthMethod)}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(RegisterSchema)}
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
            {/* Phone or Email */}
            {authMethod === 'phone' ? (
              <PhoneInput
                label="SỐ ĐIỆN THOẠI"
                placeholder="912 345 678"
                value={values.phone || ''}
                onChangeText={handleChange('phone')}
                onBlur={() => handleBlur('phone')}
                error={
                  touched.phone && errors.phone ? errors.phone : undefined
                }
              />
            ) : (
              <Input
                label="Email"
                placeholder="example@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={
                  touched.email && errors.email ? errors.email : undefined
                }
              />
            )}

            {/* Password */}
            <Input
              label="MẬT KHẨU"
              placeholder="Tối thiểu 8 ký tự"
              isPassword
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => handleBlur('password')}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
            />

            {/* Terms & Conditions */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View
                style={[
                  styles.checkbox,
                  agreedToTerms && styles.checkboxChecked,
                ]}
              >
                {agreedToTerms && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <View style={styles.termsTextContainer}>
                <Text style={styles.termsMainText}>
                  Tôi đồng ý với{' '}
                  <Text style={styles.termsLink}>Điều khoản dịch vụ</Text>
                  {' '}và{' '}
                  <Text style={styles.termsLink}>Chính sách bảo mật</Text>
                  {' '}của Đất Vàng.
                </Text>
              </View>
            </TouchableOpacity>

            {/* Submit Button */}
            <Button
              label="Tiếp tục"
              onPress={() => handleSubmit()}
              disabled={isSubmitting || !agreedToTerms}
              loading={isSubmitting}
              style={styles.button}
            />

            {/* Social Login */}
            <SocialLoginButtons
              onPress={(provider) =>
                Alert.alert(
                  `${provider} Sign In chưa được triển khai`
                )
              }
              containerStyle={styles.socialSection}
            />

            {/* Login Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Đã có tài khoản? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Đăng nhập</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: { marginBottom: Spacing.xl },
  form: { gap: Spacing.lg },

  /* Checkbox */
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Palette.orange,
    backgroundColor: Palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
  },
  checkboxChecked: {
    backgroundColor: Palette.orange,
  },
  termsTextContainer: {
    flex: 1,
  },
  termsMainText: {
    fontSize: FontSize.caption,
    color: Palette.textSecondary,
    lineHeight: 18,
  },
  termsLink: {
    color: Palette.orange,
    fontWeight: '600',
  },

  /* Button */
  button: { marginTop: Spacing.md },

  /* Social Section */
  socialSection: {
    marginVertical: Spacing.lg,
  },

  /* Footer */
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.lg,
  },
  footerText: { fontSize: FontSize.body, color: Palette.textSecondary },
  footerLink: {
    fontSize: FontSize.body,
    color: Palette.orange,
    fontWeight: '600',
  },
});
