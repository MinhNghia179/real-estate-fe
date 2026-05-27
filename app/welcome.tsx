import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { Text } from '@/components/text';
import { Button } from '@/components/ui/Button';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Palette, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@contexts/locale-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Slide {
  id: string;
  image: any;
  label: string;
  title: string;
  titleBold: string;
  description: string;
}

export default function WelcomeScreen() {
  const { t } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const slides: Slide[] = t.welcome.slides.map((slide, index) => ({
    id: String(index + 1),
    image:
      index === 0
        ? require('@/assets/images/welcome_slide_1.png')
        : index === 1
          ? require('@/assets/images/welcome_slide_2.png')
          : require('@/assets/images/welcome_slide_3.png'),
    ...slide,
  }));

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const currentSlide = slides[activeIndex];

  const renderSlide = ({ item }: { item: (typeof slides)[0] }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.slideImage} contentFit="cover" />
      {/* Chỉ dùng vignette nhẹ ở đáy để text readable mà không che ảnh */}
      <View style={styles.vignette} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Swipeable image slider — fullscreen, không overlay nặng */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Content overlay */}
      <View style={styles.contentContainer}>

        {/* Label — uppercase tag kiểu luxury */}
        <View style={styles.labelWrapper}>
          <View style={styles.labelLine} />
          <Text style={styles.labelText}>{currentSlide.label}</Text>
          <View style={styles.labelLine} />
        </View>

        {/* Headline */}
        <View style={styles.textBlock}>
          <Text variant="heading" style={styles.titleRegular}>
            {currentSlide.title}
          </Text>
          <Text variant="heading" style={styles.titleBold}>
            {currentSlide.titleBold}
          </Text>
          <Text variant="subheading" style={styles.description}>
            {currentSlide.description}
          </Text>
        </View>

        {/* Thin line indicators — phong cách luxury */}
        <View style={styles.dotsContainer}>
          {slides.map((_: Slide, index: number) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsRow}>
          <Link href="/register" asChild style={styles.buttonFlex}>
            <Button label={t.welcome.registerButton} variant="primary" size="lg" />
          </Link>
          <Link href="/login" asChild style={styles.buttonFlex}>
            <Button label={t.welcome.loginButton} variant="secondary" size="lg" />
          </Link>
        </View>
      </View>

      {/* Language Selector */}
      <LanguageSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },

  // Slide
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  slideImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  // Vignette nhẹ — chỉ đủ để text đọc được, không che ảnh
  vignette: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '45%',
    backgroundColor: 'rgba(5, 5, 5, 0.42)',
  },

  // Content overlay — phần dưới màn hình
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl + 4,
    paddingBottom: 54,
  },

  // Label kiểu luxury — dòng kẻ + chữ hoa nhỏ
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  labelLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  labelText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 2.5,
  },

  // Text block
  textBlock: {
    marginBottom: Spacing.lg,
  },
  titleRegular: {
    color: '#FFFFFF',
    fontWeight: '300',
    fontSize: 24,
    lineHeight: 32,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  titleBold: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  description: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    fontWeight: '400',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // Thin line indicators — luxury style
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.xl,
  },
  dot: {
    height: 2,
    borderRadius: 1,
  },
  dotActive: {
    width: 32,
    backgroundColor: Palette.orange,
  },
  dotInactive: {
    width: 16,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  // Buttons
  buttonsRow: {
    gap: Spacing.md,
  },
  buttonFlex: {
    flex: 1,
  },
});
