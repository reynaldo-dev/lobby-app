import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { useGetCommunitiesByUserIdQuery } from "../../../../redux/services/community/communities.service";
import CommunityCard from "./CommunityCard";
import { SkeletonCard } from "./SkeletonCard";
import { NotFound } from "../../../../shared/components/notFound/NotFound";

export const CommunityList = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const { data: communityData, isLoading: communityIsLoading } =
    useGetCommunitiesByUserIdQuery(userId || "", {
      skip: userId === null,
    });

  useEffect(() => {
    const getUserData = async () => {
      const authStateString = await AsyncStorage.getItem("authState");
      if (authStateString) {
        const authState = JSON.parse(authStateString);
        setUserId(authState.user.id);
      }
    };
    getUserData();
  }, []);

  const communities = communityData?.map((item) => item.community);

  return communityIsLoading ? (
    <SkeletonCard />
  ) : (
    <FlatList
      data={communities}
      renderItem={({ item }) => (
        <CommunityCard
          data={item}
          heightCard={48}
          widthCard={48}
          marginRight={10}
        />
      )}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ padding: 10, height: 215 }}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      ListFooterComponent={<View style={{ marginRight: 10 }} />}
      ListEmptyComponent={
        <NotFound message="Aún no perteneces a ninguna comunidad." />
      }
    />
  );
};
