import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useGetTicketsByUserIdQuery } from "../../../../redux/services/consumableTicket/consumableTicket.service";
import { TicketList } from "./TicketList";

export const ConsumablesTickets = () => {
    const [userId, setUserId] = useState<string | null>(null);

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

    return (
        <TicketList tickets={tickets || []} error={!!error} isLoading={isLoading} errorMessage="Cupones de consumibles no encontrados."
        />
    );
}
