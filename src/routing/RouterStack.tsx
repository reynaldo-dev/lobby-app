import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "native-base";
import Login from "../auth/screens/login/Login";
import Register from "../auth/screens/register/Register";
import { CommunityScreen } from "../home/screens/Community/CommunityScreen";
import { SearchCommunity } from "../home/screens/Community/SearchCommunity";
import Home from "../home/screens/home/Home";
import Profile from "../home/screens/profile/Profile";
import { TicketsScreen } from "../home/screens/tickets/TicketsScreen";
import CustomQRCode from "../shared/components/qr/CustomQRCode";
import {
  AuthStackParamList,
  PrivateStackParamList,
  RootStackParamList,
} from "./navigation-types";
import { TicketAssistanceDetailScreen } from "../home/screens/tickets/TicketAssistanceDetailScreen";
import EventScreen from "../home/screens/Events/EventScreen";

import CalendarScreen from "../home/screens/calendar/CalendarScreen";
import { theme } from "../theme";

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
        }}
      />
      <authRouter.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
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
        }}
      />

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: "slide_from_right",
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="TicketAssistanceDetail"
          component={TicketAssistanceDetailScreen}
        />
        <Stack.Screen name="QRCode" component={CustomQRCode} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="SearchCommunity" component={SearchCommunity} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Tickets"
        component={TicketsScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Icon
              as={MaterialCommunityIcons}
              name="ticket-confirmation-outline"
              size={6}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: "Calendario",
          headerStyle: { backgroundColor: theme.colors.background },

          tabBarIcon: ({ color }) => (
            <Icon
              as={MaterialCommunityIcons}
              name="calendar"
              size={6}
              color={color}
            />
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
