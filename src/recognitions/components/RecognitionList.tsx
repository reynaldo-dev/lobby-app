import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Center,
  FlatList,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import avatarImage from "../../../assets/avatar.png";
import { useRefetchOnFocus } from "../../hooks/useRefetchOnFocus";
import {
  useGetGivenRecognitionsQuery,
  useGetReceivedRecognitionsQuery,
  useMarkRecognitionAsReadMutation,
} from "../../redux/services/recognitions.service";
import { RootState, useAppSelector } from "../../redux/store/store";
import { RootStackParamList } from "../../routing/navigation-types";
import {
  IRecognition,
  IUserRecognition,
} from "../interfaces/recognitions.interface";

interface RecognitionListProps {
  type: "received" | "given";
}

const RecognitionList = ({ type }: RecognitionListProps) => {
  const { user } = useAppSelector((state: RootState) => state.user);

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Recognitions">>();

  const {
    data: receivedRecognitions,
    isLoading: isReceivedLoading,
    refetch: refetchReceivedRecognitions,
  } = useGetReceivedRecognitionsQuery(user?.id || "");
  const { data: givenRecognitions, isLoading: isGivenLoading } =
    useGetGivenRecognitionsQuery(user?.id || "");
  const [markAsRead] = useMarkRecognitionAsReadMutation();
  useRefetchOnFocus(refetchReceivedRecognitions);

  let recognitions: IRecognition[] = [];
  if (type === "received" && receivedRecognitions) {
    recognitions = receivedRecognitions;
  } else if (type === "given" && givenRecognitions) {
    recognitions = givenRecognitions;
  }

  const getDisplayUser = (recognition: IRecognition): IUserRecognition => {
    if (type === "received") return recognition.userSource;
    return recognition.userTarget;
  };

  const getUnreadStyles = (recognition: IRecognition) => {
    let styles = {
      indicatorColor: "lightgray",
      backgroundColor: "transparent",
    };
    if (type === "received" && !recognition.isRead) {
      styles.indicatorColor = "red";
      styles.backgroundColor = "#e6e6e6";
    }
    return styles;
  };

  const handlePress = async (recognition: IRecognition) => {
    if (type === "received" && !recognition.isRead) {
      await markAsRead(recognition.id);
    }
    navigation.navigate("RecognitionDetails", { recognition });
  };

  const renderItem = ({ item: recognition }: { item: IRecognition }) => {
    const displayUser = getDisplayUser(recognition);
    const { indicatorColor, backgroundColor } = getUnreadStyles(recognition);

    return (
      <Box key={recognition.id} width={"95%"} alignSelf={"center"}>
        <Pressable
          onPress={() => handlePress(recognition)}
          style={{ backgroundColor: backgroundColor }}
        >
          {({ isPressed }) => (
            <VStack
              px={2}
              py="3"
              space={5}
              style={[{ transform: [{ scale: isPressed ? 0.98 : 1 }] }]}
            >
              <HStack alignItems="center" space={2}>
                {indicatorColor === "red" && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: "red",
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                    }}
                  />
                )}
                <Avatar
                  size="48px"
                  source={
                    displayUser.picture
                      ? { uri: displayUser.picture }
                      : avatarImage
                  }
                />
                <VStack alignItems="flex-start" flex={1}>
                  <HStack space={1} width="100%">
                    <Text bold textTransform={"capitalize"}>
                      {displayUser.name} {displayUser.lastname}
                    </Text>
                    <Spacer />
                    <Text fontSize="xs" color="gray.500">
                      {new Date(recognition.createdAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                  <Box maxWidth="95%">
                    <Text numberOfLines={3}>{recognition.description}</Text>
                  </Box>
                </VStack>
              </HStack>
            </VStack>
          )}
        </Pressable>
      </Box>
    );
  };

  return (
    <FlatList
      data={recognitions}
      renderItem={renderItem}
      keyExtractor={(recognition) => recognition.id}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Center flex={1}>
          <Text fontSize="lg" fontWeight="bold">
            No hay reconocimientos para mostrar
          </Text>
        </Center>
      }
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: recognitions.length === 0 ? "center" : "flex-start",
      }}
    />
  );
};

export default RecognitionList;
