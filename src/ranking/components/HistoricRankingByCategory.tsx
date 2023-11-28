import { Center, CheckIcon, Select, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useLazyGetRankingByCategoryIdQuery } from '../../redux/services/leagues.service';
import { useGetRecognitionCategoriesQuery } from '../../redux/services/recognitions.service';
import { CustomSpinner } from '../../shared/components/CustomSpinner/CustomSpinner';
import { NotFoundRanking } from '../../shared/components/notFound/NotFoundRanking';
import { theme } from '../../theme';
import { UserData } from '../interfaces/league.interfaces';
import { RankingCard } from './RankingCard';

export const HistoricRankingByCategory = () => {
     const { data: categoriesData, isLoading: isCategoriesLoading } =
          useGetRecognitionCategoriesQuery();
     const [getRankingByCategory, { data: categoryRankingData }] =
          useLazyGetRankingByCategoryIdQuery();
     const [selectedCategory, setSelectedCategory] = useState<
          string | undefined
     >(categoriesData?.[0]?.id);
     const [isRankingLoading, setIsRankingLoading] = useState<boolean>(false);

     const renderRankingItem: ListRenderItem<UserData> = ({
          item: user,
          index,
     }) => <RankingCard user={user} index={index} />;

     useEffect(() => {
          if (selectedCategory) {
               setIsRankingLoading(true);
               getRankingByCategory(selectedCategory).then(() => {
                    setIsRankingLoading(false);
               });
          }
     }, [selectedCategory]);

     useEffect(() => {
          if (
               categoriesData &&
               categoriesData.length > 0 &&
               !selectedCategory
          ) {
               setSelectedCategory(categoriesData[0].id);
          }
     }, [categoriesData]);

     if (isCategoriesLoading) {
          return (
               <CustomSpinner />
          );
     }

     const handleCategoryChange = (categoryId: string) => {
          setSelectedCategory(undefined);
          setSelectedCategory(categoryId);
          getRankingByCategory(categoryId);
     };

     if (isCategoriesLoading) {
          return (
               <CustomSpinner />
          );
     }

     return (
          <>
               <VStack alignItems="center" space={2} my={4} >
                    <Select
                         selectedValue={selectedCategory}
                         width={'90%'}
                         accessibilityLabel="Seleccionar Categoría"
                         placeholder="Selecciona una Categoría"
                         onValueChange={(itemValue) =>
                              handleCategoryChange(itemValue)
                         }
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
               {isRankingLoading ? (
                    <CustomSpinner />
               ) : categoryRankingData?.topThirtyUsers.length ? (
                    <FlatList
                         data={categoryRankingData.topThirtyUsers}
                         renderItem={renderRankingItem}
                         keyExtractor={(user) => user.id}
                    />
               ) : (
                    <Center flex={1}>
                         <NotFoundRanking message="Aún no hay posiciones para el ranking de esta categoría." />
                    </Center>
               )}
          </>
     );
};
