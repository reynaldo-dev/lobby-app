import { Alert, Box, CloseIcon, HStack, IconButton, Text, VStack } from "native-base";
import { useState } from "react";
import { Animated } from "react-native";

type Props = {
    title: string;
    description: string;
    place: string;
    time: string;
}

export const CustomAlert = ({ title, description, place, time }: Props) => {

    const [showAlert, setShowAlert] = useState(true);
    const animatedValue = useState(new Animated.Value(1))[0];

    const handlePress = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start(() => setShowAlert(false));
    }

    if (!showAlert) {
        return null;
    }

    return (
        <Animated.View style={{ opacity: animatedValue, transform: [{ scale: animatedValue }] }}>
            <Box shadow="1"
                mt={5}
                rounded="sm"
                alignSelf="center"
                w={"90%"}
                backgroundColor="white" >
                <Alert maxW="400" status="info" colorScheme="primary">
                    <VStack space={2} flexShrink={1} w="100%" >
                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" color="primary">
                                    {title}
                                </Text>
                            </HStack>
                            <IconButton variant="unstyled" icon={<CloseIcon size="3" />} onPress={handlePress} />
                        </HStack>
                        <Box pl="6">
                            {description}
                            <Text>Hora: {time}</Text>
                            <Text>Lugar: {place}</Text>
                        </Box>
                    </VStack>
                </Alert>
            </Box>
        </Animated.View>
    )
}
