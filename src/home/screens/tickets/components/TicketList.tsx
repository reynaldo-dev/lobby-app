import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { useGetTicketsByUserIdQuery } from "../../../../redux/services/assistanceTicket/assitanceTicket.service";
import { TicketCard } from "./TicketCard";
;


export const TicketList: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);

    // const { data: tickets, error, isLoading } = useGetTicketsQuery({ from: 0, limit: 10 });

    const { data: tickets, error, isLoading } = useGetTicketsByUserIdQuery(userId || '', {
        skip: userId === null,
    });

    useEffect(() => {
        const getUserData = async () => {
            const authStateString = await AsyncStorage.getItem('authState');
            if (authStateString) {
                const authState = JSON.parse(authStateString);
                setUserId(authState.user.id);
            }
        }

        getUserData();
    }, []);

    console.log(tickets)
    if (isLoading) {
        return <Text>Cargando...</Text>;
    }

    if (error) {
        console.log(error)
        return <Text>Ocurrió un error.</Text>;
    }

    return (
        <VStack>
            <FlatList
                data={tickets}
                renderItem={({ item }) => <TicketCard
                    event={item.event}
                    user={item.user}
                    isActive={item.isActive}
                />}
                keyExtractor={(item) => item.id}
            />
        </VStack>
    );
};
