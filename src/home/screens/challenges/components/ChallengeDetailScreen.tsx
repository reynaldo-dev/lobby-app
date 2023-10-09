import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
    AlertDialog,
    Button,
    Center,
    Divider,
    HStack,
    ScrollView,
    Text,
    VStack,
    useDisclose
} from "native-base";
import React from "react";
import { RootStackParamList } from '../../../../routing/navigation-types';
import Layout from '../../../../shared/layout/Layout';
import { theme } from '../../../../theme';


export const ChallengeDetailScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const cancelRef = React.useRef(null);

    const handleEnroll = () => {
        console.log('Inscribirse en el reto');
        onClose();
    };

    const handleButtonPress = () => {
        onOpen();
    };


    const route = useRoute<RouteProp<RootStackParamList, 'ChallengeDetail'>>();
    const { challenge } = route.params;

    const handlePress = () => {
        // handle your press events
    };

    const getChallengeDateFormatted = (date: string) => {
        const dateObject = new Date(date);
        const dayNumber = dateObject.toLocaleDateString("es-ES", { day: "numeric" });
        const month = dateObject.toLocaleDateString("es-ES", { month: "long" });
        const year = dateObject.toLocaleDateString("es-ES", { year: "numeric" });

        return `${dayNumber} de ${month} de ${year}`;
    };

    return (
        <Layout showCredits={false}>
            <ScrollView
                flex={1}
                backgroundColor={theme.colors.background}
                p={4}
            >
                <Text
                    bold
                    color={theme.colors.black}
                    fontSize="2xl"
                    textAlign="center"
                    mb={4}
                    textTransform={"capitalize"}
                >
                    {challenge.title}
                </Text>
                <Center mb={4}>
                    <Button
                        width={"50%"}
                        onPress={handleButtonPress}
                        backgroundColor={theme.colors.secondary}
                        style={{ borderRadius: 50 }}
                    >
                        Participar en el Reto
                    </Button>
                </Center>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialog.Content>
                        <AlertDialog.Header>Confirmar Acción</AlertDialog.Header>
                        <AlertDialog.Body>
                            ¿Estás seguro que quieres inscribirte en este reto?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button
                                ref={cancelRef}
                                onPress={onClose}
                                colorScheme="red"
                                mr={3}
                                _text={{ color: "white" }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onPress={handleEnroll}
                                colorScheme="green"
                                _text={{ color: "white" }}
                            >
                                Confirmar
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>

                <Center>
                    <Text color="coolGray.600" mb={4}>
                        {challenge.description}
                    </Text>
                </Center>
                <VStack space={4} mb={4}>
                    <HStack space={2}>
                        <FontAwesome name="calendar" size={20} color="gray" />
                        <Text color="muted.500">
                            Desde: {getChallengeDateFormatted(challenge.initialDate)}
                        </Text>
                    </HStack>
                    <Divider />
                    <HStack space={2}>
                        <FontAwesome name="calendar" size={20} color="gray" />
                        <Text color="muted.500">
                            Hasta: {getChallengeDateFormatted(challenge.endDate)}
                        </Text>
                    </HStack>

                    <Divider />
                    <HStack space={2}>
                        <FontAwesome name="ticket" size={20} color="gray" />
                        <Text color="muted.500">
                            Cupones: {challenge.coupons} / {challenge.availableCoupons}
                        </Text>
                    </HStack>
                    <Divider />
                    <HStack space={2}>
                        <FontAwesome5 name="coins" color="gray" size={20} />
                        <Text color="muted.500">
                            Créditos: {challenge.credits}
                        </Text>
                    </HStack>
                    <Divider />
                    <HStack space={2}>
                        <MaterialIcons name="category" size={20} color="gray" />
                        <Text color="muted.500">
                            Categoría: {challenge.category.name}
                        </Text>
                    </HStack>
                </VStack>
            </ScrollView>
        </Layout>
    );
};
