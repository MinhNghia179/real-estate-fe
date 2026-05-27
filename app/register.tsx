import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import React from 'react';

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Link, router } from 'expo-router';

import { authService } from '@services/authService';

import { useAuthStore } from '@stores/authStore';

import { RegisterSchema } from '@schemas';
import type { RegisterInput } from '@schemas';

export default function RegisterScreen() {
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (values: RegisterInput) => {
    try {
      const user = await authService.signUp(values);
      setUser(user);
      router.replace('/(tabs)');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đăng ký thất bại';
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tạo tài khoản</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(RegisterSchema)}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              {(
                [
                  { key: 'name', placeholder: 'Họ và tên' },
                  { key: 'email', placeholder: 'Email', keyboardType: 'email-address' as const },
                  {
                    key: 'phone',
                    placeholder: 'Số điện thoại',
                    keyboardType: 'phone-pad' as const,
                  },
                  { key: 'password', placeholder: 'Mật khẩu', secure: true },
                  { key: 'confirmPassword', placeholder: 'Xác nhận mật khẩu', secure: true },
                ] as Array<{
                  key: keyof RegisterInput;
                  placeholder: string;
                  keyboardType?: 'email-address' | 'phone-pad';
                  secure?: boolean;
                }>
              ).map(({ key, placeholder, keyboardType, secure }) => (
                <View key={key} style={styles.field}>
                  <TextInput
                    style={[styles.input, touched[key] && errors[key] ? styles.inputError : null]}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    secureTextEntry={secure}
                    value={values[key]}
                    onChangeText={handleChange(key)}
                    onBlur={handleBlur(key)}
                  />
                  {touched[key] && errors[key] && <Text style={styles.error}>{errors[key]}</Text>}
                </View>
              ))}

              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Đăng ký</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text>Đã có tài khoản? </Text>
                <Link href="/login" style={styles.link}>
                  Đăng nhập
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
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
