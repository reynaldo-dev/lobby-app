import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Box, Button, Center, Text, VStack, View, useToast } from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { useUpdatePasswordMutation } from '../../../redux/services/user.service';
import {
     RootState,
     useAppDispatch,
     useAppSelector,
} from '../../../redux/store/store';
import { logout } from '../../../redux/thunks/user.thunk';
import { RootStackParamList } from '../../../routing/navigation-types';
import CustomToast from '../../../shared/components/toast/CustomToast';
import ValidatedInputText from '../../../shared/components/validated-inputText/ValidatedInputText';
import Layout from '../../../shared/layout/Layout';
import { theme } from '../../../theme';

const updatePasswordSchema = Yup.object().shape({
     currentPassword: Yup.string()
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .required('La contraseña es requerida'),
     newPassword: Yup.string()
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .required('La contraseña es requerida'),
});
interface PasswordUpdateFormValues {
     currentPassword: string;
     newPassword: string;
}
export default function PasswordUpdate() {
     const values: PasswordUpdateFormValues = {
          currentPassword: '',
          newPassword: '',
     };
     const { user } = useAppSelector((state: RootState) => state.user);
     const dispatch = useAppDispatch();
     const [isLoading, setIsLoading] = useState<boolean>(false);

     const [updatePassword, { data, error, status }] =
          useUpdatePasswordMutation();

     const toast = useToast();

     const navigation =
          useNavigation<NavigationProp<RootStackParamList, 'PasswordUpdate'>>();

     const handleUpdatePassword = (values: PasswordUpdateFormValues) => {
          if (updatePasswordSchema.isValidSync(values)) {
               setIsLoading(true);
               updatePassword({
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                    id: user?.id as string,
               })
                    .unwrap()
                    .catch((error) => {
                         toast.show({
                              render: () => (
                                   <CustomToast
                                        message={
                                             error?.data?.message ||
                                             'Error al actualizar contraseña, vuelve a intentarlo mas tarde'
                                        }
                                        color={theme.colors.danger}
                                   />
                              ),
                              placement: 'top',
                              duration: 4000,
                         });
                    })
                    .then((result) => {
                         if (result) {
                              toast.show({
                                   render: () => (
                                        <CustomToast
                                             message="Contraseña actualizada correctamente, tienes que volver a iniciar sesión"
                                             color={theme.colors.success}
                                        />
                                   ),
                                   placement: 'top',
                                   duration: 8000,
                              });
                              dispatch(logout());
                         }
                    })

                    .finally(() => {
                         setIsLoading(false);
                    });
          }
     };

     return (
          <Layout backgroundColor={theme.colors.white}>
               <Box flexDirection="row" alignItems="center" ml={2} height={50}>
                    <Box>
                         <TouchableOpacity onPress={() => navigation.goBack()}>
                              <AntDesign name="left" size={24} color="black" />
                         </TouchableOpacity>
                    </Box>
                    <Center flex={1}>
                         <Text fontSize={16} fontWeight="bold" marginRight={10}>
                              Cambiar contraseña
                         </Text>
                    </Center>
               </Box>
               <View backgroundColor={theme.colors.white} flex={1}>
                    <Formik
                         validationSchema={updatePasswordSchema}
                         initialValues={values}
                         onSubmit={handleUpdatePassword}
                    >
                         {({
                              handleChange,
                              handleBlur,
                              touched,
                              handleSubmit,
                              values,
                              errors,
                         }) => {
                              return (
                                   <VStack
                                        space={4}
                                        flex={1}
                                        justifyContent="center"
                                        alignItems="center"
                                   >
                                        <ValidatedInputText
                                             bgColor={theme.colors.muted['200']}
                                             isInvalid={
                                                  errors.currentPassword
                                                       ? true
                                                       : false
                                             }
                                             formControlLabel="Contraseña actual"
                                             placeholder="Contraseña actual"
                                             placeholderTextColor={
                                                  theme.colors.muted['400']
                                             }
                                             onChangeText={handleChange(
                                                  'currentPassword'
                                             )}
                                             value={values.currentPassword}
                                             errors={errors.currentPassword}
                                             type="password"
                                        />

                                        <ValidatedInputText
                                             bgColor={theme.colors.tertiary}
                                             isInvalid={
                                                  errors.newPassword
                                                       ? true
                                                       : false
                                             }
                                             formControlLabel="Contraseña nueva"
                                             placeholder="Contraseña nueva"
                                             placeholderTextColor={
                                                  theme.colors.tertiary
                                             }
                                             onChangeText={handleChange(
                                                  'newPassword'
                                             )}
                                             value={values.newPassword}
                                             errors={errors.newPassword}
                                             type="password"
                                        />

                                        <Button
                                             onPress={() =>
                                                  handleUpdatePassword(values)
                                             }
                                             borderRadius={'full'}
                                             w={['90%', '80%']}
                                             backgroundColor={
                                                  theme.colors.primary
                                             }
                                             isLoading={isLoading}
                                             spinnerPlacement="end"
                                             _spinner={{
                                                  color: theme.colors.white,
                                             }}
                                        >
                                             <Text
                                                  color={theme.colors.white}
                                                  bold
                                             >
                                                  Actualizar contraseña
                                             </Text>
                                        </Button>
                                   </VStack>
                              );
                         }}
                    </Formik>
               </View>
          </Layout>
     );
}
