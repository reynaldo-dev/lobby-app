import { Center, FlatList, Spinner } from 'native-base';
import React from 'react';
import { useFindMyChallengesQuery } from '../../redux/services/challenges.service';
import { RootState, useAppSelector } from '../../redux/store/store';
import { NotFound } from '../../shared/components/notFound/NotFound';
import { ChallengeCard } from '../components/ChallengeCard';
import { IMyChallenges } from '../interfaces/challenges.interfaces';

export const MyChallengesTab = () => {
    const { user } = useAppSelector((state: RootState) => state.user);

    const {
        data: challengesData,
        isLoading,
        isError,
    } = useFindMyChallengesQuery({ userId: user?.id as string });

    const renderChallengeItem = ({ item }: { item: IMyChallenges }) => (
        <ChallengeCard challenge={item.challenge} showDetail={false} />
    );

    if (isLoading) {
        return (
            <Center flex={1}>
                <Spinner />
            </Center>
        );
    }

    if (isError || !challengesData || challengesData?.length === 0) {
        return (
            <Center flex={1}>
                <NotFound message="No se han encontrado retos" />
            </Center>
        );
    }

    return (
        <>
            <FlatList
                data={challengesData}
                renderItem={renderChallengeItem}
                keyExtractor={(item) => item.challenge.id}
            />
        </>
    );
};
