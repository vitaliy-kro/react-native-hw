import { useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { doc, onSnapshot, collection, query } from "firebase/firestore";
import { postsStyles } from "../../styles/posts.styles";
import { db } from "../../firebase/config";
import { useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../redux/selectors/authSelectors";

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { nickname, avatar, email } = useSelector(user);
  const getAllPosts = async () => {
    await onSnapshot(query(collection(db, "posts")), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("doc:", doc.data);
        setPosts((posts) => [...posts, { id: doc.id, ...doc.data() }]);
      });
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <ScrollView style={postsStyles.container}>
      <View style={postsStyles.userInformation}>
        <Image
          style={postsStyles.userPhoto}
          source={avatar && { uri: avatar }}
        />
        <View style={postsStyles.userCredentials}>
          <Text style={postsStyles.userName}>{nickname}</Text>
          <Text style={postsStyles.userEmail}>{email}</Text>
        </View>
      </View>
      {posts.length !== 0 &&
        posts.map((post) => {
          return (
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
                  justifyContent: "space-between",
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
                    color="#BDBDBD"
                    style={{ transform: [{ scaleX: -1 }] }}
                    onPress={() => {
                      navigation.navigate("Comments", { post });
                    }}
                  />
                  <Text style={postsStyles.postComment}>
                    {post.comments.length}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
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
          );
        })}
    </ScrollView>
  );
}
