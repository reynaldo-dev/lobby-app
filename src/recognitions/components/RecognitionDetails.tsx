import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, HStack, Input, Select, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import avatarImage from "../../../assets/avatar.png";
import { RootStackParamList } from "../../routing/navigation-types";
import Layout from "../../shared/layout/Layout";
import { IRecognition } from "../interfaces/recognitions.interface";
import { useGetRecognitionCategoriesQuery } from "../../redux/services/recognitions.service";
import { formatDate } from "../../helpers/date-format/DateFormat";

type ViewRecognitionProps = NativeStackScreenProps<
  RootStackParamList,
  "RecognitionDetails"
>;

export const RecognitionDetails: React.FC<ViewRecognitionProps> = ({
  route,
}) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "RecognitionDetails">>();

  const recognition: IRecognition = route.params.recognition;
  const { data: categoriesData } = useGetRecognitionCategoriesQuery();
  const dateFormatted = formatDate(recognition.createdAt);

  return (
    <Layout showCredits={false}>
      <VStack flex={1} px={5} py={6} space={4}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <HStack alignItems="center" space={4}>
          <Avatar
            size="48px"
            source={
              recognition.userSource.picture
                ? { uri: recognition.userSource.picture }
                : avatarImage
            }
          />
          <VStack>
            <Text fontSize="lg" bold textTransform={"capitalize"}>
              {recognition.userSource.name} {recognition.userSource.lastname}
            </Text>
            <Text fontSize="sm" color="gray.500" maxWidth={"90%"}>
              Reconocimiento recibido: {dateFormatted}
            </Text>
          </VStack>
        </HStack>

        <Select
          selectedValue={recognition.categoryId}
          accessibilityLabel="Categoría de reconocimiento"
          placeholder="Categoría de reconocimiento"
          isDisabled={true}
          mt={4}
        >
          {categoriesData?.map((category) => (
            <Select.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Select>

        <Input
          height="200px"
          multiline
          numberOfLines={5}
          value={recognition.description}
          isReadOnly={true}
          bg="gray.100"
          textAlignVertical="top"
          mb={4}
        />
      </VStack>
    </Layout>
  );
};

export default RecognitionDetails;
