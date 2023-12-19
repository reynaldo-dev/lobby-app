import React, { useEffect, useState } from 'react';
import { Center, CheckIcon, Select, VStack } from 'native-base';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useLazyGetAnnualRankingByCategoryIdQuery } from '../../redux/services/leagues.service';
import { useGetRecognitionCategoriesQuery } from '../../redux/services/recognitions.service';
import { RootState, useAppSelector } from '../../redux/store/store';
import { CustomSpinner } from '../../shared/components/CustomSpinner/CustomSpinner';
import { NotFoundRanking } from '../../shared/components/notFound/NotFoundRanking';
import { RankingCard } from './RankingCard';
import { UserData } from '../interfaces/league.interfaces';
import { theme } from '../../theme';

interface YearlyRankingByCategoryIdProps {
    year: number;
}

export const YearlyRankingByCategoryId = ({ year }: YearlyRankingByCategoryIdProps) => {
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetRecognitionCategoriesQuery();
    const [getAnnualRankingByCategory, { data: categoryRankingData, isLoading: isRankingLoading }] = useLazyGetAnnualRankingByCategoryIdQuery();
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(categoriesData?.[0]?.id);
    const { user: userState } = useAppSelector((state: RootState) => state.user);

    const renderRankingItem: ListRenderItem<UserData> = ({ item: user, index }) => <RankingCard user={user} index={index} />;

    useEffect(() => {
        if (selectedCategory) {
            getAnnualRankingByCategory({ year, userId: userState?.id as string, categoryId: selectedCategory });
        }
    }, [selectedCategory, year]);

    useEffect(() => {
        if (categoriesData && categoriesData.length > 0 && !selectedCategory) {
            setSelectedCategory(categoriesData[0].id);
        }
    }, [categoriesData]);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const listContent = isRankingLoading ? (
        <CustomSpinner />
    ) : (
        <FlatList
            data={categoryRankingData?.topThirtyUsers}
            renderItem={renderRankingItem}
            keyExtractor={(user) => user.id}
            ListEmptyComponent={
                <Center flex={1} >
                    <NotFoundRanking message="Aún no hay posiciones para el ranking de esta categoría en el año seleccionado." />
                </Center>
            }
            contentContainerStyle={{ paddingBottom: 50 }}


        />
    );

    return (
        <>
            <VStack alignItems="center" space={2} mb={4}>
                <Select
                    selectedValue={selectedCategory}
                    width={'90%'}
                    accessibilityLabel="Seleccionar Categoría"
                    placeholder="Selecciona una Categoría"
                    onValueChange={handleCategoryChange}
                    _selectedItem={{
                        bg: theme.colors.primary,
                        endIcon: <CheckIcon size={4} />,
                    }}
                >
                    {categoriesData?.map((category) => (
                        <Select.Item
                            key={category.id}
                            label={category.name}
                            value={category.id}
                        />
                    ))}
                </Select>
            </VStack>
            {listContent}
        </>
    );
};
