import LottieView from 'lottie-react-native';
import { Center, Text } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import notFound from '../../../../assets/notFound.json';
import { theme } from '../../../theme';

type Props = {
     message: string;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const calculatedWidth = screenWidth * 0.1;
const calculatedHeight = screenHeight * 0.3;

export const NotFound = ({ message }: Props) => {
     return (
          <Center>
               <LottieView
                    source={notFound}
                    autoPlay={true}
                    loop={true}
                    style={{
                         width: calculatedWidth,
                         height: calculatedHeight,
                    }}
               />
               <Text color={theme.colors.coolGray[900]}
                    fontSize={{
                         base: 'sm',
                         sm: 'md',
                         md: 'xl',
                         lg: '2xl',
                    }}
               >{message}</Text>
          </Center>
     );
};
