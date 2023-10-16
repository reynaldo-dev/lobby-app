import {
  Box,
  Center,
  CheckIcon,
  FlatList,
  Select,
  Spinner,
  Text,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import RedeemableCard from "../components/RedeemableCard";
import { RootStackParamList } from "../../routing/navigation-types";
import { useGetRedeemablesQuery } from "../../redux/services/redeemeables.service";
import Layout from "../../shared/layout/Layout";

export const Redeemables = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Redeemables">>();
  const {
    data: redeemables,
    isLoading,
    isError,
    error,
  } = useGetRedeemablesQuery();

  const [selectedTokenType, setSelectedTokenType] = React.useState<
    string | undefined
  >(undefined);

  const tokenTypes = React.useMemo(() => {
    const types = redeemables
      ? [...new Set(redeemables.map((r) => r.token.name))]
      : [];
    return ["Todos", ...types];
  }, [redeemables]);

  const filteredRedeemables = redeemables?.filter(
    (redeemable) =>
      !selectedTokenType ||
      selectedTokenType === "Todos" ||
      redeemable.token.name === selectedTokenType
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
          <Text
            fontSize={16}
            color={"muted.500"}
            fontWeight="bold"
            marginRight={10}
          >
            Canjeables
          </Text>
        </Center>
      </Box>

      <Center>
        <Select
          my={4}
          selectedValue={selectedTokenType}
          width={"95%"}
          accessibilityLabel="Filtrar por tipo de token"
          placeholder="Filtrar por tipo de token"
          onValueChange={(itemValue) => setSelectedTokenType(itemValue)}
          _selectedItem={{
            bg: "primary.600",
            endIcon: <CheckIcon size={5} />,
          }}
        >
          {tokenTypes.map((type, index) => (
            <Select.Item key={index} label={type} value={type} />
          ))}
        </Select>
      </Center>

      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" color="blue" />
        </Center>
      ) : (
        <FlatList
          data={filteredRedeemables}
          renderItem={({ item }) => <RedeemableCard redeemable={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 4 }}
        />
      )}
    </Layout>
  );
};

export default Redeemables;
