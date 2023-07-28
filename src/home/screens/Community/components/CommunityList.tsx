import { FlatList, Text, View } from "native-base";
import { useGetCommunitiesQuery } from "../../../../redux/services/community/communities.service";
import CommunityCard from "./CommunityCard";
import { ICommunity } from "../../../../interfaces/community.interface";
import { SkeletonCard } from "./SkeletonCard";

export const CommunityList = () => {
  const { data: communityData, isLoading: communityIsLoading } =
    useGetCommunitiesQuery();
  return communityIsLoading ? (
    <SkeletonCard />
  ) : (
    <FlatList
      data={communityData}
      renderItem={({ item }) => (
        <CommunityCard
          community={item}
          heightCard={48}
          widthCard={80}
          marginRight={10}
        />
      )}
      keyExtractor={(item: ICommunity) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ padding: 10, height: 215 }}
      ListFooterComponent={<View style={{ marginRight: 10 }} />}
    />
  );
};
