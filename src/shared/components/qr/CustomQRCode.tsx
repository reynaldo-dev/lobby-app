import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Center, Text } from "native-base";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import SvgQRCode from "react-native-qrcode-svg";
import { RootState, useAppSelector } from "../../../redux/store/store";
import { theme } from "../../../theme";
import Layout from "../../layout/Layout";

export default function CustomQRCode() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ position: "absolute", top: 10, left: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Center mb={10}>
          <Text color={theme.colors.muted["500"]} fontSize="2xl">
            {user?.name} {user?.lastname}
          </Text>
        </Center>
        <SvgQRCode
          enableLinearGradient
          size={300}
          value={JSON.stringify(user)}
        />
      </View>
    </Layout>
  );
}
