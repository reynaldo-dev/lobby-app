import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Badge, HStack, VStack, Text, Box } from 'native-base';
import { formatDate } from '../../helpers/date-format/DateFormat';
import { IInactiveEvents } from '../../shared/interfaces/shared.interface';
import { theme } from '../../theme';

interface EventCardProps {
     event: IInactiveEvents;
}

export const CardHistory = ({ event }: EventCardProps) => {
     const {
          title,
          description,
          dateTime,
          link,
          eventCategory,
          AssistanceTicket,
     } = event;
     const wasPresent =
          Array.isArray(AssistanceTicket) &&
          AssistanceTicket.some((ticket) => ticket.wasPresent);
     const formattedDate = formatDate(event?.dateTime);

     return (
          <Box
               bg="white"
               shadow={1}
               rounded="lg"
               p={4}
               my={3}
               width="90%"
               alignSelf="center"
          >
               <VStack space={2}>
                    <HStack space={2} justifyContent="space-between">
                         <Text fontWeight="bold" flex={1} isTruncated>
                              {title}
                         </Text>
                         <Badge
                              colorScheme={
                                   wasPresent
                                        ? theme.colors.success
                                        : theme.colors.danger
                              }
                         >
                              {wasPresent ? 'Asistió' : 'No Asistió'}
                         </Badge>
                    </HStack>
                    <Text mb={2}>{description}</Text>
                    <HStack justifyContent={'space-between'} mt={2}>
                         <HStack space={2}>
                              <FontAwesome
                                   name={link ? 'laptop' : 'map-marker'}
                                   size={20}
                              />
                              <Text>{link ? 'Virtual' : 'Presencial'}</Text>
                         </HStack>

                         <HStack space={2}>
                              <FontAwesome name="clock-o" size={20} />
                              <Text>{formattedDate}</Text>
                         </HStack>
                    </HStack>
               </VStack>
          </Box>
     );
};
