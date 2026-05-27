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

import type { LoginInput } from '@schemas';
import { LoginSchema } from '@schemas';

type AuthMethod = 'phone' | 'email';

export default function LoginScreen() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (values: LoginInput) => {
    try {
      const user = await authService.signIn(values);
      setUser(user);
      router.replace('/(tabs)');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Email hoặc mật khẩu không đúng';
      Alert.alert('Đăng nhập thất bại', message);
    }
  };

  const initialValues: LoginInput = {
    email: '',
    password: '',
  };

  return (
    <AuthLayout
      title="Đăng nhập"
      subtitle="Đăng nhập bằng email hoặc số điện thoại để tiếp tục."
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
        validationSchema={toFormikValidationSchema(LoginSchema)}
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
            {/* Email Input */}
            {authMethod === 'email' ? (
              <Input
                label="Email"
                placeholder="example@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => handleBlur('email')}
                error={
                  touched.email && errors.email ? errors.email : undefined
                }
              />
            ) : (
              <PhoneInput
                label="SỐ ĐIỆN THOẠI"
                placeholder="912 345 678"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => handleBlur('email')}
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
              onBlur={handleBlur('password')}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
            />

            {/* Forgot Password Link */}
            <Link href="/forgot-password" asChild>
              <TouchableOpacity style={styles.forgotLink}>
                <Text style={styles.forgotLinkText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </Link>

            {/* Submit Button */}
            <Button
              label="Đăng nhập"
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
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

            {/* Register Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Chưa có tài khoản? </Text>
              <Link href="/register" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Đăng ký ngay</Text>
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

  /* Forgot Password */
  forgotLink: { alignSelf: 'flex-end', paddingVertical: Spacing.sm },
  forgotLinkText: {
    fontSize: FontSize.body,
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
