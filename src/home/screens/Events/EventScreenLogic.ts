import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import {
  useGetMyEventsCalendarQuery,
  useGetTicketsByUserIdQuery,
} from '../../../redux/services/assistanceTicket/assitanceTicket.service';
import { useGetTicketsByUserIdQuery as useGetConsumablesTicketsByUserIdQuery } from '../../../redux/services/consumableTicket/consumableTicket.service';
import {
  useCancelEnrollmentToEventMutation,
  useEnrollToEventMutation,
  useGetEventByIdQuery,
  useGetMyEventsQuery,
  useIsEnrolledToEventQuery,
} from '../../../redux/services/events/events.service';
import useCustomToast from '../../../shared/hooks/useCustomToast';
import { RootState, useAppSelector } from '../../../redux/store/store';

export default function useEventScreenLogic(paramsId: string) {
  const [userId, setUserId] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState<null | boolean>(null);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.user);

  const cancelRef = useRef(null);
  const showToast = useCustomToast();
  console.log(paramsId, 'paramsId');
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
    useIsEnrolledToEventQuery({ userId: userId, eventId: paramsId });

  const { refetch: refetchAssistanceTickets } = useGetTicketsByUserIdQuery(
    userId || '',
    { skip: userId === null }
  );
  const { refetch: refetchConsumablesTickets } =
    useGetConsumablesTicketsByUserIdQuery(userId || '', {
      skip: userId === null,
    });

  useEffect(() => {
    const getUserData = async () => {
      const authStateString = await AsyncStorage.getItem('authState');
      if (authStateString) {
        const authState = JSON.parse(authStateString);
        setUserId(authState.user.id);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (!isEnrolledLoading && typeof isEnrolledData !== 'undefined') {
      setIsEnrolled(isEnrolledData);
    }
  }, [isEnrolledLoading, isEnrolledData]);

  const handleEnroll = async () => {
    try {
      setIsLoadingAction(true);
      await enrollToEvent({ userId: userId, eventId: paramsId });
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEnrollment = async () => {
    try {
      setIsLoadingAction(true);
      await cancelEnrollmentToEvent({ userId: userId, eventId: paramsId });
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
    } catch (error) {
      console.error(error);
    }
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
