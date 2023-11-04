import React, { useState } from 'react';
import {
     Animated,
     Dimensions,
     Pressable,
     TouchableOpacity,
} from 'react-native';
import {
     TabView,
     SceneMap,
     Route,
     SceneRendererProps,
     TabBarProps,
} from 'react-native-tab-view';
import { Box, Center, Text } from 'native-base';
import Layout from '../../shared/layout/Layout';
import MyRecognitions from './MyRecognitions';
import RecognitionChartBar from '../components/RecognitionChartBar';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

interface MyRoute extends Route {
     title: string;
}

interface RenderTabBarProps extends SceneRendererProps, TabBarProps<MyRoute> {}

export const RecognitionsTabView = () => {
     const [index, setIndex] = useState(0);
     const navigation = useNavigation();

     const [routes] = useState([
          { key: 'Stadistics', title: 'Estadisticas' },
          { key: 'Details', title: 'Detalles' },
     ]);

     const initialLayout = { width: Dimensions.get('window').width };

     const renderScene = SceneMap({
          Stadistics: RecognitionChartBar,
          Details: MyRecognitions,
     });

     const renderTabBar = (props: RenderTabBarProps) => {
          return (
               <Box flexDirection="row" borderBottomWidth={1}>
                    {props.navigationState.routes.map((route, i) => {
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
                    })}
               </Box>
          );
     };

     return (
          <Layout backgroundColor={'#f0f0f0'}>
               <Box flexDirection="row" alignItems="center" ml={2} height={50}>
                    <Box>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="left" size={24} color="black" />
                         </TouchableOpacity>
                    </Box>
                    <Center flex={1}>
                         <Text fontSize={16} fontWeight="bold" marginRight={10}>
                              Mis reconocimientos
                         </Text>
                    </Center>
               </Box>
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
