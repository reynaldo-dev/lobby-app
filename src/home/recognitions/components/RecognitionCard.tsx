import { AntDesign, Entypo } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Box, HStack, Icon, Image, Pressable, Text, VStack, useTheme } from "native-base";
import React from "react";
import avatarImage from "../../../../assets/avatar.png";
import { RootStackParamList } from "../../../routing/navigation-types";

type RecognitionCardProps = {
    name: string | undefined;
    lastName?: string | undefined;
    score: number;
    imageSource?: any;
}

export const RecognitionCard = ({ name, lastName, imageSource = avatarImage, score }: RecognitionCardProps) => {
    const { colors } = useTheme();

    const navigation =
        useNavigation<NavigationProp<RootStackParamList, "SendRecognition">>();
    const onPress = () => {
        // navigation.navigate("Recognitions");
        console.log("pressed")
    };

    return (
        <Pressable onPress={onPress}>
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
                        <Image
                            source={imageSource}
                            alt={"imagen del usuario"}
                            size={"sm"}
                            borderRadius="full"
                        />

                        <VStack flex={1} space={2} justifyContent="center">
                            <Text fontWeight="bold" fontSize="lg">Bienvenido de nuevo {name} {lastName}</Text>
                            <HStack alignItems="center" space={2} justifyContent={"flex-end"} >
                                <HStack space={1}>
                                    <Icon
                                        as={AntDesign}
                                        name="star"
                                        size={6}
                                        color="primary"
                                    />
                                    <Text fontWeight="semibold" fontSize={"lg"}>{score}</Text>
                                </HStack>
                                <HStack space={2} alignItems={"center"}>
                                    <Text fontWeight="semibold" fontSize={"sm"}>Mis reconomientos</Text>
                                    <Icon
                                        as={Entypo}
                                        name="chevron-thin-right"
                                        size={4}
                                        color="darkGray"
                                    />
                                </HStack>

                            </HStack>
                        </VStack>
                    </HStack>
                </Box>
            )}
        </Pressable>
    );
}
