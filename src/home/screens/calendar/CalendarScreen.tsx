import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, Center, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { useEventsCalendar } from "../../../hooks/useEventsCalendar";
import { RootStackParamList } from "../../../routing/navigation-types";
import { NotFound } from "../../../shared/components/notFound/NotFound";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
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
    error,
    dateAfterTwoMonths,
  } = useEventsCalendar();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList, "Calendar">>();

  return (

    <Layout backgroundColor={theme.colors.background} showCredits={false}>
      <Box flexDirection="row" alignItems="center" ml={2} height={50}>
        <Box>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        </Box>
        <Center flex={1}>
          <Text fontSize={16} color={"muted.500"} fontWeight="bold" marginRight={10}>
            Calendario
          </Text>
        </Center>
      </Box>
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
