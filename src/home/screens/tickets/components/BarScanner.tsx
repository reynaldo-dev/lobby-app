import { BarCodeScanner } from "expo-barcode-scanner";
import { Text } from "native-base";
import { Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

import { useScanQRCodeMutation } from "../../../../redux/services/events/events.service";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../routing/navigation-types";

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

    const [scanQRCode, { isLoading: isScanning, isSuccess: scanSuccess, error: scanErrorMessage }] = useScanQRCodeMutation();
    const errors = scanErrorMessage as IError;

    const navigation = useNavigation<NavigationProp<RootStackParamList, "BarScanner">>();


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
            await scanQRCode({ userId: scannedData.id, eventId: scannedData.eventId });
            if (scanErrorMessage) {
                throw new Error(errors.data.message);
            }
            alert("Cupón canjeado con éxito.");
        } catch (error) {
            alert(errors.data.message || "Ocurrió un error al canjear el ticket.");
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

            <View style={styles.topOverlay} />
            <View style={styles.bottomOverlay} />
            <View style={styles.leftOverlay} />
            <View style={styles.rightOverlay} />

            <View style={styles.topLeftCorner} />
            <View style={styles.topRightCorner} />
            <View style={styles.bottomLeftCorner} />
            <View style={styles.bottomRightCorner} />

            <TouchableOpacity style={styles.closeButton} onPress={() => {
                navigation.goBack();
            }}>
                <AntDesign name="closecircleo" size={30} color="#FFF" />
            </TouchableOpacity>

            {scanned && <Button title={'Presiona para escanear de nuevo.'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const overlayBaseStyle: ViewStyle = {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)'
};

const cornerBaseStyle: ViewStyle = {
    position: 'absolute',
    borderColor: '#FFF',
    borderWidth: 3,
    height: 50,
    width: 50,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 30,
        zIndex: 2,
    },
    topOverlay: {
        ...overlayBaseStyle,
        top: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    bottomOverlay: {
        ...overlayBaseStyle,
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    leftOverlay: {
        ...overlayBaseStyle,
        top: '40%',
        bottom: '40%',
        left: 0,
        width: '20%',
    },
    rightOverlay: {
        ...overlayBaseStyle,
        top: '40%',
        bottom: '40%',
        right: 0,
        width: '20%',
    },
    topLeftCorner: {
        ...cornerBaseStyle,
        top: '35%',
        left: '15%',
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
    topRightCorner: {
        ...cornerBaseStyle,
        top: '35%',
        right: '15%',
        borderBottomWidth: 0,
        borderLeftWidth: 0,
    },
    bottomLeftCorner: {
        ...cornerBaseStyle,
        bottom: '35%',
        left: '15%',
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    bottomRightCorner: {
        ...cornerBaseStyle,
        bottom: '35%',
        right: '15%',
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
});