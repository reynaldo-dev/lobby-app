import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Box, Button, Center, KeyboardAvoidingView, ScrollView, Text, VStack, useToast } from "native-base";
import React, { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { DepartmentSelect } from "../../../../../auth/screens/register/Register";
import { useUpdateProfileMutation } from "../../../../../redux/services/user/user.service";
import { logout } from "../../../../../redux/slices/user/user.thunk";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/store/store";
import { RootStackParamList } from "../../../../../routing/navigation-types";
import CustomToast from "../../../../../shared/components/toast/CustomToast";
import ValidatedInputText from "../../../../../shared/components/validated-inputText/ValidatedInputText";
import Layout from "../../../../../shared/layout/Layout";
import { theme } from "../../../../../theme";

const validationEditProfileSchema = Yup.object().shape({
  name: Yup.string().required("Nombre es requerido"),
  lastname: Yup.string().required("Apellido es requerido"),
  email: Yup.string()
    .email("Correo electrónico invalido")
    .required("Correo electrónico es requerido"),
  phone: Yup.string()
    .required("Teléfono es requerido")
    .length(8, "El teléfono debe contener 8 digitos")
    .matches(/^[0-9]+$/, "Solo se permiten números"),
  city: Yup.string().required("Ciudad es requerida"),
  department: Yup.string().required("Departamento es requerido"),
});

interface EditProfileFormValues {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  department: string;
}


export default function EditProfile() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigation = useNavigation<NavigationProp<RootStackParamList, "EditProfile">>();

  const dispatch = useAppDispatch();

  const initialValues: EditProfileFormValues = {
    name: user!.name,
    lastname: user!.lastname,
    email: user!.email,
    phone: user!.phone as string,
    city: user!.city as string,
    department: user!.department as string,
  };


  const [updateProfile, { data, error }] = useUpdateProfileMutation();

  const handleUpdateProfile = async (values: EditProfileFormValues) => {
    setIsLoading(true);
    await updateProfile({ id: user!.id, ...values });
    if (error) {
      toast.show({
        render: () => (
          <CustomToast
            message="Vuelve a intentarlo, no se pudo actualizar el perfil"
            color={theme.colors.danger}
          />
        ),
        placement: "bottom",
        duration: 2000,
      });
      return;
    }
    setIsLoading(false);

    toast.show({
      render: () => (
        <CustomToast
          message="Perfil actualizado correctamente, tienes que volver a iniciar sesión."
          color={theme.colors.success}
        />
      ),
      placement: "top",
      duration: 6000,
    });
    dispatch(logout());
  };
  return (
    <Layout backgroundColor={theme.colors.white}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Box flexDirection="row" alignItems="center" ml={2} height={50}>
            <Box>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
            </Box>
            <Center flex={1}>
              <Text fontSize={16} color={"muted.500"} fontWeight="bold" marginRight={10}>
                Editar perfil
              </Text>
            </Center>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationEditProfileSchema}
            onSubmit={handleUpdateProfile}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue
            }) => (
              <VStack
                space={4}
                bg={theme.colors.white}
                h="full"
                justifyContent="center"
                alignItems="center"
              >
                <ValidatedInputText
                  bgColor={theme.colors.muted["200"]}
                  isInvalid={errors.name ? true : false}
                  formControlLabel="Nombre"
                  placeholder="Nombre"
                  placeholderTextColor={theme.colors.muted["400"]}
                  onChangeText={handleChange("name")}
                  value={values.name}
                  errors={errors.name}
                />

                <ValidatedInputText
                  bgColor={theme.colors.muted["200"]}
                  isInvalid={errors.lastname ? true : false}
                  formControlLabel="Apellido"
                  placeholder="Apellido"
                  placeholderTextColor={theme.colors.muted["400"]}
                  onChangeText={handleChange("lastname")}
                  value={values.lastname}
                  errors={errors.lastname}
                />

                <ValidatedInputText
                  bgColor={theme.colors.muted["200"]}
                  isInvalid={errors.email ? true : false}
                  formControlLabel="Correo eléctronico"
                  placeholder="Email"
                  placeholderTextColor={theme.colors.muted["400"]}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  errors={errors.email}
                />

                <ValidatedInputText
                  bgColor={theme.colors.muted["200"]}
                  isInvalid={errors.phone ? true : false}
                  formControlLabel="Teléfono"
                  placeholder="1234-5678"
                  placeholderTextColor={theme.colors.muted["400"]}
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  errors={errors.phone}
                />

                <DepartmentSelect
                  value={values.department}
                  onChange={(itemValue: any) => setFieldValue("department", itemValue)}
                  borderColor="muted.200"
                />

                <ValidatedInputText
                  bgColor={theme.colors.muted["200"]}
                  isInvalid={errors.city ? true : false}
                  formControlLabel="Ciudad"
                  placeholder="Ciudad"
                  placeholderTextColor={theme.colors.muted["400"]}
                  onChangeText={handleChange("city")}
                  value={values.city}
                  errors={errors.city}
                />

                <Button
                  borderRadius={10}
                  w="80%"
                  backgroundColor={theme.colors.primary}
                  onPress={() => handleSubmit()}
                  colorScheme="primary"
                  isLoading={isLoading}
                  spinnerPlacement="end"
                  _spinner={{ color: theme.colors.white }}
                >
                  <Text color={theme.colors.white} fontWeight="semibold">
                    Actualizar
                  </Text>
                </Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
