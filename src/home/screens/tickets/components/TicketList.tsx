import { Center, FlatList, Text, VStack } from "native-base";
import React from "react";
import { IAssistanceTicketByUserIDResponse } from "../../../../redux/services/assistanceTicket/interfaces/assistanceTicket.interface";
import { ConsumableTicketData } from "../../../../redux/services/consumableTicket/interfaces/consumablesTickets.interface";
import { TicketCard } from "./TicketCard";
import { ActivityIndicator } from "react-native";
import { TicketsNotFound } from '../../../../shared/components/notFound/TicketsNotFound';

type CommonTicket = IAssistanceTicketByUserIDResponse | ConsumableTicketData;

type Props = {
  tickets: CommonTicket[];
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
};

export const TicketList = ({
  tickets,
  isLoading,
  error,
  errorMessage,
}: Props) => {

  if (isLoading) {
    return (
      <Center my={"auto"}>
        <ActivityIndicator size="large" color="#d50d2c" />
      </Center>
    );
  }

  if (error || !tickets) {
    return (
      <TicketsNotFound message={errorMessage} height={450} />
    );
  }

  return (
    <VStack>
      <FlatList
        data={tickets}
        renderItem={({ item }) => {
          if ("consumable" in item) {
            return (
              <TicketCard
                event={item.event}
                user={item.user}
                isActive={item.isActive}
                consumable={item.consumable}
                ticketId={item.id}
                userId={item.userId}
              />
            );
          } else {
            return (
              <TicketCard
                event={item.event}
                user={item.user}
                isActive={item.isActive}
              />
            );
          }
        }}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
};
