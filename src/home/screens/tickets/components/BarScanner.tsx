import { BarCodeScanner } from "expo-barcode-scanner";
import { Text } from "native-base";
import { Button } from "react-native";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRedeemTicketMutation } from "../../../../redux/services/assistanceTicket/assitanceTicket.service";

interface IError {
    data: Data;
    status: number;
}

interface Data {
    error: string;
    message: string;
    statusCode: number;
}



export const BarScanner = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);

    const [redeemTicket, { isLoading: isRedeeming, isSuccess: redeemSuccess, isError: redeemError, error: reedemErrorMessage }] = useRedeemTicketMutation();

    console.log(reedemErrorMessage, "reedemErrorMessage")

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }: { type: string, data: string }) => {
        setScanned(true);

        const scannedData = JSON.parse(data);

        try {
            await redeemTicket({ id: scannedData.eventId, qrCodeId: scannedData.id });
            if (redeemError) {
                alert("El ticket ha sido canjeado con éxito.");
            }


        } catch (error) {
            let errorMsg: IError;

            // if ('message' in reedemErrorMessage) {
            //     errorMsg = reedemErrorMessage.message;
            // } else if ('status' in reedemErrorMessage) {
            //     errorMsg = `Error ${reedemErrorMessage.status}`;
            // } else {
            //     errorMsg = "Ocurrió un error al canjear el ticket.";
            // }

            alert(error || "Ocurrió un error al canjear el ticket.");
        }
    };


    if (hasPermission === null) {
        return <Text>Solicitando permisos para acceder a la cámara.</Text>;
    }

    if (hasPermission === false) {
        return <Text>Accedo denegado a la cámara.</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Presiona para escanear de nuevo.'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
