import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Center, Icon, Image, Text, View } from "native-base";
import React from "react";
import step4Image from "../../../assets/step-4.png";
import { RootStackParamList } from "../../routing/navigation-types";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";

export default function Step4() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPress = () => {
    (navigation as any).navigate("Root");
  };
  return (
    <Layout backgroundColor={theme.colors.white} showCredits={false}>
      <View justifyContent="space-around" flex={1}>
        <Center>
          <Image
            width={[300, 300, 300]}
            height={400}
            source={step4Image}
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
            ¡Verifica tus cupones referentes a eventos!
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
            <Text color={theme.colors.white}>Ir al inicio</Text>
          </Button>
        </Center>
      </View>
    </Layout>
  );
}
