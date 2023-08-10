import { AuthStack, RootNavigator } from "./routing/RouterStack";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "./theme";
import { useEffect } from "react";
import { getUserCredentials } from "./redux/slices/user/user.thunk";

export default function Main() {
  const { isAuth } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCredentials());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          {isAuth ? <RootNavigator /> : <AuthStack />}
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
