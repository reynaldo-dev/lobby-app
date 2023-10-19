import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import { RootState, useAppSelector } from "../../redux/store/store";
import { RootStackParamList } from "../../routing/navigation-types";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";
import { RecognitionCard } from "../../recognitions/components/RecognitionCard";
import AlliancesSVG from "../../../assets/alliances.svg";
import EventsSVG from "../../../assets/comming-events.svg";
import HomeBTN from "../components/HomeBTN";
import CommunitiesSVG from "../../../assets/communities.svg";
import RecognitionSVG from "../../../assets/reconoce.svg";
import RedeemablesSVG from "../../../assets/redeem.svg";
import ChallengesSVG from "../../../assets/challenge.svg";
import { Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;

export default function Home() {
  const { user } = useAppSelector((state: RootState) => state.user);

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "SendRecognition">>();

  const onPressBtnStarMe = () => {
    navigation.navigate("Recognitions");
  };

  const onPressBtnPremios = () => {
    navigation.navigate("Redeemables");
  };

  const onPressAlliances = () => {
    navigation.navigate("Alliances");
  };

  const onPressEvents = () => {
    navigation.navigate("Calendar");
  };

  const onPressCommunities = () => {
    navigation.navigate("MyCommunities");
  };

  const onPressChallenges = () => {
    navigation.navigate("Challenges");
  };

  return (
    <Layout backgroundColor={theme.colors.background}>
      <View height={screenHeight}>
        <Box flex={1}>
          <RecognitionCard
            name={user?.name}
            lastName={user?.lastname}
            score={2}
          />
        </Box>

        <View flex={2}>
          <VStack space={10} h={"100%"}>
            <Center>
              <HStack w={"90%"} justifyContent={"space-evenly"} space={3}>
                <HomeBTN
                  color={theme.colors.primary}
                  icon={<RecognitionSVG width={60} height={60} />}
                  onPress={onPressBtnStarMe}
                  title="Reconoce aquí"
                  height={[50, 100, 150]}
                  fontSize={20}
                />

                <HomeBTN
                  color={theme.colors.primary}
                  icon={<RedeemablesSVG width={60} height={60} />}
                  onPress={onPressBtnPremios}
                  title="Centro de canje"
                  height={[50, 100, 150]}
                  fontSize={20}
                />
              </HStack>
            </Center>

            <Center>
              <HStack w={"90%"} justifyContent={"space-evenly"} space={3}>
                <HomeBTN
                  color={theme.colors.btHome}
                  icon={<AlliancesSVG width={40} height={40} />}
                  onPress={onPressAlliances}
                  title="Alianzas comerciales"
                />

                <HomeBTN
                  color={theme.colors.btHome}
                  icon={<EventsSVG width={40} height={40} />}
                  onPress={onPressEvents}
                  title="Próximos eventos"
                />
              </HStack>
            </Center>

            <Center>
              <HStack w={"90%"} justifyContent={"space-evenly"} space={3}>
                <HomeBTN
                  color={theme.colors.btHome}
                  icon={<CommunitiesSVG width={40} height={40} />}
                  onPress={onPressCommunities}
                  title="Mis comunidades"
                />

                <HomeBTN
                  color={theme.colors.btHome}
                  icon={<ChallengesSVG width={40} height={40} />}
                  onPress={onPressChallenges}
                  title="Retos"
                />
              </HStack>
            </Center>
          </VStack>
        </View>
      </View>
    </Layout>
  );
}
