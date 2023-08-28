import { NavigationProp } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text } from "native-base";
import React, { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { PrivateStackParamList } from "../../../routing/navigation-types";


interface BarScannerProps {
    onBarCodeScanned: (data: { type: string, data: string }) => Promise<void>;
    isLoading: boolean;
    navigation: NavigationProp<PrivateStackParamList, "Home">;
    scanned: boolean;
    setScanned: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomBarScanner = ({ onBarCodeScanned, isLoading, navigation, scanned, setScanned }: BarScannerProps) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    if (hasPermission === null) {
        return <Text>Solicitando permisos para acceder a la cámara.</Text>;
    }

    if (hasPermission === false) {
        return <Text>Accedo denegado a la cámara.</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
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

            {isLoading && <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#FFF" />
            </View>}

            {scanned && !isLoading && (
                <TouchableOpacity style={styles.rescanButton} onPress={() => setScanned(false)}>
                    <Text style={styles.rescanButtonText}>Escanear de nuevo</Text>
                </TouchableOpacity>
            )}
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
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    rescanButton: {
        position: 'absolute',
        bottom: 50,
        left: 50,
        right: 50,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 20,
        alignItems: 'center',
    },

    rescanButtonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
});