import React, { useEffect, useRef, useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { AuthLayout, Button } from '@components/ui';
import { FontSize, Palette, Spacing } from '@constants/theme';
import { useLocale } from '@contexts/locale-context';

const OTP_LENGTH = 6;

export default function VerifyOTPScreen() {
  const { t } = useLocale();
  const { email, purpose } = useLocalSearchParams<{
    email: string;
    purpose?: string;
  }>();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOTPChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    setOtp(cleaned);

    if (cleaned.length === OTP_LENGTH) {
      handleVerifyOTP(cleaned);
    }
  };

  const handleVerifyOTP = async (code: string = otp) => {
    if (code.length !== OTP_LENGTH) {
      Alert.alert('Lỗi', t.verifyOtp.errors.invalidOtp);
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert('Thành công', t.verifyOtp.subtitle, [
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
      const message =
        error instanceof Error ? error.message : t.verifyOtp.errors.verifyFailed;
      Alert.alert('Lỗi', message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading(true);

      Alert.alert(
        'Thành công',
        'Mã OTP mới đã được gửi đến điện thoại của bạn'
      );
      setResendCount((c) => c + 1);
      setOtp('');
      setTimeLeft(60);
      setCanResend(false);
      inputRef.current?.focus();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Gửi lại thất bại';
      Alert.alert('Lỗi', message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePhone = () => {
    Alert.alert('Thay đổi số', 'Tính năng này sẽ được cập nhật');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <AuthLayout
      step="Bước 2 / 4"
      title={t.verifyOtp.title}
      subtitle={
        email
          ? `${t.verifyOtp.subtitle} ${email}`
          : t.verifyOtp.subtitle
      }
      contentContainerStyle={styles.content}
    >
      <View style={styles.form}>
        {/* OTP Input Boxes */}
        <View style={styles.otpSection}>
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={otp}
            onChangeText={handleOTPChange}
            keyboardType="numeric"
            maxLength={OTP_LENGTH}
            autoFocus
          />

          <View style={styles.otpBoxesContainer}>
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  index < otp.length && styles.otpBoxFilled,
                  index === otp.length && styles.otpBoxActive,
                ]}
              >
                <Text style={styles.otpBoxText}>{otp[index] || ''}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Resend Section */}
        <View style={styles.resendSection}>
          <View style={styles.resendTextContainer}>
            <Text style={styles.resendLabel}>Chưa nhận được mã?</Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResendOTP} disabled={isLoading}>
                <Text style={styles.resendLink}>{t.verifyOtp.resendButton}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.resendTimer}>
                {t.verifyOtp.resendIn}{formatTime(timeLeft)}
              </Text>
            )}
          </View>
        </View>

        {/* Error Message */}
        {resendCount > 2 && (
          <View style={styles.errorBox}>
            <Text style={styles.errorBoxTitle}>⚠ Không nhận được tin nhắn?</Text>
            <Text style={styles.errorBoxText}>
              Thử nhận mã qua cuộc gọi tự động hoặc liên hệ hỗ trợ.
            </Text>
          </View>
        )}

        {/* Submit Button */}
        <View style={styles.buttonsSection}>
          <Button
            label={t.verifyOtp.verifyButton}
            onPress={() => handleVerifyOTP()}
            disabled={isLoading || otp.length !== OTP_LENGTH}
            loading={isLoading}
            style={styles.button}
          />

          {/* Change Phone Link */}
          <TouchableOpacity
            onPress={handleChangePhone}
            style={styles.changePhoneButton}
          >
            <Text style={styles.changePhoneText}>Thay đổi số điện thoại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  content: { marginBottom: 0 },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Spacing.lg,
  },
  buttonsSection: { gap: 0 },

  /* OTP Section */
  otpSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'center',
  },
  otpBox: {
    width: 52,
    height: 52,
    borderWidth: 2,
    borderColor: Palette.border,
    borderRadius: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.white,
  },
  otpBoxFilled: {
    borderColor: Palette.orange,
    backgroundColor: '#FFF5EE',
  },
  otpBoxActive: {
    borderColor: Palette.orange,
  },
  otpBoxText: {
    fontSize: 24,
    fontWeight: '700',
    color: Palette.textPrimary,
  },

  /* Resend Section */
  resendSection: {
    marginBottom: Spacing.xxl,
  },
  resendTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resendLabel: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
  },
  resendLink: {
    fontSize: FontSize.body,
    color: Palette.orange,
    fontWeight: '600',
  },
  resendTimer: {
    fontSize: FontSize.body,
    color: Palette.textMuted,
    fontWeight: '600',
  },

  /* Error Box */
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Palette.badgeRed,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  errorBoxTitle: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Palette.badgeRed,
    marginBottom: Spacing.xs,
  },
  errorBoxText: {
    fontSize: FontSize.caption,
    color: Palette.badgeRed,
    lineHeight: 18,
  },

  /* Button */
  button: {
    marginBottom: Spacing.lg,
  },

  /* Change Phone */
  changePhoneButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  changePhoneText: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    fontWeight: '500',
  },
});
