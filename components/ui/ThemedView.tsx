import { View as RNView, type ViewProps } from 'react-native';
import { Palette } from '@constants/theme';

export const ThemedView = ({
  style,
  ...props
}: ViewProps) => {
  return (
    <RNView
      style={[{ backgroundColor: Palette.white }, style]}
      {...props}
    />
  );
};
