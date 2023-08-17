import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Badge, Box, Divider, HStack, Heading, IconButton, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import { formatDate } from '../../../helpers/DateFormat';
import { RootStackParamList } from '../../../routing/navigation-types';

export const TicketAssistanceDetailScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'TicketAssistanceDetail'>>();
    const { event, user, isActive, consumable } = route.params;
    const formattedDate = formatDate(event?.dateTime);

    const qrData = JSON.stringify({
        title: event?.title,
        dateTime: formattedDate,
        owner: `${user?.name} ${user?.lastname}`,
        isActive
    });

    const navigation = useNavigation<NavigationProp<RootStackParamList, "BarScanner">>();

    const onPress = () => {
        navigation.navigate("BarScanner");
    };

    return (
        <Box safeArea flex={1} p="2" w="100%" mx="auto" bg='white' justifyContent='center'>
            <HStack position='absolute' top={0} left={0} p={2} space={3} justifyContent="space-between" width="100%">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <IconButton
                    icon={<AntDesign name="scan1" size={24} color="black" />}
                    onPress={onPress}
                />
            </HStack>
            <VStack space={4} mt={5} alignItems="center">
                <Heading size='lg' color='gray.700'>
                    {event?.title}
                </Heading>
                <SvgQRCode value={qrData} enableLinearGradient size={250} />
                <Badge fontSize='lg' colorScheme={isActive ? 'green' : 'red'} variant="subtle" px={2}>
                    {isActive ? 'Disponible' : 'No Disponible'}
                </Badge>
                <Text fontSize='md' color='gray.600'>
                    {event?.description}
                </Text>
            </VStack>

            <Box bg='white' shadow={2} p={4} rounded='lg' mt={10}>
                <HStack justifyContent='space-between' alignItems='center'>
                    <Text fontSize='md' color='gray.600'>Ubicación:</Text>
                    <Text fontSize='sm' color='muted.700'>{event?.place}</Text>
                </HStack>
                <Divider my={2} />
                <HStack justifyContent='space-between' alignItems='center'>
                    <Text fontSize='md' color='gray.600'>Fecha y Hora:</Text>
                    <Text fontSize='sm' color='muted.700'>{formattedDate}</Text>
                </HStack>
                <Divider my={2} />
                <HStack justifyContent='space-between' alignItems='center'>
                    <Text fontSize='md' color='gray.600'>Dueño del Ticket:</Text>
                    <Text fontSize='sm' color='muted.700'>{`${user?.name} ${user?.lastname}`}</Text>
                </HStack>
                {
                    consumable!! &&
                    <>
                        <Divider my={2} />
                        <HStack justifyContent='space-between' alignItems='center'>
                            <Text fontSize='md' color='gray.600'>Consumible:</Text>
                            <Text fontSize='sm' color='muted.700'>{consumable.name}</Text>
                        </HStack>
                    </>
                }
            </Box>
        </Box>
    );
};
