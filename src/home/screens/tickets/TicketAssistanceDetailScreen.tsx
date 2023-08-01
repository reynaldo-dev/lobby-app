import { Box, VStack, HStack, Heading, Text, Badge, Divider } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../routing/navigation-types';
import { formatDate } from '../../../helpers/DateFormat';

export const TicketAssistanceDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'TicketAssistanceDetail'>>();
    const { event, user, isActive } = route.params;
    const formattedDate = formatDate(event?.dateTime);

    const qrData = JSON.stringify({
        title: event?.title,
        dateTime: formattedDate,
        owner: `${user?.name} ${user?.lastname}`,
        isActive
    });

    return (
        <Box safeArea flex={1} p="2" w="100%" mx="auto" bg='white' justifyContent='center'>
            <Box position='absolute' top={0} left={0} p={2}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
            </Box>

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
            </Box>
        </Box>
    );
};
