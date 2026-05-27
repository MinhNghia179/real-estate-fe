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
import { useLocale } from '@contexts/locale-context';

import type { RegisterInput } from '@schemas';
import { RegisterSchema } from '@schemas';

type AuthMethod = 'phone' | 'email';

export default function RegisterScreen() {
  const { t } = useLocale();
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (values: RegisterInput) => {
    if (!agreedToTerms) {
      Alert.alert('Lỗi', t.auth.errors.agreeToTerms);
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
      const message = error instanceof Error ? error.message : t.auth.errors.signUpFailed;
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
      step={t.register.step}
      title={t.register.title}
      subtitle={t.register.subtitle}
      contentContainerStyle={styles.content}
    >
      {/* Tab Switcher */}
      <AuthTabSwitcher
        tabs={[
          { id: 'phone', label: t.register.tabs.phone },
          { id: 'email', label: t.register.tabs.email },
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
            {/* Inputs Section */}
            <View style={styles.inputsSection}>
              {/* Name */}
              <Input
                label={t.auth.labels.fullName}
                placeholder={t.auth.placeholders.fullName}
                icon="person-outline"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => handleBlur('name')}
                error={
                  touched.name && errors.name ? errors.name : undefined
                }
              />

              {/* Phone or Email */}
              {authMethod === 'phone' ? (
                <PhoneInput
                  label={t.auth.labels.phoneNumber}
                  placeholder={t.register.tabs.phone}
                  value={values.phone || ''}
                  onChangeText={handleChange('phone')}
                  onBlur={() => handleBlur('phone')}
                  error={
                    touched.phone && errors.phone ? errors.phone : undefined
                  }
                />
              ) : (
                <Input
                  label={t.auth.labels.email}
                  placeholder={t.auth.placeholders.email}
                  icon="mail-outline"
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
                label={t.auth.labels.password}
                placeholder={t.auth.placeholders.password}
                icon="lock-closed-outline"
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
                    {t.register.agreeTerms}
                    <Text style={styles.termsLink}>{t.register.termsOfService}</Text>
                    {t.register.and}
                    <Text style={styles.termsLink}>{t.register.privacyPolicy}</Text>
                    {t.register.ofDatVang}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Buttons Section */}
            <View style={styles.buttonsSection}>
              {/* Submit Button */}
              <Button
                label={t.register.continueButton}
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
                <Text style={styles.footerText}>{t.register.haveAccount}</Text>
                <Link href="/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.footerLink}>{t.register.signIn}</Text>
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
    gap: Spacing.lg,
  },
  inputsSection: { gap: Spacing.lg },
  buttonsSection: { gap: 0 },

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
