import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { ICommunity } from "../../interfaces/community.interface";
import {
  useGetCommunitiesQuery,
  useLazyGetSearchCommunitiesQuery,
} from "../../redux/services/communities.service";
import CommunityCard from "../components/CommunityCard";
import Layout from "../../shared/layout/Layout";

export const SearchCommunity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [localSearchResults, setLocalSearchResults] = useState<
    ICommunity[] | null
  >(null);
  const [searchResults, setSearchResults] = useState<ICommunity[] | null>(null);
  const navigation = useNavigation();

  const { data: allCommunities } = useGetCommunitiesQuery();

  const [getSearchCommunities, { data: searchCommunitiesData }] =
    useLazyGetSearchCommunitiesQuery();

  const handleSearch = () => {
    setIsSearching(true);
    getSearchCommunities(searchTerm);
  };

  useEffect(() => {
    if (searchCommunitiesData) {
      setLocalSearchResults(searchCommunitiesData);
      setIsSearching(false);
    }
  }, [searchCommunitiesData]);

  useEffect(() => {
    if (searchTerm === "") {
      setLocalSearchResults(null);
      setSearchResults(allCommunities || null);
    } else if (localSearchResults) {
      setSearchResults(localSearchResults);
    }
  }, [searchTerm, allCommunities, localSearchResults]);

  useEffect(() => {
    if (allCommunities) {
      setIsLoading(false);
    }
  }, [allCommunities]);

  const clearSearch = () => {
    setSearchTerm("");
    setLocalSearchResults(null);
  };

  return (
    <Layout showCredits={false}>
      <View flex={1}>
        <HStack
          w="100%"
          justifyContent={"space-around"}
          alignItems={"center"}
          mt={4}
        >
          <Box flexDirection="row" alignItems="center" height={50}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View width={"88%"}>
              <Input
                ml={2}
                p={3}
                justifyContent="center"
                borderRadius={10}
                backgroundColor={"white"}
                InputLeftElement={
                  <Icon
                    as={<AntDesign name="search1" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                InputRightElement={
                  searchTerm ? (
                    <Icon
                      as={<AntDesign name="closecircle" />}
                      size={5}
                      mr="2"
                      color="muted.400"
                      onPress={clearSearch}
                    />
                  ) : undefined
                }
                placeholder="Buscar comunidad"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={handleSearch}
              />
            </View>
          </Box>
        </HStack>
        {isLoading || isSearching ? (
          <Center flex={1}>
            <ActivityIndicator size="large" color="#0000ff" />
          </Center>
        ) : searchResults?.length === 0 ? (
          <Center my={"auto"}>
            <Text>No se encontraron comunidades</Text>
          </Center>
        ) : (
          <ScrollView flex={1}>
            {searchResults?.map((community) => (
              <Center key={community.id}>
                <CommunityCard
                  data={community}
                  heightCard={48}
                  widthCard={80}
                  marginTop={10}
                />
              </Center>
            ))}
          </ScrollView>
        )}
      </View>
    </Layout>
  );
};
