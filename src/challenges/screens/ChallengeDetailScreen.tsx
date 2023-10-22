import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  AlertDialog,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useDisclose,
} from "native-base";
import React from "react";
import useCustomToast from "../../hooks/useCustomToast";
import { useAmIOnChallengeQuery, useTakeChallengeMutation } from "../../redux/services/challenges.service";
import { RootState, useAppSelector } from "../../redux/store/store";
import { RootStackParamList } from "../../routing/navigation-types";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";

export const ChallengeDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ChallengeDetail">>();
  const { challenge } = route.params;

  const { user } = useAppSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclose();
  const cancelRef = React.useRef(null);
  const showToast = useCustomToast();
  const [takeChallenge, { isLoading }] = useTakeChallengeMutation();

  const { data: amIOnChallengeData, isLoading: amIOnChallengeLoading, refetch: refetchAmIOnChallenge, } = useAmIOnChallengeQuery({
    challengeId: challenge.id,
    userId: user?.id as string
  });

  const handleEnroll = async () => {
    const challengeId = challenge.id;
    const takeChallengeDto = { userId: user?.id as string };
    try {
      const response = await takeChallenge({ challengeId, takeChallengeDto });
      onClose();
      if ("data" in response) {
        if (response.data.ok) {
          showToast({
            id: "enrollment-success",
            title: response.data.message || "Inscripción exitosa",
            backgroundColor: "success",
            textColor: "white",
          });
        }
        refetchAmIOnChallenge();
      }
      else if ("error" in response) {
        showToast({
          id: "enrollment-error",
          title: "Error de inscripción",
          backgroundColor: "danger",
          textColor: "white",
        });
      }
    } catch (error) {
      showToast({
        id: "enrollment-error",
        title: "Error de inscripción 3",
        backgroundColor: "danger",
        textColor: "white",
      });
    }
  };

  const handleButtonPress = () => {
    onOpen();
  };

  const getChallengeDateFormatted = (date: string) => {
    const dateObject = new Date(date);
    const dayNumber = dateObject.toLocaleDateString("es-ES", {
      day: "numeric",
    });
    const month = dateObject.toLocaleDateString("es-ES", { month: "long" });
    const year = dateObject.toLocaleDateString("es-ES", { year: "numeric" });

    return `${dayNumber} de ${month} de ${year}`;
  };

  return (
    <Layout showCredits={false}>
      <ScrollView flex={1} backgroundColor={theme.colors.background} p={4}>
        <Text
          bold
          color={theme.colors.black}
          fontSize="2xl"
          textAlign="center"
          mb={4}
          textTransform={"capitalize"}
        >
          {challenge.title}
        </Text>
        <Center mb={4}>
          {amIOnChallengeLoading ? (
            <Spinner color={theme.colors.secondary} />
          ) : amIOnChallengeData && amIOnChallengeData.amIOnChallenge ? (
            <Text color={theme.colors.secondary}>
              Ya estás participando en este reto.
            </Text>
          ) : (
            <Button
              width={"50%"}
              onPress={handleButtonPress}
              backgroundColor={theme.colors.secondary}
              style={{ borderRadius: 50 }}
            >
              Participar en el Reto
            </Button>
          )}
        </Center>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialog.Content style={{ borderRadius: 20, width: "80%" }}>
            <AlertDialog.Body>
              {isLoading ? (
                <Center>
                  <Spinner
                    size="large"
                    color={theme.colors.primary}
                  />
                  <Text style={{ flexWrap: "wrap" }}>Cargando...</Text>
                </Center>
              ) : (
                <Box padding={2}>
                  <Heading size="md">Confirmar inscripción</Heading>
                  <Text style={{ flexWrap: "wrap" }} mt={2}>
                    ¿Estás seguro que quieres inscribirte en este reto?
                  </Text>
                  <HStack
                    mt={3}
                    space={3}
                    width={"100%"}
                    justifyContent={"flex-end"}
                  >
                    <Button
                      ref={cancelRef}
                      onPress={onClose}
                      backgroundColor={theme.colors.white}
                      borderColor={theme.colors.primary}
                      borderWidth={1}
                      mr={3}
                      _text={{ color: theme.colors.primary }}
                      disabled={isLoading}
                      _disabled={{ opacity: 0.5 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onPress={handleEnroll}
                      backgroundColor={theme.colors.primary}
                      _text={{ color: "white" }}
                      disabled={isLoading}
                      _disabled={{ opacity: 0.5 }}
                    >
                      Confirmar
                    </Button>
                  </HStack>
                </Box>
              )}
            </AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>

        <Center>
          <Text color="coolGray.600" mb={4}>
            {challenge.description}
          </Text>
        </Center>
        <VStack space={4} mb={4}>
          <HStack space={2}>
            <FontAwesome name="calendar" size={20} color="gray" />
            <Text color="muted.500">
              Desde: {getChallengeDateFormatted(challenge.initialDate)}
            </Text>
          </HStack>
          <Divider />
          <HStack space={2}>
            <FontAwesome name="calendar" size={20} color="gray" />
            <Text color="muted.500">
              Hasta: {getChallengeDateFormatted(challenge.endDate)}
            </Text>
          </HStack>

          <Divider />
          <HStack space={2}>
            <FontAwesome name="ticket" size={20} color="gray" />
            <Text color="muted.500">
              Cupones: {challenge.coupons} / {challenge.availableCoupons}
            </Text>
          </HStack>
          <Divider />
          <HStack space={2}>
            <FontAwesome5 name="coins" color="gray" size={20} />
            <Text color="muted.500">Créditos: {challenge.credits}</Text>
          </HStack>
          <Divider />
          <HStack space={2}>
            <MaterialIcons name="category" size={20} color="gray" />
            <Text color="muted.500">Categoría: {challenge.category.name}</Text>
          </HStack>
        </VStack>
      </ScrollView>
    </Layout>
  );
};
