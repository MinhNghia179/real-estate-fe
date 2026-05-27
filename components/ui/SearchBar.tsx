import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';

import { StyleSheet, TextInput, TouchableOpacity, View, type ViewStyle } from 'react-native';

import { FontSize, Palette, Radius, Spacing } from '@constants/theme';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  style?: ViewStyle;
}

export const SearchBar = ({
  value,
  placeholder = 'Tìm khu vực, dự án, mã tin...',
  onChangeText,
  onFilterPress,
  style,
}: SearchBarProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.containerFocused, style]}>
      <Ionicons
        name="search-outline"
        size={18}
        color={Palette.textMuted}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Palette.textMuted}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
      />
      {onFilterPress && (
        <TouchableOpacity onPress={onFilterPress} style={styles.filterBtn}>
          <Ionicons name="options-outline" size={18} color={Palette.textPrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.bgApp,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  containerFocused: { borderColor: Palette.orange, backgroundColor: Palette.white },
  searchIcon: { marginRight: Spacing.sm },
  input: { flex: 1, fontSize: FontSize.body, color: Palette.textPrimary },
  filterBtn: { marginLeft: Spacing.sm, padding: 4 },
});
