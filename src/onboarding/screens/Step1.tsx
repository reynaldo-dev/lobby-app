import React, { useEffect } from 'react';
import StepImage from '../../../assets/step-1.svg';
import useRegisterPushNotifications from '../../hooks/useRegisterPushNotifications';
import { useCreateFcmTokenMutation } from '../../redux/services/fcm-tokens.service';
import { RootState, useAppSelector } from '../../redux/store/store';
import StepScreen from '../components/StepScreen';

export default function Step1() {
  const [createFcmToken] = useCreateFcmTokenMutation();
  const expoPushToken = useRegisterPushNotifications();
  const { user } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (expoPushToken) {
      handleCreateToken(expoPushToken);
    }
  }, [expoPushToken]);

  const handleCreateToken = async (token: string) => {
    try {
      await createFcmToken({ token: token, userId: user?.id as string }).unwrap();
    } catch (error) {
      console.error('Error al crear el token FCM:', error);
    }
  };

  return (
    <StepScreen
      stepNumber={1}
      stepTitle="¡Gana puntos siendo reconocido!"
      stepImage={<StepImage />}
      nextStep="Step2"
      showBackButton={false}
    />
  );
}
