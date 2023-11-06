import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Center, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../routing/navigation-types';
import Layout from '../../shared/layout/Layout';
import { theme } from '../../theme';
import { CommunityList } from '../components/CommunityList';
import { SearchBarCustom } from '../components/SearchBarCustom';

export const MyCommunities = () => {
     const navigation =
          useNavigation<
               NavigationProp<RootStackParamList, 'MyUpcomingEvents'>
          >();
     return (
          <Layout backgroundColor={theme.colors.background}>
               <Box flexDirection="row" alignItems="center" ml={2} height={50}>
                    <Box>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="left" size={24} color="black" />
                         </TouchableOpacity>
                    </Box>
                    <Center flex={1}>
                         <Text
                              fontSize={16}
                              color={theme.colors.coolGray[900]}
                              fontWeight="bold"
                              marginRight={10}
                         >
                              Mis comunidades
                         </Text>
                    </Center>
               </Box>
               <SearchBarCustom />
               <CommunityList />
          </Layout>
     );
};
