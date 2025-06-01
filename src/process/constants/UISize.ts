import { Dimensions, PixelRatio, Platform } from "react-native";
const baseWidth = 640;
const baseHeight = 1024;
const windowDimensions = Dimensions.get("window");
export const getRatioWidth = () => {
  let width = Dimensions.get("window").width;
  let height = Dimensions.get("window").height;
  if (width > height) {
    let tepm = width;
    width = height;
    height = tepm;
  }
  return width / baseWidth;
};
export const getRatioHeight = () => {
  return Dimensions.get("window").height / baseHeight;
};

const ratioWidth = getRatioWidth();
const ratioHeight = getRatioHeight();

export const UISize = {
  widthScreen: windowDimensions.width,
  heightScreen: windowDimensions.height,
  fontSize: {
    extrasmall: 11,
    small: 12,
    msmall: 14,
    medium: 16,
    large: 18,
    extraLarge: 22,
    xxLarge: 24,
    xxxLarge: 30,
    xxxxLarge: 34,
  },

  ratioWidth: ratioWidth,
  ratioHeight: ratioHeight,
  // headerHeight:
  //   Platform.OS == "android" ? getStatusBarHeight() : 70 * ratioWidth,
  // statusBarHeight: Platform.OS == "android" ? getStatusBarHeight() : 0,
};

export const UIFont = {
  InterRegular: "Inter-Regular",
  InterSemiBold: "Inter-SemiBold",
  InterItalic: "Inter-Italic",
  InterBold: "Inter-Bold",
  RobotoBold: "Roboto-Bold",
  RobotoExtraBold: "Roboto-ExtraBold",
  RobotoItalic: "Roboto-Italic",
  RobotoLight: "Roboto-Light",
  RobotoMedium: "Roboto-Medium",
  RobotoRegular: "Roboto-Regular",
  RobotoSemiBold: "Roboto-SemiBold",
  RobotoThin: "Roboto-Thin",
};

export const Iheight = Dimensions.get("screen").height;
export const Iwidth = Dimensions.get("screen").width;

const { width, height } = Dimensions.get("window");

// Tính tỷ lệ scale
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export interface IUseDetectDevice {
  isAndroid: boolean;
  isIOS: boolean;
  isTablet: boolean;
}

const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1824 || adjustedHeight >= 1824)
    );
  }
};

const useDetectDevice: IUseDetectDevice = {
  isAndroid: Platform.OS === "android",
  isIOS: Platform.OS === "ios",
  isTablet: isTablet(),
};

const Px = {
  F: (size = 0) => PixelRatio.roundToNearestPixel(size * scale), // kích thước chữ
  W: (size = 0) => size * scale, // Chiều rộng
  H: (size = 0) => size * scale, // Chiều cao
};

export { useDetectDevice, Px };
