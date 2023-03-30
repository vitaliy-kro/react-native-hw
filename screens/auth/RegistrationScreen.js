import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../../styles/auths.styles";
import { register } from "../../redux/auth/operations";

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldSecurePass, setShouldSecurePass] = useState(true);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
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

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(image);
    const file = await response.blob();
    const uniqueId = Date.now().toString();

    const storageRef = await ref(storage, `authImage/${uniqueId}`);
    await uploadBytes(storageRef, file);

    const processedPhoto = await getDownloadURL(storageRef);

    return processedPhoto;
  };

  const onRegister = async () => {
    if (!login || !email || !password) {
      return alert("Every input is required");
    }

    console.log({
      login,
      email,
      password,
    });
    const uploatedImage = await uploadPhotoToServer();
    dispatch(register({ email, password, login, image: uploatedImage }));
    setLogin("");
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
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
            paddingBottom: Keyboard.isVisible() ? 30 : 80,
          }}
        >
          <View style={styles.avatar}>
            <Image
              source={image && { uri: image }}
              style={{
                height: 120,
                width: 120,
                borderRadius: 16,
                position: "absolute",
                backgroundColor: !image && "#F6F6F6",
              }}
            />
            <TouchableOpacity
              style={{
                ...styles.addAvatarBtn,
                // transform: image && [{ rotate: "45deg" }],
                borderColor: image ? "#BDBDBD" : "#FF6C00",
              }}
              onPress={() => {
                handlePickImage();
              }}
            >
              <Text style={{ color: "#FF6C00" }}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
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
                value={login}
                onChangeText={(text) => setLogin(text)}
                placeholder="Логін"
              />
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
                <Text>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginRedirectBtn}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.redirectBtnText}>Вже є акаунт? Ввійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
