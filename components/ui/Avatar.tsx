import React from 'react';

import { Image, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { FontSize, FontWeight, Palette } from '@constants/theme';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name?: string;
  uri?: string;
  size?: AvatarSize;
  online?: boolean;
  style?: ViewStyle;
}

const sizeMap: Record<AvatarSize, { container: number; font: number; dot: number }> = {
  sm: { container: 32, font: FontSize.caption, dot: 8 },
  md: { container: 40, font: FontSize.body, dot: 10 },
  lg: { container: 52, font: FontSize.h3, dot: 12 },
  xl: { container: 72, font: FontSize.h1, dot: 14 },
};

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar = ({ name, uri, size = 'md', online, style }: AvatarProps) => {
  const sz = sizeMap[size];
  const radius = sz.container / 2;

  return (
    <View style={[{ width: sz.container, height: sz.container }, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: sz.container, height: sz.container, borderRadius: radius }}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            { width: sz.container, height: sz.container, borderRadius: radius },
          ]}
        >
          <Text style={[styles.initials, { fontSize: sz.font }]}>{getInitials(name)}</Text>
        </View>
      )}
      {online && (
        <View
          style={[
            styles.dot,
            { width: sz.dot, height: sz.dot, borderRadius: sz.dot / 2, bottom: 0, right: 0 },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: Palette.orangeLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { color: Palette.orange, fontWeight: FontWeight.bold },
  dot: {
    position: 'absolute',
    backgroundColor: Palette.badgeGreen,
    borderWidth: 2,
    borderColor: Palette.white,
  },
});
