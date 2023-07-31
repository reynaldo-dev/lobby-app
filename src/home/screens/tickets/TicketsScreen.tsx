import { Box } from "native-base";
import React, { useState } from "react";
import { Animated, Dimensions, Pressable } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { AssistanceTickets } from "./components/AssistanceTickets";
import { ConsumablesTickets } from "./components/ConsumablesTickets";

export const TicketsScreen: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'assistance', title: 'Asistencia' },
        { key: 'consumibles', title: 'Consumibles' },
    ]);


    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        assistance: AssistanceTickets,
        consumibles: ConsumablesTickets,
    });

    const renderTabBar = (props: any) => {
        const inputRange = props.navigationState.routes.map((_: any, i: number) => i);
        return (
            <Box flexDirection="row" borderBottomWidth={1} borderColor="coolGray.200">
                {props.navigationState.routes.map((route: any, i: number) => {
                    const borderBottomWidth = index === i ? 2 : 0;
                    return (
                        <Box flex={1} alignItems="center" p="3" borderBottomWidth={borderBottomWidth} borderColor={"primary"}>
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
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    );
};
