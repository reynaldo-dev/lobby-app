import { Box, VStack, HStack, Heading, Badge, Text, Pressable } from "native-base";
import React from "react";
import { formatDate } from "../../../../helpers/DateFormat";
import { Event, User } from "../../../../redux/services/assistanceTicket/interfaces/assistanceTicket.interface";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../routing/navigation-types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type TicketCardProps = {
    event: Event
    user: User
    isActive: boolean
}

export const TicketCard = ({ event, user, isActive }: TicketCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'TicketAssistanceDetail'>>();

    const handlePress = () => {
        navigation.navigate("TicketAssistanceDetail", { event, user, isActive });
    };

    const formattedDate = formatDate(event?.dateTime);

    return (
        <Pressable bg='white' shadow={1} rounded='lg' width='90%' mx='auto' my={3} onPress={handlePress}>
            <VStack space={2} p={4}>
                <HStack space={2} justifyContent='space-between'>
                    <Heading size='sm' ml={-1}>
                        {event?.title}
                    </Heading>
                    <Badge colorScheme={isActive ? 'green' : 'red'}>
                        {isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                </HStack>
                <Text color='gray.500'>
                    {user?.name} {user?.lastname}
                </Text>
                <HStack justifyContent={"space-between"}>
                    <Text color='gray.500'>
                        {event?.place}
                    </Text>
                    <Text color='gray.500'>
                        {formattedDate}
                    </Text>
                </HStack>
            </VStack>
        </Pressable>
    );
};
