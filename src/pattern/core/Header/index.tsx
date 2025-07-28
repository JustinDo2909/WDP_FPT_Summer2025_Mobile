import { Block, RText, Wrap } from "@/src/libs/by";
import { init } from "@/src/process/constants";
import { sStore } from "@/src/stores";
import { router, useGlobalSearchParams, useRouter } from "expo-router";
import { find, isEqual, last, split } from "lodash";
import { TouchableOpacity, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { useState, useRef } from "react";
import { onCRUD } from "@/src/process/api/regular";

const list = ["SignIn", "Cart", "Checkout", "History Purchase", "Vouchers", "PurchaseHistory", "ReviewProduct", "Review A Product", "GlowKnowQuiz", "BeautyDrop"];


export function Header() {
  const ss = sStore();
  const { navigate } = useCustomRouter();
  const params = useGlobalSearchParams<any>();
  const gFnID = last(split(String(params?.path), "/"));
  const router = useRouter();
  const isLoggedIn = ss?.Auth.User !== undefined;
  const cartQuantity = ss.Joint.Cart?.cartItems.length ?? 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const showHeaderBar = gFnID === "undefined" || gFnID == "Home" || gFnID == "ProfileMenu" || gFnID == "Event"
  // Import onCRUD for logout
  // console.log(showHeaderBar, gFnID === "undefined")

  // Dropdown menu component
  const DropdownMenu = () =>
    menuOpen ? (
      <View
        style={{
          position: "absolute",
          top: 48,
          right: 0,
          backgroundColor: "#fff",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 6,
          minWidth: 140,
          zIndex: 100,
        }}
      >
        <TouchableOpacity
          style={{ padding: 14, flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            setMenuOpen(false);
            // Help action (can be replaced with navigation or modal)
            if (typeof window !== "undefined") {
              alert("Help coming soon!");
            }
          }}
        >
          <Ionicons
            name="help-circle-outline"
            size={20}
            color="#FF4F81"
            style={{ marginRight: 8 }}
          />
          <RText style={{ color: "#FF4F81", fontSize: 16 }}>Help?</RText>
        </TouchableOpacity>
        <View
          style={{ height: 1, backgroundColor: "#eee", marginHorizontal: 8 }}
        />
        <TouchableOpacity
          style={{ padding: 14, flexDirection: "row", alignItems: "center" }}
          onPress={async () => {
            setMenuOpen(false);
            await onCRUD({ Name: "auth/logout" }).Post({});
            ss.resetAuth && ss.resetAuth();
            router.push("/auth");
          }}
        >
          <Ionicons
            name="key-outline"
            size={20}
            color="#FF4F81"
            style={{ marginRight: 8 }}
          />
          <RText style={{ color: "#FF4F81", fontSize: 16 }}>Log out</RText>
        </TouchableOpacity>
      </View>
    ) : null;

  return (
    <LinearGradient
      colors={["#FF7F7F", "#FF4F81"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        // Add top box shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
        zIndex: 9999, // Ensure header is above other content
        overflow: 'visible', // Prevent clipping of dropdown
      }}
    >
      <Block
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <RenderTitle />

        {showHeaderBar  && (
          <>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 2,
              }}
            >
              <Ionicons
                name="search"
                size={20}
                color="#999"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Search your product"
                style={{
                  flex: 1,
                  fontSize: 12,
                  color: "#333",
                }}
                placeholderTextColor="#999"
                returnKeyType="search"
                defaultValue={ss.Joint.SearchQuery ?? ""}
                onSubmitEditing={e => {
                  ss.setJointData({ SearchQuery: e.nativeEvent.text });
                }}
              />
            </View>
            {isLoggedIn && (
              <TouchableOpacity
                onPress={() => {
                  ss.setPickData({ NavHeading: "Shopping Cart" });
                  ss.setPickData({ ActiveTab: ""  });
                  navigate({ pathSegments: ["Cart"] });
                }}
                style={{ padding: 8 }}
              >
                <Ionicons name="bag-outline" size={24} color="white" />
                {cartQuantity > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      minWidth: 16,
                      height: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 4,
                    }}
                  >
                    <RText
                      style={{
                        color: "#FF4F81",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {cartQuantity}
                    </RText>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </>
        )}

        {isLoggedIn ? (
          <>
            {/* Menu Icon */}
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                ref={menuButtonRef}
                style={{ padding: 4 }}
                onPress={() => setMenuOpen((v) => !v)}
              >
                <View style={{ gap: 2 }}>
                  {[...Array(3)].map((_, i) => (
                    <View
                      key={i}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: "white",
                      }}
                    />
                  ))}
                </View>
              </TouchableOpacity>
              <DropdownMenu />
            </View>
          </>
        ) : (
          // Not logged in → show Login button
          <TouchableOpacity
            onPress={() => router.push("/auth")}
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
          >
            <RText
              style={{ fontSize: 16, fontWeight: "bold", color: "#FF4F81" }}
            >
              Login
            </RText>
          </TouchableOpacity>
        )}
      </Block>
    </LinearGradient>
  );
}

const RenderTitle = () => {
  const ss = sStore();
  const params = useGlobalSearchParams<any>();
  const gFnID = last(split(String(params?.path), "/"));
  const fnc = find(list, (ele) => isEqual(ele, gFnID));
  console.log("fnc", fnc)

  const BtnBack = (
    <TouchableOpacity
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        }
        switch (fnc) {
          case "Checkout":
            ss.setPickData({ NavHeading: "Shopping Cart" });
            break;
          case "ReviewProduct":
            ss.setPickData({ NavHeading: "History Purchase" });
            break;  
          default:
            ss.setPickData({ NavHeading: "" });
            break;
        }
      }}
      style={{ padding: 4 }}
    >
      <Ionicons
        name="arrow-back"
        size={24}
        color={init?.Color?.Whites || "#333"}
      />
    </TouchableOpacity>
  );

  if (ss.Pick?.NavHeading || fnc) {
    return (
      <Wrap style={{ gap: 16, alignItems: "center" }}>
        {BtnBack}
        {(ss.Pick?.NavHeading !== "Back" && fnc) && (
          <RText
            style={{
              fontWeight: 600,
              color: init?.Color?.Whites,
              fontSize: 20,
              paddingVertical: 14,
            }}
          >
            {splitCamelCase(ss.Pick?.NavHeading || fnc)}
          </RText>
        )}
      </Wrap>
    );
  }
};

const splitCamelCase = (str: string) =>
  str ? str.replace(/([a-z])([A-Z])/g, '$1 $2') : '';
