import { useNavigation, type NavigationProp } from '@react-navigation/native';
import {
     Box,
     HStack,
     Text,
     VStack,
     View,
     useBreakpointValue
} from 'native-base';
import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import AlliancesSVG from '../../../assets/alliances.svg';
import ChallengesSVG from '../../../assets/challenge.svg';
import EventsSVG from '../../../assets/comming-events.svg';
import CommunitiesSVG from '../../../assets/communities.svg';
import RecognitionSVG from '../../../assets/reconoce.svg';
import RedeemablesSVG from '../../../assets/redeem.svg';
import { RecognitionCard } from '../../recognitions/components/RecognitionCard';
import { useAppSelector, type RootState } from '../../redux/store/store';
import { type RootStackParamList } from '../../routing/navigation-types';
import Layout from '../../shared/layout/Layout';
import { theme } from '../../theme';
import HomeBTN from '../components/HomeBTN';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Home(): JSX.Element {

     const iconResponsive = useBreakpointValue({
          base: 35,
          sm: 45,
          md: 70,
          lg: 80,
     });

     const { user } = useAppSelector((state: RootState) => state.user);

     const navigation =
          useNavigation<
               NavigationProp<RootStackParamList, 'SendRecognition'>
          >();

     const onPressBtnStarMe: () => void = () => {
          navigation.navigate('Recognitions');
     };

     const onPressBtnPremios: () => void = () => {
          navigation.navigate('Redeemables');
     };

     const onPressAlliances: () => void = () => {
          navigation.navigate('Alliances');
     };

     const onPressEvents: () => void = () => {
          navigation.navigate('Calendar');
     };

     const onPressCommunities: () => void = () => {
          navigation.navigate('MyCommunities');
     };

     const onPressChallenges: () => void = () => {
          navigation.navigate('Challenges');
     };

     const onPressRecognitions = () => {
          navigation.navigate('MyRecognitions');
     };

     return (
          <Layout backgroundColor={theme.colors.background}>
               <View height={screenHeight}>
                    <Box marginBottom={[6, 8, 10, 10]}>
                         <RecognitionCard
                              name={user?.name}
                              lastName={user?.lastname}
                         />
                    </Box >

                    <Pressable onPress={onPressRecognitions}>
                         <Box
                              mt={6}
                              alignSelf={"center"}
                              alignItems={"center"}
                              w={screenWidth * 0.75}
                              borderRadius={"full"}
                              padding={[2, 4, 4, 8]}
                              backgroundColor={theme.colors.primary}
                         >
                              <Text
                                   color={"white"}
                                   bold
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'md',
                                        md: 'xl',
                                        lg: 'xl',
                                   }}
                              >
                                   Ver mis reconocimientos
                              </Text>
                         </Box>
                    </Pressable>


                    <View mt={[4, 10, 15]}>
                         <VStack space={4} h={'100%'}>
                              <HStack
                                   w={'100%'}
                                   justifyContent={'space-evenly'}
                              >
                                   <HomeBTN
                                        isPrimary={true}
                                        color={theme.colors.white}
                                        icon={
                                             <RecognitionSVG
                                                  width={iconResponsive}
                                                  height={iconResponsive}
                                             />
                                        }
                                        onPress={onPressBtnStarMe}
                                        title="Reconoce aquí"
                                        titleColor={theme.colors.black}
                                        width={"45%"}
                                        fontSize={{
                                             base: 'md',
                                             sm: 'md',
                                             md: '2xl',
                                             lg: 'xl',
                                        }}
                                   />

                                   <HomeBTN
                                        isPrimary={true}
                                        color={theme.colors.white}
                                        icon={
                                             <RedeemablesSVG
                                                  width={iconResponsive}
                                                  height={iconResponsive}
                                             />
                                        }
                                        onPress={onPressBtnPremios}
                                        title="Centro de canje"
                                        titleColor={theme.colors.black}
                                        width={"45%"}
                                        fontSize={{
                                             base: 'md',
                                             sm: 'md',
                                             md: '2xl',
                                             lg: 'xl',
                                        }}
                                   />
                              </HStack>

                              <HStack
                                   space={2}
                                   justifyContent={'space-evenly'}
                              >
                                   <HomeBTN
                                        color={theme.colors.btHome}
                                        icon={
                                             <AlliancesSVG
                                                  width={iconResponsive}
                                                  height={iconResponsive}
                                             />
                                        }
                                        onPress={onPressAlliances}
                                        title="Alianzas comerciales"
                                        width={"45%"}
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}
                                   />

                                   <HomeBTN
                                        color={theme.colors.btHome}
                                        icon={
                                             <EventsSVG
                                                  width={iconResponsive}
                                                  height={iconResponsive}
                                             />
                                        }
                                        onPress={onPressEvents}
                                        title="Mi calendario"
                                        width={"45%"}
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}
                                   />
                              </HStack>

                              <HStack
                                   space={2}
                                   justifyContent={'space-evenly'}
                              >
                                   <HomeBTN
                                        color={theme.colors.btHome}
                                        icon={
                                             <CommunitiesSVG
                                                  width={iconResponsive}
                                                  height={iconResponsive}
                                             />
                                        }
                                        onPress={onPressCommunities}
                                        title="Mis comunidades"
                                        width={"45%"}
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}
                                   />

                                   <HomeBTN
                                        color={theme.colors.btHome}
                                        icon={
                                             <ChallengesSVG
                                                  width={iconResponsive}
                                                  height={iconResponsive}
                                             />
                                        }
                                        onPress={onPressChallenges}
                                        title="Retos"
                                        width={"45%"}
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}
                                   />
                              </HStack>

                         </VStack>
                    </View>
               </View>
          </Layout>
     );
}
