import React from "react";
import { GetCommunityByIDResponse } from "../../../../../redux/services/community/interfaces/community-response.interface";
import { Box, Text, View } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../../../../theme";

interface CommunityCoverProps {
  community: GetCommunityByIDResponse;
}

export default function CommunityCover({ community }: CommunityCoverProps) {
  return (
    <View bgColor={community?.color} h="15%">
      {/* <Icon
      onPress={() => console.log("back")}
      ml={2}
      mt={2}
      color={theme.colors.white}
      as={Ionicons}
      name="arrow-back-outline"
    /> */}
      <View h="full" bg={community.color} borderRadius={20} shadow={2}>
        <LinearGradient
          colors={[community.color, "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: 20,
          }}
        />
        <Box justifyContent="center" alignItems="center" h="full" p={4}>
          <Text bold fontSize="2xl" color={theme.colors.white}>
            {community.name}
          </Text>
          <Text
            fontSize="md"
            color={theme.colors.white}
            mt={2}
            numberOfLines={2}
          >
            {community.description}
          </Text>
        </Box>
      </View>
    </View>
  );
}
