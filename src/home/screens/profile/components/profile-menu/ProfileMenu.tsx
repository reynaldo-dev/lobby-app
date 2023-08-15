import { View, Text } from "react-native";
import React from "react";
import { Button, Icon, Menu } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../../routing/navigation-types";
import { useAppDispatch } from "../../../../../redux/store/store";
import { logout } from "../../../../../redux/slices/user/user.thunk";

export default function ProfileMenu() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  return (
    <Menu
      w="full"
      trigger={(triggerProps) => {
        return (
          <Button variant="solid" alignSelf="center" {...triggerProps}>
            <Icon
              as={Ionicons}
              name="settings-outline"
              size={6}
              color="primary"
            />
          </Button>
        );
      }}
    >
      <Menu.Item
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        Editar
      </Menu.Item>

      <Menu.Item
        onPress={() => {
          navigation.navigate("PasswordUpdate");
        }}
      >
        Cambiar contraseña
      </Menu.Item>
      <Menu.Item
        onPress={() => {
          dispatch(logout());
        }}
      >
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );
}
