import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "native-base";
import Login from "../auth/screens/login/Login";
import PasswordUpdate from "../auth/screens/password-update/PasswordUpdate";
import Register from "../auth/screens/register/Register";
import { Recognitions } from "../home/recognitions/Recognitions";
import MyRecognitions from "../home/recognitions/components/MyRecognitions";
import SendRecognition from "../home/recognitions/components/SendRecognition";
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
import { Alliances } from "../home/screens/profile/components/alliances/Alliances";
import EditProfile from "../home/screens/profile/components/edit-profile/EditProfile";
import { EventHistory } from "../home/screens/profile/components/event-history/EventHistory";
import Redeemables from "../home/screens/reedemables/Reedemables";
import { TicketAssistanceDetailScreen } from "../home/screens/tickets/TicketAssistanceDetailScreen";
import { TicketConsumableDetailScreen } from "../home/screens/tickets/TicketConsumableDetailScreen";
import { TicketsScreen } from "../home/screens/tickets/TicketsScreen";
import { BarScanner } from "../home/screens/tickets/components/BarScanner";
import CustomQRCode from "../shared/components/qr/CustomQRCode";
import { BarScannerStaff } from "../staff/screens/BarScanner/BarScannerStaff";
import { HomeStaff } from "../staff/screens/home/HomeStaff";
import { theme } from "../theme";
import {
  AuthStackParamList,
  RootStackParamList,
} from "./navigation-types";
import { MyUpcomingEvents } from "../home/screens/Events/components/MyUpcomingEvents";
import { MyCommunities } from "../home/screens/Community/components/MyCommunities";



const authRouter = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const TabStaff = createBottomTabNavigator();


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
          name="Step1"
          component={Step1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Step2"
          component={Step2}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Step3"
          component={Step3}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Step4"
          component={Step4}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TicketAssistanceDetail"
          component={TicketAssistanceDetailScreen}
        />

        <Stack.Screen
          name="TicketConsumableDetail"
          component={TicketConsumableDetailScreen}
        />

        <Stack.Screen name="QRCode" component={CustomQRCode} />
        <Stack.Screen name="Community" component={CommunityScreen} />

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
        <Stack.Screen name="EventHistory" component={EventHistory} />
        <Stack.Screen name="Alliances" component={Alliances} />
        <Stack.Screen name="Recognitions" component={Recognitions} />
        <Stack.Screen name="SendRecognition" component={SendRecognition} />
        <Stack.Screen name="Redeemables" component={Redeemables} />
        <Stack.Screen name="MyRecognitions" component={MyRecognitions} />
        <Stack.Screen name="MyUpcomingEvents" component={MyUpcomingEvents} />
        <Stack.Screen name="MyCommunities" component={MyCommunities} />
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
        tabBarActiveTintColor: "#F50057",
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Inicio",
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
          title: "Cupones",
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
          title: "Perfil",
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="user" size={6} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export function RootNavigatorStaff() {

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
        component={BottomTabNavigationStaff}
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
        <Stack.Screen name="QRCode" component={CustomQRCode} />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
        />

        <Stack.Screen
          name="PasswordUpdate"
          component={PasswordUpdate}
        />
        <Stack.Screen name="BarScannerStaff" component={BarScannerStaff} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export const BottomTabNavigationStaff = () => {
  return (
    <TabStaff.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#f7f6fb" },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#F50057",
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      }}
    >
      <TabStaff.Screen
        name="Home"
        component={HomeStaff}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="home" size={6} color={color} />
          ),
        }}
      />

      <TabStaff.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="user" size={6} color={color} />
          ),
        }}
      />
    </TabStaff.Navigator>
  );
};
