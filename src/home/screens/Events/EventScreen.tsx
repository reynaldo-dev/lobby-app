import { Feather } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  Divider,
  Icon,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  VStack,
  View,
  useDisclose,
} from "native-base";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useGetEventByIdQuery } from "../../../redux/services/events/events.service";
import { RootStackParamList } from "../../../routing/navigation-types";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import ConfirmAssistanceBottomSheet from "./components/confirm-assistance-bottomSheet/ConfirmAssistanceBottomSheet";

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <Box flexDir="row" justifyContent="space-between" mt={1}>
    <Text color="gray.600" fontSize={["sm", "lg", "md"]} fontWeight="bold">
      {label}
    </Text>

    <Text color="gray.500" fontSize={["sm", "lg", "md"]}>
      {value}
    </Text>
  </Box>
);

export default function EventScreen() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { params } = useRoute<RouteProp<RootStackParamList>>();
  const { data: event, isLoading, isError } = useGetEventByIdQuery(params?.id);

  return (
    <Layout backgroundColor={theme.colors.primary}>
      {isLoading ? (
        <Center flex={1}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Center>
      ) : (
        <View flex={1}>
          <Center bg={`${theme.colors.primary}`} h="30%">
            <Text
              bold
              color={theme.colors.white}
              fontSize={["xl", "2xl", "3xl"]}
              letterSpacing={1}
            >
              {event?.title}
            </Text>
            <Pressable
              onPress={() => onOpen()}
              flexDir="row"
              alignItems="center"
              p={3}
              mt={4}
              borderRadius="full"
              backgroundColor={theme.colors.white}
              _pressed={{
                backgroundColor: "yellow.500",
              }}
            >
              <Icon
                as={Feather}
                name="user-plus"
                color={theme.colors.primary}
                mr={1}
              />
              <Text color={theme.colors.primary}>¡Asistir!</Text>
            </Pressable>
          </Center>

          <ScrollView
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            mt={-5}
            bg={theme.colors.white}
          >
            {/* descripcion */}
            <Box mx={4} my={4}>
              <Text bold color="gray.600" fontSize={["lg", "xl", "2xl"]} mb={4}>
                Descripción
              </Text>
              <Box p={4} borderRadius={10}>
                <Text
                  color={theme.colors.muted["400"]}
                  fontSize={["sm", "md", "lg"]}
                >
                  {event?.description}
                </Text>
              </Box>
            </Box>

            {/* detalles */}
            <VStack mx={4} space={4}>
              <Text bold color="gray.600" fontSize={["lg", "xl", "2xl"]}>
                Detalles
              </Text>

              <DetailItem label="Estado" value={event?.status as string} />
              <Divider />

              <DetailItem label="Lugar" value={event?.place as string} />
              <Divider />

              <DetailItem
                label="Comunidad"
                value={event?.community?.name as string}
              />
              <Divider />

              {/* Fecha */}
              <DetailItem
                label="Fecha"
                value={new Date(event?.dateTime as string).toLocaleDateString()}
              />
              <Divider />

              {/* Hora */}
              <DetailItem
                label="Hora"
                value={new Date(event?.dateTime as string).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" }
                )}
              />
              <Divider />
            </VStack>
          </ScrollView>
        </View>
      )}

      <ConfirmAssistanceBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({});
