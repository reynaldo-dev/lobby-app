import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, Icon, Text, VStack, FlatList, Box, ScrollView } from "native-base";
import React from "react";
import { useGetMyEventsQuery } from "../../../redux/services/events/events.service";
import { RootState, useAppSelector } from "../../../redux/store/store";
import { RootStackParamList } from "../../../routing/navigation-types";
import { NotFound } from "../../../shared/components/notFound/NotFound";
import Layout from "../../../shared/layout/Layout";
import { theme } from "../../../theme";
import { RecognitionCard } from "../../recognitions/components/RecognitionCard";
import { CommunityList } from "../Community/components/CommunityList";
import { SearchBarCustom } from "../Community/components/SearchBarCustom";
import CardEvent from "../Events/components/CardEvent";
import { EventListSkeleton } from "./components/home-section/event-list-skeleton/EventListSkeleton";

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

  return (
    <Layout backgroundColor={theme.colors.background}>

      <VStack space={4} flex={1} >
        <SearchBarCustom />
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
                    <Text textAlign={"center"} color={"white"} bold fontSize={"16"}>Star me up</Text>
                    <Icon as={AntDesign} name="staro" size="4" color="white" />
                  </HStack>
                  <Text textAlign={"center"} color={"white"} bold fontSize={"16"}>Presiona aqui para reconocer</Text>
                </Button>

                <Button
                  flex={1}
                  size={"lg"}
                  height="100px"
                  bg="secondary"
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
                  bg="warning"
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
              <Button
                flex={1}
                size={"lg"}
                w={"95%"}
                height="100px"
                bg="secondary"
                _text={{ color: 'white' }}
                shadow={3}
                _pressed={{ opacity: 0.5 }}
                onPress={onPressCommunities}
              >
                <Text textAlign={"center"} color={"white"} bold fontSize={"16"}>Mis comunidades</Text>
              </Button>
            </Center>
          </VStack>


        </ScrollView>
      </VStack>
    </Layout>

  );
}
