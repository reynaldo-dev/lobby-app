import { Box, VStack, HStack, Heading, Badge, Text, Pressable } from "native-base";
import React from "react";
import { formatDate } from "../../../../helpers/DateFormat";

type Props = {
    title: string;
    isActive: boolean;
    name: string;
    lastname: string;
    place: string;
    date: Date;
}

export const TicketCard = ({ title, isActive, name, lastname, place, date }: Props) => {
    const formattedDate = formatDate(date);
    return (
        <Pressable bg='white' shadow={1} rounded='lg' width='90%' mx='auto' my={3}>
            <VStack space={2} p={4}>
                <HStack space={2} justifyContent='space-between'>
                    <Heading size='sm' ml={-1}>
                        {title}
                    </Heading>
                    <Badge colorScheme={isActive ? 'green' : 'red'}>
                        {isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                </HStack>
                <Text color='gray.500'>
                    {name} {lastname}
                </Text>
                <HStack justifyContent={"space-between"}>
                    <Text color='gray.500'>
                        {place}
                    </Text>
                    <Text color='gray.500'>
                        {formattedDate}
                    </Text>
                </HStack>
            </VStack>
        </Pressable>
    );
};
