import { Icon } from "native-base";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SvgQRCode from "react-native-qrcode-svg";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function CustomQRCode() {
  const navigation = useNavigation()
  const value = {
    id: "hdgghs-44-djhjsd",
    nombre: "Silas Velasquez",
    rol: "Administrador",
    cedula: "123456789",
    activo: true,
  };
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ position: 'absolute', top: 10, left: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <SvgQRCode value={JSON.stringify(value)} />
      </View>
    </>


  );
}
