// UserCard.tsx
import React from 'react';
import { Avatar, Badge, Box, HStack, Text } from 'native-base';
import defaultAvatar from '../../../../../assets/avatar.png';
import { IRanking } from '../../../../redux/services/leagues/interfaces/league.interfaces';

interface UserCardProps {
    user: IRanking;
    index: number;
}

export const RankingCard: React.FC<UserCardProps> = ({ user, index }) => {
    const getBackgroundColor = (index: number) => {
        switch (index) {
            case 0:
                return 'gold';
            case 1:
                return 'silver';
            case 2:
                return '#cd7f32';
            default:
                return 'white';
        }
    };

    return (
        <Box
            width="90%"
            alignSelf="center"
            borderWidth={1}
            borderColor={user.league?.color ?? 'coolGray.200'}
            borderRadius="lg"
            p={4}
            mb={4}
            backgroundColor={getBackgroundColor(index)}
        >
            <HStack space={3} alignItems="center">
                <Text fontSize="md" bold>{index + 1}</Text>
                {user.picture ? (
                    <Avatar source={{ uri: user.picture }} />
                ) : (
                    <Avatar source={defaultAvatar} />
                )}
                <HStack width="50%" space={2}>
                    <Text fontSize="sm" bold isTruncated textTransform={"capitalize"}>{`${user.name} ${user.lastname}`}</Text>
                    {user.league && (
                        <Badge minW={"20%"} backgroundColor={user.league.color}>{user.league.name}</Badge>
                    )}
                </HStack>
            </HStack>
        </Box>
    );
};
