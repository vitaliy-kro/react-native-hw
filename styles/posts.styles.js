import { StyleSheet } from "react-native-web";

export const postsStyles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  userInformation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    borderRadius: 16,
    height: 60,
    width: 60,
  },
  userCredentials: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "Roboto_700Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto_400Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },

  headerTitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: "17px",
    lineHeight: "22px",

    textAlign: "center",
    letterSpacing: "-0.408px",
    color: "green",
  },
  imageText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
  },
  input: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 32,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 232, 232, 1)",
  },
  locationContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 232, 232, 1)",
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  postName: {
    marginTop: 8,
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  postComment: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: " #BDBDBD",
    marginLeft: 6,
  },
  postLocation: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 3,
  },
  commentAvatar: { height: 28, width: 28, borderRadius: "50%" },
  commentText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentDate: {
    fontFamily: "Roboto_400Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  commentInput: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",

    width: "100%",

    paddingVertical: 15,
    paddingLeft: 15,
    flex: 1,
  },
  commentAddButton: {
    padding: 10,
    marginRight: 8,
    backgroundColor: "#FF6C00",
    borderRadius: "50%",
  },
});
