import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
     Badge,
     Box,
     Divider,
     HStack,
     Heading,
     IconButton,
     Text,
     VStack,
     useBreakpointValue,
} from 'native-base';
import React from 'react';
import { Dimensions, Linking, TouchableOpacity } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import { formatDate } from '../../helpers/date-format/DateFormat';
import { User } from '../../interfaces/community.interface';
import { RootStackParamList } from '../../routing/navigation-types';
import Layout from '../../shared/layout/Layout';
import { Event } from '../interfaces/assistanceTicket.interface';

type Props = {
     event: Event;
     user: User;
     isActive: boolean;
     consumable: any;
     qrCodeData: any;
};
const { width: screenWidth } = Dimensions.get('window');

export const DetailScreen = ({
     event,
     user,
     isActive,
     consumable,
     qrCodeData,
}: Props) => {
     const navigation =
          useNavigation<NavigationProp<RootStackParamList, 'BarScanner'>>();
     const formattedDate = formatDate(event?.dateTime);

     const boxAndQRSizeFactor =
          useBreakpointValue({
               base: 0.8,
               sm: 0.8,
               md: 0.8,
          }) || 0.9;

     const boxAndQRSize = screenWidth * boxAndQRSizeFactor;

     const onPress = () => {
          navigation.navigate('BarScanner');
     };

     const content =
          event.place && event.place !== '' ? event.place : event.link;

     const handleLinkPress = (url: string) => {
          if (url && url.startsWith('https://')) {
               Linking.openURL(url);
          }
     };

     return (
          <Layout>
               <Box
                    safeArea
                    flex={1}
                    p="2"
                    w="100%"
                    mx="auto"
                    bg="white"
                    justifyContent="center"
               >
                    <HStack
                         position="absolute"
                         top={0}
                         left={0}
                         p={2}
                         space={3}
                         justifyContent="space-between"
                         width="100%"
                    >
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="left" size={24} color="black" />
                         </TouchableOpacity>
                         {!consumable && (
                              <IconButton
                                   icon={
                                        <AntDesign
                                             name="scan1"
                                             size={24}
                                             color="black"
                                        />
                                   }
                                   onPress={onPress}
                              />
                         )}
                    </HStack>
                    <VStack space={4} mt={5} alignItems="center">
                         <Heading
                              fontSize={{
                                   base: '2xl',
                                   sm: '2xl',
                                   md: '4xl',
                                   lg: '5xl',
                              }}
                              mx={4}
                         >
                              {event?.title}
                         </Heading>
                         <SvgQRCode
                              value={qrCodeData}
                              enableLinearGradient
                              size={boxAndQRSize}
                         />
                         <Badge
                              colorScheme={isActive ? 'green' : 'red'}
                              variant="subtle"
                              px={2}
                              width={boxAndQRSize}
                         >
                              <Text
                                   bold
                                   fontSize={{
                                        base: 'lg',
                                        sm: 'lg',
                                        md: '2xl',
                                   }}
                              >
                                   {isActive ? 'Disponible' : 'No Disponible'}
                              </Text>
                         </Badge>
                         <Text
                              fontSize={{
                                   base: 'sm',
                                   sm: 'sm',
                                   md: 'xl',
                              }}
                              mx={4}
                         >
                              {event?.description}
                         </Text>
                    </VStack>

                    <Box bg="white" shadow={1} p={4} rounded="lg" mt={10}>
                         <HStack
                              justifyContent="space-between"
                              alignItems="center"
                         >
                              {content === event.link ? (
                                   <>
                                        <Text
                                             fontSize={{
                                                  base: 'sm',
                                                  sm: 'sm',
                                                  md: '2xl',
                                             }}
                                        >
                                             Enlace:
                                        </Text>
                                        <TouchableOpacity
                                             onPress={() =>
                                                  handleLinkPress(content)
                                             }
                                        >
                                             <Text fontSize="sm">
                                                  {content}
                                             </Text>
                                        </TouchableOpacity>
                                   </>
                              ) : (
                                   <>
                                        <Text
                                             fontSize={{
                                                  base: 'sm',
                                                  sm: 'sm',
                                                  md: '2xl',
                                             }}
                                             color="gray.600"
                                        >
                                             Lugar:
                                        </Text>
                                        <Text
                                             fontSize={{
                                                  base: 'sm',
                                                  sm: 'sm',
                                                  md: 'xl',
                                             }}
                                             maxWidth={'80%'}
                                             isTruncated
                                        >
                                             {content}
                                        </Text>
                                   </>
                              )}
                         </HStack>
                         <Divider my={2} />
                         <HStack
                              justifyContent="space-between"
                              alignItems="center"
                         >
                              <Text
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'sm',
                                        md: 'xl',
                                   }}
                              >
                                   Fecha y Hora:
                              </Text>
                              <Text
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'sm',
                                        md: 'xl',
                                   }}
                              >
                                   {formattedDate}
                              </Text>
                         </HStack>
                         <Divider my={2} />
                         <HStack
                              justifyContent="space-between"
                              alignItems="center"
                         >
                              <Text
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'sm',
                                        md: 'xl',
                                   }}
                              >
                                   Dueño del cupón:
                              </Text>
                              <Text
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'sm',
                                        md: 'xl',
                                   }}
                              >{`${user?.name} ${user?.lastname}`}</Text>
                         </HStack>
                         {consumable!! && (
                              <>
                                   <Divider my={2} />
                                   <HStack
                                        justifyContent="space-between"
                                        alignItems="center"
                                   >
                                        <Text
                                             fontSize={{
                                                  base: 'sm',
                                                  sm: 'sm',
                                                  md: 'xl',
                                             }}
                                        >
                                             Consumible:
                                        </Text>
                                        <Text
                                             fontSize={{
                                                  base: 'sm',
                                                  sm: 'sm',
                                                  md: 'xl',
                                             }}
                                        >
                                             {consumable.name}
                                        </Text>
                                   </HStack>
                              </>
                         )}
                    </Box>
               </Box>
          </Layout>
     );
};
