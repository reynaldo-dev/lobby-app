import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Center, Text } from "native-base";
import React, { useState } from "react";
import { Animated, Dimensions, Pressable, TouchableOpacity } from "react-native";
import { Route, SceneMap, SceneRendererProps, TabBarProps, TabView } from "react-native-tab-view";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";
import { ChallengesTab } from "../components/ChallengesTab";
import { MyChallengesTab } from "../components/MyChallengesTab";

interface MyRoute extends Route {
  title: string;
}

interface RenderTabBarProps extends SceneRendererProps, TabBarProps<MyRoute> { }

export const Challenges = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const [routes] = useState([
    { key: "AllChallenges", title: "Todos los retos" },
    { key: "MyChallenges", title: "Mis retos" },
  ]);

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    AllChallenges: ChallengesTab,
    MyChallenges: MyChallengesTab,
  });

  const renderTabBar = (props: RenderTabBarProps) => {
    return (
      <Box flexDirection="row" borderBottomWidth={1} borderColor={theme.colors.coolGray[200]}>
        {props.navigationState.routes.map((route, i) => {
          const borderBottomWidth = index === i ? 2 : 0;
          return (
            <Box
              flex={1}
              alignItems="center"
              p="3"
              borderBottomWidth={borderBottomWidth}
              borderColor={"primary"}
              key={i}
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
    <Layout backgroundColor={theme.colors.background}>
      <Box flexDirection="row" alignItems="center" ml={2} height={50}>
        <Box>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </Box>
        <Center flex={1}>
          <Text
            fontSize={16}
            color={theme.colors.coolGray[900]}
            fontWeight="bold"
            marginRight={10}
          >
            Retos
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
