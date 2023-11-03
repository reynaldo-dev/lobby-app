import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  Box,
  Button,
  Heading,
  Image,
  Spinner,
  Text,
  View
} from "native-base";
import React, { useState } from "react";
import giftImage from "../../../assets/gift.png";
import { useGetRedeemableByIdQuery } from "../../redux/services/redeemeables.service";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";
import ConfirmOrder from "../components/ConfirmOrder";

export default function RedeemableDetail() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { isError, isLoading, data } = useGetRedeemableByIdQuery(id);
  const [showModal, setShowModal] = useState(false);
  return (
    <Layout backgroundColor={theme.colors.background}>
      {isLoading && (
        <View flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" color={theme.colors.primary} />
        </View>
      )}

      {data && (
        <View mx={5}>
          <Box w={["100%", "100%", "100%"]} h={["72", "64", "48"]}>
            <Image
              w={"100%"}
              h="100%"
              source={data && data.picture ? { uri: data.picture } : giftImage}
              alt={data?.name}
              resizeMode="contain"
            />
          </Box>
          <View mt={5}>
            <Heading size="lg">{data?.name}</Heading>
            <Text color={theme.colors.muted[500]}>{data?.description}</Text>
            <Text
              color={
                data && data?.stock > 0
                  ? theme.colors.success
                  : theme.colors.danger
              }
            >
              {data && data?.stock > 0 ? "Disponible" : "No Disponible"}
            </Text>

            <Button
              disabled={data && data?.stock <= 0}
              mt={5}
              p={3}
              width={"100%"}
              justifyContent="center"
              borderRadius={10}
              backgroundColor={
                data.stock > 0 ? theme.colors.primary : theme.colors.muted[400]
              }
              leftIcon={
                data.stock <= 0 ? (
                  <Entypo
                    name="emoji-sad"
                    size={24}
                    color={theme.colors.white}
                  />
                ) : (
                  <AntDesign
                    name="shoppingcart"
                    size={24}
                    color={theme.colors.white}
                  />
                )
              }
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text color={theme.colors.white} bold textAlign={"center"}>
                {data.stock <= 0
                  ? "No Disponible"
                  : ` Canjear por ${data?.required_token_amount} creditos`}
              </Text>
            </Button>
          </View>
          <ConfirmOrder
            showModal={showModal}
            setShowModal={setShowModal}
            item={data.name}
            cost={data.required_token_amount}
            itemId={data.id}
          />
        </View>
      )}
    </Layout>
  );
}
