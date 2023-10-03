import { AntDesign, Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Box, HStack, Icon, Image, Pressable, Spacer, Text, VStack, useTheme } from "native-base";
import React from "react";
import avatarImage from "../../../../assets/avatar.png";
import { RootStackParamList } from "../../../routing/navigation-types";
import { RootState, useAppSelector } from "../../../redux/store/store";
import { useGetReceivedRecognitionsQuery, useGetGivenRecognitionsQuery } from "../../../redux/services/recognitions/recognitions.service";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RecognitionCardProps = {
    name: string | undefined;
    lastName?: string | undefined;
    score: number;
    imageSource?: any;
}

export const RecognitionCard = ({ name, lastName, imageSource = avatarImage, score }: RecognitionCardProps) => {
    const { colors } = useTheme();
    const { user } = useAppSelector((state: RootState) => state.user);

    const { data: receivedRecognitions, error: errorReceived } = useGetReceivedRecognitionsQuery(user?.id || '');
    const { data: givenRecognitions, error: errorGiven } = useGetGivenRecognitionsQuery(user?.id || '');

    const firstName = name?.split(' ')[0];
    const firstLastName = lastName?.split(' ')[0];


    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onPressRecognitions = () => {
        if (receivedRecognitions && givenRecognitions) {
            navigation.navigate("MyRecognitions", {
                recognitions: [...receivedRecognitions, ...givenRecognitions]
            });
        } else {
            console.log("Waiting for data...");
        }
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
                        <VStack space={2} alignItems="center">
                            <Text fontWeight="bold" fontSize={"16"}>{firstName} {firstLastName}</Text>
                            <Image
                                source={imageSource}
                                alt={"imagen del usuario"}
                                size={"lg"}
                                borderRadius="full"
                            />
                            <Box mt={2} backgroundColor="darkgrey" px={2} py={1} borderRadius="sm" w={"100%"}>
                                <Text fontSize={"16"} fontWeight="bold" color="white" textAlign={"center"}>Águila</Text>
                            </Box>
                        </VStack>

                        <VStack flex={1}>
                            <Box flexGrow={1} justifyContent="center" alignItems="center">
                                <HStack space={2} alignItems="center">
                                    <Text fontWeight="bold" fontSize="xl">Haz acumulado 100 reconocimientos</Text>
                                    <Icon
                                        as={AntDesign}
                                        name="star"
                                        size={8}
                                        color="primary"
                                    />
                                </HStack>
                            </Box>
                            <Box mt="auto">
                                <HStack justifyContent={"flex-end"} >
                                    <Text fontWeight="semibold" fontSize={"sm"}>Presiona aquí para leerlos</Text>
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
}
