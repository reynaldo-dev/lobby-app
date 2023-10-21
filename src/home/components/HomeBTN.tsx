import { Box, Button, Text } from "native-base";
import React from "react";
import { theme } from "../../theme";
interface Props {
  onPress: () => void;
  icon: React.ReactNode;
  title: string;
  color: string;
  height?: number[];
}

export default function HomeBTN({
  onPress,
  icon,
  title,
  color,
  height = [70, 100, 120],
}: Props) {
  return (
    <Button
      justifyContent={"center"}
      alignItems={"center"}
      background={color}
      _pressed={{ opacity: 0.5 }}
      onPress={onPress}
      w={"50%"}
      h={height}
    >
      <Box
        alignSelf={"center"}
        alignItems={"center"}
        background={theme.colors.white}
        rounded="full"
        width="auto"
        padding={2}
      >
        {icon}
      </Box>
      <Text
        textAlign={"center"}
        color={"white"}
        bold
        fontSize={{
          base: "sm",
          sm: "md",
          md: "2xl",
          lg: "xl"
        }}
        width={"100%"}
      >
        {title}
      </Text>
    </Button>
  );
}
