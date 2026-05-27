import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { formatTime } from '@utils/dateFormatter';

import { FontSize, Palette, Radius, Spacing } from '@constants/theme';

interface ChatBubbleProps {
  text: string;
  time: Date | string;
  isMine: boolean;
  imageUri?: string;
  propertyTitle?: string;
  propertyPrice?: string;
  isTyping?: boolean;
}

export const ChatBubble = ({
  text,
  time,
  isMine,
  imageUri,
  propertyTitle,
  propertyPrice,
  isTyping,
}: ChatBubbleProps) => (
  <View style={[styles.wrapper, isMine ? styles.wrapperMine : styles.wrapperTheirs]}>
    <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />}
      {propertyTitle && (
        <View style={styles.propertyPreview}>
          <Text style={[styles.propertyPrice, isMine && styles.textMine]}>{propertyPrice}</Text>
          <Text style={[styles.propertyTitle, isMine && styles.textMine]} numberOfLines={2}>
            {propertyTitle}
          </Text>
        </View>
      )}
      {isTyping ? (
        <Text style={[styles.text, isMine ? styles.textMine : styles.textTheirs]}>•••</Text>
      ) : (
        <Text style={[styles.text, isMine ? styles.textMine : styles.textTheirs]}>{text}</Text>
      )}
    </View>
    <Text style={[styles.time, isMine ? styles.timeMine : styles.timeTheirs]}>
      {formatTime(time)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { maxWidth: '75%', gap: 3 },
  wrapperMine: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  wrapperTheirs: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { borderRadius: Radius.lg, padding: Spacing.md, gap: Spacing.xs },
  bubbleMine: { backgroundColor: Palette.orange, borderBottomRightRadius: Radius.xs },
  bubbleTheirs: { backgroundColor: Palette.white, borderBottomLeftRadius: Radius.xs },
  image: { width: 200, height: 130, borderRadius: Radius.sm },
  propertyPreview: { gap: 2 },
  propertyPrice: { fontSize: FontSize.body, fontWeight: '700', color: Palette.orange },
  propertyTitle: { fontSize: FontSize.caption, color: Palette.textSecondary },
  text: { fontSize: FontSize.body, lineHeight: 20 },
  textMine: { color: Palette.white },
  textTheirs: { color: Palette.textPrimary },
  time: { fontSize: FontSize.xs, color: Palette.textMuted },
  timeMine: { color: Palette.textMuted },
  timeTheirs: { color: Palette.textMuted },
});
