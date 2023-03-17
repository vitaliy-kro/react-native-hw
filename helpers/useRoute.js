import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import PostsScreen from "../screens/posts/PostsScreen";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import AddPostScreen from "../screens/posts/AddPostScreen";
import UserScreen from "../screens/user/UserScreen";
// import CommentsScreen from "../screens/posts/CommentsScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth, setIsAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Register">
        <AuthStack.Screen
          name="Register"
          component={RegistrationScreen}
          initialParams={{ setIsAuth }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ setIsAuth }}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      tabBarOptions={{ showLabel: false }}
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: {
          height: 80,
        },
      }}
      initialRouteName="Posts"
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        initialParams={{ setIsAuth }}
        options={{
          title: "Публікації",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 17,
            lineHeight: 22,
            alignItems: "center",
            textAlign: "center",
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
      <MainTab.Screen
        name="Create Post"
        component={AddPostScreen}
        options={{
          title: "Створити публікацію",
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
                style={{ marginLeft: 16 }}
                onPress={() => {
                  alert("Back to Posts");
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
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <AntDesign
                name="plus"
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
      <MainTab.Screen
        name="Profile"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Feather
                name="user"
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
      {/* <MainTab.Screen
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
                  alert("Back to posts");
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
          tabBarIcon: (focused, size, color) => {
            return (
              <Feather
                name="user"
                size={size}
                color={color}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 29,
                  borderRadius: 20,
                }}
              />
            );
          },
        }}
      /> */}
    </MainTab.Navigator>
  );
};
