import { type NavigationProp, useNavigation } from '@react-navigation/native';
import {
     Box,
     Center,
     HStack,
     VStack,
     View,
     useBreakpointValue,
} from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import AlliancesSVG from '../../../assets/alliances.svg';
import ChallengesSVG from '../../../assets/challenge.svg';
import EventsSVG from '../../../assets/comming-events.svg';
import CommunitiesSVG from '../../../assets/communities.svg';
import RecognitionSVG from '../../../assets/reconoce.svg';
import RedeemablesSVG from '../../../assets/redeem.svg';
import { RecognitionCard } from '../../recognitions/components/RecognitionCard';
import { type RootState, useAppSelector } from '../../redux/store/store';
import { type RootStackParamList } from '../../routing/navigation-types';
import Layout from '../../shared/layout/Layout';
import { theme } from '../../theme';
import HomeBTN from '../components/HomeBTN';

const screenHeight = Dimensions.get('window').height;

export default function Home(): JSX.Element {
     const iconResponsive = useBreakpointValue({
          base: 30,
          sm: 40,
          md: 50,
          lg: 60,
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

     return (
          <Layout backgroundColor={theme.colors.background}>
               <View height={screenHeight}>
                    <Box flex={1}>
                         <RecognitionCard
                              name={user?.name}
                              lastName={user?.lastname}
                              score={2}
                         />
                    </Box>

                    <View flex={2}>
                         <VStack space={[4, 4]} h={'100%'}>
                              <View>
                                   <HStack
                                        w={'100%'}
                                        justifyContent={'space-evenly'}
                                        space={3}
                                   >
                                        <HomeBTN
                                             color={theme.colors.white}
                                             icon={
                                                  <RecognitionSVG
                                                       width={iconResponsive}
                                                       height={iconResponsive}
                                                  />
                                             }
                                             onPress={onPressBtnStarMe}
                                             title="Reconoce aquí"
                                             height={[150, 150, 300]}
                                             titleColor={theme.colors.black}
                                             width={{
                                                  base: '40%',
                                                  sm: '40%',
                                                  md: '30%',
                                                  lg: '40%',
                                             }}
                                             fontSize={{
                                                  base: 'md',
                                                  sm: 'md',
                                                  md: 'xl',
                                                  lg: 'xl',
                                             }}
                                        />

                                        <HomeBTN
                                             color={theme.colors.white}
                                             icon={
                                                  <RedeemablesSVG
                                                       width={iconResponsive}
                                                       height={iconResponsive}
                                                  />
                                             }
                                             onPress={onPressBtnPremios}
                                             title="Canjea creditos"
                                             height={[150, 150, 300]}
                                             titleColor={theme.colors.black}
                                             width={{
                                                  base: '40%',
                                                  sm: '40%',
                                                  md: '30%',
                                                  lg: '40%',
                                             }}
                                             fontSize={{
                                                  base: 'md',
                                                  sm: 'md',
                                                  md: 'xl',
                                                  lg: 'xl',
                                             }}
                                        />
                                   </HStack>
                              </View>

                              <View mx={2}>
                                   <HStack
                                        w={'100%'}
                                        justifyContent={'space-evenly'}
                                        space={4}
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
                                             width={{
                                                  base: '25%',
                                                  sm: '25%',
                                                  md: '23%',
                                                  lg: '30%',
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
                                             width={{
                                                  base: '25%',
                                                  sm: '25%',
                                                  md: '23%',
                                                  lg: '30%',
                                             }}
                                        />

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
                                             width={{
                                                  base: '25%',
                                                  sm: '25%',
                                                  md: '23%',
                                                  lg: '30%',
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
                                             width={{
                                                  base: '25%',
                                                  sm: '25%',
                                                  md: '23%',
                                                  lg: '30%',
                                             }}
                                        />
                                   </HStack>
                              </View>
                         </VStack>
                    </View>
               </View>
          </Layout>
     );
}
