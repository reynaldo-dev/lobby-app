import { Button, Icon, Text, VStack } from "native-base"
import Layout from "../../../shared/layout/Layout"
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routing/navigation-types";



export const HomeStaff = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, "BarScannerStaff">>();
    const onPress = () => {
        navigation.navigate('BarScannerStaff')
    }
    return (
        <Layout>
            <VStack space={4} alignItems="center" padding={5}>
                <Text fontSize="2xl">Escaneo de Códigos QR</Text>
                <Text color="gray.500" textAlign={"center"}>Escanee los códigos QR para validar cupones de consumibles.</Text>
                <Button
                    size="lg"
                    leftIcon={<AntDesign name="scan1" size={24} color="black" />}
                    onPress={onPress}
                >
                    Iniciar Escaneo
                </Button>
            </VStack>
        </Layout>
    );
}