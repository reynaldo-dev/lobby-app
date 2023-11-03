import { NavigationContainer } from '@react-navigation/native';
import { Suspense, useEffect, useState } from 'react';
import { getAuthStateFromAsyncStorage } from './helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { RootState, useAppDispatch, useAppSelector } from './redux/store/store';
import { getUserCredentials } from './redux/thunks/user.thunk';
import {
     AuthStack,
     RootNavigator,
     RootNavigatorStaff,
} from './routing/RouterStack';
import Authenticating from './shared/screens/Authenticating';

export default function Main() {
     const { isAuth, user } = useAppSelector((state: RootState) => state.user);
     const [token, setToken] = useState<string | null>(null);
     const [error, setError] = useState<string | null>(null);
     const [isLoading, setIsLoading] = useState<boolean>(false);

     const getAuthStatus = async () => {
          const token = await getAuthStateFromAsyncStorage();
          setToken(token);
     };

     const dispatch = useAppDispatch();
     useEffect(() => {
          setIsLoading(true);

          getAuthStatus()
               .then(() => {
                    dispatch(getUserCredentials());
               })
               .catch((error) => {
                    setError(
                         'No se ha podido iniciar sesión automaticamente, por favor coloca tu usuario y contraseña'
                    );
               })
               .finally(() => {
                    setTimeout(() => {
                         setIsLoading(false);
                    }, 2000);
               });
     }, []);

     return (
          <>
               {isLoading ? (
                    <Authenticating />
               ) : (
                    <NavigationContainer>
                         {isAuth ? (
                              user?.role === 'funcionario' ? (
                                   <Suspense fallback={null}>
                                        <RootNavigator />
                                   </Suspense>
                              ) : user?.role === 'staff' ? (
                                   <Suspense fallback={null}>
                                        <RootNavigatorStaff />
                                   </Suspense>
                              ) : (
                                   <Suspense fallback={null}>
                                        <RootNavigator />
                                   </Suspense>
                              )
                         ) : (
                              <AuthStack />
                         )}
                    </NavigationContainer>
               )}
          </>
     );
}
