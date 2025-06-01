import React from "react";
import { StyleSheet } from "react-native";
import { FValid, RText } from "../../Clone";
import Context from "./context";

export function FieldValid() {
  const { error, style } = Context.useCtx();
  if (!error?.message) return null;
  return (
    <FValid style={StyleSheet.flatten([])}>
      <RText style={StyleSheet.flatten([styles.error, style?.valid])}>
        {error?.message as string}
      </RText>
    </FValid>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});
