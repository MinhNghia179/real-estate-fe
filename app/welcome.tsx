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
import { Palette, Radius, Spacing } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('@/assets/images/welcome_slide_1.png'),
    label: 'BẤT ĐỘNG SẢN CAO CẤP',
    title: 'Đăng tin nhanh,',
    titleBold: 'tiếp cận triệu khách.',
    description: 'Đưa bất động sản của bạn đến đúng người — chỉ trong vài bước đơn giản.',
  },
  {
    id: '2',
    image: require('@/assets/images/welcome_slide_2.png'),
    label: 'MUA BÁN & CHO THUÊ',
    title: 'Giao dịch minh bạch,',
    titleBold: 'an toàn & hiệu quả.',
    description: 'Nhà phố, căn hộ, đất nền — tất cả trên một nền tảng đáng tin cậy.',
  },
  {
    id: '3',
    image: require('@/assets/images/welcome_slide_3.png'),
    label: 'MẠNG LƯỚI MÔI GIỚI',
    title: 'Kết nối chuyên gia,',
    titleBold: 'chốt deal nhanh chóng.',
    description: 'Hệ thống môi giới được xác thực, sẵn sàng đồng hành cùng bạn.',
  },
];

export default function WelcomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

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
          {slides.map((_, index) => (
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
            <Button label="Đăng ký" variant="primary" size="lg" />
          </Link>
          <Link href="/login" asChild style={styles.buttonFlex}>
            <Button label="Đăng nhập" variant="secondary" size="lg" />
          </Link>
        </View>
      </View>
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
