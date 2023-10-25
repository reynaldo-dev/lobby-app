import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Input,
  Modal,
  Select,
  Spinner,
  Text,
  VStack,
  useBreakpointValue,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaleAvatar from '../../../assets/male-avatar.svg';
import {
  useCreateRecognitionMutation,
  useGetRecognitionCategoriesQuery,
} from "../../redux/services/recognitions.service";
import { RootState, useAppSelector } from "../../redux/store/store";
import { RootStackParamList } from "../../routing/navigation-types";
import useCustomToast from "../../hooks/useCustomToast";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";

type SendRecognitionProps = NativeStackScreenProps<
  RootStackParamList,
  "SendRecognition"
>;

export const SendRecognition: React.FC<SendRecognitionProps> = ({ route }) => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user: userFromState } = useAppSelector(
    (state: RootState) => state.user
  );

  const iconResponsive = useBreakpointValue({
    base: 60,
    sm: 45,
    md: 70,
    lg: 80,
  });

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "SendRecognition">>();
  const [createRecognition, { isLoading }] = useCreateRecognitionMutation();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetRecognitionCategoriesQuery();

  const showToast = useCustomToast();
  const { user } = route.params;

  const handleSend = async () => {
    if (!selectedCategory) {
      showToast({
        id: "category-error-empty",
        title: "Debes seleccionar una categoría",
        backgroundColor: "danger",
        textColor: "white",
      });
      return;
    }

    if (!message.trim()) {
      showToast({
        id: "recognition-error-empty",
        title: "El mensaje no puede estar vacío",
        backgroundColor: "danger",
        textColor: "white",
      });
      return;
    }

    setIsSubmitting(true);

    await createRecognition({
      userSourceId: userFromState?.id as string,
      userTargetId: user.id as string,
      description: message,
      categoryId: selectedCategory,
      credits: 2,
    })
      .unwrap()
      .then((payload) => {
        showToast({
          id: "recognition-sended",
          title: "Reconocimiento enviado exitosamente",
          backgroundColor: "success",
          textColor: "white",
        });
        setMessage("");
        navigation.goBack();
      })
      .catch((error) => {
        showToast({
          id: "recognition-error",
          title: "Error al enviar el reconocimiento",
          backgroundColor: "danger",
          textColor: "white",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const image = user?.picture ? { uri: user?.picture } : MaleAvatar;

  return (
    <Layout >
      <VStack flex={1} px={5} py={6} space={4}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <HStack alignItems="center" space={4}>
          {user.picture ? (
            <Avatar source={{ uri: user.picture }} />
          ) : (
            <MaleAvatar width={iconResponsive} height={iconResponsive} />
          )}
          <VStack>
            <Text fontSize="lg" bold textTransform={"capitalize"}>
              {user.name} {user.lastname}
            </Text>
            <Text color="gray.500" textTransform={"capitalize"}>
              {user?.rol?.role}
            </Text>
          </VStack>
        </HStack>

        <Select
          selectedValue={selectedCategory}
          accessibilityLabel="Selecciona una categoría"
          placeholder="Selecciona una categoría"
          onValueChange={(itemValue) =>
            setSelectedCategory(itemValue as string)
          }
          mt={4}
        >
          {categoriesData?.map((category) => (
            <Select.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Select>

        <Input
          height="200px"
          multiline
          numberOfLines={5}
          placeholder="Ingresa tu mensaje aquí..."
          value={message}
          onChangeText={setMessage}
          bg="gray.100"
          textAlignVertical="top"
          mb={4}
        />

        <Button
          onPress={handleSend}
          style={styles.buttonStyle}
          isLoading={isLoading}
        >
          <Text style={styles.buttonText}>Enviar reconocimiento</Text>
        </Button>
      </VStack>

      <Modal
        isOpen={isSubmitting}
        onClose={() => { }}
        closeOnOverlayClick={false}
      >
        <Box p={4} bg="white" rounded="lg">
          <Center>
            <Spinner color="blue.500" />
            <Text mt={4} textAlign="center">
              Enviando reconocimiento...
            </Text>
          </Center>
        </Box>
      </Modal>
    </Layout>
  );
};

export default SendRecognition;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});
