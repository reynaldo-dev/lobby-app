import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import {
     Box,
     Button,
     Center,
     HStack,
     Heading,
     Icon,
     Modal,
     Text,
     View
} from 'native-base';
import React, { useState } from 'react';
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

     const [showDialog, setShowDialog] = useState(false);

     const goToWorkplace = () => {
          Linking.openURL(community?.link as string);
     };

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

               <View h="full" bg={community?.color} position={'relative'}>
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
                    <Button
                         position={'absolute'}
                         bottom={0}
                         onPress={() => setShowDialog(true)}
                         right={0}
                         leftIcon={
                              <Icon
                                   as={MaterialCommunityIcons}
                                   name="facebook-workplace"
                                   size="sm"
                                   color={
                                        isDarkColor(community?.color)
                                             ? 'white'
                                             : 'black'
                                   }
                              />
                         }
                         _text={{
                              color: isDarkColor(community?.color)
                                   ? 'white'
                                   : 'black',
                              fontSize: 'xs',
                         }}
                    >
                         Ir a workplace
                    </Button>
               </View>

               <Modal isOpen={showDialog} onClose={() => setShowDialog(false)}>
                    <Modal.Content
                         maxWidth="400px"
                         backgroundColor={theme.colors.white}
                    >
                         <Modal.CloseButton color={theme.colors.primary} />
                         <Modal.Body>
                              <View>
                                   <Heading
                                        size="sm"
                                        color={theme.colors.text[900]}
                                        textAlign={'center'}
                                   >
                                        Estás por visitar la siguiente URL
                                   </Heading>

                                   <Center mt={5} width={'100%'}>
                                        <Text
                                             color={theme.colors.coolGray[900]}
                                             textAlign={'center'}
                                        >
                                             {community?.link}
                                        </Text>
                                   </Center>

                                   <HStack
                                        space={5}
                                        justifyContent={'flex-end'}
                                   >
                                        <Button
                                             mt={5}
                                             p={3}
                                             justifyContent="center"
                                             borderRadius={10}
                                             backgroundColor={
                                                  theme.colors.white
                                             }
                                             onPress={() => {
                                                  setShowDialog(false);
                                             }}
                                             borderWidth={1}
                                             borderColor={theme.colors.primary}
                                        >
                                             <Text
                                                  color={theme.colors.primary}
                                                  bold
                                                  textAlign={'center'}
                                             >
                                                  Cancelar
                                             </Text>
                                        </Button>
                                        <Button
                                             mt={5}
                                             p={3}
                                             justifyContent="center"
                                             borderRadius={10}
                                             backgroundColor={
                                                  theme.colors.primary
                                             }
                                             onPress={() => {
                                                  goToWorkplace();
                                             }}
                                        >
                                             <Text
                                                  color={theme.colors.white}
                                                  bold
                                                  textAlign={'center'}
                                             >
                                                  Confirmar
                                             </Text>
                                        </Button>
                                   </HStack>
                              </View>
                         </Modal.Body>
                    </Modal.Content>
               </Modal>
          </View>
     );
}
