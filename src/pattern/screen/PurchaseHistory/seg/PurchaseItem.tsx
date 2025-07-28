import { Button, Card, Column, Row, RText } from "@/src/libs/by";
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { formatPrice } from "@/src/libs/share/formatPrice";
import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import context from "./context";

interface PurchaseItemProps {
  orderItem: IOrderItem;
  orderDate: string;
}

export function PurchaseItem({ orderItem, orderDate }: PurchaseItemProps) {
  const { title, price, image_url, quantity, product_id } = orderItem;
  const { ss } = context.useCtx();
  const { navigate } = useCustomRouter();

  const handleRepurchase = () => {
    Alert.alert("Repurchase", "Repurchase feature coming soon!");
  };

  const handleFeedback = () => {
    ss.setPickData({ NavHeading: "Review a Product" });
    navigate({ pathSegments: ["ReviewProduct"], params: { productId: product_id } });
  };

  const totalPrice = price * quantity;

  return (
    <Card style={styles.card}>
      <Row style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: image_url?.length > 0 ? image_url : "https://picsum.photos/80",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.quantityBadge}>
            <RText style={styles.quantityText}>x {quantity}</RText>
          </View>
        </View>
        <Column style={styles.detailsContainer}>
          <RText style={styles.title} numberOfLines={2}>
            {title}
          </RText>
          <RText style={styles.description} numberOfLines={1}>
            Premium beauty product for daily use
          </RText>
          
          <View style={styles.priceSection}>
            <Row style={styles.priceRow}>
              <RText style={styles.unitPriceLabel}>Unit price: </RText>
              <RText style={styles.unitPrice}>{formatPrice(price)}</RText>
            </Row>
            <Row style={styles.totalPriceRow}>
              <RText style={styles.totalLabel}>Total: </RText>
              <RText style={styles.totalPrice}>{formatPrice(totalPrice)}</RText>
            </Row>
          </View>
          
          <Row style={styles.buttonContainer}>
            <Button
              _type="Stroke"
              _set={{
                onPress: handleRepurchase,
                style: styles.repurchaseButton,
              }}
            >
              <RText style={styles.buttonText}>Repurchase</RText>
            </Button>
            <Button
              _type="Stroke"
              _set={{
                onPress: handleFeedback,
                style: styles.feedbackButton,
              }}
            >
              <RText style={styles.buttonTextSecondary}>Feedback</RText>
            </Button>
          </Row>
        </Column>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 16,
  },
  container: {
    alignItems: "flex-start",
    gap: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f8fafc",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  quantityBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    borderRadius: 1000,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  detailsContainer: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
  },
  priceSection: {
    gap: 4,
    paddingVertical: 4,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  priceRow: {
    alignItems: "center",
  },
  totalPriceRow: {
    alignItems: "center",
  },
  unitPriceLabel: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  unitPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  totalLabel: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F23059",
  },
  buttonContainer: {
    gap: 8,
    marginTop: 8,
  },
  repurchaseButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#F23059",
    borderWidth: 1.5,
    borderRadius: 8,
    flex: 1,
    height: 36,
  },
  feedbackButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    height: 36,
  },
  buttonText: {
    fontSize: 14,
    color: "#F23059",
    fontWeight: "600",
    textAlign: "center",
  },
  buttonTextSecondary: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    textAlign: "center",
  },
});