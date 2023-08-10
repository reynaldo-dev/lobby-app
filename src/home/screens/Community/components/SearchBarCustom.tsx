import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HStack, Icon, Pressable, Stack, Text } from "native-base";
import React from "react";

import { RootStackParamList } from "../../../../routing/navigation-types";
import { theme } from "../../../../theme";

export const SearchBarCustom = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSearch = async () => {
    navigation.navigate("SearchCommunity");
  };

  return (
    <Stack space={4} w="100%" alignItems="center" mt={5}>
      <Pressable
        onPress={handleSearch}
        w="90%"
        p={3}
        justifyContent="center"
        borderRadius={10}
        backgroundColor={theme.colors.white}
      >
        <HStack space={2}>
          <Icon as={<AntDesign name="search1" />} size={5} color="muted.400" />
          <Text color={"muted.400"}>Buscar comunidad</Text>
        </HStack>
      </Pressable>
    </Stack>
  );
};
