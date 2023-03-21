import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { postsStyles } from "../../styles/posts.styles";
import styles from "../../styles/auths.styles";

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
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

  return (
    <ScrollView style={postsStyles.container}>
      <ImageBackground
        source={image && { uri: image }}
        style={{
          height: 240,
          backgroundColor: !image && "#F6F6F6",
          borderColor: "#E8E8E8",
          borderRadius: 8,
          borderWidth: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialIcons
          name="photo-camera"
          size={24}
          color={image ? "ffffff" : "#BDBDBD"}
          style={{
            padding: 18,
            width: 60,
            backgroundColor: image ? "rgba(255, 255, 255, 0.3)" : "#ffffff",
            borderRadius: 50,
          }}
          onPress={handlePickImage}
        />
      </ImageBackground>
      <Text style={postsStyles.imageText}>
        {image ? "Редагувати фото" : "Завантажте фото"}
      </Text>
      <TextInput
        style={postsStyles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
      />
      <View style={postsStyles.locationContainer}>
        <Feather name="map-pin" size={24} color="#BDBDBD" />
        <TextInput
          style={{
            ...postsStyles.input,
            marginTop: 0,
            flex: 1,
            marginLeft: 8,
            width: "100%",
          }}
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <TouchableOpacity
        disabled={image && name && location ? false : true}
        style={{
          ...styles.authBtn,
          marginTop: 32,
          marginBottom: 0,
          backgroundColor: image && name && location ? "#FF6C00" : "#F6F6F6",
        }}
      >
        <Text
          style={{
            color: image && name && location ? "#FFFFFF" : "#BDBDBD",
          }}
        >
          Опублікувати
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
