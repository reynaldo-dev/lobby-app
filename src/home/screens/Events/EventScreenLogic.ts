import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import {
  useCancelEnrollmentToEventMutation,
  useEnrollToEventMutation,
  useGetEventByIdQuery,
  useIsEnrolledToEventQuery,
} from '../../../redux/services/events/events.service';
import { useGetTicketsByUserIdQuery } from '../../../redux/services/assistanceTicket/assitanceTicket.service';

export default function useEventScreenLogic(paramsId: string) {
  const [userId, setUserId] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState<null | boolean>(null);
  const cancelRef = useRef(null);
  const toast = useToast();

  const { data: event, isLoading, isError } = useGetEventByIdQuery(paramsId);
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
  const { refetch: refetchConsumablesTickets } = useGetTicketsByUserIdQuery(
    userId || '',
    { skip: userId === null }
  );

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
      await enrollToEvent({ userId: userId, eventId: paramsId });
      setIsEnrolled(true);
      refetchAssistanceTickets();
      refetchConsumablesTickets();
      toast.closeAll();
      toast.show({
        title: 'Asistencia confirmada',
        placement: 'top',
        duration: 2000,
        _text: {
          color: 'white',
        },
        colorScheme: 'success',
      });
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEnrollment = async () => {
    try {
      await cancelEnrollmentToEvent({ userId: userId, eventId: paramsId });
      setIsEnrolled(false);
      refetchAssistanceTickets();
      refetchConsumablesTickets();
      toast.closeAll();
      toast.show({
        title: 'Asistencia cancelada',
        placement: 'top',
        duration: 2000,
        _text: {
          color: 'white',
        },
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
  };
}
