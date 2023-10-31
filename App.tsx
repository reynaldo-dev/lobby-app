import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Main from './src/Main';
import { store } from './src/redux/store/store';
import * as Network from 'expo-network';
import LottieView from 'lottie-react-native';
import NoInternetConnection from './src/shared/screens/NoInternetConnection';
import { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { theme } from './src/theme';
import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

export default function App() {
     const [isInternetConnected, setIsInternetConnected] = useState(false);

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
               <GluestackUIProvider config={config}>
                    {isInternetConnected ? (
                         <Provider store={store}>
                              <Main />
                         </Provider>
                    ) : (
                         <NoInternetConnection />
                    )}
               </GluestackUIProvider>
          </SafeAreaProvider>
     );
}
