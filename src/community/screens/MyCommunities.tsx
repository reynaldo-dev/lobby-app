import { useGetCommunitiesByUserIdQuery } from "../../redux/services/communities.service";
import { RootState, useAppSelector } from "../../redux/store/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routing/navigation-types";
import { Box, Center, Text } from "native-base";
import React from "react";
import { TouchableOpacity, FlatList } from "react-native";
import Layout from "../../shared/layout/Layout";
import CommunityCard from "../components/CommunityCard";
import { AntDesign } from "@expo/vector-icons";
import { CommunityList } from "../components/CommunityList";
import { SearchCommunity } from "./SearchCommunity";
import { SearchBarCustom } from "../components/SearchBarCustom";

export const MyCommunities = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: communities,
    isLoading,
    isError,
    error,
  } = useGetCommunitiesByUserIdQuery(user?.id as string);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "MyUpcomingEvents">>();
  return (
    <Layout >
      <Box flexDirection="row" alignItems="center" ml={2} height={50}>
        <Box>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </Box>
        <Center flex={1}>
          <Text
            fontSize={16}
            color={"muted.500"}
            fontWeight="bold"
            marginRight={10}
          >
            Mis comunidades
          </Text>
        </Center>
      </Box>
      <SearchBarCustom />
      <CommunityList />
    </Layout>
  );
};
