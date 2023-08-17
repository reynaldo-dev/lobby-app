import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
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
import { ICommunity } from "../../../interfaces/community.interface";
import {
  useGetCommunitiesQuery,
  useLazyGetSearchCommunitiesQuery,
} from "../../../redux/services/community/communities.service";
import CommunityCard from "./components/CommunityCard";

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
    <View flex={1}>
      <HStack
        w="100%"
        justifyContent={"space-around"}
        alignItems={"center"}
        mt={4}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Input
          w={{
            base: "80%",
            md: "85%",
          }}
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
  );
};
