import { Center } from "native-base";
import { ActivityIndicator } from "react-native";
import { theme } from "../../theme";

export const RenderLoading = () => {
  return (
    <Center flex={1}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Center>
  );
};
