import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
     Box,
     HStack,
     Icon,
     Image,
     Pressable,
     Spinner,
     Text,
     VStack,
     useTheme,
} from 'native-base';
import React from 'react';
import avatarImage from '../../../assets/avatar.png';
import MaleAvatar from '../../../assets/male-avatar.svg';
import {
     useGetCurrentLeagueQuery,
     useGetCurrentRecognitionsCountQuery,
} from '../../redux/services/user.service';
import { RootState, useAppSelector } from '../../redux/store/store';
import { RootStackParamList } from '../../routing/navigation-types';
import { theme } from '../../theme';

type RecognitionCardProps = {
     name: string | undefined;
     lastName?: string | undefined;
     score: number;
     imageSource?: any;
};

export const RecognitionCard = ({
     name,
     lastName,
     imageSource = avatarImage,
     score,
}: RecognitionCardProps) => {
     const { colors } = useTheme();
     const { user } = useAppSelector((state: RootState) => state.user);
     const { data, isLoading } = useGetCurrentRecognitionsCountQuery(
          user?.id as string
     );
     const { data: league, isLoading: leagueIsLoading } =
          useGetCurrentLeagueQuery(user?.id as string);

     const firstName = name?.split(' ')[0];
     const firstLastName = lastName?.split(' ')[0];

     const navigation =
          useNavigation<NativeStackNavigationProp<RootStackParamList>>();

     const onPressRecognitions = () => {
          navigation.navigate('MyRecognitions');
     };

     return (
          <Pressable onPress={onPressRecognitions}>
               {({ isPressed }) => (
                    <Box
                         width="95%"
                         borderRadius="xl"
                         alignSelf="center"
                         padding={[2, 4, 6, 8]}
                         borderColor="darkGray"
                         flexDirection="row"
                         justifyContent="space-between"
                         alignItems="center"
                         backgroundColor={
                              isPressed ? colors.primary[50] : colors.white
                         }
                         style={{
                              transform: [{ scale: isPressed ? 0.98 : 1 }],
                         }}
                    >
                         <HStack space={4}>
                              <VStack
                                   space={2}
                                   alignItems="center"
                                   maxW={'40%'}
                              >
                                   <Text
                                        fontWeight="bold"
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}
                                        textTransform={'capitalize'}
                                   >
                                        {firstName} {firstLastName}
                                   </Text>
                                   {user?.picture ? (
                                        <Image
                                             source={{ uri: user.picture }}
                                             alt="Profile Picture"
                                             size="100px"
                                             borderRadius="full"
                                             borderColor="gray.300"
                                             borderWidth={2}
                                        />
                                   ) : (
                                        <MaleAvatar width={100} height={100} />
                                   )}
                                   <Box
                                        mt={2}
                                        backgroundColor={
                                             league?.league?.color ||
                                             theme.colors.primary
                                        }
                                        p={1}
                                        borderRadius="sm"
                                        width={{
                                             base: '70%',
                                             sm: '80%',
                                             md: '100%',
                                        }}
                                   >
                                        {leagueIsLoading && (
                                             <Spinner color="white" />
                                        )}
                                        {league && (
                                             <Text
                                                  fontSize={{
                                                       base: 'sm',
                                                       sm: 'md',
                                                       md: 'xl',
                                                       lg: 'xl',
                                                  }}
                                                  fontWeight="bold"
                                                  color="white"
                                                  textAlign={'center'}
                                             >
                                                  {league?.league?.name}
                                             </Text>
                                        )}
                                   </Box>
                              </VStack>

                              <VStack flex={1}>
                                   <Box
                                        flexGrow={1}
                                        justifyContent="center"
                                        alignItems="center"
                                   >
                                        <VStack alignItems="center">
                                             <Text
                                                  fontWeight="bold"
                                                  color={theme.colors.primary}
                                                  fontSize={{
                                                       base: 'xl',
                                                       sm: 'xl',
                                                       md: '4xl',
                                                       lg: '2xl',
                                                  }}
                                             >
                                                  Haz acumulado
                                             </Text>

                                             {isLoading && (
                                                  <Spinner color="primary" />
                                             )}

                                             <HStack
                                                  space={2}
                                                  alignItems="center"
                                             >
                                                  <Text
                                                       fontWeight="bold"
                                                       fontSize={{
                                                            base: 'xl',
                                                            sm: 'xl',
                                                            md: '3xl',
                                                            lg: '2xl',
                                                       }}
                                                  >
                                                       {
                                                            data?.recognitionsReceivedCount
                                                       }
                                                  </Text>
                                                  <Icon
                                                       as={AntDesign}
                                                       name="star"
                                                       size={8}
                                                       color="primary"
                                                  />
                                             </HStack>

                                             <Text
                                                  fontWeight="bold"
                                                  fontSize={{
                                                       base: 'xl',
                                                       sm: 'xl',
                                                       md: '3xl',
                                                       lg: '2xl',
                                                  }}
                                             >
                                                  reconocimientos
                                             </Text>
                                        </VStack>
                                   </Box>

                                   <Box mt="auto">
                                        <HStack
                                             justifyContent={'flex-end'}
                                             alignItems={'center'}
                                        >
                                             <Text
                                                  fontWeight="semibold"
                                                  fontSize={{
                                                       base: 'sm',
                                                       sm: 'sm',
                                                       md: 'lg',
                                                       lg: 'lg',
                                                  }}
                                             >
                                                  Ver mis reconocimientos
                                             </Text>
                                             <Icon
                                                  as={Entypo}
                                                  name="chevron-thin-right"
                                                  size={4}
                                                  color="darkGray"
                                             />
                                        </HStack>
                                   </Box>
                              </VStack>
                         </HStack>
                    </Box>
               )}
          </Pressable>
     );
};
