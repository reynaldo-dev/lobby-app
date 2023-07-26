import Reactotron, { trackGlobalErrors } from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

// Solo habilitamos Reactotron en entornos de desarrollo (opcional)
if (__DEV__) {
  Reactotron.setAsyncStorageHandler?.(require("react-native").AsyncStorage)
    .configure()
    .useReactNative() // Importante: useReactNative() no overlayApp()
    .use(reactotronRedux())
    .use(
      trackGlobalErrors({
        veto: (frame) => frame.fileName?.includes("node_modules/react-native"),
      })
    )
    .connect();
}

export default Reactotron;
