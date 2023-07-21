import { FlatList, Text, View } from "native-base";
import { useGetCommunitiesQuery } from "../../../../services/communities.service";
import CommunityCard from "./CommunityCard";
import { ICommunity } from '../../../../interfaces/community.interface';
import { SkeletonCard } from "../../../../shared/components/SkeletonCard";

export const CommunityList = () => {
    const { data: communityData, isLoading: communityIsLoading, isError: communityIsError } = useGetCommunitiesQuery();
    return communityIsLoading ? (
        <SkeletonCard />
    ) : (
        <FlatList
            data={communityData}
            renderItem={({ item }) => (
                <CommunityCard community={item} />
            )}
            keyExtractor={(item: ICommunity) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ padding: 10, height: 300 }}
            ListFooterComponent={<View style={{ marginRight: 10 }} />}
        />
    );
}
