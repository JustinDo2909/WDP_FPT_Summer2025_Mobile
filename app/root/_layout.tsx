import { Core } from "@/src/libs/by";
import { Footer, Header } from "@/src/pattern/core";
import { Stack } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Layout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {},
        }}
        screenLayout={({ children }) => {
          return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View
                style={{
                  flex: 1,
                  position: "relative",
                }}
              >
                {/* View cha chiếm toàn màn hình */}
                {/* <ImageBackground
                  id="ImageBackground"
                    source={require('../../assets/images/react-logo.png')}
                  style={{
                    flex: 1,
                  }}
                > */}
                  <Header />
                    <Core id="Main" style={{ flex: 1 }}>
                      <>{children}</>
                    </Core>
                  <Footer />
                {/* </ImageBackground> */}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="dynamic"
          options={{ headerShown: false }}
          getId={({ params }) => params?.path}
        />
        <Stack.Screen name="test" options={{ headerShown: false }} />
        <Stack.Screen name="file-sign" options={{ headerShown: false }} />
      </Stack>
  );
}
