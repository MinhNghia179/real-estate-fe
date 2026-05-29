import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';

import {
  TextInput as RNTextInput,
  StyleSheet,
  type TextInputProps,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';

import { FontSize, Palette, Radius, Spacing } from '@constants/theme';
import { ThemedText, ThemedView } from './index';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export const Input = ({
  label,
  error,
  prefix,
  icon,
  containerStyle,
  isPassword,
  style,
  ...props
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ThemedView style={[styles.wrapper, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <ThemedView
        style={[
          styles.container,
          focused && styles.containerFocused,
          !!error && styles.containerError,
        ]}
      >
        {(prefix || icon) && (
          <ThemedView style={styles.prefix}>
            {prefix}
            {icon && !prefix && <Ionicons name={icon} size={20} color={Palette.textMuted} />}
          </ThemedView>
        )}
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
      </ThemedView>
      {!!error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </ThemedView>
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
  prefix: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacing.md,
    paddingRight: Spacing.sm,
    gap: Spacing.xs,
  },
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
