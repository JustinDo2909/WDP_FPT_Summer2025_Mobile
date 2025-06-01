import { isEqual } from "lodash";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import context from "./context";

export function FieldAction() {
  const {
    isClear,
    onSetShowPwd,
    val,
    type,
    onClear,
    readOnly,
    style,
  } = context.useCtx();

  if (!(readOnly && isClear && val) && !isEqual(type, "password")) {
    return null;
  }

  return (
    <View style={StyleSheet.flatten([styles.actions, style?.action])}>
      {!readOnly && isClear && val && (
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.actionText}>✕</Text>
        </TouchableOpacity>
      )}
      {type === "password" && (
        <TouchableOpacity onPress={onSetShowPwd}>
          <Text style={styles.actionText}>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
  },
  actionText: {
    fontSize: 16,
    marginHorizontal: 4,
  },
});
