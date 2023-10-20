import { FontAwesome5 } from "@expo/vector-icons";
import {
  Box,
  Icon,
  Spinner,
  StatusBar,
  Text,
  View
} from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isDarkColor } from "../../helpers/is-dark-color/isDarkColor";
import { useGetCurrentCreditsQuery } from "../../redux/services/user.service";
import { RootState, useAppSelector } from "../../redux/store/store";
import { theme } from "../../theme";

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  showCredits?: boolean;
}

export default function Layout({
  children,
  backgroundColor,
  showCredits = true,
}: LayoutProps) {
  const insets = useSafeAreaInsets();
  const { user } = useAppSelector((state: RootState) => state.user);
  const { data, isLoading } = useGetCurrentCreditsQuery(user?.id as string);

  const barStyle = isDarkColor(backgroundColor)
    ? "light-content"
    : "dark-content";

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      backgroundColor={backgroundColor}
    >
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
      {showCredits && (
        <Box
          p={1}
          bg={theme.colors.secondary}
          mb={{ base: 2, sm: 5, md: 10, lg: 15 }}
          mx={5}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={10}
        >
          <Icon
            as={FontAwesome5}
            name="coins"
            color={theme.colors.white}
            size={5}
            mr={2}
          />
          {isLoading && <Spinner color="white" />}

          <Text color={theme.colors.white}
            fontSize={{
              base: "md",
              sm: "md",
              md: "xl",
              lg: "xl"
            }}
          >
            {data?.credits} creditos
          </Text>
        </Box>
      )}
      {children}
    </View>
  );
}
