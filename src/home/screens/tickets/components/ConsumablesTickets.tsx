import { useGetTicketsByUserIdQuery } from "../../../../redux/services/consumableTicket/consumableTicket.service";
import { RootState, useAppSelector } from "../../../../redux/store/store";
import { TicketList } from "./TicketList";

export const ConsumablesTickets = () => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const { data: allTickets, error, isLoading } = useGetTicketsByUserIdQuery(user?.id as string);
    const activeTickets = allTickets?.filter(ticket => ticket.isActive) || [];

    return (
        <TicketList tickets={activeTickets} error={!!error} isLoading={isLoading} errorMessage="Cupones de consumibles no encontrados."
        />
    );
}
