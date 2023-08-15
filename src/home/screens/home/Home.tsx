import {
  Box,
  Center,
  FlatList,
  HStack,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useState } from "react";
import { CustomAlert } from "../../../shared/components/CustomAlert";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import { CommunityList } from "../Community/components/CommunityList";
import { SearchBarCustom } from "../Community/components/SearchBarCustom";
import CardEvent from "../Events/components/CardEvent";
import HomeSection from "./components/home-section/HomeSection";
import { useGetMyeventsQuery } from "../../../redux/services/events/events.service";
import { RootState, useAppSelector } from "../../../redux/store/store";
import { IGetMyEventsResponse } from "../../../redux/services/events/interfaces/get-my-events";
import { EventListSkeleton } from "./components/home-section/event-list-skeleton/EventListSkeleton";

export default function Home() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    isError,
    isLoading,
    data: myEvents,
  } = useGetMyeventsQuery(user?.id as string);

  return (
    <Layout backgroundColor={theme.colors.background}>
      <View flex={1}>
        <View flex={1}>
          <SearchBarCustom />
        </View>

        <View mt={10} flex={2}>
          <HomeSection title="Mis Comunidades">
            <CommunityList />
          </HomeSection>
        </View>

        <View mb={2} flex={2} mt={5}>
          <HomeSection title="Eventos próximos">
            {isLoading ? (
              <EventListSkeleton />
            ) : (
              <FlatList
                contentContainerStyle={{ gap: 10, marginHorizontal: 5 }}
                data={myEvents}
                renderItem={({ item }) => <CardEvent event={item} />}
                keyExtractor={(item: IGetMyEventsResponse) => item.id}
                showsHorizontalScrollIndicator={false}
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
      </View>
    </Layout>
  );
}
