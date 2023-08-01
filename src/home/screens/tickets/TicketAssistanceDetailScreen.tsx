import { Center, Text, theme, View } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import { formatDate } from '../../../helpers/DateFormat';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const TicketAssistanceDetailScreen = () => {
    const navigation = useNavigation();

    return (
        <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ position: "absolute", top: 10, left: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <Center mb={10}>
                    <Text color={theme.colors.muted["400"]} fontSize="xl">
                        Evento:
                    </Text>
                    <Text>
                        Descripción:
                    </Text>
                    <Text>
                        Lugar:
                    </Text>
                    <Text>
                        Fecha y Hora:
                    </Text>
                </Center>
                <SvgQRCode
                    enableLinearGradient
                    size={300}
                />
            </View>
        </>
    )
}