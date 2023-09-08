import { Box, HStack, IconButton, VStack, Heading, Badge, Divider, Text } from "native-base"
import React from "react"
import { TouchableOpacity } from "react-native"
import Layout from "../../../../shared/layout/Layout"
import { AntDesign } from '@expo/vector-icons';
import SvgQRCode from 'react-native-qrcode-svg';
import { Event } from "../../../../redux/services/assistanceTicket/interfaces/assistanceTicket.interface";
import { User } from "../../../../interfaces/community.interface";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../routing/navigation-types";
import { formatDate } from "../../../../helpers/DateFormat";
import { Linking } from 'react-native';


type Props = {
    event: Event
    user: User
    isActive: boolean
    consumable: any
    qrCodeData: any
}

export const DetailScreen = ({ event, user, isActive, consumable, qrCodeData }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, "BarScanner">>();
    const formattedDate = formatDate(event?.dateTime);

    const onPress = () => {
        navigation.navigate("BarScanner");
    };

    const content = event.place && event.place !== '' ? event.place : event.link;

    const handleLinkPress = (url: string) => {
        if (url && url.startsWith('https://')) {
            Linking.openURL(url);
        }
    };

    return (
        <Layout>
            <Box safeArea flex={1} p="2" w="100%" mx="auto" bg='white' justifyContent='center'>
                <HStack position='absolute' top={0} left={0} p={2} space={3} justifyContent="space-between" width="100%">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    {
                        !consumable &&
                        <IconButton
                            icon={<AntDesign name="scan1" size={24} color="black" />}
                            onPress={onPress}
                        />
                    }
                </HStack>
                <VStack space={4} mt={5} alignItems="center">
                    <Heading size='lg' color='gray.700' mx={4}>
                        {event?.title}
                    </Heading>
                    <SvgQRCode value={qrCodeData} enableLinearGradient size={250} />
                    <Badge fontSize='lg' colorScheme={isActive ? 'green' : 'red'} variant="subtle" px={2}>
                        {isActive ? 'Disponible' : 'No Disponible'}
                    </Badge>
                    <Text fontSize='md' color='gray.600' mx={4}>
                        {event?.description}
                    </Text>
                </VStack>

                <Box bg='white' shadow={2} p={4} rounded='lg' mt={10}>
                    <HStack justifyContent='space-between' alignItems='center'>
                        {
                            content === event.link ? (
                                <>
                                    <Text fontSize='md' color='gray.600'>Enlace:</Text>
                                    <TouchableOpacity onPress={() => handleLinkPress(content)}>
                                        <Text fontSize='sm' color='blue.600'>
                                            {content}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <Text fontSize='md' color='gray.600'>Lugar:</Text>
                                    <Text fontSize='sm' color='muted.700' maxWidth={"80%"} isTruncated>
                                        {content}
                                    </Text>
                                </>
                            )
                        }
                    </HStack>
                    <Divider my={2} />
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Text fontSize='md' color='gray.600'>Fecha y Hora:</Text>
                        <Text fontSize='sm' color='muted.700'>{formattedDate}</Text>
                    </HStack>
                    <Divider my={2} />
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Text fontSize='md' color='gray.600'>Dueño del cupón:</Text>
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
        </Layout>
    )
}