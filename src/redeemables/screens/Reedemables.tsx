import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Center, FlatList, Spinner, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useGetRedeemablesQuery } from '../../redux/services/redeemeables.service';
import { RootStackParamList } from '../../routing/navigation-types';
import Layout from '../../shared/layout/Layout';
import RedeemableCard from '../components/RedeemableCard';

export const Redeemables = () => {
     const navigation =
          useNavigation<NavigationProp<RootStackParamList, 'Redeemables'>>();
     const {
          data: redeemables,
          isLoading,
          isError,
          error,
     } = useGetRedeemablesQuery();

     return (
          <Layout>
               <Box flexDirection="row" alignItems="center" ml={2} height={50}>
                    <Box>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="left" size={24} color="black" />
                         </TouchableOpacity>
                    </Box>
                    <Center flex={1}>
                         <Text fontSize={16} fontWeight="bold" marginRight={10}>
                              Canjeables
                         </Text>
                    </Center>
               </Box>

               {isLoading ? (
                    <Center flex={1}>
                         <Spinner size="lg" color="blue" />
                    </Center>
               ) : (
                    <FlatList
                         data={redeemables}
                         renderItem={({ item }) => (
                              <RedeemableCard redeemable={item} />
                         )}
                         keyExtractor={(item) => item.id}
                         contentContainerStyle={{ padding: 4 }}
                    />
               )}
          </Layout>
     );
};

export default Redeemables;
