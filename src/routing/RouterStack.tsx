import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon, useTheme } from "native-base";
import Login from "../auth/screens/login/Login";
import Register from "../auth/screens/register/Register";
import { CommunityScreen } from "../home/screens/Community/CommunityScreen";
import Home from "../home/screens/home/Home";
import Profile from "../home/screens/profile/Profile";
import CustomQRCode from "../shared/qr/CustomQRCode";
import { AuthStackParamList, PrivateStackParamList, RootStackParamList } from "./navigation-types";
import { SearchCommunity } from '../home/screens/Community/SearchCommunity';

const authRouter = createNativeStackNavigator<AuthStackParamList>();
const privateStack = createNativeStackNavigator<PrivateStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export const AuthStack = () => {

  return (
    <authRouter.Navigator initialRouteName="Login">
      <authRouter.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          statusBarColor: "#3B82F6",
        }}
      />
      <authRouter.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          statusBarColor: "#3B82F6",
        }}
      />
    </authRouter.Navigator>
  );
};

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
          statusBarColor: "#3B82F6",
        }}
      />

      <Stack.Group screenOptions={{ presentation: "modal", animation: "fade_from_bottom", headerShown: false }}>
        <Stack.Screen name="QRCode" component={CustomQRCode} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="SearchCommunity" component={SearchCommunity} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export const BottomTabNavigation = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#f7f6fb" },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3B82F6",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="home" size={6} color={color} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="addusergroup" size={6} color={color} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="user" size={6} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
