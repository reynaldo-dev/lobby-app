import { Box } from 'native-base';
import React, { useState } from 'react';
import { Animated, Dimensions, Pressable } from 'react-native';
import {
     Route,
     SceneMap,
     SceneRendererProps,
     TabBarProps,
     TabView,
} from 'react-native-tab-view';
import { useRefetchOnFocus } from '../../hooks/useRefetchOnFocus';
import { useGetTicketsByUserIdQuery } from '../../redux/services/assitanceTicket.service';
import { useGetTicketsByUserIdQuery as useGetConsumablesTicketsByUserIdQuery } from '../../redux/services/consumableTicket.service';
import { RootState, useAppSelector } from '../../redux/store/store';
import Layout from '../../shared/layout/Layout';
import { theme } from '../../theme';
import { AssistanceTickets } from '../components/AssistanceTickets';
import { ConsumablesTickets } from '../components/ConsumablesTickets';

interface MyRoute extends Route {
     title: string;
}

interface RenderTabBarProps extends SceneRendererProps, TabBarProps<MyRoute> {}

export const TicketsScreen = () => {
     const { user } = useAppSelector((state: RootState) => state.user);
     const { refetch: refetchConsumablesTickets } =
          useGetConsumablesTicketsByUserIdQuery(user?.id as string);

     const { refetch: refetchAssistanceTickets } = useGetTicketsByUserIdQuery(
          user?.id as string
     );

     useRefetchOnFocus(refetchConsumablesTickets);
     useRefetchOnFocus(refetchAssistanceTickets);

     const [index, setIndex] = useState(0);
     const [routes] = useState([
          { key: 'assistance', title: 'Asistencia' },
          { key: 'consumables', title: 'Consumibles' },
     ]);

     const initialLayout = {
          width: Dimensions.get('window').width,
     };

     const renderScene = SceneMap({
          assistance: AssistanceTickets,
          consumables: ConsumablesTickets,
     });

     const renderTabBar = (props: RenderTabBarProps) => {
          const inputRange = props.navigationState.routes.map(
               (_: any, i: number) => i
          );
          return (
               <Box flexDirection="row" borderBottomWidth={1}>
                    {props.navigationState.routes.map(
                         (route: any, i: number) => {
                              const borderBottomWidth = index === i ? 2 : 0;
                              return (
                                   <Box
                                        key={route.key}
                                        flex={1}
                                        alignItems="center"
                                        p="3"
                                        borderBottomWidth={borderBottomWidth}
                                        borderColor={'primary'}
                                   >
                                        <Pressable onPress={() => setIndex(i)}>
                                             <Animated.Text>
                                                  {route.title}
                                             </Animated.Text>
                                        </Pressable>
                                   </Box>
                              );
                         }
                    )}
               </Box>
          );
     };

     return (
          <Layout backgroundColor={theme.colors.background}>
               <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
               />
          </Layout>
     );
};
