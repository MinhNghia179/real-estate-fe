import { OtpInput as RNOtpInput } from 'react-native-otp-entry';

import React from 'react';

import { StyleSheet, type ViewStyle } from 'react-native';

import { ThemedText, ThemedView } from "@components/ui";
import { FontSize, Palette, Spacing } from '@constants/theme';

interface OTPInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  numberOfDigits?: number;
  value?: string;
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
}

export const OTPInput = ({
  label,
  error,
  containerStyle,
  numberOfDigits = 6,
  onTextChange,
  onFilled,
}: OTPInputProps) => {
  return (
    <ThemedView style={[styles.wrapper, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <ThemedView style={[styles.container, error && styles.containerError]}>
        <RNOtpInput
          numberOfDigits={numberOfDigits}
          focusColor={error ? Palette.badgeRed : Palette.orange}
          onTextChange={onTextChange}
          onFilled={onFilled}
          secureTextEntry={false}
          type="numeric"
          theme={{
            containerStyle: styles.otpInput,
            pinCodeContainerStyle: styles.otpText,
            pinCodeTextStyle: {
              color: Palette.textPrimary,
              fontSize: FontSize.h2,
              fontWeight: '700',
            },
          }}
        />
      </ThemedView>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.sm },
  label: {
    fontSize: FontSize.caption,
    fontWeight: '500',
    color: Palette.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  container: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.md,
    backgroundColor: Palette.white,
  },
  containerError: {
    backgroundColor: '#FEF2F2',
  },
  otpInput: {
    width: '100%',
    gap: Spacing.md,
  },
  otpText: {
    borderWidth: 2,
    borderColor: Palette.border,
    borderRadius: Spacing.md,
    borderBottomColor: Palette.border,
  },
  otpTextError: {
    borderColor: Palette.badgeRed,
    borderBottomColor: Palette.badgeRed,
  },
  error: { fontSize: FontSize.caption, color: Palette.badgeRed },
});
