import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Center, Icon, Image, Text, View } from "native-base";
import step2Image from "../../../assets/step-2.png";
import { RootStackParamList } from "../../routing/navigation-types";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";

export default function Step2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate("Step3");
  };
  return (
    <Layout backgroundColor={theme.colors.white} showCredits={false}>
      <View justifyContent="space-around" flex={1}>
        <Center>
          <Image
            width={[300, 300, 300]}
            height={400}
            source={step2Image}
            alt="step-1"
          />
        </Center>

        <Center>
          <Text fontSize="xl" fontWeight="bold" color={theme.colors.primary}>
            ¡Encuentra eventos y confirma tu asistencia!
          </Text>
        </Center>

        <Center>
          <Button
            onPress={onPress}
            borderRadius={100}
            rightIcon={
              <Icon
                as={AntDesign}
                name="right"
                size="sm"
                color={theme.colors.white}
              />
            }
            backgroundColor={theme.colors.primary}
          >
            <Text color={theme.colors.white}>Continuar</Text>
          </Button>
        </Center>
      </View>
    </Layout>
  );
}
