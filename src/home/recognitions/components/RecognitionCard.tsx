import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Spinner,
  Text,
  VStack,
  useTheme,
} from "native-base";
import React from "react";
import avatarImage from "../../../../assets/avatar.png";
import { RootStackParamList } from "../../../routing/navigation-types";
import {
  useGetCurrentLeagueQuery,
  useGetCurrentRecognitionsCountQuery,
} from "../../../redux/services/user/user.service";
import { RootState, useAppSelector } from "../../../redux/store/store";
import { theme } from "../../../theme";

type RecognitionCardProps = {
  name: string | undefined;
  lastName?: string | undefined;
  score: number;
  imageSource?: any;
};

export const RecognitionCard = ({
  name,
  lastName,
  imageSource = avatarImage,
  score,
}: RecognitionCardProps) => {
  const { colors } = useTheme();
  const { user } = useAppSelector((state: RootState) => state.user);
  const { data, isLoading } = useGetCurrentRecognitionsCountQuery(
    user?.id as string
  );
  const { data: league, isLoading: leagueIsLoading } = useGetCurrentLeagueQuery(
    user?.id as string
  );

  const firstName = name?.split(" ")[0];
  const firstLastName = lastName?.split(" ")[0];

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressRecognitions = () => {
    navigation.navigate("MyRecognitions");
  };

  return (
    <Pressable onPress={onPressRecognitions}>
      {({ isPressed }) => (
        <Box
          width="95%"
          borderRadius="lg"
          alignSelf="center"
          padding={4}
          borderColor="darkGray"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor={isPressed ? colors.primary[50] : colors.white}
          shadow={2}
          style={{ transform: [{ scale: isPressed ? 0.98 : 1 }] }}
        >
          <HStack space={4}>
            <VStack space={2} alignItems="center" maxW={"40%"}>
              <Text
                fontWeight="bold"
                fontSize={"16"}
                textTransform={"capitalize"}
              >
                {firstName} {firstLastName}
              </Text>
              <Image
                source={imageSource}
                alt={"imagen del usuario"}
                size={"xl"}
                borderRadius="full"
              />
              <Box
                mt={2}
                backgroundColor={
                  league ? league.league.color : theme.colors.primary
                }
                px={2}
                py={1}
                borderRadius="sm"
                w={"100%"}
              >
                {leagueIsLoading && <Spinner color="white" />}
                {league && (
                  <Text
                    fontSize={"16"}
                    fontWeight="bold"
                    color="white"
                    textAlign={"center"}
                  >
                    {league.league.name}
                  </Text>
                )}
              </Box>
            </VStack>

            <VStack flex={1}>
              <Box flexGrow={1} justifyContent="center" alignItems="center">
                <VStack alignItems="center">
                  <Text fontWeight="bold" fontSize="2xl">
                    Haz acumulado
                  </Text>

                  {isLoading && <Spinner color="primary" />}

                  {data && data.recognitionsReceivedCount && (
                    <HStack space={2} alignItems="center">
                      <Text fontWeight="bold" fontSize="3xl">
                        {data.recognitionsReceivedCount}
                      </Text>
                      <Icon
                        as={AntDesign}
                        name="star"
                        size={8}
                        color="primary"
                      />
                    </HStack>
                  )}

                  <Text fontWeight="bold" fontSize="2xl">
                    reconocimientos
                  </Text>
                </VStack>
              </Box>

              <Box mt="auto">
                <HStack justifyContent={"flex-end"}>
                  <Text fontWeight="semibold" fontSize={"sm"}>
                    Presiona aquí para leerlos
                  </Text>
                  <Icon
                    as={Entypo}
                    name="chevron-thin-right"
                    size={4}
                    color="darkGray"
                  />
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
};
