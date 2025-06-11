import { Core, RText } from "@/src/libs/by/Clone";
import * as Device from "expo-device";


export function Footer() {
  if (typeof location.href === 'string' && location.href.includes('ProductDetails')) {
  return null;
}


  const NameType = Device.DeviceType[Device.deviceType || 0];

  return (
    <Core
      id="Footer"
      style={{
        flex: undefined,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#EEF9F8",
        padding: 5,
        paddingHorizontal: 24,
      }}
    >
      <RText>Footer</RText>
    </Core>
  );
}
