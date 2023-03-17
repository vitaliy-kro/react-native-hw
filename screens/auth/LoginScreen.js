import { useState, useEffect } from "react";

import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "../../styles/auths.styles";

export default function LoginScreen({ navigation, route }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldSecurePass, setShouldSecurePass] = useState(true);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const { seIsAuth } = route.params;

  useEffect(() => {
    const onChangeScreenOrientation = () => {
      const windowWidth = Dimensions.get("window").width;
      setDimensions(windowWidth - 16 * 2);
    };
    Dimensions.addEventListener("change", onChangeScreenOrientation);
    return () => {
      Dimensions.removeEventListener("change", onChangeScreenOrientation);
    };
  }, []);

  const onRegister = () => {
    if (!login || !email || !password) {
      return alert("Every input is required");
    }
    console.log({
      login,
      email,
      password,
    });
    setLogin("");
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
    setIsAuth(true);
  };

  return (
    <ImageBackground
      source={require("../../images/auth-bck.png")}
      style={styles.bckImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            ...styles.container,
            paddingBottom: Keyboard.isVisible() ? 30 : 145,
            paddingTop: 32,
          }}
        >
          <Text style={styles.title}>Ввійти</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                width: dimensions,
              }}
            >
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Адреса електронної пошти"
              />
              <View
                style={{
                  marginBottom: 43,
                  position: "relative",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  style={{ ...styles.input, marginBottom: 0 }}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Пароль"
                  secureTextEntry={shouldSecurePass}
                />
                <TouchableOpacity
                  style={styles.showPasswordBtn}
                  onPress={() => setShouldSecurePass((isSecure) => !isSecure)}
                >
                  <Text style={styles.showBtnText}>Показати</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.authBtn} onPress={onRegister}>
                <Text>Ввійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginRedirectBtn}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.redirectBtnText}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
