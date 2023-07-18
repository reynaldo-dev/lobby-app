import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Button colorScheme="blue">Button</Button>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
