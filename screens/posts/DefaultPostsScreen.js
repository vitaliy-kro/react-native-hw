import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import CommentsScreen from "./CommentsScreen";
import PostsScreen from "./PostsScreen";
import MapScreen from "./MapScreen";

const PostsStack = createStackNavigator();

function DefaultPostsScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <PostsStack.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: {
          height: 80,
        },
      }}
    >
      <PostsStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  alert("Logouted");
                }}
              >
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <MaterialIcons
                name="grid-view"
                size={size}
                color={focused ? "#ffffff" : "#212121"}
                style={{
                  backgroundColor: focused && "#FF6C00",
                  paddingVertical: 14,
                  paddingHorizontal: 29,
                  borderRadius: 20,
                }}
              />
            );
          },
        }}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 17,
            lineHeight: 22,
            alignItems: "center",
            textAlign: "center",
            color: "#212121",
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  handleGoBack();
                }}
              >
                <Feather
                  name="arrow-left"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <PostsStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 17,
            lineHeight: 22,
            alignItems: "center",
            textAlign: "center",
            color: "#212121",
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  handleGoBack();
                }}
              >
                <Feather
                  name="arrow-left"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </PostsStack.Navigator>
  );
}
export default DefaultPostsScreen;
