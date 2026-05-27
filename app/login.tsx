import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import React, { useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Link, router } from 'expo-router';

import { authService } from '@services/authService';

import { useAuthStore } from '@stores/authStore';

import { LoginSchema } from '@schemas';
import type { LoginInput } from '@schemas';

export default function LoginScreen() {
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (values: LoginInput) => {
    try {
      const user = await authService.signIn(values);
      setUser(user);
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Đăng nhập</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={toFormikValidationSchema(LoginSchema)}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.form}>
            <View style={styles.field}>
              <TextInput
                style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </View>

            <View style={styles.field}>
              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password ? styles.inputError : null,
                ]}
                placeholder="Mật khẩu"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <Link href="/forgot-password" style={styles.link}>
              Quên mật khẩu?
            </Link>

            <TouchableOpacity
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text>Chưa có tài khoản? </Text>
              <Link href="/register" style={styles.link}>
                Đăng ký
              </Link>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, color: '#1a1a1a' },
  form: { gap: 16 },
  field: { gap: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  inputError: { borderColor: '#ef4444' },
  error: { fontSize: 12, color: '#ef4444' },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  link: { color: '#2563eb', fontWeight: '500' },
});
