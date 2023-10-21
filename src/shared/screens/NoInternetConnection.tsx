import React from 'react';
import LottieView from 'lottie-react-native';
import { Heading, View } from 'native-base';
import NoInternetConnectionAnimation from '../../../assets/no-internet.json';
import { theme } from '../../theme';

export default function NoInternetConnection() {
     return (
          <View flex={1} alignItems={'center'} justifyContent={'center'}>
               <LottieView
                    source={NoInternetConnectionAnimation}
                    autoPlay={true}
                    loop={true}
                    style={{
                         width: '100%',
                    }}
               />
               <Heading color={theme.colors.danger} size="lg">
                    Sin conexión a internet
               </Heading>
          </View>
     );
}
