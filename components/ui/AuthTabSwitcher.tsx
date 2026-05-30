import React from 'react';

import { Pressable, StyleSheet } from 'react-native';

import { ThemedText, ThemedView } from '@components/ui';

import { FontSize, FontWeight, Palette, Spacing } from '@constants/theme';

interface AuthTabSwitcherProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const AuthTabSwitcher = ({ tabs, activeTab, onTabChange }: AuthTabSwitcherProps) => {
  return (
    <ThemedView style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          style={[styles.tab, activeTab === tab.id ? styles.tabActive : styles.tabInactive]}
          onPress={() => onTabChange(tab.id)}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === tab.id ? styles.tabTextActive : styles.tabTextInactive,
            ]}
          >
            {tab.label}
          </ThemedText>
        </Pressable>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Palette.divider,
    borderRadius: Spacing.md,
    padding: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: Spacing.sm,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Palette.bgCard,
  },
  tabInactive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: FontSize.body,
  },
  tabTextActive: {
    fontWeight: FontWeight.semibold,
    color: Palette.textPrimary,
  },
  tabTextInactive: {
    fontWeight: FontWeight.medium,
    color: Palette.textMuted,
  },
});
