import { useLocale } from '@contexts/locale-context';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import React, { useState } from 'react';

import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Link, router } from 'expo-router';

import {
  AuthLayout,
  AuthTabSwitcher,
  Button,
  Input,
  PhoneInput,
  SocialLoginButtons,
} from '@components/ui';

import { useAuthStore } from '@stores/authStore';

import type { LoginInput } from '@schemas';
import { LoginSchema } from '@schemas';

import { FontSize, FontWeight, Palette, Spacing } from '@constants/theme';

type AuthMethod = 'phone' | 'email';

export default function LoginScreen() {
  const { t } = useLocale();
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const setUser = useAuthStore((s) => s.setUser);
  const handleSubmit = async (values: LoginInput) => {
    try {
      // const user = await authService.signIn(values);
      // setUser(user);
      // router.replace('/(tabs)');
      router.replace('/select-role');
    } catch (error) {
      const message = error instanceof Error ? error.message : t.auth.errors.invalidEmail;
      Alert.alert(t.auth.errors.signInFailed, message);
    }
  };

  const initialValues: LoginInput = {
    email: '',
    password: '',
  };

  return (
    <AuthLayout title={t.login.title} subtitle={t.login.subtitle}>
      {/* Tab Switcher */}
      <AuthTabSwitcher
        tabs={[
          { id: 'phone', label: t.login.tabs.phone },
          { id: 'email', label: t.login.tabs.email },
        ]}
        activeTab={authMethod}
        onTabChange={(tab) => setAuthMethod(tab as AuthMethod)}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(LoginSchema)}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.mainContainer}>
            {/* Inputs Section */}
            <View style={styles.inputSection}>
              {/* Email Input */}
              {authMethod === 'email' ? (
                <Input
                  label={t.auth.labels.email}
                  placeholder={t.login.emailPlaceholder}
                  icon="mail-outline"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                />
              ) : (
                <PhoneInput
                  label={t.auth.labels.phoneNumber}
                  placeholder={t.login.phonePlaceholder}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                />
              )}

              {/* Password */}
              <Input
                label={t.auth.labels.password}
                placeholder={t.login.passwordPlaceholder}
                icon="lock-closed-outline"
                isPassword
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password ? errors.password : undefined}
              />

              {/* Forgot Password Link */}
              <Link href="/forgot-password" asChild>
                <Pressable style={styles.forgotPasswordButton}>
                  <Text style={styles.forgotPasswordText}>{t.login.forgotPassword}</Text>
                </Pressable>
              </Link>
            </View>

            {/* Buttons Section */}
            <View style={styles.bottomSection}>
              {/* Submit Button */}
              <Button
                label={t.login.signInButton}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                loading={isSubmitting}
                style={{ marginTop: 12 }}
              />

              {/* Social Login */}
              <SocialLoginButtons
                onPress={(provider) => Alert.alert(`${provider} Sign In chưa được triển khai`)}
                containerStyle={{ marginVertical: 20 }}
              />

              {/* Register Link */}
              <View style={styles.registerRow}>
                <Text style={styles.registerText}>{t.login.noAccount}</Text>
                <Link href="/register" asChild>
                  <Pressable>
                    <Text style={styles.registerLink}>{t.login.signUpNow}</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Spacing.xl,
  },
  inputSection: {
    gap: Spacing.lg,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    paddingVertical: Spacing.sm,
  },
  forgotPasswordText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semibold,
    color: Palette.orange,
  },
  bottomSection: {},
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.lg,
  },
  registerText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
  },
  registerLink: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semibold,
    color: Palette.orange,
  },
});
