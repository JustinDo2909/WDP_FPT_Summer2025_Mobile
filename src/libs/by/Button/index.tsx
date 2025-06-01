import { init, Px } from "@/src/process/constants";
import { get, isFunction, omit } from "lodash";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

enum EBtnKind {
  Oke = "Oke",
  Cancel = "Cancel",
  Warning = "Warning",
  Info = "Info",
  Icon = "Icon",
  Default = "Default",
  Normal = "Normal",
}

export enum EBtnType {
  Fill = "Fill",
  Stroke = "Stroke",
  Icon = "Icon",
  Default = "Default",
  Full = "Full",
}

type IButton = {
  _set?: TouchableOpacityProps;
  _kind?: keyof typeof EBtnKind;
  _type?: keyof typeof EBtnType;
  children: ((styles?: any) => React.ReactNode) | React.ReactNode;
};

export function Button(props: IButton) {
  const { _set, _type = EBtnType.Default, _kind = EBtnKind.Default } = props;

  const kindArgs = {
    [EBtnKind.Oke]: {
      backgroundColor: init?.Color?.BgBrand,
      paddingHorizontal: 16,
      color: init?.Color?.BgWhite,
    },
    [EBtnKind.Cancel]: {
      backgroundColor: init?.Color?.DangerMain,
      paddingHorizontal: 16,
      color: init?.Color?.BgWhite,
    },
    [EBtnKind.Normal]: {
      backgroundColor: init?.Color?.BgWhite,
    },
  } as Record<keyof typeof EBtnKind, ViewStyle & TextStyle>;
  const kind = get(kindArgs, _kind);

  const typeArgs = {
    [EBtnType.Fill]: {
      minWidth: 60,
    },
    [EBtnType.Stroke]: {
      minWidth: 60,
      borderWidth: 1,
      borderColor: kind?.backgroundColor,
      backgroundColor: "",
      color: kind?.backgroundColor,
    },
    [EBtnType.Icon]: { paddingHorizontal: 0, borderRadius: 10 },
    [EBtnType.Default]: {
      paddingHorizontal: 8,
    },
  } as Record<keyof typeof EBtnType, ViewStyle & TextStyle>;

  const type = get(typeArgs, _type);

  return (
    <TouchableOpacity
      id="Core"
      style={StyleSheet.flatten([
        styles.Btn,
        { ...kind, ...type },
        _set?.style,
      ])}
      {...omit(_set, ["style"])}
    >
      {isFunction(props?.children)
        ? props?.children({ ...kind, ...type })
        : props?.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Btn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    height: Px.H(36),
    maxHeight: Px.H(36),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    gap: 8,
  },
});
