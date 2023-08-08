import React from "react";
import { ICalendarEventsResponse } from "../../../../redux/services/events/interfaces/getEventByIdResponse";
import { Divider, Icon, Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../theme";

interface IRenderItemProps {
  item: ICalendarEventsResponse;
}

export default function RenderItem({ item }: IRenderItemProps) {
  return (
    <View ml={5} mt={2} p={2}>
      <Text fontSize="md" fontWeight="bold">
        {item.title}
      </Text>

      <View flexDir="row" alignItems="center">
        <Icon
          as={Ionicons}
          name="location"
          size="sm"
          mr={1}
          color={theme.colors.primary}
        />
        <Text fontSize="sm" mt={1} color={theme.colors.muted["400"]}>
          {item.place}
        </Text>
      </View>
      <Divider my={2} />
    </View>
  );
}
