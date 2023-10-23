import { Avatar, Badge, Box, HStack, Text, VStack } from 'native-base';
import React from 'react';
import defaultAvatar from '../../../assets/avatar.png';
import { IRanking, IRankingHistoric } from '../interfaces/league.interfaces';
import { theme } from '../../theme';

interface UserCardProps {
     user: IRankingHistoric | IRanking;
     index: number;
}

export const RankingCard = ({ user, index }: UserCardProps) => {
     const backgroundColors = ['gold', 'silver', '#cd7f32', 'white'];
     const backgroundColor = backgroundColors[index] || 'white';

     const totalRecognitions =
          'recognitionsReceivedCount' in user
               ? user.recognitionsReceivedCount
               : user.total;

     return (
          <Box
               width="90%"
               alignSelf="center"
               borderRadius="lg"
               p={4}
               mb={4}
               backgroundColor={theme.colors.background}
          >
               <HStack space={3} alignItems="center">
                    <Text fontSize="md" bold>
                         {index + 1}
                    </Text>
                    {user.picture ? (
                         <Avatar source={{ uri: user.picture }} />
                    ) : (
                         <Avatar source={defaultAvatar} />
                    )}
                    <HStack width="50%" space={2}>
                         <VStack>
                              <Text
                                   fontSize="sm"
                                   bold
                                   isTruncated
                                   textTransform={'capitalize'}
                              >{`${user.name} ${user.lastname}`}</Text>
                              <Text>Reconocimientos: {totalRecognitions}</Text>
                         </VStack>
                         {user.league && (
                              <Text color={theme.colors.primary}>
                                   {user.league.name}
                              </Text>
                         )}
                    </HStack>
               </HStack>
          </Box>
     );
};
