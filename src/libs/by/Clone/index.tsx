import { init, Px } from "@/src/process/constants";
import { omit } from "lodash";
import React from "react";
import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

// region Loại bỏ cloneElement và sử dụng trực tiếp

// region Core - cấp 1
export function Core({ style, children, ...args }: ViewProps) {
  return (
    <View id="Core" style={Object.assign({}, style)} {...args}>
      {children}
    </View>
  );
}
// endregion

// region Container - cấp 2
export function Container({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Contain"
      style={StyleSheet.flatten([
        {
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 12,
          gap: 16,
          position: "relative",
        },
        style,
      ])}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region Area - cấp 3
export function Area({ style, children, ...args }: ViewProps) {
  return (
    <View id="Area" style={StyleSheet.flatten([ style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region Yard - cấp 4
export function Yard({ style, children, ...args }: ViewProps) {
  return (
    <View id="Yard" style={StyleSheet.flatten([ style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region Section - cấp 5
export function Section({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Section"
      style={StyleSheet.flatten([ style])}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region Anchor - cấp 6
export function Anchor({ style, children, ...args }: ViewProps) {
  return (
    <View id="Anchor" style={StyleSheet.flatten([ style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region Block - cấp 7
export function Block({ style, children, ...args }: ViewProps) {
  return (
    <View id="Block" style={StyleSheet.flatten([ style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region Card - cấp 7
export function Card({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Card"
      style={StyleSheet.flatten([
        {
          gap: 8,
          padding: 8,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.19,
          shadowRadius: 5.62,
          elevation: 2,
          backgroundColor: init?.Color?.BgWhite,
          borderRadius: 8,
        },
        style,
      ])}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region Box - cấp 8
export function Box({ style, children, ...args }: ViewProps) {
  return (
    <View id="Box" style={StyleSheet.flatten([ style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region Column - cấp 7
export function Column({ style, children, ...args }: ViewProps) {
  return (
    <View id="Column" style={StyleSheet.flatten([{}, style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region Row - cấp 7
export function Row({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Row"
      style={Object.assign(
        { flexDirection: "row", gap: 8 } as ViewStyle,
        style
      )}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region Group - cấp 8
export function Group({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Group"
      style={Object.assign(
        {
          width: "auto",
          alignItems: "center",
          // flexDirection: "row",
          gap: 8,
        } as ViewStyle,
        style
      )}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region Wrap - cấp 9
export function Wrap({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Wrap"
      style={Object.assign(
        { flexDirection: "row", alignItems: "center", gap: 5 } as ViewStyle,
        style
      )}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region Cover - cấp 10
export function Cover({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Cover"
      style={StyleSheet.flatten([{ alignItems: "center", gap: 8 }, style])}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region Scroll
export function Scroll({ style, children, ...args }: ViewProps) {
  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <View
        id="Scroll"
        style={Object.assign(
          {
            backgroundColor: "red",
            overflow: "hidden",
            position: "absolute",
            margin: "auto",
            flex: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          } as ViewStyle,
          style
        )}
        {...args}
      >
        {children}
      </View>
    </View>
  );
}
// endregion

// region Mass
export function Mass({ style, children, ...args }: ViewProps) {
  return (
    <View id="Mass" style={StyleSheet.flatten([ style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region RText
export function RText({ style, children, ...args }: TextProps) {
  const _style = style as TextStyle;
  return (
    <Text
      id="RText"
      style={Object.assign(
        {
          fontSize: Px.F(_style?.fontSize || 14),
          display: "flex",
          alignItems: "center",
          color: "#333333",
        } as TextStyle,
        omit(_style, ["fontSize"])
      )}
      {...args}
    >
      {children}
    </Text>
  );
}
// endregion

// region FControl
export function FControl({ style, children, ...args }: ViewProps) {
  return (
    <View id="FormControl" style={StyleSheet.flatten([{}, style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region FLabel
export function FLabel({ style, children, ...args }: ViewProps) {
  return (
    <View id="FLabel" style={StyleSheet.flatten([{}, style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region FValid
export function FValid({ style, children, ...args }: ViewProps) {
  return (
    <View id="FValid" style={StyleSheet.flatten([{}, style])} {...args}>
      {children}
    </View>
  );
}
// endregion

// region Begin
export function Begin({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Begin"
      style={StyleSheet.flatten([{ gap: 8, flexDirection: "row" }, style])}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region Content
export function Content({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="Content"
      style={StyleSheet.flatten([
        { gap: 8, flexDirection: "column", flex: 1 },
        style,
      ])}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion

// region End
export function End({ style, children, ...args }: ViewProps) {
  return (
    <View
      id="End"
      style={StyleSheet.flatten([
        {
          flexDirection: "row",
          gap: 8,
        },
        style,
      ])}
      {...args}
    >
      {children}
    </View>
  );
}
// endregion
