import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import styles from "../../styles/auths.styles";
import { postsStyles } from "../../styles/posts.styles";
import { userStyles } from "../../styles/user.styles";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { logout } from "../../redux/auth/operations";
import { user } from "../../redux/selectors/authSelectors";
import { useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../redux/selectors/authSelectors";

export default function UserScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const { userId, nickname, avatar } = useSelector(user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
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

  const getUserPosts = async () => {
    const postsRef = await collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPosts([{ id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <ImageBackground
      source={require("../../images/auth-bck.png")}
      style={styles.bckImage}
    >
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          marginTop: 100,
          height: "100%",
        }}
      >
        <View
          style={{
            ...postsStyles.container,
            paddingVertical: 0,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ ...styles.avatar, marginTop: 0 }}>
              <Image
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 16,
                  position: "absolute",
                }}
                source={avatar && { uri: avatar }}
              />
              <TouchableOpacity
                style={{
                  ...styles.addAvatarBtn,
                  transform: [{ rotate: "45deg" }],
                  borderColor: "#BDBDBD",
                }}
              >
                <Text style={{ color: "#BDBDBD" }}>+</Text>
              </TouchableOpacity>
            </View>

            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              onPress={() => dispatch(logout())}
              style={{ position: "absolute", right: 0 }}
            />
          </View>
          <Text style={{ ...userStyles.title }}>{nickname}</Text>
          {posts.map((post) => (
            <View style={{ marginTop: 32 }} key={post.id}>
              <Image
                style={postsStyles.postImage}
                source={{ uri: post.image }}
              />
              <Text style={postsStyles.postName}>{post.name}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#FF6C00"
                    style={{
                      transform: [{ scaleX: -1 }],
                    }}
                    onPress={() => {
                      navigation.navigate("Comments", { post });
                    }}
                  />
                  <Text style={postsStyles.postComment}>
                    {post.comments.length}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 24,
                  }}
                >
                  <Feather name="thumbs-up" size={24} color="#FF6C00" />
                  <Text style={postsStyles.postComment}>{post.likes}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                  onPress={() => {
                    navigation.navigate("Map", { location: post.location });
                  }}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={postsStyles.postLocation}>
                    {post.location.locationName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
