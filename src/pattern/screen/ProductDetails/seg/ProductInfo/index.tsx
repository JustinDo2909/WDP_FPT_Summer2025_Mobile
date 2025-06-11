import { Box, RText } from "@/src/libs/by";
import { View } from "react-native";

export const ProductInfo = () => (
  <Box style={{ paddingHorizontal: 6, paddingVertical: 8, marginBottom: 6, backgroundColor: "#fff", gap:0 }}>
    {/* Replace with actual product info */}
    <View style={{ marginBottom: 8 }}>
      <RText style={{ fontWeight: 'bold', fontSize: 20 }}>Body Brilliant</RText>
      <RText style={{ color: '#888', fontSize: 14 }}>Exfoliating Body Serum with 15% Glycolic Acid</RText>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <View style={{ backgroundColor: '#E6D0E6', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, marginRight: 8 }}>
        <RText style={{ color: '#B80060', fontWeight: 'bold', fontSize: 12 }}>-18%</RText>
      </View>
      <RText style={{ color: '#B80060', fontWeight: 'bold', fontSize: 18, marginRight: 8 }}>2.300.000 VND</RText>
      <RText style={{ color: '#888', textDecorationLine: 'line-through', fontSize: 14 }}>2.800.000 VND</RText>
    </View>
    <RText style={{ color: '#666', fontSize: 13 }}>0 đã bán</RText>
  </Box>
);