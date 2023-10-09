import { Center, FlatList, Spinner, View } from "native-base";
import { useGetCommunitiesByUserIdQuery } from "../../../../redux/services/community/communities.service";
import { RootState, useAppSelector } from "../../../../redux/store/store";
import { NotFound } from "../../../../shared/components/notFound/NotFound";
import CommunityCard from "./CommunityCard";

export const CommunityList = () => {
  const { user } = useAppSelector((state: RootState) => state.user);

  const { data: communityData, isLoading: communityIsLoading } =
    useGetCommunitiesByUserIdQuery(user?.id as string);

  const communities = communityData?.map((item) => item.community);

  return communityIsLoading ? (
    <Center>
      <Spinner size={"lg"} />
    </Center>
  ) : (
    <FlatList
      data={communities}
      renderItem={({ item }) => (
        <CommunityCard
          data={item}
          heightCard={48}
          widthCard={72}
          marginTop={6}
        />
      )}
      keyExtractor={(item) => item.id}
      // horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ padding: 10, height: 215 }}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      ListFooterComponent={<View style={{ marginRight: 10 }} />}
      ListEmptyComponent={
        <NotFound message="Aún no perteneces a ninguna comunidad." height={250} />
      }
    />
  );
};
