import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Badge, HStack, Pressable, Text, VStack, theme } from 'native-base';
import React from 'react';
import { formatDate } from '../../../../helpers/DateFormat';
import { Challenge } from '../../../../redux/services/challenges/interfaces/challenges.interfaces';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../routing/navigation-types';

export interface ChallengeCardProps {
    challenge: Challenge;
}

export const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, "ChallengeDetail">>();


    const handlePress = () => {
        navigation.navigate('ChallengeDetail', { challenge: challenge });
    };

    return (
        <Pressable
            backgroundColor={theme.colors.white}
            rounded="lg"
            width="90%"
            mx="auto"
            my={3}
            onPress={handlePress}
            _pressed={{
                backgroundColor: theme.colors.coolGray[200],
            }}
        >
            <VStack space={4} p={4}>
                <HStack space={2} justifyContent="space-between">
                    <Text fontSize="lg" fontWeight="bold" ml={-1} flex={1} isTruncated textTransform={"capitalize"}>
                        {challenge.title}
                    </Text>
                    <Badge backgroundColor="primary.200" color="primary.900">
                        {challenge.category.name}
                    </Badge>
                </HStack>
                <Text color="coolGray.600" isTruncated numberOfLines={2}>
                    {challenge.description}
                </Text>
                <HStack>
                    <VStack space={2}>
                        <HStack space={2}>
                            <FontAwesome name="calendar" size={20} color="gray" />
                            <Text color="muted.500">
                                Desde: {formatDate(challenge.initialDate)}
                            </Text>
                        </HStack>
                        <HStack space={2}>
                            <FontAwesome name="calendar" size={20} color="gray" />
                            <Text color="muted.500">
                                Hasta: {formatDate(challenge.endDate)}
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>

                <VStack space={2}>
                    <HStack space={2}>
                        <FontAwesome name="ticket" size={20} color="gray" />
                        <Text color="muted.500">
                            Cupones disponibles: {challenge.availableCoupons} / {challenge.coupons}
                        </Text>
                    </HStack>

                    <HStack space={2}>
                        <FontAwesome5 name="coins" color="gray" size={20} />
                        <Text color="muted.500">
                            Créditos: {challenge.credits}
                        </Text>
                    </HStack>
                </VStack>

            </VStack>
        </Pressable>
    );
};
