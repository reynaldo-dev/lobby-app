import { FontAwesome } from "@expo/vector-icons";
import { Button, Center, HStack, Icon, Text } from "native-base";
import React, { useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { useGetCurrentRankingQuery } from "../../redux/services/leagues.service";
import { useGetRecognitionCategoriesQuery } from "../../redux/services/recognitions.service";
import { RootState, useAppSelector } from "../../redux/store/store";
import { CustomSpinner } from "../../shared/components/CustomSpinner/CustomSpinner";
import { IsError } from "../../shared/components/IsError/IsError";
import { theme } from "../../theme";
import { IRankingHistoric, UserData } from "../interfaces/league.interfaces";
import { HistoricRankingByCategory } from "./HistoricRankingByCategory";
import { RankingCard } from "./RankingCard";

export const HistoricRanking = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const { data: rankingData, isLoading, isError, refetch } = useGetCurrentRankingQuery(user?.id as string);
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetRecognitionCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderRankingItem: ListRenderItem<UserData> = ({
    item: user,
    index,
  }) => <RankingCard user={user} index={index} />;

  if (isLoading || isCategoriesLoading) {
    return (
      <CustomSpinner />
    );
  }

  if (isError) {
    return <IsError
      message="Ha ocurrido un error inesperado"
      refetchFunction={refetch as () => void}
      showRefetchButton={true} />;
  }

  return (
    < >
      <Center>
        <HStack alignItems="center" space={2} my={4}>
          <Icon name="trophy" as={FontAwesome} />
          <Text
            fontSize={{
              base: 'xl',
              sm: 'xl',
              md: '3xl',
              lg: '3xl',
            }}
            fontWeight="bold">
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
            data={rankingData?.topThirtyUsers}
            renderItem={renderRankingItem}
            keyExtractor={(user) => user.id}
          />
        </>
      )}
    </>
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
