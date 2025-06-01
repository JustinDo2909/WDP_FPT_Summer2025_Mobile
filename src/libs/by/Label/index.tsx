
import { init, UIFont } from "@/src/process/constants";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { RText } from "../Clone";

type LabelProps = {
  text?: ReactNode | string;
  isSub?: boolean;
  style?: TextStyle;
  labelStyle?: ViewStyle;
};

export const Label: React.FC<LabelProps> = ({
  text,
  isSub = false,
  style,
  labelStyle,
}) => {
  return (
    <View style={StyleSheet.flatten([{}, labelStyle])}>
      <RText
        style={StyleSheet.flatten([
          {
            display: "flex",
            fontSize: 14,
            fontWeight: 500,
            color: init?.Color?.TextPrimary,
            fontFamily: UIFont.InterBold,
            gap: 3,
          },
          style,
        ])}
      >
        {text}
        {isSub && (
          <Text
            style={{
              color: init?.Color?.DangerMain,
            }}
          >
            *
          </Text>
        )}
      </RText>
    </View>
  );
};
