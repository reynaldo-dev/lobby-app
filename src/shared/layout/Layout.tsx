import { StatusBar, View } from "native-base";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <View backgroundColor="white" flex={1} >
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {children}
    </View>
  );
}
