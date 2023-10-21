import { Box, Button, Text, View } from 'native-base';
import React from 'react';
import { theme } from '../../theme';
interface Props {
     onPress: () => void;
     icon: React.ReactNode;
     title: string;
     color: string;
     height?: number[];
     titleColor?: string;
     width?: ButtomWidth;
}

interface ButtomWidth {
     base: string;
     sm: string;
     md: string;
     lg: string;
}

export default function HomeBTN({
     onPress,
     icon,
     title,
     color,
     height = [150, 150, 230],
     width = { base: '50%', sm: '50%', md: '40%', lg: '40%' },
     titleColor = 'white',
}: Props) {
     return (
          <Button
               borderRadius={20}
               background={color}
               _pressed={{ opacity: 0.5 }}
               onPress={onPress}
               w={width}
               h={height}
          >
               <Box
                    alignSelf={'center'}
                    alignItems={'center'}
                    background={theme.colors.white}
                    rounded="full"
                    width="auto"
                    padding={2}
               >
                    {icon}
               </Box>
               <Box w={'100%'} mt={2}>
                    {title.split(' ').map((item, index) => (
                         <Text
                              key={index}
                              textAlign={'center'}
                              color={titleColor}
                              bold
                              fontSize={{
                                   base: '2xs',
                                   sm: 'xs',
                                   md: 'xl',
                                   lg: 'xl',
                              }}
                         >
                              {item}
                         </Text>
                    ))}
               </Box>
          </Button>
     );
}
