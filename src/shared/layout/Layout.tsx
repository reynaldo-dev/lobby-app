import { StatusBar, View } from "native-base";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}
export default function Layout({ children, backgroundColor }: LayoutProps) {
  return (
    <View flex={1} backgroundColor={backgroundColor}>
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      {children}
    </View>
  );
}
