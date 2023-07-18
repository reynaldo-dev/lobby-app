import React from "react";
import { View, Text } from "react-native";
import SvgQRCode from "react-native-qrcode-svg";

export default function CustomQRCode() {
  const value = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "123456789",
    address: "Calle 123",
    city: "Bogota",
  };
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SvgQRCode value={JSON.stringify(value)} />
      </View>
    </>
  );
}
