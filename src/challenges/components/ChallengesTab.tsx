import { Center, FlatList, Spinner } from 'native-base';
import React from 'react';
import { useGetAllChallengesQuery } from '../../redux/services/challenges.service';
import { NotFound } from '../../shared/components/notFound/NotFound';
import { ChallengeCard } from '../components/ChallengeCard';
import { Challenge } from '../interfaces/challenges.interfaces';

export const ChallengesTab = () => {
    const [challenges, setChallenges] = React.useState<Challenge[]>([]);

    const {
        data: challengesData,
        isLoading,
        isError,
    } = useGetAllChallengesQuery({ from: 0, limit: 10 });

    React.useEffect(() => {
        challengesData?.data
        setChallenges(challengesData?.data);

    }, [challengesData]);

    const renderChallengeItem = ({ item }: { item: Challenge }) => (
        <ChallengeCard challenge={item} />
    );


    if (isLoading) {
        return (
            <Center flex={1}>
                <Spinner />
            </Center>
        );
    }

    if (isError || challenges?.length === 0) {
        return (
            <Center flex={1}>
                <NotFound message="No se han encontrado retos activos" />
            </Center>
        );
    }

    return (
        <>
            <FlatList
                data={challenges}
                renderItem={renderChallengeItem}
                keyExtractor={(item) => item.id}
            />
        </>
    );
};
