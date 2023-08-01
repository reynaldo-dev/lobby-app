import { Entypo, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  Icon,
  ScrollView,
  Skeleton,
  StatusBar,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import React from "react";
import {
  useGetCommunityByIdQuery,
  useGetCountMembersQuery,
  useImIInCommuityQuery,
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
} from "../../../redux/services/community/communities.service";
import { RootState, useAppSelector } from "../../../redux/store/store";
import CustomToast from "../../../shared/components/toast/CustomToast";
import { theme } from "../../../theme";
import CommunityCover from "./components/community-cover/CommunityCover";
import EventList from "./components/event-list/EventList";
import SkeletonCommunityScreen from "./components/skeleton-community-screen/SkeletonCommunityScreen";

export const CommunityScreen = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { data: community, isLoading } = useGetCommunityByIdQuery(id.trim());
  const toast = useToast();

  const { data: imIInCommunity, refetch } = useImIInCommuityQuery({
    userId: user?.id as string,
    communityId: id.trim(),
  });

  const [joinCommunity] = useJoinCommunityMutation();

  const { refetch: refetchCountMembers, data: members } =
    useGetCountMembersQuery(id.trim());

  const [leaveCommunity] = useLeaveCommunityMutation();

  const handleJoinCommunity = async () => {
    await joinCommunity({
      userId: user?.id as string,
      communityId: id.trim(),
    });
    refetch();
    refetchCountMembers();
    toast.show({
      render: () => (
        <CustomToast
          message={`Te has unido ${community?.name}`}
          color={theme.colors.success}
        />
      ),
      duration: 1000,

      placement: "bottom",
    });
  };

  const handleLeaveCommunity = async () => {
    await leaveCommunity({
      userId: user?.id as string,
      communityId: id.trim(),
    });
    refetch();
    refetchCountMembers();

    toast.show({
      render: () => (
        <CustomToast
          message={`Te has salido de ${community?.name}`}
          color={theme.colors.primary}
        />
      ),
      duration: 1000,
      placement: "bottom",
    });
  };

  return (
    <View flex={1}>
      {isLoading ? (
        <SkeletonLayout />
      ) : (
        <>
          <StatusBar backgroundColor={community?.color} />
          <CommunityCover community={community} />

          <View bgColor={theme.colors.background} h="85%">
            <Box flexDirection="row" justifyContent="space-between" mx={2}>
              <Box
                mt={2}
                mr={2}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                h="100%"
                p={2}
              >
                <Text fontSize="md" color={theme.colors.secondary}>
                  {members?.totalMembers}
                </Text>
                <Icon
                  ml={2}
                  color={theme.colors.secondary}
                  as={Ionicons}
                  name="people-outline"
                  size="md"
                />
              </Box>

              <Button
                onPress={
                  imIInCommunity ? handleLeaveCommunity : handleJoinCommunity
                }
                borderRadius={30}
                mt={2}
                mr={2}
                color={theme.colors.primary}
                background={theme.colors.primary}
                endIcon={
                  <Icon
                    color={theme.colors.white}
                    as={imIInCommunity ? Entypo : Ionicons}
                    name={imIInCommunity ? "log-out" : "add-outline"}
                    size="sm"
                  />
                }
              >
                <Text color={theme.colors.white}>
                  {imIInCommunity ? "Salirme" : "Unirme"}
                </Text>
              </Button>
            </Box>
            <Center mb={100} mx={2}>
              <EventList events={community.Event} />
            </Center>
          </View>
        </>
      )}
    </View>
  );
};

const SkeletonLayout = () => {
  return (
    <View flex={1}>
      <View flex={1}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Skeleton.Text
            lines={1}
            w="1/2"
            endColor={theme.colors.muted["300"]}
          />
          <Skeleton.Text
            lines={1}
            w="70%"
            mt={5}
            endColor={theme.colors.muted["300"]}
          />
        </Box>
        <Box justifyContent="space-between" flexDir="row" mx={2}>
          <Skeleton
            borderRadius="full"
            w={10}
            endColor={theme.colors.muted["300"]}
          />
          <Skeleton
            borderRadius="full"
            w={100}
            endColor={theme.colors.muted["300"]}
          />
        </Box>
      </View>

      <View flex={3} mt={5} mb={2}>
        <VStack mx={4} flex={1} space={23}>
          <Skeleton
            borderRadius={10}
            flex={1}
            endColor={theme.colors.muted["300"]}
          />
          <Skeleton
            borderRadius={10}
            flex={1}
            endColor={theme.colors.muted["300"]}
          />
          <Skeleton
            borderRadius={10}
            flex={1}
            endColor={theme.colors.muted["300"]}
          />
          <Skeleton
            borderRadius={10}
            flex={1}
            endColor={theme.colors.muted["300"]}
          />
        </VStack>
      </View>
    </View>
  );
};
