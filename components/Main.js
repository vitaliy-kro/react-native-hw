import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase/config";
import { useRoute } from "../helpers/useRoute";
import { selectStateChange } from "../redux/selectors/authSelectors";
import { authStateChange } from "../redux/auth/operations";

export const Main = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectStateChange);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const authStateCheck = async () => {
      await onAuthStateChanged(auth, async (user) => {
        dispatch(authStateChange(user));
      });
    };
    authStateCheck();
  }, []);

  const routing = useRoute(isAuth, navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>{routing}</NavigationContainer>
  );
};
