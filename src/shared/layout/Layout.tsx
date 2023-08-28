import { StatusBar, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isDarkColor } from "../../helpers/isDarkColor";

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export default function Layout({ children, backgroundColor }: LayoutProps) {
  const insets = useSafeAreaInsets();

  const barStyle = isDarkColor(backgroundColor) ? "light-content" : "dark-content";

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
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
      {children}
    </View>
  );
}

