import { useState } from 'react';

import * as Location from 'expo-location';

interface Coords {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async (): Promise<Coords | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Quyền truy cập vị trí bị từ chối');
      return null;
    }
    const current = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const coords = { latitude: current.coords.latitude, longitude: current.coords.longitude };
    setLocation(coords);
    return coords;
  };

  return { location, error, getLocation };
};
