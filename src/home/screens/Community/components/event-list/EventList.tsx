import { View, Text, FlatList } from "native-base";
import React from "react";
import { theme } from "../../../../../theme";
import EventCommunityCard from "../event-community-card/EventCommunityCard";
import { IEvent } from "../../../../../redux/services/community/interfaces/community-response.interface";

interface EventListProps {
  events: IEvent[] | undefined;
}

export default function EventList({ events }: EventListProps) {
  return (
    <View h="100%" w="100%" mt={10}>
      <Text fontSize="md" bold ml={5} color={theme.colors.muted["400"]}>
        Eventos
      </Text>

      <FlatList
        w="100%"
        p={2}
        mt={2}
        data={events}
        renderItem={(item) => <EventCommunityCard event={item?.item} />}
        keyExtractor={(item) => item?.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
