import { Box, Heading, Text, View } from "native-base";
import React from "react";
import { RootState, useAppSelector } from "../../../../../redux/store/store";
import { theme } from "../../../../../theme";

export default function TradeTicketShot() {
  const trade = useAppSelector((state: RootState) => state.trade);
  console.log("trade", trade);

  return (
    <View flex={1}>
      <Box mx={5}>
        <Heading size="lg" color={theme.colors.primary}>
          Ticket de canje
        </Heading>

        <Box
          mt={10}
          background={theme.colors.white}
          p={3}
          shadow={1}
          borderRadius="lg"
        >
          <Heading size="sm" color={theme.colors.primary}>
            Información del usuario
          </Heading>

          {trade && (
            <Text color={theme.colors.muted[500]}>
              Nombre: {trade.user.name}
            </Text>
          )}
        </Box>
      </Box>
    </View>
  );
}
