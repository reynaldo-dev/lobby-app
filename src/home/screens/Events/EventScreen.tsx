import { Feather } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  Divider,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useDisclose,
} from "native-base";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useGetEventByIdQuery } from "../../../redux/services/events/events.service";
import { RootStackParamList } from "../../../routing/navigation-types";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import ConfirmAssistanceBottomSheet from "./components/confirm-assistance-bottomSheet/ConfirmAssistanceBottomSheet";

export default function EventScreen() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { params } = useRoute<RouteProp<RootStackParamList>>();
  const { data: event, isLoading, isError } = useGetEventByIdQuery(params?.id);

  return (
    <Layout backgroundColor={theme.colors.background}>
      {isLoading ? (
        <Center flex={1}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Center>
      ) : (
        <>
          <ScrollView>
            <Center borderRadius={5} flex={1}>
              <Text
                bold
                color={theme.colors.muted["500"]}
                fontSize={["lg", "xl", "md"]}
              >
                {event?.title}
              </Text>
              <Box w="full" flexDir="row" justifyContent="flex-end" mt={5}>
                <Pressable
                  onPress={() => onOpen()}
                  flexDir="row"
                  alignItems="center"
                  p={3}
                  mr={2}
                  borderRadius="full"
                  backgroundColor={`${theme.colors.secondary}:alpha.20`}
                  _pressed={{
                    backgroundColor: `${theme.colors.secondary}:alpha.30`,
                  }}
                >
                  <Icon
                    as={Feather}
                    name="user-plus"
                    color={theme.colors.secondary}
                    mr={1}
                  />
                  <Text color={theme.colors.secondary}>Asistir</Text>
                </Pressable>
              </Box>
            </Center>

            {/* descripcion */}
            <Box mx={2} mb={10}>
              <Text
                bold
                color={theme.colors.muted["400"]}
                fontSize={["md", "xl", "md"]}
                mb={4}
              >
                Descripción
              </Text>
              <Box bgColor={theme.colors.white} mx={2} borderRadius={10} p={2}>
                <Text
                  color={theme.colors.muted["500"]}
                  fontSize={["sm", "lg", "md"]}
                >
                  {event?.description}
                </Text>
              </Box>
            </Box>

            {/* detalles */}
            <VStack mx={4} flex={2} mb={2} space={5}>
              <Text
                bold
                color={theme.colors.muted["400"]}
                fontSize={["md", "xl", "md"]}
                mb={4}
              >
                Detalles
              </Text>

              {/* estado */}
              <Box flexDir="row" w="full" justifyContent="space-between">
                <Text
                  color={theme.colors.text}
                  fontSize={["sm", "lg", "md"]}
                  fontWeight="semibold"
                >
                  Estado
                </Text>

                <Text
                  bold
                  fontWeight="semibold"
                  color={theme.colors.muted["400"]}
                  fontSize={["sm", "lg", "md"]}
                >
                  {event?.status}
                </Text>
              </Box>
              <Divider />

              {/* lugar */}
              <Box flexDir="row" w="full" justifyContent="space-between" mt={1}>
                <Text
                  color={theme.colors.text}
                  fontSize={["sm", "lg", "md"]}
                  fontWeight="semibold"
                >
                  Lugar
                </Text>

                <Text
                  bold
                  fontWeight="semibold"
                  color={theme.colors.muted["400"]}
                  fontSize={["sm", "lg", "md"]}
                >
                  {event?.place}
                </Text>
              </Box>
              <Divider />

              {/* comunidad */}
              <Box flexDir="row" w="full" justifyContent="space-between" mt={1}>
                <Text
                  color={theme.colors.text}
                  fontSize={["sm", "lg", "md"]}
                  fontWeight="semibold"
                >
                  Comunidad
                </Text>

                <Text
                  bold
                  fontWeight="semibold"
                  color={theme.colors.muted["400"]}
                  fontSize={["sm", "lg", "md"]}
                >
                  {event?.community?.name}
                </Text>
              </Box>
              <Divider />

              {/* Fecha */}
              <Box flexDir="row" w="full" justifyContent="space-between" mt={1}>
                <Text
                  color={theme.colors.text}
                  fontSize={["sm", "lg", "md"]}
                  fontWeight="semibold"
                >
                  Fecha
                </Text>

                <Text
                  bold
                  fontWeight="semibold"
                  color={theme.colors.muted["400"]}
                  fontSize={["sm", "lg", "md"]}
                >
                  {new Date(event?.dateTime as string).toLocaleDateString()}
                </Text>
              </Box>
              <Divider />

              {/* Hora */}
              <Box flexDir="row" w="full" justifyContent="space-between" mt={1}>
                <Text
                  color={theme.colors.text}
                  fontSize={["sm", "lg", "md"]}
                  fontWeight="semibold"
                >
                  Hora
                </Text>

                <Text
                  bold
                  fontWeight="semibold"
                  color={theme.colors.muted["400"]}
                  fontSize={["sm", "lg", "md"]}
                >
                  {new Date(event?.dateTime as string)
                    .toLocaleTimeString()
                    .split(":")
                    .slice(0, 2)
                    .join(":")}
                </Text>
              </Box>
              <Divider />
            </VStack>
          </ScrollView>

          <ConfirmAssistanceBottomSheet
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          />
        </>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({});
