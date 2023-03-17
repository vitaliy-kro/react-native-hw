import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
  bckImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  avatar: {
    // backgroundColor: "#F6F6F6",
    height: 120,
    width: 120,
    // borderRadius: 16,
    marginTop: -60,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 32,
    position: "relative",
  },
  addAvatarBtn: {
    width: 25,
    height: 25,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FF6C00",
    borderRadius: 25,
    marginRight: -13,
    marginBottom: 14,

    // If avatar is added
    // transform: [{ rotate: "45deg" }],
    // borderColor: "#BDBDBD",
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    marginBottom: 32,
  },
  form: {
    // marginHorizontal: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    padding: 8,
  },
  showPasswordBtn: {
    position: "absolute",
    alignSelf: "center",
    right: 0,
    padding: 16,
  },
  showBtnText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  authBtn: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  loginRedirectBtn: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  redirectBtnText: {
    color: "#1B4371",
  },
});

export default styles;
