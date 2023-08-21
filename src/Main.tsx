import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { getUserCredentials } from "./redux/slices/user/user.thunk";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store/store";
import { AuthStack, RootNavigator } from "./routing/RouterStack";
import { theme } from "./theme";

export default function Main() {
  const { isAuth } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCredentials());
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        {isAuth ? <RootNavigator /> : <AuthStack />}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
