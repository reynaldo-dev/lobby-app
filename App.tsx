import * as Network from 'expo-network';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Main from './src/Main';
import useNotificationListener from './src/hooks/useNotificationsListener';
import useRegisterPushNotifications from './src/hooks/useRegisterPushNotifications';
import { store } from './src/redux/store/store';
import NoInternetConnection from './src/shared/screens/NoInternetConnection';
import { theme as CustomTheme } from './src/theme';

export default function App() {
     const [isInternetConnected, setIsInternetConnected] = useState(false);
     const theme = extendTheme(CustomTheme);
     const expoPushToken = useRegisterPushNotifications();
     const notification = useNotificationListener();

     const verifyConnection = async () => {
          Network.getNetworkStateAsync()
               .then((state) => {
                    setIsInternetConnected(
                         state.isInternetReachable as boolean
                    );
               })
               .catch((error) => {
                    setIsInternetConnected(false);
               });
     };
     useEffect(() => {
          verifyConnection();
     }, []);

     return (
          <SafeAreaProvider>
               <NativeBaseProvider theme={theme}>
                    {isInternetConnected ? (
                         <Provider store={store}>
                              <Main />
                         </Provider>
                    ) : (
                         <NoInternetConnection />
                    )}
               </NativeBaseProvider>
          </SafeAreaProvider>
     );
}
