import {
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { Formik } from "formik";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Link,
  ScrollView,
  Select,
  Text,
  VStack,
  useToast
} from "native-base";
import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import * as Yup from "yup";
import { useJoinCommunityMutation, useLazyGetSearchCommunitiesQuery } from "../../../redux/services/community/communities.service";
import { register } from "../../../redux/slices/user/user.thunk";
import { RootState, useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { RootStackParamList } from "../../../routing/navigation-types";
import CustomToast from "../../../shared/components/toast/CustomToast";
import ValidatedInputText from "../../../shared/components/validated-inputText/ValidatedInputText";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";


interface IRegisterFormValues {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  department: string;
}

interface DepartmentSelectProps {
  value: string;
  onChange: (itemValue: any) => void;
  borderColor?: string;
}

export const departments = [
  "Ahuachapán", "Santa Ana", "Sonsonate", "Chalatenango", "La Libertad",
  "San Salvador", "Cuscatlán", "La Paz", "Cabañas", "San Vicente",
  "Usulután", "San Miguel", "Morazán", "La Unión"
];

const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre es requerido"),
  lastname: Yup.string().required("Apellido es requerido"),
  email: Yup.string()
    .email("Correo electrónico invalido")
    .required("Correo electrónico es requerido"),
  password: Yup.string()
    .required("Contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  phone: Yup.string()
    .required("Teléfono es requerido")
    .length(8, "El teléfono no puede contener más de 8 digitos")
    .matches(/^[0-9]+$/, "Solo se permiten números"),
  city: Yup.string().required("Ciudad es requerida"),
  department: Yup.string().required("Departamento es requerido"),
});

export const DepartmentSelect = ({ value, onChange, borderColor = "transparent" }: DepartmentSelectProps) => (
  <Box alignItems="center" w="full">
    <FormControl w="100%" maxW="300px" borderRadius={10}>
      <FormControl.Label>Departamento</FormControl.Label>
      <Select
        // @ts-ignore-next-line
        optimized={false}
        height={44}
        color="#000"
        fontSize={16}
        selectedValue={value}
        onValueChange={onChange}
        placeholder="Selecciona un departamento"
        borderColor={borderColor}
        bgColor={"#fff"}
        _selectedItem={{
          bg: "cyan.400",
          endIcon: <CheckIcon size={5} />,
          color: "#000",
        }}
      >
        {departments.map((dept, index) => (
          <Select.Item key={index} label={dept} value={dept} />
        ))}
      </Select>
    </FormControl>
  </Box>
);


export default function Register() {
  const { colors } = theme;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { user } = useAppSelector((state: RootState) => state.user);

  const [joinCommunity] = useJoinCommunityMutation();

  const [getSearchCommunities, { data: searchCommunitiesData, error }] =
    useLazyGetSearchCommunitiesQuery();


  const initialValues: IRegisterFormValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    department: "",
  };


  const onRegister = useCallback((values: any) => {
    setIsLoading(true);
    dispatch(register(values))
      .unwrap()
      .then((response) => {
        navigation.navigate('Step1');
      }
      )
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
        setIsLoading(false);
      });
  }, [dispatch, toast]);




  return (
    <Layout backgroundColor={colors.background} showCredits={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Center>
            <Text color={theme.colors.primary} fontSize="2xl" my={5}>
              Registrate
            </Text>
          </Center>

          <Formik
            initialValues={initialValues}
            onSubmit={onRegister}
            validationSchema={registerValidationSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue,
            }) => (
              <VStack space={4}>
                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={touched.name && errors.name ? true : false}
                  formControlLabel="Nombres"
                  placeholder="Nombres"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  errors={touched.name ? errors.name : ''}
                />

                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={touched.lastname && errors.lastname ? true : false}
                  formControlLabel="Apellidos"
                  placeholder="Apellidos"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("lastname")}
                  value={values.lastname}
                  onBlur={handleBlur("lastname")}
                  errors={touched.lastname && errors.lastname}
                />

                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={touched.email && errors.email ? true : false}
                  formControlLabel="Correo electrónico"
                  placeholder="Correo electrónico"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  errors={touched.email && errors.email}
                  keyboardType="email-address"
                />

                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={touched.password && errors.password ? true : false}
                  formControlLabel="Contraseña"
                  placeholder="Contraseña"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  errors={touched.password && errors.password}
                  type="password"
                />

                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={touched.phone && errors.phone ? true : false}
                  formControlLabel="Teléfono"
                  placeholder="1234-5678"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  onBlur={handleBlur("phone")}
                  keyboardType="phone-pad"
                  errors={touched.phone && errors.phone}
                />

                <DepartmentSelect
                  value={values.department}
                  onChange={(itemValue: any) => setFieldValue("department", itemValue)}
                />

                <ValidatedInputText
                  bgColor={colors.muted["200"]}
                  isInvalid={touched.city && errors.city ? true : false}
                  formControlLabel="Ciudad"
                  placeholder="Ciudad"
                  placeholderTextColor={colors.muted["400"]}
                  onChangeText={handleChange("city")}
                  value={values.city}
                  onBlur={handleBlur("city")}
                  errors={touched.city && errors.city}
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

                <Center>
                  <Link
                    _text={{ color: colors.primary }}
                    my={2}
                    onPress={() => navigation.navigate("Login" as never)}
                  >
                    ¿Ya tienes una cuenta?
                  </Link>
                </Center>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
