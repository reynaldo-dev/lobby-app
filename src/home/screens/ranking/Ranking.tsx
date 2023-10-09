import React, { useState } from 'react';
import { Dimensions, Animated, Pressable } from 'react-native';
import { Box } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import Layout from '../../../shared/layout/Layout';
import { theme } from '../../../theme';
import { HistoricRanking } from './components/HistoricRanking';
import { WeeklyRanking } from './components/WeeklyRanking';
import { MonthlyRanking } from './components/MonthlyRanking';

export const Ranking = () => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'weekly', title: 'Ranking Semanal' },
        { key: 'monthly', title: 'Ranking Mensual' },
        { key: 'historic', title: 'Ranking Histórico' },
    ]);

    const initialLayout = { width: Dimensions.get('window').width };

    const renderScene = SceneMap({
        weekly: WeeklyRanking,
        monthly: MonthlyRanking,
        historic: HistoricRanking,
    });

    const renderTabBar = (props: any) => {
        const inputRange = props.navigationState.routes.map((_: any, i: number) => i);
        return (
            <Box flexDirection="row" borderBottomWidth={1} borderColor="coolGray.200">
                {props.navigationState.routes.map((route: any, i: number) => {
                    const borderBottomWidth = index === i ? 2 : 0;
                    return (
                        <Box
                            flex={1}
                            alignItems="center"
                            p="3"
                            borderBottomWidth={borderBottomWidth}
                            borderColor={"primary"}
                        >
                            <Pressable onPress={() => setIndex(i)}>
                                <Animated.Text>{route.title}</Animated.Text>
                            </Pressable>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    return (
        <Layout backgroundColor={theme.colors.background} showCredits={false}>
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
