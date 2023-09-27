import React, { useState } from 'react';
import { VStack, Text, Input, Button, Box, Center, HStack, Avatar } from 'native-base';
import avatarImage from "../../../../assets/avatar.png";
import { User } from '../../../redux/slices/user/user.interface';
import { RootStackParamList } from '../../../routing/navigation-types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from '../../../shared/layout/Layout';
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootState, useAppSelector } from '../../../redux/store/store';
import { useCreateRecognitionMutation } from '../../../redux/services/user/user.service';
import useCustomToast from '../../../shared/hooks/useCustomToast';

type SendRecognitionProps = NativeStackScreenProps<RootStackParamList, 'SendRecognition'>;

export const SendRecognition: React.FC<SendRecognitionProps> = ({ route }) => {

    const [message, setMessage] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList, "SendRecognition">>();
    const { user: userFromState } = useAppSelector((state: RootState) => state.user);
    const [createRecognition, { isLoading, isError, error }] = useCreateRecognitionMutation();
    const showToast = useCustomToast();
    const { user } = route.params;

    const handleSend = async () => {
        if (!message.trim()) {
            showToast({
                id: 'recognition-error-empty',
                title: 'El mensaje no puede estar vacío',
                backgroundColor: 'danger',
                textColor: 'white',
            });
            return;
        }

        await createRecognition({ userSourceId: userFromState?.id as string, userTargetId: user.id as string, description: message, points: 2 });

        if (isError) {
            showToast({
                id: 'recognition-error',
                title: 'Error al enviar el reconocimiento',
                backgroundColor: 'danger',
                textColor: 'white',
            });
        } else {
            showToast({
                id: 'recognition-sended',
                title: 'Reconocimiento enviado exitosamente',
                backgroundColor: 'success',
                textColor: 'white',
            });
            setMessage('');
            navigation.goBack();
        }
    };


    return (
        <Layout>
            <VStack flex={1} px={5} py={6} space={4}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <HStack alignItems="center" space={4}>
                    <Avatar size="48px" source={avatarImage} />
                    <VStack>
                        <Text fontSize="lg" bold textTransform={"capitalize"}>{user.name} {user.lastname}</Text>
                        <Text color="gray.500" textTransform={"capitalize"}>{user?.rol?.role}</Text>
                    </VStack>
                </HStack>

                <Input
                    height="200px"
                    multiline
                    numberOfLines={5}
                    placeholder="Ingresa tu mensaje aquí..."
                    value={message}
                    onChangeText={setMessage}
                    bg="gray.100"
                    textAlignVertical="top"
                    mb={4}
                />

                <Button onPress={handleSend} style={styles.buttonStyle} isLoading={isLoading}>
                    <Text style={styles.buttonText}>Enviar reconocimiento</Text>
                </Button>
            </VStack>
        </Layout>
    );
}

export default SendRecognition;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
    },
});
