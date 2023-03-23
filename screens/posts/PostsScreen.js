import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { postsStyles } from "../../styles/posts.styles";
import { posts } from "../../fakeApi/posts";

// const posts = [
//   {
//     id: 1,
//     image: "https://picsum.photos/200",
//     name: "Lion",
//     comments: [
//       {
//         author: "someUser",
//         comment:
//           "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
//         date: "09 червня, 2020 | 08:40",
//       },
//       {
//         author: "me",
//         comment:
//           "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
//         date: "09 червня, 2020 | 09:14",
//       },
//       {
//         author: "someUser",
//         comment: "Thank you! That was very helpful!",
//         date: "09 червня, 2020 | 09:20",
//       },
//     ],
//     location: "Ternopil, Ukraine",
//   },
//   {
//     id: 2,
//     image: "https://picsum.photos/200",
//     name: "Lion",
//     comments: [],
//     location: "Ternopil, Ukraine",
//   },
//   {
//     id: 3,
//     image: "https://picsum.photos/200",
//     name: "Lion",
//     comments: [
//       {
//         author: "someUser",
//         comment:
//           "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
//         date: "09 червня, 2020 | 08:40",
//       },
//       {
//         author: "me",
//         comment:
//           "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
//         date: "09 червня, 2020 | 09:14",
//       },
//       {
//         author: "someUser",
//         comment: "Thank you! That was very helpful!",
//         date: "09 червня, 2020 | 09:20",
//       },
//     ],
//     location: "Ternopil, Ukraine",
//   },
// ];

export default function PostsScreen({ navigation }) {
  //   const [posts, setPosts] = useState();
  return (
    <ScrollView style={postsStyles.container}>
      <View style={postsStyles.userInformation}>
        <Image
          style={postsStyles.userPhoto}
          source={require("../../images/userPhoto.jpg")}
        />
        <View style={postsStyles.userCredentials}>
          <Text style={postsStyles.userName}>Natali Romanova</Text>
          <Text style={postsStyles.userEmail}>email@example.com</Text>
        </View>
      </View>
      {posts.map((post) => {
        return (
          <View style={{ marginTop: 32 }} key={post.id}>
            <Image style={postsStyles.postImage} source={{ uri: post.image }} />
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
                <Text
                  style={postsStyles.postLocation}
                >{`${post.location.city}, ${post.location.country}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
