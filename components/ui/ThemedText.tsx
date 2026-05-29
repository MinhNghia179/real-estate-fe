import { Text as RNText, type TextProps } from 'react-native';
import { Palette } from '@constants/theme';

export const ThemedText = ({
  style,
  ...props
}: TextProps) => {
  return (
    <RNText
      style={[{ color: Palette.textPrimary }, style]}
      {...props}
    />
  );
};
