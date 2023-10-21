import { NavigationContainer } from '@react-navigation/native';

import { useEffect, useState, Suspense } from 'react';
import { getAuthStateFromAsyncStorage } from './helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { RootState, useAppDispatch, useAppSelector } from './redux/store/store';
import { getUserCredentials } from './redux/thunks/user.thunk';
import {
     AuthStack,
     RootNavigator,
     RootNavigatorStaff,
} from './routing/RouterStack';
import { theme } from './theme';

export default function Main() {
     const { isAuth, user } = useAppSelector((state: RootState) => state.user);
     const [token, setToken] = useState<string | null>(null);
     const [error, setError] = useState<string | null>(null);

     const getAuthStatus = async () => {
          const token = await getAuthStateFromAsyncStorage();
          setToken(token);
     };

     const dispatch = useAppDispatch();
     useEffect(() => {
          getAuthStatus()
               .then(() => {
                    dispatch(getUserCredentials());
               })
               .catch((error) => {
                    setError(
                         'No se ha podido iniciar sesión automaticamente, por favor coloca tu usuario y contraseña'
                    );
               });
     }, []);

     return (
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
     );
}
