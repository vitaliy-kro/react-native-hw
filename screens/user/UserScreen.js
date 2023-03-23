import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import styles from "../../styles/auths.styles";
import { postsStyles } from "../../styles/posts.styles";
import { userStyles } from "../../styles/user.styles";
import { posts } from "../../fakeApi/posts";

export default function UserScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../../images/auth-bck.png")}
      style={styles.bckImage}
    >
      <ScrollView
        contentContainerStyle={{ ...styles.container, marginTop: 100 }}
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
                source={require("../../images/userPhoto.jpg")}
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
              onPress={() => console.log("Logout")}
              style={{ position: "absolute", right: 0 }}
            />
          </View>
          <Text style={{ ...userStyles.title }}>Natali Romanova</Text>
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
                    navigation.navigate("Map", { post });
                  }}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={postsStyles.postLocation}>
                    {post.location.country}
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
