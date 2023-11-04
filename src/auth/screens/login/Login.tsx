import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Box, Button, Link, Text, View, useToast } from 'native-base';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import BackgroundImage from '../../../../assets/backgroundLogin.svg';
import { useAppDispatch } from '../../../redux/store/store';
import { login } from '../../../redux/thunks/user.thunk';
import CustomToast from '../../../shared/components/toast/CustomToast';
import ValidatedInputText from '../../../shared/components/validated-inputText/ValidatedInputText';
import Layout from '../../../shared/layout/Layout';
import { theme } from '../../../theme';

const validationLoginSchema = Yup.object().shape({
     email: Yup.string()
          .email('Correo electrónico invalido')
          .required('Correo electrónico es requerido'),
});

interface LoginFormValues {
     email: string;
     password: string;
}

export default function Login() {
     const { colors } = theme;
     const dispatch = useAppDispatch();
     const initialValues: LoginFormValues = { email: '', password: '' };
     const navigation = useNavigation();
     const toast = useToast();
     const [toastVisible, setToastVisible] = useState(false);
     const [loading, setLoading] = useState(false);
     const insets = useSafeAreaInsets();

     const onLogin = (values: LoginFormValues) => {
          setLoading(true);
          dispatch(login(values))
               .unwrap()
               .catch((error) => {
                    if (!toastVisible) {
                         setToastVisible(true);
                         toast.show({
                              render: () => (
                                   <CustomToast
                                        message={error.message}
                                        color={colors.danger}
                                   />
                              ),
                              placement: 'top',
                              duration: 2000,
                              onCloseComplete: () => {
                                   setToastVisible(false);
                              },
                         });
                    }
               })
               .finally(() => {
                    setLoading(false);
               });
     };

     return (
          <Layout backgroundColor={colors.white}>
               <View
                    style={{
                         position: 'absolute',
                         top: insets.top,
                         left: 0,
                         width: Dimensions.get('window').width,
                         height: Dimensions.get('window').height,
                         zIndex: 1,
                    }}
               >
                    <BackgroundImage />
               </View>
               <View
                    flex={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={styles.contentContainer}
               >
                    <View style={styles.whiteBox}>
                         <Text
                              color={theme.colors.primary}
                              fontSize={'4xl'}
                              bold
                              my={5}
                         >
                              ¡Bienvenido!
                         </Text>

                         <Formik
                              initialValues={initialValues}
                              onSubmit={onLogin}
                              validationSchema={validationLoginSchema}
                         >
                              {({
                                   handleChange,
                                   handleBlur,
                                   handleSubmit,
                                   values,
                                   errors,
                                   touched,
                              }) => (
                                   <View w={'95%'}>
                                        <ValidatedInputText
                                             bgColor={colors.tertiary}
                                             isInvalid={!!errors.email}
                                             placeholder="johndoe@example.com"
                                             placeholderTextColor={
                                                  theme.colors.tertiary
                                             }
                                             onChangeText={handleChange(
                                                  'email'
                                             )}
                                             value={values.email}
                                             errors={errors.email}
                                             keyboardType="email-address"
                                        />

                                        <ValidatedInputText
                                             bgColor={colors.tertiary}
                                             isInvalid={!!errors.password}
                                             placeholder="Contraseña"
                                             placeholderTextColor={
                                                  theme.colors.tertiary
                                             }
                                             onChangeText={handleChange(
                                                  'password'
                                             )}
                                             type="password"
                                             value={values.password}
                                             errors={errors.password}
                                        />

                                        <Box
                                             alignItems="center"
                                             w="full"
                                             mt={4}
                                        >
                                             <Button
                                                  backgroundColor={
                                                       colors.primary
                                                  }
                                                  borderRadius={'full'}
                                                  disabled={loading}
                                                  w={['90%', '80%']}
                                                  onPress={
                                                       handleSubmit as never
                                                  }
                                                  isLoading={loading}
                                                  _loading={{
                                                       color: 'white',
                                                       _spinner: {
                                                            color: 'white',
                                                       },
                                                  }}
                                             >
                                                  <Text
                                                       style={
                                                            styles.loginButtonText
                                                       }
                                                  >
                                                       Iniciar Sesión
                                                  </Text>
                                             </Button>
                                        </Box>
                                   </View>
                              )}
                         </Formik>
                         <Link
                              _text={{
                                   color: colors.dark,
                                   textDecoration: 'none',
                              }}
                              mt={5}
                              onPress={() => {
                                   navigation.navigate('Register' as never);
                              }}
                         >
                              ¿No tienes una cuenta?{' '}
                              <Text color={theme.colors.secondary}>
                                   Regístrate
                              </Text>
                         </Link>
                    </View>
               </View>
          </Layout>
     );
}

const styles = StyleSheet.create({
     backgroundImage: {
          flex: 1,
          resizeMode: 'cover',
     },
     input: {
          fontSize: 16,
          color: theme.colors.primary,
          backgroundColor: '#fff',
     },
     loginButtonText: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
     },
     contentContainer: {
          flex: 1,
          zIndex: 10,
     },
     whiteBox: {
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          alignItems: 'center',
          width: '90%',
          marginBottom: 20,
     },
});
