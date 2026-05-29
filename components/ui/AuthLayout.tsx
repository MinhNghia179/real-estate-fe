import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@components/ui";

import React from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { FontSize, FontWeight, Palette, Spacing } from '@constants/theme';

interface AuthLayoutProps {
  children: React.ReactNode;
  step?: string;
  title: string;
  subtitle?: string;
  contentContainerStyle?: ViewStyle;
}

export const AuthLayout = ({
  children,
  step,
  title,
  subtitle,
  contentContainerStyle,
}: AuthLayoutProps) => {
  const insets = useSafeAreaInsets();

  const handleOutsideTap = () => {
    Keyboard.dismiss();
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
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={[styles.scrollContentContainer, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <ThemedView style={styles.header}>
              {step && <ThemedText style={styles.stepText}>{step}</ThemedText>}
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
  scrollView: {},
  scrollContentContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  stepText: {
    fontSize: FontSize.body,
    color: Palette.textMuted,
    marginBottom: Spacing.xs,
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
