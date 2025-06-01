import { init } from "@/src/process/constants";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Keyboard, StyleSheet, TextInput, TextInputProps } from "react-native";
import { ApplyMask } from "../../../cus";
import context from "./context";

export function FieldSource() {
  const {
    name,
    rules,
    custom,
    readOnly,
    value,
    onChange,
    onBlur,
    textArea,
    center,
    autoFocus,
    maxLength,
    inputRef,
    placeholder,
    textColor,
    suffixes,
    showPwd,
    type,
    numberOfLine,
    style,
    maskedTextInput,
  } = context.useCtx();

  const { control } = useFormContext();
  const val = useWatch({ control, name });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={""}
      render={({ field }) => {
        const renderValue = val ?? field.value ?? value ?? "";

        let inputProps = {
          editable: !readOnly,
          placeholder,
          value: renderValue,
          onChangeText: (text: string) => {
            field.onChange(text);
            onChange?.(text);
          },
          onBlur: () => {
            field.onBlur();
            onBlur?.();
            Keyboard.dismiss();
          },
          placeholderTextColor: init?.Color?.TextStroke,
          secureTextEntry: type === "password" && !showPwd,
          autoFocus,
          maxLength,
          multiline: textArea,
          numberOfLines: numberOfLine || 1,

          style: StyleSheet.flatten([
            styles.input,
            {
              color: textColor,
              textAlign: center ? "center" : "left",
              // textAlignVertical: center ? "center" : "top",
            },
            style?.input,
          ]),
          ref: inputRef,
        } as TextInputProps;

        if (maskedTextInput?.mask) {
          inputProps = {
            ...inputProps,
            onChangeText(text) {
              const safeText = String(text ?? "");
              const { masked } = ApplyMask(safeText, maskedTextInput?.mask);
              field.onChange(masked);
              onChange?.(masked);
            },
            value: ApplyMask(String(renderValue ?? ""), maskedTextInput?.mask)
              ?.masked,
          };
        }

        if (custom) {
          return (
            <>
              {custom(inputRef, inputProps)}
              {suffixes?.()}
            </>
          );
        }

        return (
          <>
            <TextInput {...inputProps} />
            {suffixes?.()}
          </>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
});
