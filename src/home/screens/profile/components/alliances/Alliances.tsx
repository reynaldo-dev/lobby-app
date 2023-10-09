import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Box, Center, CheckIcon, FlatList, Select, Spinner, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useGetAlliancesQuery } from "../../../../../redux/services/alliances/alliances.service";
import { RootStackParamList } from "../../../../../routing/navigation-types";
import Layout from "../../../../../shared/layout/Layout";
import { AlliancesCard } from "./components/AlliancesCard";

export const Alliances = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, "Alliances">>();
    const { data: alliances, isLoading, isError, error } = useGetAlliancesQuery();

    const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>(undefined);

    const categories = React.useMemo(() => {
        const cats = alliances ? [...new Set(alliances.map(a => a.allianceCategory.name))] : [];
        return ['Todas', ...cats];
    }, [alliances]);

    const filteredAlliances = alliances?.filter(alliance =>
        !selectedCategory ||
        selectedCategory === 'Todas' ||
        alliance.allianceCategory.name === selectedCategory
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
                        Alianzas comerciales
                    </Text>
                </Center>
            </Box>

            <Center>
                <Select
                    my={4}
                    selectedValue={selectedCategory}
                    width={"95%"}
                    accessibilityLabel="Filtrar por categoría"
                    placeholder="Filtrar por categoría"
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    _selectedItem={{
                        bg: "primary.600",
                        endIcon: <CheckIcon size={5} />,
                    }}
                >
                    {categories.map((category, index) => (
                        <Select.Item key={index} label={category} value={category} />
                    ))}
                </Select>
            </Center>

            {isLoading ? (
                <Center flex={1}>
                    <Spinner size="lg" />
                </Center>
            ) : (
                <FlatList
                    data={filteredAlliances}
                    renderItem={({ item }) => <AlliancesCard alliance={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: 4 }}
                />
            )}
        </Layout>
    )
}

export default Alliances;
