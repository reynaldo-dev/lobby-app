import { Stack, Input, Icon, Button } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState } from 'react';


type Props = {
    route: string;
}


export const SearchBar = ({ route }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://e45d-138-186-250-179.ngrok-free.app/api/${route}/search/${searchTerm}`);
            const communities = await response.json();
            console.log(communities, "communities")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Stack space={4} w="100%" alignItems="center" mt={5}>
            <Input
                w={{
                    base: "75%",
                    md: "25%"
                }}
                InputLeftElement={
                    <Icon
                        as={<AntDesign name="search1" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }
                placeholder="Search"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={handleSearch}
            />



        </Stack>
    )

}