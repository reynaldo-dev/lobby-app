import React from "react";
import { IEvent } from "../../../../../redux/services/community/interfaces/community-response.interface";
import { Badge, Box, Card, IconButton, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../../theme";

interface Props {
  event: IEvent;
}

export default function EventCommunityCard({ event }: Props) {
  return (
    <Box
      borderColor={theme.colors.muted["300"]}
      borderWidth={1}
      borderRadius={10}
      w="100%"
      my={2}
      h={150}
      position="relative"
    >
      <Box p={3} justifyContent="space-between" flex={1}>
        <Box flexDir="row" justifyContent="space-between" position="relative">
          <Text
            fontSize="md"
            w="50%"
            fontWeight="bold"
            mb={2}
            numberOfLines={2}
          >
            {event.title}
          </Text>
          <Box
            flexDirection="row"
            alignItems="center"
            position="absolute"
            top={0}
            right={0}
          >
            <Badge
              bg={
                event.status === "Activo"
                  ? theme.colors.success
                  : theme.colors.danger
              }
              mr={1}
              borderRadius="full"
            >
              <Text
                justifyContent="center"
                alignItems="center"
                flexDir="row"
                fontSize="xs"
                color={theme.colors.white}
              >
                {event.status}
                <Ionicons
                  name={
                    event.status === "Activo"
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  color={theme.colors.white}
                />
              </Text>
            </Badge>
          </Box>
        </Box>

        <Text fontSize="xs" mb={2}>
          {event.description}
        </Text>
      </Box>
    </Box>
  );
}
