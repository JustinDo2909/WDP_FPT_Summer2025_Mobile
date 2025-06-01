import { init, Px } from "@/src/process/constants";
import React, { ReactElement, ReactNode } from "react";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";
import { StyleSheet, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { FControl, Mass } from "../Clone";
import Context from "./seg/context";
import { FieldAction } from "./seg/Field.Action";
import { FieldSource } from "./seg/Field.Source";
import { FieldValid } from "./seg/Field.Valid";

declare global {
  type FieldType = "text" | "password" | "email" | "number" | "decimal";

  type IFieldText = {
    flexible?: boolean;
    id?: string;
    name: string;
    label?: ReactElement;
    textArea?: boolean;
    type?: FieldType; // loại input
    placeholder?: string;
    textColor?: string;
    value?: string;
    maxLength?: number;
    rules?: Omit<
      RegisterOptions<FieldValues, string>,
      "valueAsNumber" | "valueAsDate" | "setValueAs"
    >;
    defaultValue?: any;
    width?: string | number;
    style?: {
      container?: ViewStyle;
      control?: ViewStyle;
      input?: TextInputProps["style"];
      action?: ViewStyle;
      valid?: TextStyle;
    };

    // validate
    isNotShowError?: boolean;
    isNumber?: boolean;
    mode?: "decimal" | "integer";
    decimalPlaces?: number;

    // icon, action
    iconRight?: (args?: { error: any }) => ReactNode;
    iconLeft?: (args?: { error: any }) => ReactNode;
    suffixes?: () => ReactNode;

    onClear?: () => void;
    isClear?: boolean;
    center?: boolean;
    isTextCenter?: boolean;

    // style logic
    kindStyle?:
      | "underline"
      | "border"
      | "no_border"
      | "border_enter"
      | "set_field";
    trending?: "vertical" | "horizontal";
    isFieldSizingContent?: boolean;

    // behavior
    autoFocus?: boolean;
    readOnly?: boolean;
    hidden?: boolean;
    onKeyDown?: (event: any) => void;
    onChange?: (text: string) => void;
    onBlur?: () => void;

    // custom field renderer
    custom?: (ref?: any, props?: Partial<TextInputProps>) => React.ElementType;

    // for RHF
    control?: Control<any>;
    numberOfLine?: number;

    maskedTextInput?: {
      mask: string;
    };
  };
}

export function FieldText(props: IFieldText) {
  return (
    <Context.Provider {...{ ...props }}>
      <Context.Consumer
        children={({
          iconRight,
          error,
          isNotShowError,
          label,
          iconLeft,
          style,
          textArea,
          flexible,
        }) => (
          <Mass
            style={StyleSheet.flatten([
              styles.container,
              style?.container,
              flexible && {
                flex: 1,
              },
            ])}
          >
            {label}

            <FControl
              style={StyleSheet.flatten([
                styles.control,
                style?.control,
                {
                  alignItems: textArea ? "flex-start" : "center",
                },
                flexible && {
                  flex: 1,
                },
              ])}
            >
              {iconLeft?.({ error })}
              <FieldSource />
              <FieldAction />
              {iconRight?.({ error })}
            </FControl>
            {!isNotShowError && <FieldValid />}
          </Mass>
        )}
      />
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    minHeight: Px.H(36),
  },
  control: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: init.Color.BgDisableTextfileld,
    borderRadius: 6,
    paddingHorizontal: Px.H(12),
    paddingVertical: Px.W(0),
    gap: 8,
    justifyContent: "center",
    backgroundColor: init?.Color?.Whites,
    minHeight: Px.H(36),
  },
});
