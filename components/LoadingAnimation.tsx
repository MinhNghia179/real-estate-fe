import LottieView from 'lottie-react-native';

import { StyleSheet, View } from 'react-native';

interface LoadingAnimationProps {
  size?: number;
}

export const LoadingAnimation = ({ size = 100 }: LoadingAnimationProps) => (
  <View style={styles.container}>
    <LottieView
      source={require('@assets/animations/loading.json')}
      autoPlay
      loop
      style={{ width: size, height: size }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
