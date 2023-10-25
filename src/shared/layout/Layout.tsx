import {
  StatusBar,
  View
} from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isDarkColor } from "../../helpers/is-dark-color/isDarkColor";

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  showCredits?: boolean;
}

export default function Layout({
  children,
  backgroundColor,
}: LayoutProps) {
  const insets = useSafeAreaInsets();

  const barStyle = isDarkColor(backgroundColor)
    ? "light-content"
    : "dark-content";

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      backgroundColor={backgroundColor}
    >
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
      {children}
    </View>
  );
}
