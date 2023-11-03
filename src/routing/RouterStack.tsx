import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'native-base';
import { Alliances } from '../alliances/screens/Alliances';
import Login from '../auth/screens/login/Login';
import PasswordUpdate from '../auth/screens/password-update/PasswordUpdate';
import Register from '../auth/screens/register/Register';
import CalendarScreen from '../calendar/screens/CalendarScreen';
import { ChallengeDetailScreen } from '../challenges/screens/ChallengeDetailScreen';
import { Challenges } from '../challenges/screens/Challenges';
import { CommunityScreen } from '../community/screens/CommunityScreen';
import { MyCommunities } from '../community/screens/MyCommunities';
import { SearchCommunity } from '../community/screens/SearchCommunity';
import EventScreen from '../events/screens/EventScreen';
import { UpcomingEvents } from '../events/screens/UpcomingEvents';
import Home from '../home/screens/Home';
import Step1 from '../onboarding/screens/Step1';
import Step2 from '../onboarding/screens/Step2';
import Step3 from '../onboarding/screens/Step3';
import Step4 from '../onboarding/screens/Step4';
import EditProfile from '../profile/components/EditProfile';
import { EventHistory } from '../profile/screens/EventHistory';
import Profile from '../profile/screens/Profile';
import { Ranking } from '../ranking/screens/Ranking';
import RecognitionDetails from '../recognitions/components/RecognitionDetails';
import { Recognitions } from '../recognitions/screens/Recognitions';
import { RecognitionsTabView } from '../recognitions/screens/RecognitionsTabView';
import SendRecognition from '../recognitions/screens/SendRecognition';
import RedeemableDetail from '../redeemables/screens/RedeemableDetail';
import Redeemables from '../redeemables/screens/Reedemables';
import TradeTicketShot from '../redeemables/screens/TradeTicketShot';
import CustomQRCode from '../shared/components/qr/CustomQRCode';
import { BarScannerStaff } from '../staff/screens/BarScanner/BarScannerStaff';
import { HomeStaff } from '../staff/screens/home/HomeStaff';
import { theme } from '../theme';
import { BarScanner } from '../tickets/screens/BarScanner';
import { TicketAssistanceDetailScreen } from '../tickets/screens/TicketAssistanceDetailScreen';
import { TicketConsumableDetailScreen } from '../tickets/screens/TicketConsumableDetailScreen';
import { TicketsScreen } from '../tickets/screens/TicketsScreen';
import { AuthStackParamList, RootStackParamList } from './navigation-types';

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

