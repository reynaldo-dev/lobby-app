import React from "react";
import { View, Text, Center } from "native-base";
import SvgQRCode from "react-native-qrcode-svg";

export default function CustomQRCode() {
  const value = {
    id: "hdgghs-44-djhjsd",
    nombre: "Silas Velasquez",
    rol: "Administrador",
    cedula: "123456789",
    activo: true,
  };
  return (
    <View justifyContent="center" alignItems="center" margin={2} height="100%">
      <Center>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="secondary"
          marginBottom={2}
        >
          Tu carnet digital
        </Text>
      </Center>
      <SvgQRCode size={200} value={JSON.stringify(value)} />
    </View>
  );
}
