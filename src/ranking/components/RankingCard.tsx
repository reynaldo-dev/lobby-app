import { Avatar, Badge, Box, HStack, Text, VStack, useBreakpointValue } from 'native-base';
import React from 'react';
import { IRanking, IRankingHistoric } from '../interfaces/league.interfaces';
import { theme } from '../../theme';
import MaleAvatar from '../../../assets/male-avatar.svg';

interface UserCardProps {
     user: IRankingHistoric | IRanking;
     index: number;
}

export const RankingCard = ({ user, index }: UserCardProps) => {
     // const backgroundColors = ['gold', 'silver', '#cd7f32', 'white'];
     // const backgroundColor = backgroundColors[index] || 'white';

     const iconResponsive = useBreakpointValue({
          base: 45,
          sm: 45,
          md: 70,
          lg: 80,

     });

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
                    <Text
                         fontSize={{
                              base: 'sm',
                              sm: 'md',
                              md: 'xl',
                              lg: 'xl',
                         }}
                         bold
                    >
                         {index + 1}
                    </Text>
                    {user.picture ? (
                         <Avatar source={{ uri: user.picture }} />
                    ) : (
                         <MaleAvatar width={iconResponsive} height={iconResponsive} />
                    )}
                    <HStack width="50%" space={2}>
                         <VStack>
                              <Text
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'md',
                                        md: 'xl',
                                        lg: 'xl',
                                   }}
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
