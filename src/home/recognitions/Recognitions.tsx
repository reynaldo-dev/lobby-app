import { AntDesign } from '@expo/vector-icons';
import { Center, Icon, Input, Spinner, Text } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import { useLazyGetUserByFullNameQuery } from "../../redux/services/user/user.service";
import Layout from "../../shared/layout/Layout";
import UserList from './components/UserList';

export const Recognitions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [getSearchUsers, { data: searchUsersData }] = useLazyGetUserByFullNameQuery();

    const clearSearch = () => {
        setSearchTerm("");
    };

    const handleSearch = () => {
        setIsSearching(true);
        getSearchUsers({ query: searchTerm, limit: 20 });
    };

    useEffect(() => {
        if (searchUsersData) {
            setIsSearching(false);
        }
    }, [searchUsersData]);

    useEffect(() => {
        setIsSearching(true);
        getSearchUsers({ query: '', limit: 10 });
    }, [getSearchUsers]);

    return (
        <Layout showCredits={false}>
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
                        <Spinner color="blue" />
                    </Center>
                    :
                    searchUsersData ? (
                        searchUsersData.length > 0 ? (
                            <UserList users={searchUsersData} />
                        ) : (
                            //TODO: cambiar por un componente de error
                            <Center flex={1}>
                                <Text>No se encontraron resultados</Text>
                            </Center>
                        )
                    ) : null
            }
        </Layout>
    )
}