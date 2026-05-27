import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontSize, Palette, Spacing } from '@constants/theme';

interface AuthTabSwitcherProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const AuthTabSwitcher = ({
  tabs,
  activeTab,
  onTabChange,
}: AuthTabSwitcherProps) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.tabActive]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.tabTextActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: Spacing.md,
    padding: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: Spacing.sm,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Palette.white,
  },
  tabText: {
    fontSize: FontSize.body,
    fontWeight: '500',
    color: Palette.textMuted,
  },
  tabTextActive: {
    color: Palette.textPrimary,
    fontWeight: '600',
  },
});
