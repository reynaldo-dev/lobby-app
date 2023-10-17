import { FontAwesome } from "@expo/vector-icons";
import { Button, Center, HStack, Icon, Spinner, Text } from "native-base";
import React, { useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { IRankingHistoric } from "../interfaces/league.interfaces";
import { useGetCurrentRankingQuery } from "../../redux/services/leagues.service";
import { useGetRecognitionCategoriesQuery } from "../../redux/services/recognitions.service";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";
import { HistoricRankingByCategory } from "./HistoricRankingByCategory";
import { RankingCard } from "./RankingCard";

export const HistoricRanking = () => {
  const { data: rankingData, isLoading, isError } = useGetCurrentRankingQuery();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetRecognitionCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderRankingItem: ListRenderItem<IRankingHistoric> = ({
    item: user,
    index,
  }) => <RankingCard user={user} index={index} />;

  if (isLoading || isCategoriesLoading) {
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
        <Text>Ocurrió un error al cargar el ranking.</Text>
      </Layout>
    );
  }

  return (
    <Layout showCredits={false}>
      <Center>
        <HStack alignItems="center" space={2} mb={4}>
          <Icon name="trophy" as={FontAwesome} />
          <Text fontSize="xl" fontWeight="bold">
            Mejores posiciones históricas
          </Text>
        </HStack>
      </Center>
      {selectedCategory ? (
        <>
          <Center>
            <Button
              onPress={() => setSelectedCategory(null)}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText}>
                Ver ranking histórico general
              </Text>
            </Button>
          </Center>
          <HistoricRankingByCategory />
        </>
      ) : (
        <>
          <Center>
            <Button
              onPress={() => setSelectedCategory(categoriesData?.[0]?.id || "")}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText}>Ver ranking por categoría</Text>
            </Button>
          </Center>
          <FlatList
            data={rankingData}
            renderItem={renderRankingItem}
            keyExtractor={(user) => user.id}
          />
        </>
      )}
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
