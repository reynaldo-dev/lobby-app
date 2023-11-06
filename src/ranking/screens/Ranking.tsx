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
import Layout from '../../shared/layout/Layout';
import { theme } from '../../theme';
import { HistoricRanking } from '../components/HistoricRanking';
import { MonthlyRanking } from '../components/MonthlyRanking';
import { WeeklyRanking } from '../components/WeeklyRanking';
import { YearlyRanking } from '../components/YearlyRanking';

interface MyRoute extends Route {
     title: string;
}

interface RenderTabBarProps extends SceneRendererProps, TabBarProps<MyRoute> { }

export const Ranking = () => {
     const [index, setIndex] = useState(0);
     const [routes] = useState([
          { key: 'weekly', title: 'Semanal' },
          { key: 'monthly', title: 'Mensual' },
          { key: 'yearly', title: 'Anual' },
          { key: 'historic', title: 'Histórico' },
     ]);

     const initialLayout = { width: Dimensions.get('window').width };

     const renderScene = SceneMap({
          weekly: WeeklyRanking,
          monthly: MonthlyRanking,
          yearly: YearlyRanking,
          historic: HistoricRanking,
     });

     const renderTabBar = (props: RenderTabBarProps) => {

          return (
               <Box flexDirection="row" borderBottomWidth={1} borderColor={theme.colors.coolGray[200]}>
                    {props.navigationState.routes.map(
                         (route: any, i: number) => {
                              const borderBottomWidth = index === i ? 2 : 0;
                              return (
                                   <Box
                                        flex={1}
                                        alignItems="center"
                                        p="3"
                                        borderBottomWidth={borderBottomWidth}
                                        borderColor={theme.colors.primary}
                                        key={i}
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
