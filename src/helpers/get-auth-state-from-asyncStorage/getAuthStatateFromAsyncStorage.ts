import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthStateFromAsyncStorage = async () => {
  const authStateString = await AsyncStorage.getItem("authState");
  if (authStateString !== null) {
    const authState = JSON.parse(authStateString);
    if (authState.access_token) {
      return `Bearer ${authState.access_token}`;
    }
  }
  return null;
};
