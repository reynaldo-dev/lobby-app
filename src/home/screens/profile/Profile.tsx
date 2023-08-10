import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
} from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import image from "../../../../assets/icon.png";
import { RootStackParamList } from "../../../routing/navigation-types";
import Layout from "../../../shared/layout/Layout";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store/store";
import { theme } from "../../../theme";
import { logout } from "../../../redux/slices/user/user.thunk";

export default function Profile() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleQR = () => {
    navigation.navigate("QRCode");
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout backgroundColor={theme.colors.background}>
      <ScrollView>
        <Box mx={5} flexDir="row" justifyContent="space-between">
          <Icon
            as={AntDesign}
            name="qrcode"
            size={6}
            color="primary"
            onPress={handleQR}
          />
          <Icon as={AntDesign} name="edit" size={6} color="primary" />
        </Box>
        <Center>
          <Image source={image} alt="Logo" width={150} height={150} />
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="text">
              {user?.name}
            </Text>
            <Text fontSize="sm" color="text" textAlign="center">
              {user?.role}
            </Text>
          </Box>
        </Center>

        <Box
          mx={10}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          mt={10}
        >
          <Box alignItems="center">
            <Box flexDirection="row" alignItems="center">
              <Icon as={AntDesign} name="staro" mr={1} />
              <Text fontSize="xl" fontWeight="bold" color="text">
                200
              </Text>
            </Box>

            <Text fontSize="sm" fontWeight="bold" color="text">
              Estrellas obtenidas
            </Text>
          </Box>
          <Divider orientation="vertical" height={10} />

          <Box alignItems="center">
            <Box flexDirection="row" alignItems="center">
              <Icon as={AntDesign} name="checkcircleo" mr={1} />
              <Text fontSize="xl" fontWeight="bold" color="text">
                200
              </Text>
            </Box>

            <Text fontSize="sm" fontWeight="bold" color="text">
              Eventos asistidos
            </Text>
          </Box>
        </Box>

        <View mx={10} mt={16}>
          <Box
            backgroundColor="primary"
            p={8}
            borderRadius={20}
            shadow={5}
            marginBottom={5}
          >
            <Text color="white" fontSize="xl" fontWeight="bold">
              Mi comunidad
            </Text>
            <Text color="white">Runners</Text>
          </Box>

          <Box
            backgroundColor="secondary"
            p={8}
            borderRadius={20}
            shadow={5}
            marginBottom={5}
          >
            <Text color="white" fontSize="xl" fontWeight="bold">
              Mis eventos
            </Text>
            <Text color="white">+60</Text>
          </Box>
        </View>
        <Button
          mx={10}
          mt={10}
          mb={10}
          backgroundColor="primary"
          borderRadius={20}
          shadow={5}
          onPress={onLogout}
        >
          <Text color="white" fontSize="xl" fontWeight="bold">
            Cerrar sesión
          </Text>
        </Button>
      </ScrollView>
    </Layout>
  );
}
