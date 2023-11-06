import { Box, FlatList, Text, View } from 'native-base';
import React from 'react';
import { NotFound } from '../../shared/components/notFound/NotFound';
import { theme } from '../../theme';
import { IEvent } from '../interfaces/community-response.interface';
import EventCommunityCard from './EventCommunityCard';

interface EventListProps {
     events: IEvent[] | undefined;
}

export default function EventList({ events }: EventListProps) {
     return (
          <View h="100%" w="100%" mt={10}>
               <Text
                    fontSize="md"
                    bold
                    ml={5}
                    color={theme.colors.coolGray[900]}
               >
                    Eventos
               </Text>

               {events && events?.length > 0 ? (
                    <FlatList
                         w="100%"
                         p={2}
                         mt={2}
                         data={events}
                         renderItem={(item) => (
                              <EventCommunityCard event={item?.item} />
                         )}
                         keyExtractor={(item) => item?.id}
                         showsHorizontalScrollIndicator={false}
                    />
               ) : (
                    <Box flex={1}>
                         <NotFound message="No se han encontrado eventos para ésta comunidad" />
                    </Box>
               )}
          </View>
     );
}
