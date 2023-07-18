import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { AuthStack, PrivateStack } from "./src/routing/RouterStack";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "./src/theme";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          {isAuth ? <PrivateStack /> : <AuthStack />}
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
