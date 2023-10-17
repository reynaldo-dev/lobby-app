import { Avatar, Badge, Box, HStack, Text, VStack } from "native-base";
import React from "react";
import defaultAvatar from "../../../assets/avatar.png";
import { IRanking, IRankingHistoric } from "../interfaces/league.interfaces";

interface UserCardProps {
  user: IRankingHistoric | IRanking;
  index: number;
}

export const RankingCard: React.FC<UserCardProps> = ({ user, index }) => {
  const getBackgroundColor = (index: number) => {
    switch (index) {
      case 0:
        return "gold";
      case 1:
        return "silver";
      case 2:
        return "#cd7f32";
      default:
        return "white";
    }
  };

  const totalRecognitions = 'recognitionsReceivedCount' in user ? user.recognitionsReceivedCount : user.total;

  return (
    <Box
      width="90%"
      alignSelf="center"
      borderWidth={1}
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
          <VStack>
            <Text fontSize="sm" bold isTruncated textTransform={"capitalize"}>{`${user.name} ${user.lastname}`}</Text>
            <Text>Reconocimientos: {totalRecognitions}</Text>
          </VStack>
          {user.league && (
            <Badge minW={"20%"} h={"50%"} backgroundColor={user.league.color}>{user.league.name}</Badge>
          )}
          {/* <Text fontSize="sm">{totalRecognitions}</Text> */}
        </HStack>
      </HStack>
    </Box>
  );
};