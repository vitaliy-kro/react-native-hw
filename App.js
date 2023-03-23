import { useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useRoute } from "./helpers/useRoute";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);
  const navigationRef = useNavigationContainerRef();

  const routing = useRoute(isAuth, setIsAuth, navigationRef);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>{routing}</NavigationContainer>
  );
}
