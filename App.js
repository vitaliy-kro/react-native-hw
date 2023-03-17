import { NavigationContainer } from "@react-navigation/native";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useRoute } from "./helpers/useRoute";
import { useState } from "react";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);
  const routing = useRoute(isAuth, setIsAuth);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
