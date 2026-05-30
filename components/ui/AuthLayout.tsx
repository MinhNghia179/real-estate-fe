import { useSafeAreaInsets } from 'react-native-safe-area-context';

import React from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

import { Image } from 'expo-image';
import { router } from 'expo-router';

import { ThemedText, ThemedView } from '@components/ui';

import { FontSize, FontWeight, Palette, Spacing } from '@constants/theme';

const BACK_ICON = require('@/assets/icons/icon-back-arrow.svg');

interface AuthLayoutProps {
  children: React.ReactNode;
  step?: string;
  title: string;
  subtitle?: string;
  /** Show a back arrow in the top-left corner (default: true when step is provided) */
  showBackButton?: boolean;
  /** Custom back handler — defaults to router.back() */
  onBack?: () => void;
  contentContainerStyle?: ViewStyle;
}

export const AuthLayout = ({
  children,
  step,
  title,
  subtitle,
  showBackButton,
  onBack,
  contentContainerStyle,
}: AuthLayoutProps) => {
  const insets = useSafeAreaInsets();

  // Show back button by default when step is provided (registration flow)
  const shouldShowBack = showBackButton ?? !!step;

  const handleOutsideTap = () => {
    Keyboard.dismiss();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <Pressable style={styles.outerPressable} onPress={handleOutsideTap}>
        <ThemedView
          style={[
            styles.contentWrapper,
            { paddingTop: Math.max(insets.top, 12), paddingBottom: insets.bottom },
          ]}
        >
          {/* Navigation Row: Back + Step */}
          {(shouldShowBack || step) && (
            <ThemedView style={styles.navRow}>
              {shouldShowBack ? (
                <Pressable onPress={handleBack} hitSlop={12} style={styles.backButton}>
                  <Image source={BACK_ICON} style={styles.backIcon} />
                </Pressable>
              ) : (
                <ThemedView style={styles.backPlaceholder} />
              )}
              {step ? <ThemedText style={styles.stepText}>{step}</ThemedText> : <ThemedView />}
            </ThemedView>
          )}

          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={[styles.scrollContentContainer, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header: Title + Subtitle */}
            <ThemedView style={styles.header}>
              <ThemedText style={styles.title}>{title}</ThemedText>
              {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
            </ThemedView>

            {/* Content */}
            {children}
          </ScrollView>
        </ThemedView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  outerPressable: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  /* Navigation Row */
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  backPlaceholder: {
    width: 40,
    height: 40,
  },
  stepText: {
    fontSize: FontSize.body,
    color: Palette.textMuted,
    fontWeight: FontWeight.medium,
  },

  /* Scroll Content */
  scrollContentContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: Palette.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    lineHeight: 20,
  },
});
