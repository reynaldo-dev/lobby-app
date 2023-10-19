import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Box, Button, Link, View, useToast } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { login } from "../../../redux/thunks/user.thunk";
import { useAppDispatch } from "../../../redux/store/store";
import TextField from "../../../shared/components/TextField/TextField";
import CustomToast from "../../../shared/components/toast/CustomToast";
import ValidatedInputText from "../../../shared/components/validated-inputText/ValidatedInputText";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";

const validationLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico invalido")
    .required("Correo electrónico es requerido"),
});
interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { colors } = theme;
  const dispatch = useAppDispatch();
  const initialValues: LoginFormValues = { email: "", password: "" };
  const navigation = useNavigation();
  const toast = useToast();
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = (values: LoginFormValues) => {
    setLoading(true);
    dispatch(login(values))
      .unwrap()
      .catch((error) => {
        if (!toastVisible) {
          setToastVisible(true);
          toast.show({
            render: () => (
              <CustomToast message={error.message} color={colors.danger} />
            ),
            placement: "top",
            duration: 2000,
            onCloseComplete: () => setToastVisible(false),
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout backgroundColor={colors.white} showCredits={false}>
      <View flex={1} justifyContent={"center"} alignItems={"center"}>
        <Text style={{ ...styles.title, color: colors.primary }}>
          Bienvenido
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
            <View w={"95%"}>
              <ValidatedInputText
                bgColor={colors.muted["200"]}
                isInvalid={errors.email ? true : false}
                placeholder="johndoe@example.com"
                placeholderTextColor={colors.muted["400"]}
                onChangeText={handleChange("email")}
                value={values.email}
                errors={errors.email}
                keyboardType="email-address"
              />

              <TextField
                isInvalid={errors.password ? true : false}
                placeholder="********"
                placeholderTextColor={colors.muted["400"]}
                onChangeText={handleChange("password")}
                value={values.password}
                errors={errors.password}
              />

              <Box alignItems="center" w="full">
                <Button
                  backgroundColor={colors.primary}
                  disabled={loading}
                  w={["90%", "80%"]}
                  onPress={handleSubmit as never}
                >
                  <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </Button>
              </Box>
            </View>
          )}
        </Formik>
        <Link
          _text={{ color: colors.primary }}
          mt={5}
          onPress={() => navigation.navigate("Register" as never)}
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
  },
  title: {
    fontSize: 40,
    marginBottom: 30,
  },

  input: {
    fontSize: 16,
    color: theme.colors.primary,
    backgroundColor: "#fff",
  },
  loginButton: {
    height: 40,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
  },
});
