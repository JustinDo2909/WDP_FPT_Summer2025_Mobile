import { Home, SignIn } from "@/src/pattern/screen";
import { sStore } from "@/src/stores";
import { Redirect } from "expo-router";
import React from "react";

export default function Screen() {
  const { Auth } = sStore();

  if (Auth?.Token) {
    return <Redirect href={"/root" as any}  />;
  }

  return <SignIn />;
}
