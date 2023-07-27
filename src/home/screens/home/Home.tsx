import { Box, ScrollView, Text } from "native-base";
import React from "react";
import { CustomAlert } from "../../../shared/components/CustomAlert";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import { CommunityList } from "../Community/components/CommunityList";
import { SearchBarCustom } from "../Community/components/SearchBarCustom";
import CardEvent from "../Events/components/CardEvent";

export default function Home() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  return (
    <Layout backgroundColor={theme.colors.background}>
      <ScrollView>
        <SearchBarCustom />
        <CustomAlert
          title="¡El evento tarde de peliculas se acerca!"
          description="Recuerda que debes confirmar tu asistencia para el evento."
          place="Davivienda"
          time="4:00 pm"
        />
        <Text
          ml={5}
          my={3}
          fontSize={"xl"}
          bold
          color={theme.colors.muted["400"]}
        >
          Mis comunidades
        </Text>
        <CommunityList />
        <Text ml={5} fontSize={"2xl"} bold>
          Eventos próximos
        </Text>
        <Box p={2}>
          <CardEvent
            heightCard={48}
            widthCard={80}
            marginTop={10}
            marginRight={10}
          />
        </Box>
      </ScrollView>
    </Layout>
  );
}
