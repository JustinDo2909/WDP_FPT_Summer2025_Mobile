import { Box, Row, RText, Wrap } from "@/src/libs/by";
import { calculateDiscount } from "@/src/libs/share/calcDiscount";
import { formatPrice } from "@/src/libs/share/formatPrice";
import { init } from "@/src/process/constants";
import { View } from "react-native";

export const ProductInfo = ({ product }: { product: IProduct }) => (
  <Box
    style={{
      paddingHorizontal: 6,
      paddingVertical: 8,
      marginBottom: 6,
      backgroundColor: "#fff",
      gap: 0,
    }}
  >
    {/* Replace with actual product info */}
    <Wrap style={{ marginBottom: 8, flexDirection: 'column', alignItems: 'flex-start' }}>
      <RText style={{ fontWeight: "600", fontSize: 20, color: init.Color.PrimaryBrand }}>
        {product?.productBrand.title}
      </RText>
      <RText style={{ fontWeight: "bold", fontSize: 28 }}>
        {product?.title}
      </RText>
      <RText style={{ color: "#888", fontSize: 14 }}>{product?.description}</RText>
    </Wrap>
    <Row
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
    >
      {product.sale_price && (
      <View
        style={{
          backgroundColor: "#E6D0E6",
          borderRadius: 4,
          paddingHorizontal: 6,
          paddingVertical: 2,
          marginRight: 8,
        }}
      >
       
          <RText style={{ color: "#B80060", fontWeight: "bold", fontSize: 12 }}>
            -{calculateDiscount(product.sale_price, product.price)}%
          </RText>
      </View>
              )}

      <RText
        style={{
          color: "#B80060",
          fontWeight: "bold",
          fontSize: 24,
          marginRight: 8,
        }}
      >
        {formatPrice(product?.sale_price ?? product.price)}
      </RText>
      {product.sale_price && (
        <RText
          style={{
            color: "#888",
            textDecorationLine: "line-through",
            fontSize: 14,
          }}
        >
          {formatPrice(product.price)}
        </RText>
      )}
    </Row>
    <RText style={{ color: "#666", fontSize: 13 }}>
      {product.total_stock} in stock
    </RText>
  </Box>
);
