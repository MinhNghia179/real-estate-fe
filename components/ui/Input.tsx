import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';

import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  type TextInputProps,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import { FontSize, Palette, Radius, Spacing } from '@constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export const Input = ({
  label,
  error,
  prefix,
  containerStyle,
  isPassword,
  style,
  ...props
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          focused && styles.containerFocused,
          !!error && styles.containerError,
        ]}
      >
        {prefix && <View style={styles.prefix}>{prefix}</View>}
        <RNTextInput
          style={[styles.input, style]}
          placeholderTextColor={Palette.textMuted}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={styles.suffix}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={Palette.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 4 },
  label: {
    fontSize: FontSize.caption,
    fontWeight: '500',
    color: Palette.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Palette.border,
    borderRadius: Radius.md,
    backgroundColor: Palette.white,
    minHeight: 52,
  },
  containerFocused: { borderColor: Palette.orange },
  containerError: { borderColor: Palette.badgeRed },
  prefix: { paddingLeft: Spacing.md, paddingRight: Spacing.sm },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.body,
    color: Palette.textPrimary,
  },
  suffix: { paddingRight: Spacing.md },
  error: { fontSize: FontSize.caption, color: Palette.badgeRed },
});
