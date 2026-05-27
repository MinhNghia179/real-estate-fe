import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { router } from 'expo-router';
import React from 'react';

import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthLayout, Button, Input } from '@components/ui';
import { FontSize, Palette, Spacing } from '@constants/theme';

import { authService } from '@services/authService';

import { ForgotPasswordSchema } from '@schemas';
import type { ForgotPasswordInput } from '@schemas';

export default function ForgotPasswordScreen() {
  const handleSubmit = async (values: ForgotPasswordInput) => {
    try {
      await authService.resetPassword(values.email);
      Alert.alert(
        'Đã gửi email',
        'Kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Không thể gửi email';
      Alert.alert('Lỗi', message);
    }
  };

  return (
    <AuthLayout
      title="Quên mật khẩu?"
      subtitle="Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu"
      contentContainerStyle={styles.content}
    >
      <Formik
        initialValues={{ email: '' }}
        validationSchema={toFormikValidationSchema(ForgotPasswordSchema)}
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
            <Input
              label="Email"
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <Button
              label="Gửi email"
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
              loading={isSubmitting}
              style={styles.button}
            />

            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: { marginBottom: Spacing.xl },
  form: { gap: Spacing.lg },
  button: { marginTop: Spacing.md },
  backButton: { alignItems: 'center', paddingVertical: Spacing.lg },
  backButtonText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    fontWeight: '600',
  },
});
