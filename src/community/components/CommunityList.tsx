import { FlatList, View } from 'native-base';
import { useGetCommunitiesByUserIdQuery } from '../../redux/services/communities.service';
import { RootState, useAppSelector } from '../../redux/store/store';
import { CustomSpinner } from '../../shared/components/CustomSpinner/CustomSpinner';
import { NotFound } from '../../shared/components/notFound/NotFound';
import CommunityCard from './CommunityCard';

export const CommunityList = () => {
     const { user } = useAppSelector((state: RootState) => state.user);

     const { data: communityData, isLoading: communityIsLoading } =
          useGetCommunitiesByUserIdQuery(user?.id as string);

     const communities = communityData?.map((item) => item.community);

     return communityIsLoading ? (
          <CustomSpinner />
     ) : (
          <FlatList
               data={communities}
               renderItem={({ item }) => <CommunityCard data={item} />}
               keyExtractor={(item) => item.id}
               showsHorizontalScrollIndicator={false}
               style={{ padding: 10, height: 215 }}
               contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
               }}
               ListFooterComponent={<View style={{ marginRight: 10 }} />}
               ListEmptyComponent={
                    <NotFound message="Aún no perteneces a ninguna comunidad." />
               }
          />
     );
};
