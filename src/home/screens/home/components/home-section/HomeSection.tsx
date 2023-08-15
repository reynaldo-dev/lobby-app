import { Box, Text, View } from "native-base";
import React from "react";
import { theme } from "../../../../../theme";

interface HomeSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function HomeSection({ title, children }: HomeSectionProps) {
  return (
    <View>
      <Text
        ml={5}
        mb={3}
        fontSize={"lg"}
        fontWeight="semibold"
        color={theme.colors.muted["400"]}
      >
        {title}
      </Text>
      <Box>{children}</Box>
    </View>
  );
}
