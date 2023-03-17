import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Image, Text, ScrollView, TextInput } from "react-native";
import { postsStyles } from "../../styles/posts.styles";
import { posts } from "../../fakeApi/posts";

export default function CommentsScreen() {
  const [comment, setComment] = useState("");

  return (
    <ScrollView style={postsStyles.container}>
      <Image
        source={{ uri: post.image }}
        style={{ ...postsStyles.postImage, marginBottom: 32 }}
      />
      {posts[1].comments.map((c, i) => (
        <View
          style={{
            display: "flex",
            flexDirection: c.author === "me" ? "row" : "row-reverse",
          }}
          key={i}
        >
          <Image
            source={
              c.author === "me"
                ? require("../../images/userPhoto.jpg")
                : { uri: c.avatar }
            }
            style={postsStyles.commentAvatar}
          />
          <View
            style={{
              //   backgroundColor: "rgba(0, 0, 0, 0.03)",
              flexShrink: 1,
              backgroundColor: "red",
              padding: 16,
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
              borderTopLeftRadius: c.author === "me" ? 0 : 6,
              borderTopRightRadius: c.author === "me" ? 6 : 0,
              marginLeft: c.author === "me" ? 8 : 0,
              marginRight: c.author === "me" ? 0 : 8,
              marginBottom: i === post.comments.length - 1 ? 31 : 24,
            }}
          >
            <Text style={postsStyles.commentText}>{c.comment}</Text>
            <Text
              style={{
                ...postsStyles.commentDate,
                textAlign: c.author === "me" ? "left" : "right",
              }}
            >
              {c.date}
            </Text>
          </View>
        </View>
      ))}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F6F6F6",
          borderRadius: 100,
          borderColor: "#E8E8E8",
          borderWidth: 1,
        }}
      >
        <TextInput
          value={comment}
          onChangeText={(text) => setComment(text)}
          placeholder="Коментувати"
          style={postsStyles.commentInput}
        />
        <AntDesign
          name="arrowup"
          size={24}
          color="#ffffff"
          style={postsStyles.commentAddButton}
        />
      </View>
    </ScrollView>
  );
}
