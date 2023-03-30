import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/config";
import { postsStyles } from "../../styles/posts.styles";
import styles from "../../styles/auths.styles";
import { user } from "../../redux/selectors/authSelectors";

export default function AddPostScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);

  const { userId, nickname } = useSelector(user);

  const handleCoordsSet = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocationCoords(coords);
  };

  useEffect(() => {
    try {
      handleCoordsSet();
      const launchCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
      if (!image) {
        launchCamera();
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  const handlePickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      alert(error);
    }
  };
  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      await addDoc(collection(db, "posts"), {
        image: photo,
        name,
        location: {
          locationName,
          latitude: locationCoords.latitude,
          longitude: locationCoords.longitude,
        },
        userId,
        nickname,
        likes: 0,
        comments: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(image);
      const file = await response.blob();
      const uniqueId = Date.now().toString();

      const storageRef = await ref(storage, `postImage/${uniqueId}`);
      await uploadBytes(storageRef, file);

      const processedPhoto = await getDownloadURL(storageRef);

      return processedPhoto;
    } catch (error) {
      alert(error);
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
          value={locationName}
          onChangeText={(text) => setLocationName(text)}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <TouchableOpacity
        disabled={image && name && locationName ? false : true}
        style={{
          ...styles.authBtn,
          marginTop: 32,
          marginBottom: 0,
          backgroundColor:
            image && name && locationName ? "#FF6C00" : "#F6F6F6",
        }}
        onPress={async () => {
          uploadPostToServer();
          setImage(null);
          setName("");
          setLocationName("");
          setLocationCoords(null);
          navigation.navigate("Posts");
        }}
      >
        <Text
          style={{
            color: image && name && locationName ? "#FFFFFF" : "#BDBDBD",
          }}
        >
          Опублікувати
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
