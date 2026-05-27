import React from 'react';

import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { FontSize, Palette, Spacing } from '@constants/theme';
import { Input } from './Input';

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
      <View style={styles.container}>
        <Text style={styles.countryCode}>
          {countryEmoji} {countryCode}
        </Text>
        <Input
          placeholder={placeholder}
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
          onBlur={() => onBlur()}
          error={error}
          containerStyle={styles.inputWrapper}
        />
      </View>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  countryCode: {
    fontSize: FontSize.h3,
    fontWeight: '600',
    color: Palette.textPrimary,
    paddingHorizontal: Spacing.md,
    borderRightWidth: 1,
    borderRightColor: Palette.border,
  },
  inputWrapper: {
    flex: 1,
  },
});
