import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Spacing } from '@constants/theme';

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

export const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => (
  <View style={styles.wrapper}>
    <View style={styles.bar}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <View style={[styles.dot, index <= currentStep && styles.dotActive]}>
            <Text style={[styles.dotText, index <= currentStep && styles.dotTextActive]}>
              {index + 1}
            </Text>
          </View>
          {index < steps.length - 1 && (
            <View style={[styles.line, index < currentStep && styles.lineActive]} />
          )}
        </React.Fragment>
      ))}
    </View>

    <View style={styles.progress}>
      <View
        style={[styles.progressFill, { width: `${(currentStep / (steps.length - 1)) * 100}%` }]}
      />
    </View>

    <Text style={styles.label}>
      Bước {currentStep + 1}/{steps.length} · {steps[currentStep]}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.sm },
  bar: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.white,
  },
  dotActive: { borderColor: Palette.orange, backgroundColor: Palette.orange },
  dotText: { fontSize: FontSize.xs, color: Palette.textMuted, fontWeight: FontWeight.bold },
  dotTextActive: { color: Palette.white },
  line: { flex: 1, height: 2, backgroundColor: Palette.border },
  lineActive: { backgroundColor: Palette.orange },
  progress: {
    height: 4,
    backgroundColor: Palette.bgApp,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: Palette.orange, borderRadius: Radius.full },
  label: { fontSize: FontSize.caption, color: Palette.textSecondary },
});
