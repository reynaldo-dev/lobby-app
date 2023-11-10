import { Image, Spinner, StatusBar, View } from 'native-base';
import React from 'react';
import splashScreen from '../../../assets/images/splash.png';
import { theme } from '../../theme';

export default function Authenticating() {
     return (
          <View
               flex={1}
               backgroundColor={theme.colors.white}
               justifyContent={'center'}
               alignItems={'center'}
          >
               <StatusBar backgroundColor={theme.colors.white} />
               <Image
                    w={['100%', '90%', '50%', '50%']}
                    h={['60%', '60%', '40%', '40%']}
                    source={splashScreen}
                    alt={"Cargando..."}
               />
               <Spinner color={theme.colors.primary} />
          </View>
     );
}
