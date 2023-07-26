import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HStack, Icon, Stack, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../../routing/navigation-types";

export const SearchBarCustom = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSearch = async () => {
    navigation.navigate("SearchCommunity");
  };

  return (
    <Stack space={4} w="100%" alignItems="center" mt={5}>
      <TouchableOpacity
        style={{
          width: "75%",
          height: 45,
          borderColor: "#a3a3a3",
          borderWidth: 1,
          justifyContent: "center",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={handleSearch}
      >
        <HStack space={2}>
          <Icon as={<AntDesign name="search1" />} size={5} color="muted.400" />
          <Text color={"muted.400"}>Buscar comunidad</Text>
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
};
