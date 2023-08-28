import { useGetTicketsByUserIdQuery } from "../../../../redux/services/assistanceTicket/assitanceTicket.service";
import { RootState, useAppSelector } from "../../../../redux/store/store";
import { TicketList } from "./TicketList";
export const AssistanceTickets = () => {
    const { user } = useAppSelector((state: RootState) => state.user);
    const { data: tickets, error, isLoading } = useGetTicketsByUserIdQuery(user?.id as string);

    return (
        <TicketList tickets={tickets || []} error={!!error} isLoading={isLoading} errorMessage="Cupones de asistencia no encontrados."
        />
    )
}