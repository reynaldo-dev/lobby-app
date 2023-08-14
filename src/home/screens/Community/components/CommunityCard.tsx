import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Box, HStack, Heading, Pressable, Stack, Text } from "native-base";
import { IUserCommunity } from "../../../../interfaces/community.interface";
import { useGetCountMembersQuery } from "../../../../redux/services/community/communities.service";
import { RootStackParamList } from "../../../../routing/navigation-types";
import { theme } from "../../../../theme";

type DimensionProp = number | string | (number | string)[];
type Props = {
  data: IUserCommunity;
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
    navigation.navigate("Community", { id: data?.community?.id });
  };


  const { data: communityData } = useGetCountMembersQuery(data?.community?.id);
  console.log(data?.community?.id)
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
              <Box w={"100%"} h="100%" backgroundColor={data?.community?.color}></Box>
            </Box>
            <Stack p="4" space={[3, 3, 1.5]} justifyContent="space-around">
              <Stack>
                <Heading size="md" ml="-1">
                  {data?.community?.name}
                </Heading>
              </Stack>
              <Text fontWeight="400">{data?.community?.description}</Text>
              <HStack alignItems="center" justifyContent="flex-end">
                <Box bgColor={data?.community?.color} p={2.5} rounded={"full"}>
                  {communityData?.totalMembers === 0 ? (
                    <Text color="white" fontSize="xs" fontWeight="bold">
                      Aún no hay miembros
                    </Text>
                  ) : (
                    <Text color="white" fontSize="xs" fontWeight="bold">
                      {communityData?.totalMembers} miembros
                    </Text>
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