export function FirstTimeStack() {
     return (

          <Stack.Navigator
               initialRouteName="Step1"
               screenOptions={{
                    gestureEnabled: true,
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
                    name="PasswordUpdate"
                    component={PasswordUpdate}
                    options={{
                         headerShown: false,
                    }}
               />
          </Stack.Navigator>
     );

}

export function RootNavigator() {
     return (
          <Stack.Navigator
               initialRouteName="Auth"
               screenOptions={{
                    gestureEnabled: true,
               }}
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
                         animation: 'slide_from_right',
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
                    <Stack.Screen
                         name="Community"
                         component={CommunityScreen}
                    />

                    <Stack.Screen name="EditProfile" component={EditProfile} />

                    <Stack.Screen
                         name="PasswordUpdate"
                         component={PasswordUpdate}
                    />

                    <Stack.Screen name="Event" component={EventScreen} />
                    <Stack.Screen
                         name="SearchCommunity"
                         component={SearchCommunity}
                    />
                    <Stack.Screen name="BarScanner" component={BarScanner} />
                    <Stack.Screen
                         name="EventHistory"
                         component={EventHistory}
                    />
                    <Stack.Screen name="Alliances" component={Alliances} />
                    <Stack.Screen
                         name="Recognitions"
                         component={Recognitions}
                    />
                    <Stack.Screen
                         name="SendRecognition"
                         component={SendRecognition}
                    />
                    <Stack.Screen name="Redeemables" component={Redeemables} />
                    <Stack.Screen
                         name="MyRecognitions"
                         component={RecognitionsTabView}
                         options={{
                              gestureEnabled: false,
                         }}
                    />
                    <Stack.Screen name="Calendar" component={CalendarScreen} />
                    <Stack.Screen
                         name="MyCommunities"
                         component={MyCommunities}
                    />
                    <Stack.Screen name="Challenges" component={Challenges} />
                    <Stack.Screen
                         name="ChallengeDetail"
                         component={ChallengeDetailScreen}
                    />
                    <Stack.Screen
                         name="RedeemableDetail"
                         component={RedeemableDetail}
                    />
                    <Stack.Screen
                         name="TradeTicket"
                         component={TradeTicketShot}
                    />
                    <Stack.Screen
                         name="RecognitionDetails"
                         component={RecognitionDetails}
                    />
               </Stack.Group>
          </Stack.Navigator>
     );
}

export const BottomTabNavigation = () => {
     return (
          <Tab.Navigator
               initialRouteName="Home"
               screenOptions={{
                    tabBarStyle: { backgroundColor: '#f7f6fb' },
                    tabBarActiveTintColor: '#F50057',
                    tabBarHideOnKeyboard: true,
                    unmountOnBlur: true,
               }}
          >
               <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                         title: 'Inicio',
                         headerShown: false,
                         tabBarIcon: ({ color }) => (
                              <Icon
                                   as={AntDesign}
                                   name="home"
                                   size={6}
                                   color={color}
                              />
                         ),
                    }}
               />

               <Tab.Screen
                    name="Tickets"
                    component={TicketsScreen}
                    options={{
                         title: 'Cupones',
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
                    name="Ranking"
                    component={Ranking}
                    options={{
                         title: 'Ranking',
                         headerStyle: {
                              backgroundColor: theme.colors.background,
                         },
                         headerShown: false,

                         tabBarIcon: ({ color }) => (
                              <Icon
                                   as={AntDesign}
                                   name="Trophy"
                                   size={6}
                                   color={color}
                              />
                         ),
                    }}
               />

               <Tab.Screen
                    name="Eventos"
                    component={UpcomingEvents}
                    options={{
                         title: 'Eventos',
                         headerStyle: {
                              backgroundColor: theme.colors.background,
                         },
                         headerShown: false,

                         tabBarIcon: ({ color }) => (
                              <Icon
                                   as={AntDesign}
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
                         title: 'Perfil',
                         headerShown: false,

                         tabBarIcon: ({ color }) => (
                              <Icon
                                   as={AntDesign}
                                   name="user"
                                   size={6}
                                   color={color}
                              />
                         ),
                    }}
               />

          </Tab.Navigator>
     );
};

export function RootNavigatorStaff() {
     return (
          <Stack.Navigator
               initialRouteName="Auth"
               screenOptions={{
                    gestureEnabled: true,
               }}
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
                         animation: 'slide_from_right',
                         headerShown: false,
                    }}
               >
                    <Stack.Screen name="QRCode" component={CustomQRCode} />

                    <Stack.Screen name="EditProfile" component={EditProfile} />

                    <Stack.Screen
                         name="PasswordUpdate"
                         component={PasswordUpdate}
                    />
                    <Stack.Screen
                         name="BarScannerStaff"
                         component={BarScannerStaff}
                    />
               </Stack.Group>
          </Stack.Navigator>
     );
}

export const BottomTabNavigationStaff = () => {
     return (
          <TabStaff.Navigator
               initialRouteName="Home"
               screenOptions={{
                    tabBarStyle: { backgroundColor: '#f7f6fb' },
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#F50057',
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
                              <Icon
                                   as={AntDesign}
                                   name="home"
                                   size={6}
                                   color={color}
                              />
                         ),
                    }}
               />

               <TabStaff.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                         headerShown: false,

                         tabBarIcon: ({ color }) => (
                              <Icon
                                   as={AntDesign}
                                   name="user"
                                   size={6}
                                   color={color}
                              />
                         ),
                    }}
               />
          </TabStaff.Navigator>
     );
};
