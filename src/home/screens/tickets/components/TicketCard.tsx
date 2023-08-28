import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Badge, HStack, Heading, Pressable, Text, VStack } from "native-base";
import React from "react";
import { formatDate } from "../../../../helpers/DateFormat";
import {
  Event,
  User,
} from "../../../../redux/services/assistanceTicket/interfaces/assistanceTicket.interface";
import { IConsumable } from "../../../../redux/services/consumableTicket/interfaces/consumablesTickets.interface";
import { RootStackParamList } from "../../../../routing/navigation-types";
import { theme } from "../../../../theme";

type TicketCardProps = {
  event: Event;
  user: User;
  isActive: boolean;
  consumable?: IConsumable;
  ticketId?: string
  userId?: string
};

export const TicketCard = ({
  event,
  user,
  isActive,
  consumable,
  ticketId,
  userId
}: TicketCardProps) => {


  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (consumable) {
      navigation.navigate("TicketConsumableDetail", {
        event,
        user,
        isActive,
        consumable,
        ticketId,
        userId
      });
    } else {
      navigation.navigate("TicketAssistanceDetail", {
        event,
        user,
        isActive,
      });
    }
  };

  const formattedDate = formatDate(event?.dateTime);

  return (
    <Pressable
      backgroundColor={theme.colors.white}
      rounded="lg"
      width="90%"
      mx="auto"
      my={3}
      onPress={handlePress}
      disabled={!isActive}
      _disabled={{
        opacity: 0.7,
      }}
    >
      <VStack space={2} p={4}>
        <HStack space={2} justifyContent="space-between">
          <Heading size="sm" ml={-1}>
            {event?.title}
          </Heading>
          <Badge colorScheme={isActive ? "green" : "red"}>
            {isActive ? "Activo" : "Inactivo"}
          </Badge>
        </HStack>
        <Text color="gray.500">
          {user?.name} {user?.lastname}
        </Text>
        {consumable && <Text color="gray.500">{consumable?.name}</Text>}
        <HStack justifyContent={"space-between"}>
          <Text color="gray.500">{event?.place}</Text>
          <Text color="gray.500">{formattedDate}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};
