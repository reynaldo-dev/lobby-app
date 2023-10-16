import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { getUserCredentials } from "./redux/thunks/user.thunk";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store/store";
import {
  AuthStack,
  RootNavigator,
  RootNavigatorStaff,
} from "./routing/RouterStack";
import { theme } from "./theme";

export default function Main() {
  const { isAuth, user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const api = process.env.EXPO_PUBLIC_API_URL;
  console.log(api);
  useEffect(() => {
    dispatch(getUserCredentials());
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        {isAuth ? (
          user?.role === "funcionario" ? (
            <RootNavigator />
          ) : user?.role === "staff" ? (
            <RootNavigatorStaff />
          ) : (
            <RootNavigator />
          )
        ) : (
          <AuthStack />
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
