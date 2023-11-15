import LottieView from 'lottie-react-native';
import { Center, Text } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import notFound from '../../../../assets/notFountRanking.json';
import { theme } from '../../../theme';

type Props = {
     message: string;
     width?: number | string;
     height?: number | string;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const calculatedWidth = screenWidth * 0.8;
const calculatedHeight = screenHeight * 0.4;

export const NotFoundRanking = ({ message }: Props) => {
     return (
          <Center my={'auto'}>
               <LottieView
                    source={notFound}
                    autoPlay={true}
                    loop={true}
                    style={{
                         width: calculatedWidth,
                         height: calculatedHeight,
                    }}
               />
               <Text
                    color={theme.colors.coolGray[900]}
                    fontSize={{
                         base: 'sm',
                         sm: 'md',
                         md: 'xl',
                         lg: 'xl',
                    }}
               >{message}</Text>
          </Center>
     );
};
