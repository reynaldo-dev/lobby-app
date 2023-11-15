import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Center, Text } from 'native-base';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useGetUpcomingEventsQuery } from '../../redux/services/events.service';
import { RootStackParamList } from '../../routing/navigation-types';
import { CustomSpinner } from '../../shared/components/CustomSpinner/CustomSpinner';
import { NotFound } from '../../shared/components/notFound/NotFound';
import Layout from '../../shared/layout/Layout';
import { theme } from '../../theme';
import CardEvent from '../components/CardEvent';
import { IUpcomingEvents } from '../interfaces/upcoming-events';

const currentDate = new Date().toISOString().slice(0, 10);

export const UpcomingEvents = () => {
     const {
          isError,
          isLoading,
          data: events,
     } = useGetUpcomingEventsQuery(currentDate);
     const navigation =
          useNavigation<
               NavigationProp<RootStackParamList, 'UpcomingEvents'>
          >();

     const renderItem = ({ item }: { item: IUpcomingEvents }) => (
          <CardEvent key={item.id} data={item} />
     );

     return (
          <Layout backgroundColor={theme.colors.background}>
               <Box flexDirection="row" alignItems="center" ml={2} height={50}>
                    <Box>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="left" size={24} color="black" />
                         </TouchableOpacity>
                    </Box>
                    <Center flex={1}>
                         <Text fontSize={16} fontWeight="bold" marginRight={10}>
                              Próximos eventos
                         </Text>
                    </Center>
               </Box>
               {isLoading ? (
                    <CustomSpinner />
               ) : (
                    <>
                         {events && events.length > 0 ? (
                              <FlatList
                                   data={events}
                                   renderItem={renderItem}
                                   keyExtractor={(item) => item.id.toString()}
                                   ListFooterComponent={
                                        <Center flex={1}>
                                             <Text mb={5}
                                                  fontSize={{
                                                       base: 'md',
                                                       sm: 'md',
                                                       md: 'xl',
                                                       lg: '2xl',
                                                  }}
                                             >
                                                  No hay más eventos próximos
                                             </Text>
                                        </Center>
                                   }
                              />
                         ) : (
                              <NotFound message="No hay eventos próximos." />
                         )}
                    </>
               )}
          </Layout>
     );
};
