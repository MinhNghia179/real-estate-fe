import { useLocale } from '@contexts/locale-context';
import { languages } from '@locales';

import React, { useState } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/text';
import { Palette } from '@/constants/theme';

export function LanguageSelector() {
  const { language, setLanguage } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <View style={styles.container}>
      {/* Button */}
      <Pressable
        style={[styles.button, isOpen && styles.buttonActive]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.flag}>{currentLang?.flag}</Text>
        <Text style={styles.buttonText}>{currentLang?.code.toUpperCase()}</Text>
      </Pressable>

      {/* Dropdown menu */}
      {isOpen && (
        <View style={styles.dropdown}>
          {languages.map((lang: { code: 'en' | 'vi'; label: string; flag: string }) => (
            <Pressable
              key={lang.code}
              style={[styles.option, language === lang.code && styles.optionActive]}
              onPress={async () => {
                await setLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <Text style={styles.optionFlag}>{lang.flag}</Text>
              <View style={styles.optionTextContainer}>
                <Text
                  style={[styles.optionLabel, language === lang.code && styles.optionLabelActive]}
                >
                  {lang.label}
                </Text>
                <Text style={styles.optionCode}>{lang.code.toUpperCase()}</Text>
              </View>
              {language === lang.code && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 56,
    right: 16,
    zIndex: 100,
  },

  // Button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
  },

  buttonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },

  flag: {
    fontSize: 16,
  },

  buttonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  // Dropdown
  dropdown: {
    position: 'absolute',
    top: 48,
    right: 0,
    minWidth: 200,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },

  optionActive: {
    backgroundColor: 'rgba(255, 140, 0, 0.08)',
    borderBottomColor: 'rgba(255, 140, 0, 0.15)',
  },

  optionFlag: {
    fontSize: 18,
  },

  optionTextContainer: {
    flex: 1,
  },

  optionLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '500',
  },

  optionLabelActive: {
    color: Palette.orange,
    fontWeight: '600',
  },

  optionCode: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    marginTop: 2,
  },

  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Palette.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
