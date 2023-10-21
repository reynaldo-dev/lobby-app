import { Box, Button, Center, Heading, Text, View } from 'native-base';
import React from 'react';
import { useGenerateTradeTicket } from '../../hooks/useGenerateTradeTicket';
import { RootState, useAppSelector } from '../../redux/store/store';
import { theme } from '../../theme';
import LottieView from 'lottie-react-native';
import ok from '../../../assets/ok-animation.json';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routing/navigation-types';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function TradeTicketShot() {
     const trade = useAppSelector((state: RootState) => state.trade);
     const { printToFile } = useGenerateTradeTicket(trade);
     const navigation = useNavigation<NavigationProp<RootStackParamList>>();

     return (
          <View flex={1} backgroundColor={theme.colors.background}>
               <Center pb={5}>
                    <LottieView
                         source={ok}
                         autoPlay={true}
                         loop={false}
                         style={{
                              width: '100%',
                         }}
                    />

                    <Box
                         mx={5}
                         pb={5}
                         justifyContent={'center'}
                         alignItems={'center'}
                    >
                         <Heading size={'lg'} color={theme.colors.success}>
                              Hiciste el caje con éxito
                         </Heading>

                         <Text
                              color={theme.colors.muted[500]}
                              textAlign={'center'}
                         >
                              El siguiete paso es compartir el ticket con un
                              encargado, haz click en el botón 'Compartir
                              ticket', solo puedes hacerlo desde esta pantalla,
                              asi que este paso no se repetirá en el
                              futuroshareback
                         </Text>

                         <Box
                              flexDir={'row'}
                              justifyContent={'space-between'}
                              mt={5}
                         >
                              <Button
                                   mt={5}
                                   mr={5}
                                   onPress={() => {
                                        printToFile();
                                   }}
                                   backgroundColor={theme.colors.success}
                                   borderRadius={10}
                                   endIcon={
                                        <Entypo
                                             name="share"
                                             size={20}
                                             color={theme.colors.white}
                                        />
                                   }
                              >
                                   <Text color={theme.colors.white}>
                                        Compartir ticket
                                   </Text>
                              </Button>

                              <Button
                                   mt={5}
                                   onPress={() => {
                                        navigation.navigate('Redeemables');
                                   }}
                                   backgroundColor={theme.colors.white}
                                   borderColor={theme.colors.secondary}
                                   borderWidth={1}
                                   borderRadius={10}
                                   endIcon={
                                        <AntDesign
                                             name="back"
                                             size={20}
                                             color={theme.colors.secondary}
                                        />
                                   }
                              >
                                   <Text color={theme.colors.secondary}>
                                        Volver
                                   </Text>
                              </Button>
                         </Box>
                    </Box>

                    <Text color={theme.colors.muted[500]} mt={10}>
                         Si ya lo compartiste, haz click en el botón 'Volver'
                    </Text>
               </Center>
          </View>
     );
}
