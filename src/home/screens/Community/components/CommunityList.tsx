import { FlatList, View } from "native-base";
import { useGetCommunitiesByUserIdQuery } from "../../../../redux/services/community/communities.service";
import { RootState, useAppSelector } from "../../../../redux/store/store";
import { NotFound } from "../../../../shared/components/notFound/NotFound";
import CommunityCard from "./CommunityCard";
import { SkeletonCard } from "./SkeletonCard";

export const CommunityList = () => {
  const { user } = useAppSelector((state: RootState) => state.user);

  const { data: communityData, isLoading: communityIsLoading } =
    useGetCommunitiesByUserIdQuery(user?.id as string);

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
