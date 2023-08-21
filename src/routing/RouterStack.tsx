import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "native-base";
import { Platform } from "react-native";
import Login from "../auth/screens/login/Login";
import PasswordUpdate from "../auth/screens/password-update/PasswordUpdate";
import Register from "../auth/screens/register/Register";
import { CommunityScreen } from "../home/screens/Community/CommunityScreen";
import { SearchCommunity } from "../home/screens/Community/SearchCommunity";
import EventScreen from "../home/screens/Events/EventScreen";
import CalendarScreen from "../home/screens/calendar/CalendarScreen";
import Home from "../home/screens/home/Home";
import Step1 from "../home/screens/onboarding/step-1/Step1";
import Step2 from "../home/screens/onboarding/step-2/Step2";
import Step3 from "../home/screens/onboarding/step-3/Step3";
import Step4 from "../home/screens/onboarding/step-4/Step4";
import Profile from "../home/screens/profile/Profile";
import EditProfile from "../home/screens/profile/components/edit-profile/EditProfile";
import { TicketAssistanceDetailScreen } from "../home/screens/tickets/TicketAssistanceDetailScreen";
import { TicketsScreen } from "../home/screens/tickets/TicketsScreen";
import { BarScanner } from "../home/screens/tickets/components/BarScanner";
import CustomQRCode from "../shared/components/qr/CustomQRCode";
import { theme } from "../theme";
import {
  AuthStackParamList,
  PrivateStackParamList,
  RootStackParamList,
} from "./navigation-types";



const authRouter = createNativeStackNavigator<AuthStackParamList>();
const privateStack = createNativeStackNavigator<PrivateStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


export const AuthStack = () => {
  return (
    <authRouter.Navigator initialRouteName="Step1">
      <authRouter.Screen
        name="Step1"
        component={Step1}
        options={{
          headerShown: false,
        }}
      />
      <authRouter.Screen
        name="Step2"
        component={Step2}
        options={{
          headerShown: false,
        }}
      />

      <authRouter.Screen
        name="Step3"
        component={Step3}
        options={{
          headerShown: false,
        }}
      />

      <authRouter.Screen
        name="Step4"
        component={Step4}
        options={{
          headerShown: false,
        }}
      />

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
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Auth"
      screenOptions={
        {
          gestureEnabled: true,
        }
      }
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Group
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="TicketAssistanceDetail"
          component={TicketAssistanceDetailScreen}

        />

        <Stack.Screen name="QRCode" component={CustomQRCode} />
        <Stack.Screen name="Community" component={CommunityScreen}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
        />

        <Stack.Screen
          name="PasswordUpdate"
          component={PasswordUpdate}
        />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="SearchCommunity" component={SearchCommunity} />
        <Stack.Screen name="BarScanner" component={BarScanner} />
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
        tabBarActiveTintColor: "#F50057",
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
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
