import { Block, Button, Core, Cover, Group, RText, Wrap } from "@/src/libs/by";
import { init } from "@/src/process/constants";
import { sStore } from "@/src/stores";
import { router, useGlobalSearchParams, useRouter } from "expo-router";
import { find, isEqual, last, split } from "lodash";
import { TouchableOpacity, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";

export function Header() {
  const ss = sStore();
  const { navigate} = useCustomRouter()
  const router = useRouter()
  const isLoggedIn = ss?.Joint.User !== undefined
  const cartQuantity = ss.Joint.Cart?.cartItems.length ?? 0

  
  return (
    <LinearGradient
      colors={['#FF7F7F', '#FF4F81']}
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
      }}
    >

      <Block style={{ 
      justifyContent: "space-between", 
      flexDirection: "row",
      alignItems: "center",
      gap: 12
      }}>
        <RenderTitle/>

 { ss.Pick?.NavHeading !== 'Shopping Cart' && <>
       <View style={{
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 2,
    }}>
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
          color: '#333',
        }}
        placeholderTextColor="#999"
      />

    
    </View>
    {isLoggedIn &&
    <TouchableOpacity
      onPress={() => {
      ss.setPickData({ NavHeading: "Shopping Cart" });
      navigate({ pathSegments: ["Cart"] });
      }}
      style={{ padding: 8 }}
    >
      <Ionicons 
      name="bag-outline" 
      size={24} 
      color="white" 
      />
      {cartQuantity > 0 && (
      <View
        style={{
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: '#fff',
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        }}
      >
        <RText style={{ color: '#FF4F81', fontSize: 10, fontWeight: 'bold' }}>
        {cartQuantity}
        </RText>
      </View>
      )}
    </TouchableOpacity>
}
    </>
}


      {isLoggedIn ? (
  <>
    {/* Search Bar */}
   

    {/* Cart Icon */}

    {/* Menu Icon */}
    <TouchableOpacity style={{ padding: 4 }}>
      <View style={{ gap: 2 }}>
        {[...Array(3)].map((_, i) => (
          <View key={i} style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: 'white'
          }} />
        ))}
      </View>
    </TouchableOpacity>
  </>
) : (
  // Not logged in → show Login button
  <TouchableOpacity
    onPress={() => router.push("/auth")}
    style={{
      backgroundColor: 'white',
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 12
    }}
  >
    <RText style={{ fontSize: 16, fontWeight: 'bold', color: '#FF4F81' }}>
      Login
    </RText>
  </TouchableOpacity>
)}


      {/* Menu Icon */}
      {/* <TouchableOpacity
        // onPress={() => {
        // // Handle menu navigation
        // ss.setPickData({ NavHeading: "Menu" });
        // }}
        style={{
        padding: 4,
        }}
      >
        <View style={{ gap: 2 }}>
        <View style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: 'white'
        }} />
        <View style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: 'white'
        }} />
        <View style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: 'white'
        }} />
        </View>
      </TouchableOpacity> */}
      </Block>
    </LinearGradient>
  );
}

const RenderTitle = () => {
  const ss = sStore();
  const params = useGlobalSearchParams<any>();
  const gFnID = last(split(String(params?.path), "/"));
  const list = ["Home", "SignIn","Shopping Cart"];
  const fnc = find(list, (ele) => isEqual(ele, gFnID));

  const BtnBack = (
    <TouchableOpacity
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        }
        ss.setPickData({ NavHeading: "" });
      }}
      style={{ padding: 4}}
    >
      <Ionicons 
        name="arrow-back" 
        size={24} 
        color={init?.Color?.Whites || '#333'} 
      />
    </TouchableOpacity>
  );

  if (ss.Pick?.NavHeading) {
    return (
      <Wrap style={{ gap: 16, alignItems: 'center' }}>
        {BtnBack}
        {ss.Pick?.NavHeading !== 'Back' &&
        <RText
          style={{
            fontWeight: 600,
            color: init?.Color?.Whites,
            fontSize: 20,
            paddingVertical: 14
          }}
        >
          {ss.Pick?.NavHeading || fnc}
        </RText>
  }
      </Wrap>
    );
  }

  // return (
  //   <RText>Logo</RText>
  // );
};