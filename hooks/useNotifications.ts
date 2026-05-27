import { useEffect } from 'react';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const useNotifications = () => {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const sendLocalNotification = async (
    title: string,
    body: string,
    delaySec = 1
  ): Promise<void> => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: 'default' },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: delaySec,
      },
    });
  };

  return { sendLocalNotification };
};
