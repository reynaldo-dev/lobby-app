import { Box, Button, Text, useBreakpointValue } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { theme } from '../../theme';
interface Props {
     onPress: () => void;
     icon: React.ReactNode;
     title: string;
     color: string;
     titleColor?: string;
     width?: string | ResponsiveSize;
     fontSize?: ResponsiveSize;
     isPrimary?: boolean;
}
interface ResponsiveSize {
     base: string;
     sm: string;
     md: string;
     lg: string;
}

const windowHeight = Dimensions.get('window').height;

export default function HomeBTN({
     onPress,
     icon,
     title,
     color,
     width,
     titleColor = 'white',
     fontSize = { base: '2xs', sm: 'xs', md: 'xl', lg: '3xl' },
     isPrimary = false,
}: Props) {

     const scaleFactor = useBreakpointValue({
          base: isPrimary ? 0.9 : 0.6,
          sm: isPrimary ? 1.0 : 0.7,
          md: isPrimary ? 1.2 : 0.7,
          lg: isPrimary ? 1.1 : 0.8,
     }) || 1

     const buttonHeight = Math.min(windowHeight * 0.2 * scaleFactor, windowHeight);

     return (
          <Button
               borderRadius={20}
               background={color}
               _pressed={{ opacity: 0.5 }}
               onPress={onPress}
               w={width}
               h={buttonHeight}
          >
               <Box
                    alignSelf={'center'}
                    alignItems={'center'}
                    background={theme.colors.white}
                    rounded="full"
                    width="auto"
                    padding={[2, 2, 2, 4]}
                    mb={2}
               >
                    {icon}
               </Box>
               <Text
                    textAlign={'center'}
                    color={titleColor}
                    bold
                    fontSize={fontSize}
                    isTruncated
               >
                    {title}
               </Text>
          </Button>
     );
}
