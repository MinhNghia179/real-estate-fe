import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Shadow, Spacing } from '@constants/theme';

interface TabSwitcherProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export const TabSwitcher = ({ tabs, activeIndex, onChange }: TabSwitcherProps) => (
  <View style={styles.container}>
    {tabs.map((tab, index) => (
      <TouchableOpacity
        key={tab}
        style={[styles.tab, index === activeIndex && styles.tabActive]}
        onPress={() => onChange(index)}
        activeOpacity={0.8}
      >
        <Text style={[styles.label, index === activeIndex && styles.labelActive]}>{tab}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Palette.bgApp,
    borderRadius: Radius.md,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
    borderRadius: Radius.sm,
  },
  tabActive: {
    backgroundColor: Palette.white,
    ...Shadow.sm,
  },
  label: { fontSize: FontSize.body, color: Palette.textSecondary, fontWeight: FontWeight.medium },
  labelActive: { color: Palette.textPrimary, fontWeight: FontWeight.semibold },
});
