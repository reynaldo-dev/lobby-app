import {
  Alert,
  Box,
  Center,
  CloseIcon,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Animated } from "react-native";
import { theme } from "../../theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  description: string;
  place: string;
  time: string;
};

export const CustomAlert = ({ title, description, place, time }: Props) => {
  const [showAlert, setShowAlert] = useState(true);
  const animatedValue = useState(new Animated.Value(1))[0];

  const handlePress = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
  };

  if (!showAlert) {
    return null;
  }

  return (
    <Animated.View
      style={{ opacity: animatedValue, transform: [{ scale: animatedValue }] }}
    >
      <Box
        mt={5}
        borderRadius={10}
        alignSelf="center"
        w={"90%"}
        backgroundColor={theme.colors.white}
      >
        <Alert maxW="400" status="info" colorScheme="primary">
          <Box w="full">
            <Box w="full" flexDir="row" justifyContent="flex-end">
              <IconButton
                variant="unstyled"
                color={theme.colors.muted["400"]}
                icon={<CloseIcon size="3" />}
                onPress={handlePress}
              />
            </Box>

            <Center>
              <Text fontSize="md" fontWeight="medium" color="primary">
                {title}
              </Text>
              <Box mt={2} mx={2}>
                <Text color={theme.colors.muted["500"]}>{description}</Text>

                <Box flexDir="row" alignItems="center" mt={5}>
                  <Icon
                    as={AntDesign}
                    name="clockcircleo"
                    color={theme.colors.muted["500"]}
                  />
                  <Text ml={2} color={theme.colors.muted["500"]}>
                    {time}
                  </Text>
                </Box>

                <Box flexDir="row" alignItems="center" mt={1}>
                  <Icon
                    as={Ionicons}
                    name="location-outline"
                    color={theme.colors.muted["500"]}
                  />
                  <Text ml={2} color={theme.colors.muted["500"]}>
                    {place}
                  </Text>
                </Box>
              </Box>
            </Center>
          </Box>
        </Alert>
      </Box>
    </Animated.View>
  );
};
