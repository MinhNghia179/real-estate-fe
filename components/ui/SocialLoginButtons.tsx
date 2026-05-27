import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

import { FontSize, Palette, Spacing } from '@constants/theme';

interface SocialProvider {
  id: string;
  label: string;
}

interface SocialLoginButtonsProps {
  providers?: SocialProvider[];
  onPress: (provider: string) => void;
  containerStyle?: ViewStyle;
}

const DEFAULT_PROVIDERS = [
  { id: 'google', label: 'Google' },
  { id: 'apple', label: 'Apple' },
  { id: 'zalo', label: 'Zalo' },
];

export const SocialLoginButtons = ({
  providers = DEFAULT_PROVIDERS,
  onPress,
  containerStyle,
}: SocialLoginButtonsProps) => {
  return (
    <View style={containerStyle}>
      {/* Divider */}
      <View style={styles.divider}>
        <Text style={styles.dividerText}>hoặc tiếp tục với</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {providers.map((provider) => (
          <TouchableOpacity
            key={provider.id}
            style={styles.button}
            onPress={() => onPress(provider.id)}
          >
            <Text style={styles.buttonText}>{provider.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerText: {
    fontSize: FontSize.body,
    color: Palette.textMuted,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Spacing.md,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Palette.textPrimary,
  },
});
