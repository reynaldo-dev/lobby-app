import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Box,
  Center,
  Divider,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
} from "native-base";
import React from "react";
import image from "../../../../assets/icon.png";
import { RootState, useAppSelector } from "../../../redux/store/store";
import { RootStackParamList } from "../../../routing/navigation-types";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import ProfileMenu from "./components/profile-menu/ProfileMenu";

export default function Profile() {
  const { user } = useAppSelector((state: RootState) => state.user);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleQR = () => {
    navigation.navigate("QRCode");
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
          <ProfileMenu />
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
      </ScrollView>
    </Layout>
  );
}
