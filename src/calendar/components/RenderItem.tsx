import React from "react";
import { ICalendarEventsResponse } from "../../events/interfaces/getEventByIdResponse";
import { Divider, Icon, Pressable, Text, View } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { theme } from "../../theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routing/navigation-types";

interface IRenderItemProps {
  item: ICalendarEventsResponse;
}

export default function RenderItem({ item }: IRenderItemProps) {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Event">>();
  const isPlaceVirtual = !item?.place;

  const handlePress = () => {
    navigation.navigate("Event", { id: item.id as string });
  };
  return (
    <Pressable ml={5} mt={2} p={1} onPress={handlePress}>
      <Text fontSize="md" fontWeight="bold" color={theme.colors.secondary}>
        {item?.title}
      </Text>

      <View flexDir="row" alignItems="center" mt={2}>
        <FontAwesome
          name={isPlaceVirtual ? "laptop" : "map-marker"}
          size={20}
          color="gray"
        />
        <Text fontSize="sm" color={theme.colors.muted["500"]} ml={2}>
          {isPlaceVirtual ? "Virtual" : item?.place}
        </Text>
      </View>
      <Divider my={2} />
    </Pressable>
  );
}
