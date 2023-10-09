import { FontAwesome5 } from '@expo/vector-icons';
import { Badge, Box, HStack, Icon, StatusBar, Text, View } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isDarkColor } from "../../helpers/isDarkColor";

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  showCredits?: boolean;
}

export default function Layout({ children, backgroundColor, showCredits = true }: LayoutProps) {
  const insets = useSafeAreaInsets();

  const barStyle = isDarkColor(backgroundColor) ? "light-content" : "dark-content";

  return (
    <View
      style={
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }
      }

      backgroundColor={backgroundColor}>
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
      {
        showCredits &&
        <Box w={"95%"} borderRadius={"full"} alignSelf={"center"} mx={4} padding={2}>
          <Badge colorScheme="green" borderRadius="full" bg="#F59E0B"  >
            <HStack space={2} alignItems="center">
              <Icon as={FontAwesome5} name="coins" color="white" size={5} />
              <Text color="white" bold fontSize={30}>10 créditos</Text>
            </HStack>
          </Badge>
        </Box>
      }
      {children}
    </View>
  );
}

