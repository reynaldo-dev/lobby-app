import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Center, Icon, Image, Text, View } from "native-base";
import step3Image from "../../../../../assets/step-3.png";
import { AuthStackParamList } from "../../../../routing/navigation-types";
import Layout from "../../../../shared/layout/Layout";
import { theme } from "../../../../theme";

export default function Step3() {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const onPress = () => {
    navigation.navigate("Step4");
  };
  return (
    <Layout backgroundColor={theme.colors.white}>
      <View justifyContent="space-around" flex={1}>
        <Center>
          <Image
            width={[300, 300, 300]}
            height={400}
            source={step3Image}
            alt="step-1"
          />
        </Center>

        <Center>
          <Text
            fontSize="xl"
            mx={2}
            fontWeight="bold"
            color={theme.colors.primary}
          >
            ¡Verifica la agenda de tus proximos eventos!
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
