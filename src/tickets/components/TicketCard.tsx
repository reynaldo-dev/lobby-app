import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
     Badge,
     HStack,
     Heading,
     Pressable,
     Text,
     VStack,
     useBreakpointValue,
} from 'native-base';
import React from 'react';
import { formatDate } from '../../helpers/date-format/DateFormat';
import { RootStackParamList } from '../../routing/navigation-types';
import { theme } from '../../theme';
import { Event, User } from '../interfaces/assistanceTicket.interface';
import { IConsumable } from '../interfaces/consumablesTickets.interface';

type TicketCardProps = {
     event: Event;
     user: User;
     isActive: boolean;
     consumable?: IConsumable;
     ticketId?: string;
     userId?: string;
};

export const TicketCard = ({
     event,
     user,
     isActive,
     consumable,
     ticketId,
     userId,
}: TicketCardProps) => {
     const navigation =
          useNavigation<NativeStackNavigationProp<RootStackParamList>>();

     const iconsReponsive = useBreakpointValue({
          base: 20,
          sm: 20,
          md: 25,
          lg: 25,
     });

     const handlePress = () => {
          if (consumable) {
               navigation.navigate('TicketConsumableDetail', {
                    event,
                    user,
                    isActive,
                    consumable,
                    ticketId,
                    userId,
               });
          } else {
               navigation.navigate('TicketAssistanceDetail', {
                    event,
                    user,
                    isActive,
               });
          }
     };

     const formattedDate = formatDate(event?.dateTime);

     return (
          <Pressable
               backgroundColor={theme.colors.white}
               rounded="lg"
               width="90%"
               mx="auto"
               my={3}
               onPress={handlePress}
               disabled={!isActive}
               _disabled={{
                    opacity: 0.7,
               }}
          >
               <VStack space={2} p={4}>
                    <HStack space={2} justifyContent="space-between">
                         <Heading
                              fontSize={{
                                   base: 'sm',
                                   sm: 'md',
                                   md: 'xl',
                                   lg: 'xl',
                              }}
                              ml={-1}
                              flex={1}
                              isTruncated
                         >
                              {event?.title}
                         </Heading>
                         <Badge
                              colorScheme={
                                   isActive
                                        ? theme.colors.success
                                        : theme.colors.danger
                              }
                         >
                              <Text
                                   bold
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'md',
                                        md: 'lg',
                                        lg: 'xl',
                                   }}
                              >
                                   {isActive ? 'Activo' : 'Inactivo'}
                              </Text>
                         </Badge>
                    </HStack>
                    <Text
                         fontSize={{
                              base: 'sm',
                              sm: 'md',
                              md: 'lg',
                              lg: 'xl',
                         }}
                    >
                         {user?.name} {user?.lastname}
                    </Text>
                    {consumable && (
                         <Text
                              fontSize={{
                                   base: 'sm',
                                   sm: 'md',
                                   md: 'lg',
                                   lg: 'xl',
                              }}
                         >
                              {consumable?.name}
                         </Text>
                    )}
                    <HStack justifyContent={'space-between'}>
                         <HStack space={2}>
                              <FontAwesome
                                   name={event.link ? 'laptop' : 'map-marker'}
                                   size={iconsReponsive}
                                   color="gray"
                              />
                              <Text
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'md',
                                        md: 'lg',
                                        lg: 'xl',
                                   }}
                              >
                                   {event?.link ? 'Virtual' : 'Presencial'}
                              </Text>
                         </HStack>

                         <HStack space={2}>
                              <FontAwesome
                                   name="clock-o"
                                   size={iconsReponsive}
                                   color="gray"
                              />
                              <Text
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'md',
                                        md: 'lg',
                                        lg: 'xl',
                                   }}
                              >
                                   {formattedDate}
                              </Text>
                         </HStack>
                    </HStack>
               </VStack>
          </Pressable>
     );
};
