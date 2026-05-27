import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
  const pickImage = async (): Promise<string | undefined> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) return result.assets[0].uri;
  };

  const takePhoto = async (): Promise<string | undefined> => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) return result.assets[0].uri;
  };

  return { pickImage, takePhoto };
};
