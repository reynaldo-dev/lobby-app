import { Box, Button, Text } from "native-base";
import React from "react";
import { theme } from "../../theme";

interface Props {
  onPress: () => void;
  icon: React.ReactNode;
  title: string;
  color: string;
  height?: number[];
  fontSize?: number;
}

export default function HomeBTN({
  onPress,
  icon,
  title,
  color,
  height = [50, 60, 70],
  fontSize = 16,
}: Props) {
  return (
    <Button
      justifyContent={"center"}
      alignItems={"center"}
      background={color}
      shadow={3}
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
        fontSize={fontSize}
        width={"100%"}
      >
        {title}
      </Text>
    </Button>
  );
}
