import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export default function useRegisterPushNotifications() {
     const [expoPushToken, setExpoPushToken] = useState<string>('');

     useEffect(() => {
          registerForPushNotificationsAsync().then((token) => {
               if (token) {
                    setExpoPushToken(token);
               }
          });
     }, []);

     async function registerForPushNotificationsAsync(): Promise<
          string | undefined
     > {
          if (!Device.isDevice) {
               alert('Must use physical device for Push Notifications');
               return;
          }

          const { status: existingStatus } =
               await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
               const { status } = await Notifications.requestPermissionsAsync();
               finalStatus = status;
          }
          if (finalStatus !== 'granted') {
               alert('Failed to get push token for push notification!');
               return;
          }

          const token = (await Notifications.getExpoPushTokenAsync()).data;

          if (Platform.OS === 'android') {
               Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
               });
          }

          return token;
     }

     return expoPushToken;
}
