import { useEffect, useState } from "react";
import { Event } from "react-native-calendars";
import { useGetMyEventsCalendarQuery } from "../redux/services/assitanceTicket.service";
import { ICalendarEventsResponse } from "../events/interfaces/getEventByIdResponse";
import { RootState, useAppSelector } from "../redux/store/store";

type AgendaItem = { [key: string]: Event[] };

export const useEventsCalendar = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const [agendaItems, setAgendaItems] = useState<AgendaItem>({});
  const [dateAfterTwoMonths, setDateAfterTwoMonths] = useState<string>("");
  const {
    data: events,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetMyEventsCalendarQuery(user?.id as string);

  const loadAgendaItems = () => {
    const agendaItemsObj: AgendaItem = {};

    events?.forEach((event: ICalendarEventsResponse) => {
      const date = event.dateTime.split("T")[0];
      if (!agendaItemsObj[date]) {
        agendaItemsObj[date] = [];
      }
      agendaItemsObj[date].push(event);
    });
    setAgendaItems(agendaItemsObj);
  };

  useEffect(() => {
    loadAgendaItems();
    calcDateAfterTwoMonths();
  }, [events]);

  const loadItemsForMonth = (selectedDate: string) => {
    return agendaItems[selectedDate] || [];
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toDateString();
  };

  const calcDateAfterTwoMonths = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    setDateAfterTwoMonths(date.toISOString().split("T")[0]);
  };

  return {
    isLoading,
    isError,
    error,
    refetch,
    events,
    agendaItems,
    loadItemsForMonth,
    getCurrentDate,
    dateAfterTwoMonths,
  };
};
