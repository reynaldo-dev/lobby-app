import { useFocusEffect } from "@react-navigation/native";
import { Center, Text, theme } from "native-base";
import React from "react";
import { Agenda } from "react-native-calendars";
import { useEventsCalendar } from "../../../hooks/useEventsCalendar";
import Layout from "../../../shared/layout/Layout";
import { RenderError } from "./components/RenderError";
import RenderItem from "./components/RenderItem";
import { RenderLoading } from "./components/RenderLoading";

export default function CalendarScreen() {
  const {
    agendaItems,
    getCurrentDate,
    isError,
    isLoading,
    loadItemsForMonth,
    refetch,
    events,
    dateAfterTwoMonths,
  } = useEventsCalendar();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <Layout>
      {isLoading && <RenderLoading />}
      {isError && <RenderError />}

      {!isLoading && !isError && events?.length && (
        <Agenda
          rowHasChanged={(r1, r2) => {
            return r1.title !== r2.title;
          }}
          maxDate={dateAfterTwoMonths}
          pastScrollRange={10}
          showClosingKnob={true}
          style={{ height: "90%" }}
          futureScrollRange={10}
          items={agendaItems}
          loadItemsForMonth={loadItemsForMonth}
          selected={getCurrentDate()}
          renderItem={(item) => <RenderItem item={item} />}
          renderEmptyData={() => {
            return (
              <Center flex={1}>
                <Text>No hay eventos para este dia</Text>
              </Center>
            );
          }}
        />
      )}
    </Layout>
  );
}
