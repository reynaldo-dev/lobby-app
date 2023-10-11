import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Box, Center, FlatList, Spinner, Text } from "native-base";
import React from 'react';
import { TouchableOpacity } from "react-native";
import { useGetAllChallengesQuery } from '../../../redux/services/challenges/challenges.service';
import { Challenge } from '../../../redux/services/challenges/interfaces/challenges.interfaces';
import { RootStackParamList } from "../../../routing/navigation-types";
import Layout from "../../../shared/layout/Layout";
import { ChallengeCard } from './components/ChallengeCard';


export const Challenges = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, "Challenges">>();
    const { data: challengesData, isLoading, isError, error } = useGetAllChallengesQuery({ from: 0, limit: 10 });


    if (isError || !challengesData) {
        return (
            <Layout showCredits={false}>
                <Center>

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
