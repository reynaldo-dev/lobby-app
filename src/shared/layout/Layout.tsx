import { StatusBar, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export default function Layout({ children, backgroundColor }: LayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }
      }

      backgroundColor={backgroundColor}>
      <StatusBar backgroundColor={backgroundColor} barStyle={"dark-content"} />
      {children}
    </View>
  );
}

