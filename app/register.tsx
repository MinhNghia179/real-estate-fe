import { useLocale } from '@contexts/locale-context';
import { Ionicons } from '@expo/vector-icons';
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

import type { RegisterInput } from '@schemas';
import { RegisterSchema } from '@schemas';

import { FontSize, FontWeight, Palette, Spacing } from '@constants/theme';

type AuthMethod = 'phone' | 'email';

export default function RegisterScreen() {
  const { t } = useLocale();
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (_values: RegisterInput) => {
    if (!agreedToTerms) {
      Alert.alert('Lỗi', t.auth.errors.agreeToTerms);
      return;
    }

    try {
      router.replace('/select-role');
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
    <AuthLayout step={t.register.step} title={t.register.title} subtitle={t.register.subtitle}>
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
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.mainContainer}>
            {/* Inputs Section */}
            <View style={styles.inputSection}>
              {/* Phone or Email */}
              {authMethod === 'phone' ? (
                <PhoneInput
                  label={t.auth.labels.phoneNumber}
                  placeholder={t.register.tabs.phone}
                  value={values.phone || ''}
                  onChangeText={handleChange('phone')}
                  onBlur={() => handleBlur('phone')}
                  error={touched.phone && errors.phone ? errors.phone : undefined}
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
                  error={touched.email && errors.email ? errors.email : undefined}
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
                error={touched.password && errors.password ? errors.password : undefined}
              />

              {/* Terms & Conditions */}
              <Pressable
                style={styles.checkboxContainer}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
                </View>
                <Text style={styles.termsText}>
                  {t.register.agreeTerms}
                  <Text style={styles.termsLink}>{t.register.termsOfService}</Text>
                  {t.register.and}
                  <Text style={styles.termsLink}>{t.register.privacyPolicy}</Text>
                  {t.register.ofDatVang}
                </Text>
              </Pressable>
            </View>

            {/* Buttons Section */}
            <View style={styles.bottomSection}>
              {/* Social Login */}
              <SocialLoginButtons
                onPress={(provider) => Alert.alert(`${provider} Sign In chưa được triển khai`)}
                containerStyle={{ marginVertical: 20 }}
              />

              {/* Submit Button */}
              <Button
                label={t.register.continueButton}
                onPress={() => handleSubmit()}
                disabled={isSubmitting || !agreedToTerms}
                loading={isSubmitting}
                style={{ marginTop: 12 }}
              />
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
    gap: Spacing.lg,
  },
  inputSection: {
    gap: Spacing.lg,
  },
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
  },
  checkboxChecked: {
    backgroundColor: Palette.orange,
  },
  termsText: {
    fontSize: FontSize.caption,
    color: Palette.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  termsLink: {
    color: Palette.orange,
    fontWeight: FontWeight.semibold,
  },
  bottomSection: {},
});
