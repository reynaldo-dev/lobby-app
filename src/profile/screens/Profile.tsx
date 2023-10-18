import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Center, Image, ScrollView, Text, VStack } from "native-base";
import React from "react";
import SvgQRCode from "react-native-qrcode-svg";
import { RootState, useAppSelector } from "../../redux/store/store";
import { RootStackParamList } from "../../routing/navigation-types";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";
import ProfileMenu from "../components/ProfileMenu";
import MaleAvatar from "../../../assets/male-avatar.svg";

export default function Profile() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Layout backgroundColor={theme.colors.background} showCredits={false}>
      <ScrollView mb={5}>
        <Box mx={5} my={5} flexDir="row" justifyContent="flex-end">
          <ProfileMenu />
        </Box>

        <VStack space={5} alignItems="center" mx={5}>
          {user?.picture ? (
            <Image
              source={{ uri: user.picture }}
              alt="Profile Picture"
              size="150px"
              borderRadius="full"
              borderColor="gray.300"
              borderWidth={2}
            />
          ) : (
            <MaleAvatar width={150} height={150} />
          )}

          <Center>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="text"
              textTransform={"capitalize"}
            >
              {user?.name} {user?.lastname}
            </Text>
            <Text
              fontSize="lg"
              color="text"
              mt={2}
              textTransform={"capitalize"}
            >
              {user?.role}
            </Text>
          </Center>

          <Box
            w="85%"
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="gray.200"
          >
            {user?.city && (
              <Text>
                <Text fontWeight="bold">Ciudad:</Text> {user.city}
              </Text>
            )}
            {user?.department && (
              <Text mt={2}>
                <Text fontWeight="bold">Departamento:</Text> {user.department}
              </Text>
            )}
            {user?.phone && (
              <Text mt={2}>
                <Text fontWeight="bold">Teléfono:</Text> {user.phone}
              </Text>
            )}
          </Box>

          <Box>
            <SvgQRCode
              enableLinearGradient
              size={300}
              value={JSON.stringify(user)}
            />
          </Box>

          {/* <Button
            w={"85%"}
            height="100px"
            bg="secondary"
            _text={{ color: 'white' }}
            shadow={3}
            _pressed={{ opacity: 0.5 }}
          >
            Historial de eventos
          </Button> */}
        </VStack>
      </ScrollView>
    </Layout>
  );
}
