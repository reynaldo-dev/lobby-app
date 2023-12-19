import { FontAwesome } from '@expo/vector-icons';
import { Button, Center, CheckIcon, HStack, Icon, Select, Text, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { useGetAnnualRankingQuery } from '../../redux/services/leagues.service';
import { useGetRecognitionCategoriesQuery } from '../../redux/services/recognitions.service';
import { CustomSpinner } from '../../shared/components/CustomSpinner/CustomSpinner';
import { IsError } from '../../shared/components/IsError/IsError';
import { NotFoundRanking } from '../../shared/components/notFound/NotFoundRanking';
import { theme } from '../../theme';
import { UserData } from '../interfaces/league.interfaces';
import { RankingCard } from './RankingCard';
import { YearlyRankingByCategoryId } from './YearlyRankingByCategoryId';

interface FiltersAndHeaderProps {
     year: number;
     setYear: (year: number) => void;
}

const FiltersAndHeader = ({ year, setYear }: FiltersAndHeaderProps) => {
     return (
          <>
               <Center>
                    <HStack space={4}>
                         <Select
                              selectedValue={year.toString()}
                              minWidth={'90%'}
                              onValueChange={(value) => setYear(Number(value))}
                              _selectedItem={{ endIcon: <CheckIcon size={4} />, }}
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
};
export const YearlyRanking = () => {
     const [year, setYear] = useState(new Date().getFullYear());
     const { data: rankingData, isLoading: isRankingLoading, isError } = useGetAnnualRankingQuery({ year });
     const { data: categoriesData, isLoading: isCategoriesLoading } = useGetRecognitionCategoriesQuery();
     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

     const toggleCategorySelection = async () => {
          setSelectedCategory(selectedCategory ? null : (categoriesData?.[0]?.id || ""));
     };

     const renderRankingItem = useCallback<ListRenderItem<UserData>>(
          ({ item: user, index }) => <RankingCard user={user} index={index} />,
          []
     );

     const renderContent = useCallback(() => {
          if (isRankingLoading || isCategoriesLoading) {
               return <CustomSpinner />;
          }

          if (isError) {
               return <IsError message="Ocurrio un error inesperado" />;
          }

          if (!rankingData || rankingData.topThirtyUsers.length === 0) {
               return <NotFoundRanking message="No se encontró información sobre este año" />;
          }

          return (
               <FlatList
                    data={rankingData.topThirtyUsers}
                    renderItem={renderRankingItem}
                    keyExtractor={(user) => user.id}

               />
          );
     }, [isRankingLoading, isCategoriesLoading, isError, rankingData, renderRankingItem]);

     return (
          <>
               <VStack space={4}>
                    <Center>
                         <HStack alignItems="center" space={2} mt={4}>
                              <Icon name="trophy" as={FontAwesome} />
                              <Text fontSize={{ base: 'xl', sm: 'xl', md: '3xl', lg: '3xl' }} fontWeight="bold">
                                   Mejores posiciones anuales
                              </Text>
                         </HStack>
                    </Center>
                    <Center>
                         <Button
                              onPress={toggleCategorySelection}
                              style={styles.buttonStyle}
                              isDisabled={isRankingLoading}
                              isLoading={isRankingLoading}
                         >
                              <Text style={styles.buttonText}>
                                   {selectedCategory ? "Ver ranking anual" : "Ver ranking anual por categoría"}
                              </Text>
                         </Button>
                    </Center>
                    <FiltersAndHeader year={year} setYear={setYear} />
                    {selectedCategory ? <YearlyRankingByCategoryId year={year} /> : renderContent()}
               </VStack>
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