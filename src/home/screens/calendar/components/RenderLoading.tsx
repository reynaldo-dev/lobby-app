import { Center } from "native-base";
import { ActivityIndicator } from "react-native";

export const RenderLoading = () => {
  return (
    <Center flex={1}>
      <ActivityIndicator size="large" color="#0000ff" />
    </Center>
  );
};
