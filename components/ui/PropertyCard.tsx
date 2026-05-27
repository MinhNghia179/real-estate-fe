import { Ionicons } from '@expo/vector-icons';

import React from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontSize, FontWeight, Palette, Radius, Shadow, Spacing } from '@constants/theme';

import type { Property } from '@models/models';

import { Badge } from './Badge';

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
  onFavorite?: (id: string) => void;
}

const formatPrice = (price: number): string => {
  if (price >= 1_000_000_000) return `${(price / 1_000_000_000).toFixed(1)} tỷ`;
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(0)} triệu`;
  return price.toLocaleString('vi-VN');
};

export const PropertyCard = ({ property, onPress, onFavorite }: PropertyCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    <View style={styles.imageWrapper}>
      <Image source={{ uri: property.images[0] }} style={styles.image} resizeMode="cover" />

      <View style={styles.badgeRow}>
        <Badge type="verified" />
        <Badge type="hot" />
      </View>

      <TouchableOpacity
        style={styles.favoriteBtn}
        onPress={() => onFavorite?.(property.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={property.isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={property.isFavorite ? Palette.badgeRed : Palette.white}
        />
      </TouchableOpacity>

      {property.images.length > 1 && (
        <View style={styles.photoCount}>
          <Ionicons name="images-outline" size={12} color={Palette.white} />
          <Text style={styles.photoCountText}>{property.images.length}</Text>
        </View>
      )}
    </View>

    <View style={styles.body}>
      <Text style={styles.price}>{formatPrice(property.price)}</Text>
      <Text style={styles.title} numberOfLines={2}>
        {property.title}
      </Text>

      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={13} color={Palette.textSecondary} />
        <Text style={styles.location} numberOfLines={1}>
          {property.location.address}
        </Text>
      </View>

      <View style={styles.specsRow}>
        <SpecItem icon="expand-outline" value={`${property.area}m²`} />
        <SpecItem icon="bed-outline" value={`${property.bedrooms} PN`} />
        <SpecItem icon="water-outline" value={`${property.bathrooms} WC`} />
      </View>
    </View>
  </TouchableOpacity>
);

const SpecItem = ({ icon, value }: { icon: string; value: string }) => (
  <View style={styles.specItem}>
    <Ionicons name={icon as never} size={13} color={Palette.textSecondary} />
    <Text style={styles.specText}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.white,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 200 },
  badgeRow: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  favoriteBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Palette.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCount: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Palette.overlay,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  photoCountText: { fontSize: FontSize.caption, color: Palette.white },
  body: { padding: Spacing.md, gap: Spacing.xs },
  price: { fontSize: FontSize.h2, fontWeight: FontWeight.bold, color: Palette.orange },
  title: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semibold,
    color: Palette.textPrimary,
    lineHeight: 20,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  location: { fontSize: FontSize.caption, color: Palette.textSecondary, flex: 1 },
  specsRow: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.xs },
  specItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  specText: { fontSize: FontSize.caption, color: Palette.textSecondary },
});
