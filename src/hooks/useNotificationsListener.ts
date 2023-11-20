import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
     handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
     }),
});

export default function useNotificationListener() {
     const [notification, setNotification] =
          useState<Notifications.Notification | null>(null);
     const notificationListener = useRef<Notifications.Subscription>();
     const responseListener = useRef<Notifications.Subscription>();

     useEffect(() => {
          notificationListener.current =
               Notifications.addNotificationReceivedListener((notification) => {
                    setNotification(notification);
               });

          responseListener.current =
               Notifications.addNotificationResponseReceivedListener(
                    (response) => {
                         console.log(response);
                    }
               );

          return () => {
               if (notificationListener.current) {
                    Notifications.removeNotificationSubscription(
                         notificationListener.current
                    );
               }
               if (responseListener.current) {
                    Notifications.removeNotificationSubscription(
                         responseListener.current
                    );
               }
          };
     }, []);

     return notification;
}
