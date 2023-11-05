import { Center, Text } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import ErrorSvg from '../../../../assets/error.svg';
import { theme } from '../../../theme';

type Props = {
     message: string;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const calculatedWidth = screenWidth * 0.8;
const calculatedHeight = screenHeight * 0.4;

export const IsError = ({ message }: Props) => {
     return (
          <Center my={'auto'}>
               <ErrorSvg width={calculatedWidth} height={calculatedHeight} />
               <Text mt={5} color={theme.colors.primary} fontSize={'lg'}>
                    {message}
               </Text>
          </Center>
     );
};
