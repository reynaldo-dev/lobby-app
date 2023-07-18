import React from "react";
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

export default function Profile() {
  return (
    <Layout>
      <ScrollView>
        <Box mx={5} flexDir="row" justifyContent="space-between">
          <Icon as={AntDesign} name="qrcode" size={6} color="primary" />
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
              John Doe
            </Text>
            <Text fontSize="sm" color="text" textAlign="center">
              Funcinario
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
