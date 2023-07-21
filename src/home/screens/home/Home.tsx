import React from "react";
import { View } from "react-native";
import { CommunityList } from "../Community/components/CommunityList";

export default function Home() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log(apiUrl, "apiUrl")
  return (
    <View>
      <CommunityList />
    </View>
  );
}
