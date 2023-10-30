import { Center, FlatList, VStack } from "native-base";
import React from "react";
import { ActivityIndicator } from "react-native";
import { NotFound } from "../../shared/components/notFound/NotFound";
import { IAssistanceTicketByUserIDResponse } from "../interfaces/assistanceTicket.interface";
import { ConsumableTicketData } from "../interfaces/consumablesTickets.interface";
import { TicketCard } from "./TicketCard";

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

  if (error || !tickets || tickets.length === 0) {
    return (
      <NotFound message={errorMessage} />
    )
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
                userId={item.userId}
              />
            );
          }
        }}
        keyExtractor={(item) => item.id || 'default-key'}
      />
    </VStack>
  );
};
