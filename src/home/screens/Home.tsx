import { useNavigation, type NavigationProp } from '@react-navigation/native';
import {
     Box,
     HStack,
     ScrollView,
     Text,
     VStack,
     View,
     useBreakpointValue,
} from 'native-base';
import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import AlliancesSVG from '../../../assets/alliances.svg';
import ChallengesSVG from '../../../assets/challenge.svg';
import EventsSVG from '../../../assets/comming-events.svg';
import CommunitiesSVG from '../../../assets/communities.svg';
import RecognitionSVG from '../../../assets/reconoce.svg';
import RedeemablesSVG from '../../../assets/redeem.svg';
import RigthArrow from '../../../assets/right-arrow.svg';
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
          lg: 120,
     });

     const arrowResponsive = useBreakpointValue({
          base: 15,
          sm: 15,
          md: 20,
          lg: 25,
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
          navigation.navigate('UpcomingEvents');
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
               <ScrollView>
                    <Box marginBottom={[6, 8, 10, 10]}>
                         <RecognitionCard
                              name={user?.name}
                              lastName={user?.lastname}
                         />
                    </Box>

                    <Pressable onPress={onPressRecognitions}>
                         <Box
                              mt={6}
                              alignSelf={'center'}
                              alignItems={'center'}
                              w={screenWidth * 0.80}
                              borderRadius={'full'}
                              padding={[2, 4, 4, 4]}
                              backgroundColor={theme.colors.primary}
                         >
                              <HStack space={2} alignItems={'center'}>
                                   <Text
                                        color={theme.colors.white}
                                        bold
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: '3xl',
                                        }}
                                   >
                                        Ver mis reconocimientos
                                   </Text>
                                   <RigthArrow
                                        width={arrowResponsive}
                                        height={arrowResponsive}
                                   />
                              </HStack>
                         </Box>
                    </Pressable>

                    <View mt={[4, 10, 8]}>
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
                                        width={'45%'}
                                        fontSize={{
                                             base: 'md',
                                             sm: 'md',
                                             md: '2xl',
                                             lg: '3xl',
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
                                        width={'45%'}
                                        fontSize={{
                                             base: 'md',
                                             sm: 'md',
                                             md: '2xl',
                                             lg: '3xl',
                                        }}
                                   />
                              </HStack>

                              <HStack space={2} justifyContent={'space-evenly'}>
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
                                        width={'45%'}
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: '2xl',
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
                                        title="Eventos"
                                        width={'45%'}
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: '2xl',
                                        }}
                                   />
                              </HStack>

                              <HStack space={2} justifyContent={'space-evenly'}>
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
                                        width={'45%'}
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: '2xl',
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
                                        width={'45%'}
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: '2xl',
                                        }}
                                   />
                              </HStack>
                         </VStack>
                    </View>
               </ScrollView>
          </Layout>
     );
}
