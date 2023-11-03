import { Center, FlatList, Spinner } from 'native-base';
import React from 'react';
import { useGetAllChallengesQuery } from '../../redux/services/challenges.service';
import { NotFound } from '../../shared/components/notFound/NotFound';
import { ChallengeCard } from '../components/ChallengeCard';
import { Challenge } from '../interfaces/challenges.interfaces';

export const ChallengesTab = () => {
    const [challenges, setChallenges] = React.useState<Challenge[]>([]);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [pagination, setPagination] = React.useState({ from: 0, limit: 10 });

    const {
        data: challengesData,
        isLoading,
        isError,
    } = useGetAllChallengesQuery(pagination);

    React.useEffect(() => {
        if (challengesData?.data) {
            setChallenges(prev => [...prev, ...challengesData.data]);
            setLoadingMore(false);
        }
    }, [challengesData]);

    const loadMoreChallenges = () => {
        if (!loadingMore) {
            setLoadingMore(true);
            setPagination(prev => ({
                from: prev.from + prev.limit,
                limit: 10
            }));
        }
    };

    const renderChallengeItem = ({ item }: { item: Challenge }) => (
        <ChallengeCard challenge={item} />
    );

    const renderFooter = () => {
        if (!loadingMore) return null;
        return <Spinner />;
    };

    if (isLoading) {
        return (
            <Center flex={1}>
                <Spinner />
            </Center>
        );
    }

    if (isError || challenges.length === 0) {
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
                onEndReached={loadMoreChallenges}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </>
    );
};
