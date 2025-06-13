
import { Footer, Header } from "@/src/pattern/core";
import { init } from "@/src/process/constants";
import { sStore } from "@/src/stores";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { ImageBackground, View } from "react-native";

export default function AppLayout() {
  const { Auth } = sStore();
  if (Auth?.Token) {
    return <Redirect href={"/root" as any}/>;
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: `${init.Env?.URL_MINIO}/mobile/assets/img/division/Login-Background.png`,
        }}
        style={{
          flex: 1,
        }}
        imageStyle={{
          objectFit: "cover",
          resizeMode: "cover",
          width: "100%",
        }}
        resizeMode="cover"
      >
        <>
          <Header/>
          <Slot />
          <Footer />
        </>
      </ImageBackground>
    </View>
  );
}
