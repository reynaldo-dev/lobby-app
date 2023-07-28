import { Box, Center, Text } from "native-base";
import React from "react";
import { theme } from "../../../theme";

interface CustomToastProps {
  message: string;
  color: string;
}

export default function CustomToast({ message, color }: CustomToastProps) {
  return (
    <Center>
      <Box bg={color} px="2" py="1" rounded="sm" mb={5}>
        <Text color={theme.colors.white}>{message}</Text>
      </Box>
    </Center>
  );
}
