import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  Button,
  Center,
  Link,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { useAppDispatch } from "../../../redux/store/store";
import { RootStackParamList } from "../../../routing/navigation-types";
import ValidatedInputText from "../../../shared/components/validated-inputText/ValidatedInputText";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import { register } from "../../../redux/slices/user/user.thunk";
import CustomToast from "../../../shared/components/toast/CustomToast";
import TextField from "../../../shared/components/TextField/TextField";

interface IRegisterFormValues {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre es requerido"),
  lastname: Yup.string().required("Apellido es requerido"),
  email: Yup.string()
    .email("Correo electrónico invalido")
    .required("Correo electrónico es requerido"),
  password: Yup.string()
    .required("Contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export default function Register() {
  const { colors } = theme;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();

  const initialValues: IRegisterFormValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  const onRegister = (values: IRegisterFormValues) => {
    setisLoading(true);
    dispatch(register(values))
      .unwrap()
      .catch((error) => {
        toast.show({
          render: () => (
            <CustomToast color={theme.colors.danger} message={error.message} />
          ),
          duration: 2000,
          placement: "top",
          color: theme.colors.danger,
        });
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <Layout backgroundColor={colors.background}>
      <View>
        <Center>
          <Text color={theme.colors.primary} fontSize="2xl" mb={10}>
            Registrate
          </Text>
        </Center>

        <View>
          <Formik
            initialValues={initialValues}
            onSubmit={onRegister}
            validationSchema={registerValidationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <VStack space={4} justifyContent="center">
                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={errors.name ? true : false}
                  formControlLabel="Nombres"
                  placeholder="Nombres"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("name")}
                  value={values.name}
                  errors={errors.name}
                />

                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={errors.lastname ? true : false}
                  formControlLabel="Apellidos"
                  placeholder="Apellidos"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("lastname")}
                  value={values.lastname}
                  errors={errors.lastname}
                />

                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={errors.email ? true : false}
                  formControlLabel="Correo electrónico"
                  placeholder="Email"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  errors={errors.email}
                />

                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={errors.password ? true : false}
                  formControlLabel="Contraseña"
                  placeholder="Contraseña"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  errors={errors.password}
                  type="password"
                />

                <Center mx={10}>
                  <Button
                    isLoading={isLoading}
                    onPress={() => onRegister(values)}
                    style={{
                      backgroundColor: theme.colors.primary,
                      width: "100%",
                      padding: 10,
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text color={theme.colors.white}>Regístrarse</Text>
                  </Button>
                </Center>
              </VStack>
            )}
          </Formik>
        </View>

        <Center>
          <Link
            _text={{ color: colors.primary }}
            mt={5}
            onPress={() => navigation.navigate("Login" as never)}
          >
            Ya tienes una cuenta?
          </Link>
        </Center>
      </View>
    </Layout>
  );
}
