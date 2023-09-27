import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { formatDate } from "../../../../helpers/DateFormat";
import { IGetMyEventsResponse } from "../../../../redux/services/events/interfaces/get-my-events";
import { RootStackParamList } from "../../../../routing/navigation-types";
import { theme } from "../../../../theme";
import { Entypo } from "@expo/vector-icons";

interface CardEventProps {
  data: IGetMyEventsResponse;
}

const CardEvent = ({ data }: CardEventProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Event">>();
  const eventDateTime = formatDate(data?.event.dateTime);

  return (
    <Pressable
      onPress={() => navigation.navigate("Event", { id: data?.event.id })}
      backgroundColor={theme.colors.white}
      w="95%"
      alignSelf="center"
      borderRadius={10}
      p={4}
      marginBottom={4}
    >
      <VStack>
        <Heading size="sm" color={theme.colors.muted[500]}>
          {data?.event.title}
        </Heading>
        <HStack mt={2} alignItems="center" space={2}>
          <Icon
            as={Entypo}
            name="calendar"
            size={4}
            color={theme.colors.secondary}
          />
          <Text color={theme.colors.secondary}>{eventDateTime}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default CardEvent;
