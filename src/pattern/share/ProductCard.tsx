// components/ProductCard.tsx
import { Card, Column, Cover, Row, RText, Wrap } from "@/src/libs/by";
import { calculateDiscount } from "@/src/libs/share/calcDiscount";
import { formatPrice } from "@/src/libs/share/formatPrice";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { sStore } from "@/src/stores";
import context from "../screen/Home/seg/context";

interface ProductCardProps {
  product: IProduct;
  cardWidth?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cardWidth }) => {
  const { navigate } = useCustomRouter();
  const { ss, meds } = context.useCtx();
  const {
    id,
    image_url,
    title,
    sale_price,
    price,
    description,
    rating,
    reviews_count,
    productBrand,
  } = product;
  const handleNavigate = () => {
    ss.setPickData({ NavHeading: "Back" });

    navigate({
      pathSegments: ["ProductDetails"],
      params: {productId: id}
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigate} style={{ padding: 0, margin: 0 }}>
      <Card style={[styles.card, cardWidth ? { width: cardWidth } : null]}>
        {/* Image */}
        <Cover style={styles.imageContainer}>
          <Image
            source={{
              uri:
                image_url.length === 0
                  ? "https://picsum.photos/500"
                  : image_url,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </Cover>

        {/* Details */}
        <Wrap style={styles.wrap}>
          <Column style={styles.column}>
            {sale_price != null ? (
              <RText style={styles.oldPrice}>{formatPrice(price)}</RText>
            ) : (
              <View style={{ height: 12 }} /> // spacer
            )}

            <Row style={styles.priceRow}>
              <RText style={styles.currentPrice}>
                {formatPrice(sale_price ?? price)}
              </RText>
              {sale_price != null && (
                <RText style={styles.discountBadge}>
                  -{calculateDiscount(sale_price, price)}%
                </RText>
              )}
            </Row>

            <RText style={styles.brandText}>{productBrand.title}</RText>

            <RText style={styles.title} numberOfLines={2}>
              {title}
            </RText>
            <RText style={styles.description} numberOfLines={2}>
            {description}
          </RText>
          </Column>

          <Column style={styles.column}>
          <Row style={styles.footerRow}>
            {/* Rating */}
            <Row style={styles.ratingRow}>
              <RText style={styles.ratingText}>
                {rating != null ? Number(rating).toFixed(2) : "N/A"}
              </RText>
              <MaterialIcons name="star" size={14} color="#facc15" />
              <RText style={styles.reviewCount}>{reviews_count ?? "N/A"}</RText>
            </Row>

            {/* Add to Cart */}
            <TouchableOpacity style={styles.cartButton} 
            onPress={() => 
              meds.onAddToCart(id, 1)
            }>
              <Row style={styles.cartRow}>
                {/* <RText style={styles.cartText}>Add To Cart</RText> */}
                <MaterialIcons name="shopping-basket" size={24} color="#6366f1" />
              </Row>
            </TouchableOpacity>
            {/* </AddToCartWrapper> */}
          </Row>
          </Column>


        </Wrap>
      </Card>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: "column",
    gap: 12,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fce7f3",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 8,
    gap: 8,
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  column: {
    width: "100%",
    justifyContent: "space-between",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
    fontSize: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#db2777",
  },
  discountBadge: {
    backgroundColor: "#8b5cf6",
    color: "#fff",
    paddingHorizontal: 4,
    padding: 2,
    fontSize: 16,
    borderRadius: 4,
    fontWeight: "600",
  },
  brandText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "bold",
    marginVertical: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 12,
    marginBottom: 6
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
  },
  footerRow: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  ratingText: {
    color: "#1f2937",
    fontSize: 14,
    marginTop: 1,
  },
  reviewCount: {
    marginLeft: 0,
    fontSize: 14,
    color: "#1f2937",
  },
  cartButton: {
    backgroundColor: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cartText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
