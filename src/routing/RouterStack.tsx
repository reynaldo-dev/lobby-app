import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/screens/login/Login";
import Register from "../auth/screens/register/Register";
import { AuthStackParamList } from "./navigation-types";

const authRouter = createNativeStackNavigator<AuthStackParamList>();

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
