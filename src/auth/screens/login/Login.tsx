import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Link, useToast } from "native-base";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { login } from "../../../redux/slices/user/user.thunk";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store/store";
import TextField from "../../../shared/components/TextField/TextField";
import CustomToast from "../../../shared/components/toast/CustomToast";
import ValidatedInputText from "../../../shared/components/validated-inputText/ValidatedInputText";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import { setDefaultState } from "../../../redux/slices/user/user.slice";

const validationLoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required("Email es requerido"),
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
  const { error, isAuth } = useAppSelector((state: RootState) => state.user);

  const onLogin = (values: LoginFormValues) => {
    dispatch(login(values));
    if (error) {
      toast.show({
        render: () => <CustomToast message={error} color={colors.danger} />,
        placement: "top-right",
      });
      dispatch(setDefaultState());
    }
  };

  return (
    <Layout backgroundColor={colors.white}>
      <View style={styles.container}>
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
            <View style={styles.form}>
              <ValidatedInputText
                bgColor={colors.muted["200"]}
                isInvalid={errors.email ? true : false}
                formControlLabel="Correo electrónico"
                placeholder="johndoe@example.com"
                placeholderTextColor={colors.muted["400"]}
                onChangeText={handleChange("email")}
                value={values.email}
                errors={errors.email}
              />

              <TextField
                isInvalid={errors.password ? true : false}
                placeholder="********"
                placeholderTextColor={colors.muted["400"]}
                onChangeText={handleChange("password")}
                value={values.password}
                errors={errors.password}
              />
              <TouchableOpacity
                style={{
                  ...styles.loginButton,
                  backgroundColor: colors.primary,
                }}
                onPress={handleSubmit as never}
              >
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
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
  form: {
    width: "80%",
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
