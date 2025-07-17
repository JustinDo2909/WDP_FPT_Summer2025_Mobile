import { SignIn, Register } from "@/src/pattern/screen";
import { sStore } from "@/src/stores";
import { Redirect, useLocalSearchParams } from "expo-router";
import React from "react";

export default function AuthScreen() {
  const { Auth } = sStore();
  const { type } = useLocalSearchParams<{ type: string }>();

  if (Auth?.Token) {
    return <Redirect href="/root" />;
  }

  return type === "register" ? <Register /> : <SignIn />;
}