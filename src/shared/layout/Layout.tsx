import { StatusBar, View } from "native-base";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}
export default function Layout({ children, backgroundColor }: LayoutProps) {
  return (
    <View backgroundColor={backgroundColor} flex={1}>
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      {children}
    </View>
  );
}
