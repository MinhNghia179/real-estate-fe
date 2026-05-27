import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

interface StepSelectorProps {
  options: Array<string | number>;
  value: string | number;
  onChange: (val: string | number) => void;
}

export const StepSelector = ({ options, value, onChange }: StepSelectorProps) => (
  <View style={styles.container}>
    {options.map((opt) => {
      const active = opt === value;
      return (
        <TouchableOpacity
          key={String(opt)}
          style={[styles.item, active && styles.itemActive]}
          onPress={() => onChange(opt)}
          activeOpacity={0.7}
        >
          <Text style={[styles.label, active && styles.labelActive]}>{opt}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  item: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.white,
  },
  itemActive: { backgroundColor: Palette.orange, borderColor: Palette.orange },
  label: { fontSize: FontSize.body, color: Palette.textPrimary, fontWeight: FontWeight.medium },
  labelActive: { color: Palette.white, fontWeight: FontWeight.bold },
});
