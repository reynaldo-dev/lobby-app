import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Center, Icon, Image, Text, View } from "native-base";
import React from "react";
import step1Image from "../../../../../assets/step-1.png";
import { RootStackParamList } from "../../../../routing/navigation-types";
import Layout from "../../../../shared/layout/Layout";
import { theme } from "../../../../theme";

export default function Step1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate("Step2");
  };
  return (
    <Layout backgroundColor={theme.colors.white} showCredits={false}>
      <View justifyContent="space-around" flex={1}>
        <Center>
          <Image
            width={[300, 300, 300]}
            height={400}
            source={step1Image}
            alt="step-1"
          />
        </Center>

        <Center>
          <Text fontSize="xl" fontWeight="bold" color={theme.colors.primary}>
            ¡Encuentra y únete a diferentes comunidades!
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
