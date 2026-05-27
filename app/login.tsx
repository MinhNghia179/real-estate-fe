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
import { useLocale } from '@contexts/locale-context';

import type { LoginInput } from '@schemas';
import { LoginSchema } from '@schemas';

type AuthMethod = 'phone' | 'email';

export default function LoginScreen() {
  const { t } = useLocale();
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
          : t.auth.errors.invalidEmail;
      Alert.alert(t.auth.errors.signInFailed, message);
    }
  };

  const initialValues: LoginInput = {
    email: '',
    password: '',
  };

  return (
    <AuthLayout
      title={t.login.title}
      subtitle={t.login.subtitle}
      contentContainerStyle={styles.content}
    >
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
            {/* Inputs Section */}
            <View style={styles.inputsSection}>
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
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                />
              ) : (
                <PhoneInput
                  label={t.auth.labels.phoneNumber}
                  placeholder={t.login.phonePlaceholder}
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
                label={t.auth.labels.password}
                placeholder={t.login.passwordPlaceholder}
                icon="lock-closed-outline"
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
                  <Text style={styles.forgotLinkText}>{t.login.forgotPassword}</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Buttons Section */}
            <View style={styles.buttonsSection}>
              {/* Submit Button */}
              <Button
                label={t.login.signInButton}
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
                <Text style={styles.footerText}>{t.login.noAccount}</Text>
                <Link href="/register" asChild>
                  <TouchableOpacity>
                    <Text style={styles.footerLink}>{t.login.signUpNow}</Text>
                  </TouchableOpacity>
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
  content: { marginBottom: 0 },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Spacing.xl,
  },
  inputsSection: { gap: Spacing.lg },
  buttonsSection: { gap: 0 },

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
