import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Main from "./src/Main";
import { store } from "./src/redux/store/store";

export default function App() {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </SafeAreaProvider>
  );
}


