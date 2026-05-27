import React from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

import { FontSize, Palette, Spacing } from '@constants/theme';

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
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          {step && <Text style={styles.step}>{step}</Text>}
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {/* Content */}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.white },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.lg,
  },
  header: { marginBottom: Spacing.xl },
  step: {
    fontSize: FontSize.body,
    color: Palette.textMuted,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Palette.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.body,
    color: Palette.textSecondary,
    lineHeight: 20,
  },
});
