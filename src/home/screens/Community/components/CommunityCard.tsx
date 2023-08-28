import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  Stack,
  Text,
} from "native-base";
import {
  ICommunity,
  IUserCommunity,
} from "../../../../interfaces/community.interface";
import { useGetCountMembersQuery } from "../../../../redux/services/community/communities.service";
import { RootStackParamList } from "../../../../routing/navigation-types";
import { theme } from "../../../../theme";
import { Feather } from "@expo/vector-icons";

type DimensionProp = number | string | (number | string)[];
type Props = {
  data: ICommunity;
  widthCard: DimensionProp;
  heightCard: DimensionProp;
  marginTop?: number;
  marginRight?: number;
};

const CommunityCard = ({
  data,
  widthCard,
  heightCard,
  marginTop = 0,
  marginRight = 0,
}: Props) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Community">>();
  const onPress = () => {
    navigation.navigate("Community", { id: data?.id });
  };

  const { data: communityData } = useGetCountMembersQuery(data?.id);
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <Box
          style={{
            marginRight: marginRight,
            marginBottom: marginTop,
            marginTop: marginTop,
            transform: [{ scale: isPressed ? 0.96 : 1 }],
          }}
          width={widthCard}
          height={heightCard}
        >
          <Stack
            direction={"column"}
            rounded="lg"
            alignSelf="center"
            overflow="hidden"
            width={widthCard}
            height={heightCard}
            backgroundColor={theme.colors.white}
          >
            <Box w={"100%"} h={"20%"}>
              <Box w={"100%"} h="100%" backgroundColor={data?.color}></Box>
            </Box>
            <Stack p="4" space={[3, 3, 1.5]} justifyContent="space-around">
              <Stack>
                <Heading size="md" ml="-1">
                  {data?.name}
                </Heading>
              </Stack>
              <Text fontWeight="400" color={theme.colors.muted[500]} numberOfLines={2}>
                {data?.description}
              </Text>
              <HStack alignItems="center" justifyContent="flex-end">
                <Box bgColor={data?.color} p={2.5} rounded={"full"}>
                  {communityData?.totalMembers === 0 ? (
                    <Text color="white" fontSize="xs" fontWeight="bold">
                      Aún no hay miembros
                    </Text>
                  ) : (
                    <Box
                      flexDir="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text
                        color="white"
                        fontSize="xs"
                        mr={2}
                        fontWeight="bold"
                      >
                        {communityData?.totalMembers}
                      </Text>
                      <Icon
                        as={<Feather name="users" />}
                        color="white"
                        size="xs"
                      />
                    </Box>
                  )}
                </Box>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      )}
    </Pressable>
  );
};

export default CommunityCard;
