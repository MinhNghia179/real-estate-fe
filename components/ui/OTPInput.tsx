import React, { forwardRef } from 'react';

import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { OtpInput as RNOtpInput, type OtpInputRef } from 'react-native-otp-entry';

import { FontSize, Palette, Spacing } from '@constants/theme';

interface OTPInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  numberOfDigits?: number;
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
}

export const OTPInput = forwardRef<OtpInputRef, OTPInputProps>(
  (
    {
      label,
      error,
      containerStyle,
      numberOfDigits = 6,
      onTextChange,
      onFilled,
    },
    ref
  ) => {
    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.container,
            error && styles.containerError,
          ]}
        >
          <RNOtpInput
            ref={ref}
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
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

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
