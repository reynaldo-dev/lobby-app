import React from "react";
import { ICalendarEventsResponse } from "../../../../redux/services/events/interfaces/getEventByIdResponse";
import { Divider, Icon, Pressable, Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../routing/navigation-types";

interface IRenderItemProps {
  item: ICalendarEventsResponse;
}

export default function RenderItem({ item }: IRenderItemProps) {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Event">>();

  const handlePress = () => {
    navigation.navigate("Event", { id: item.id as string });
  };
  return (
    <Pressable ml={5} mt={2} p={1} onPress={handlePress}>
      <Text fontSize="md" fontWeight="bold" color={theme.colors.secondary}>
        {item.title}
      </Text>

      <View flexDir="row" alignItems="center" mt={2}>
        <Icon
          as={Ionicons}
          name="location"
          mr={1}
          color={theme.colors.muted["500"]}
        />
        <Text fontSize="sm" color={theme.colors.muted["500"]}>
          {item.place}
        </Text>
      </View>
      <Divider my={2} />
    </Pressable>
  );
}
