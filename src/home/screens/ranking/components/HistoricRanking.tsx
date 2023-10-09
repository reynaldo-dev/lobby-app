// Ranking.tsx
import { FontAwesome } from '@expo/vector-icons';
import { Center, HStack, Icon, Spinner, Text } from 'native-base';
import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { IRanking } from '../../../../redux/services/leagues/interfaces/league.interfaces';
import { useGetCurrentRankingQuery } from '../../../../redux/services/leagues/leagues.service';
import Layout from '../../../../shared/layout/Layout';
import { RankingCard } from './RankingCard';

export const HistoricRanking = () => {
    const { data: rankingData, isLoading, isError } = useGetCurrentRankingQuery();

    const renderRankingItem: ListRenderItem<IRanking> = ({ item: user, index }) => (
        <RankingCard user={user} index={index} />
    );

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
                <Text>Ocurrió un error al cargar el ranking.</Text>
            </Layout>
        );
    }

    return (
        <Layout showCredits={false}>
            <Center>
                <HStack alignItems="center" space={2} mb={4}>
                    <Icon name="trophy" as={FontAwesome} />
                    <Text fontSize="xl" fontWeight="bold">Mejores posiciones históricas</Text>
                </HStack>
            </Center>
            <FlatList
                data={rankingData}
                renderItem={renderRankingItem}
                keyExtractor={user => user.id}
            />
        </Layout>
    )
}
