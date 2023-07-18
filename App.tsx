import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { AuthStack } from "./src/routing/RouterStack";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "./src/theme";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          {isAuth ? <Text>Home</Text> : <AuthStack />}
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
