import { Feather, AntDesign } from '@expo/vector-icons';
import {
     NavigationProp,
     RouteProp,
     useNavigation,
     useRoute,
} from '@react-navigation/native';
import {
     AlertDialog,
     Box,
     Button,
     Center,
     Divider,
     HStack,
     Heading,
     Icon,
     Pressable,
     ScrollView,
     Text,
     VStack,
     View,
     useDisclose,
} from 'native-base';
import { ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../routing/navigation-types';
import Layout from '../../shared/layout/Layout';
import { theme } from '../../theme';
import useEventScreenLogic from '../../hooks/useEventScreenLogic';
import ConfirmAssistanceBottomSheet from '../components/ConfirmAssistanceBottomSheet';
import React from 'react';

const DetailItem = ({
     label,
     value,
}: {
     label: string;
     value: string | number;
}) => (
     <Box flexDir="row" justifyContent="space-between" mt={1}>
          <Text fontSize={['sm', 'lg', 'md']} fontWeight="bold">
               {label}
          </Text>

          <Text color={theme.colors.darkGray} fontSize={['sm', 'lg', 'md']}>
               {value}
          </Text>
     </Box>
);

export default function EventScreen() {
     const { isOpen, onOpen, onClose } = useDisclose();
     const { params } = useRoute<RouteProp<RootStackParamList, 'Event'>>();
     const {
          event,
          isLoading,
          isError,
          isEnrolling,
          isCancelling,
          isEnrolled,
          showDialog,
          cancelRef,
          handleEnroll,
          handleCancelEnrollment,
          handleButtonPress,
          setShowDialog,
          isLoadingAction,
     } = useEventScreenLogic(params?.id);

     const getEventDateFormatted = () => {
          const date = new Date(event?.dateTime as string);
          const dayNumber = date.toLocaleDateString('es-ES', {
               day: 'numeric',
          });
          const month = date.toLocaleDateString('es-ES', { month: 'long' });
          const year = date.toLocaleDateString('es-ES', { year: 'numeric' });

          return `${dayNumber} de ${month} de ${year}`;
     };

     const navigation =
          useNavigation<NavigationProp<RootStackParamList, 'Event'>>();

     if (isLoading || isEnrolled === null) {
          return (
               <Center flex={1}>
                    <ActivityIndicator
                         size="large"
                         color={theme.colors.primary}
                    />
               </Center>
          );
     }

     const content =
          event?.place && event?.place !== '' ? event?.place : event?.link;

     const handleLinkPress = (url: string | undefined) => {
          if (url && url.startsWith('https://')) {
               Linking.openURL(url);
          }
     };

     return (
          <Layout backgroundColor={theme.colors.background}>
               <View flex={1}>
                    <Box ml={4} mt={5}>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="left" size={24} color="black" />
                         </TouchableOpacity>
                    </Box>
                    <Center bg={`${theme.colors.background}`} h="30%">
                         <Text
                              bold
                              color={theme.colors.black}
                              fontSize={['xl', '2xl', '3xl']}
                              letterSpacing={1}
                         >
                              {event?.title}
                         </Text>
                         {isEnrolled !== null && (
                              <Pressable
                                   display={
                                        event?.status === 'Inactivo'
                                             ? 'none'
                                             : 'flex'
                                   }
                                   onPress={handleButtonPress}
                                   flexDir="row"
                                   alignItems="center"
                                   p={3}
                                   mt={4}
                                   borderRadius="full"
                                   backgroundColor={theme.colors.white}
                              >
                                   <AlertDialog
                                        isOpen={showDialog}
                                        leastDestructiveRef={cancelRef}
                                        onClose={() => setShowDialog(false)}
                                   >
                                        <AlertDialog.Content
                                             style={{
                                                  borderRadius: 20,
                                                  width: '80%',
                                             }}
                                        >
                                             <AlertDialog.Body>
                                                  {isLoadingAction ? (
                                                       <Center>
                                                            <ActivityIndicator
                                                                 size="large"
                                                                 color={
                                                                      theme
                                                                           .colors
                                                                           .primary
                                                                 }
                                                            />
                                                            <Text
                                                                 style={{
                                                                      flexWrap:
                                                                           'wrap',
                                                                 }}
                                                            >
                                                                 Cargando...
                                                            </Text>
                                                       </Center>
                                                  ) : (
                                                       <Box padding={2}>
                                                            <Heading size="md">
                                                                 Confirmar
                                                                 asistencia
                                                            </Heading>
                                                            <Text
                                                                 style={{
                                                                      flexWrap:
                                                                           'wrap',
                                                                 }}
                                                                 mt={2}
                                                            >
                                                                 ¿Estás seguro
                                                                 que quieres{' '}
                                                                 {isEnrolled
                                                                      ? 'cancelar tu asistencia'
                                                                      : 'asistir'}{' '}
                                                                 a este evento?
                                                            </Text>
                                                            <HStack
                                                                 mt={3}
                                                                 space={3}
                                                                 width={'100%'}
                                                                 justifyContent={
                                                                      'flex-end'
                                                                 }
                                                            >
                                                                 <Button
                                                                      ref={
                                                                           cancelRef
                                                                      }
                                                                      onPress={() =>
                                                                           setShowDialog(
                                                                                false
                                                                           )
                                                                      }
                                                                      backgroundColor={
                                                                           theme
                                                                                .colors
                                                                                .white
                                                                      }
                                                                      borderColor={
                                                                           theme
                                                                                .colors
                                                                                .primary
                                                                      }
                                                                      borderWidth={
                                                                           1
                                                                      }
                                                                      mr={3}
                                                                      _text={{
                                                                           color: theme
                                                                                .colors
                                                                                .primary,
                                                                      }}
                                                                      disabled={
                                                                           isLoadingAction
                                                                      }
                                                                      _disabled={{
                                                                           opacity: 0.5,
                                                                      }}
                                                                 >
                                                                      Cancelar
                                                                 </Button>
                                                                 <Button
                                                                      onPress={
                                                                           isEnrolled
                                                                                ? handleCancelEnrollment
                                                                                : handleEnroll
                                                                      }
                                                                      backgroundColor={
                                                                           theme
                                                                                .colors
                                                                                .primary
                                                                      }
                                                                      _text={{
                                                                           color: 'white',
                                                                      }}
                                                                      disabled={
                                                                           isLoadingAction
                                                                      }
                                                                      _disabled={{
                                                                           opacity: 0.5,
                                                                      }}
                                                                 >
                                                                      Confirmar
                                                                 </Button>
                                                            </HStack>
                                                       </Box>
                                                  )}
                                             </AlertDialog.Body>
                                        </AlertDialog.Content>
                                   </AlertDialog>

                                   <Icon
                                        as={Feather}
                                        name="user-plus"
                                        color={theme.colors.primary}
                                        mr={1}
                                   />
                                   <Text color={theme.colors.primary}>
                                        {isEnrolled
                                             ? 'Cancelar asistencia'
                                             : '¡Asistir!'}
                                   </Text>
                              </Pressable>
                         )}
                    </Center>

                    <ScrollView
                         borderTopLeftRadius={20}
                         borderTopRightRadius={20}
                         mt={-5}
                         bg={theme.colors.white}
                         mb={2}
                    >
                         {/* descripcion */}
                         <Box mx={4} my={4}>
                              <Text bold fontSize={['lg', 'xl', '2xl']} mb={4}>
                                   Descripción
                              </Text>
                              <Box p={4} borderRadius={10}>
                                   <Text fontSize={['sm', 'md', 'lg']}>
                                        {event?.description}
                                   </Text>
                              </Box>
                         </Box>

                         {/* detalles */}
                         <VStack mx={4} space={4}>
                              <Text bold fontSize={['lg', 'xl', '2xl']}>
                                   Detalles
                              </Text>

                              <DetailItem
                                   label="Estado"
                                   value={event?.status as string}
                              />
                              <Divider />

                              <Box
                                   flexDir="row"
                                   justifyContent="space-between"
                                   mt={1}
                              >
                                   <Text
                                        fontSize={['sm', 'lg', 'md']}
                                        fontWeight="bold"
                                   >
                                        {content === event?.link
                                             ? 'Enlace:'
                                             : 'Lugar:'}
                                   </Text>

                                   {content === event?.link ? (
                                        <TouchableOpacity
                                             onPress={() =>
                                                  handleLinkPress(content)
                                             }
                                        >
                                             <Text
                                                  fontSize={['sm', 'lg', 'md']}
                                                  isTruncated
                                             >
                                                  {content}
                                             </Text>
                                        </TouchableOpacity>
                                   ) : (
                                        <Text
                                             fontSize="sm"
                                             isTruncated
                                             maxWidth="80%"
                                             color={theme.colors.darkGray}
                                        >
                                             {content}
                                        </Text>
                                   )}
                              </Box>

                              <Divider />

                              <DetailItem
                                   label="Comunidad"
                                   value={event?.community?.name as string}
                              />
                              <Divider />

                              {/* Fecha */}
                              <DetailItem
                                   label="Fecha"
                                   value={getEventDateFormatted() as string}
                              />
                              <Divider />

                              {/* Hora */}
                              <DetailItem
                                   label="Hora"
                                   value={new Date(
                                        event?.dateTime as string
                                   ).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                   })}
                              />
                              <Divider />

                              {/* Score */}
                              <DetailItem
                                   label="Puntaje"
                                   value={event?.credits as number}
                              />
                              <Divider />

                              {/* Categoria */}
                              <DetailItem
                                   label="Categoría"
                                   value={event?.eventCategory?.name as string}
                              />
                              <Divider />
                         </VStack>
                    </ScrollView>
               </View>

               <ConfirmAssistanceBottomSheet
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
               />
          </Layout>
     );
}
