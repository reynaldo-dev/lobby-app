import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Button, Text, VStack, View, useToast } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { useUpdateProfileMutation } from "../../../../../redux/services/user/interfaces/user.service";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/store/store";
import { RootStackParamList } from "../../../../../routing/navigation-types";
import CustomToast from "../../../../../shared/components/toast/CustomToast";
import ValidatedInputText from "../../../../../shared/components/validated-inputText/ValidatedInputText";
import { theme } from "../../../../../theme";
import Layout from "../../../../../shared/layout/Layout";
import { logout } from "../../../../../redux/slices/user/user.thunk";

const validationEditProfileSchema = Yup.object().shape({
  name: Yup.string().required("Nombre es requerido"),
  lastname: Yup.string().required("Apellido es requerido"),
  email: Yup.string()
    .email("Correo electrónico invalido")
    .required("Correo electrónico es requerido"),
});

interface EditProfileFormValues {
  name: string;
  lastname: string;
  email: string;
}

export default function EditProfile() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const dispatch = useAppDispatch();

  const initialValues: EditProfileFormValues = {
    name: user!.name,
    lastname: user!.lastname,
    email: user!.email,
  };

  const [updateProfile, { data, error, status }] = useUpdateProfileMutation();

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
          message="Perfil actualizado correctamente, tienes que hacer login nuevamente."
          color={theme.colors.success}
        />
      ),
      placement: "bottom",
      duration: 5000,
      onCloseComplete: () => {
        dispatch(logout());
      },
    });
  };
  return (
    <Layout backgroundColor={theme.colors.white}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationEditProfileSchema}
        onSubmit={handleUpdateProfile}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
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
              formControlLabel="Email"
              placeholder="Email"
              placeholderTextColor={theme.colors.muted["400"]}
              onChangeText={handleChange("email")}
              value={values.email}
              errors={errors.email}
            />

            <Button
              borderRadius={10}
              w="80%"
              backgroundColor={theme.colors.primary}
              onPress={() => handleUpdateProfile(values)}
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
    </Layout>
  );
}
