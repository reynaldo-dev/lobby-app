import { Avatar, Box, Text, VStack, useBreakpointValue } from 'native-base';
import React from 'react';
import MaleAvatar from '../../../assets/male-avatar.svg';
import { theme } from '../../theme';
import { IRanking, IRankingHistoric } from '../interfaces/league.interfaces';

interface UserCardProps {
     user: IRankingHistoric | IRanking;
     index: number;
}

export const RankingCard = ({ user, index }: UserCardProps) => {
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
               backgroundColor={theme.colors.white}
               flexDirection="row"
               alignItems="center"
          >
               <Text
                    px={2}
                    alignSelf={'center'}
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
                    <MaleAvatar
                         width={iconResponsive}
                         height={iconResponsive}
                    />
               )}

               <VStack flex={1} mx={2}>
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
                    >
                         {`${user.name} ${user.lastname}`}
                    </Text>
                    <Text
                         fontSize={{
                              base: 'sm',
                              sm: 'md',
                              md: 'lg',
                              lg: 'lg',
                         }}
                    >
                         Reconocimientos: {totalRecognitions}
                    </Text>
               </VStack>

               {user.league && (
                    <Text
                         fontSize={{
                              base: 'sm',
                              sm: 'md',
                              md: 'xl',
                              lg: 'xl',
                         }}
                         color={theme.colors.primary}
                    >
                         {user.league.name}
                    </Text>
               )}
          </Box>
     );
};
