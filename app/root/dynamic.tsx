import * as Screens from "@/src/pattern/screen";
import { useLocalSearchParams } from "expo-router";
import { get, last, split } from "lodash";
import React from "react";
import { View } from "react-native";

export default function Screen() {
  const params = useLocalSearchParams<any>();
  const gFnID = last(split(params.path, "/"));
  const Render = get(Screens, gFnID || "", View);

  return (
    <>
      <Render />
    </>
  );
}
