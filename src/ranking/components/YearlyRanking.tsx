import { FontAwesome } from "@expo/vector-icons";
import {
    Center,
    CheckIcon,
    HStack,
    Icon,
    Select,
    Spinner,
    Text,
    VStack
} from "native-base";
import React, { memo, useCallback, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useGetAnnualRankingQuery } from "../../redux/services/leagues.service";
import { IsError } from "../../shared/components/IsError/IsError";
import { NotFoundRanking } from "../../shared/components/notFound/NotFoundRanking";
import Layout from "../../shared/layout/Layout";
import { IRanking } from "../interfaces/league.interfaces";
import { RankingCard } from "./RankingCard";

interface FiltersAndHeaderProps {
    year: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
}

const FiltersAndHeader = memo(({ year, setYear }: FiltersAndHeaderProps) => {
    return (
        <>
            <Center>
                <HStack alignItems="center" space={2} mb={4}>
                    <Icon name="trophy" as={FontAwesome} />
                    <Text
                        fontSize={{
                            base: 'xl',
                            sm: 'xl',
                            md: '3xl',
                            lg: '3xl',
                        }}
                        fontWeight="bold">
                        Mejores posiciones anuales
                    </Text>
                </HStack>
            </Center>
            <Center>
                <HStack space={4}>
                    <Select
                        selectedValue={year.toString()}
                        minWidth={"90%"}
                        onValueChange={(value) => setYear(Number(value))}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,
                        }}
                    >
                        {Array.from({ length: 5 }, (_, index) => (
                            <Select.Item
                                label={(new Date().getFullYear() - index).toString()}
                                value={(new Date().getFullYear() - index).toString()}
                                key={index}
                            />
                        ))}
                    </Select>
                </HStack>
            </Center>
        </>
    );
});

export const YearlyRanking = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const { data: rankingData, isLoading, isError } = useGetAnnualRankingQuery({ year });

    const renderRankingItem = useCallback<ListRenderItem<IRanking>>(
        ({ item: user, index }) => <RankingCard user={user} index={index} />,
        []
    );

    const renderContent = useCallback(() => {
        if (isLoading) {
            return (
                <Center flex={1}>
                    <Spinner accessibilityLabel="Cargando..." />
                </Center>
            );
        }

        if (isError) {
            return (
                <IsError message="Ocurrio un error inesperado" />
            );
        }

        if (!rankingData || rankingData.length === 0) {
            return (
                <NotFoundRanking message="No se encontró información sobre este año" />
            );
        }

        return (
            <FlatList
                data={rankingData}
                renderItem={renderRankingItem}
                keyExtractor={(user) => user.id}
            />
        );
    }, [isLoading, isError, rankingData, renderRankingItem]);

    return (
        <Layout >
            <VStack space={4}>
                <FiltersAndHeader year={year} setYear={setYear} />
                {renderContent()}
            </VStack>
        </Layout>
    );
};
