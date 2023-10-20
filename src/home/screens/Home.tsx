import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  VStack,
  View,
  useBreakpointValue
} from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import AlliancesSVG from "../../../assets/alliances.svg";
import ChallengesSVG from "../../../assets/challenge.svg";
import EventsSVG from "../../../assets/comming-events.svg";
import CommunitiesSVG from "../../../assets/communities.svg";
import RecognitionSVG from "../../../assets/reconoce.svg";
import RedeemablesSVG from "../../../assets/redeem.svg";
import { RecognitionCard } from "../../recognitions/components/RecognitionCard";
import { RootState, useAppSelector } from "../../redux/store/store";
import { RootStackParamList } from "../../routing/navigation-types";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";
import HomeBTN from "../components/HomeBTN";

const screenHeight = Dimensions.get("window").height;

export default function Home() {

  const iconResponsive = useBreakpointValue({
    base: 30,
    sm: 40,
    md: 50,
    lg: 60,
  })

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
          <VStack space={[4, 4, 10, 10]} h={"100%"}>
            <Center>
              <HStack w={"90%"} justifyContent={"space-evenly"} space={3}>
                <HomeBTN
                  color={theme.colors.primary}
                  icon={<RecognitionSVG width={iconResponsive} height={iconResponsive} />}
                  onPress={onPressBtnStarMe}
                  title="Reconoce aquí"
                  height={[90, 100, 170]}
                />

                <HomeBTN
                  color={theme.colors.primary}
                  icon={<RedeemablesSVG width={iconResponsive} height={iconResponsive} />}
                  onPress={onPressBtnPremios}
                  title="Centro de canje"
                  height={[90, 100, 170]}
                />
              </HStack>
            </Center>

            <Center>
              <HStack w={"90%"} justifyContent={"space-evenly"} space={3}>
                <HomeBTN
                  color={theme.colors.btHome}
                  icon={<AlliancesSVG width={iconResponsive} height={iconResponsive} />}
                  onPress={onPressAlliances}
                  title="Alianzas comerciales"
                />

                <HomeBTN
                  color={theme.colors.btHome}
                  icon={<EventsSVG width={iconResponsive} height={iconResponsive} />}
                  onPress={onPressEvents}
                  title="Próximos eventos"
                />
              </HStack>
            </Center>

            <Center>
              <HStack w={"90%"} justifyContent={"space-evenly"} space={3}>
                <HomeBTN
                  color={theme.colors.btHome}
                  icon={<CommunitiesSVG width={iconResponsive} height={iconResponsive} />}
                  onPress={onPressCommunities}
                  title="Mis comunidades"
                />

                <HomeBTN
                  color={theme.colors.btHome}
                  icon={<ChallengesSVG width={iconResponsive} height={iconResponsive} />}
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
