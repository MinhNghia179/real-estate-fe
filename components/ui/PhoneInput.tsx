import React from 'react';

import { StyleSheet, Text, TextInput, View, type ViewStyle } from 'react-native';

import { FontSize, Palette, Spacing } from '@constants/theme';

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  containerStyle?: ViewStyle;
  countryCode?: string;
  countryEmoji?: string;
}

export const PhoneInput = ({
  label,
  placeholder = '912 345 678',
  value,
  onChangeText,
  onBlur,
  error,
  containerStyle,
  countryCode = '+84',
  countryEmoji = '🇻🇳',
}: PhoneInputProps) => {
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : styles.inputNormal,
        ]}
      >
        <Text style={styles.countryCode}>
          {countryEmoji} {countryCode}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Palette.textMuted}
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: FontSize.caption,
    fontWeight: '600',
    color: Palette.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Spacing.md,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },
  inputNormal: {
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.white,
  },
  inputError: {
    borderWidth: 1.5,
    borderColor: '#EF4444',
    backgroundColor: Palette.white,
  },
  countryCode: {
    fontSize: FontSize.h3,
    fontWeight: '600',
    color: Palette.textPrimary,
    marginRight: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: FontSize.body,
    color: Palette.textPrimary,
    padding: 0,
  },
  errorText: {
    fontSize: FontSize.caption,
    color: '#EF4444',
    marginTop: Spacing.xs,
  },
});
