import { Heading, Spinner, StatusBar, View } from 'native-base';
import React from 'react';
import { theme } from '../../theme';

export default function Authenticating() {
     return (
          <View
               flex={1}
               backgroundColor={theme.colors.secondary}
               justifyContent={'center'}
               alignItems={'center'}
          >
               <StatusBar backgroundColor={theme.colors.secondary} />
               <Spinner color={theme.colors.white} />
               <Heading size={'md'} color={theme.colors.white}>
                    Autenticando
               </Heading>
          </View>
     );
}
