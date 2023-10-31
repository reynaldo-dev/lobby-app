import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, Text, View } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { isDarkColor } from '../../helpers/is-dark-color/isDarkColor';
import { RootStackParamList } from '../../routing/navigation-types';
import { theme } from '../../theme';
import { GetCommunityByIDResponse } from '../interfaces/community-response.interface';

interface CommunityCoverProps {
     community: GetCommunityByIDResponse;
}

export default function CommunityCover({ community }: CommunityCoverProps) {
     const styleBackButton = isDarkColor(community?.color) ? 'white' : 'black';
     const navigation =
          useNavigation<NavigationProp<RootStackParamList, 'Community'>>();
     return (
          <View bgColor={community?.color} h="15%" position={'relative'}>
               <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                         position: 'absolute',
                         top: 5,
                         left: 4,
                         padding: 5,
                         zIndex: 999,
                    }}
               >
                    <AntDesign name="left" size={24} color={styleBackButton} />
               </TouchableOpacity>

               <View h="full" bg={community?.color}>
                    <LinearGradient
                         colors={[community?.color, 'transparent']}
                    />
                    <Box
                         justifyContent="center"
                         alignItems="center"
                         h="full"
                         p={4}
                    >
                         <Text bold fontSize="2xl" color={theme.colors.white}>
                              {community?.name}
                         </Text>
                         <Text
                              fontSize="md"
                              color={theme.colors.white}
                              mt={2}
                              numberOfLines={2}
                         >
                              {community?.description}
                         </Text>
                    </Box>
               </View>
          </View>
     );
}
