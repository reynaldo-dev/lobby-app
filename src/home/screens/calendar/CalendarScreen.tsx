import { useFocusEffect } from "@react-navigation/native";
import { Center, Text } from "native-base";
import React from "react";
import { Agenda } from "react-native-calendars";
import { useEventsCalendar } from "../../../hooks/useEventsCalendar";
import Layout from "../../../shared/layout/Layout";
import { RenderError } from "./components/RenderError";
import RenderItem from "./components/RenderItem";
import { RenderLoading } from "./components/RenderLoading";
import { theme } from "../../../theme";
import { NotFound } from "../../../shared/components/notFound/NotFound";

export default function CalendarScreen() {
  const {
    agendaItems,
    getCurrentDate,
    isError,
    isLoading,
    loadItemsForMonth,
    refetch,
    events,
    error,
    dateAfterTwoMonths,
  } = useEventsCalendar();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  return (
    <Layout backgroundColor={theme.colors.background} showCredits={false}>
      {isLoading && <RenderLoading />}
      {isError && <RenderError />}

      {!isLoading && !isError && (
        <Agenda
          rowHasChanged={(r1, r2) => {
            return r1.title !== r2.title;
          }}
          maxDate={dateAfterTwoMonths}
          pastScrollRange={10}
          minDate={getCurrentDate()}
          showClosingKnob={true}
          style={{ height: "90%", marginTop: 10 }}
          futureScrollRange={10}
          items={agendaItems}
          loadItemsForMonth={loadItemsForMonth}
          selected={getCurrentDate()}
          renderItem={(item) => <RenderItem item={item} />}
          renderEmptyData={() => {
            return (
              <NotFound message="No hay eventos para este día." height={400} />
            );
          }}
        />
      )}
    </Layout>
  );
}
