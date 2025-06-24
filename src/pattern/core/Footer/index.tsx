import { Core, RText } from "@/src/libs/by/Clone";
import { useRoute } from "@react-navigation/native";
import * as Device from "expo-device";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { map } from "lodash";
import { useRouter } from "expo-router";
import { sStore } from "@/src/stores";

const tabs = [
  { key: "Home", label: "Home", icon: <MaterialIcons name="home" size={24} color="black" /> },
  { key: "Product", label: "Product", icon: <Ionicons name="cube" size={24} color="black"/> },
  { key: "Game", label: "Game", icon: <FontAwesome5 name="gamepad" size={22} color="black" /> },
  // You can use "party-popper" from MaterialCommunityIcons for a confetti party popper icon
  { key: "Event", label: "Event", icon: <MaterialCommunityIcons name="party-popper" size={24} color="black" /> },
  { key: "ProfileMenu", label: "Me", icon: <Ionicons name="person" size={24} color="black" /> },
];

export function Footer() {
  const route = useRoute();
  const router = useRouter()
  const ss = sStore()
  if (route.name === "ProductDetails") {
    return null;
  }

  return (
    <Core
      id="Footer"
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderTopWidth: 0.5,
        borderTopColor: "#eee",
         shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      {map(tabs, tab => (
        <TouchableOpacity
          key={tab.key}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={() => {  
            ss.setPickData({NavHeading: ""})
            router.push(`/root/dynamic?path=/${tab.key}`);
          }}
          activeOpacity={0.7}
        >
          {tab.icon}
          <RText style={{ fontSize: 14, color: "black", marginTop: 2 }}>{tab.label}</RText>
        </TouchableOpacity>
      ))}
    </Core>
  );
}