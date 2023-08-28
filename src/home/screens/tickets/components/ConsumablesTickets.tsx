import { useGetTicketsByUserIdQuery } from "../../../../redux/services/consumableTicket/consumableTicket.service";
import { RootState, useAppSelector } from "../../../../redux/store/store";
import { TicketList } from "./TicketList";

export const ConsumablesTickets = () => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const { data: tickets, error, isLoading } = useGetTicketsByUserIdQuery(user?.id as string);

    return (
        <TicketList tickets={tickets || []} error={!!error} isLoading={isLoading} errorMessage="Cupones de consumibles no encontrados."
        />
    );
}
