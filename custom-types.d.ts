declare module "react-native-calendars" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  interface Event {
    id?: string;
    title?: string;
    description?: string;
    status?: string;
    isPrivate?: string;
    createdAt?: string;
    place?: string;
    communityId?: string;
    score?: number;
    dateTime: string;
    eventCategoryId?: string;
  }

  interface AgendaItem<T> {
    [date: string]: T[];
  }

  interface AgendaProps<T extends Event> {
    items: AgendaItem<T>;
    loadItemsForMonth: (date: string) => void;
    selected: string;
    renderItem: (item: T) => React.ReactNode;
    renderEmptyData?: () => React.ReactNode;
    rowHasChanged?: (r1: T, r2: T) => boolean;
    renderDay?: (date: string, item: T) => React.ReactNode;
    hideKnob?: boolean;
    theme?: {
      agendaDayTextColor?: string;
      agendaDayNumColor?: string;
      agendaTodayColor?: string;
      agendaKnobColor?: string;
      selectedDayBackgroundColor?: string;
      selectedDayTextColor?: string;
      todayBackgroundColor?: string;
      todayTextColor?: string;
      dayTextColor?: string;
      textSectionTitleColor?: string;
      selectedDotColor?: string;
      selectedDotTextColor?: string;
      dotColor?: string;
      selectedDotColor?: string;
      arrowColor?: string;
      monthTextColor?: string;
      textDayFontFamily?: string;
      textMonthFontFamily?: string;
      textDayHeaderFontFamily?: string;
      textDayFontWeight?: string;
      textMonthFontWeight?: string;
      textDayHeaderFontWeight?: string;
      textDayFontSize?: number;
      textMonthFontSize?: number;
      textDayHeaderFontSize?: number;
      agendaDayFontSize?: number;
      agendaDayFontWeight?: number;
      agendaHeaderTextSize?: number;
      agendaHeaderColor?: string;
      agendaHeaderBackgroundColor?: string;
      calendarBackground?: string;
      textDisabledColor?: string;
      dayBackgroundColor?: string;
      dotStyle?: ViewStyle;
      arrowStyle?: ViewStyle;
      agendaDayStyle?: ViewStyle;
      agendaKnobStyle?: ViewStyle;
    };
    pastScrollRange?: number;
    futureScrollRange?: number;
    showScrollIndicator?: boolean;
    showClosingKnob?: boolean;
    firstDay?: number;
    onDayPress?: (day: any) => void;
    onDayChange?: (day: any) => void;
    onRefresh?: () => void;
    refreshing?: boolean;
    refreshControl?: React.ReactNode;
    style?: ViewStyle;
    calendarStyle?: ViewStyle;
    dayLoading?: boolean;
    minDate?: string;
    maxDate?: string;
    theme?: any;
    locale?: string;
  }

  export class Agenda<T extends Event> extends Component<AgendaProps<T>> {}
}
