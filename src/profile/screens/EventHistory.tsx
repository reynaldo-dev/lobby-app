import { Box, Center, FlatList, Text } from "native-base";
import Layout from "../../shared/layout/Layout";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routing/navigation-types";
import { AntDesign } from "@expo/vector-icons";
import { CardHistory } from "../components/CardHistory";
import { RootState, useAppSelector } from "../../redux/store/store";
import { useGetInactiveEventsQuery } from "../../redux/services/events.service";
import { NotFound } from "../../shared/components/notFound/NotFound";
import { theme } from "../../theme";

export const EventHistory = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "EventHistory">>();
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useGetInactiveEventsQuery(user?.id as string);

  const validEvents = Array.isArray(events) ? events : [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <Center flex={1}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Center>
      );
    }

    if (isError || !validEvents.length) {
      return <NotFound message="Aún no hay eventos pasados" height={300} />;
    }

    return (
      <FlatList
        data={validEvents}
        renderItem={({ item }) => <CardHistory event={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 4 }}
      />
    );
  };

  return (
    <Layout>
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
            Historial de eventos
          </Text>
        </Center>
      </Box>
      {renderContent()}
    </Layout>
  );
};
