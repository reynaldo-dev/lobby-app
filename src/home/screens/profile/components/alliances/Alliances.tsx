import { Box, Center, FlatList, Text } from "native-base"
import Layout from "../../../../../shared/layout/Layout"
import React from "react"
import { TouchableOpacity } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../../../../routing/navigation-types"
import { AntDesign } from '@expo/vector-icons';
import { useGetAlliancesQuery } from "../../../../../redux/services/alliances/alliances.service"
import { AlliancesCard } from "./components/AlliancesCard"

export const Alliances = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, "Alliances">>();

    const { data: alliances, isLoading, isError, error } = useGetAlliancesQuery();


    return (
        <Layout>
            <Box flexDirection="row" alignItems="center" ml={2} height={50}>
                <Box>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                </Box>
                <Center flex={1}>
                    <Text fontSize={16} color={"muted.500"} fontWeight="bold" marginRight={10}>
                        Mis beneficios
                    </Text>
                </Center>
            </Box>
            <FlatList
                data={alliances}
                renderItem={({ item }) => <AlliancesCard alliance={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 4 }}
            />

        </Layout>
    )
}