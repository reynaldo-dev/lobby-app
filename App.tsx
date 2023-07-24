import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { AuthStack, BottomTabNavigation, RootNavigator } from "./src/routing/RouterStack";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "./src/theme";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <NativeBaseProvider theme={theme}>
            {isAuth ? <RootNavigator /> : <AuthStack />}
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
