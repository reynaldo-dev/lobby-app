import { AntDesign } from '@expo/vector-icons';
import { Center, Icon, Input } from "native-base";
import { useEffect, useState } from "react";
import { useLazyGetUserByFullNameQuery } from "../../redux/services/user/user.service";
import Layout from "../../shared/layout/Layout";
import UserList from './components/UserList';
import { ActivityIndicator } from 'react-native';

export const Recognitions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const [getSearchUsers, { data: searchUsersData }] = useLazyGetUserByFullNameQuery();

    const clearSearch = () => {
        setSearchTerm("");
    };

    const handleSearch = () => {
        setIsSearching(true);
        getSearchUsers(searchTerm);
    };

    useEffect(() => {
        if (searchUsersData) {
            setIsSearching(false);
        }
    }, [searchUsersData]);

    return (
        <Layout>
            <Input
                width={"95%"}
                p={3}
                alignSelf={"center"}
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
                placeholder="Buscar usuario"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={handleSearch}
            />
            {
                isSearching ?
                    <Center flex={1}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </Center>
                    :
                    searchUsersData && (
                        <UserList users={searchUsersData} />
                    )
            }
        </Layout>
    )
}