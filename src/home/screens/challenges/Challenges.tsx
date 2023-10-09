import React from 'react';
import { Box, Center, Text, FlatList, Spinner } from "native-base";
import Layout from "../../../shared/layout/Layout";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { RootStackParamList } from "../../../routing/navigation-types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useGetAllChallengesQuery } from '../../../redux/services/challenges/challenges.service';
import { Challenge } from '../../../redux/services/challenges/interfaces/challenges.interfaces';
import { ChallengeCard } from './components/ChallengeCard';


export const Challenges = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, "Challenges">>();
    const { data: challengesData, isLoading, isError, error } = useGetAllChallengesQuery({ from: 0, limit: 10 });
    console.log("first render")
    console.log(challengesData, "data")
    console.log(error, "error")


    if (isError || !challengesData) {
        return (
            <Layout showCredits={false}>
                <Center>
                    {/* Puedes mostrar un mensaje de error aquí */}
                </Center>
            </Layout>
        );
    }

    const renderChallengeItem = ({ item }: { item: Challenge }) => (
        <ChallengeCard challenge={item} />
    );

    return (
        <Layout showCredits={false}>
            <Box flexDirection="row" alignItems="center" ml={2} height={50}>
                <Box>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                </Box>
                <Center flex={1}>
                    <Text fontSize={16} color={"muted.500"} fontWeight="bold" marginRight={10}>
                        Retos
                    </Text>
                </Center>
            </Box>
            {
                isLoading ?
                    <Center>
                        <Spinner></Spinner>
                    </Center>
                    :
                    <FlatList
                        data={challengesData.data}
                        renderItem={renderChallengeItem}
                        keyExtractor={(item) => item.id}
                    />
            }
        </Layout>
    );
};
