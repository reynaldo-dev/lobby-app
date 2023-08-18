import { Feather } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  AlertDialog,
  Box,
  Button,
  Center,
  Divider,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
  useDisclose,
} from "native-base";
import { ActivityIndicator } from "react-native";
import { RootStackParamList } from "../../../routing/navigation-types";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import useEventScreenLogic from "./EventScreenLogic";
import ConfirmAssistanceBottomSheet from "./components/confirm-assistance-bottomSheet/ConfirmAssistanceBottomSheet";

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
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
  const { params } = useRoute<RouteProp<RootStackParamList, "Event">>();
  const {
    event,
    isLoading,
    isError,
    isEnrolling,
    isCancelling,
    isEnrolled,
    showDialog,
    cancelRef,
    handleEnroll,
    handleCancelEnrollment,
    handleButtonPress,
    setShowDialog,
    isLoadingAction,
  } = useEventScreenLogic(params?.id);

  const getEventDateFormatted = () => {
    const date = new Date(event?.dateTime as string);
    const dayNumber = date.toLocaleDateString("es-ES", { day: "numeric" });
    const month = date.toLocaleDateString("es-ES", { month: "long" });
    const year = date.toLocaleDateString("es-ES", { year: "numeric" });

    return `${dayNumber} de ${month} de ${year}`;
  };


  if (isLoading || isEnrolled === null) {
    return (
      <Center flex={1}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Center>
    );
  }

  return (
    <Layout backgroundColor={theme.colors.background}>
      <View flex={1}>
        <Center bg={`${theme.colors.background}`} h="30%">
          <Text
            bold
            color={theme.colors.black}
            fontSize={["xl", "2xl", "3xl"]}
            letterSpacing={1}
          >
            {event?.title}
          </Text>
          {isEnrolled !== null && (
            <Pressable
              display={event?.status === "Inactivo" ? "none" : "flex"}
              onPress={handleButtonPress}
              flexDir="row"
              alignItems="center"
              p={3}
              mt={4}
              borderRadius="full"
              backgroundColor={theme.colors.white}
              _pressed={{
                backgroundColor: "muted.300",
              }}
            >
              <AlertDialog
                isOpen={showDialog}
                leastDestructiveRef={cancelRef}
                onClose={() => setShowDialog(false)}
              >
                <AlertDialog.Content style={{ borderRadius: 20, width: "80%" }}>
                  <AlertDialog.Header>Confirmar Acción</AlertDialog.Header>
                  <AlertDialog.Body>
                    {isLoadingAction ? (
                      <Center>
                        <ActivityIndicator
                          size="large"
                          color={theme.colors.primary}
                        />
                        <Text style={{ flexWrap: "wrap" }}>Cargando...</Text>
                      </Center>
                    ) : (
                      <Text style={{ flexWrap: "wrap" }}>
                        ¿Estás seguro que quieres{" "}
                        {isEnrolled ? "cancelar tu asistencia" : "asistir"} a
                        este evento?
                      </Text>
                    )}
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button
                      ref={cancelRef}
                      onPress={() => setShowDialog(false)}
                      colorScheme="red"
                      mr={3}
                      _text={{ color: "white" }}
                      disabled={isLoadingAction}
                      _disabled={{ opacity: 0.5 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onPress={
                        isEnrolled ? handleCancelEnrollment : handleEnroll
                      }
                      colorScheme="green"
                      _text={{ color: "white" }}
                      disabled={isLoadingAction}
                      _disabled={{ opacity: 0.5 }}
                    >
                      Confirmar
                    </Button>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog>

              <Icon
                as={Feather}
                name="user-plus"
                color={theme.colors.primary}
                mr={1}
              />
              <Text color={theme.colors.primary}>
                {isEnrolled ? "Cancelar asistencia" : "¡Asistir!"}
              </Text>
            </Pressable>
          )}
        </Center>

        <ScrollView
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          mt={-5}
          bg={theme.colors.white}
          mb={2}
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
            <Text
              bold
              color={theme.colors.muted["400"]}
              fontSize={["lg", "xl", "2xl"]}
            >
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
              value={getEventDateFormatted() as string}
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

            {/* Score */}
            <DetailItem label="Puntaje" value={event?.score as number} />
            <Divider />

            {/* Categoria */}
            <DetailItem
              label="Categoría"
              value={event?.eventCategory?.name as string}
            />
            <Divider />
          </VStack>
        </ScrollView>
      </View>

      <ConfirmAssistanceBottomSheet
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </Layout>
  );
}
