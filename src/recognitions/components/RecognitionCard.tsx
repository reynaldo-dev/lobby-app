import {
     Box,
     HStack,
     Image,
     Spinner,
     Text,
     VStack,
     View,
     useBreakpointValue,
} from 'native-base';
import React from 'react';
import CreditsIcon from '../../../assets/CreditsWhite.svg';
import BackgroundCard from '../../../assets/card-background.svg';
import MaleAvatar from '../../../assets/male-avatar.svg';
import RecognitionSVG from '../../../assets/reconoce.svg';
import {
     useGetCurrentCreditsQuery,
     useGetCurrentLeagueQuery,
     useGetCurrentRecognitionsCountQuery,
} from '../../redux/services/user.service';
import { RootState, useAppSelector } from '../../redux/store/store';

type RecognitionCardProps = {
     name: string | undefined;
     lastName?: string | undefined;
     imageSource?: any;
};

export const RecognitionCard = ({
     name,
     lastName,
     imageSource = MaleAvatar,
}: RecognitionCardProps) => {
     const iconResponsive = useBreakpointValue({
          base: 25,
          sm: 25,
          md: 40,
          lg: 60,
     });

     const ImageResponsive = useBreakpointValue({
          base: 120,
          sm: 125,
          md: 150,
          lg: 60,
     });

     const { user } = useAppSelector((state: RootState) => state.user);
     const { data: CurrentCredits, isLoading: CreditsLoading } =
          useGetCurrentCreditsQuery(user?.id as string);
     const { data, isLoading } = useGetCurrentRecognitionsCountQuery(
          user?.id as string
     );
     const { data: league, isLoading: leagueIsLoading } =
          useGetCurrentLeagueQuery(user?.id as string);

     const firstName = name?.split(' ')[0];
     const firstLastName = lastName?.split(' ')[0];

     return (
          <>
               <Box
                    w={'95%'}
                    borderRadius="full"
                    alignSelf="center"
                    padding={[2, 4, 6, 8]}
                    position={'relative'}
               >
                    <View
                         position="absolute"
                         top={0}
                         left={0}
                         right={0}
                         bottom={0}
                         zIndex={-1}
                    >
                         <BackgroundCard width="100%" height="100%" />
                    </View>

                    <Box
                         bg="primary"
                         alignSelf={'center'}
                         w={{ base: '50%', sm: '50%', md: '40%', lg: '40%' }}
                         borderRadius="full"
                         padding={2}
                         flexDirection="row"
                         justifyContent="space-evenly"
                         alignItems="center"
                    >
                         <CreditsIcon
                              width={iconResponsive}
                              height={iconResponsive}
                         />
                         {CreditsLoading && <Spinner color="white" />}
                         <Text
                              fontWeight="bold"
                              color="white"
                              fontSize={{
                                   base: 'md',
                                   sm: 'md',
                                   md: '2xl',
                                   lg: 'xl',
                              }}
                              textAlign={'center'}
                         >
                              {CurrentCredits?.credits} Créditos
                         </Text>
                    </Box>

                    <HStack
                         alignItems="center"
                         justifyContent="space-evenly"
                         marginBottom={[12, 14, 12, 12]}
                         space={4}
                    >
                         {user?.picture ? (
                              <Image
                                   source={{ uri: user.picture }}
                                   alt="Profile Picture"
                                   size={iconResponsive}
                                   borderRadius="full"
                                   borderWidth={2}
                              />
                         ) : (
                              <MaleAvatar
                                   width={ImageResponsive}
                                   height={ImageResponsive}
                              />
                         )}
                         <VStack maxW={'60%'}>
                              <Text
                                   fontWeight="bold"
                                   fontSize={{
                                        base: '2xl',
                                        sm: 'md',
                                        md: '4xl',
                                        lg: 'xl',
                                   }}
                                   color="white"
                                   textTransform={'capitalize'}
                              >
                                   {firstName} {firstLastName}
                              </Text>
                              {leagueIsLoading && <Spinner color="white" />}
                              {league && (
                                   <Text
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: '2xl',
                                             lg: 'xl',
                                        }}
                                        fontWeight="bold"
                                        color="white"
                                        textAlign={'center'}
                                   >
                                        Nivel de reconocimiento:{' '}
                                        {league?.league?.name}
                                   </Text>
                              )}
                         </VStack>
                    </HStack>
               </Box>
               <Box
                    position="absolute"
                    bottom="-15%"
                    left="10%"
                    right="10%"
                    backgroundColor="white"
                    borderRadius="full"
                    padding={4}
                    zIndex={1}
               >
                    <HStack justifyContent="space-evenly">
                         <Text
                              bold
                              color={'primary'}
                              fontSize={{
                                   base: 'md',
                                   sm: 'md',
                                   md: '2xl',
                                   lg: 'xl',
                              }}
                         >
                              Total de{'\n'}Reconocimientos
                         </Text>
                         {isLoading && <Spinner color="primary" />}
                         <HStack space={2} alignItems="center">
                              <RecognitionSVG
                                   width={iconResponsive}
                                   height={iconResponsive}
                              />
                              <Text
                                   textAlign="center"
                                   fontWeight="bold"
                                   color="primary"
                                   fontSize={{
                                        base: 'md',
                                        sm: 'md',
                                        md: '2xl',
                                        lg: 'xl',
                                   }}
                              >
                                   {data?.recognitionsReceivedCount}
                              </Text>
                         </HStack>
                    </HStack>
               </Box>
          </>
     );
};
