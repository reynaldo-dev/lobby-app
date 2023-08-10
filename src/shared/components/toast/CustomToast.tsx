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
      <Box bg={color} p={3} rounded="lg" mb={5}>
        <Text color={theme.colors.white}>{message}</Text>
      </Box>
    </Center>
  );
}
