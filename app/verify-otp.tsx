import { useLocale } from '@contexts/locale-context';

import React, { useEffect, useState } from 'react';

import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';

import { AuthLayout, Button, OTPInput } from '@components/ui';

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
      <View style={styles.mainContainer}>
        <View style={styles.topSection}>
          {/* OTP Input Component */}
          <View style={styles.otpContainer}>
            <OTPInput
              key={resetKey}
              numberOfDigits={OTP_LENGTH}
              onTextChange={setOtp}
              onFilled={handleOTPFilled}
            />
          </View>

          {/* Resend Section */}
          <View style={styles.resendSection}>
            <Text style={styles.resendText}>{t.verifyOtp.didNotReceive}</Text>
            {canResend ? (
              <Pressable onPress={handleResendOTP} disabled={isLoading}>
                <Text style={styles.resendButton}>{t.verifyOtp.resendButton}</Text>
              </Pressable>
            ) : (
              <Text style={styles.resendDisabledText}>
                {t.verifyOtp.resendIn}
                <Text style={styles.resendTimer}>{formatTime(timeLeft)}</Text>
              </Text>
            )}
          </View>

          {/* Info Alert Box */}
          <View style={styles.infoBanner}>
            <Image source={require('@/assets/icons/icon-info.svg')} style={styles.infoIcon} />
            <View style={styles.infoBannerContent}>
              <Text style={styles.infoBannerTitle}>{t.verifyOtp.infoTitle}</Text>
              <Text style={styles.infoBannerDescription}>{t.verifyOtp.infoDesc}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Button
            label={t.verifyOtp.verifyButton}
            onPress={() => handleVerifyOTP()}
            disabled={isLoading || otp.length !== OTP_LENGTH}
            loading={isLoading}
            fullWidth
          />

          <Pressable onPress={handleChangePhone} style={styles.changePhoneButton}>
            <Text style={styles.changePhoneText}>{t.verifyOtp.changePhone}</Text>
          </Pressable>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    // Allows the top elements to stay clustered together
  },
  otpContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  resendSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  },
  resendTimer: {
    fontWeight: FontWeight.bold,
    color: Palette.textPrimary,
  },
  infoBanner: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Palette.orange,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    gap: 12,
  },
  infoIcon: {
    width: 24,
    height: 24,
    tintColor: Palette.orange,
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
  actionButtonsContainer: {
    marginTop: 40,
  },
  changePhoneButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  changePhoneText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    fontWeight: FontWeight.semibold,
  },
});
