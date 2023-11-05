import LottieView from 'lottie-react-native';
import { Center, Text } from 'native-base';
import React from 'react';
import notFound from '../../../../assets/ticketsNotFound.json';
import { theme } from '../../../theme';

type Props = {
     message: string;
     width?: number | string;
     height?: number | string;
};

export const TicketsNotFound = ({
     message,
     width = '100%',
     height = 200,
}: Props) => {
     return (
          <Center my={'auto'}>
               <LottieView
                    source={notFound}
                    autoPlay={true}
                    loop={true}
                    style={{
                         width: width,
                         height: height,
                    }}
               />
               <Text>{message}</Text>
          </Center>
     );
};
