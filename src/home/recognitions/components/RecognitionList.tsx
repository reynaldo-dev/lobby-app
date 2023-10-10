import { MaterialIcons } from '@expo/vector-icons';
import {
    Avatar,
    Box,
    Center,
    FlatList,
    HStack,
    Icon,
    Pressable,
    Spacer,
    Spinner,
    Text,
    VStack
} from 'native-base';
import React from 'react';
import avatarImage from "../../../../assets/avatar.png";
import { IRecognition, IUserRecognition } from '../../../redux/services/recognitions/interfaces/recognitions.interface';
import { useGetGivenRecognitionsQuery, useGetReceivedRecognitionsQuery } from "../../../redux/services/recognitions/recognitions.service";
import { RootState, useAppSelector } from '../../../redux/store/store';

interface RecognitionListProps {
    type: 'all' | 'received' | 'given';
}

const RecognitionList = ({ type }: RecognitionListProps) => {

    const { user } = useAppSelector((state: RootState) => state.user);

    const { data: receivedRecognitions, error: errorReceived, isLoading: isReceivedLoading } = useGetReceivedRecognitionsQuery(user?.id || '');
    const { data: givenRecognitions, error: errorGiven, isLoading: isGivenLoading } = useGetGivenRecognitionsQuery(user?.id || '');

    let recognitions: IRecognition[] = [];
    if (type === 'received' && receivedRecognitions) {
        recognitions = receivedRecognitions;
    } else if (type === 'given' && givenRecognitions) {
        recognitions = givenRecognitions;
    } else if (type === 'all' && receivedRecognitions && givenRecognitions) {
        recognitions = [...receivedRecognitions, ...givenRecognitions];
    }

    const getDisplayUser = (recognition: IRecognition): IUserRecognition => {
        if (type === 'received') return recognition.userSource;
        if (type === 'given') return recognition.userTarget;

        if (recognition.userSourceId === user?.id) return recognition.userTarget;
        return recognition.userSource;
    };

    const getIconForRecognition = (recognition: IRecognition) => {
        if (type === 'all') {
            return recognition.userSourceId === user?.id ? 'arrow-upward' : 'arrow-downward';
        }
        if (type === 'given') return 'arrow-upward';
        return 'arrow-downward';
    };

    if (isReceivedLoading || isGivenLoading) {
        return (
            <Center flex={1}>
                <Spinner color="blue.500" />
            </Center>
        );
    }

    const renderItem = ({ item: recognition }: { item: IRecognition }) => {
        const displayUser = getDisplayUser(recognition);

        return (
            <Box key={recognition.id} width={"95%"}>
                <Pressable onPress={() => { }}>
                    {({ isPressed }) => (
                        <VStack
                            pl="4"
                            py="3"
                            space={5}
                            style={{ transform: [{ scale: isPressed ? 0.98 : 1 }] }}
                        >
                            <HStack alignItems="center" space={2}>
                                <Avatar size="48px" source={displayUser.picture ? { uri: displayUser.picture } : avatarImage} />
                                <VStack alignItems="flex-start" flex={1}>
                                    <HStack space={1} width="100%">
                                        <Text bold textTransform={"capitalize"}>{displayUser.name} {displayUser.lastname}</Text>
                                        <Spacer />
                                        <Icon as={MaterialIcons} name={getIconForRecognition(recognition)} size={5} />
                                    </HStack>
                                    <Box maxWidth="95%">
                                        <Text numberOfLines={3} >{recognition.description}</Text>
                                    </Box>
                                </VStack>
                            </HStack>
                        </VStack>
                    )}
                </Pressable>
            </Box>
        );
    };

    return (
        <FlatList
            data={recognitions}
            renderItem={renderItem}
            keyExtractor={(recognition) => recognition.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <Center flex={1}>
                    <Text fontSize="lg" fontWeight="bold">No hay reconocimientos para mostrar</Text>
                </Center>
            }
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: recognitions.length === 0 ? 'center' : 'flex-start'
            }}
        />
    );
}

export default RecognitionList;
