import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Center, Image, ScrollView, Text, VStack, useBreakpointValue } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import MaleAvatar from '../../../assets/male-avatar.svg';
import { RootState, useAppSelector } from '../../redux/store/store';
import { RootStackParamList } from '../../routing/navigation-types';
import Layout from '../../shared/layout/Layout';
import { theme } from '../../theme';
import ProfileMenu from '../components/ProfileMenu';

const { width: screenWidth } = Dimensions.get('window');

export default function Profile() {

     const profileImageSizeFactor = useBreakpointValue({
          base: 0.3,
          sm: 0.3,
          md: 0.25,
          lg: 0.2,
     }) || 0.3;

     const boxAndQRSizeFactor = useBreakpointValue({
          base: 0.5,
          sm: 0.9,
          md: 0.7,
     }) || 0.9;

     const profileImageSize = screenWidth * profileImageSizeFactor;
     const boxAndQRSize = screenWidth * boxAndQRSizeFactor;

     const { user } = useAppSelector((state: RootState) => state.user);
     const navigation =
          useNavigation<NativeStackNavigationProp<RootStackParamList>>();
     return (
          <Layout backgroundColor={theme.colors.background} >
               <ScrollView mb={5}>
                    <Box mx={5} my={5} flexDir="row" justifyContent="flex-end">
                         <ProfileMenu />
                    </Box>

                    <VStack space={5} alignItems="center" mx={5}>
                         {user?.picture ? (
                              <Image
                                   source={{ uri: user.picture }}
                                   alt="Profile Picture"
                                   size={profileImageSize}
                                   borderRadius="full"
                                   borderColor="gray.300"
                                   borderWidth={2}
                              />
                         ) : (
                              <MaleAvatar width={profileImageSize} height={profileImageSize} />
                         )}
                         <Center>
                              <Text
                                   fontSize={{
                                        base: 'lg',
                                        sm: 'md',
                                        md: '2xl',
                                        lg: 'xl',
                                   }}
                                   fontWeight="bold"
                                   color="text"
                                   textTransform={'capitalize'}
                              >
                                   {user?.name} {user?.lastname}
                              </Text>
                              <Text
                                   fontSize="lg"
                                   color="text"
                                   mt={2}
                                   textTransform={'capitalize'}
                              >
                                   {user?.role}
                              </Text>
                         </Center>

                         <VStack
                              space={2}
                              w="90%"
                              p={4}
                              borderRadius="md"
                              background={theme.colors.white}
                         >
                              {user?.city && (
                                   <Text
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}>
                                        <Text
                                             fontWeight="bold">Ciudad: </Text>
                                        {user.city}
                                   </Text>
                              )}
                              {user?.department && (
                                   <Text fontSize={{
                                        base: 'sm',
                                        sm: 'md',
                                        md: 'xl',
                                        lg: 'xl',
                                   }}>
                                        <Text
                                             fontWeight="bold">Departamento: </Text>
                                        {user.department}
                                   </Text>
                              )}
                              {user?.phone && (
                                   <Text
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}
                                   >
                                        <Text fontWeight="bold">Teléfono: </Text>
                                        {user.phone}
                                   </Text>
                              )}
                              {user?.workplace && (
                                   <Text
                                        fontSize={{
                                             base: 'sm',
                                             sm: 'md',
                                             md: 'xl',
                                             lg: 'xl',
                                        }}
                                   >
                                        <Text
                                             fontWeight="bold">Lugar de trabajo: </Text>
                                        {user.workplace}
                                   </Text>
                              )}
                         </VStack>

                         <Box>
                              <SvgQRCode
                                   enableLinearGradient
                                   size={boxAndQRSize}
                                   value={JSON.stringify(user)}
                              />
                         </Box>

                         {/* <Button
            w={"85%"}
            height="100px"
            bg="secondary"
            _text={{ color: 'white' }}
            shadow={3}
            _pressed={{ opacity: 0.5 }}
          >
            Historial de eventos
          </Button> */}
                    </VStack>
               </ScrollView>
          </Layout>
     );
}
