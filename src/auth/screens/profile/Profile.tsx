import React, { useState } from "react";
import {
  Box,
  Center,
  Image,
  ScrollView,
  Text,
  Icon,
  Divider,
  View,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import Layout from "../../../shared/layout/Layout";
import MainModal from "../../../shared/components/modal/MainModal";
import CustomQRCode from "../../../shared/qr/CustomQRCode";

export default function Profile() {
  const [showQR, setShowQR] = useState<boolean>(false);
  const handleShowQR = () => {
    setShowQR(!showQR);
  };
  return (
    <Layout>
      <MainModal isOpen={showQR} setIsOpen={setShowQR}>
        <CustomQRCode />
      </MainModal>
      <ScrollView>
        <Box mx={5} flexDir="row" justifyContent="space-between">
          <Icon
            as={AntDesign}
            name="qrcode"
            size={6}
            color="primary"
            onPress={handleShowQR}
          />

          <Icon as={AntDesign} name="edit" size={6} color="primary" />
        </Box>
        <Center>
          <Image
            source={require("../../../../assets/icon.png")}
            alt="Logo"
            width={150}
            height={150}
          />
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="text">
              Reynaldo Martinez
            </Text>
            <Text fontSize="sm" color="text" textAlign="center">
              Desarrollador
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
