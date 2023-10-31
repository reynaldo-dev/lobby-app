import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
     Box,
     HStack,
     Icon,
     Pressable,
     Stack,
     Text,
     useBreakpointValue,
} from 'native-base';
import { isDarkColor } from '../../helpers/is-dark-color/isDarkColor';
import { ICommunity } from '../../interfaces/community.interface';
import { useGetCountMembersQuery } from '../../redux/services/communities.service';
import { RootStackParamList } from '../../routing/navigation-types';

type Props = {
     data: ICommunity;
};

const CommunityCard = ({ data }: Props) => {
     const navigation =
          useNavigation<NavigationProp<RootStackParamList, 'Community'>>();

     const onPress = () => {
          navigation.navigate('Community', { id: data?.id });
     };

     const iconBreakpoint = useBreakpointValue({
          base: 'sm',
          sm: 'sm',
          md: 'lg',
          lg: 'lg',
     });

     const { data: communityData } = useGetCountMembersQuery(data?.id);
     return (
          <Pressable
               onPress={onPress}
               my={2}
               w={{
                    base: '90%',
                    sm: '90%',
                    md: '90%',
                    lg: '90%',
               }}
               borderRadius={10}
               backgroundColor={data?.color}
               opacity={0.9}
          >
               {({ isPressed }) => (
                    <Box
                         style={{
                              transform: [{ scale: isPressed ? 0.96 : 1 }],
                         }}
                    >
                         <Stack p={4} space={[3, 3, 1.5]} flexDir="row">
                              <Stack w={'70%'}>
                                   <Text
                                        fontSize={{
                                             base: 'md',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}
                                        bold
                                        color={
                                             isDarkColor(data?.color)
                                                  ? 'white'
                                                  : 'black'
                                        }
                                   >
                                        {data?.name}
                                   </Text>
                              </Stack>

                              <HStack
                                   alignItems="center"
                                   w={'30%'}
                                   justifyContent="flex-end"
                              >
                                   <Box p={2.5}>
                                        {communityData?.totalMembers === 0 ? (
                                             <HStack space={2}>
                                                  <Text
                                                       color={
                                                            isDarkColor(
                                                                 data?.color
                                                            )
                                                                 ? 'white'
                                                                 : 'black'
                                                       }
                                                       fontSize={{
                                                            base: 'xs',
                                                            sm: 'xs',
                                                            md: 'sm',
                                                            lg: 'sm',
                                                       }}
                                                       fontWeight="bold"
                                                  >
                                                       0
                                                  </Text>
                                                  <Icon
                                                       as={
                                                            <Feather name="users" />
                                                       }
                                                       color={
                                                            isDarkColor(
                                                                 data?.color
                                                            )
                                                                 ? 'white'
                                                                 : 'black'
                                                       }
                                                       size={iconBreakpoint}
                                                  />
                                             </HStack>
                                        ) : (
                                             <Box
                                                  flexDir="row"
                                                  justifyContent="center"
                                                  alignItems="center"
                                             >
                                                  <Text
                                                       color={
                                                            isDarkColor(
                                                                 data?.color
                                                            )
                                                                 ? 'white'
                                                                 : 'black'
                                                       }
                                                       fontSize={{
                                                            base: 'xs',
                                                            sm: 'xs',
                                                            md: 'sm',
                                                            lg: 'sm',
                                                       }}
                                                       mr={2}
                                                       fontWeight="bold"
                                                  >
                                                       {
                                                            communityData?.totalMembers
                                                       }
                                                  </Text>
                                                  <Icon
                                                       as={
                                                            <Feather name="users" />
                                                       }
                                                       color={
                                                            isDarkColor(
                                                                 data?.color
                                                            )
                                                                 ? 'white'
                                                                 : 'black'
                                                       }
                                                       size={iconBreakpoint}
                                                  />
                                             </Box>
                                        )}
                                   </Box>
                              </HStack>
                         </Stack>
                    </Box>
               )}
          </Pressable>
     );
};

export default CommunityCard;
