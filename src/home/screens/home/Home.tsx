import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, Icon, ScrollView, Text, VStack } from "native-base";
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
  const {
    isError,
    isLoading,
    data: myEvents,
  } = useGetMyEventsQuery(user?.id as string);

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "SendRecognition">>();
  const onPressBtnStarMe = () => {
    navigation.navigate("Recognitions");
  };

  const onPressBtnPremios = () => {
    navigation.navigate("Redeemables");
  }

  return (
    <Layout backgroundColor={theme.colors.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={4} flex={1} >

          <SearchBarCustom />

          <RecognitionCard name={user?.name} lastName={user?.lastname} score={2} />

          <Center>
            <HStack width="95%" space={3}>
              <Button
                flex={1}
                height="60px"
                bg="primary"
                _text={{ color: 'white' }}
                rightIcon={<Icon as={AntDesign} name="staro" size="5" color="white" />}
                shadow={3}
                _pressed={{ opacity: 0.5 }}
                onPress={onPressBtnStarMe}
              >
                Star me up
              </Button>

              <Button
                flex={1}
                height="60px"
                bg="secondary"
                _text={{ color: 'white' }}
                rightIcon={<Icon as={MaterialCommunityIcons} name="storefront-outline" size="5" color="white" />}
                shadow={3}
                _pressed={{ opacity: 0.5 }}
                onPress={onPressBtnPremios}
              >
                Canjes
              </Button>
            </HStack>
          </Center>


          <Text fontSize="xl" fontWeight="bold" mx={"4"}>Mis comunidades</Text>
          <CommunityList />

          <Text fontSize="xl" fontWeight="bold" mx={"4"}>Mis próximos eventos</Text>

          {isLoading ? (
            <EventListSkeleton />
          ) : (
            <>
              {(myEvents?.slice(0, 5) || []).map(event => (
                <CardEvent key={event.id} data={event} />
              ))}
              {myEvents && myEvents.length === 0 && (
                <NotFound message="Aún no estás inscrito a ningún evento." height={250} />
              )}
              {myEvents && myEvents.length > 0 && (
                <Center flex={1}>
                  <Text color={theme.colors.muted[400]} mb={5}>
                    No hay más eventos próximos
                  </Text>
                </Center>
              )}
            </>
          )}

        </VStack>
      </ScrollView>
    </Layout>
  );
}
