import { useEffect, useRef, useState } from 'react';
import { useGetTicketsByUserIdQuery } from '../../../redux/services/assistanceTicket/assitanceTicket.service';
import { useGetTicketsByUserIdQuery as useGetConsumablesTicketsByUserIdQuery } from '../../../redux/services/consumableTicket/consumableTicket.service';
import {
  useCancelEnrollmentToEventMutation,
  useEnrollToEventMutation,
  useGetEventByIdQuery,
  useGetMyEventsQuery,
  useIsEnrolledToEventQuery,
} from '../../../redux/services/events/events.service';
import { RootState, useAppSelector } from '../../../redux/store/store';
import useCustomToast from '../../../shared/hooks/useCustomToast';

export default function useEventScreenLogic(paramsId: string) {
  const [showDialog, setShowDialog] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState<null | boolean>(null);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.user);

  const cancelRef = useRef(null);
  const showToast = useCustomToast();
  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useGetEventByIdQuery(paramsId);

  const { refetch: refetchMyEvents } = useGetMyEventsQuery(user?.id as string);
  const [enrollToEvent, { isLoading: isEnrolling }] =
    useEnrollToEventMutation();
  const [cancelEnrollmentToEvent, { isLoading: isCancelling }] =
    useCancelEnrollmentToEventMutation();
  const { data: isEnrolledData, isLoading: isEnrolledLoading } =
    useIsEnrolledToEventQuery({
      userId: user?.id as string,
      eventId: paramsId,
    });

  const { refetch: refetchAssistanceTickets } = useGetTicketsByUserIdQuery(
    user?.id as string
  );
  const { refetch: refetchConsumablesTickets } =
    useGetConsumablesTicketsByUserIdQuery(user?.id as string);

  useEffect(() => {
    if (!isEnrolledLoading && typeof isEnrolledData !== 'undefined') {
      setIsEnrolled(isEnrolledData);
    }
  }, [isEnrolledLoading, isEnrolledData]);

  const handleEnroll = async () => {
    try {
      setIsLoadingAction(true);
      await enrollToEvent({ userId: user?.id as string, eventId: paramsId });
      setIsLoadingAction(false);
      setIsEnrolled(true);
      refetchAssistanceTickets();
      refetchConsumablesTickets();
      refetchMyEvents();
      showToast({
        id: 'assistance-confirmed',
        title: 'Asistencia confirmada',
        backgroundColor: 'success',
        textColor: 'white',
      });
      setShowDialog(false);
    } catch (error) {}
  };

  const handleCancelEnrollment = async () => {
    try {
      setIsLoadingAction(true);
      await cancelEnrollmentToEvent({
        userId: user?.id as string,
        eventId: paramsId,
      });
      setIsLoadingAction(false);
      setIsEnrolled(false);
      refetchAssistanceTickets();
      refetchConsumablesTickets();
      refetchMyEvents();

      showToast({
        id: 'asissstance-cancelled',
        title: 'Asistencia cancelada',
        backgroundColor: 'danger',
        textColor: 'white',
      });
      setShowDialog(false);
    } catch (error) {}
  };

  const handleButtonPress = () => {
    setShowDialog(true);
  };

  return {
    event,
    isLoading,
    isError,
    isEnrolling,
    isCancelling,
    isEnrolled,
    showDialog,
    cancelRef,
    handleEnroll,
    handleCancelEnrollment,
    handleButtonPress,
    setShowDialog,
    isEnrolledLoading,
    isLoadingAction,
  };
}
