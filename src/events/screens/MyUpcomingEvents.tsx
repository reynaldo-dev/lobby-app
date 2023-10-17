import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Box, Center, Spinner, Text, theme } from "native-base";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useGetMyEventsQuery } from "../../redux/services/events.service";
import { RootState, useAppSelector } from "../../redux/store/store";
import { RootStackParamList } from "../../routing/navigation-types";
import { NotFound } from "../../shared/components/notFound/NotFound";
import Layout from "../../shared/layout/Layout";
import CardEvent from "../components/CardEvent";
import { IGetMyEventsResponse } from "../interfaces/get-my-events";

export const MyUpcomingEvents = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    isError,
    isLoading,
    data: myEvents,
  } = useGetMyEventsQuery(user?.id as string);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "MyUpcomingEvents">>();

  const renderItem = ({ item }: { item: IGetMyEventsResponse }) => <CardEvent key={item.id} data={item} />;

  return (
    <Layout showCredits={false}>
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
            Próximos eventos
          </Text>
        </Center>
      </Box>
      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      ) : (
        <>
          {myEvents && myEvents.length > 0 ? (
            <FlatList
              data={myEvents.slice(0, 5)}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListFooterComponent={
                <Center flex={1}>
                  <Text color={theme.colors.muted[400]} mb={5}>
                    No hay más eventos próximos
                  </Text>
                </Center>
              }
            />
          ) : (
            <NotFound
              message="Aún no estás inscrito a ningún evento."
            />
          )}
        </>
      )}
    </Layout>
  );
};
