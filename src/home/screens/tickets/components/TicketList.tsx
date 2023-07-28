import { FlatList, Text, VStack } from "native-base";
import React from "react";
import { useGetTicketsQuery } from "../../../../redux/services/assistanceTicket/assitanceTicket.service";
import { TicketCard } from "./TicketCard";


export const TicketList: React.FC = () => {
    const { data: tickets, error, isLoading } = useGetTicketsQuery({ from: 0, limit: 10 });

    if (isLoading) {
        return <Text>Cargando...</Text>;
    }

    if (error) {
        return <Text>Ocurrió un error.</Text>;
    }

    return (
        <VStack>
            <FlatList
                data={tickets?.data}
                renderItem={({ item }) => <TicketCard
                    title={item.event.title}
                    isActive={item.isActive}
                    name={item.user.name}
                    lastname={item.user.lastname}
                    place={item.event.place}
                    date={item.event.dateTime}
                />}
                keyExtractor={(item) => item.id}
            />
        </VStack>
    );
};
