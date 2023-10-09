import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { RootState, useAppSelector } from "../../../redux/store/store";
import { RootStackParamList } from "../../../routing/navigation-types";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import { RecognitionCard } from "../../recognitions/components/RecognitionCard";

export default function Home() {
  const { user } = useAppSelector((state: RootState) => state.user);

  const navigation = useNavigation<NavigationProp<RootStackParamList, "SendRecognition">>();

  const onPressBtnStarMe = () => {
    navigation.navigate("Recognitions");
  };

  const onPressBtnPremios = () => {
    navigation.navigate("Redeemables");
  }

  const onPressAlliances = () => {
    navigation.navigate("Alliances");
  }

  const onPressEvents = () => {
    navigation.navigate("MyUpcomingEvents");
  }

  const onPressCommunities = () => {
    navigation.navigate("MyCommunities");
  }

  const onPressChallenges = () => {
    navigation.navigate("Challenges");
  }


  return (
    <Layout backgroundColor={theme.colors.background}>
      <VStack space={4} flex={1} >
        <ScrollView >
          <VStack space={4} flex={1} >
            <RecognitionCard name={user?.name} lastName={user?.lastname} score={2} />
            <Center>
              <HStack width="95%" space={3}>
                <Button
                  flex={1}
                  size={"lg"}
                  bg="primary"
                  _text={{ color: 'white' }}

                  shadow={3}
                  _pressed={{ opacity: 0.5 }}
                  onPress={onPressBtnStarMe}
                >
                  <HStack alignItems={"center"} space={1} alignSelf={"center"}>
                    <Text textAlign={"center"} color={"white"} bold fontSize={"24"}>Reconoce</Text>
                    <Icon as={AntDesign} name="staro" size="6" color="white" />
                  </HStack>
                  <Text textAlign={"center"} color={"white"} fontSize={"14"}>Presiona aqui para reconocer</Text>
                </Button>

                <Button
                  flex={1}
                  size={"lg"}
                  height="100px"
                  bg="warning"
                  _text={{ color: 'white' }}
                  shadow={3}
                  _pressed={{ opacity: 0.5 }}
                  onPress={onPressBtnPremios}
                >
                  <Text textAlign={"center"} color={"white"} bold fontSize={"16"}>Canjea tus creditos aqui</Text>
                </Button>
              </HStack>
            </Center>

            <Center>
              <HStack width="95%" space={3}>
                <Button
                  flex={1}
                  size={"lg"}
                  bg="#FF0000"
                  _text={{ color: 'white' }}
                  shadow={3}
                  _pressed={{ opacity: 0.5 }}
                  onPress={onPressAlliances}
                >
                  <Text textAlign={"center"} color={"white"} bold fontSize={"16"}>Alianzas comerciales</Text>
                </Button>

                <Button
                  flex={1}
                  size={"lg"}
                  height="100px"
                  bg="danger"
                  _text={{ color: 'white' }}
                  shadow={3}
                  _pressed={{ opacity: 0.5 }}
                  onPress={onPressEvents}
                >
                  <Text textAlign={"center"} color={"white"} bold fontSize={"16"}>Próximos eventos</Text>
                </Button>
              </HStack>
            </Center>

            <Center>
              <HStack width="95%" space={3}>
                <Button
                  flex={1}
                  size={"lg"}
                  height="100px"
                  bg="secondary"
                  _text={{ color: 'white' }}
                  shadow={3}
                  _pressed={{ opacity: 0.5 }}
                  onPress={onPressCommunities}
                >
                  <Text textAlign={"center"} color={"white"} bold fontSize={"16"}>Mis comunidades</Text>
                </Button>

                <Button
                  flex={1}
                  size={"lg"}
                  height="100px"
                  bg="danger"
                  _text={{ color: 'white' }}
                  shadow={3}
                  _pressed={{ opacity: 0.5 }}
                  onPress={onPressChallenges}
                >
                  <Text textAlign={"center"} color={"white"} bold fontSize={"16"}>Retos</Text>
                </Button>
              </HStack>
            </Center>
          </VStack>


        </ScrollView>
      </VStack>
    </Layout>

  );
}
