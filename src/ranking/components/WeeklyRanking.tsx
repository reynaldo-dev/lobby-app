import { FontAwesome } from "@expo/vector-icons";
import { Center, HStack, Icon, Spinner, Text } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { useGetWeeklyRankingQuery } from "../../redux/services/leagues.service";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";
import { IRanking } from "../interfaces/league.interfaces";
import { RankingCard } from "./RankingCard";
import { NotFoundRanking } from "../../shared/components/notFound/NotFoundRanking";
import { IsError } from "../../shared/components/IsError/IsError";

export const WeeklyRanking = () => {
  const { data: rankingData, isLoading, isError } = useGetWeeklyRankingQuery();
  const renderRankingItem: ListRenderItem<IRanking> = ({
    item: user,
    index,
  }) => <RankingCard user={user} index={index} />;

  if (isLoading) {
    return (
      <Layout showCredits={false}>
        <Center>
          <Spinner accessibilityLabel="Cargando..." />
        </Center>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout showCredits={false}>
        <IsError message="Ocurrio un error inesperado" />
      </Layout>
    );
  }

  if (!rankingData || rankingData.length === 0) {
    return (
      <Layout showCredits={false}>
        <NotFoundRanking message="Aún no hay posiciones para el ranking semanal" />
      </Layout>
    );
  }

  return (
    <Layout showCredits={false}>
      <Center>
        <HStack alignItems="center" space={2} mb={4}>
          <Icon name="trophy" as={FontAwesome} />
          <Text fontSize="xl" fontWeight="bold">
            Mejores posiciones semanales
          </Text>
        </HStack>
      </Center>
      <FlatList
        data={rankingData}
        renderItem={renderRankingItem}
        keyExtractor={(user) => user.id}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
  },
});
