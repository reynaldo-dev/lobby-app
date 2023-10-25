import { FontAwesome } from "@expo/vector-icons";
import { Center, HStack, Icon, Spinner, Text } from "native-base";
import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useGetWeeklyRankingQuery } from "../../redux/services/leagues.service";
import { IsError } from "../../shared/components/IsError/IsError";
import { NotFoundRanking } from "../../shared/components/notFound/NotFoundRanking";
import Layout from "../../shared/layout/Layout";
import { IRanking } from "../interfaces/league.interfaces";
import { RankingCard } from "./RankingCard";

export const WeeklyRanking = () => {
  const { data: rankingData, isLoading, isError } = useGetWeeklyRankingQuery();
  const renderRankingItem: ListRenderItem<IRanking> = ({
    item: user,
    index,
  }) => <RankingCard user={user} index={index} />;

  if (isLoading) {
    return (
      <Layout >
        <Center>
          <Spinner accessibilityLabel="Cargando..." />
        </Center>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout >
        <IsError message="Ocurrio un error inesperado" />
      </Layout>
    );
  }

  if (!rankingData || rankingData.length === 0) {
    return (
      <Layout >
        <NotFoundRanking message="Aún no hay posiciones para el ranking semanal" />
      </Layout>
    );
  }

  return (
    <Layout >
      <Center>
        <HStack alignItems="center" space={2} mb={4}>
          <Icon name="trophy" as={FontAwesome} size={[6, 6, 8]} />
          <Text
            fontSize={{
              base: 'xl',
              sm: 'xl',
              md: '3xl',
              lg: '3xl',
            }}
            fontWeight="bold">
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

