import { FlatList, HStack, Skeleton, VStack } from 'native-base';
import { useState } from 'react';
import { theme } from '../../theme';

export const EventListSkeleton = () => {
     const [items, setitems] = useState([1, 2, 3, 4, 5]);
     return (
          <FlatList
               contentContainerStyle={{ gap: 10, marginHorizontal: 5 }}
               data={items}
               renderItem={() => (
                    <Skeleton>
                         <VStack>
                              <Skeleton.Text size="sm" />
                              <HStack mt={2} alignItems="center" space={2}>
                                   <Skeleton.Text size="xs" />
                                   <Skeleton.Text
                                        startColor={theme.colors.secondary}
                                   />
                              </HStack>
                         </VStack>
                    </Skeleton>
               )}
               keyExtractor={(item) => item.toString()}
          />
     );
};
