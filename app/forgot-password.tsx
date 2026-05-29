import { useLocale } from '@contexts/locale-context';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import React from 'react';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import { AuthLayout, Button, Input } from '@components/ui';

import { authService } from '@services/authService';

import type { ForgotPasswordInput } from '@schemas';
import { ForgotPasswordSchema } from '@schemas';

import { FontSize, Palette, Spacing } from '@constants/theme';

export default function ForgotPasswordScreen() {
  const { t } = useLocale();

  const handleSubmit = async (values: ForgotPasswordInput) => {
    try {
      await authService.resetPassword(values.email);
      Alert.alert('Đã gửi email', t.forgotPassword.success, [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Không thể gửi email';
      Alert.alert('Lỗi', message);
    }
  };

  return (
    <AuthLayout
      title={t.forgotPassword.title}
      subtitle={t.forgotPassword.subtitle}
      contentContainerStyle={styles.content}
    >
      <Formik
        initialValues={{ email: '' }}
        validationSchema={toFormikValidationSchema(ForgotPasswordSchema)}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.form}>
            <View style={styles.inputsSection}>
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
            </View>

            <View style={styles.buttonsSection}>
              <Button
                label={t.forgotPassword.sendButton}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                loading={isSubmitting}
                style={styles.button}
              />

              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← {t.forgotPassword.backButton}</Text>
              </TouchableOpacity>
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
  button: { marginTop: Spacing.md },
  backButton: { alignItems: 'center', paddingVertical: Spacing.lg },
  backButtonText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    fontWeight: '600',
  },
});
