import { Box, Button, RText } from "@/src/libs/by";
import { Image, View } from "react-native";

export const ProductReview = ({product}:{product?: IProduct}) => (
  <Box style={{ paddingVertical: 8, backgroundColor: '#fff', gap: 0 }}>
    {/* Header */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingHorizontal: 6 }}>
      <RText style={{ fontSize: 18, fontWeight: 'bold' }}>{product?.rating} ({product?.reviews_count ?? 0})</RText>
      <RText style={{ fontSize: 18, marginLeft: 4 }}>⭐</RText>
      <RText style={{ fontSize: 18, marginLeft: 8, fontWeight: '500' }}>Product review</RText>
    </View>

    {/* Review Box */}
    <View style={{
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 12,
      paddingHorizontal: 6
    }}>
      {/* User Info + Rating */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: "https://i.imgur.com/kd9g9Xs.png" }}
            style={{ width: 16, height: 16, borderRadius: 18, marginRight: 8 }}
          />
          <RText style={{ fontWeight: 'bold', fontSize: 15 }}>Doxo.M.Hihi</RText>
        </View>
        <RText style={{ fontSize: 16 }}>⭐⭐⭐⭐⭐</RText>
      </View>

      {/* Review Text */}
      <RText style={{ fontSize: 14, color: '#333', lineHeight: 9 }}>
        This product truly exceeded my expectations! My skin looks brighter and more even-toned after just a few weeks of use. It's definitely worth the investment, and I'll absolutely repurchase it!
      </RText>
    </View>

    {/* View All */}
    <Button 
    _set={{
      onPress: 
      () => {},
      // handleSubmit(meds.onSignIn),
      style: {
        flex: 1,
        alignItems: 'center',
        marginTop: 8,
      },
    }}
    >
      <RText style={{ fontSize: 18, fontWeight: 'bold' }}>View All ➔</RText>
    </Button>
  </Box>
);
