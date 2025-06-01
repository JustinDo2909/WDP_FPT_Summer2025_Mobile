import { Button, RText } from "@/src/libs/by";
import { router } from "expo-router";
import { View } from "react-native";
import context from "../context";

export const Modules = () => {
  const { ss } = context.useCtx();
  return (
    <View>
      <RText>Home</RText>
      <Button
        _set={{
          style: { width: "30%" },
          onPress() {
            ss.setPickData({ NavHeading: "SignIn" });
            router.push(`/root/dynamic?path=/SignIn`);
          },
        }}
        _type="Stroke"
      >
        <RText>chuyển trang</RText>
      </Button>
    </View>
  );
};
