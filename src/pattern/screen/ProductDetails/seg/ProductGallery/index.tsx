import { Box } from "@/src/libs/by";
import React from "react";
import { Image, View } from "react-native";

export  const ProductGallery = ({product}:{product: IProduct}) => (
  <Box style={{ alignItems: 'center', marginVertical: 16 , borderRadius: 16}}>
    {/* Replace with image carousel or gallery */}
    <View style={{ width: 220, height: 220, backgroundColor: '#F8EAF2', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{
          uri:
            product.image_url.length === 0
              ? "https://picsum.photos/500"
              : product.image_url,
        }}
        resizeMode="cover"
        style={{width: "100%", height: "100%"}}
      />
    </View>
      {/* Placeholder for product image */}
  </Box>
);

