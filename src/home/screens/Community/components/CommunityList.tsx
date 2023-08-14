import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, View } from "native-base";
import { useEffect, useState } from 'react';
import { useGetCommunitiesByUserIdQuery } from "../../../../redux/services/community/communities.service";
import CommunityCard from "./CommunityCard";
import { SkeletonCard } from "./SkeletonCard";

export const CommunityList = () => {

  const [userId, setUserId] = useState<string | null>(null);


  const { data: communityData, isLoading: communityIsLoading } =
    useGetCommunitiesByUserIdQuery(userId || '', {
      skip: userId === null,
    });

  useEffect(() => {
    const getUserData = async () => {
      const authStateString = await AsyncStorage.getItem('authState');
      if (authStateString) {
        const authState = JSON.parse(authStateString);
        setUserId(authState.user.id);
      }
    }
    getUserData();
  }, []);

  return communityIsLoading ? (
    <SkeletonCard />
  ) : (
    <FlatList
      data={communityData}
      renderItem={({ item }) => (
        <CommunityCard
          data={item}
          heightCard={48}
          widthCard={80}
          marginRight={10}
        />
      )}
      keyExtractor={(item) => item.community.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ padding: 10, height: 215 }}
      ListFooterComponent={<View style={{ marginRight: 10 }} />}
    />
  );
};
