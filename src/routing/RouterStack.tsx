import { AuthStackParamList, PrivateStackParamList } from "./navigation-types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/screens/login/Login";
import Profile from "../auth/screens/profile/Profile";
import Register from "../auth/screens/register/Register";
import { Icon, useTheme } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Home from "../home/screens/home/Home";
import CustomQRCode from "../shared/qr/CustomQRCode";
import { Community } from "../home/screens/Community/Community";
import { NavigationContainer } from "@react-navigation/native";

const authRouter = createNativeStackNavigator<AuthStackParamList>();
const privateStack = createNativeStackNavigator<PrivateStackParamList>();
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

export const PrivateStack = () => {
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
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="addusergroup" size={6} color={color} />
          ),
        }}
      />

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
