import { Center, FlatList, Text, View } from "native-base";
import React from "react";
import { useGetMyEventsQuery } from "../../../redux/services/events/events.service";
import { IGetMyEventsResponse } from "../../../redux/services/events/interfaces/get-my-events";
import { RootState, useAppSelector } from "../../../redux/store/store";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import { CommunityList } from "../Community/components/CommunityList";
import { SearchBarCustom } from "../Community/components/SearchBarCustom";
import CardEvent from "../Events/components/CardEvent";
import HomeSection from "./components/home-section/HomeSection";
import { EventListSkeleton } from "./components/home-section/event-list-skeleton/EventListSkeleton";

export default function Home() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    isError,
    isLoading,
    data: myEvents,
  } = useGetMyEventsQuery(user?.id as string);

  return (
    <Layout backgroundColor={theme.colors.background}>
      <View style={{ flex: 1 }}>
        <View style={{ height: 60, marginBottom: 20 }}>
          <SearchBarCustom />
        </View>

        <View style={{ marginBottom: 10 }}>
          <HomeSection title="Mis Comunidades">
            <CommunityList />
          </HomeSection>
        </View>

        <HomeSection title="Eventos próximos">
          {isLoading ? (
            <EventListSkeleton />
          ) : (
            <FlatList
              contentContainerStyle={{ gap: 10, marginHorizontal: 5 }}
              data={myEvents}
              renderItem={({ item }) => <CardEvent data={item} />}
              keyExtractor={(item: IGetMyEventsResponse) => item.id}
              showsVerticalScrollIndicator={true}
              style={{ height: 350 }}
              ListEmptyComponent={
                <Center flex={1}>
                  <Text color={theme.colors.muted[400]}>
                    Aun no tienes eventos
                  </Text>
                </Center>
              }
            />
          )}
        </HomeSection>
      </View>
    </Layout>
  );
}
