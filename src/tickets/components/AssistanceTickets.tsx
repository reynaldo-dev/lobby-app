import { useGetTicketsByUserIdQuery } from "../../redux/services/assitanceTicket.service";
import { RootState, useAppSelector } from "../../redux/store/store";
import { TicketList } from "./TicketList";
export const AssistanceTickets = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: allTickets,
    error,
    isLoading,
  } = useGetTicketsByUserIdQuery(user?.id as string);
  const activeTickets = allTickets?.filter((ticket) => ticket.isActive) || [];

  return (
    <TicketList
      key={1}
      tickets={activeTickets}
      error={!!error}
      isLoading={isLoading}
      errorMessage="Cupones de asistencia no encontrados."
    />
  );
};
