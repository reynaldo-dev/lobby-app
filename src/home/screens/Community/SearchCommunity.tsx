import {
  Stack,
  Input,
  Icon,
  Button,
  HStack,
  Card,
  Center,
  ScrollView,
} from "native-base";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CommunityCard from "./components/CommunityCard";
import { useLazyGetSearchCommunitiesQuery } from "../../../redux/communities.service";
import { ICommunity } from "../../../interfaces/community.interface";

export const SearchCommunity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ICommunity[] | null>(null);
  const navigation = useNavigation();

  const [getSearchCommunities, { data: searchCommunitiesData }] =
    useLazyGetSearchCommunitiesQuery();

  const handleSearch = () => {
    getSearchCommunities(searchTerm);
  };

  useEffect(() => {
    if (searchCommunitiesData) {
      setSearchResults(searchCommunitiesData);
    }
  }, [searchCommunitiesData]);

  return (
    <>
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
          placeholder="Buscar comunidad"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
        />
      </HStack>
      <ScrollView>
        {searchResults?.map((community) => (
          <Center>
            <CommunityCard
              community={community}
              heightCard={48}
              widthCard={80}
              marginTop={10}
            />
          </Center>
        ))}
      </ScrollView>
    </>
  );
};
