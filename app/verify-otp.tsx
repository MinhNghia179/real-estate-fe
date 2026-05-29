import { useLocale } from '@contexts/locale-context';

import React, { useEffect, useState } from 'react';

import { Alert, Pressable, StyleSheet } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { AuthLayout, Button, OTPInput } from '@components/ui';

import { ThemedText, ThemedView } from "@components/ui";
import { FontSize, FontWeight, Palette } from '@constants/theme';

const OTP_LENGTH = 6;

export default function VerifyOTPScreen() {
  const { t } = useLocale();
  const { phone, purpose } = useLocalSearchParams<{
    phone?: string;
    purpose?: string;
  }>();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOTPFilled = async (code: string) => {
    await handleVerifyOTP(code);
  };

  const handleVerifyOTP = async (code: string = otp) => {
    if (code.length !== OTP_LENGTH) {
      Alert.alert(t.verifyOtp.errors.verifyFailed, t.verifyOtp.errors.invalidOtp);
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      Alert.alert('✓ Success', 'OTP verified successfully', [
        {
          text: 'OK',
          onPress: () => {
            if (purpose === 'register') {
              router.push('/select-role');
            } else {
              router.replace('/(tabs)');
            }
          },
        },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : t.verifyOtp.errors.verifyFailed;
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOtp('');
      setResetKey((prev) => prev + 1);
      setTimeLeft(60);
      setCanResend(false);

      Alert.alert('✓ Success', 'A new OTP code has been sent to your phone');
    } catch {
      Alert.alert('Error', 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePhone = () => {
    router.back();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const maskedPhone = phone ? `+84 ${phone.slice(-3)}` : '';

  return (
    <AuthLayout
      step={t.verifyOtp.step}
      title={t.verifyOtp.title}
      subtitle={`${t.verifyOtp.subtitle} ${maskedPhone}`}
      contentContainerStyle={{ marginBottom: 0 }}
    >
      <ThemedView style={styles.mainContainer}>
        {/* OTP Input Component */}
        <ThemedView style={styles.otpContainer}>
          <OTPInput
            key={resetKey}
            numberOfDigits={OTP_LENGTH}
            onTextChange={setOtp}
            onFilled={handleOTPFilled}
          />
        </ThemedView>

        {/* Resend Section */}
        <ThemedView style={styles.resendSection}>
          <ThemedText style={styles.resendText}>
            {t.verifyOtp.didNotReceive}
          </ThemedText>
          {canResend ? (
            <Pressable onPress={handleResendOTP} disabled={isLoading}>
              <ThemedText style={styles.resendButton}>
                {t.verifyOtp.resendButton}
              </ThemedText>
            </Pressable>
          ) : (
            <ThemedText style={styles.resendDisabledText}>
              {t.verifyOtp.resendIn}
              {formatTime(timeLeft)}
            </ThemedText>
          )}
        </ThemedView>

        {/* Info Alert Box */}
        <ThemedView style={styles.infoBanner}>
          <ThemedText style={styles.infoIcon}>ℹ</ThemedText>
          <ThemedView style={styles.infoBannerContent}>
            <ThemedText style={styles.infoBannerTitle}>
              {t.verifyOtp.infoTitle}
            </ThemedText>
            <ThemedText style={styles.infoBannerDescription}>
              {t.verifyOtp.infoDesc}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Action Buttons */}
        <ThemedView style={styles.actionButtonsContainer}>
          <Button
            label={t.verifyOtp.verifyButton}
            onPress={() => handleVerifyOTP()}
            disabled={isLoading || otp.length !== OTP_LENGTH}
            loading={isLoading}
            fullWidth
          />

          <Pressable
            onPress={handleChangePhone}
            style={styles.changePhoneButton}
          >
            <ThemedText style={styles.changePhoneText}>
              {t.verifyOtp.changePhone}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 20,
  },
  otpContainer: {
    marginBottom: 24,
  },
  resendSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  resendText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
  },
  resendButton: {
    fontSize: FontSize.body,
    color: Palette.orange,
    fontWeight: FontWeight.semibold,
  },
  resendDisabledText: {
    fontSize: FontSize.body,
    color: Palette.textMuted,
    fontWeight: FontWeight.semibold,
  },
  infoBanner: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Palette.orange,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 24,
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
    color: Palette.orange,
    fontWeight: FontWeight.semibold,
  },
  infoBannerContent: {
    flex: 1,
    gap: 4,
  },
  infoBannerTitle: {
    fontSize: FontSize.body,
    color: Palette.orange,
    fontWeight: FontWeight.semibold,
  },
  infoBannerDescription: {
    fontSize: FontSize.caption,
    color: Palette.orange,
    lineHeight: 20,
  },
  actionButtonsContainer: {},
  changePhoneButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  changePhoneText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    fontWeight: FontWeight.medium,
  },
});
