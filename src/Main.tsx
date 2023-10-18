import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { getAuthStateFromAsyncStorage } from "./helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store/store";
import { getUserCredentials } from "./redux/thunks/user.thunk";
import {
  AuthStack,
  RootNavigator,
  RootNavigatorStaff,
} from "./routing/RouterStack";
import { theme } from "./theme";

export default function Main() {
  const { isAuth, user } = useAppSelector((state: RootState) => state.user);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getAuthStatus = async () => {
    const token = await getAuthStateFromAsyncStorage();
    setToken(token);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    getAuthStatus()
      .then(() => {
        dispatch(getUserCredentials());
      })
      .catch((error) => {
        setError(
          "No se ha podido iniciar sesión automaticamente, por favor coloca tu usuario y contraseña"
        );
      });
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
