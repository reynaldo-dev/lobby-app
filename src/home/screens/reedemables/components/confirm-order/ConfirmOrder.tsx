import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  Modal,
  Text,
  View,
  useToast,
} from "native-base";
import { theme } from "../../../../../theme";
import { AntDesign } from "@expo/vector-icons";
import {
  useGetRedeemablesQuery,
  useTradeRedeemableMutation,
} from "../../../../../redux/services/reedemables/reedemeables.service";
import { RootState, useAppSelector } from "../../../../../redux/store/store";
import CustomToast from "../../../../../shared/components/toast/CustomToast";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../../routing/navigation-types";

interface IConfirmOrderProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: string;
  cost: number;
  itemId: string;
}

export default function ConfirmOrder({
  showModal,
  setShowModal,
  item,
  cost,
  itemId,
}: IConfirmOrderProps) {
  const toast = useToast();
  const [toastVisible, setToastVisible] = useState(false);
  const [triggerTrade, { isLoading }] = useTradeRedeemableMutation();
  const { refetch } = useGetRedeemablesQuery();
  const { user } = useAppSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Redeemables">>();
  const trade = () => {
    triggerTrade({ redeemedItemId: itemId, userId: user?.id as string })
      .unwrap()
      .then(() => {
        toast.show({
          render: () => (
            <CustomToast
              message="Canjeado con exito"
              color={theme.colors.success}
            />
          ),
          placement: "top",
          duration: 2000,
          onCloseComplete: () => {
            refetch();
            setShowModal(false);
            navigation.navigate("Redeemables");
          },
        });
      })
      .catch((error) => {
        console.log(error);
        if (!toastVisible) {
          setToastVisible(true);
          toast.show({
            render: () => (
              <CustomToast
                message={error.data.message}
                color={theme.colors.danger}
              />
            ),
            placement: "top",
            duration: 3000,
            onCloseComplete: () => setToastVisible(false),
          });
        }
      })
      .finally(() => {
        setShowModal(false);
      });
  };
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Body>
          <View>
            <Heading size="sm" color={theme.colors.primary}>
              Confirmar Orden
            </Heading>

            <Container mt={5}>
              <Text color={theme.colors.muted[700]}>
                <Text color={theme.colors.primary}>Canjeable:</Text> {item}
              </Text>
              <Text mt={2} color={theme.colors.muted[700]}>
                <Text color={theme.colors.primary}>Costo:</Text> {cost} créditos
              </Text>
            </Container>

            <Button
              isLoading={isLoading}
              mt={5}
              p={3}
              width={"100%"}
              justifyContent="center"
              borderRadius={10}
              backgroundColor={theme.colors.primary}
              leftIcon={
                <AntDesign
                  name="shoppingcart"
                  size={24}
                  color={theme.colors.white}
                />
              }
              onPress={() => {
                trade();
              }}
            >
              <Text color={theme.colors.white} bold textAlign={"center"}>
                Confirmar
              </Text>
            </Button>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
